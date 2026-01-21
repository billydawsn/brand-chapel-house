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
          <div className="text-main-blue whitespace-pre-line mt-4 mb-8 max-w-md space-y-4">
            <p>To preserve clarity and impact, the logo must always be surrounded by a clear space free from text, imagery or graphic elements.</p>
            <p>The exclusion zone is defined by the height of the central emblem within the logo. This measurement should be applied equally on all sides.</p>  
            <p>No elements should enter this space under any circumstances.</p>
          </div>
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
