import { Download } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { assetUrl } from "@/lib/asset"
import type { Logo } from "@/lib/brandSchema"

interface LogoBlockProps {
  logos: Logo[]
}

export function LogoBlock({ logos }: LogoBlockProps) {

  return (
    <>
      <div className="space-y-6">
      {logos.map((logo, idx) => (
        <Card key={idx} className="border-0 p-0 rounded-none shadow-none">
          <CardContent className="p-0">
            <div className="grid gap-4 sm:gap-0 sm:grid-cols-2">
              {logo.variants.map((variant, vIdx) => (
                <div
                  key={vIdx}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-center justify-center bg-muted/50 rounded">
                    <img
                      src={assetUrl(variant.src)}
                      alt={`${logo.name} - ${variant.label}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex items-center ml-auto gap-4 mr-4 text-[#A2BAC5]">
                    <span className="text-sm font-medium">PNG / SVG</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        asChild
                        className="rounded-none"
                      >
                        <a
                          href={assetUrl(variant.assetPath)}
                          download
                          className="flex items-center gap-1"
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </a>
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
    </>
  )
}
