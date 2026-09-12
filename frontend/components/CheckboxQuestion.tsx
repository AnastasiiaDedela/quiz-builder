'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import type { CreateQuizFormValues } from '@/app/create/schema';

interface Props {
  questionIndex: number;
}

export default function CheckboxQuestion({ questionIndex }: Props) {
  const { register } = useFormContext<CreateQuizFormValues>();
  const { fields, append, remove } = useFieldArray({
    name: `questions.${questionIndex}.options`,
  });

  return (
    <div className="space-y-2.5">
      {fields.map((field, optionIndex) => (
        <div key={field.id} className="flex items-center gap-3">
          <span
            className="h-4 w-4 rounded flex-shrink-0"
            style={{ border: '2px solid var(--border)', background: 'var(--bg)' }}
          />
          <input
            {...register(`questions.${questionIndex}.options.${optionIndex}.value`)}
            placeholder={`Option ${optionIndex + 1}`}
            className="flex-1 rounded-xl px-4 py-2 text-sm outline-none transition-all"
            style={{
              background: 'var(--bg)',
              border: '1.5px solid var(--border)',
              color: 'var(--text)',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
          <button
            type="button"
            onClick={() => remove(optionIndex)}
            className="text-sm transition-colors"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#ef4444')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)')}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ value: '' })}
        className="text-xs font-semibold transition-colors"
        style={{ color: 'var(--primary)' }}
      >
        + Add option
      </button>
    </div>
  );
}
