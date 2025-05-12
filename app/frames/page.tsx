"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, List, Grid, Home } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function FramesLayout() {
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Sample dictionary data with varying definition lengths
  const dictionary = [
    {
      word: "Mood board",
      definition:
        "Planche d'images et de matières dont le but est d'aider à la détermination des choix stylistiques dans un projet. [MJ] Collage composé de photographies, de formes, de couleurs, de matières ou d'éléments graphiques pour communiquer les inspirations et les orientations graphiques d'un projet. [DB]",
      partOfSpeech: "verb",
    },
    {
      word: "Benevolent",
      definition:
        "Well-meaning and kindly. A benevolent person is one who shows goodwill and a desire to promote the happiness and prosperity of others.",
      partOfSpeech: "adjective",
    },
    {
      word: "Cacophony",
      definition:
        "A harsh, discordant mixture of sounds. When multiple loud, unpleasant noises occur simultaneously, they create a cacophony.",
      partOfSpeech: "noun",
    },
    {
      word: "Diligent",
      definition:
        "Having or showing care and conscientiousness in one's work or duties. A diligent student completes all assignments thoroughly and on time.",
      partOfSpeech: "adjective",
    },
    {
      word: "Ephemeral",
      definition:
        "Lasting for a very short time. Ephemeral things are fleeting and temporary, like cherry blossoms or certain insects that live only for a day.",
      partOfSpeech: "adjective",
    },
    {
      word: "Fastidious",
      definition:
        "Very attentive to and concerned about accuracy and detail. Someone who is fastidious pays careful attention to cleanliness, appearance, or precision.",
      partOfSpeech: "adjective",
    },
  ]

  // Filter words based on search term
  const filteredWords = dictionary
    .filter(
      (item) =>
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, 6)

  // Simplified frame style function that doesn't rely on DOM measurements
  const getFrameStyle = (index: number) => {
    if (hoveredIndex === null) {
      return {}
    }

    if (index === hoveredIndex) {
      return {
        transform: "scale(1.5)",
        zIndex: 30,
      }
    } else {
      // Calculate relative position to hovered item
      const cols = 3 // Assume 3 columns for simplicity
      const hoveredCol = hoveredIndex % cols
      const hoveredRow = Math.floor(hoveredIndex / cols)
      const currentCol = index % cols
      const currentRow = Math.floor(index / cols)

      // Simple offset calculation
      const moveX = currentCol < hoveredCol ? -30 : currentCol > hoveredCol ? 30 : 0
      const moveY = currentRow < hoveredRow ? -30 : currentRow > hoveredRow ? 30 : 0

      return {
        transform: `translate(${moveX}px, ${moveY}px)`,
        zIndex: 10,
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#0F0F0F] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-[#232D3F] p-4 rounded-lg">
          <h1 className="text-3xl font-bold text-[#008170]">Glossaire IMD</h1>
          <div className="flex gap-2">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-[#005B41] text-[#005B41] bg-transparent hover:bg-[#2d3a52]"
              >
                <Home className="h-4 w-4 mr-2" />
                Accueil
              </Button>
            </Link>
            <Link href="/list">
              <Button
                variant="outline"
                size="sm"
                className="border-[#005B41] text-[#005B41] bg-transparent hover:bg-[#2d3a52]"
              >
                <List className="h-4 w-4 mr-2" />
                Liste
              </Button>
            </Link>
            <Link href="/frames">
              <Button
                variant="default"
                size="sm"
                className="bg-[#232D3F] text-[#005B41] border border-[#005B41] hover:bg-[#2d3a52]"
              >
                <Grid className="h-4 w-4 mr-2" />
                Cadres
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Rechercher des mots ou définitions..."
            className="pl-10 bg-[#232D3F] border-[#005B41] text-[#008170] placeholder:text-[#008170]/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredWords.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10 relative min-h-[500px]"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {filteredWords.map((item, index) => (
              <div key={index} className="relative transition-all duration-500" style={getFrameStyle(index)}>
                <Link
                  href={`/word/${item.word.toLowerCase()}`}
                  className={cn(
                    "p-6 border rounded-lg flex flex-col justify-between min-h-[180px] bg-[#232D3F] border-[#005B41]",
                    hoveredIndex === index ? "shadow-xl border-[#008170]" : "hover:shadow-md",
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h2
                        className={cn(
                          "font-bold transition-all duration-500 text-[#008170]",
                          hoveredIndex === index ? "text-3xl" : "text-2xl",
                        )}
                      >
                        {item.word}
                      </h2>
                      <span className="text-xs px-2 py-1 bg-[#0F0F0F] bg-opacity-50 rounded-full border border-[#005B41] text-[#005B41]">
                        {item.partOfSpeech}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "transition-all duration-500 text-[#008170]",
                        hoveredIndex === index ? "text-lg" : "text-md",
                      )}
                    >
                      {item.definition}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "mt-4 transition-all duration-500 text-[#005B41]",
                      hoveredIndex === index ? "text-base font-semibold" : "text-sm",
                    )}
                  >
                    Cliquez pour plus de détails
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-[#008170]">Aucun mot trouvé correspondant à votre recherche.</p>
          </div>
        )}
      </div>
    </main>
  )
}
