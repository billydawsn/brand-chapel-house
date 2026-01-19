import { type ReactNode } from "react"
import { Container } from "@/components/ui/container"

interface SectionProps {
  id: string
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, description, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {title &&
            <h2 className="text-3xl font-bold tracking-tight mb-0">{title}</h2>
          }
          {description && (
            <p className=" text-main-blue mb-10 md:col-span-2 max-w-2xl">{description}</p>
          )}
        </div>
      </Container>
      {children}
    </section>
  )
}
