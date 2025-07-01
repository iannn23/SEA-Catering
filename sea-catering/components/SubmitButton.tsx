'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-cyan-500 text-white py-3 px-4 rounded-lg hover:bg-cyan-600 transition-colors font-bold text-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      {pending ? 'Submitting...' : 'Subscribe Now'}
    </button>
  );
}