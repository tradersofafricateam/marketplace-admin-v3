"use client";

type Props = {
  resource: string;
  onRetry: () => void;
};

export function QueryError({ resource, onRetry }: Props) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
      <p>Unable to load {resource}. Please try again.</p>
      <button type="button" onClick={onRetry} className="mt-3 font-semibold underline">
        Retry
      </button>
    </div>
  );
}
