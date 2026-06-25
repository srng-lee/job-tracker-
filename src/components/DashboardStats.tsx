import type { Job, JobStatus } from '../types'

interface Props {
  jobs: Job[]
}

interface StatCard {
  label: string
  status: JobStatus | 'total'
  color: string
  bg: string
  icon: React.ReactNode
}

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
)
const DocIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)
const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
  </svg>
)
const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8,21 12,17 16,21" /><line x1="12" y1="17" x2="12" y2="11" /><path d="M7 4H4a2 2 0 0 0-2 2v3c0 2.2 1.8 4 4 4" /><path d="M17 4h3a2 2 0 0 1 2 2v3c0 2.2-1.8 4-4 4" /><rect x="7" y="2" width="10" height="9" rx="1" />
  </svg>
)
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
  </svg>
)

const CARDS: StatCard[] = [
  { label: '전체 지원', status: 'total',    color: 'text-indigo-600', bg: 'bg-indigo-50',  icon: <BriefcaseIcon /> },
  { label: '서류통과',  status: 'document', color: 'text-sky-600',    bg: 'bg-sky-50',     icon: <DocIcon /> },
  { label: '면접',      status: 'interview',color: 'text-amber-600',  bg: 'bg-amber-50',   icon: <MicIcon /> },
  { label: '최종합격',  status: 'offer',    color: 'text-emerald-600',bg: 'bg-emerald-50', icon: <TrophyIcon /> },
  { label: '불합격',    status: 'rejected', color: 'text-red-500',    bg: 'bg-red-50',     icon: <XIcon /> },
]

export default function DashboardStats({ jobs }: Props) {
  const count = (s: JobStatus) => jobs.filter(j => j.status === s).length

  const offerCount = count('offer')
  const rejectedCount = count('rejected')
  const decided = offerCount + rejectedCount
  const acceptRate = decided > 0 ? Math.round((offerCount / decided) * 100) : null

  const getCount = (status: JobStatus | 'total') =>
    status === 'total' ? jobs.length : count(status)

  if (jobs.length === 0) return null

  return (
    <div className="max-w-5xl mx-auto px-6 pt-6 space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {CARDS.map(card => (
          <div
            key={card.status}
            className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3.5 flex flex-col gap-2"
          >
            <div className={`${card.bg} ${card.color} w-7 h-7 rounded-lg flex items-center justify-center`}>
              {card.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 leading-none">
                {getCount(card.status)}
              </p>
              <p className="text-xs text-slate-400 mt-1">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {acceptRate !== null && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-5 py-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-semibold text-gray-700">합격률</span>
            <span className="text-sm font-bold text-indigo-600">{acceptRate}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
              style={{ width: `${acceptRate}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            결과 확인된 {decided}건 중 {offerCount}건 합격
          </p>
        </div>
      )}
    </div>
  )
}
