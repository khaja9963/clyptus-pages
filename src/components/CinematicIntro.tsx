import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
  onSkip,
}) => {
  // Animation phases: 'initial' | 'fadeInLogo' | 'fadeInTagline' | 'hold' | 'zoomOut' | 'done'
  const [phase, setPhase] = useState<'initial' | 'fadeInLogo' | 'fadeInTagline' | 'hold' | 'zoomOut' | 'done'>('initial');

  useEffect(() => {
    // Sequence Timeline
    const timer1 = setTimeout(() => setPhase('fadeInLogo'), 300);
    const timer2 = setTimeout(() => setPhase('fadeInTagline'), 900);
    const timer3 = setTimeout(() => setPhase('hold'), 1600);
    const timer4 = setTimeout(() => setPhase('zoomOut'), 2800);
    const timer5 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 3700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  const isLogoVisible = phase === 'fadeInLogo' || phase === 'fadeInTagline' || phase === 'hold';
  const isTaglineVisible = phase === 'fadeInTagline' || phase === 'hold';
  const isZoomingOut = phase === 'zoomOut';

  // Dynamic zoom scale calculation per phase
  let zoomClass = 'scale-[0.75] opacity-0 blur-md';
  if (phase === 'fadeInLogo') zoomClass = 'scale-[0.95] opacity-90 blur-0';
  else if (phase === 'fadeInTagline') zoomClass = 'scale-[1.0] opacity-100 blur-0';
  else if (phase === 'hold') zoomClass = 'scale-[1.10] opacity-100 blur-0';
  else if (phase === 'zoomOut') zoomClass = 'scale-[1.50] opacity-0 blur-xl';

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white select-none transition-all duration-1000 ease-in-out ${
        isZoomingOut ? 'bg-opacity-0 pointer-events-none' : 'bg-opacity-100'
      }`}
    >
      {/* Soft Ambient Radial Background Glow */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          isLogoVisible ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 70%)',
        }}
      />

      {/* Center Intro Branding Box with Camera Zoom-Through Effect */}
      <div 
        className={`relative z-10 flex flex-col items-center text-center px-6 max-w-xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${zoomClass}`}
      >
        {/* Clyptus Icon & Logo Header with Pulsing Glow */}
        <div className="flex items-center gap-4 group">
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-[0_10px_30px_rgba(2,132,199,0.35)] transition-transform duration-700 hover:scale-110">
            <Zap className="w-8 h-8 fill-current animate-pulse" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 drop-shadow-sm">
            CLYPTUS<span className="text-sky-600 inline-block animate-pulse">.</span>
          </h1>
        </div>

        {/* Tagline Reveal */}
        <p
          className={`mt-5 text-sm sm:text-base font-bold tracking-widest text-slate-600 transition-all duration-1000 ease-out ${
            isTaglineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Technology<span className="text-sky-600 font-extrabold mx-2.5">•</span>Talent<span className="text-sky-600 font-extrabold mx-2.5">•</span>Transformation
        </p>
      </div>

      {/* Skip Button on Bottom Right */}
      <button
        onClick={() => {
          setPhase('done');
          onSkip();
        }}
        className="absolute bottom-8 right-8 z-20 text-xs font-mono text-slate-600 hover:text-sky-600 hover:border-sky-400 transition-all uppercase tracking-widest px-4 py-2 rounded-full bg-white/90 border border-slate-200 backdrop-blur-md shadow-md"
      >
        Skip Intro →
      </button>
    </div>
  );
};
