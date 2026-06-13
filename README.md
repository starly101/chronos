# ⚡ STARLY.DEV — Interactive Creative OS

**Muhammad Ali's personal portfolio — A living operating system for creative development.**

## 🎨 Design System

### Color Palette: Volcanic Dark
- **Background**: `#0C0C0A` (near-black with warm undertone)
- **Surface**: `#141412` (cards, glass panels)
- **Accent Primary**: `#C8A96E` (antique gold)
- **Accent Secondary**: `#E8E0D0` (warm cream)
- **Effect Glow**: `#D4B896` (shader highlights)

### Typography
- **Display**: Syne (Google Fonts) — editorial, geometric, alien
- **Body**: Instrument Sans (Google Fonts) — technical, legible
- **Mono**: JetBrains Mono (Google Fonts) — code snippets

## 🛠 Tech Stack

- **Framework**: Next.js 15 App Router
- **3D/WebGL**: React Three Fiber + Drei + Postprocessing
- **Animation**: GSAP + ScrollTrigger + Motion (Framer)
- **Smooth Scroll**: Lenis
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript (strict mode)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Fonts, metadata, global providers
│   ├── page.tsx            # Main page assembly
│   └── globals.css         # Design system CSS variables
├── components/
│   ├── webgl/              # WebGL shader components
│   ├── sections/           # Page sections (Hero, Manifesto, Work, Services, Contact)
│   ├── ui/                 # Reusable UI components
│   │   ├── Cursor.tsx      # Custom magnetic cursor
│   │   ├── Navigation.tsx  # Fixed nav with scroll blur
│   │   ├── SplitText.tsx   # Text splitting utility
│   │   └── BentoCell.tsx   # Bento grid cell
│   └── providers/
│       └── SmoothScrollProvider.tsx  # Lenis + GSAP sync
├── hooks/
│   ├── useMousePosition.ts
│   ├── useScrollProgress.ts
│   └── useLenis.ts
├── lib/
│   ├── constants.ts        # Design tokens
│   └── gsap.ts             # GSAP configuration
└── shaders/
    ├── hero.frag.glsl      # Hero fragment shader
    └── hero.vert.glsl      # Hero vertex shader
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📐 Sections

1. **The Arrival (Hero)** — WebGL Voronoi displacement manifold with mouse interaction
2. **The Manifesto** — Word-by-word scroll reveal
3. **The Proof (Work)** — Horizontal marquee with interactive project previews
4. **The Machine (Services)** — Bento grid with live micro-demos
5. **The Door (Contact)** — Minimal CTA with email copy

## 🎯 Performance Targets

- LCP < 2.5s
- CLS = 0
- 90+ Lighthouse score
- < 200KB initial JS bundle

## 📄 License

© 2025 Muhammad Ali. All rights reserved.
