import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';

interface ProjectCardItem {
  id: number;
  isHeroOverview?: boolean;
  tag: string;
  badge: string;
  quote?: string;
  heroText?: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  accentGradient: string;
}

const PROJECT_CARDS: ProjectCardItem[] = [
  {
    id: 1,
    isHeroOverview: true,
    tag: 'CLYPTUS PORTFOLIO',
    badge: '2026 FEATURE MATRIX',
    title: 'Selected work & explorations',
    subtitle: 'ENGINEERED FOR ENTERPRISE SPEED',
    description: 'Transforming legacy operations into high-velocity, autonomous AI workflows and resilient multi-cloud architectures.',
    accentGradient: 'from-sky-600 via-indigo-600 to-purple-600',
  },
  {
    id: 2,
    tag: 'AI DIGITAL WORKERS',
    badge: 'FEATURE #01',
    quote: 'BOOST YOUR WORKFORCE WITH AI DIGITAL WORKERS',
    heroText: "Hi, I'm Alex.",
    title: 'MyWorker AI',
    subtitle: 'Autonomous Workforce Scaling',
    description: 'AI platform simplifying hiring, management, and autonomous workforce scaling with sub-second task execution.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    accentGradient: 'from-sky-500 to-blue-600',
  },
  {
    id: 3,
    tag: 'AUTOMATED PIPELINES',
    badge: 'FEATURE #02',
    quote: 'HIGH-VELOCITY MULTI-AGENT ORCHESTRATION',
    heroText: 'Clyptus Helix.',
    title: 'Autonomous Workflow Engine',
    subtitle: 'Sub-Second Pipeline Execution',
    description: 'Self-healing multi-agent event loops that automatically handle complex enterprise transactions and data routing.',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop',
    accentGradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 4,
    tag: 'MULTI-CLOUD HYBRID',
    badge: 'FEATURE #03',
    quote: 'HIGH-AVAILABILITY ORACLE & CLUSTER INFRASTRUCTURE',
    heroText: 'Oracle Scale.',
    title: 'Oracle & Cloud Optimization',
    subtitle: '3.2x Database Throughput',
    description: 'Database query acceleration and distributed hybrid cloud architecture engineered for zero downtime.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    accentGradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 5,
    tag: 'ZERO-TRUST SECURITY',
    badge: 'FEATURE #04',
    quote: 'MILITARY-GRADE COMPLIANCE & THREAT DETECTION',
    heroText: 'Shield AI.',
    title: 'Zero-Trust Governance',
    subtitle: 'ISO 27001 Certified Security',
    description: 'Continuous AI security auditing, automated policy enforcement, and encrypted data vault governance.',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop',
    accentGradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 6,
    tag: 'REAL-TIME ANALYTICS',
    badge: 'FEATURE #05',
    quote: 'STREAM PROCESSING & EXECUTIVE DATA TELEMETRY',
    heroText: 'Telemetry AI.',
    title: 'Stream Data Intelligence',
    subtitle: '50ms Real-Time Metrics',
    description: 'Instant transformation of raw operational sensor streams into actionable executive intelligence dashboards.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    accentGradient: 'from-purple-500 to-pink-600',
  },
];

