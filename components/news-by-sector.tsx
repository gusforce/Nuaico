import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SectorNewsData, Article } from "@/lib/types"

interface NewsBySectorProps {
  sectorNews: SectorNewsData
}

export default function NewsBySector({ sectorNews }: NewsBySectorProps) {
  const sectors = Object.keys(sectorNews)

  // Create an "All" category that combines news from all sectors
  const allNews = Object.values(sectorNews).flat().slice(0, 6)

  return (
    <Tabs defaultValue="All" className="w-full">
      <TabsList className="mb-6 flex flex-wrap h-auto bg-muted">
        <TabsTrigger
          value="All"
          className="text-sm md:text-base data-[state=active]:bg-cyan data-[state=active]:text-navy"
        >
          All
        </TabsTrigger>
        {sectors.map((sector) => (
          <TabsTrigger
            key={sector}
            value={sector}
            className="text-sm md:text-base data-[state=active]:bg-cyan data-[state=active]:text-navy"
          >
            {sector}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="All" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNews.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative aspect-video">
                <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2 text-navy border-cyan">
                  {item.category}
                </Badge>
                <h3 className="font-bold text-lg mb-2 line-clamp-2 text-navy">
                  <Link href={`/news/${item.slug}`} className="hover:text-cyan">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.author}</span>
                  <span>{item.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/category/all" className="text-navy font-medium hover:text-opacity-80 transition-colors">
            View all news →
          </Link>
        </div>
      </TabsContent>

      {sectors.map((sector) => (
        <TabsContent key={sector} value={sector} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectorNews[sector].map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-video">
                  <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-navy border-cyan">
                    {item.category}
                  </Badge>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 text-navy">
                    <Link href={`/news/${item.slug}`} className="hover:text-cyan">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.author}</span>
                    <span>{item.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/category/${sector.toLowerCase()}`}
              className="text-navy font-medium hover:text-opacity-80 transition-colors"
            >
              View all {sector} news →
            </Link>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
