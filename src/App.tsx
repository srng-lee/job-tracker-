import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import type { Job } from './types'
import JobForm from './components/JobForm'
import JobList from './components/JobList'

type NewJob = Omit<Job, 'id' | 'created_at' | 'updated_at'>

function App() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setJobs(data)
    setLoading(false)
  }

  async function addJob(job: NewJob) {
    const { data, error } = await supabase.from('jobs').insert(job).select().single()
    if (!error && data) setJobs(prev => [data, ...prev])
  }

  async function deleteJob(id: string) {
    const { error } = await supabase.from('jobs').delete().eq('id', id)
    if (!error) setJobs(prev => prev.filter(j => j.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Job Tracker</h1>
        <p className="text-sm text-gray-500 mt-0.5">취업 지원 현황을 관리하세요</p>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <JobForm onAdd={addJob} />
        <JobList jobs={jobs} loading={loading} onDelete={deleteJob} />
      </main>
    </div>
  )
}

export default App
