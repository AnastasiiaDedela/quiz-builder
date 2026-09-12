'use client';

export default function BooleanQuestion() {
  return (
    <div className="flex gap-5">
      {['True', 'False'].map((label) => (
        <label
          key={label}
          className="flex items-center gap-2.5 text-sm font-medium cursor-not-allowed select-none"
          style={{ color: 'var(--muted)' }}
        >
          <span
            className="h-4 w-4 rounded-full flex-shrink-0"
            style={{ border: '2px solid var(--border)', background: 'var(--bg)' }}
          />
          {label}
        </label>
      ))}
    </div>
  );
}
