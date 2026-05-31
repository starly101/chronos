# @ali-dev/realty-ui

[![npm version](https://img.shields.io/npm/v/@ali-dev/realty-ui.svg)](https://www.npmjs.com/package/@ali-dev/realty-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC.svg)](https://tailwindcss.com/)

> **Premium React component library for luxury real estate websites**  
> Built by Ali Dev — AI-powered, production-ready UI components

---

## 🚀 Quick Start

### Installation

```bash
npm install @ali-dev/realty-ui
# or
yarn add @ali-dev/realty-ui
# or
pnpm add @ali-dev/realty-ui
```

### Usage

```tsx
import { HeroSection, LeadCaptureForm, PropertyCard } from '@ali-dev/realty-ui';

function MyRealEstatePage() {
  return (
    <div>
      <HeroSection 
        variant="modern"
        title="Find Your Dream Home"
        subtitle="Luxury properties in prime locations"
      />
      
      <LeadCaptureForm
        onLeadSubmit={(data) => console.log('New lead:', data)}
        whatsappNumber="+1234567890"
      />
      
      <PropertyCard
        price="$2,500,000"
        beds={4}
        baths={3}
        sqft={2800}
        address="123 Beverly Hills Dr"
        image="https://..."
      />
    </div>
  );
}
```

---

## 📦 Components

### HeroSection

Full-width hero banner with headline, subheadline, and CTA buttons.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'classic' \| 'modern' \| 'minimal'` | `'modern'` | Visual style variant |
| `title` | `string` | `'Welcome'` | Main heading text |
| `subtitle` | `string` | `'Subtitle text'` | Supporting text |
| `backgroundImage` | `string` | `undefined` | Background image URL |
| `onCTAClick` | `() => void` | `undefined` | Primary CTA callback |
| `className` | `string` | `''` | Additional Tailwind classes |

**Variants:**
- **classic**: Traditional layout with centered content
- **modern**: Gradient overlays, animated elements
- **minimal**: Clean, whitespace-focused design

---

### LeadCaptureForm

AI-powered lead capture with validation and WhatsApp routing.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'inline' \| 'modal' \| 'sidebar'` | `'inline'` | Form layout variant |
| `onLeadSubmit` | `(data: LeadData) => void` | `undefined` | Callback on form submit |
| `whatsappNumber` | `string` | `undefined` | WhatsApp routing number |
| `colorScheme` | `ColorScheme` | `'ocean'` | Color theme |
| `className` | `string` | `''` | Additional classes |

**Features:**
- Real-time validation
- Spam protection (honeypot)
- WhatsApp deep linking
- Customizable fields

---

### PropertyCard

Property listing card with all essential details.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `price` | `string` | `'$0'` | Listing price |
| `beds` | `number` | `0` | Number of bedrooms |
| `baths` | `number` | `0` | Number of bathrooms |
| `sqft` | `number` | `0` | Square footage |
| `address` | `string` | `''` | Property address |
| `image` | `string` | `undefined` | Property image URL |
| `variant` | `'compact' \| 'expanded' \| 'featured'` | `'compact'` | Card style |
| `onContact` | `() => void` | `undefined` | Contact button callback |
| `className` | `string` | `''` | Additional classes |

**Variants:**
- **compact**: Small footprint, essential info only
- **expanded**: Full details with image carousel
- **featured**: Prominent styling for highlighted listings

---

### AgentProfile

Agent profile card with stats and contact options.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `''` | Agent name |
| `title` | `string` | `''` | Job title |
| `photoUrl` | `string` | `undefined` | Profile photo URL |
| `homesSold` | `number` | `0` | Career homes sold |
| `yearsExperience` | `number` | `0` | Years in business |
| `rating` | `number` | `0` | Average rating (0-5) |
| `onContact` | `() => void` | `undefined` | Contact button callback |
| `variant` | `'classic' \| 'modern' \| 'minimal'` | `'modern'` | Profile style |

---

### Testimonial

Client testimonial with rating and property reference.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quote` | `string` | `''` | Testimonial text |
| `clientName` | `string` | `''` | Client name |
| `propertyType` | `string` | `''` | Property type purchased |
| `rating` | `number` | `5` | Star rating |
| `variant` | `'quote' \| 'card' \| 'slider'` | `'card'` | Display style |

---

### PricingTable

Service tier pricing with feature comparison.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tierName` | `string` | `''` | Plan name |
| `price` | `string` | `'$0'` | Price display |
| `features` | `string[]` | `[]` | Feature list |
| `isPopular` | `boolean` | `false` | Show "Popular" badge |
| `variant` | `'basic' \| 'professional' \| 'enterprise'` | `'basic'` | Tier style |

---

## 🎨 Color Schemes

All components support 8 pre-built color schemes:

| Scheme | Primary | Use Case |
|--------|---------|----------|
| `ocean` | Blue → Cyan | Trust, professionalism |
| `sunset` | Orange → Red | Energy, urgency |
| `forest` | Green → Emerald | Growth, sustainability |
| `royal` | Purple → Indigo | Luxury, premium |
| `midnight` | Slate → Black | Sophistication, modern |
| `rose` | Pink → Rose | Warmth, approachable |
| `amber` | Amber → Yellow | Optimism, highlights |
| `teal` | Teal → Cyan | Balance, clarity |

```tsx
<PropertyCard colorScheme="midnight" {...props} />
```

---

## 🛠️ Development

```bash
# Clone the repo
git clone https://github.com/starly101/chronos.git

# Install dependencies
npm install

# Run dev server
npm run dev

# Build library
npm run build
```

---

## 📄 License

MIT License — built by [Ali Dev](https://github.com/starly101)

---

**Built by Ali Dev — AI-powered real estate UI**  
*Version 1.0.0 • TypeScript • Tailwind CSS • React 18+*
