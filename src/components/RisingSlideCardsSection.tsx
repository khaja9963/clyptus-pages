import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';

interface ProjectCardItem {
  id: number;
  isHeroOverview?: boolean;
  category: string;
  badge: string;
  quote?: string;
  heroText?: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  darkCard?: boolean;
}

const PROJECT_CARDS: ProjectCardItem[] = [
  {
    id: 1,
    isHeroOverview: true,
    category: 'CLYPTUS PORTFOLIO',
    badge: 'SELECTED WORK',
    title: 'Selected work & explorations',
    subtitle: 'ENGINEERED FOR ENTERPRISE SPEED',
    description: 'Transforming legacy operations into high-velocity, autonomous AI workflows and resilient multi-cloud architectures.',
  },
  {
    id: 2,
    category: 'AI DIGITAL WORKERS',
    badge: 'FEATURE #01',
    quote: 'BOOST YOUR WORKFORCE WITH AI DIGITAL WORKERS',
    heroText: "Hi, I'm Alex.",
    title: 'MyWorker AI',
    subtitle: 'Autonomous Workforce Scaling',
    description: 'AI platform simplifying hiring, management, and workforce scaling.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    category: 'AUDIO & MEDIA AI',
    badge: 'FEATURE #02',
    quote: 'Pulse Studio®',
    heroText: 'An Independent Music 🎵 Studio Shaped by Sound 🪩, Built to Move Culture.',
    title: 'Pulse Studio',
    subtitle: 'Motion-Led Sound Architecture',
    description: 'A motion-led studio website showcasing artists, projects, and sound culture.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    darkCard: true,
  },
  {
    id: 4,
    category: 'ARCHITECTURE & SPATIAL',
    badge: 'FEATURE #03',
    quote: 'LIVE LIFE IN LUXURY.',
    heroText: 'Live Life in Luxury.',
    title: 'LoftLoom Architecture',
    subtitle: 'Bespoke Spatial Design',
    description: 'High-end architectural design studio creating bespoke residential spaces.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    category: 'MULTI-CLOUD HYBRID',
    badge: 'FEATURE #04',
    quote: 'HIGH-AVAILABILITY CLUSTER INFRASTRUCTURE',
    heroText: '3.2x Throughput.',
    title: 'Oracle Cloud Optimizer',
    subtitle: 'Database Query Acceleration',
    description: 'Enterprise database acceleration engine with zero downtime replication.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    category: 'ZERO-TRUST SECURITY',
    badge: 'FEATURE #05',
    quote: 'MILITARY-GRADE COMPLIANCE & GOVERNANCE',
    heroText: 'ISO 27001 Ready.',
    title: 'Shield AI Governance',
    subtitle: 'Continuous Threat Auditing',
    description: 'Military-grade encryption and automated policy auditing for enterprise clusters.',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop',
  },
];

