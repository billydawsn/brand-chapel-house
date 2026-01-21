import { useEffect, useState } from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PageShell } from "@/components/PageShell"
import { Section } from "@/components/Section"
import { LogoBlock } from "@/components/LogoBlock"
import { ExclusionZoneBlock } from "@/components/ExclusionZoneBlock"
import { IncorrectUsageBlock } from "@/components/IncorrectUsageBlock"
import { FullwidthBlock } from "@/components/FullwidthBlock"
import { ColorPaletteBlock } from "@/components/ColorPaletteBlock"
import { TypographyBlock } from "@/components/TypographyBlock"
import { GalleryBlock } from "@/components/GalleryBlock"
import { BrandGuidelinesSchema, type BrandGuidelines } from "@/lib/brandSchema"
import { assetUrl } from "@/lib/asset"

function App() {
  const [data, setData] = useState<BrandGuidelines | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(assetUrl("data.json"))
        
        if (!response.ok) {
          throw new Error(
            `Failed to load data.json (${response.status} ${response.statusText})`
          )
        }
        
        const json = await response.json()
        
        // Validate with Zod
        const parsed = BrandGuidelinesSchema.parse(json)
        setData(parsed)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unknown error occurred")
        }
        console.error("Error loading brand guidelines:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p>Loading brand guidelines...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Brand Guidelines</AlertTitle>
          <AlertDescription className="mt-2">
            {error || "Failed to load data.json"}
            <div className="mt-4 text-sm">
              <p className="font-semibold">Troubleshooting:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Ensure <code className="bg-muted px-1 rounded">public/data.json</code> exists</li>
                <li>Check that the JSON is valid</li>
                <li>Verify all required fields are present</li>
                <li>Check the browser console for more details</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // Determine which sections are visible
  const sections = [
    { id: "logos", label: "Logos", visible: !!data.logos?.length },
    { id: "exclusion-zone", label: "Exclusion Zone", visible: false },
    { id: "incorrect-usage", label: "Incorrect Usage", visible: false },
    { id: "colors", label: "Colours", visible: !!data.colors?.length },
    { id: "typography", label: "Typography", visible: !!data.typography },
    { id: "gallery", label: "Application", visible: !!data.gallery?.length },
  ]

  return (
    <PageShell brand={data.brand} sections={sections}>

      <Section id="brand" title="Brand" className="mt-10"description="Chapel House is a calm, considered coastal brand rooted in comfort, quality and understated elegance. The visual identity reflects a balance between heritage and modern living, drawing inspiration from natural textures, seaside tones and relaxed interiors. Every application of the brand should feel warm, welcoming and timeless rather than trend-led or decorative. Consistency across all touch points is essential to maintain recognition and protect the integrity of the brand.">
        <></>
      </Section>

      {data.fullwidthBlocks && data.fullwidthBlocks[0] && (
        <FullwidthBlock block={data.fullwidthBlocks[0]} />
      )}

      {data.logos && data.logos.length > 0 && (
        <Section id="logos" title="Logo" description="The Chapel House logo is the primary visual identifier and must be used consistently across all communications. Designed for both print and digital use, it should never be altered or recreated and should always appear clear, legible and unobstructed.\nThe logo is supplied in PNG and SVG formats. SVG files are preferred for digital use and large-scale print to ensure crisp reproduction, while PNG files are suitable for everyday digital applications.\nReduced opacity may be used only in considered, editorial-style applications and should never fall below 50%. Opacity should not be applied in functional contexts such as headers, footers or navigation, where clarity is essential.">
          <LogoBlock logos={data.logos} />
        </Section>
      )}

      {data.exclusionZone && (
        <Section id="exclusion-zone">
          <ExclusionZoneBlock exclusionZone={data.exclusionZone} />
        </Section>
      )}

      {data.incorrectUsage && data.incorrectUsage.length > 0 && (
        <Section id="incorrect-usage" title="Incorrect Usage">
          <IncorrectUsageBlock items={data.incorrectUsage} />
        </Section>
      )}

      {data.fullwidthBlocks && data.fullwidthBlocks[1] && (
        <FullwidthBlock block={data.fullwidthBlocks[1]} />
      )}

      {data.colors && data.colors.length > 0 && (
        <Section id="colors" title="Colour" description="The Chapel House colour palette is inspired by coastal landscapes, natural materials and soft interiors. It has been designed to feel calm, warm and sophisticated.\nPrimary colours should dominate. Secondary colours are used to support, never to overpower. Avoid using multiple accent colours together in a single composition.">
          <ColorPaletteBlock colors={data.colors} />
        </Section>
      )}

      {data.fullwidthBlocks && data.fullwidthBlocks[2] && (
        <FullwidthBlock block={data.fullwidthBlocks[2]} />
      )}

      {data.typography && (
        <Section id="typography" title="Typography" description="Typography plays a key role in expressing the Chapel House personality. It should feel elegant, readable and quietly confident.\nMartel is the primary typeface and is used for headings and key brand statements, bringing a sense of character and refinement to the identity. Mulish is the supporting typeface, used for subheadings, body copy and functional elements, chosen for its clarity and modern balance. \nTogether, the two typefaces create a clear hierarchy while maintaining a consistent, understated tone. Spacing, weight and case should be used thoughtfully to ensure content feels considered and easy to read, never dense or overly styled.">
          <TypographyBlock typography={data.typography} />
        </Section>
      )}

      {data.gallery && data.gallery.length > 0 && (
        <Section id="gallery" className="mt-32" title="Application" description="The Chapel House brand should be applied consistently across all applications to create a calm, refined and recognisable presence. Colour, typography and imagery should be used with restraint, allowing space and balance to lead each layout. Clarity and simplicity should always take priority, ensuring the brand feels timeless, intentional and true to the Chapel House character.">
          <GalleryBlock gallery={data.gallery} />
        </Section>
      )}

    </PageShell>
  )
}

export default App
