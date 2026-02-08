'use client'

import Link from "next/link"
import { useStyle } from "@/components/style-provider"

export default function SiteFooter() {
  const { isStudio } = useStyle()

  if (isStudio) {
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
                <li><Link href="/category/energy" className="hover:text-white">Energy</Link></li>
                <li><Link href="/category/cybersecurity" className="hover:text-white">Cybersecurity</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About Methodology</Link></li>
                <li className="cursor-pointer hover:text-white">Contact</li>
                <li className="cursor-pointer hover:text-white">Privacy Policy</li>
                <li className="cursor-pointer hover:text-white">Terms of Service</li>
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

  // v0 style footer
  return (
    <footer className="bg-brand text-white py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Nuaico. All rights reserved.</p>
      </div>
    </footer>
  )
}
