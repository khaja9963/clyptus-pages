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

  // RAF sampling of scroll track progress
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

              // Update active index based on horizontal slide
              const idx = Math.min(FEATURE_CARDS.length - 1, Math.floor(p * FEATURE_CARDS.length));
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
    <div ref={trackRef} className="relative w-full h-[350vh] bg-slate-50/50 border-t border-slate-200/80 select-none overflow-hidden">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-8 lg:px-16 py-10">
        
        {/* Ambient Soft Glow Background */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-100/60 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-6xl w-full mx-auto mb-8 sm:mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-mono tracking-widest text-sky-700 font-bold uppercase mb-3 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              INTELLIGENT FEATURE MATRIX
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight">
              ENGINEERED FOR <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">ENTERPRISE SPEED.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-500 bg-white/80 border border-slate-200/80 px-4 py-2 rounded-full backdrop-blur-md shadow-xs">
            <span className="font-bold text-slate-900">{activeCardIndex + 1}</span> / {FEATURE_CARDS.length} Preset Features
          </div>
        </div>

        {/* Animated Feature Cards Track */}
        <div className="relative w-full max-w-7xl mx-auto h-[420px] sm:h-[450px] flex items-center z-10">
          <div className="flex gap-6 sm:gap-8 w-full">
            {FEATURE_CARDS.map((card, idx) => {
              const IconComp = card.icon;

              // Motion math:
              // Phase 1 (0% -> 35%): Cards enter from Right-Bottom (translateX: +400px -> 0, translateY: +300px -> 0)
              // Phase 2 (35% -> 100%): Cards slide LEFT across the viewport (translateX: 0 -> - (idx * 340px))

              const risePhase = Math.min(1, scrollProgress / 0.35);
              const slidePhase = Math.max(0, (scrollProgress - 0.35) / 0.65);

              // Staggered entry from right-bottom
              const staggerDelay = idx * 0.15;
              const cardRiseProgress = Math.max(0, Math.min(1, (risePhase - staggerDelay / 2) / (1 - staggerDelay / 2)));

              // Right-bottom starting offset
              const initialRightX = (1 - cardRiseProgress) * (400 + idx * 80);
              const initialBottomY = (1 - cardRiseProgress) * (280 + idx * 50);

              // Horizontal slide left offset
              const slideLeftX = -slidePhase * (FEATURE_CARDS.length - 1) * 340;

              const totalX = initialRightX + slideLeftX;
              const totalY = initialBottomY;
              const opacity = Math.min(1, cardRiseProgress * 1.5);
              const scale = 0.9 + cardRiseProgress * 0.1;

              return (
                <div
                  key={card.id}
                  style={{
                    transform: `translate3d(${totalX}px, ${totalY}px, 0) scale(${scale})`,
                    opacity,
                    willChange: 'transform, opacity',
                  }}
                  className="shrink-0 w-[290px] sm:w-[350px] h-[380px] sm:h-[410px] rounded-3xl p-6 sm:p-8 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(2,132,199,0.15)] hover:border-sky-400 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
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
