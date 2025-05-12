"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MenuOverlay } from "@/components/menu-overlay"

// Dictionnaire complet (tous les termes de toutes les catégories)
const dictionary = [
  // Communication, Marketing
  {
    word: "SEO",
    definition:
      "Ensemble de techniques visant à optimiser la visibilité d'un site web dans les résultats des moteurs de recherche.",
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Persona",
    definition:
      "Archétype représentant un groupe d'utilisateurs dont les caractéristiques, les objectifs et les comportements sont similaires.",
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Call-to-action",
    definition:
      "Élément d'interface qui incite l'utilisateur à effectuer une action spécifique, comme un bouton 'Acheter maintenant'.",
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },

  // Design graphique, Typo
  {
    word: "Mood board",
    definition:
      "Planche d'images et de matières dont le but est d'aider à la détermination des choix stylistiques dans un projet.",
    partOfSpeech: "noun",
    category: "Design graphique, Typo",
  },
  {
    word: "Serif",
    definition:
      "Empattement ou petit trait terminal qui apparaît à l'extrémité des caractères dans certaines polices de caractères.",
    partOfSpeech: "noun",
    category: "Design graphique, Typo",
  },
  {
    word: "Kerning",
    definition:
      "Ajustement de l'espace entre des paires de caractères spécifiques pour obtenir un espacement visuellement plaisant.",
    partOfSpeech: "noun",
    category: "Design graphique, Typo",
  },

  // UI, UX
  {
    word: "Wireframe",
    definition:
      "Schéma fonctionnel d'une interface qui représente la structure, la hiérarchie des informations et les principaux éléments d'une interface, sans traitement graphique.",
    partOfSpeech: "noun",
    category: "Ui, Ux",
  },
  {
    word: "Affordance",
    definition: "Qualité d'un objet qui suggère intuitivement son mode d'utilisation, sa fonction ou son comportement.",
    partOfSpeech: "noun",
    category: "Ui, Ux",
  },
  {
    word: "Heatmap",
    definition:
      "Représentation graphique des données où les valeurs sont représentées par des couleurs, souvent utilisée pour visualiser le comportement des utilisateurs sur une interface.",
    partOfSpeech: "noun",
    category: "Ui, Ux",
  },

  // Web, Code
  {
    word: "API",
    definition:
      "Interface de programmation d'application qui permet à différents logiciels de communiquer entre eux et d'échanger des données selon un ensemble de règles prédéfinies.",
    partOfSpeech: "noun",
    category: "Web, Code",
  },
  {
    word: "Framework",
    definition: "Ensemble cohérent de composants logiciels structurels qui sert à créer les fondations d'un logiciel.",
    partOfSpeech: "noun",
    category: "Web, Code",
  },
  {
    word: "Responsive",
    definition:
      "Approche de conception qui fait en sorte qu'une interface s'adapte automatiquement à la taille de l'écran du dispositif utilisé pour la consulter.",
    partOfSpeech: "adjective",
    category: "Web, Code",
  },

  // Photo, Vidéo, Audio
  {
    word: "Codec",
    definition: "Programme capable de compresser et/ou décompresser un signal numérique, généralement audio ou vidéo.",
    partOfSpeech: "noun",
    category: "Photo, Vidéo, Audio",
  },
  {
    word: "Storyboard",
    definition:
      "Représentation illustrée d'un film ou d'une animation avant sa réalisation, sous forme de séquences dessinées.",
    partOfSpeech: "noun",
    category: "Photo, Vidéo, Audio",
  },
  {
    word: "Compositing",
    definition:
      "Technique consistant à combiner des éléments visuels de sources séparées en une seule image, souvent utilisée en post-production.",
    partOfSpeech: "noun",
    category: "Photo, Vidéo, Audio",
  },

  // Autres Ressources
  {
    word: "Open source",
    definition:
      "Se dit d'un logiciel dont le code source est distribué librement et peut être modifié et redistribué par quiconque.",
    partOfSpeech: "adjective",
    category: "Autre ressources",
  },
  {
    word: "Agile",
    definition:
      "Méthode de gestion de projet qui préconise une approche itérative et collaborative, avec des cycles de développement courts.",
    partOfSpeech: "adjective",
    category: "Autre ressources",
  },
  {
    word: "Benchmark",
    definition:
      "Processus d'évaluation comparative qui consiste à mesurer les performances d'un produit ou service par rapport à la concurrence ou à un standard.",
    partOfSpeech: "noun",
    category: "Autre ressources",
  },
]

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  // Filter words based on search term and category filter
  const filteredWords = dictionary.filter(
    (item) =>
      (searchTerm === "" ||
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === null || item.category === categoryFilter),
  )

  // Get unique categories for the filter
  const categories = Array.from(new Set(dictionary.map((item) => item.category)))

  return (
    <main className="min-h-screen bg-black text-[#008170] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">GLOSSAIRE IMD</h1>
          <MenuOverlay />
        </div>

        <Link href="/categories" className="flex items-center mb-8 text-[#008170]">
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Retour aux catégories</span>
        </Link>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#008170]/50 h-5 w-5" />
          <Input
            type="text"
            placeholder="Rechercher des mots ou définitions..."
            className="pl-10 bg-[#1E2A3B] border-none text-[#008170] placeholder:text-[#008170]/50 h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            variant={categoryFilter === null ? "default" : "outline"}
            size="sm"
            className={
              categoryFilter === null ? "bg-[#008170] text-black" : "border-[#008170] text-[#008170] bg-transparent"
            }
            onClick={() => setCategoryFilter(null)}
          >
            Toutes les catégories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={categoryFilter === category ? "default" : "outline"}
              size="sm"
              className={
                categoryFilter === category
                  ? "bg-[#008170] text-black"
                  : "border-[#008170] text-[#008170] bg-transparent"
              }
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredWords.length > 0 ? (
            filteredWords.map((item, index) => (
              <div key={index} className="bg-[#1E2A3B] p-6 transition-all hover:bg-[#263447]">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-medium text-[#008170]">{item.word}</h2>
                  <span className="text-xs px-2 py-1 bg-black/30 rounded-full text-[#008170]">{item.partOfSpeech}</span>
                </div>
                <div className="text-xs text-[#008170]/70 mb-2">Catégorie: {item.category}</div>
                <p className="text-[#008170]/90">{item.definition}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-[#008170]">Aucun mot trouvé correspondant à votre recherche.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
