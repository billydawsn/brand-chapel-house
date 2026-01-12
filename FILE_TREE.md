# Complete File Tree

```
brand-guidelines/
├── .github/
│   └── workflows/
│       └── deploy.yml                    # GitHub Actions workflow for deployment
│
├── dist/                                 # Build output (generated)
│   ├── assets/
│   ├── index.html
│   └── ...
│
├── node_modules/                         # Dependencies (generated)
│
├── public/
│   ├── data.json                        # Brand content configuration
│   └── assets/
│       ├── README.md                    # Asset directory guide
│       ├── logos/
│       │   ├── logo-primary.svg
│       │   ├── logo-primary.png
│       │   ├── logo-secondary.svg
│       │   └── logo-secondary.png
│       ├── gallery/
│       │   ├── photo-1.jpg
│       │   ├── photo-2.jpg
│       │   ├── photo-3.jpg
│       │   ├── photo-4.jpg
│       │   ├── photo-5.jpg
│       │   └── photo-6.jpg
│       └── fonts/                       # For self-hosted fonts
│
├── src/
│   ├── components/
│   │   ├── ui/                         # shadcn/ui components
│   │   │   ├── alert.tsx               # Alert component
│   │   │   ├── button.tsx              # Button component
│   │   │   ├── card.tsx                # Card component
│   │   │   ├── dialog.tsx              # Dialog/Modal component
│   │   │   ├── sonner.tsx              # Toast notifications
│   │   │   └── tabs.tsx                # Tabs component
│   │   │
│   │   ├── ColorPaletteBlock.tsx       # Color swatches + WCAG
│   │   ├── GalleryBlock.tsx            # Image gallery + lightbox
│   │   ├── LogoBlock.tsx               # Logo display + download
│   │   ├── PageShell.tsx               # Layout wrapper
│   │   ├── Section.tsx                 # Section container
│   │   └── TypographyBlock.tsx         # Font specimens
│   │
│   ├── lib/
│   │   ├── asset.ts                    # BASE_URL path helpers
│   │   ├── brandSchema.ts              # Zod schemas + TS types
│   │   ├── contrast.ts                 # WCAG contrast calculations
│   │   └── utils.ts                    # cn() utility
│   │
│   ├── App.css                         # (removed - not needed)
│   ├── App.tsx                         # Main application component
│   ├── index.css                       # Global styles + Tailwind
│   └── main.tsx                        # React entry point
│
├── .eslintrc.json                      # (or eslint.config.js)
├── .gitignore                          # Git ignore rules
├── components.json                     # shadcn/ui config
├── index.html                          # HTML entry point
├── package.json                        # Dependencies & scripts
├── package-lock.json                   # Dependency lock file
├── PROJECT_SUMMARY.md                  # Implementation summary
├── README.md                           # Documentation
├── tsconfig.app.json                   # TypeScript config (app)
├── tsconfig.json                       # TypeScript config (root)
├── tsconfig.node.json                  # TypeScript config (node)
└── vite.config.ts                      # Vite configuration
```

## Key Files Description

### Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build config with BASE_URL support |
| `package.json` | Dependencies and npm scripts |
| `tsconfig*.json` | TypeScript compiler settings |
| `components.json` | shadcn/ui configuration |
| `eslint.config.js` | Linting rules |

### Source Files

| File | Lines | Purpose |
|------|-------|---------|
| `App.tsx` | ~130 | Main app with data loading & routing |
| `main.tsx` | ~12 | React DOM entry point |
| `index.css` | ~124 | Tailwind imports + CSS variables |

### Component Files

| Component | Lines | Purpose |
|-----------|-------|---------|
| `PageShell.tsx` | ~100 | Header, nav, footer layout |
| `LogoBlock.tsx` | ~70 | Logo display with download |
| `ColorPaletteBlock.tsx` | ~120 | Color cards with WCAG info |
| `TypographyBlock.tsx` | ~150 | Font loading & specimens |
| `GalleryBlock.tsx` | ~80 | Image grid with lightbox |
| `Section.tsx` | ~15 | Section wrapper |

### Library Files

| File | Lines | Purpose |
|------|-------|---------|
| `brandSchema.ts` | ~95 | Zod validation schemas |
| `asset.ts` | ~20 | BASE_URL helpers |
| `contrast.ts` | ~85 | WCAG contrast calculations |
| `utils.ts` | ~10 | Tailwind cn() utility |

### UI Components (shadcn/ui)

| Component | Purpose |
|-----------|---------|
| `alert.tsx` | Error/info alerts |
| `button.tsx` | Interactive buttons |
| `card.tsx` | Content cards |
| `dialog.tsx` | Modal dialogs |
| `sonner.tsx` | Toast notifications |
| `tabs.tsx` | Tabbed content |

### Public Assets

| Directory | Contents |
|-----------|----------|
| `public/assets/logos/` | 4 sample logo files (SVG + PNG) |
| `public/assets/gallery/` | 6 sample gallery images |
| `public/assets/fonts/` | Empty (for custom fonts) |
| `public/data.json` | Sample brand configuration |

## Total Project Stats

- **Total Files**: ~35 source files
- **Total Lines of Code**: ~1,800 (excluding node_modules)
- **Components**: 11 React components
- **UI Primitives**: 6 shadcn components
- **Dependencies**: ~15 production, ~12 dev
- **Build Size**: ~400KB JS, ~40KB CSS (uncompressed)

## File Naming Conventions

- **Components**: PascalCase (e.g., `PageShell.tsx`)
- **Utilities**: camelCase (e.g., `asset.ts`)
- **Config**: kebab-case (e.g., `vite.config.ts`)
- **CSS**: kebab-case (e.g., `index.css`)
