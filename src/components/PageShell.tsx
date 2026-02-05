import { type ReactNode, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BrandInfo } from "@/lib/brandSchema"
import { assetUrl } from "@/lib/asset"

interface PageShellProps {
  brand: BrandInfo
  sections: { id: string; label: string; visible: boolean }[]
  children: ReactNode
}

export function PageShell({ brand, sections, children }: PageShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const visibleSections = sections.filter((s) => s.visible)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileNavOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="absolute py-10 left-0 right-0 z-40 w-full bg-gradient-to-b from-black/30 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 flex items-center gap-4">
              {/* Logo */}
              {brand.logo && (
                <img
                  src={assetUrl(brand.logo)}
                  alt={`${brand.name} logo`}
                  className="h-20 w-auto object-contain"
                />
              )}
              <h1 className="text-xl font-bold text-white leading-1">Brand Style Guide</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
              {visibleSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="transition-colors text-white hover:text-foreground cursor-pointer"
                >
                  {section.label}
                </button>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={"md:hidden rounded" + (mobileNavOpen ? " bg-white" : "")}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              {mobileNavOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          {/* Mobile Navigation */}
          {mobileNavOpen && (
            <nav className="md:hidden border-t py-4 bg-white rounded px-4">
              <div className="space-y-3">
                {visibleSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-foreground/80 text-[#A2BAC5] cursor-pointer"
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Page Content */}
        <div className="space-y-16">{children}</div>
      </main>

      {/* Footer */}
      <footer className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* <p className="text-center text-sm text-main-blue">
            Made with ❤️ by Seed
          </p> */}
        </div>
      </footer>
    </div>
  )
}
