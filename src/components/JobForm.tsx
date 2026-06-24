import { useState } from 'react'
import type { Job, JobStatus } from '../types'

type NewJob = Omit<Job, 'id' | 'created_at' | 'updated_at'>

interface Props {
  onAdd: (job: NewJob) => Promise<void>
}

const STATUS_OPTIONS: { value: JobStatus; label: string }[] = [
  { value: 'bookmarked', label: '북마크' },
  { value: 'applied', label: '지원완료' },
  { value: 'interview', label: '면접' },
  { value: 'offer', label: '오퍼' },
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
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 className="text-base font-semibold text-gray-900">지원 추가</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">회사명 *</label>
          <input
            type="text"
            value={form.company}
            onChange={e => set('company', e.target.value)}
            placeholder="예) 카카오"
            required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">포지션 *</label>
          <input
            type="text"
            value={form.position}
            onChange={e => set('position', e.target.value)}
            placeholder="예) 프론트엔드 개발자"
            required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">상태</label>
          <select
            value={form.status}
            onChange={e => set('status', e.target.value as JobStatus)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {STATUS_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">지원일</label>
          <input
            type="date"
            value={form.applied_date ?? ''}
            onChange={e => set('applied_date', e.target.value || null)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-sm font-medium text-gray-700">공고 링크</label>
          <input
            type="url"
            value={form.link ?? ''}
            onChange={e => set('link', e.target.value || null)}
            placeholder="https://"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-sm font-medium text-gray-700">메모</label>
          <textarea
            value={form.notes ?? ''}
            onChange={e => set('notes', e.target.value || null)}
            placeholder="추가 메모를 입력하세요"
            rows={3}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
      >
        {submitting ? '추가 중...' : '추가'}
      </button>
    </form>
  )
}
