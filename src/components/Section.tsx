import { type ReactNode } from "react"

interface SectionProps {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight mb-6">{title}</h2>
      {children}
    </section>
  )
}
