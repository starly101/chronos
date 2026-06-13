'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const manifestoLines = [
  "We engineer digital experiences that feel impossible.",
  "Not because they use better tools —",
  "because they understand the difference between",
  "a website and an experience worth remembering.",
];

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each word individually on scroll
      wordsRef.current.forEach((word, i) => {
        if (!word) return;

        gsap.fromTo(
          word,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: word,
              start: 'top 80%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      });

      // Background color temperature shift when all text is visible
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          gsap.to(sectionRef.current, {
            backgroundColor: '#0f0f0d',
            duration: 1,
          });
        },
        onLeaveBack: () => {
          gsap.to(sectionRef.current, {
            backgroundColor: '#0C0C0A',
            duration: 1,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-20 transition-colors duration-1000"
    >
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-5xl">
        {manifestoLines.map((line, lineIndex) => (
          <p
            key={lineIndex}
            className="text-heading-1 md:text-display-3 font-bold leading-relaxed mb-6"
          >
            {line.split(' ').map((word, wordIndex) => {
              const globalWordIndex =
                manifestoLines.slice(0, lineIndex).reduce((acc, l) => acc + l.split(' ').length, 0) +
                wordIndex;

              return (
                <span
                  key={`${lineIndex}-${wordIndex}`}
                  ref={(el) => {
                    wordsRef.current[globalWordIndex] = el;
                  }}
                  className="inline-block mr-2 text-light-100"
                >
                  {word}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </section>
  );
}
