"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { MenuOverlay } from "@/components/menu-overlay"
import { useLanguage } from "@/contexts/language-context"

// Définition des catégories
const categories = [
  {
    name: "Communication, Marketing",
    slug: "communication-marketing",
  },
  {
    name: "Design graphique, Typo",
    slug: "design-graphique-typo",
  },
  {
    name: "Ui, Ux",
    slug: "ui-ux",
  },
  {
    name: "Web, Code",
    slug: "web-code",
  },
  {
    name: "Photo, Vidéo, Audio",
    slug: "photo-video-audio",
  },
  {
    name: "Autre ressources",
    slug: "autre-ressources",
  },
]

export default function CategoriesPage() {
  const { translateCategory } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-black text-[#008170] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <Link href="/">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight hover:text-[#00a58c] transition-colors">
              GLOSSAIRE IMD
            </h1>
          </Link>
          <MenuOverlay />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/category/${category.slug}`}
              className={cn(
                "aspect-square bg-[#1E2A3B] p-8 flex items-start transition-all duration-300",
                hoveredIndex === index ? "scale-[1.03]" : "",
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h2 className="text-3xl font-medium leading-tight">{translateCategory(category.name)}</h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