export const RisingSlideCardsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  // High-performance RAF scroll progress calculation over 500vh pinned track
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

              // Calculate active focused card
              const slideProgress = Math.max(0, (p - 0.20) / 0.80);
              const idx = Math.min(PROJECT_CARDS.length - 1, Math.floor(slideProgress * (PROJECT_CARDS.length - 1)));
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

  // Motion Math:
  // Stage 1 (0.00 -> 0.25): Screen Frozen. Cards 3..6 rise UP from bottom-right offscreen corner into position.
  // Stage 2 (0.25 -> 0.95): Screen Frozen. Entire row slides LEFT seamlessly with NO GAP between cards (gap-0).
  // Stage 3 (0.95 -> 1.00): Scroll release transition to footer.

  const riseProgress = Math.min(1, scrollProgress / 0.25);
  const slideProgress = Math.max(0, Math.min(1, (scrollProgress - 0.25) / 0.70));

  // Horizontal slide distance: total cards - 2 visible cards at 50vw width each
  const totalSlidePercent = slideProgress * (PROJECT_CARDS.length - 2) * 50;

  return (
    /* Outer Pinned Scroll Track (500vh locks/freezes the viewport completely) */
    <div ref={trackRef} className="relative w-full h-[500vh] bg-[#f2f2ef] select-none">
      {/* Sticky Viewport Stage (100vh Full Screen Frozen Container) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        
        {/* Top Minimal Navigation Bar */}
        <div className="relative z-20 w-full px-6 sm:px-12 py-5 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="font-mono text-xs font-bold text-slate-800 tracking-wider uppercase">
              CLYPTUS ENTERPRISE SHOWCASE
            </span>
          </div>

          {/* Slide Progress Indicator */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-500">
              <span className="font-bold text-slate-900">0{activeCardIndex + 1}</span> / 0{PROJECT_CARDS.length}
            </div>
            <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-slate-900 transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 2-Card Full-Screen Split Viewport (Side-by-Side NO GAP Layout) */}
        <div className="relative w-full flex-1 overflow-hidden flex items-center">
          
          {/* Continuous Row Container - NO GAP (space-x-0 / gap-0) */}
          <div 
            className="flex w-full h-full transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(-${totalSlidePercent}vw, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {PROJECT_CARDS.map((card, idx) => {
              // Cards 3+ rise up from bottom-right during Stage 1
              let transformY = 0;
              let riseOpacity = 1.0;

              if (idx >= 2) {
                const stagger = (idx - 2) * 0.15;
                const cardRise = Math.max(0, Math.min(1, (riseProgress - stagger) / (1 - stagger)));
                transformY = (1 - cardRise) * 350; // Rise UP from +350px
                riseOpacity = Math.min(1, cardRise * 2.0);
              }

              return (
                <div
                  key={card.id}
                  style={{
                    transform: `translate3d(0, ${transformY}px, 0)`,
                    opacity: riseOpacity,
                    willChange: 'transform, opacity',
                  }}
                  className="shrink-0 w-[100vw] md:w-[50vw] h-full border-r border-slate-300/80 bg-white relative flex flex-col justify-between overflow-hidden group"
                >
                  {card.isHeroOverview ? (
                    /* CARD 1: Left Hero Overview Panel (Matches Reference Image Left Half) */
                    <div className="w-full h-full p-8 sm:p-14 lg:p-20 flex flex-col justify-between bg-[#f4f3ee] text-slate-900 relative">
                      {/* Subtle Grid Accent */}
                      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-300 text-[11px] font-mono font-bold text-slate-700 uppercase tracking-widest mb-8 shadow-2xs">
                          <Sparkles className="w-3 h-3 text-sky-600" />
                          {card.badge}
                        </div>

                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 uppercase leading-[1.02] max-w-xl">
                          Selected work <br />
                          <span className="text-slate-600">& explorations</span>
                        </h2>
                      </div>

                      <div className="relative z-10 pt-8 border-t border-slate-300/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md leading-relaxed">
                          {card.description}
                        </p>

                        <button className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-900 hover:text-sky-600 uppercase tracking-widest pb-1 border-b-2 border-slate-900 hover:border-sky-600 transition-all shrink-0">
                          VIEW ALL PROJECTS
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* CARDS 2..6: Full-Screen Visual Feature Card (Matches Reference Image Right Half) */
                    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 relative bg-slate-950 text-white overflow-hidden">
                      {/* Background Visual Image with Dark Gradient Overlay */}
                      {card.imageUrl && (
                        <div className="absolute inset-0 z-0 overflow-hidden">
                          <img 
                            src={card.imageUrl} 
                            alt={card.title} 
                            className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-1000 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
                        </div>
                      )}

                      {/* Card Top Row: Badge + Quote */}
                      <div className="relative z-10 flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1 max-w-xs">
                          <span className="text-[10px] font-mono tracking-widest text-slate-300 font-bold uppercase drop-shadow-sm">
                            {card.tag}
                          </span>
                          {card.quote && (
                            <p className="text-xs sm:text-sm font-mono font-semibold text-white/90 uppercase tracking-tight leading-snug drop-shadow-sm max-w-[240px]">
                              "{card.quote}"
                            </p>
                          )}
                        </div>

                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm shrink-0">
                          {card.badge}
                        </span>
                      </div>

                      {/* Card Center: Hero Typography (Matching "Hi, I'm Alex." reference text style) */}
                      {card.heroText && (
                        <div className="relative z-10 my-auto py-6">
                          <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none drop-shadow-md">
                            {card.heroText}
                          </h3>
                        </div>
                      )}

                      {/* Card Bottom Row: Title, Subtitle, Description & Link */}
                      <div className="relative z-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                            {card.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-sm leading-relaxed line-clamp-2">
                            {card.description}
                          </p>
                        </div>

                        <button className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-sky-400 uppercase tracking-widest pb-1 border-b border-white/60 hover:border-sky-400 transition-all shrink-0">
                          EXPLORE PROJECT
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
