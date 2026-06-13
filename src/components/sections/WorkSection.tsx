'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  type: 'webgl' | 'nextjs' | 'terminal';
}

const projects: Project[] = [
  {
    id: 1,
    title: 'STARLY.DEV',
    description: 'This interactive creative OS — the portfolio is in the portfolio.',
    tags: ['Next.js', 'Three.js', 'GLSL', 'GSAP'],
    type: 'webgl',
    link: '#',
    github: 'https://github.com/starly101/chronos',
  },
  {
    id: 2,
    title: 'AI Automation System',
    description: 'Agentic workflow automation platform with real-time collaboration.',
    tags: ['Python', 'FastAPI', 'React', 'WebSocket'],
    type: 'terminal',
    link: '#',
  },
  {
    id: 3,
    title: 'Component Library',
    description: 'Premium animated component system for creative developers.',
    tags: ['TypeScript', 'React', 'Framer Motion', 'npm'],
    type: 'nextjs',
    link: '#',
    github: '#',
  },
];

export default function WorkSection() {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleExpand = (project: Project) => {
    setExpandedProject(project);
  };

  const handleClose = () => {
    setExpandedProject(null);
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen px-4 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-label text-accent-gold block mb-4">Selected Work</span>
          <h2 className="text-display-2 font-bold text-light-100">
            The Proof
          </h2>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative cursor-pointer"
              onClick={() => handleExpand(project)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Card Container */}
              <div className="relative h-[60vh] w-full overflow-hidden rounded-lg bg-dark-800 border border-dark-600">
                {/* Interactive Preview Area */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
                  {project.type === 'webgl' && (
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-accent-gold to-accent-gold-light animate-pulse" />
                      <p className="text-body-md text-light-300 font-mono">
                        WebGL Scene Preview
                      </p>
                    </div>
                  )}
                  {project.type === 'terminal' && (
                    <div className="w-full max-w-2xl p-6 font-mono text-sm">
                      <div className="text-accent-gold mb-2">$ init automation-system</div>
                      <div className="text-light-200">
                        {'>'} Loading agents...{'\n'}
                        {'>'} Connecting workflows...{'\n'}
                        {'>'} System ready.
                      </div>
                      <div className="mt-4 w-2 h-4 bg-accent-gold animate-pulse" />
                    </div>
                  )}
                  {project.type === 'nextjs' && (
                    <div className="text-center">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className="w-16 h-16 rounded bg-dark-700 border border-dark-500"
                          />
                        ))}
                      </div>
                      <p className="text-body-md text-light-300 font-mono">
                        Component Grid Preview
                      </p>
                    </div>
                  )}
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-heading-1 font-bold text-light-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-body-md text-light-200 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono text-accent-gold bg-dark-800/80 rounded-full border border-accent-gold/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        className="text-label text-light-100 hover:text-accent-gold transition-colors inline-flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Open Project
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="text-label text-light-300 hover:text-light-100 transition-colors inline-flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.435-2.385 1.155-3.255-.225-.405-.51-1.29.105-2.67 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.615 1.38.33 2.265.105 2.67.72.87 1.155 1.95 1.155 3.255 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Project Modal */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/95 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 text-light-300 hover:text-light-100 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="h-[70vh] rounded-lg bg-dark-800 border border-dark-600 overflow-hidden">
                <div className="h-3/5 bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center">
                  <p className="text-light-300 font-mono">
                    Full project preview would load here
                  </p>
                </div>
                <div className="p-8">
                  <h3 className="text-display-3 font-bold text-light-100 mb-4">
                    {expandedProject.title}
                  </h3>
                  <p className="text-body-lg text-light-200 mb-6">
                    {expandedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {expandedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm font-mono text-accent-gold bg-dark-900 rounded-full border border-accent-gold/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {expandedProject.link && (
                      <a
                        href={expandedProject.link}
                        className="px-6 py-3 bg-accent-gold text-dark-900 font-bold rounded hover:bg-accent-gold-light transition-colors"
                      >
                        View Live Project
                      </a>
                    )}
                    {expandedProject.github && (
                      <a
                        href={expandedProject.github}
                        className="px-6 py-3 border border-light-300 text-light-300 font-bold rounded hover:border-light-100 hover:text-light-100 transition-colors"
                      >
                        View on GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
