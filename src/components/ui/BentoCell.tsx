'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';

interface BentoCellProps {
  title: string;
  label: string;
  icon: string;
  description: string;
  demoType: 'webgl' | 'motion' | 'ai' | 'code' | 'performance' | 'availability';
  score?: number;
  ctaText?: string;
  onCtaClick?: () => void;
}

export default function BentoCell({
  title,
  label,
  icon,
  description,
  demoType,
  score,
  ctaText,
  onCtaClick,
}: BentoCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  // Performance counter animation
  useEffect(() => {
    if (demoType === 'performance' && score) {
      const ctx = gsap.context(() => {
        gsap.to({ val: 0 }, {
          val: score,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cellRef.current,
            start: 'top 80%',
          },
          onUpdate: function() {
            setCounter(Math.round(this.targets()[0].val));
          },
        });
      }, cellRef);

      return () => ctx.revert();
    }
  }, [demoType, score]);

  return (
    <motion.div
      ref={cellRef}
      className="relative h-full min-h-[280px] overflow-hidden rounded-xl bg-dark-800 border border-dark-600 p-6 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, borderColor: '#C8A96E' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Live Demo Area */}
      <div className="absolute inset-0 pt-24 pb-6 px-6">
        {demoType === 'webgl' && (
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-accent-gold to-accent-gold-light opacity-60"
            />
          </div>
        )}

        {demoType === 'motion' && (
          <div className="w-full h-full flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-8 bg-accent-gold rounded-full"
                animate={{
                  scaleY: [1, 2, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}

        {demoType === 'ai' && (
          <div className="w-full h-full flex flex-col justify-center">
            <div className="font-mono text-xs text-light-300 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-accent-gold">{'>'}</span>
                <span>Analyzing request...</span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-4 bg-accent-gold"
              />
            </div>
          </div>
        )}

        {demoType === 'code' && (
          <div className="w-full h-full font-mono text-xs text-light-300 overflow-hidden">
            <div className="space-y-1">
              <div className="text-accent-gold">const</div>
              <div>Component = () ={'>'} {'{'}</div>
              <div className="pl-4">return (</div>
              <div className="pl-8 text-light-200">&lt;Awesome /&gt;</div>
              <div className="pl-4">)</div>
              <div>{'}'}</div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-4 bg-accent-gold mt-2"
              />
            </div>
          </div>
        )}

        {demoType === 'performance' && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-accent-gold mb-2">
              {counter}
            </div>
            <div className="text-label text-light-300">LIGHTHOUSE SCORE</div>
          </div>
        )}

        {demoType === 'availability' && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75" />
            </div>
            <div className="text-body-md text-light-200 text-center">
              Currently accepting<br />new projects
            </div>
            {ctaText && onCtaClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCtaClick();
                }}
                className="mt-4 px-4 py-2 text-sm font-mono text-accent-gold border border-accent-gold rounded hover:bg-accent-gold hover:text-dark-900 transition-all"
              >
                {ctaText}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Header Overlay */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{icon}</span>
          <span className="text-label text-accent-gold">{label}</span>
        </div>
        <h3 className="text-heading-3 font-bold text-light-100 mb-2">
          {title}
        </h3>
        <p className="text-body-sm text-light-300">
          {description}
        </p>
      </div>

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
