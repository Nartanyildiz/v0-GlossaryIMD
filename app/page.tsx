"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MenuOverlay } from "@/components/menu-overlay"

export default function TitlePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center relative">
      <MenuOverlay />

      <div className="text-center px-4 flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-bold text-[#008170] tracking-tight mb-16">GLOSSAIRE IMD</h1>

        <Link href="/list">
          <Button className="bg-[#1E2A3B] hover:bg-[#263447] text-[#008170] font-medium px-12 py-6 text-xl">
            Voir la liste
          </Button>
        </Link>
      </div>
    </main>
  )
}
