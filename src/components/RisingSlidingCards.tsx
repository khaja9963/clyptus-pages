import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Cloud, Database, ShieldCheck, Code, ArrowRight } from 'lucide-react';

interface FeatureCardData {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: string;
  icon: React.ElementType;
  gradient: string;
  borderGlow: string;
  bgGlow: string;
}

const FEATURE_CARDS: FeatureCardData[] = [
  {
    id: 1,
    badge: '01 • AI INTELLIGENCE',
    title: 'AI & Machine Learning Suite',
    subtitle: 'Predictive Analytics & Workflow Automation',
    description: 'Deploy enterprise-grade custom LLMs and neural models for continuous decision intelligence.',
    metrics: '99.4% Accuracy Rate',
    icon: Sparkles,
    gradient: 'from-sky-500 via-blue-600 to-indigo-600',
    borderGlow: 'hover:border-sky-400 hover:shadow-[0_20px_40px_rgba(2,132,199,0.2)]',
    bgGlow: 'bg-sky-500/10',
  },
  {
    id: 2,
    badge: '02 • CLOUD TECH',
    title: 'Cloud Native Infrastructure',
    subtitle: 'Hybrid & Multi-Cloud Architecture',
    description: 'Scalable Kubernetes orchestrations with automated failovers and zero-downtime deployments.',
    metrics: '99.99% Uptime Guarantee',
    icon: Cloud,
    gradient: 'from-indigo-500 via-purple-600 to-pink-600',
    borderGlow: 'hover:border-indigo-400 hover:shadow-[0_20px_40px_rgba(99,102,241,0.2)]',
    bgGlow: 'bg-indigo-500/10',
  },
  {
    id: 3,
    badge: '03 • DATA SYSTEMS',
    title: 'Database Optimization',
    subtitle: 'High-Throughput Enterprise Storage',
    description: 'Sub-millisecond query optimization for Oracle, PostgreSQL, and distributed database clusters.',
    metrics: '3.8x Query Speedup',
    icon: Database,
    gradient: 'from-emerald-500 via-teal-600 to-sky-500',
    borderGlow: 'hover:border-emerald-400 hover:shadow-[0_20px_40px_rgba(16,185,129,0.2)]',
    bgGlow: 'bg-emerald-500/10',
  },
  {
    id: 4,
    badge: '04 • CYBERSECURITY',
    title: 'Zero-Trust Security Mesh',
    subtitle: 'Real-Time Threat Detection & Compliance',
    description: 'Autonomous threat detection, SOC-2 compliance monitoring, and automated vulnerability patching.',
    metrics: '24/7 Threat Protection',
    icon: ShieldCheck,
    gradient: 'from-purple-600 via-indigo-600 to-blue-600',
    borderGlow: 'hover:border-purple-400 hover:shadow-[0_20px_40px_rgba(147,51,234,0.2)]',
    bgGlow: 'bg-purple-500/10',
  },
  {
    id: 5,
    badge: '05 • ENGINEERING',
    title: 'Custom Software Systems',
    subtitle: 'Full-Stack High Performance Apps',
    description: 'Custom React, Node.js, and microservice architectures built for high concurrency global scale.',
    metrics: '60 FPS Ultra Performance',
    icon: Code,
    gradient: 'from-amber-500 via-orange-600 to-rose-600',
    borderGlow: 'hover:border-amber-400 hover:shadow-[0_20px_40px_rgba(245,158,11,0.2)]',
    bgGlow: 'bg-amber-500/10',
  },
];

