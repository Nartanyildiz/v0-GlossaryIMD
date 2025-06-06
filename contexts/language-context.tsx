"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "FR" | "ALL" | "IT" | "ANGL"

type Translations = {
  [key in Language]: {
    [key: string]: string
  }
}

// Définition des traductions
const translations: Translations = {
  FR: {
    categories: "CATÉGORIES",
    language: "LANGUE",
    darkMode: "MODE SOMBRE",
    lightMode: "MODE CLAIR",
    search: "Rechercher des mots ou définitions...",
    searchInCategory: "Rechercher dans {category}...",
    noResults: "Aucun mot trouvé correspondant à votre recherche.",
    clickForDetails: "Cliquez pour plus de détails",
  },
  ALL: {
    categories: "KATEGORIEN",
    language: "SPRACHE",
    darkMode: "DUNKLER MODUS",
    lightMode: "HELLER MODUS",
    search: "Wörter oder Definitionen suchen...",
    searchInCategory: "In {category} suchen...",
    noResults: "Keine Wörter gefunden, die Ihrer Suche entsprechen.",
    clickForDetails: "Klicken Sie für weitere Details",
  },
  IT: {
    categories: "CATEGORIE",
    language: "LINGUA",
    darkMode: "MODALITÀ SCURA",
    lightMode: "MODALITÀ CHIARA",
    search: "Cerca parole o definizioni...",
    searchInCategory: "Cerca in {category}...",
    noResults: "Nessuna parola trovata corrispondente alla tua ricerca.",
    clickForDetails: "Clicca per maggiori dettagli",
  },
  ANGL: {
    categories: "CATEGORIES",
    language: "LANGUAGE",
    darkMode: "DARK MODE",
    lightMode: "LIGHT MODE",
    search: "Search for words or definitions...",
    searchInCategory: "Search in {category}...",
    noResults: "No words found matching your search.",
    clickForDetails: "Click for more details",
  },
}

// Définition des noms de catégories dans différentes langues
export const categoryNames: { [key in Language]: { [key: string]: string } } = {
  FR: {
    "Communication, Marketing": "Communication, Marketing",
    "Design graphique, Typo": "Design graphique, Typo",
    "Ui, Ux": "Ui, Ux",
    "Web, Code": "Web, Code",
    "Photo, Vidéo, Audio": "Photo, Vidéo, Audio",
    "Autre ressources": "Autre ressources",
  },
  ALL: {
    "Communication, Marketing": "Kommunikation, Marketing",
    "Design graphique, Typo": "Grafikdesign, Typografie",
    "Ui, Ux": "Ui, Ux",
    "Web, Code": "Web, Code",
    "Photo, Vidéo, Audio": "Foto, Video, Audio",
    "Autre ressources": "Andere Ressourcen",
  },
  IT: {
    "Communication, Marketing": "Comunicazione, Marketing",
    "Design graphique, Typo": "Design grafico, Tipografia",
    "Ui, Ux": "Ui, Ux",
    "Web, Code": "Web, Codice",
    "Photo, Vidéo, Audio": "Foto, Video, Audio",
    "Autre ressources": "Altre risorse",
  },
  ANGL: {
    "Communication, Marketing": "Communication, Marketing",
    "Design graphique, Typo": "Graphic Design, Typography",
    "Ui, Ux": "Ui, Ux",
    "Web, Code": "Web, Code",
    "Photo, Vidéo, Audio": "Photo, Video, Audio",
    "Autre ressources": "Other Resources",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string>) => string
  translateCategory: (category: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("FR")

  // Fonction pour obtenir une traduction
  const t = (key: string, params?: Record<string, string>) => {
    let translation = translations[language][key] || key

    // Remplacer les paramètres si présents
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{${paramKey}}`, paramValue)
      })
    }

    return translation
  }

  // Fonction pour traduire un nom de catégorie
  const translateCategory = (category: string) => {
    return categoryNames[language][category] || category
  }

  // Persister la langue dans le localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateCategory }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
