import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  accentColor?: string; // hex or rgb color for laser trace & spotlight
  delay?: number;
  className?: string;
  variants?: any;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  accentColor = '#2563EB',
  delay = 0,
  className = '',
  variants,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--mouse-x', '-500px');
    e.currentTarget.style.setProperty('--mouse-y', '-500px');
  };

  return (
    <motion.div
      variants={variants}
      initial={variants ? undefined : { opacity: 0, y: 35, scale: 0.97 }}
      whileInView={variants ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={variants ? undefined : { once: true, amount: 0.2 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      transition={
        variants
          ? undefined
          : {
              duration: 0.5,
              delay,
              ease: [0.16, 1, 0.3, 1],
            }
      }
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundImage:
            'radial-gradient(350px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(37, 99, 235, 0.07), transparent 80%)',
        }}
        className={`group relative rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-[0_16px_24px_-4px_rgba(15,23,42,0.08)] hover:border-blue-500/40 transition-all duration-300 overflow-hidden ${className}`}
      >
        {/* SVG Subtle Border Accent Trace */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full z-10 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="99%"
            height="99%"
            rx="24"
            fill="none"
            stroke={accentColor}
            strokeWidth="1.5"
            className="opacity-0 group-hover:opacity-40 transition-opacity duration-300"
          />
        </svg>

        {/* Card Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
