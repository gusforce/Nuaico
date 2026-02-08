"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Article } from "@/lib/types"

interface HeroSlideshowProps {
  news: Article[]
}

export default function HeroSlideshow({ news }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length)
  }

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {news.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Card className="border-0 overflow-hidden">
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-navy/10" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge className="mb-2 bg-cyan text-navy hover:bg-cyan/90">{item.category}</Badge>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                    <Link href={`/news/${item.slug}`}>{item.title}</Link>
                  </h2>
                  <p className="text-white/90 mb-4 max-w-3xl line-clamp-2 md:line-clamp-3">{item.excerpt}</p>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span>{item.author}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Left hover zone */}
      <div className="absolute left-0 top-0 bottom-0 w-[15%] group/left z-10">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-navy/30 text-white hover:bg-navy/50 hover:text-white opacity-0 group-hover/left:opacity-100 transition-opacity duration-200"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>
      </div>

      {/* Right hover zone */}
      <div className="absolute right-0 top-0 bottom-0 w-[15%] group/right z-10">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-navy/30 text-white hover:bg-navy/50 hover:text-white opacity-0 group-hover/right:opacity-100 transition-opacity duration-200"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {news.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex ? "bg-cyan w-4" : "bg-white/50",
            )}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
