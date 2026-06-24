export type JobStatus = 'bookmarked' | 'applied' | 'interview' | 'offer' | 'rejected'

export interface Job {
  id: string
  company: string
  position: string
  status: JobStatus
  applied_date: string | null
  link: string | null
  notes: string | null
  created_at: string
  updated_at: string
}
