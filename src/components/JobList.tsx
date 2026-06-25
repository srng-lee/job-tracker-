import { useState } from 'react'
import type { Job, JobStatus } from '../types'
import InterviewModal from './InterviewModal'

const STATUS_LABEL: Record<JobStatus, string> = {
  bookmarked: '북마크',
  applied: '지원완료',
  interview: '면접',
  offer: '오퍼',
  rejected: '불합격',
}

const STATUS_COLOR: Record<JobStatus, string> = {
  bookmarked: 'bg-slate-100 text-slate-600',
  applied: 'bg-indigo-100 text-indigo-700',
  interview: 'bg-amber-100 text-amber-700',
  offer: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-600',
}

interface Props {
  jobs: Job[]
  loading: boolean
  onDelete: (id: string) => Promise<void>
}

export default function JobList({ jobs, loading, onDelete }: Props) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-400 py-4">
        <span className="w-4 h-4 border-2 border-slate-300 border-t-indigo-400 rounded-full animate-spin" />
        불러오는 중...
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-14 text-center space-y-5">
        <div className="flex justify-center">
          <div className="bg-slate-100 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">지원 내역이 없습니다</p>
          <p className="text-xs text-slate-400 mt-1">위 폼에서 첫 번째 지원을 추가해보세요.</p>
        </div>
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl px-5 py-3.5 text-left">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-sm font-semibold text-indigo-700">면접 질문 자동 생성</p>
            <p className="text-xs text-indigo-400 mt-0.5">지원서를 추가하면 포지션에 맞는 면접 예상 질문을 바로 확인할 수 있어요.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">지원 목록</span>
          <span className="text-xs text-slate-400">{jobs.length}건</span>
        </div>
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">회사명</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">포지션</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">상태</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">지원일</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {jobs.map(job => (
              <tr key={job.id} className="hover:bg-indigo-50/30 transition-colors group">
                <td className="px-5 py-3.5 font-semibold text-gray-900">
                  {job.link ? (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 hover:underline underline-offset-2"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </td>
                <td className="px-5 py-3.5 text-slate-600">{job.position}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLOR[job.status as JobStatus]}`}>
                    {STATUS_LABEL[job.status as JobStatus]}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-400 text-xs">{job.applied_date ?? '-'}</td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex items-center gap-1.5 text-xs font-semibold bg-violet-50 text-violet-600 hover:bg-violet-100 border border-violet-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      면접 질문
                    </button>
                    <button
                      onClick={() => onDelete(job.id)}
                      className="text-xs text-slate-300 hover:text-red-400 transition-colors px-1"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedJob && (
        <InterviewModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  )
}
