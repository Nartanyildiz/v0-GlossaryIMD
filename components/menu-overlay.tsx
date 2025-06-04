"use client"

import { X, Home, Grid3X3, List, Square, Globe, Moon } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const { isDark, toggleTheme } = useTheme()
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = (newLocale: string) => {
    const path = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(path)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-[#232D3F] shadow-xl transform transition-transform duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#00D0B4] dark:text-[#0F0F0F]">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#00D0B4]/20 text-[#00D0B4] dark:text-[#0F0F0F]"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-4">
            <a
              href={`/${locale}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#00D0B4]/10 text-[#00D0B4] dark:text-[#0F0F0F] transition-colors"
            >
              <Home size={20} />
              {t("navigation.home")}
            </a>
            <a
              href={`/${locale}/categories`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#00D0B4]/10 text-[#00D0B4] dark:text-[#0F0F0F] transition-colors"
            >
              <Grid3X3 size={20} />
              {t("navigation.categories")}
            </a>
            <a
              href={`/${locale}/list`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#00D0B4]/10 text-[#00D0B4] dark:text-[#0F0F0F] transition-colors"
            >
              <List size={20} />
              {t("navigation.list")}
            </a>
            <a
              href={`/${locale}/frames`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#00D0B4]/10 text-[#00D0B4] dark:text-[#0F0F0F] transition-colors"
            >
              <Square size={20} />
              {t("navigation.frames")}
            </a>
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-[#00D0B4]/20">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-[#00D0B4] dark:text-[#0F0F0F] flex items-center gap-2">
                  <Globe size={16} />
                  {t("navigation.language")}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {["fr", "en", "de", "it"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className={`p-2 text-xs rounded-lg transition-colors ${
                        locale === lang
                          ? "bg-[#00D0B4] text-white dark:text-[#0F0F0F]"
                          : "bg-gray-100 dark:bg-[#00D0B4]/10 text-[#00D0B4] dark:text-[#0F0F0F] hover:bg-[#00D0B4]/20"
                      }`}
                    >
                      {t(`languages.${lang}`)}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-[#00D0B4]/10 text-[#00D0B4] dark:text-[#0F0F0F] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Moon size={20} />
                  {t("navigation.darkMode")}
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-[#00D0B4]/20">{isDark ? "ON" : "OFF"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
