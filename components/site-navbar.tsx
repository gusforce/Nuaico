'use client'

import Link from "next/link"
import Image from "next/image"
import { Menu, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { useStyle } from "@/components/style-provider"
import SearchDialog from "@/components/search-dialog"
import StyleToggle from "@/components/style-toggle"
import { SectorIcons } from "@/lib/icons"
import { SECTORS } from "@/lib/data"

const casualNavItems = [
  { name: "Home", href: "/" },
  { name: "Healthcare", href: "/category/healthcare" },
  { name: "Technology", href: "/category/technology" },
  { name: "Finance", href: "/category/finance" },
  { name: "Government", href: "/category/government" },
  { name: "Industry", href: "/category/industry" },
  { name: "About", href: "/about" },
]

export default function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSectorsOpen, setIsSectorsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { isCorp } = useStyle()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (isCorp) {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/Nuaico_logo_v2.svg" alt="Nuaico Logo" width={52} height={52} />
              <span className="font-heading text-2xl font-bold tracking-tight text-slate-900">Nuaico</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <div className="relative">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
                  onClick={() => setIsSectorsOpen(!isSectorsOpen)}
                  aria-label="Sectors menu"
                  aria-expanded={isSectorsOpen}
                >
                  Sectors <ChevronDown className={`w-4 h-4 transition-transform ${isSectorsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSectorsOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSectorsOpen(false)} />
                    <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-xl rounded-lg mt-2 p-2 z-20 grid grid-cols-1 gap-1">
                      {SECTORS.map((sector) => {
                        const Icon = SectorIcons[sector]
                        return (
                          <Link
                            key={sector}
                            href={`/category/${sector.toLowerCase().replace(' ', '-')}`}
                            onClick={() => setIsSectorsOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-accent rounded-md"
                          >
                            <Icon size={16} />
                            {sector}
                          </Link>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
              <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900">About</Link>
              <button
                className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={18} />
                Search
              </button>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <StyleToggle />
              <Button className="bg-brand-dark text-white rounded-full text-sm hover:opacity-90">
                Get Daily Brief
              </Button>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <StyleToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-600">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] bg-white">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link href="/" className="text-lg font-medium text-slate-900" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/about" className="text-lg font-medium text-slate-900" onClick={() => setIsOpen(false)}>About</Link>
                    <div className="border-t pt-4 mt-2">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-3">Sectors</p>
                      <div className="grid grid-cols-2 gap-2">
                        {SECTORS.map(sector => (
                          <Link
                            key={sector}
                            href={`/category/${sector.toLowerCase().replace(' ', '-')}`}
                            className="text-sm text-slate-600 py-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {sector}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      </header>
    )
  }

  // casual style navbar
  return (
    <header className="sticky top-0 z-50 w-full bg-brand-muted text-brand border-b-4 border-brand/20">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/Nuaico_logo_v2.svg" alt="Nuaico Logo" width={52} height={52} />
          <span className="font-bold text-2xl tracking-tight text-brand">Nuaico</span>
        </Link>

        <div className="flex items-center gap-2">
          <StyleToggle />
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex text-brand hover:bg-brand/10 hover:text-brand"
            onClick={() => setSearchOpen(true)}
            aria-label="Search articles"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-brand hover:bg-brand/10 hover:text-brand">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-white">
              <nav className="flex flex-col gap-6 mt-8">
                {casualNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-brand hover:text-brand-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t">
                  <Button className="w-full bg-gradient-blue hover:opacity-90 transition-opacity" asChild>
                    <Link href="/subscribe" onClick={() => setIsOpen(false)}>
                      Subscribe
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
