"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export function MenuOverlay() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)
  const circleRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    if (isOpen) {
      setAnimationComplete(false)
      setShowLanguages(false)
      setTimeout(() => {
        setIsOpen(false)
      }, 500) // Match this with the CSS animation duration
    } else {
      setIsOpen(true)
      setTimeout(() => {
        setAnimationComplete(true)
      }, 500) // Match this with the CSS animation duration
    }
  }

  const toggleLanguages = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowLanguages(!showLanguages)
  }

  const changeLanguage = (lang: "FR" | "ALL" | "IT" | "ANGL") => {
    setLanguage(lang)
    setShowLanguages(false)
  }

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-[#0F0F0F] text-[#00D0B4] h-16 w-16 z-50 fixed top-6 right-6 md:top-6 md:right-6"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <X className="h-8 w-8 text-[#00D0B4]" />
        ) : (
          <div className="flex flex-col justify-center items-center gap-1.5">
            <div className="w-8 h-0.5 bg-[#00D0B4] rounded-full"></div>
            <div className="w-8 h-0.5 bg-[#00D0B4] rounded-full"></div>
            <div className="w-8 h-0.5 bg-[#00D0B4] rounded-full"></div>
          </div>
        )}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div
            ref={circleRef}
            className={cn(
              "absolute top-6 right-6 md:top-6 md:right-6 w-16 h-16 rounded-full bg-[#0F0F0F] transform origin-center pointer-events-auto",
              isOpen ? "animate-circle-expand" : "animate-circle-contract",
            )}
          ></div>

          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-auto",
              animationComplete ? "opacity-100" : "opacity-0",
            )}
          >
            <nav className="space-y-16 text-center">
              <Link
                href="/categories"
                className="block text-4xl md:text-5xl font-heading font-medium tracking-wide text-[#00D0B4] hover:text-white transition-colors"
              >
                {t("categories")}
              </Link>

              <div className="relative">
                <button
                  onClick={toggleLanguages}
                  className="block text-4xl md:text-5xl font-heading font-medium tracking-wide text-[#00D0B4] hover:text-white transition-colors mx-auto"
                >
                  {t("language")} ({language})
                </button>

                {showLanguages && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-6 bg-[#232D3F] rounded-lg p-4 min-w-[200px] z-50">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        className={`p-3 text-xl font-body ${language === "FR" ? "bg-[#00D0B4] text-[#0F0F0F]" : "text-[#00D0B4] hover:bg-[#1A2530]"} rounded transition-colors`}
                        onClick={() => changeLanguage("FR")}
                      >
                        FR
                      </button>
                      <button
                        className={`p-3 text-xl font-body ${language === "ALL" ? "bg-[#00D0B4] text-[#0F0F0F]" : "text-[#00D0B4] hover:bg-[#1A2530]"} rounded transition-colors`}
                        onClick={() => changeLanguage("ALL")}
                      >
                        ALL
                      </button>
                      <button
                        className={`p-3 text-xl font-body ${language === "IT" ? "bg-[#00D0B4] text-[#0F0F0F]" : "text-[#00D0B4] hover:bg-[#1A2530]"} rounded transition-colors`}
                        onClick={() => changeLanguage("IT")}
                      >
                        IT
                      </button>
                      <button
                        className={`p-3 text-xl font-body ${language === "ANGL" ? "bg-[#00D0B4] text-[#0F0F0F]" : "text-[#00D0B4] hover:bg-[#1A2530]"} rounded transition-colors`}
                        onClick={() => changeLanguage("ANGL")}
                      >
                        ANGL
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
