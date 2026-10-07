import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  accentColor?: string; // hex or rgb color for laser trace & spotlight
  delay?: number;
  className?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  accentColor = '#2563EB',
  delay = 0,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate 3D tilt offset (-0.04deg multiplier)
    const rotateX = (y - centerY) * -0.04;
    const rotateY = (x - centerX) * 0.04;

    setTransform({ rotateX, rotateY });
    setSpotlightPos({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 1000 }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: reducedMotion
            ? 'none'
            : `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.18s ease-out, box-shadow 0.3s ease',
        }}
        className={`group relative rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
      >
        {/* Dynamic Cursor Spotlight Radial Gradient */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
          style={{
            opacity: spotlightPos.opacity,
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(37,99,235,0.08), transparent 70%)`,
          }}
        />

        {/* SVG Laser Border-Tracing Outline on Scroll Entrance */}
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
            strokeWidth="2"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              strokeDasharray: 800,
              strokeDashoffset: 0,
            }}
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
