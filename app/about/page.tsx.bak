"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MenuOverlay } from "@/components/menu-overlay"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-[#008170] p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">GLOSSAIRE IMD</h1>
          <MenuOverlay />
        </div>

        <Link href="/" className="flex items-center mb-12 text-[#008170]">
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Retour à l'accueil</span>
        </Link>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold mb-6">À PROPOS</h2>

          <p className="text-lg">
            Le Glossaire IMD est une ressource éducative conçue pour les étudiants et professionnels des médias
            interactifs et du design.
          </p>

          <p className="text-lg">
            Notre mission est de fournir des définitions claires et précises des termes techniques utilisés dans les
            domaines du design, du développement web, du marketing digital et des médias.
          </p>

          <p className="text-lg">
            Ce projet a été développé par l'équipe pédagogique de l'Institut des Médias Digitaux pour faciliter
            l'apprentissage et la communication entre les différents acteurs du domaine.
          </p>

          <div className="mt-12 pt-8 border-t border-[#008170]/20">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p>Pour toute question ou suggestion, veuillez nous contacter à l'adresse: contact@glossaire-imd.com</p>
          </div>
        </div>
      </div>
    </main>
  )
}
