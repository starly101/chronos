import React from 'react';

export type HeroVariant = 'classic' | 'modern' | 'minimal';

export interface HeroSectionProps {
  variant?: HeroVariant;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

const variantStyles: Record<HeroVariant, string> = {
  classic: 'bg-gradient-to-r from-slate-900 to-slate-800',
  modern: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900',
  minimal: 'bg-white text-slate-900',
};

const titleStyles: Record<HeroVariant, string> = {
  classic: 'text-5xl md:text-6xl font-serif font-bold text-white',
  modern: 'text-6xl md:text-7xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500',
  minimal: 'text-5xl md:text-6xl font-sans font-bold text-slate-900',
};

const subtitleStyles: Record<HeroVariant, string> = {
  classic: 'text-xl md:text-2xl text-slate-300 font-light',
  modern: 'text-2xl md:text-3xl text-slate-300 font-medium',
  minimal: 'text-xl md:text-2xl text-slate-600 font-light',
};

const ctaStyles: Record<HeroVariant, string> = {
  classic: 'bg-amber-600 hover:bg-amber-700 text-white',
  modern: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white',
  minimal: 'bg-slate-900 hover:bg-slate-800 text-white',
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  variant = 'classic',
  title = 'Discover Your Dream Home',
  subtitle = 'Exclusive luxury properties in the most sought-after locations',
  backgroundImage,
  ctaText = 'Explore Properties',
  onCtaClick,
  className = '',
}) => {
  const baseStyle = variantStyles[variant];
  const titleStyle = titleStyles[variant];
  const subtitleStyle = subtitleStyles[variant];
  const ctaStyle = ctaStyles[variant];

  return (
    <section
      className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${baseStyle} ${className}`}
      style={backgroundImage && !variant ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {/* Overlay for variants with background image */}
      {backgroundImage && variant !== 'minimal' && (
        <div className="absolute inset-0 bg-black/50 z-0" />
      )}

      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
        <h1 className={`${titleStyle} mb-6 leading-tight`}>
          {title}
        </h1>

        <p className={`${subtitleStyle} mb-10 max-w-2xl mx-auto`}>
          {subtitle}
        </p>

        <button
          onClick={onCtaClick}
          className={`${ctaStyle} px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl`}
        >
          {ctaText}
        </button>

        {/* Decorative elements for modern variant */}
        {variant === 'modern' && (
          <>
            <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />
          </>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className={`w-8 h-8 ${variant === 'minimal' ? 'text-slate-400' : 'text-white'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
