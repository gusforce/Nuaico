'use client'

import Link from "next/link"
import { useStyle } from "@/components/style-provider"

export default function SiteFooter() {
  const { isCorp } = useStyle()

  if (isCorp) {
    return (
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="font-heading text-2xl font-bold text-white block mb-4">Nuaico</span>
              <p className="text-sm max-w-sm mb-6">
                Analyzing the impact of Artificial Intelligence across every major industry.
                We provide the signal, you make the decisions.
              </p>
              <div className="flex gap-4">
                <span className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-xs">X</span>
                <span className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-xs">in</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Sectors</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/category/finance" className="hover:text-white">Finance</Link></li>
                <li><Link href="/category/healthcare" className="hover:text-white">Healthcare</Link></li>
                <li><Link href="/category/technology" className="hover:text-white">Technology</Link></li>
                <li><Link href="/category/energy" className="hover:text-white">Energy</Link></li>
                <li><Link href="/category/industry" className="hover:text-white">Industry</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About Methodology</Link></li>
                <li><Link href="/about" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-center">
            <p>&copy; {new Date().getFullYear()} Nuaico Media. All rights reserved.</p>
            <p className="mt-2 text-slate-600">
              Disclaimer: Nuaico employs artificial intelligence to summarize and analyze news.
              While we strive for accuracy, information should be verified independently.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  // casual style footer
  return (
    <footer className="bg-brand text-white py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <span className="font-bold text-xl tracking-tight">Nuaico</span>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white/80 transition-colors">About</Link>
            <Link href="/category/finance" className="hover:text-white/80 transition-colors">Finance</Link>
            <Link href="/category/healthcare" className="hover:text-white/80 transition-colors">Healthcare</Link>
            <Link href="/category/technology" className="hover:text-white/80 transition-colors">Technology</Link>
            <Link href="/category/energy" className="hover:text-white/80 transition-colors">Energy</Link>
            <Link href="/category/industry" className="hover:text-white/80 transition-colors">Industry</Link>
          </nav>
        </div>
        <div className="border-t border-white/20 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Nuaico. All rights reserved.</p>
          <p>AI-powered news analysis &mdash; <Link href="/subscribe" className="underline hover:text-white">Subscribe to our newsletter</Link></p>
        </div>
      </div>
    </footer>
  )
}
