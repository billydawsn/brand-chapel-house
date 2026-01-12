# Brand Guidelines Template

A production-ready, static single-page application for hosting brand guidelines on GitHub Pages. Built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- 🎨 **Content-Driven** - All content managed through a single `data.json` file
- 📱 **Responsive** - Mobile-first design that works on all devices
- ♿ **Accessible** - WCAG contrast checking and keyboard navigation
- 🖨️ **Print-Friendly** - Clean layout optimized for printing
- 🚀 **GitHub Pages Ready** - Configured for deployment to custom subdirectories
- 🔒 **Type-Safe** - Zod schema validation with TypeScript types
- 🎭 **No Backend** - Fully static site, no server required

## Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: lucide-react
- **Validation**: Zod
- **Notifications**: Sonner (toast notifications)

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## Project Structure

```
brand-guidelines/
├── public/
│   ├── data.json              # Content configuration
│   └── assets/
│       ├── logos/             # Logo files (SVG, PNG)
│       ├── gallery/           # Gallery images
│       └── fonts/             # Custom font files (optional)
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── PageShell.tsx     # Layout wrapper
│   │   ├── Section.tsx       # Section container
│   │   ├── LogoBlock.tsx     # Logo display and download
│   │   ├── ColorPaletteBlock.tsx  # Color swatches with WCAG
│   │   ├── TypographyBlock.tsx    # Font specimens
│   │   └── GalleryBlock.tsx       # Image gallery with lightbox
│   ├── lib/
│   │   ├── brandSchema.ts    # Zod schema + TypeScript types
│   │   ├── asset.ts          # BASE_URL helper utilities
│   │   └── contrast.ts       # WCAG contrast calculations
│   ├── App.tsx               # Main application
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── vite.config.ts            # Vite configuration
└── package.json
```

## Editing Content

### 1. Update `public/data.json`

This is the single source of truth for all brand content. The file structure:

```json
{
  "brand": {
    "name": "Your Brand Name",
    "description": "Brief description",
    "website": "https://example.com",
    "updatedAt": "2026-01-09"
  },
  "logos": [...],
  "colors": [...],
  "typography": {...},
  "gallery": [...]
}
```

See the included `data.json` for a complete example.

### 2. Add Assets

Place your files in the `public/assets/` directory:

- **Logos**: `public/assets/logos/`
- **Images**: `public/assets/gallery/`
- **Fonts**: `public/assets/fonts/` (for self-hosted fonts)

**Important**: All asset paths in `data.json` must start with `/assets/`:

```json
{
  "src": "/assets/logos/logo-primary.svg"
}
```

### 3. Color Palette

Colors include automatic WCAG contrast ratio calculations:

```json
{
  "name": "Brand Blue",
  "role": "Primary",
  "values": {
    "hex": "#1E4BFF",
    "rgb": "30, 75, 255",
    "cmyk": "88, 71, 0, 0",
    "pantone": "2726 C"
  }
}
```

All values except `hex` are optional.

### 4. Typography

Supports both Google Fonts and self-hosted fonts:

**Google Fonts:**
```json
{
  "name": "Inter",
  "source": {
    "type": "google",
    "family": "Inter",
    "weights": [400, 600, 700]
  }
}
```

**Self-Hosted Fonts:**
```json
{
  "name": "Brand Serif",
  "source": {
    "type": "file",
    "files": [
      {
        "weight": 400,
        "style": "normal",
        "src": "/assets/fonts/BrandSerif-Regular.woff2"
      }
    ]
  }
}
```

## GitHub Pages Deployment

### Option 1: GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          VITE_BASE: /${{ github.event.repository.name }}/
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

2. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

3. Push to `main` branch - your site will deploy automatically!

### Option 2: Manual Deployment

```bash
# Build with correct base path
VITE_BASE=/your-repo-name/ npm run build

# Deploy dist/ folder to gh-pages branch
# (Use gh-pages package or manual git commands)
```

## BASE_URL Configuration

The app uses `import.meta.env.BASE_URL` for all asset paths, ensuring compatibility with GitHub Pages subdirectories.

- **Local dev**: Base URL is `/`
- **GitHub Pages**: Set via `VITE_BASE` environment variable

The `assetUrl()` helper automatically prefixes paths:

```typescript
// In data.json
"src": "/assets/logo.svg"

// Resolves to:
// Local: http://localhost:5173/assets/logo.svg
// GitHub Pages: https://user.github.io/repo-name/assets/logo.svg
```

## Features in Detail

### Logo Block
- Multiple logo variants per logo group
- Download buttons for each file
- Copy link to clipboard functionality
- Preview on neutral background

### Color Palette Block
- Visual color swatches
- Copy any color value (HEX, RGB, CMYK, Pantone)
- WCAG contrast ratios vs white and black
- AA/AAA compliance indicators

### Typography Block
- Dynamic font loading (Google Fonts + self-hosted)
- Type scale preview (12px - 48px)
- Weight variations display
- Usage examples with custom styling

### Gallery Block
- Responsive grid layout
- Click to open full-size lightbox
- Keyboard accessible (Esc to close)
- Captions in modal view

## Validation

The app uses Zod for runtime validation. If `data.json` is invalid:

1. Error page displays with helpful troubleshooting tips
2. Detailed errors logged to browser console
3. Schema validation ensures type safety

To check your data.json validity:
1. Run `npm run dev`
2. Open browser console
3. Look for Zod validation errors if page doesn't load

## Customization

### Tailwind Theme

Edit `src/index.css` to customize colors:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... */
}
```

### Adding New Sections

1. Add data to `data.json`
2. Create a new component in `src/components/`
3. Add Zod schema to `src/lib/brandSchema.ts`
4. Import and render in `src/App.tsx`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS Grid and Flexbox

## License

MIT

## Credits

Built with:
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Zod](https://zod.dev/)
- [Sonner](https://sonner.emilkowal.ski/)