export const RisingSlidingCards: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [autoTime, setAutoTime] = useState<number>(0);

  // RAF loop for organic floating motion
  useEffect(() => {
    let animId: number;
    const updateAuto = () => {
      setAutoTime(performance.now() * 0.0012);
      animId = requestAnimationFrame(updateAuto);
    };
    animId = requestAnimationFrame(updateAuto);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Window scroll sync across 350vh track
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (trackRef.current) {
            const rect = trackRef.current.getBoundingClientRect();
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

  return (
    <div ref={trackRef} className="relative w-full h-[350vh] bg-slate-900 text-white select-none border-y border-slate-800">
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-16">
        
        {/* Ambient Dark Neon Glow Background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="text-center z-20 max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-[11px] font-mono tracking-widest text-sky-400 font-bold uppercase mb-3 shadow-lg backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            ANIMATED FEATURE CARDS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight uppercase text-white drop-shadow-md">
            SMART SOLUTIONS <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">RISING & SLIDING.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
            Watch feature cards rise from the bottom-right and slide left in continuous scroll sync
          </p>
        </div>

        {/* Cards Stage Container */}
        <div className="relative w-full max-w-6xl h-[380px] sm:h-[420px] flex items-center justify-center z-20">
          {FEATURE_CARDS.map((card, idx) => {
            const IconComp = card.icon;

            // Staggered scroll window per card (5 cards over 0.0 -> 1.0 progress)
            // Entrance starts from Right-Bottom -> Rises Up -> Slides Left
            const stepOffset = idx * 0.16;
            const relativeProgress = Math.max(0, Math.min(1, (scrollProgress - stepOffset) / 0.35));

            // Floating wave offset for organic floating physics
            const floatY = Math.sin(autoTime + idx * 1.4) * 6;

            let opacity = 0;
            let transform = '';

            if (relativeProgress === 0) {
              // Initial State: Hidden at Right-Bottom
              opacity = 0;
              transform = `translate3d(600px, 350px, 0) scale(0.7) rotate(15deg)`;
            } else if (relativeProgress > 0 && relativeProgress < 0.40) {
              // PHASE 1: Rise UP from Right-Bottom into Center Focus
              const subP = relativeProgress / 0.40;
              const posX = 600 * (1 - subP);
              const posY = 350 * (1 - subP) + floatY;
              const rotate = 15 * (1 - subP);
              const scale = 0.70 + 0.30 * subP;
              opacity = subP;
              transform = `translate3d(${posX}px, ${posY}px, 0) scale(${scale}) rotate(${rotate}deg)`;
            } else if (relativeProgress >= 0.40 && relativeProgress < 0.70) {
              // PHASE 2: Center Focus & Hold with gentle float
              opacity = 1.0;
              const subP = (relativeProgress - 0.40) / 0.30;
              const posX = -120 * subP; // Slow drift left while visible
              const posY = floatY;
              transform = `translate3d(${posX}px, ${posY}px, 0) scale(1.02)`;
            } else {
              // PHASE 3: Slide LEFT and Exit Far-Left
              const subP = (relativeProgress - 0.70) / 0.30;
              const posX = -120 - 700 * subP;
              const posY = -80 * subP + floatY;
              const rotate = -12 * subP;
              const scale = 1.02 - 0.25 * subP;
              opacity = Math.max(0, 1 - subP);
              transform = `translate3d(${posX}px, ${posY}px, 0) scale(${scale}) rotate(${rotate}deg)`;
            }

            return (
              <div
                key={card.id}
                style={{
                  transform,
                  opacity,
                  willChange: 'transform, opacity',
                  zIndex: 30 - idx,
                }}
                className={`absolute w-[290px] sm:w-[350px] p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl transition-all duration-150 ease-out group ${card.borderGlow}`}
              >
                {/* Header Row: Badge + Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold text-sky-400 bg-sky-950/80 border border-sky-800/60 shadow-inner">
                    {card.badge}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 ${card.bgGlow} transition-transform duration-300 group-hover:scale-110`}>
                    <IconComp className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1 uppercase group-hover:text-sky-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mb-3">
                  {card.subtitle}
                </p>

                {/* Card Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-normal mb-5">
                  {card.description}
                </p>

                {/* Footer Row: Metric Pill + Action Arrow */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <span className={`text-xs font-mono font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                    {card.metrics}
                  </span>
                  <button className="flex items-center gap-1 text-xs font-bold text-sky-400 group-hover:text-white transition-colors">
                    Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step Indicator Bullets */}
        <div className="absolute bottom-6 z-20 flex items-center gap-2">
          {FEATURE_CARDS.map((_, i) => {
            const stepOffset = i * 0.16;
            const isActive = scrollProgress >= stepOffset && scrollProgress < stepOffset + 0.35;
            return (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'w-8 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]' : 'w-2 bg-slate-700'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
