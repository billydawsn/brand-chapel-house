import { assetUrl } from "@/lib/asset"
import type { GalleryItem } from "@/lib/brandSchema"

interface GalleryBlockProps {
  gallery: GalleryItem[]
}

export function GalleryBlock({ gallery }: GalleryBlockProps) {

  const colSpans = ["col-span-1", "col-span-1", "col-span-2", "col-span-2"]

  return (
    <>
        <div className="grid grid-cols-2 gap-4">
        {gallery.map((item, index) => (
            <a href={item.link} className={`${colSpans[index % colSpans.length]}`} target="_blank" rel=" noreferrer">
            <img
              src={assetUrl(item.src)}
              alt={item.caption}
              className={`h-full w-full object-cover transition-transform group-hover:scale-105 `}
            />
            </a>
        ))}
        </div>
    </>
  )
}
