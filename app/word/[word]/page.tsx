import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MenuOverlay } from "@/components/menu-overlay"

// Dictionnaire complet avec informations détaillées
const dictionaryData = {
  "mood board": {
    word: "Mood board",
    partOfSpeech: "noun",
    category: "Design",
    definition:
      "Planche d'images et de matières dont le but est d'aider à la détermination des choix stylistiques dans un projet.",
    extendedDefinition:
      "Collage composé de photographies, de formes, de couleurs, de matières ou d'éléments graphiques pour communiquer les inspirations et les orientations graphiques d'un projet. Un mood board sert à établir l'ambiance visuelle et émotionnelle d'un projet de design.",
    etymology: "De l'anglais 'mood' (humeur, ambiance) et 'board' (tableau, planche).",
    examples: [
      "Le designer a présenté un mood board composé d'images urbaines pour illustrer l'ambiance recherchée pour le site web.",
      "Avant de commencer la conception, l'équipe a créé un mood board collaboratif pour aligner leur vision.",
      "Le mood board incluait des échantillons de couleurs, des typographies et des textures qui définissaient l'identité visuelle du projet.",
    ],
  },
  wireframe: {
    word: "Wireframe",
    partOfSpeech: "noun",
    category: "Design",
    definition:
      "Schéma fonctionnel d'une interface qui représente la structure, la hiérarchie des informations et les principaux éléments d'une interface, sans traitement graphique.",
    extendedDefinition:
      "Un wireframe est une représentation visuelle simplifiée d'une interface utilisateur, qui se concentre sur l'allocation de l'espace, la priorisation du contenu, les fonctionnalités disponibles et les comportements attendus. Il sert de guide pour le développement et la conception détaillée.",
    etymology: "De l'anglais 'wire' (fil) et 'frame' (cadre), évoquant un squelette ou une structure filaire.",
    examples: [
      "L'équipe UX a présenté les wireframes du site pour validation avant de passer à la conception graphique.",
      "Les wireframes permettent de tester l'ergonomie d'un site sans être distrait par les éléments graphiques.",
      "Nous avons itéré plusieurs versions de wireframes avant de trouver la structure optimale pour l'application.",
    ],
  },
  seo: {
    word: "SEO",
    partOfSpeech: "noun",
    category: "Communication, Marketing",
    definition:
      "Ensemble de techniques visant à optimiser la visibilité d'un site web dans les résultats des moteurs de recherche.",
    extendedDefinition:
      "Le Search Engine Optimization regroupe un ensemble de méthodes et de techniques qui visent à améliorer le positionnement d'un site web dans les résultats organiques des moteurs de recherche. Cela inclut l'optimisation du contenu, des balises HTML, de la structure du site et des liens entrants.",
    etymology: "Acronyme de l'anglais 'Search Engine Optimization' (optimisation pour les moteurs de recherche).",
    examples: [
      "Une bonne stratégie SEO a permis au site d'apparaître en première page des résultats de recherche.",
      "L'expert en SEO a recommandé d'améliorer la vitesse de chargement du site pour un meilleur classement.",
      "L'analyse des mots-clés est une étape fondamentale dans toute démarche SEO efficace.",
    ],
  },
  moodboard: {
    word: "Moodboard",
    partOfSpeech: "noun",
    category: "Communication, Marketing",
    definition:
      "Planche d'inspiration visuelle regroupant des images, couleurs, textures et éléments graphiques pour définir l'ambiance d'un projet.",
    extendedDefinition:
      "Un moodboard est un outil créatif qui permet de rassembler et d'organiser des éléments visuels pour communiquer une ambiance, un style ou une direction créative. Il sert de référence visuelle et de guide pour maintenir la cohérence tout au long d'un projet.",
    etymology: "De l'anglais 'mood' (humeur, ambiance) et 'board' (tableau, planche).",
    examples: [
      "Le directeur artistique a préparé un moodboard pour présenter sa vision du projet au client.",
      "Le moodboard incluait des photographies urbaines, une palette de couleurs industrielles et des typographies modernes.",
      "Grâce au moodboard, toute l'équipe créative était alignée sur l'esthétique recherchée pour la campagne.",
    ],
  },
  // Ajoutez d'autres mots ici selon vos besoins
}

// Cette fonction est nécessaire pour la génération statique avec output: export
export function generateStaticParams() {
  // Retourne un tableau d'objets avec les paramètres pour chaque page statique à générer
  return Object.keys(dictionaryData).map((word) => ({
    word: word.toLowerCase(),
  }))
}

export default function WordPage({ params }: { params: { word: string } }) {
  const wordData = dictionaryData[params.word.toLowerCase()]

  if (!wordData) {
    return (
      <main className="min-h-screen p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight transition-colors">
                GLOSSAIRE IMD
              </h1>
            </Link>
            <MenuOverlay />
          </div>

          <div className="p-6 border border-opacity-20 rounded-lg">
            <h2 className="text-xl font-heading font-medium mb-2">Mot non trouvé</h2>
            <p className="font-body opacity-90">
              Nous n'avons pas pu trouver le mot "{params.word}" dans notre glossaire.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight transition-colors">
              GLOSSAIRE IMD
            </h1>
          </Link>
          <MenuOverlay />
        </div>

        <div className="mb-6">
          <Link href="/" className="inline-flex items-center font-body opacity-70 hover:opacity-100 transition-opacity">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour au glossaire
          </Link>
        </div>

        <div className="p-6 border border-opacity-20 rounded-lg space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-heading font-bold">{wordData.word}</h2>
            </div>
            <span className="text-xs px-2 py-1 rounded-full border border-opacity-20 font-body opacity-20">
              {wordData.category}
            </span>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-2">Définition</h3>
            <p className="font-body opacity-90">{wordData.extendedDefinition}</p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-2">Étymologie</h3>
            <p className="font-body opacity-90">{wordData.etymology}</p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-2">Exemples</h3>
            <ul className="list-disc pl-5 space-y-1">
              {wordData.examples.map((example, index) => (
                <li key={index} className="font-body opacity-90">
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
