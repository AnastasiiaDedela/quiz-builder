'use client';

import { useFormContext } from 'react-hook-form';
import type { CreateQuizFormValues } from '@/app/create/schema';

const TYPES = [
  { value: 'BOOLEAN', label: 'True / False' },
  { value: 'INPUT', label: 'Short Answer' },
  { value: 'CHECKBOX', label: 'Multiple Choice' },
] as const;

interface Props {
  index: number;
}

export default function QuestionTypeSelector({ index }: Props) {
  const { watch, setValue } = useFormContext<CreateQuizFormValues>();
  const current = watch(`questions.${index}.type`);

  return (
    <div
      className="flex flex-col min-[500px]:flex-row rounded-xl p-1 gap-1"
      style={{ background: 'var(--bg)', border: '1.5px solid var(--border)' }}
    >
      {TYPES.map((t) => {
        const active = current === t.value;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => setValue(`questions.${index}.type`, t.value, { shouldValidate: true })}
            className="flex-1 rounded-lg py-2 text-xs font-semibold transition-all"
            style={{
              background: active ? 'var(--primary)' : 'transparent',
              color: active ? '#fff' : 'var(--muted)',
              boxShadow: active ? '0 1px 4px rgba(91,79,207,0.25)' : 'none',
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
