import { type ReactNode, useState } from "react"
import { Menu, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BrandInfo } from "@/lib/brandSchema"

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
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-bold">{brand.name}</h1>
              {brand.description && (
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {brand.description}
                </p>
              )}
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {visibleSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {section.label}
                </button>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
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
            <nav className="md:hidden border-t py-4">
              <div className="space-y-3">
                {visibleSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Brand Info Banner */}
        <div className="mb-12 space-y-2">
          {brand.description && (
            <p className="text-lg text-muted-foreground sm:hidden">
              {brand.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Website
              </a>
            )}
            <span>•</span>
            <span>Last updated: {brand.updatedAt}</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="space-y-16">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Powered by static data.json
          </p>
        </div>
      </footer>
    </div>
  )
}
