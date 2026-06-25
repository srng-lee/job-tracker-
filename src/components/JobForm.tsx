import { useState } from 'react'
import type { Job, JobStatus } from '../types'

type NewJob = Omit<Job, 'id' | 'created_at' | 'updated_at'>

interface Props {
  onAdd: (job: NewJob) => Promise<void>
}

const STATUS_OPTIONS: { value: JobStatus; label: string }[] = [
  { value: 'bookmarked', label: '북마크' },
  { value: 'applied', label: '지원완료' },
  { value: 'document', label: '서류통과' },
  { value: 'interview', label: '면접' },
  { value: 'offer', label: '최종합격' },
  { value: 'rejected', label: '불합격' },
]

const EMPTY_FORM: NewJob = {
  company: '',
  position: '',
  status: 'bookmarked',
  applied_date: null,
  link: null,
  notes: null,
}

const inputClass =
  'border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition'

export default function JobForm({ onAdd }: Props) {
  const [form, setForm] = useState<NewJob>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)

  function set<K extends keyof NewJob>(key: K, value: NewJob[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    await onAdd(form)
    setForm(EMPTY_FORM)
    setSubmitting(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
    >
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <div className="bg-indigo-100 rounded-lg p-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-gray-800">새 지원 추가</h2>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">회사명 *</label>
            <input
              type="text"
              value={form.company}
              onChange={e => set('company', e.target.value)}
              placeholder="예) 카카오"
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">포지션 *</label>
            <input
              type="text"
              value={form.position}
              onChange={e => set('position', e.target.value)}
              placeholder="예) 프론트엔드 개발자"
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">상태</label>
            <select
              value={form.status}
              onChange={e => set('status', e.target.value as JobStatus)}
              className={inputClass}
            >
              {STATUS_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">지원일</label>
            <input
              type="date"
              value={form.applied_date ?? ''}
              onChange={e => set('applied_date', e.target.value || null)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">공고 링크</label>
            <input
              type="url"
              value={form.link ?? ''}
              onChange={e => set('link', e.target.value || null)}
              placeholder="https://"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">메모</label>
            <textarea
              value={form.notes ?? ''}
              onChange={e => set('notes', e.target.value || null)}
              placeholder="추가 메모를 입력하세요"
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              추가 중...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              지원 추가
            </>
          )}
        </button>
      </div>
    </form>
  )
}
