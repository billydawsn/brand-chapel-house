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
    { id: "gallery", label: "Gallery", visible: !!data.gallery?.length },
  ]

  return (
    <PageShell brand={data.brand} sections={sections}>
      {data.logos && data.logos.length > 0 && (
        <Section id="logos" title="Logo" description="Lorem ipsum dolor sit amet , consec tetur adipiscing elit , sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat . Duis aute irure dolor in reprehenderit in">
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

      {data.fullwidthBlocks && data.fullwidthBlocks[0] && (
        <FullwidthBlock block={data.fullwidthBlocks[0]} />
      )}

      {data.colors && data.colors.length > 0 && (
        <Section id="colors" title="Colour">
          <ColorPaletteBlock colors={data.colors} />
        </Section>
      )}

      {data.fullwidthBlocks && data.fullwidthBlocks[1] && (
        <FullwidthBlock block={data.fullwidthBlocks[1]} />
      )}

      {data.typography && (
        <Section id="typography" title="Typography" description="Lorem ipsum dolor sit amet , consec tetur adipiscing elit , sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat . Duis aute irure dolor in reprehenderit in">
          <TypographyBlock typography={data.typography} />
        </Section>
      )}

      {data.gallery && data.gallery.length > 0 && (
        <Section id="gallery" title="Gallery">
          <GalleryBlock gallery={data.gallery} />
        </Section>
      )}

      {data.fullwidthBlocks && data.fullwidthBlocks[2] && (
        <FullwidthBlock block={data.fullwidthBlocks[2]} />
      )}
    </PageShell>
  )
}

export default App
