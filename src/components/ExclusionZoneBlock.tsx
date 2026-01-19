import { Container } from "@/components/ui/container"
import { assetUrl } from "@/lib/asset"
import type { ExclusionZone } from "@/lib/brandSchema"

interface ExclusionZoneBlockProps {
  exclusionZone: ExclusionZone
}

export function ExclusionZoneBlock({ exclusionZone }: ExclusionZoneBlockProps) {
  return (
    <Container>
      <div className="space-y-8">
      {/* Main content area with description and primary image */}
      <div className="grid gap-8 lg:grid-cols-2 items-start">
        <div className="max-w-none">
          <h2 className="text-3xl font-bold tracking-tight mb-0">Exclusion Zone</h2>
          <p className="text-main-blue whitespace-pre-line mt-4 mb-8 max-w-md">
            {exclusionZone.description}
          </p>
        </div>
        <div className="flex items-center justify-center bg-muted/50 rounded-lg">
          <img
            src={assetUrl(exclusionZone.mainImage)}
            alt="Exclusion zone diagram"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {/* Example images below */}
      {exclusionZone.examples && exclusionZone.examples.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {exclusionZone.examples.map((example: string, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-center bg-muted/50 rounded-lg"
            >
              <img
                src={assetUrl(example)}
                alt={`Exclusion zone example ${idx + 1}`}
                className="max-w-full h-auto"
              />
            </div>
          ))}
        </div>
      )}
      </div>
    </Container>
  )
}
