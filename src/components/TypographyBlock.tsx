import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { assetUrl } from "@/lib/asset"
import type { Typography, Font } from "@/lib/brandSchema"

interface TypographyBlockProps {
  typography: Typography
}

export function TypographyBlock({ typography }: TypographyBlockProps) {
  useEffect(() => {
    // Load fonts dynamically
    typography.fonts.forEach((font) => {
      if (font.source.type === "google") {
        loadGoogleFont(font)
      } else if (font.source.type === "file") {
        loadLocalFont(font)
      }
    })
  }, [typography.fonts])

  return (
    <div className="space-y-6">
      {typography.fonts.length > 1 ? (
      <Tabs defaultValue="0" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
          {typography.fonts.map((font, idx) => (
            <TabsTrigger key={idx} value={idx.toString()}>
              {font.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {typography.fonts.map((font, idx) => (
          <TabsContent key={idx} value={idx.toString()}>
            <Card>
              <CardHeader>
                <CardTitle>{font.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Type Scale Preview */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">
                    Type Scale
                  </h4>
                  <div className="space-y-3">
                    {[48, 32, 24, 20, 16, 14, 12].map((size) => (
                      <div key={size} className="flex items-baseline gap-4">
                        <span className="text-xs text-muted-foreground w-12 shrink-0">
                          {size}px
                        </span>
                        <p
                          style={{
                            fontFamily: font.name,
                            fontSize: `${size}px`,
                          }}
                        >
                          The quick brown fox jumps over the lazy dog
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Weight Variations (if available) */}
                {font.source.type === "google" && (
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">
                      Available Weights
                    </h4>
                    <div className="space-y-2">
                      {font.source.weights.map((weight) => (
                        <p
                          key={weight}
                          style={{
                            fontFamily: font.name,
                            fontWeight: weight,
                            fontSize: "16px",
                          }}
                        >
                          Weight {weight}: The quick brown fox jumps
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      ) : (
        /* Single font - no tabs needed */
        typography.fonts.map((font, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{font.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Type Scale Preview */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">
                  Type Scale
                </h4>
                <div className="space-y-3">
                  {[48, 32, 24, 20, 16, 14, 12].map((size) => (
                    <div key={size} className="flex items-baseline gap-4">
                      <span className="text-xs text-muted-foreground w-12 shrink-0">
                        {size}px
                      </span>
                      <p
                        style={{
                          fontFamily: font.name,
                          fontSize: `${size}px`,
                        }}
                      >
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Weight Variations (if available) */}
              {font.source.type === "google" && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">
                    Available Weights
                  </h4>
                  <div className="space-y-2">
                    {font.source.weights.map((weight) => (
                      <p
                        key={weight}
                        style={{
                          fontFamily: font.name,
                          fontWeight: weight,
                          fontSize: "16px",
                        }}
                      >
                        Weight {weight}: The quick brown fox jumps
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}

      {/* Typography Examples */}
      {typography.examples.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Usage Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {typography.examples.map((example, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="font-semibold">{example.label}</span>
                  <span>•</span>
                  <span>{example.font}</span>
                  <span>•</span>
                  <span>{example.sizePx}px</span>
                  <span>•</span>
                  <span>Weight {example.weight}</span>
                </div>
                <p
                  style={{
                    fontFamily: example.font,
                    fontSize: `${example.sizePx}px`,
                    fontWeight: example.weight,
                    lineHeight: example.lineHeight,
                    letterSpacing: example.letterSpacing,
                  }}
                >
                  {example.text}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function loadGoogleFont(font: Font) {
  if (font.source.type !== "google") return
  
  const family = font.source.family
  const weights = font.source.weights.join(";")
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+"
  )}:wght@${weights}&display=swap`
  
  // Check if already loaded
  if (document.querySelector(`link[href="${url}"]`)) return
  
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = url
  document.head.appendChild(link)
}

function loadLocalFont(font: Font) {
  if (font.source.type !== "file") return
  
  // Check if already loaded
  const styleId = `font-${font.name.replace(/\s/g, "-")}`
  if (document.getElementById(styleId)) return
  
  const fontFaces = font.source.files
    .map(
      (file) => `
    @font-face {
      font-family: "${font.name}";
      font-weight: ${file.weight};
      font-style: ${file.style};
      src: url("${assetUrl(file.src)}") format("woff2");
      font-display: swap;
    }
  `
    )
    .join("\n")
  
  const style = document.createElement("style")
  style.id = styleId
  style.textContent = fontFaces
  document.head.appendChild(style)
}
