"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { MenuOverlay } from "@/components/menu-overlay"

// Définition des catégories avec leurs termes associés
const categoryData = {
  "communication-marketing": {
    name: "Communication, Marketing",
    terms: [
      {
        word: "SEO",
        definition:
          "Ensemble de techniques visant à optimiser la visibilité d'un site web dans les résultats des moteurs de recherche.",
        partOfSpeech: "noun",
      },
      {
        word: "Persona",
        definition:
          "Archétype représentant un groupe d'utilisateurs dont les caractéristiques, les objectifs et les comportements sont similaires.",
        partOfSpeech: "noun",
      },
      {
        word: "Call-to-action",
        definition:
          "Élément d'interface qui incite l'utilisateur à effectuer une action spécifique, comme un bouton 'Acheter maintenant'.",
        partOfSpeech: "noun",
      },
    ],
  },
  "design-graphique-typo": {
    name: "Design graphique, Typo",
    terms: [
      {
        word: "Mood board",
        definition:
          "Planche d'images et de matières dont le but est d'aider à la détermination des choix stylistiques dans un projet.",
        partOfSpeech: "noun",
      },
      {
        word: "Serif",
        definition:
          "Empattement ou petit trait terminal qui apparaît à l'extrémité des caractères dans certaines polices de caractères.",
        partOfSpeech: "noun",
      },
      {
        word: "Kerning",
        definition:
          "Ajustement de l'espace entre des paires de caractères spécifiques pour obtenir un espacement visuellement plaisant.",
        partOfSpeech: "noun",
      },
    ],
  },
  "ui-ux": {
    name: "Ui, Ux",
    terms: [
      {
        word: "Wireframe",
        definition:
          "Schéma fonctionnel d'une interface qui représente la structure, la hiérarchie des informations et les principaux éléments d'une interface, sans traitement graphique.",
        partOfSpeech: "noun",
      },
      {
        word: "Affordance",
        definition:
          "Qualité d'un objet qui suggère intuitivement son mode d'utilisation, sa fonction ou son comportement.",
        partOfSpeech: "noun",
      },
      {
        word: "Heatmap",
        definition:
          "Représentation graphique des données où les valeurs sont représentées par des couleurs, souvent utilisée pour visualiser le comportement des utilisateurs sur une interface.",
        partOfSpeech: "noun",
      },
    ],
  },
  "web-code": {
    name: "Web, Code",
    terms: [
      {
        word: "API",
        definition:
          "Interface de programmation d'application qui permet à différents logiciels de communiquer entre eux et d'échanger des données selon un ensemble de règles prédéfinies.",
        partOfSpeech: "noun",
      },
      {
        word: "Framework",
        definition:
          "Ensemble cohérent de composants logiciels structurels qui sert à créer les fondations d'un logiciel.",
        partOfSpeech: "noun",
      },
      {
        word: "Responsive",
        definition:
          "Approche de conception qui fait en sorte qu'une interface s'adapte automatiquement à la taille de l'écran du dispositif utilisé pour la consulter.",
        partOfSpeech: "adjective",
      },
    ],
  },
  "photo-video-audio": {
    name: "Photo, Vidéo, Audio",
    terms: [
      {
        word: "Codec",
        definition:
          "Programme capable de compresser et/ou décompresser un signal numérique, généralement audio ou vidéo.",
        partOfSpeech: "noun",
      },
      {
        word: "Storyboard",
        definition:
          "Représentation illustrée d'un film ou d'une animation avant sa réalisation, sous forme de séquences dessinées.",
        partOfSpeech: "noun",
      },
      {
        word: "Compositing",
        definition:
          "Technique consistant à combiner des éléments visuels de sources séparées en une seule image, souvent utilisée en post-production.",
        partOfSpeech: "noun",
      },
    ],
  },
  "autre-ressources": {
    name: "Autre ressources",
    terms: [
      {
        word: "Open source",
        definition:
          "Se dit d'un logiciel dont le code source est distribué librement et peut être modifié et redistribué par quiconque.",
        partOfSpeech: "adjective",
      },
      {
        word: "Agile",
        definition:
          "Méthode de gestion de projet qui préconise une approche itérative et collaborative, avec des cycles de développement courts.",
        partOfSpeech: "adjective",
      },
      {
        word: "Benchmark",
        definition:
          "Processus d'évaluation comparative qui consiste à mesurer les performances d'un produit ou service par rapport à la concurrence ou à un standard.",
        partOfSpeech: "noun",
      },
    ],
  },
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Récupérer les données de la catégorie
  const category = categoryData[params.slug as keyof typeof categoryData]

  if (!category) {
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
          <div className="text-center py-8">
            <p className="text-[#008170]">Catégorie non trouvée.</p>
          </div>
        </div>
      </main>
    )
  }

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

        <h2 className="text-3xl font-bold mb-8">{category.name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {category.terms.map((term, index) => (
            <Link
              key={index}
              href={`/word/${encodeURIComponent(term.word.toLowerCase())}`}
              className={cn(
                "bg-[#1E2A3B] p-8 flex flex-col justify-between min-h-[300px] transition-all duration-300",
                hoveredIndex === index ? "scale-[1.03]" : "",
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div>
                <h3 className="text-2xl font-medium mb-4">{term.word}</h3>
                <p className="text-[#008170]/80">{term.definition}</p>
              </div>
              <div className="mt-4 text-sm text-[#008170]/60">Cliquez pour plus de détails</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
