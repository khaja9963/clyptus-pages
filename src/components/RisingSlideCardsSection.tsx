import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Database, ShieldCheck, BarChart3, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FeatureCardItem {
  id: number;
  icon: React.ElementType;
  category: string;
  title: string;
  description: string;
  badge: string;
  gradient: string;
  iconBg: string;
  iconText: string;
}

const FEATURE_CARDS: FeatureCardItem[] = [
  {
    id: 1,
    icon: Sparkles,
    category: 'AI AUTOMATION',
    title: 'Autonomous Workflow Engines',
    description: 'End-to-end multi-agent AI pipelines that execute complex enterprise tasks with sub-second precision.',
    badge: '99.8% Efficiency',
    gradient: 'from-sky-500 via-blue-600 to-indigo-600',
    iconBg: 'bg-sky-50 border-sky-200',
    iconText: 'text-sky-600',
  },
  {
    id: 2,
    icon: Database,
    category: 'CLOUD INFRASTRUCTURE',
    title: 'Oracle & Multi-Cloud Scale',
    description: 'High-availability data pipelines and hybrid cloud clusters optimized for low latency and zero downtime.',
    badge: '3.2x Throughput',
    gradient: 'from-emerald-500 via-teal-600 to-sky-500',
    iconBg: 'bg-emerald-50 border-emerald-200',
    iconText: 'text-emerald-600',
  },
  {
    id: 3,
    icon: ShieldCheck,
    category: 'ENTERPRISE SECURITY',
    title: 'Zero-Trust AI Governance',
    description: 'Military-grade encryption, threat detection, and continuous compliance across enterprise systems.',
    badge: 'ISO 27001 Ready',
    gradient: 'from-indigo-500 via-purple-600 to-pink-500',
    iconBg: 'bg-indigo-50 border-indigo-200',
    iconText: 'text-indigo-600',
  },
  {
    id: 4,
    icon: BarChart3,
    category: 'PREDICTIVE ANALYTICS',
    title: 'Real-Time Data Intelligence',
    description: 'Stream processing engines turning complex operational streams into actionable executive metrics.',
    badge: '50ms Latency',
    gradient: 'from-purple-500 via-pink-600 to-rose-500',
    iconBg: 'bg-purple-50 border-purple-200',
    iconText: 'text-purple-600',
  },
  {
    id: 5,
    icon: Layers,
    category: 'ADAPTIVE ARCHITECTURE',
    title: 'Self-Healing Microservices',
    description: 'Resilient cloud-native microservice fabrics that auto-scale dynamically under peak global load.',
    badge: '100% Scalable',
    gradient: 'from-cyan-500 via-sky-600 to-blue-600',
    iconBg: 'bg-cyan-50 border-cyan-200',
    iconText: 'text-cyan-600',
  },
];

export const RisingSlideCardsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  // RAF sampling of scroll track progress over pinned viewport track
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

              // Update active index based on motion phase
              const slideProgress = Math.max(0, (p - 0.25) / 0.65);
              const idx = Math.min(FEATURE_CARDS.length - 1, Math.floor(slideProgress * FEATURE_CARDS.length));
              setActiveCardIndex(idx);
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
    /* Outer Scroll-Pinning Track (450vh freezes the screen completely during rise & slide) */
    <div ref={trackRef} className="relative w-full h-[450vh] bg-slate-50/50 border-t border-slate-200/80 select-none">
      {/* Sticky Viewport Container (Freezes/Pins Screen in Place) */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-8 lg:px-16 py-8">
        
        {/* Ambient Soft Glow Background */}
        <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-sky-100/70 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-indigo-100/70 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-6xl w-full mx-auto mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-mono tracking-widest text-sky-700 font-bold uppercase mb-3 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              INTELLIGENT FEATURE MATRIX
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight">
              ENGINEERED FOR <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">ENTERPRISE SPEED.</span>
            </h2>
          </div>

          {/* Frozen Viewport Motion Indicator */}
          <div className="flex items-center gap-3 bg-white/90 border border-slate-200/90 px-4 py-2 rounded-full backdrop-blur-md shadow-xs z-10">
            <div className="flex flex-col gap-0.5 text-right font-mono text-[10px]">
              <span className="font-bold text-slate-900 uppercase">
                {scrollProgress < 0.25 ? 'STAGE 1: RISING UP' : scrollProgress < 0.85 ? 'STAGE 2: SLIDING LEFT' : 'STAGE 3: FEATURE MATRIX'}
              </span>
              <span className="text-slate-500">
                Card {activeCardIndex + 1} of {FEATURE_CARDS.length}
              </span>
            </div>
            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Animated Feature Cards Track */}
        <div className="relative w-full max-w-7xl mx-auto h-[420px] sm:h-[450px] flex items-center z-10">
          <div className="flex gap-6 sm:gap-8 w-full">
            {FEATURE_CARDS.map((card, idx) => {
              const IconComp = card.icon;

              // Motion Math while Screen is Frozen:
              // Stage 1 (0.00 -> 0.25): Rise UP from Right-Bottom corner
              // Stage 2 (0.25 -> 0.85): Slide LEFT horizontally across frozen viewport
              // Stage 3 (0.85 -> 1.00): Fully visible hold state before unfreezing page scroll

              const riseProgress = Math.min(1, scrollProgress / 0.25);
              const slideProgress = Math.max(0, Math.min(1, (scrollProgress - 0.25) / 0.60));

              // Stagger delay per card during right-bottom rise
              const stagger = idx * 0.12;
              const cardRiseProgress = Math.max(0, Math.min(1, (riseProgress - stagger) / (1 - stagger)));

              // Right-bottom initial offset (Offscreen right & bottom)
              const startRightX = (1 - cardRiseProgress) * (500 + idx * 100);
              const startBottomY = (1 - cardRiseProgress) * (350 + idx * 80);

              // Horizontal slide left distance (moves cards smoothly across screen)
              const slideLeftX = -slideProgress * (FEATURE_CARDS.length - 1) * 360;

              const totalX = startRightX + slideLeftX;
              const totalY = startBottomY;

              const opacity = Math.min(1, cardRiseProgress * 1.8);
              const scale = 0.88 + cardRiseProgress * 0.12;

              const isFocused = idx === activeCardIndex;

              return (
                <div
                  key={card.id}
                  style={{
                    transform: `translate3d(${totalX}px, ${totalY}px, 0) scale(${scale})`,
                    opacity,
                    willChange: 'transform, opacity',
                  }}
                  className={`shrink-0 w-[290px] sm:w-[350px] h-[380px] sm:h-[410px] rounded-3xl p-6 sm:p-8 bg-white/95 backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                    isFocused 
                      ? 'border-sky-400 shadow-[0_20px_50px_rgba(2,132,199,0.18)] ring-2 ring-sky-300/40' 
                      : 'border-slate-200/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:border-sky-300 hover:shadow-lg'
                  }`}
                >
                  {/* Card Header Badge & Gradient Accent Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${card.gradient}`} />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${card.iconBg} ${card.iconText}`}>
                        <IconComp className="w-6 h-6 stroke-[1.75]" />
                      </div>

                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                        {card.badge}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono tracking-widest text-slate-500 font-bold uppercase mb-2">
                      {card.category}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight leading-snug group-hover:text-sky-600 transition-colors mb-3">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Footer Action Row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Production Ready
                    </span>

                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-sky-600 group-hover:text-white transition-all flex items-center justify-center text-slate-600">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
