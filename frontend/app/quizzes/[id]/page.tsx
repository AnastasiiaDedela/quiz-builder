'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { quizApi } from '@/services/api';
import type { Quiz, Question } from '@/types/quiz';

const TYPE_LABELS: Record<string, string> = {
  BOOLEAN: 'True / False',
  INPUT: 'Short Answer',
  CHECKBOX: 'Multiple Choice',
};

function QuestionDisplay({ question, index }: { question: Question; index: number }) {
  return (
    <div
      className="rounded-2xl p-5 space-y-4 shadow-sm"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--primary)' }}>
          Question {index + 1}
        </span>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: 'var(--bg)', color: 'var(--muted)', border: '1px solid var(--border)' }}
        >
          {TYPE_LABELS[question.type]}
        </span>
      </div>

      <p className="text-base font-medium" style={{ color: 'var(--text)' }}>
        {question.text}
      </p>

      {question.type === 'BOOLEAN' && (
        <div className="flex gap-5">
          {['True', 'False'].map((label) => (
            <label key={label} className="flex items-center gap-2.5 text-sm font-medium select-none" style={{ color: 'var(--muted)' }}>
              <span className="h-4 w-4 rounded-full flex-shrink-0" style={{ border: '2px solid var(--border)', background: 'var(--bg)' }} />
              {label}
            </label>
          ))}
        </div>
      )}

      {question.type === 'INPUT' && (
        <div
          className="w-full rounded-xl px-4 py-2.5 text-sm"
          style={{ background: 'var(--bg)', border: '1.5px solid var(--border)', color: 'var(--muted)' }}
        >
          Short text answer...
        </div>
      )}

      {question.type === 'CHECKBOX' && question.options && (
        <div className="space-y-2.5">
          {question.options.map((option, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="h-4 w-4 rounded flex-shrink-0" style={{ border: '2px solid var(--border)', background: 'var(--bg)' }} />
              <span className="text-sm" style={{ color: 'var(--text)' }}>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function QuizDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    quizApi
      .getOne(Number(id))
      .then(setQuiz)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen py-12 px-4">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="h-10 w-48 rounded-xl animate-pulse" style={{ background: 'var(--surface)' }} />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl animate-pulse" style={{ background: 'var(--surface)' }} />
          ))}
        </div>
      </main>
    );
  }

  if (notFound || !quiz) {
    return (
      <main className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>Quiz not found</p>
          <button onClick={() => router.push('/quizzes')} className="text-sm font-medium" style={{ color: 'var(--primary)' }}>
            ← Back to quizzes
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-2xl">

        <button
          onClick={() => router.push('/quizzes')}
          className="text-sm font-semibold mb-8 flex items-center gap-1.5 transition-opacity hover:opacity-70"
          style={{ color: 'var(--primary)' }}
        >
          ← Back to quizzes
        </button>

        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--primary)' }}>
            {quiz.questions.length} {quiz.questions.length === 1 ? 'question' : 'questions'}
          </p>
          <h1 className="text-4xl font-extrabold leading-tight" style={{ color: 'var(--text)' }}>
            {quiz.title}
          </h1>
        </div>

        <div className="space-y-4">
          {quiz.questions.map((question, index) => (
            <QuestionDisplay key={question.id} question={question} index={index} />
          ))}
        </div>

      </div>
    </main>
  );
}
