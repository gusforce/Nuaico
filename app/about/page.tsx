import type { Metadata } from "next"
import AboutPageContent from "@/components/about-page-content"

export const metadata: Metadata = {
  title: "About - Methodology & Mission",
  description: "Learn about Nuaico's AI-powered news analysis methodology, the Nuaico Lens engine, and our mission to filter noise and provide actionable intelligence.",
}

export default function AboutPage() {
  return <AboutPageContent />
}
