import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { assetUrl } from "@/lib/asset"
import type { Typography, Font } from "@/lib/brandSchema"
import { Download } from "lucide-react"


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

  const showTabs = typography.fonts.length > 1 || typography.examples.length > 0

  const typePreviews = {
    'martel': 'welcome to chapel house',
    'mulish': 'Explore the varied beauty of West Cornwall',
  } as { [key: string]: string }

  return (
    <Container>
      <div className="space-y-6">
      {showTabs ? (
        <Tabs defaultValue="0" className="w-full bg-transparent">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 md:col-start-2">
              <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto bg-transparent gap-2">
                {typography.fonts.map((font, idx) => (
                  <TabsTrigger key={idx} value={idx.toString()}>
                    {font.name}
                  </TabsTrigger>
                ))}
                {typography.examples.length > 0 && (
                  <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
                )}
              </TabsList>
            </div>
          </div>
          
          {typography.fonts.map((font, idx) => (
            <TabsContent key={idx} value={idx.toString()}>
              <Card className="border-none p-0 shadow-none">
                <CardHeader className="p-0">
                  <div className="flex items-center justify-between">
                    {font.source.type === "file" && font.source.files[0] && (
                      <a
                        href={assetUrl(font.source.files[0].src)}
                        download
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 p-0 mt-12">
                  {/* Weight Variations Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    
                    <div className="mt-auto">
                      {/* Large Aa */}
                      <div className="flex items-center justify-start">
                        <p
                          style={{
                            fontFamily: font.name,
                            fontSize: "120px",
                            lineHeight: "0.8",
                          }}
                          className="text-main-blue"
                        >
                          Aa
                        </p>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      
                      <div className="flex gap-3 items-center mb-6 ">
                        <CardTitle className="lowercase text-main-blue" style={{
                        fontFamily: font.name,
                        fontWeight: 300
                        }}>{font.name}</CardTitle>

                        {/* google download link if google font */}
                        {font.source.type === "google" && (
                          <a
                            href={`https://fonts.google.com/specimen/${font.source.family.replace(/ /g, "+")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
                          >
                            <Download className="h-4 w-4 inline-block text-muted-foreground" />
                          </a>
                        )}                        
                      </div>
                      
                      {/* Alphabet Display */}
                      <div className="text-left">
                        <p
                          style={{
                            fontFamily: font.name,
                            fontSize: "32px",
                            lineHeight: "1.4",
                          }}
                          className="text-main-blue"
                        >
                          Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789
                        </p>
                      </div>

                      <div className="items-start mt-8">
                        
                        <div className="">
                          {/* Weight Labels */}
                          {font.source.type === "google" && (
                            <div className="">

                                {font.source.weights.map((weight) => (
                                  <div key={weight} className="grid md:grid-cols-4 gap-2 md:gap-8 py-6 border-b md:py-0 md:mt-3 md:border-b-0">
                                    <div className="col-span-1">
                                      <p
                                        key={weight}
                                        style={{
                                          fontFamily: font.name,
                                          fontWeight: weight,
                                          fontSize: "20px",
                                        }}
                                        className="text-main-blue"
                                      >
                                        {getWeightName(weight)}
                                      </p>
                                    </div>
                                    <div className="col-span-3">
                                      {/* Example Text */}
                                      <p
                                        style={{
                                          fontFamily: font.name,
                                          fontWeight: weight,
                                          fontSize: "20px",
                                        }}
                                        className="text-main-blue md:text-right"
                                      >
                                        {typePreviews[font.name.toLowerCase()] || 'welcome to chapel house'}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}
                          {font.source.type === "file" && (
                            <div className="col-span-1">
                              {font.source.files.map((file, fileIdx) => (
                                <p
                                  key={fileIdx}
                                  style={{
                                    fontFamily: font.name,
                                    fontWeight: file.weight,
                                    fontStyle: file.style,
                                    fontSize: "20px",
                                  }}
                                  className="text-main-blue"
                                >
                                  {getWeightName(file.weight)}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>

                    </div>

                    

                    
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          {/* Hierarchy Tab */}
          {typography.examples.length > 0 && (
            <TabsContent value="hierarchy" className="mt-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center py-8">

                <div className="text-left md:text-right">
                  <p className="text-xs font-semibold text-[#335C70] uppercase tracking-wide">TITLE</p>
                  <p className="text-xs text-[#335C70] mt-1">MARTEL REGULAR, LOWER CASE</p>
                  <p className="text-xs text-[#A2BAC5] mt-1">HARBOUR BLUE</p>
                </div>

                <div className="md:col-span-2">
                  <h1 className="text-5xl md:text-6xl text-[#335C70]" style={{ fontFamily: 'Martel', fontWeight: 400 }}>
                    workshops at chapel house
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-t py-8">
                <div className="text-left md:text-right">
                    <p className="text-xs font-semibold text-[#335C70] uppercase tracking-wide">SUB HEADER</p>
                    <p className="text-xs text-[#335C70] mt-1">MULISH REGULAR, UPPER CASE</p>
                    <p className="text-xs text-[#A2BAC5] mt-1">SEA MIST BLUE</p>
                  </div>

                <div className="md:col-span-2">
                  <h2 className="text-2xl md:text-3xl text-[#A2BAC5] uppercase tracking-wide" style={{ fontFamily: 'Mulish', fontWeight: 400 }}>
                    OCTOBER WORKSHOPS
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-t py-8">
                <div className="text-left md:text-right">
                    <p className="text-xs font-semibold text-[#335C70] uppercase tracking-wide">BODY COPY</p>
                    <p className="text-xs text-[#335C70] mt-1">MULISH REGULAR, SENTENCE CASE</p>
                    <p className="text-xs text-[#A2BAC5] mt-1">HARBOUR BLUE</p>
                  </div>

                <div className="md:col-span-2">
                    <div className="text-base text-[#335C70] space-y-2" style={{ fontFamily: 'Mulish', fontWeight: 400 }}>
                      <p>18<sup>th</sup> - Money Mindset with Mindset Coach & EFT Practitioner</p>
                      <p>24<sup>th</sup> - Ink Drawing Workshop with Local Artist</p>
                      <p>25<sup>th</sup> - Herbal Sauna Ritual with Medical Herbalist</p>
                    </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-t py-8">
                <div className="text-left md:text-right">
                    <p className="text-xs font-semibold text-[#335C70] uppercase tracking-wide">BUTTON</p>
                    <p className="text-xs text-[#335C70] mt-1">MULISH SEMIBOLD, TITLE CASE</p>
                    <p className="text-xs text-[#A2BAC5] mt-1">CHALK LINEN</p>
                  </div>

                 <div className="md:col-span-2">
                    <button 
                      className="px-13 py-3 text-[#F3EFE6] bg-[#D87337]" 
                      style={{ fontFamily: 'Mulish', fontWeight: 600 }}
                    >
                      Explore Now
                    </button>
                  </div>
              </div>

              
            </TabsContent>
          )}
        </Tabs>
      ) : (
        /* Single font, no examples - no tabs needed */
        typography.fonts.map((font, idx) => (
          <Card key={idx}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-main-blue">{font.name}</CardTitle>
                {font.source.type === "file" && font.source.files[0] && (
                  <a
                    href={assetUrl(font.source.files[0].src)}
                    download
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Alphabet Display */}
              <div className="text-center">
                <p
                  style={{
                    fontFamily: font.name,
                    fontSize: "32px",
                    lineHeight: "1.4",
                  }}
                  className="text-main-blue"
                >
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789
                </p>
              </div>

              {/* Weight Variations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Large Aa */}
                <div className="flex items-center justify-center md:justify-start">
                  <p
                    style={{
                      fontFamily: font.name,
                      fontSize: "120px",
                      lineHeight: "1",
                    }}
                    className="text-main-blue"
                  >
                    Aa
                  </p>
                </div>

                {/* Weight Labels */}
                {font.source.type === "google" && (
                  <div className="flex flex-col justify-center space-y-3">
                    {font.source.weights.map((weight) => (
                      <p
                        key={weight}
                        style={{
                          fontFamily: font.name,
                          fontWeight: weight,
                          fontSize: "20px",
                        }}
                        className="text-main-blue"
                      >
                        {getWeightName(weight)}
                      </p>
                    ))}
                  </div>
                )}
                {font.source.type === "file" && (
                  <div className="flex flex-col justify-center space-y-3">
                    {font.source.files.map((file, fileIdx) => (
                      <p
                        key={fileIdx}
                        style={{
                          fontFamily: font.name,
                          fontWeight: file.weight,
                          fontStyle: file.style,
                          fontSize: "20px",
                        }}
                        className="text-main-blue"
                      >
                        {getWeightName(file.weight)}
                      </p>
                    ))}
                  </div>
                )}

                {/* Example Text */}
                {font.source.type === "google" && (
                  <div className="flex flex-col justify-center space-y-3">
                    {font.source.weights.map((weight) => (
                      <p
                        key={weight}
                        style={{
                          fontFamily: font.name,
                          fontWeight: weight,
                          fontSize: "20px",
                        }}
                        className="text-main-blue"
                      >
                        welcome to chapel house
                      </p>
                    ))}
                  </div>
                )}
                {font.source.type === "file" && (
                  <div className="flex flex-col justify-center space-y-3">
                    {font.source.files.map((file, fileIdx) => (
                      <p
                        key={fileIdx}
                        style={{
                          fontFamily: font.name,
                          fontWeight: file.weight,
                          fontStyle: file.style,
                          fontSize: "20px",
                        }}
                        className="text-main-blue"
                      >
                        welcome to chapel house
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
      </div>
    </Container>
  )
}

function getWeightName(weight: number): string {
  const weightNames: Record<number, string> = {
    100: "thin",
    200: "extra light",
    300: "light",
    400: "regular",
    500: "medium",
    600: "semi bold",
    700: "bold",
    800: "extra bold",
    900: "black",
  }
  return weightNames[weight] || `weight ${weight}`
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
