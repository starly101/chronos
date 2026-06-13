/**
 * ═══════════════════════════════════════════════════════════════
 * STARLY.DEV — DESIGN SYSTEM CONSTANTS
 * ═══════════════════════════════════════════════════════════════
 */

export const COLORS = {
  bgPrimary: '#0C0C0A',
  bgSurface: '#141412',
  accentPrimary: '#C8A96E',
  accentSecondary: '#E8E0D0',
  accentGlow: '#D4B896',
  textPrimary: '#E8E0D0',
  textSecondary: '#4A4540',
  textMuted: '#6B655F',
} as const;

export const TYPOGRAPHY = {
  fontH1: 'clamp(3rem, 8vw, 9rem)',
  fontH2: 'clamp(2rem, 5vw, 5rem)',
  fontH3: 'clamp(1.25rem, 3vw, 2rem)',
  fontBody: 'clamp(1rem, 1.5vw, 1.125rem)',
  fontSmall: '0.875rem',
  trackingDisplay: '-0.04em',
  trackingBody: '0.01em',
  leadingBody: 1.75,
} as const;

export const TIMING = {
  pageLoadDelay: 400,
  navFadeInDelay: 1000,
  heroTextDelay: 1500,
  scrollIndicatorDelay: 2000,
  cursorLerpFactor: 0.12,
  hoverTransition: 0.2,
  sectionTransition: 0.6,
} as const;

export const EASINGS = {
  expoOut: 'cubic-bezier(0.19, 1, 0.22, 1)',
  cubicOut: 'cubic-bezier(0.33, 1, 0.68, 1)',
  sineInOut: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
} as const;

export const CURSOR = {
  size: 12,
  outerSize: 40,
  hoverScale: 3.33,
} as const;

export const NAVIGATION = {
  scrollThreshold: 50,
  items: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],
} as const;

export const PROJECTS = [
  {
    id: 'starly-dev',
    title: 'STARLY.DEV',
    description: 'This interactive creative OS — the portfolio is the proof',
    tags: ['Next.js', 'WebGL', 'GSAP'],
    link: '#', // TODO: Add actual link
    github: '#', // TODO: Add GitHub link
  },
  {
    id: 'ai-automation',
    title: 'AI Automation System',
    description: 'Agentic workflow automation for enterprise clients',
    tags: ['Python', 'AI Agents', 'Automation'],
    link: '#', // TODO: Add actual link
    github: '#', // TODO: Add GitHub link
  },
  {
    id: 'component-library',
    title: 'Creative Component Library',
    description: 'Premium animated components for React applications',
    tags: ['React', 'TypeScript', 'Animation'],
    link: '#', // TODO: Add actual link
    github: '#', // TODO: Add GitHub link
  },
] as const;

export const SERVICES = [
  {
    id: 'webgl',
    title: 'WebGL & 3D Experiences',
    description: 'Custom WebGL',
    icon: '🎨',
  },
  {
    id: 'motion',
    title: 'Motion & Animation',
    description: 'Scroll & Micro-interactions',
    icon: '⚡',
  },
  {
    id: 'ai',
    title: 'AI Integration',
    description: 'AI-Powered Features',
    icon: '🤖',
  },
  {
    id: 'nextjs',
    title: 'Next.js Development',
    description: 'Production-Grade Engineering',
    icon: '⚛️',
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Web Performance Engineering',
    icon: '🚀',
  },
  {
    id: 'available',
    title: 'Available for hire',
    description: 'Currently accepting projects',
    icon: '✅',
  },
] as const;

export const SOCIAL = {
  github: 'https://github.com/starly101',
  linkedin: 'https://linkedin.com/in/starly101',
  email: 'hello@starly.dev',
} as const;
