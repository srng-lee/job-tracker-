import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import type { Job } from './types'
import JobForm from './components/JobForm'
import JobList from './components/JobList'
import DashboardStats from './components/DashboardStats'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/40">
      <header className="bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-7 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Job Tracker</h1>
              <p className="text-indigo-200 text-sm mt-0.5">취업 지원 현황을 한눈에 관리하세요</p>
            </div>
          </div>
          {!loading && (
            <div className="hidden sm:flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-sm font-medium">{jobs.length}개 지원 중</span>
            </div>
          )}
        </div>
      </header>

      <DashboardStats jobs={jobs} />
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <JobForm onAdd={addJob} />
        <JobList jobs={jobs} loading={loading} onDelete={deleteJob} />
      </main>
    </div>
  )
}

export default App
