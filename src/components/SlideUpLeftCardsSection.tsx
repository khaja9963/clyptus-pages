import React, { useEffect, useRef, useState } from 'react';
import { Layers, Cpu, ShieldCheck, Zap, Sparkles, BarChart3, ArrowRight } from 'lucide-react';

interface FeatureCardItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  badgeColor: string;
  gradient: string;
  icon: React.ElementType;
  stats: string;
}

const FEATURE_CARDS: FeatureCardItem[] = [
  {
    id: 1,
    title: 'Adaptive AI Engine',
    subtitle: 'Self-optimizing workflow automation',
    description: 'Dynamically restructures enterprise software pipelines using real-time predictive cognitive algorithms.',
    category: 'INTELLIGENCE',
    badgeColor: 'bg-sky-100 text-sky-700 border-sky-300',
    gradient: 'from-sky-500 via-blue-600 to-indigo-600',
    icon: Cpu,
    stats: '10x Speed',
  },
  {
    id: 2,
    title: 'Cognitive UX Systems',
    subtitle: 'Context-aware dynamic interfaces',
    description: 'Personalizes customer digital touchpoints instantaneously based on user behavior and intent signals.',
    category: 'ADAPTIVE DESIGN',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-300',
    gradient: 'from-purple-500 via-indigo-600 to-sky-500',
    icon: Layers,
    stats: '99.8% Engagement',
  },
  {
    id: 3,
    title: 'Predictive Data Mesh',
    subtitle: 'Zero-downtime analytics matrix',
    description: 'Streamlines cross-departmental data flows into a unified high-throughput real-time streaming pipeline.',
    category: 'DATA STRATEGY',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    gradient: 'from-emerald-500 via-teal-600 to-sky-500',
    icon: BarChart3,
    stats: '4.2ms Latency',
  },
  {
    id: 4,
    title: 'Automated Cyber Shield',
    subtitle: 'Autonomous threat defense & recovery',
    description: 'Protects cloud microservices with continuous anomaly detection and self-healing security protocols.',
    category: 'SECURITY',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-300',
    gradient: 'from-amber-500 via-orange-600 to-red-500',
    icon: ShieldCheck,
    stats: '100% Shielded',
  },
  {
    id: 5,
    title: 'Next-Gen Cloud Mesh',
    subtitle: 'Elastic hyper-scale architecture',
    description: 'Auto-scales compute infrastructure dynamically with zero manual intervention or performance degradation.',
    category: 'CLOUD INFRA',
    badgeColor: 'bg-cyan-100 text-cyan-700 border-cyan-300',
    gradient: 'from-cyan-500 via-blue-600 to-indigo-500',
    icon: Zap,
    stats: '99.999% Uptime',
  },
];

export const SlideUpLeftCardsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [autoTime, setAutoTime] = useState<number>(0);

  // 60 FPS RAF loop for subtle ambient floating wave physics
  useEffect(() => {
    let animId: number;
    const updateAutoMove = () => {
      setAutoTime(performance.now() * 0.0015);
      animId = requestAnimationFrame(updateAutoMove);
    };
    animId = requestAnimationFrame(updateAutoMove);
    return () => cancelAnimationFrame(animId);
  }, []);

  // RAF Scroll-driven track listener (400vh track)
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

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-slate-950 select-none overflow-hidden text-white">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-8 lg:px-16">
        
        {/* Background Ambient Glow Orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Section Header */}
        <div 
          className="relative z-10 max-w-4xl mx-auto text-center mb-8 sm:mb-12 transition-all duration-300"
          style={{
            opacity: Math.min(1, scrollProgress * 3.5) * Math.max(0, 1 - (scrollProgress - 0.82) / 0.18),
            transform: `translateY(${Math.max(0, (1 - scrollProgress * 3) * 30)}px)`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono tracking-widest text-sky-400 font-bold uppercase mb-3 backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            ADAPTIVE FEATURE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase text-white">
            INTELLIGENT <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">SOLUTIONS IN MOTION.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-2xl mx-auto mt-2">
            Watch feature cards rise from the bottom right and glide horizontally across the screen as you scroll.
          </p>
        </div>

        {/* Animated Feature Cards Container (Moves Bottom-Right -> Up -> Slides Left) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto h-[420px] flex items-center">
          <div className="relative w-full h-full flex items-center justify-start gap-6 sm:gap-8 px-4">
            {FEATURE_CARDS.map((card, idx) => {
              const IconComp = card.icon;

              // Motion Physics Breakdown over scrollProgress (0.0 -> 1.0):
              // 1. Initial Entry: Card staggered entry from bottom-right (translateX: +600px -> 0px, translateY: +400px -> 0px)
              // 2. Main Slide Left: As scrollProgress moves 0.35 -> 0.85, the card sequence slides left (-1100px total shift)
              
              const cardDelay = idx * 0.08;
              const entryProgress = Math.max(0, Math.min(1, (scrollProgress - cardDelay) / 0.30));

              // 1. Bottom-Right -> Up Translation
              const translateYEntry = (1 - entryProgress) * (350 + idx * 40);
              const translateXEntry = (1 - entryProgress) * (450 + idx * 60);
              const cardOpacity = Math.min(1, entryProgress * 1.5) * Math.max(0, 1 - (scrollProgress - 0.82) / 0.18);
              const rotateDeg = (1 - entryProgress) * 12;

              // 2. Slide Left Shift Phase
              const slideLeftProgress = Math.max(0, Math.min(1, (scrollProgress - 0.35) / 0.50));
              const slideLeftX = -slideLeftProgress * 950;

              // Organic floating wave offset
              const floatY = Math.sin(autoTime + idx * 1.4) * 6;

              const totalX = translateXEntry + slideLeftX;
              const totalY = translateYEntry + floatY;

              return (
                <div
                  key={card.id}
                  style={{
                    transform: `translate3d(${totalX}px, ${totalY}px, 0) rotate(${rotateDeg}deg)`,
                    opacity: cardOpacity,
                    willChange: 'transform, opacity',
                  }}
                  className="shrink-0 w-[290px] sm:w-[340px] p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-sky-500/60 hover:shadow-[0_20px_60px_rgba(14,165,233,0.25)] transition-all duration-300 group cursor-pointer"
                >
                  {/* Badge & Stat Row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${card.badgeColor}`}>
                      {card.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/60">
                      {card.stats}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} p-0.5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <IconComp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-sky-400 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold leading-tight">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 font-medium leading-relaxed mb-5 border-t border-slate-800/80 pt-3">
                    {card.description}
                  </p>

                  {/* Action Link */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs font-bold text-sky-400 group-hover:text-white transition-colors">
                    <span className="inline-flex items-center gap-1 font-mono tracking-wider text-[11px]">
                      EXPLORE FEATURE <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Progress Indicator Bar at Bottom */}
        <div className="relative z-10 max-w-md w-full mx-auto mt-8 flex items-center gap-3 px-4">
          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">RIGHT-TO-LEFT MOTION</span>
          <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-150"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-sky-400 font-bold">{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>
    </div>
  );
};
