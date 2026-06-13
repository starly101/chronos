/**
 * ═══════════════════════════════════════════════════════════════
 * BENTO CELL COMPONENT
 * Reusable bento grid cell with hover effects
 * ═══════════════════════════════════════════════════════════════
 */

'use client';

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useElementMousePosition } from '@/hooks/useMousePosition';

interface BentoCellProps {
  children: React.ReactNode;
  title: string;
  description: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  icon?: string;
}

export const BentoCell = ({
  children,
  title,
  description,
  size = 'small',
  className = '',
  icon,
}: BentoCellProps) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const { x, y, isInside } = useElementMousePosition(cellRef);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-2 row-span-1',
    large: 'col-span-1 row-span-2',
  };

  return (
    <motion.div
      ref={cellRef}
      className={`relative overflow-hidden rounded-2xl bg-[#141412] border border-white/5 ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Hover glow effect following cursor */}
      {isInside && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: x,
            top: y,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(200, 169, 110, 0.15) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Border highlight on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(200, 169, 110, 0.3), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {icon && (
            <span className="text-2xl">{icon}</span>
          )}
          <motion.div
            className="w-8 h-8 rounded-full border border-[#C8A96E]/30 flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.1 : 1,
              borderColor: isHovered ? '#C8A96E' : 'rgba(200, 169, 110, 0.3)',
            }}
            transition={{ duration: 0.3 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform duration-300 ${isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''}`}
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.div>
        </div>

        {/* Live Demo Area */}
        <div className="flex-1 min-h-[120px] mb-4">
          {children}
        </div>

        {/* Footer */}
        <div>
          <h3 className="text-lg font-syne font-semibold text-[#E8E0D0] mb-1">
            {title}
          </h3>
          <p className="text-sm text-[#4A4540]">
            {description}
          </p>
        </div>
      </div>

      {/* Scale animation on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-[#C8A96E]/0"
        animate={{
          scale: isHovered ? 1.02 : 1,
          borderColor: isHovered ? 'rgba(200, 169, 110, 0.5)' : 'transparent',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default BentoCell;
