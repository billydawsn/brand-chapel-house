import { z } from "zod"

// Logo Schemas
const LogoVariantSchema = z.object({
  label: z.string(),
  src: z.string(),
})

const LogoSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  variants: z.array(LogoVariantSchema),
})

// Color Schemas
const ColorValuesSchema = z.object({
  hex: z.string(),
  rgb: z.string().optional(),
  cmyk: z.string().optional(),
  pantone: z.string().optional(),
})

const ColorSchema = z.object({
  name: z.string(),
  role: z.array(z.string()).optional(),
  values: ColorValuesSchema,
})

// Typography Schemas
const GoogleFontSourceSchema = z.object({
  type: z.literal("google"),
  family: z.string(),
  weights: z.array(z.number()),
})

const FontFileSchema = z.object({
  weight: z.number(),
  style: z.enum(["normal", "italic"]),
  src: z.string(),
})

const FileFontSourceSchema = z.object({
  type: z.literal("file"),
  files: z.array(FontFileSchema),
})

const FontSourceSchema = z.discriminatedUnion("type", [
  GoogleFontSourceSchema,
  FileFontSourceSchema,
])

const FontSchema = z.object({
  name: z.string(),
  source: FontSourceSchema,
})

const TypographyExampleSchema = z.object({
  label: z.string(),
  font: z.string(),
  sizePx: z.number(),
  weight: z.number(),
  text: z.string(),
  lineHeight: z.number().optional(),
  letterSpacing: z.string().optional(),
})

const TypographySchema = z.object({
  fonts: z.array(FontSchema),
  examples: z.array(TypographyExampleSchema),
})

// Gallery Schema
const GalleryItemSchema = z.object({
  caption: z.string(),
  src: z.string(),
})

// Brand Schema
const BrandInfoSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  website: z.string().url().optional(),
  updatedAt: z.string(),
})

// Main Brand Guidelines Schema
export const BrandGuidelinesSchema = z.object({
  brand: BrandInfoSchema,
  logos: z.array(LogoSchema).optional(),
  colors: z.array(ColorSchema).optional(),
  typography: TypographySchema.optional(),
  gallery: z.array(GalleryItemSchema).optional(),
})

// Inferred Types
export type BrandGuidelines = z.infer<typeof BrandGuidelinesSchema>
export type Logo = z.infer<typeof LogoSchema>
export type LogoVariant = z.infer<typeof LogoVariantSchema>
export type Color = z.infer<typeof ColorSchema>
export type ColorValues = z.infer<typeof ColorValuesSchema>
export type Font = z.infer<typeof FontSchema>
export type FontSource = z.infer<typeof FontSourceSchema>
export type TypographyExample = z.infer<typeof TypographyExampleSchema>
export type Typography = z.infer<typeof TypographySchema>
export type GalleryItem = z.infer<typeof GalleryItemSchema>
export type BrandInfo = z.infer<typeof BrandInfoSchema>
