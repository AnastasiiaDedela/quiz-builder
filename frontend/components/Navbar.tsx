'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="w-full px-4 py-4"
      style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)' }}
    >
      <div className="mx-auto flex flex-col min-[320px]:flex-row min-[320px]:items-center min-[320px]:justify-between gap-3" style={{ maxWidth: '1040px' }}>
        <Link href="/quizzes" className="flex items-center gap-2.5">
          <div
            className="h-8 w-8 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
            style={{ background: 'var(--primary)' }}
          >
            Q
          </div>
          <span className="font-extrabold text-base tracking-tight" style={{ color: 'var(--text)' }}>
            Quiz Builder
          </span>
        </Link>

        {pathname !== '/create' && (
          <Link
            href="/create"
            className="rounded-xl px-4 py-2 text-sm font-bold text-white transition-all w-fit"
            style={{ background: 'var(--primary)' }}
          >
            + New Quiz
          </Link>
        )}
      </div>
    </nav>
  );
}
