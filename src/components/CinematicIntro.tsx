import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

interface CinematicIntroProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
  onSkip,
}) => {
  // Intro animation states:
  // 'initial' -> 'drawingC' -> 'revealingWordmark' -> 'revealingTagline' -> 'energySweep' -> 'hold' -> 'exit' -> 'done'
  const [phase, setPhase] = useState<
    'initial' | 'drawingC' | 'revealingWordmark' | 'revealingTagline' | 'energySweep' | 'hold' | 'exit' | 'done'
  >('initial');

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
    }

    // Precise Cinematic Timeline Sequence
    const t1 = setTimeout(() => setPhase('drawingC'), 150);             // Step 2: Draw Orange C Symbol
    const t2 = setTimeout(() => setPhase('revealingWordmark'), 900);    // Step 3: Wordmark reveals at ~70% C draw
    const t3 = setTimeout(() => setPhase('revealingTagline'), 1600);    // Step 4: Tagline fade up
    const t4 = setTimeout(() => setPhase('energySweep'), 2200);       // Step 5: Orange + Blue Energy Stroke Sweep
    const t5 = setTimeout(() => setPhase('hold'), 3400);              // Step 7: Hold full logo
    const t6 = setTimeout(() => setPhase('exit'), 4400);              // Step 8: Smooth transition out
    const t7 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  const isCDrawn = phase !== 'initial';
  const isWordmarkRevealed =
    phase === 'revealingWordmark' ||
    phase === 'revealingTagline' ||
    phase === 'energySweep' ||
    phase === 'hold' ||
    phase === 'exit';
  const isTaglineRevealed =
    phase === 'revealingTagline' ||
    phase === 'energySweep' ||
    phase === 'hold' ||
    phase === 'exit';
  const isEnergySweeping = phase === 'energySweep' || phase === 'hold' || phase === 'exit';
  const isExiting = phase === 'exit';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 1.05 : 1,
        filter: isExiting ? 'blur(8px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white select-none overflow-hidden"
    >
      {/* Soft Ambient Radial Background Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: isWordmarkRevealed ? 0.9 : 0.3,
          scale: isWordmarkRevealed ? 1.1 : 0.9,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(242, 92, 5, 0.08) 0%, rgba(43, 58, 151, 0.08) 40%, rgba(255, 255, 255, 0) 70%)',
        }}
      />

      {/* Cinematic Energy Stroke Layer (Orange + Blue Curve Sweeping Across Logo) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Orange to Blue Energy Gradient */}
            <linearGradient id="energyGradOrangeBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f25c05" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="85%" stopColor="#2b3a97" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Subtle Soft Motion Glow Filter */}
            <filter id="energyGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Curved Energy Beam Sweeping Across the Centered Logo */}
          {!reducedMotion && isEnergySweeping && (
            <motion.path
              d="M -150,500 C 250,200 450,600 600,400 C 750,200 950,550 1350,300"
              stroke="url(#energyGradOrangeBlue)"
              strokeWidth="4.5"
              strokeLinecap="round"
              filter="url(#energyGlow)"
              initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 0.45, 0.45, 0],
                pathOffset: [0, 0.1, 0.55, 1],
                opacity: [0, 0.95, 0.95, 0],
              }}
              transition={{
                duration: 2.2,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.3, 0.7, 1],
              }}
            />
          )}
        </svg>
      </div>

      {/* Main Centered REAL Clyptus Logo Image */}
      <div className="relative z-20 flex flex-col items-center justify-center p-6 max-w-2xl w-full">
        <motion.img
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          src={logoImg}
          alt="Clyptus Software Solutions"
          className="w-72 md:w-96 h-auto object-contain select-none pointer-events-none"
        />

        {/* Minimal Corporate Progress Line */}
        <div className="mt-8 w-44 h-1 rounded-full bg-slate-100 overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 4.8, ease: 'linear' }}
            className="h-full w-full bg-gradient-to-r from-orange-500 to-blue-700"
          />
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={() => {
          setPhase('done');
          onSkip();
        }}
        className="absolute bottom-8 right-8 z-30 text-xs font-mono text-slate-500 hover:text-orange-600 hover:border-orange-400 transition-all uppercase tracking-widest px-4 py-2 rounded-full bg-white/90 border border-slate-200 backdrop-blur-md shadow-sm"
      >
        Skip Intro →
      </button>
    </motion.div>
  );
};
