import { Download, Copy } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { assetUrl, assetAbsoluteUrl } from "@/lib/asset"
import type { Logo } from "@/lib/brandSchema"

interface LogoBlockProps {
  logos: Logo[]
}

export function LogoBlock({ logos }: LogoBlockProps) {
  const handleCopyLink = (src: string, label: string) => {
    const absoluteUrl = assetAbsoluteUrl(src)
    navigator.clipboard.writeText(absoluteUrl)
    toast.success(`${label} link copied to clipboard`)
  }

  return (
    <div className="space-y-6">
      {logos.map((logo, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>{logo.name}</CardTitle>
            {logo.description && (
              <CardDescription>{logo.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {logo.variants.map((variant, vIdx) => (
                <div
                  key={vIdx}
                  className="flex flex-col space-y-3 rounded-lg border p-4"
                >
                  <div className="flex aspect-video items-center justify-center bg-muted/50 rounded p-4">
                    <img
                      src={assetUrl(variant.src)}
                      alt={`${logo.name} - ${variant.label}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{variant.label}</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a
                          href={assetUrl(variant.src)}
                          download
                          className="flex items-center gap-1"
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyLink(variant.src, variant.label)}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy link</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
