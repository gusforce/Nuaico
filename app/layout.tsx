import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { StyleProvider } from "@/components/style-provider"
import SiteNavbar from "@/components/site-navbar"
import SiteFooter from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  title: "Nuaico - News",
  description: "AI-powered sector news analysis",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-style="v0" suppressHydrationWarning>
      <body className={`${inter.variable} ${merriweather.variable} ${inter.className} bg-brand-muted`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <StyleProvider defaultStyle="v0">
            <SiteNavbar />
            {children}
            <SiteFooter />
          </StyleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