export const RisingSlideCardsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  // RAF sampling of scroll track progress over 500vh pinned track
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

              // Update active focal index
              const idx = Math.min(PROJECT_CARDS.length - 1, Math.floor(p * (PROJECT_CARDS.length - 1)));
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

  // Total horizontal scroll distance calculation:
  // Card 1 (Left header panel): 420px
  // Card 2..6: 620px each + 32px gap
  // Pinned viewport track locks screen while cards slide left
  const maxSlidePx = 4 * 652; // distance to slide 4 cards left
  const currentSlidePx = scrollProgress * maxSlidePx;

  return (
    /* Outer Pinned Scroll Track (500vh locks the viewport completely) */
    <div ref={trackRef} className="relative w-full h-[500vh] bg-[#eef0f2] select-none">
      {/* Sticky Viewport Stage (100vh Full Screen Frozen Container) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-6 px-4 sm:px-10">
        
        {/* Minimal Header Controls Bar */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="font-mono text-xs font-bold text-slate-800 tracking-wider uppercase">
              CLYPTUS WORK & EXPLORATIONS
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white/80 border border-slate-300/80 px-4 py-1.5 rounded-full backdrop-blur-md shadow-2xs font-mono text-xs text-slate-600">
            <span className="font-bold text-slate-900">0{activeCardIndex + 1}</span> / 0{PROJECT_CARDS.length}
            <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden ml-1">
              <div 
                className="h-full bg-slate-900 transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Viewport Card Rail Container */}
        <div className="relative w-full flex-1 flex items-center overflow-hidden z-10">
          <div 
            className="flex gap-8 items-center transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(-${currentSlidePx}px, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {PROJECT_CARDS.map((card, idx) => {
              // Calculate dynamic rise-up offset from bottom-right as card comes into view!
              // Card 1 & Card 2 start already in alignment on initial screen load (0% scroll)
              // Card 3+ starts offset down (+180px) and rises UP as scroll brings it near focal right view!

              let cardRiseY = 0;
              let cardScale = 1.0;
              let cardOpacity = 1.0;

              if (idx >= 2) {
                // Card 3+ rise progress calculation based on scroll progress
                const cardEntryStart = (idx - 2) * 0.22;
                const cardEntryEnd = cardEntryStart + 0.22;

                if (scrollProgress < cardEntryStart) {
                  // Not yet entered: peeked at bottom-right corner
                  cardRiseY = 180;
                  cardScale = 0.92;
                  cardOpacity = 0.55;
                } else if (scrollProgress >= cardEntryStart && scrollProgress <= cardEntryEnd) {
                  // Rising UP phase: transition Y 180px -> 0px
                  const riseRatio = (scrollProgress - cardEntryStart) / 0.22;
                  cardRiseY = (1 - riseRatio) * 180;
                  cardScale = 0.92 + 0.08 * riseRatio;
                  cardOpacity = 0.55 + 0.45 * riseRatio;
                } else {
                  // Fully risen and aligned
                  cardRiseY = 0;
                  cardScale = 1.0;
                  cardOpacity = 1.0;
                }
              }

              return (
                <div
                  key={card.id}
                  style={{
                    transform: `translate3d(0, ${cardRiseY}px, 0) scale(${cardScale})`,
                    opacity: cardOpacity,
                    willChange: 'transform, opacity',
                  }}
                  className="shrink-0 transition-transform duration-100 ease-out"
                >
                  {card.isHeroOverview ? (
                    /* CARD 1: Left Overview Title Card (Matches Reference Image Left Side) */
                    <div className="w-[320px] sm:w-[400px] h-[520px] sm:h-[580px] flex flex-col justify-between p-8 sm:p-12 text-slate-900 bg-[#eef0f2] rounded-3xl border border-transparent">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-300 text-[11px] font-mono font-bold text-slate-700 uppercase tracking-widest mb-10 shadow-2xs">
                          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                          {card.badge}
                        </div>

                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-slate-900 font-sans leading-[1.08] mb-6">
                          Selected work <br />
                          <span className="text-slate-500 font-normal">& explorations</span>
                        </h2>
                      </div>

                      <div className="pt-6 border-t border-slate-300/80 flex flex-col gap-4">
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                          {card.description}
                        </p>

                        <button className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-900 hover:text-sky-600 uppercase tracking-widest pb-1 border-b border-slate-900 hover:border-sky-600 transition-all self-start">
                          VIEW ALL PROJECTS
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* CARDS 2..6: Project Feature Card (Matches Reference Image Cards 2 & 3) */
                    <div className="w-[320px] sm:w-[540px] lg:w-[620px] h-[520px] sm:h-[580px] bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group">
                      
                      {/* Inner Image Container with Text Overlay */}
                      <div className={`relative w-full h-[340px] sm:h-[390px] rounded-2xl overflow-hidden ${card.darkCard ? 'bg-slate-950' : 'bg-slate-900'}`}>
                        {card.imageUrl && (
                          <img 
                            src={card.imageUrl} 
                            alt={card.title}
                            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                        {/* Top Quote Tagline */}
                        {card.quote && (
                          <div className="absolute top-5 left-5 right-5 z-10 flex items-start justify-between">
                            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-white/90 uppercase max-w-[260px] drop-shadow-sm leading-snug">
                              {card.quote}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/20 backdrop-blur-md text-white border border-white/30 shrink-0">
                              {card.badge}
                            </span>
                          </div>
                        )}

                        {/* Center Hero Overlay Text (e.g. "Hi, I'm Alex." or "Pulse Studio") */}
                        {card.heroText && (
                          <div className="absolute bottom-6 left-6 right-6 z-10">
                            <h3 className="text-3xl sm:text-5xl font-medium text-white tracking-tight leading-tight drop-shadow-md font-sans">
                              {card.heroText}
                            </h3>
                          </div>
                        )}
                      </div>

                      {/* Card Details Footer Row (Below Image) */}
                      <div className="pt-4 flex items-end justify-between gap-4">
                        <div className="flex flex-col gap-1 max-w-md">
                          <h4 className="text-xl sm:text-2xl font-medium text-slate-900 tracking-tight font-sans">
                            {card.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed line-clamp-1">
                            {card.description}
                          </p>
                        </div>

                        <button className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 hover:text-sky-600 uppercase tracking-widest pb-0.5 border-b border-slate-400 hover:border-sky-600 transition-all shrink-0">
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
