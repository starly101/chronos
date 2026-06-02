'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from('.hero-title span', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
    })
    .from('.hero-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5')
    .from('.glass-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    }, '-=0.5');

    gsap.utils.toArray('.feature-card').forEach((card: any) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      });
    });
  }, []);

  return (
    <main className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-violet/20 via-void to-neon-blue/20" />
        <div className="relative z-10 text-center px-4">
          <h1 className="hero-title font-display text-6xl md:text-9xl font-black mb-6 tracking-tighter">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-lime neon-glow">NEON</span>
            <span className="block text-white">HORIZON</span>
          </h1>
          <p className="hero-subtitle font-body text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the future of digital immersion with vibrant colors and fluid motion.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 md:px-12 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: 'Vibrant Colors', color: 'from-neon-cyan to-neon-blue' },
            { title: 'Fluid Motion', color: 'from-neon-pink to-neon-violet' },
            { title: 'Immersive 3D', color: 'from-neon-lime to-neon-cyan' },
          ].map((feature, i) => (
            <div key={i} className="feature-card glass-card p-8 rounded-2xl transform translate-y-20 opacity-0 hover:scale-105 transition-transform duration-300">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} mb-6`} />
              <h3 className="font-display text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="font-body text-gray-400 leading-relaxed">
                Powered by cutting-edge WebGL shaders and smooth GSAP animations for an unforgettable experience.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-neon-violet/10 to-transparent" />
        <div className="relative z-10">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 text-white">Ready to Dive In?</h2>
          <button className="group relative px-12 py-4 bg-transparent border border-neon-cyan/50 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-neon-cyan transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 font-mono text-neon-cyan group-hover:text-void font-bold tracking-widest">EXPLORE NOW</span>
          </button>
        </div>
      </section>
    </main>
  );
}
