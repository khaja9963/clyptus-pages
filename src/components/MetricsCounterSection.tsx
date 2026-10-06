import React, { useEffect, useRef, useState } from 'react';
import { Globe, TrendingUp, Cpu } from 'lucide-react';

interface MetricItem {
  id: number;
  targetValue: number;
  suffix: string;
  icon: React.ElementType;
  lines: string[];
}

const metrics: MetricItem[] = [
  {
    id: 1,
    targetValue: 96,
    suffix: '%',
    icon: Globe,
    lines: ['Clyptus Clients', 'Experience Faster', 'System Performance'],
  },
  {
    id: 2,
    targetValue: 89,
    suffix: '%',
    icon: TrendingUp,
    lines: ['Clyptus Oracle', 'Optimizations Improve', 'Database Efficiency'],
  },
  {
    id: 3,
    targetValue: 92,
    suffix: '%',
    icon: Cpu,
    lines: ['Clyptus AI', 'Implementations', 'Accelerate Business', 'Processes'],
  },
];

export const MetricsCounterSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [autoTime, setAutoTime] = useState<number>(0);

  // RAF loop for continuous 60 FPS auto-moving float wave
  useEffect(() => {
    let animId: number;
    const updateAutoMove = () => {
      setAutoTime(performance.now() * 0.0015);
      animId = requestAnimationFrame(updateAutoMove);
    };
    animId = requestAnimationFrame(updateAutoMove);
    return () => cancelAnimationFrame(animId);
  }, []);

  // RAF scroll sampling over 450vh pinned track
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const totalDist = rect.height - viewportHeight;

            if (totalDist > 0) {
              const scrolled = -rect.top;
              const p = Math.max(0, Math.min(1, scrolled / totalDist));
              setScrollProgress(p);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Breakdown of scroll progress over 450vh pinned track:
  // 0% -> 30%   : Initial Fade-In & Slide-In (0% -> 100%)
  // 30% -> 50%  : Fully Visible Focus (100%)
  // 50% -> 70%  : Hold Phase (100%)
  // 70% -> 100% : Final Exit Fade-Out & Slide-Out (100% -> 0%)

  let slideInRatio = 1;
  let slideOutRatio = 0;

  if (scrollProgress < 0.30) {
    slideInRatio = scrollProgress / 0.30;
    slideOutRatio = 0;
  } else if (scrollProgress >= 0.30 && scrollProgress <= 0.70) {
    slideInRatio = 1;
    slideOutRatio = 0;
  } else {
    slideInRatio = 1;
    slideOutRatio = (scrollProgress - 0.70) / 0.30;
  }

  return (
    <div ref={containerRef} className="relative w-full h-[450vh] bg-white select-none border-y border-slate-100">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden px-6 sm:px-12 lg:px-20">
        
        {/* Background Soft Glow Accents */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div 
          className="text-center mb-10 z-10 transition-opacity duration-300"
          style={{
            opacity: Math.max(0, slideInRatio - slideOutRatio * 1.2),
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-mono tracking-widest text-sky-700 font-bold uppercase mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            PROVEN PERFORMANCE METRICS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight">
            MEASURABLE <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">BUSINESS IMPACT.</span>
          </h2>
        </div>

        {/* 3 Metric Cards */}
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 relative z-10">
          {metrics.map((metric, idx) => {
            const IconComp = metric.icon;
            
            // Count up progress mapped smoothly to slideInRatio
            const currentCount = Math.floor(slideInRatio * metric.targetValue);

            // Continuous auto-moving sine wave float offset for organic motion
            const autoFloatY = Math.sin(autoTime + idx * 1.6) * 7;

            // Gradient colors matching reference images per card
            let numberGradientClass = 'from-sky-500 via-blue-600 to-indigo-600';
            let iconStyle = 'bg-sky-50 border-sky-200 text-sky-600 group-hover:bg-sky-600';
            
            if (idx === 1) {
              // Card 2: Emerald Green to Teal gradient (matching GROWTH. reference image)
              numberGradientClass = 'from-emerald-500 via-teal-600 to-sky-500';
              iconStyle = 'bg-emerald-50 border-emerald-200 text-emerald-600 group-hover:bg-emerald-600';
            } else if (idx === 2) {
              // Card 3: Electric Blue to Indigo Purple gradient (matching Solutions reference image)
              numberGradientClass = 'from-indigo-500 via-purple-600 to-sky-500';
              iconStyle = 'bg-indigo-50 border-indigo-200 text-indigo-600 group-hover:bg-indigo-600';
            }

            let transformStyle = '';
            let opacity = 1.0;

            if (slideOutRatio > 0) {
              // FINAL EXIT FADE-OUT & SLIDE-OUT PHASE (70% -> 100%)
              opacity = Math.max(0, 1.0 - slideOutRatio);
              if (idx === 0) {
                // Left Card: Gentle Slide OUT to Left (-100px) + auto-float
                const translateX = -100 * slideOutRatio;
                transformStyle = `translate3d(${translateX}px, ${autoFloatY}px, 0)`;
              } else if (idx === 1) {
                // Middle Card: Gentle Slide OUT upwards (-60px) + auto-float
                const translateY = -60 * slideOutRatio + autoFloatY;
                const scale = 1.0 - 0.10 * slideOutRatio;
                transformStyle = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
              } else {
                // Right Card: Gentle Slide OUT to Right (+100px) + auto-float
                const translateX = 100 * slideOutRatio;
                transformStyle = `translate3d(${translateX}px, ${autoFloatY}px, 0)`;
              }
            } else {
              // INITIAL FADE-IN & SLIDE-IN PHASE (0% -> 30%)
              opacity = Math.max(0, slideInRatio);
              if (idx === 0) {
                // Left Card: Gentle Slide IN from Left (-100px -> 0px) + auto-float
                const translateX = -100 * (1 - slideInRatio);
                transformStyle = `translate3d(${translateX}px, ${autoFloatY}px, 0)`;
              } else if (idx === 1) {
                // Middle Card: Gentle Slide IN from Bottom (+60px -> 0px) + auto-float
                const translateY = 60 * (1 - slideInRatio) + autoFloatY;
                const scale = 0.90 + 0.10 * slideInRatio;
                transformStyle = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
              } else {
                // Right Card: Gentle Slide IN from Right (+100px -> 0px) + auto-float
                const translateX = 100 * (1 - slideInRatio);
                transformStyle = `translate3d(${translateX}px, ${autoFloatY}px, 0)`;
              }
            }

            return (
              <div
                key={metric.id}
                style={{
                  transform: transformStyle,
                  opacity,
                  willChange: 'transform, opacity',
                }}
                className="flex flex-col items-center md:items-start text-center md:text-left p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(2,132,199,0.12)] hover:border-sky-300 transition-all duration-300 group"
              >
                {/* Header Row: Icon + Gradient Percentage Number */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Icon Container Badge */}
                  <div className={`w-14 h-14 rounded-full border flex items-center justify-center group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs ${iconStyle}`}>
                    <IconComp className="w-7 h-7 stroke-[1.75]" />
                  </div>

                  {/* Animated Percentage Number with Reference Gradient Colors */}
                  <div className="flex items-baseline">
                    <span className={`text-5xl sm:text-6xl font-black tracking-tight font-mono bg-gradient-to-r ${numberGradientClass} bg-clip-text text-transparent drop-shadow-xs`}>
                      {currentCount}
                    </span>
                    <span className={`text-3xl sm:text-4xl font-black ml-0.5 bg-gradient-to-r ${numberGradientClass} bg-clip-text text-transparent`}>
                      {metric.suffix}
                    </span>
                  </div>
                </div>

                {/* Description Text */}
                <div className="flex flex-col gap-1 text-slate-950 font-black text-sm sm:text-base leading-snug tracking-tight uppercase">
                  {metric.lines.map((line, lIdx) => (
                    <span key={lIdx}>{line}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
