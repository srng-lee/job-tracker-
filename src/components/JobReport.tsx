import type { Job } from '../types'

interface Props {
  jobs: Job[]
}

interface Advice {
  icon: string
  text: string
  highlight?: boolean
}

function calcReport(jobs: Job[]) {
  const now = new Date()
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const active = jobs.filter(j => j.status !== 'bookmarked')
  const total = active.length

  const cnt = (s: string) => jobs.filter(j => j.status === s).length
  const applied   = cnt('applied')
  const document  = cnt('document')
  const interview = cnt('interview')
  const offer     = cnt('offer')
  const rejected  = cnt('rejected')

  const thisMonthCount = jobs.filter(j => {
    const d = j.applied_date ?? j.created_at?.slice(0, 7)
    return d?.startsWith(thisMonth)
  }).length

  // 퍼널: 각 단계 이상 통과한 수
  const docAbove  = document + interview + offer
  const intAbove  = interview + offer

  const docRate  = total > 0 ? Math.round((docAbove / total) * 100) : null
  const intRate  = docAbove > 0 ? Math.round((intAbove / docAbove) * 100) : null
  const offerRate = intAbove > 0 ? Math.round((offer / intAbove) * 100) : null

  // 가장 많이 탈락하는 단계
  let bottleneck: string | null = null
  if (total > 0) {
    const dropDoc  = total - docAbove
    const dropInt  = docAbove - intAbove
    const dropOff  = intAbove - offer
    const max = Math.max(dropDoc, dropInt, dropOff)
    if (max === 0) bottleneck = null
    else if (max === dropDoc) bottleneck = '서류 단계'
    else if (max === dropInt) bottleneck = '면접 단계'
    else bottleneck = '최종 합격 단계'
  }

  // 개선 조언
  const advices: Advice[] = []
  if (total === 0) {
    advices.push({ icon: '📝', text: '아직 지원한 곳이 없어요. 관심 공고에 지원해보세요!' })
  } else if (total < 5) {
    advices.push({ icon: '🚀', text: '지원 수가 적어요. 더 많은 곳에 지원할수록 기회가 늘어나요.' })
  }
  if (docRate !== null && docRate < 30) {
    advices.push({ icon: '📄', text: `서류통과율이 ${docRate}%로 낮아요. 이력서와 자기소개서를 다듬어보세요.`, highlight: true })
  }
  if (intRate !== null && intRate < 40) {
    advices.push({ icon: '🎤', text: `면접 전환율이 ${intRate}%예요. 면접 준비와 모의 면접을 강화해보세요.`, highlight: true })
  }
  if (thisMonthCount === 0 && total > 0) {
    advices.push({ icon: '📅', text: '이번 달 지원 활동이 없어요. 꾸준한 지원이 취업 성공의 핵심이에요.' })
  }
  if (offer > 0 && offerRate !== null && offerRate >= 50) {
    advices.push({ icon: '🏆', text: `면접 합격률이 ${offerRate}%로 훌륭해요! 이 기세를 이어가세요.` })
  }
  if (rejected > 0 && offer === 0) {
    advices.push({ icon: '💪', text: '불합격이 있어도 포기하지 마세요. 모든 경험이 성장의 밑거름이에요.' })
  }
  if (advices.length === 0) {
    advices.push({ icon: '✨', text: '균형 잡힌 지원 활동을 이어가고 있어요. 좋은 결과가 있을 거예요!' })
  }

  return {
    total, applied, document, interview, offer, rejected,
    docAbove, intAbove,
    docRate, intRate, offerRate,
    thisMonthCount, bottleneck, advices,
  }
}

const FUNNEL = [
  { label: '전체 지원',  key: 'total'    as const, color: 'bg-indigo-400' },
  { label: '서류 통과',  key: 'docAbove' as const, color: 'bg-sky-400'    },
  { label: '면접',       key: 'intAbove' as const, color: 'bg-amber-400'  },
  { label: '최종 합격',  key: 'offer'    as const, color: 'bg-emerald-400'},
]

export default function JobReport({ jobs }: Props) {
  const r = calcReport(jobs)

  if (r.total === 0 && jobs.filter(j => j.status === 'bookmarked').length === 0) return null

  return (
    <div className="max-w-5xl mx-auto px-6 pb-10 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="bg-violet-100 rounded-lg p-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-gray-800">나의 취업 리포트</h2>
      </div>

      {/* 퍼널 */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">지원 단계 퍼널</p>
        {FUNNEL.map(f => {
          const value = r[f.key] as number
          const pct = r.total > 0 ? Math.round((value / r.total) * 100) : 0
          return (
            <div key={f.key} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-16 shrink-0">{f.label}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${f.color} rounded-full transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-700 w-12 text-right">
                {value}건 {r.total > 0 && <span className="text-slate-400 font-normal">({pct}%)</span>}
              </span>
            </div>
          )
        })}
      </div>

      {/* 요약 카드 3개 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">이번 달 활동</p>
          <p className="text-3xl font-bold text-indigo-600">{r.thisMonthCount}<span className="text-base font-medium text-slate-400 ml-1">건</span></p>
          <p className="text-xs text-slate-400 mt-1">신규 지원</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">서류 통과율</p>
          <p className="text-3xl font-bold text-sky-600">
            {r.docRate !== null ? `${r.docRate}%` : <span className="text-slate-300 text-lg">-</span>}
          </p>
          <p className="text-xs text-slate-400 mt-1">{r.total}건 중 {r.docAbove}건 통과</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">탈락이 많은 단계</p>
          <p className="text-lg font-bold text-amber-600 mt-1">{r.bottleneck ?? <span className="text-slate-300 text-base">데이터 부족</span>}</p>
          <p className="text-xs text-slate-400 mt-1">가장 많이 탈락하는 구간</p>
        </div>
      </div>

      {/* 개선 조언 */}
      <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl border border-violet-100 p-5 space-y-2.5">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-3">💡 개선 조언</p>
        {r.advices.map((a, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 rounded-xl px-4 py-3 text-sm ${
              a.highlight
                ? 'bg-white border border-violet-200 text-gray-700 font-medium'
                : 'text-slate-600'
            }`}
          >
            <span className="text-base leading-5 shrink-0">{a.icon}</span>
            <span className="leading-5">{a.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
