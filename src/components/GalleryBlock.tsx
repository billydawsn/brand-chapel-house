import { useState } from "react"
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Container } from "@/components/ui/container"
import { assetUrl } from "@/lib/asset"
import type { GalleryItem } from "@/lib/brandSchema"

interface GalleryBlockProps {
  gallery: GalleryItem[]
}

export function GalleryBlock({ gallery }: GalleryBlockProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  return (
    <>
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(item)}
            className="group relative aspect-square overflow-hidden rounded-lg border bg-muted/50 hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <img
              src={assetUrl(item.src)}
              alt={item.caption}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            {item.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-xs text-white line-clamp-2">{item.caption}</p>
              </div>
            )}
          </button>
        ))}
        </div>
      </Container>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-10 rounded-sm bg-background/80 p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
              <div className="relative">
                <img
                  src={assetUrl(selectedImage.src)}
                  alt={selectedImage.caption}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
              {selectedImage.caption && (
                <div className="p-6">
                  <DialogTitle className="sr-only">{selectedImage.caption}</DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedImage.caption}
                  </DialogDescription>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
