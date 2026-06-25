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
  bookmarked: 'bg-gray-100 text-gray-600',
  applied: 'bg-blue-100 text-blue-700',
  interview: 'bg-amber-100 text-amber-700',
  offer: 'bg-green-100 text-green-700',
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
    return <p className="text-sm text-gray-400">불러오는 중...</p>
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 px-6 py-12 text-center space-y-4">
        <p className="text-sm text-gray-400">지원 내역이 없습니다. 위 폼에서 추가해보세요.</p>
        <div className="inline-flex items-center gap-3 bg-violet-50 border border-violet-100 rounded-xl px-5 py-3.5 text-left">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-sm font-medium text-violet-700">면접 질문 자동 생성</p>
            <p className="text-xs text-violet-500 mt-0.5">지원서를 추가하면 포지션에 맞는 면접 예상 질문을 바로 확인할 수 있어요.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-gray-600">회사명</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">포지션</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">상태</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">지원일</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.map(job => (
              <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-medium text-gray-900">
                  {job.link ? (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </td>
                <td className="px-5 py-3 text-gray-700">{job.position}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOR[job.status as JobStatus]}`}
                  >
                    {STATUS_LABEL[job.status as JobStatus]}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-500">{job.applied_date ?? '-'}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex items-center gap-1 text-xs font-medium bg-violet-50 text-violet-600 hover:bg-violet-100 border border-violet-200 px-2.5 py-1 rounded-md transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      면접 질문
                    </button>
                    <button
                      onClick={() => onDelete(job.id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
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
