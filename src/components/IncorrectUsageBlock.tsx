import { Container } from "@/components/ui/container"
import { assetUrl } from "@/lib/asset"
import type { IncorrectUsageItem } from "@/lib/brandSchema"

interface IncorrectUsageBlockProps {
  items: IncorrectUsageItem[]
}

export function IncorrectUsageBlock({ items }: IncorrectUsageBlockProps) {
  return (
    <Container>
      <div className="grid gap-8 grid-cols-2 lg:grid-cols-3 mt-8">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col space-y-4"
        >
          <div className="flex aspect-square items-center justify-center bg-muted/50">
            <img
              src={assetUrl(item.src)}
              alt={item.caption}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <p className="text-sm text-[#99ADB7] text-left max-w-sm">
            {item.caption}
          </p>
        </div>
      ))}
      </div>
    </Container>
  )
}
