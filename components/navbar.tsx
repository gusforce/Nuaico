"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

// Update the navItems array to include the new sectors
const navItems = [
  { name: "Home", href: "/" },
  { name: "Health", href: "/category/health" },
  { name: "Technology", href: "/category/technology" },
  { name: "Finance", href: "/category/finance" },
  { name: "Governance", href: "/category/governance" },
  { name: "Industry", href: "/category/industry" },
  { name: "About", href: "/about" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    // Update the header background and burger menu color

    // Change the header className to use the background color that matches the page
    <header className="sticky top-0 z-50 w-full bg-[#F3F4F6] text-navy border-b-4 border-navy/20">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/nuaico-logo.png" alt="Nuaico Logo" width={40} height={40} />
          <span className="font-bold text-2xl tracking-tight text-navy">Nuaico</span>
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-navy hover:bg-navy/10 hover:text-navy">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-white">
            <nav className="flex flex-col gap-6 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-navy hover:text-cyan transition-colors"
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
    </header>
  )
}
