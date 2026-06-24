import type { Job, JobStatus } from '../types'

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
  if (loading) {
    return <p className="text-sm text-gray-400">불러오는 중...</p>
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 px-6 py-12 text-center">
        <p className="text-sm text-gray-400">지원 내역이 없습니다. 위 폼에서 추가해보세요.</p>
      </div>
    )
  }

  return (
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
                <button
                  onClick={() => onDelete(job.id)}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
