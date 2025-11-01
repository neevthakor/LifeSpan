"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, ChevronDown } from "lucide-react"

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
]

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0])
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language)
    setIsOpen(false)
    // Here you would typically update the app's language context
    console.log(`[v0] Language changed to: ${language.name}`)
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover-lift bg-transparent"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{selectedLanguage.flag}</span>
        <span className="hidden md:inline">{selectedLanguage.name}</span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <Card className="absolute top-full right-0 mt-2 w-48 z-50 animate-fade-in">
          <CardContent className="p-2">
            <div className="space-y-1">
              {languages.map((language) => (
                <Button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className="w-full justify-start hover-lift"
                >
                  <span className="mr-2">{language.flag}</span>
                  <span>{language.name}</span>
                  {selectedLanguage.code === language.code && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Active
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
