'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { quizApi } from '@/services/api';
import type { QuizSummary } from '@/types/quiz';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    quizApi.getAll().then((data) => {
      setQuizzes(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await quizApi.remove(id);
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
    setDeletingId(null);
  };

  return (
    <main className="flex-1 py-8 px-4">
      <div className="mx-auto max-w-2xl">

        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>
            Dashboard
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: 'var(--text)' }}>
            Your quizzes.
          </h1>
        </div>

        {loading && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl h-20 animate-pulse"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              />
            ))}
          </div>
        )}

        {!loading && quizzes.length === 0 && (
          <div
            className="rounded-2xl p-10 sm:p-12 text-center"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>No quizzes yet</p>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Create your first quiz to get started.</p>
            <Link
              href="/create"
              className="inline-block rounded-xl px-6 py-2.5 text-sm font-bold text-white"
              style={{ background: 'var(--primary)' }}
            >
              Create a quiz
            </Link>
          </div>
        )}

        {!loading && quizzes.length > 0 && (
          <div className="space-y-3">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="group flex items-center justify-between rounded-2xl px-5 py-4 sm:px-6 sm:py-5 shadow-sm transition-all hover:shadow-md"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <Link href={`/quizzes/${quiz.id}`} className="flex-1 min-w-0">
                  <p className="font-semibold text-base truncate" style={{ color: 'var(--text)' }}>
                    {quiz.title}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
                    {quiz._count.questions} {quiz._count.questions === 1 ? 'question' : 'questions'}
                  </p>
                </Link>

                <button
                  onClick={() => handleDelete(quiz.id)}
                  disabled={deletingId === quiz.id}
                  className="ml-4 rounded-xl p-2.5 text-sm transition-all sm:opacity-0 sm:group-hover:opacity-100 disabled:opacity-50"
                  style={{ color: 'var(--muted)', background: 'var(--bg)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
                    (e.currentTarget as HTMLButtonElement).style.background = '#fee2e2';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg)';
                  }}
                  title="Delete quiz"
                >
                  {deletingId === quiz.id ? '...' : '🗑'}
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
