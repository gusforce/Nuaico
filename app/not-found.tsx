import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
      <p className="text-slate-600 mb-6">The page you're looking for doesn't exist.</p>
      <Link
        href="/"
        className="bg-brand-accent text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Go to homepage
      </Link>
    </div>
  )
}
