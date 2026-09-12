'use client';

export default function InputQuestion() {
  return (
    <input
      type="text"
      disabled
      placeholder="Short text answer..."
      className="w-full rounded-xl px-4 py-2.5 text-sm cursor-not-allowed"
      style={{
        background: 'var(--bg)',
        border: '1.5px solid var(--border)',
        color: 'var(--muted)',
      }}
    />
  );
}
