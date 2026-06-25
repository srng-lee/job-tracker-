import { useState } from 'react'
import type { Job } from '../types'
import { generateInterviewQuestions } from '../lib/interviewQuestions'

interface Props {
  job: Job
  onClose: () => void
}

export default function InterviewModal({ job, onClose }: Props) {
  const [generated, setGenerated] = useState(false)

  const questions = generated
    ? generateInterviewQuestions(job.company, job.position)
    : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">면접 예상 질문</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {job.company} · {job.position}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none mt-0.5"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!generated ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-gray-600 text-sm mb-1">
                {job.company} {job.position} 포지션에 맞는
              </p>
              <p className="text-gray-600 text-sm mb-6">면접 예상 질문 10개를 생성합니다.</p>
              <button
                onClick={() => setGenerated(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
              >
                질문 생성하기
              </button>
            </div>
          ) : (
            <div className="space-y-5 text-sm">
              <Section title="기술 질문" questions={questions!.technical} start={1} />
              <Section title="인성/경험 질문" questions={questions!.behavioral} start={6} />
              <Section title="회사/직무 관련 질문" questions={questions!.company} start={9} />
            </div>
          )}
        </div>

        {generated && (
          <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={() => setGenerated(false)}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              다시 보기
            </button>
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2 rounded-lg transition-colors"
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function Section({ title, questions, start }: { title: string; questions: string[]; start: number }) {
  return (
    <div>
      <p className="font-semibold text-gray-800 mb-2">{title}</p>
      <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
        {questions.map((q, i) => (
          <p key={i} className="px-4 py-2.5 text-gray-700 leading-relaxed">
            <span className="text-gray-400 mr-2 font-medium">{start + i}.</span>
            {q}
          </p>
        ))}
      </div>
    </div>
  )
}
