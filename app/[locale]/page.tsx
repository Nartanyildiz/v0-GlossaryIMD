"use client"

import { useState, useMemo } from "react"
import { useTranslations } from "next-intl"
import { Search, Menu } from "lucide-react"
import { MenuOverlay } from "@/components/menu-overlay"

interface Word {
  term: string
  category: string
  definitions: {
    fr: string
    en: string
    de: string
    it: string
  }
}

const dictionary: Word[] = [
  {
    term: "SEO",
    category: "communication-marketing",
    definitions: {
      fr: "Optimisation pour les moteurs de recherche - ensemble de techniques visant à améliorer la visibilité d'un site web",
      en: "Search Engine Optimization - set of techniques to improve website visibility in search engines",
      de: "Suchmaschinenoptimierung - Techniken zur Verbesserung der Website-Sichtbarkeit",
      it: "Ottimizzazione per motori di ricerca - tecniche per migliorare la visibilità del sito web",
    },
  },
  {
    term: "Wireframe",
    category: "ui-ux",
    definitions: {
      fr: "Maquette fonctionnelle représentant la structure d'une interface sans éléments graphiques",
      en: "Functional mockup representing interface structure without graphic elements",
      de: "Funktionaler Entwurf der Schnittstellenstruktur ohne grafische Elemente",
      it: "Mockup funzionale che rappresenta la struttura dell'interfaccia senza elementi grafici",
    },
  },
  {
    term: "Moodboard",
    category: "design-graphique-typo",
    definitions: {
      fr: "Planche d'inspiration visuelle regroupant images, couleurs et textures pour définir l'ambiance d'un projet",
      en: "Visual inspiration board gathering images, colors and textures to define project mood",
      de: "Visuelle Inspirationstafel mit Bildern, Farben und Texturen zur Projektdefinition",
      it: "Tavola di ispirazione visiva con immagini, colori e texture per definire l'atmosfera del progetto",
    },
  },
]

export default function HomePage() {
  const t = useTranslations()
  const [searchTerm, setSearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const filteredWords = useMemo(() => {
    if (!searchTerm) return dictionary
    return dictionary.filter(
      (word) =>
        word.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(word.definitions).some((def) => def.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }, [searchTerm])

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">{t("home.title")}</h1>
          <p className="text-sm opacity-80">{t("home.subtitle")}</p>
        </div>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 rounded-lg bg-[#00D0B4] dark:bg-[#00D0B4] text-white dark:text-[#0F0F0F] hover:opacity-80 transition-opacity"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-current opacity-60" size={20} />
        <input
          type="text"
          placeholder={t("home.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#00D0B4] dark:bg-[#00D0B4] text-white dark:text-[#0F0F0F] placeholder-white/70 dark:placeholder-[#0F0F0F]/70 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
      </div>

      {/* Content */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          {t("home.allTerms")} ({filteredWords.length})
        </h2>

        {filteredWords.length === 0 ? (
          <p className="text-center py-8 opacity-60">{t("home.noResults")}</p>
        ) : (
          <div className="grid gap-4">
            {filteredWords.map((word, index) => (
              <div key={index} className="p-4 rounded-lg bg-[#00D0B4] dark:bg-[#00D0B4] text-white dark:text-[#0F0F0F]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{word.term}</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-white/20 dark:bg-[#0F0F0F]/20">
                    {t(`categories.${word.category}`)}
                  </span>
                </div>
                <p className="text-sm opacity-90">{word.definitions.fr}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}
