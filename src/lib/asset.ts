/**
 * Safely prefix asset paths with BASE_URL for GitHub Pages compatibility
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Ensure base ends with slash
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  
  return `${cleanBase}${cleanPath}`
}

/**
 * Get the resolved absolute URL for an asset (useful for copying to clipboard)
 */
export function assetAbsoluteUrl(path: string): string {
  const url = assetUrl(path)
  return new URL(url, window.location.origin).href
}
