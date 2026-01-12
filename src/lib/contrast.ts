/**
 * Calculate relative luminance of a color
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Parse hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, "")
  
  // Handle 3-digit hex
  let r: number, g: number, b: number
  
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16)
    g = parseInt(cleanHex[1] + cleanHex[1], 16)
    b = parseInt(cleanHex[2] + cleanHex[2], 16)
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16)
    g = parseInt(cleanHex.substring(2, 4), 16)
    b = parseInt(cleanHex.substring(4, 6), 16)
  } else {
    return null
  }
  
  return { r, g, b }
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function getContrastRatio(hex1: string, hex2: string): number | null {
  const rgb1 = hexToRgb(hex1)
  const rgb2 = hexToRgb(hex2)
  
  if (!rgb1 || !rgb2) return null
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)
  
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Get WCAG compliance level for normal text
 */
export function getWCAGLevel(ratio: number): {
  aa: boolean
  aaa: boolean
} {
  return {
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
  }
}

/**
 * Get contrast info for a color against white and black
 */
export function getColorContrast(hex: string) {
  const whiteRatio = getContrastRatio(hex, "#FFFFFF")
  const blackRatio = getContrastRatio(hex, "#000000")
  
  return {
    white: whiteRatio ? {
      ratio: whiteRatio,
      ...getWCAGLevel(whiteRatio),
    } : null,
    black: blackRatio ? {
      ratio: blackRatio,
      ...getWCAGLevel(blackRatio),
    } : null,
  }
}
