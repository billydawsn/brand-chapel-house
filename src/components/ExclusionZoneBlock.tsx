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
