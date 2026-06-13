/**
 * ═══════════════════════════════════════════════════════════════
 * NAVIGATION COMPONENT
 * Fixed nav with scroll-based background blur
 * ═══════════════════════════════════════════════════════════════
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { NAVIGATION, TIMING, SOCIAL } from '@/lib/constants';
import { useLenis } from '@/hooks/useLenis';

export const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollTo } = useLenis();

  // Handle scroll for nav background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > NAVIGATION.scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Nav entrance animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: TIMING.navFadeInDelay / 1000,
        }
      );
    }
  }, []);

  // Handle nav link click with smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href, { offset: -80 });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0C0C0A]/80 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-2xl font-bold font-syne tracking-tight text-[#E8E0D0] hover:text-[#C8A96E] transition-colors"
          >
            S.
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAVIGATION.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-[#E8E0D0] text-sm tracking-wide hover:text-[#C8A96E] transition-colors group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C8A96E] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="relative overflow-hidden px-6 py-2 text-[#C8A96E] border border-[#C8A96E]/30 rounded-full hover:border-[#C8A96E] transition-all duration-300 group"
            >
              <span className="relative z-10">Work with me</span>
              <span className="absolute inset-0 bg-[#C8A96E]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out-expo" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-px bg-[#E8E0D0] transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-5 h-px bg-[#E8E0D0] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-5 h-px bg-[#E8E0D0] transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0C0C0A] md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAVIGATION.items.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-4xl font-syne font-bold text-[#E8E0D0] hover:text-[#C8A96E] transition-colors"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.4s ease ${index * 0.1}s`,
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-[#E8E0D0] hover:text-[#C8A96E] transition-colors mt-8"
          >
            GitHub
          </a>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-[#E8E0D0] hover:text-[#C8A96E] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
