'use client';

import { useFormContext } from 'react-hook-form';
import type { CreateQuizFormValues } from '@/app/create/schema';
import BooleanQuestion from './BooleanQuestion';
import InputQuestion from './InputQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import QuestionTypeSelector from './QuestionTypeSelector';

interface Props {
  index: number;
  onRemove: () => void;
}

export default function QuestionCard({ index, onRemove }: Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateQuizFormValues>();

  const type = watch(`questions.${index}.type`);

  return (
    <div
      className="rounded-2xl p-5 shadow-sm space-y-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: 'var(--primary)' }}
        >
          Question {index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-medium transition-colors"
          style={{ color: 'var(--muted)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#ef4444')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)')}
        >
          Remove
        </button>
      </div>

      <QuestionTypeSelector index={index} />

      <div>
        <input
          {...register(`questions.${index}.text`)}
          placeholder="Question text..."
          className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
          style={{
            background: 'var(--bg)',
            border: '1.5px solid var(--border)',
            color: 'var(--text)',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />
        {errors.questions?.[index]?.text && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.questions[index].text.message}
          </p>
        )}
      </div>

      <div>
        {type === 'BOOLEAN' && <BooleanQuestion />}
        {type === 'INPUT' && <InputQuestion />}
        {type === 'CHECKBOX' && <CheckboxQuestion questionIndex={index} />}
      </div>
    </div>
  );
}
