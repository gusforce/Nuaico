'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">Something went wrong</h1>
      <p className="text-slate-600 mb-6">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="bg-brand-accent text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  )
}
