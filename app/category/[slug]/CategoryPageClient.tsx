"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { MenuOverlay } from "@/components/menu-overlay"
import { useLanguage } from "@/contexts/language-context"
import { categoryData } from "@/data/category-data"

export default function CategoryPageClient({ params }: { params: { slug: string } }) {
  const { language, t, translateCategory } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")

  // Récupérer les données de la catégorie
  const category = categoryData[params.slug as keyof typeof categoryData]

  if (!category) {
    return (
      <main className="min-h-screen bg-black text-[#008170] p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight hover:text-[#00a58c] transition-colors">
                GLOSSAIRE IMD
              </h1>
            </Link>
            <MenuOverlay />
          </div>
          <div className="text-center py-8">
            <p className="text-[#008170]">{t("noResults")}</p>
          </div>
        </div>
      </main>
    )
  }

  // Filter terms based on search term
  const filteredTerms = category.terms.filter(
    (term) =>
      searchTerm === "" ||
      term.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition[language].toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const translatedCategory = translateCategory(category.name)

  return (
    <main className="min-h-screen bg-black text-[#008170] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight hover:text-[#00a58c] transition-colors">
              GLOSSAIRE IMD
            </h1>
          </Link>
          <MenuOverlay />
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#008170]/50 h-5 w-5" />
          <Input
            type="text"
            placeholder={t("searchInCategory", { category: translatedCategory })}
            className="pl-10 bg-[#1E2A3B] border-none text-[#008170] placeholder:text-[#008170]/50 h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term, index) => (
              <div key={index} className="bg-[#1E2A3B] p-6 transition-all hover:bg-[#263447]">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-medium text-[#008170]">{term.word}</h2>
                  <span className="text-xs px-2 py-1 bg-black/30 rounded-full text-[#008170]">{term.partOfSpeech}</span>
                </div>
                <p className="text-[#008170]/90">{term.definition[language]}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-[#008170]">{t("noResults")}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
