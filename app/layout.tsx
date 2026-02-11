import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { StyleProvider } from "@/components/style-provider"
import SiteNavbar from "@/components/site-navbar"
import SiteFooter from "@/components/site-footer"
import { Toaster } from "@/components/ui/sonner"
import ReadingProgress from "@/components/reading-progress"
import NuChatWidget from "@/components/nu-chat/nu-chat-widget"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  title: {
    default: "Nuaico - AI Sector News & Analysis",
    template: "%s | Nuaico",
  },
  description: "AI-powered news analysis across 6 industry sectors. Get unbiased insights on how artificial intelligence is reshaping finance, healthcare, energy, and more.",
  metadataBase: new URL("https://nuaico.com"),
  openGraph: {
    type: "website",
    siteName: "Nuaico",
    title: "Nuaico - AI Sector News & Analysis",
    description: "AI-powered news analysis across 6 industry sectors.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuaico - AI Sector News & Analysis",
    description: "AI-powered news analysis across 6 industry sectors.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-style="casual" suppressHydrationWarning>
      <body className={`${inter.variable} ${merriweather.variable} ${inter.className} bg-brand-muted`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-accent">
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <StyleProvider defaultStyle="casual">
            <ReadingProgress />
            <SiteNavbar />
            <div id="main-content">{children}</div>
            <SiteFooter />
            <Toaster />
            <NuChatWidget />
          </StyleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
