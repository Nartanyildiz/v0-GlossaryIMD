"use client"

import { useState, useRef, useEffect } from "react"
import { X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MenuOverlay() {
  const [isOpen, setIsOpen] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const circleRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    if (isOpen) {
      setAnimationComplete(false)
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
        className="rounded-full bg-[#008170] text-black h-14 w-14 z-50 fixed top-6 right-6 md:top-12 md:right-12"
        onClick={toggleMenu}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div
            ref={circleRef}
            className={cn(
              "absolute top-6 right-6 md:top-12 md:right-12 w-14 h-14 rounded-full bg-[#008170] transform origin-center pointer-events-auto",
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
                href="/about"
                className="block text-4xl md:text-5xl font-medium tracking-wide text-[#00573F] hover:text-black transition-colors"
              >
                À PROPOS
              </Link>
              <Link
                href="/language"
                className="block text-4xl md:text-5xl font-medium tracking-wide text-[#00573F] hover:text-black transition-colors"
              >
                LANGUE
              </Link>
              <button className="block text-4xl md:text-5xl font-medium tracking-wide text-[#00573F] hover:text-black transition-colors mx-auto">
                MODE SOMBRE
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
