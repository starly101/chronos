'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import BentoCell from '@/components/ui/BentoCell';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cellsRef.current.forEach((cell, i) => {
        if (!cell) return;

        gsap.fromTo(
          cell,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: cell,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen px-4 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-label text-accent-gold block mb-4">Capabilities</span>
          <h2 className="text-display-2 font-bold text-light-100">
            The Machine
          </h2>
        </div>

        {/* Bento Grid - 6 cells */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          
          {/* Cell 1: WebGL & 3D (2x1 - large) */}
          <div
            ref={(el) => {
              cellsRef.current[0] = el;
            }}
            className="md:col-span-2 md:row-span-1"
          >
            <BentoCell
              title="WebGL & 3D Experiences"
              label="Custom WebGL"
              icon="🎮"
              description="Interactive 3D scenes, custom shaders, and real-time graphics"
              demoType="webgl"
            />
          </div>

          {/* Cell 2: Motion & Animation (1x1) */}
          <div
            ref={(el) => {
              cellsRef.current[1] = el;
            }}
            className="md:col-span-1 md:row-span-1"
          >
            <BentoCell
              title="Motion & Animation"
              label="Scroll & Micro-interactions"
              icon="✨"
              description="GSAP timelines, scroll-triggered reveals, buttery smooth transitions"
              demoType="motion"
            />
          </div>

          {/* Cell 3: AI Integration (1x2 - tall) */}
          <div
            ref={(el) => {
              cellsRef.current[2] = el;
            }}
            className="md:col-span-1 md:row-span-2"
          >
            <BentoCell
              title="AI Integration"
              label="AI-Powered Features"
              icon="🤖"
              description="LLM integration, agentic workflows, real-time AI responses"
              demoType="ai"
            />
          </div>

          {/* Cell 4: Next.js Development (1x2 - tall) */}
          <div
            ref={(el) => {
              cellsRef.current[3] = el;
            }}
            className="md:col-span-1 md:row-span-2"
          >
            <BentoCell
              title="Next.js Development"
              label="Production-Grade Engineering"
              icon="⚡"
              description="Full-stack React applications with optimal performance"
              demoType="code"
            />
          </div>

          {/* Cell 5: Performance (1x1) */}
          <div
            ref={(el) => {
              cellsRef.current[4] = el;
            }}
            className="md:col-span-1 md:row-span-1"
          >
            <BentoCell
              title="Performance"
              label="Web Performance Engineering"
              icon="🚀"
              description="98+ Lighthouse scores, optimized bundles, instant loads"
              demoType="performance"
              score={98}
            />
          </div>

          {/* Cell 6: Available for Hire (1x1) */}
          <div
            ref={(el) => {
              cellsRef.current[5] = el;
            }}
            className="md:col-span-1 md:row-span-1"
          >
            <BentoCell
              title="Available for Hire"
              label="Collaboration"
              icon="💼"
              description="Currently accepting new projects"
              demoType="availability"
              ctaText="Let's Talk"
              onCtaClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
