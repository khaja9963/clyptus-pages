import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCard {
  id: number;
  type: 'text' | 'photo';
  category: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  linkText: string;
  badge?: string;
}

const PORTFOLIO_CARDS: ProjectCard[] = [
  // Pair 1: Text Panel + Photo Panel (CEO)
  {
    id: 1,
    type: 'text',
    category: 'CLYPTUS LEADERSHIP',
    title: 'Meet Our Chief\nExecutive Officer',
    linkText: 'EXECUTIVE LEADERSHIP',
  },
  {
    id: 2,
    type: 'photo',
    category: 'CHIEF EXECUTIVE OFFICER',
    title: 'Vamsi Krishna Are',
    subtitle: 'Vamsi Krishna Are',
    description: 'Chief Executive Officer leading Clyptus Software Solutions towards enterprise AI & cloud innovation.',
    imageUrl: '/ceo_vamsi_krishna.png',
    linkText: 'EXPLORE PROFILE',
    badge: 'CHIEF EXECUTIVE OFFICER • CLYPTUS',
  },

  // Pair 2: Text Panel + Photo Panel (Manager)
  {
    id: 3,
    type: 'text',
    category: 'CLYPTUS MANAGEMENT',
    title: 'Our\nManager',
    linkText: 'MANAGEMENT TEAM',
  },
  {
    id: 4,
    type: 'photo',
    category: 'OPERATIONS MANAGER',
    title: 'Operations Manager',
    subtitle: 'Operations & Delivery',
    description: 'Leading cross-functional engineering teams to ensure seamless delivery and client satisfaction.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
    linkText: 'EXPLORE PROFILE',
    badge: 'OPERATIONS MANAGER • CLYPTUS',
  },

  // Pair 3: Text Panel + Photo Panel (Project Manager)
  {
    id: 5,
    type: 'text',
    category: 'PROJECT MANAGEMENT',
    title: 'Project\nManager',
    linkText: 'PROJECT LEADERSHIP',
  },
  {
    id: 6,
    type: 'photo',
    category: 'SECURITY SHIELD',
    title: 'Zero-Trust Shield',
    subtitle: 'Encrypted Core.',
    description: 'Continuous compliance tracking, threat detection, and military-grade encryption.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop',
    linkText: 'EXPLORE PROJECT',
    badge: 'ISO 27001 & COMPLIANCE READY',
  },

  // Pair 4: Text Panel + Photo Panel
  {
    id: 7,
    type: 'text',
    category: 'ADAPTIVE ARCHITECTURE',
    title: 'Self-healing\nmicroservices',
    linkText: 'VIEW ARCHITECTURE',
  },
  {
    id: 8,
    type: 'photo',
    category: 'AUTONOMOUS FABRIC',
    title: 'Self-Healing Fabric',
    subtitle: 'Auto-Scaling.',
    description: 'Resilient cloud-native microservice fabrics that auto-scale dynamically under peak global load.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    linkText: 'EXPLORE PROJECT',
    badge: 'AUTONOMOUS AUTO-SCALING CLUSTERS',
  },
];

export const RisingSlideCardsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // RAF sampling of scroll track progress over 550vh pinned viewport track
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

  const totalCards = PORTFOLIO_CARDS.length;
  // Card width in vw for 50/50 equal split (50vw width per card, exactly matching TRIONN reference design)
  const CARD_WIDTH_VW = 50;
  const maxShiftVw = (totalCards - 2) * CARD_WIDTH_VW; 
  const currentShiftVw = scrollProgress * maxShiftVw;

  return (
    /* Outer Pinned Scroll Track (550vh freezes the screen in place while cards rise & slide) */
    <div ref={trackRef} className="relative w-full h-[550vh] bg-[#e9e8e3] select-none font-sans border-t border-slate-300/60">
      {/* Sticky Full-Screen Viewport Container (0px horizontal padding, 50/50 equal 2-card split) */}
      <div className="sticky top-0 w-full h-screen flex overflow-hidden pt-20 sm:pt-24 pb-4">
        
        {/* Horizontal Card Track container with 0 gap */}
        <div className="flex w-full h-full gap-0 flex-nowrap relative">
          {PORTFOLIO_CARDS.map((card, idx) => {
            // Position Math:
            // 50vw width per card for 50/50 equal panel sizes touching side-by-side
            const cardBaseX = idx * CARD_WIDTH_VW; // in vw
            const currentPosX = cardBaseX - currentShiftVw; // in vw

            // 1. Entrance Math: Rise UP from bottom-right (for cards entering from the right)
            let riseY = 0; // in vh
            if (currentPosX > 50) {
              const distanceToViewportRight = currentPosX - 50;
              riseY = Math.min(85, distanceToViewportRight * 1.6);
            }

            // 2. Exit Math: Slide DOWN to bottom-left (for cards exiting past the left edge)
            let exitY = 0; // in vh
            let exitX = 0; // in vw
            if (currentPosX < 0) {
              const distancePastLeftEdge = Math.abs(currentPosX);
              exitY = Math.min(85, distancePastLeftEdge * 1.6); // slides down to bottom
              exitX = -distancePastLeftEdge * 0.4; // slides further left
            }

            const totalX = currentPosX + exitX;
            const totalY = riseY + exitY;

            return (
              <div
                key={card.id}
                style={{
                  transform: `translate3d(${totalX}vw, ${totalY}vh, 0)`,
                  willChange: 'transform',
                }}
                className="absolute top-0 bottom-0 left-0 w-full md:w-1/2 md:min-w-[50vw] h-full shrink-0 flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-r border-slate-300/40 bg-[#e9e8e3] text-slate-900 overflow-hidden group transition-all duration-75 ease-out"
              >
                {card.type === 'text' ? (
                  /* TEXT PANEL (Matches Card 1 Reference Typography & Style) */
                  <div className="w-full h-full flex flex-col justify-between z-10">
                    {/* Top Tagline Badge */}
                    <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-slate-500 font-bold uppercase">
                      <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
                      {card.category}
                    </div>

                    {/* Main Headline (Exact Reference Typography) */}
                    <div className="my-auto py-12">
                      <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal text-[#1a1a1a] tracking-tight leading-[1.02] whitespace-pre-line">
                        {card.title}
                      </h2>
                    </div>

                    {/* Bottom Action Link (Exact Reference Line Button) */}
                    <div className="pt-6 border-t border-slate-300/50 flex items-center justify-between">
                      <button className="inline-flex items-center gap-3 font-mono text-xs sm:text-sm tracking-widest text-slate-800 font-bold uppercase group-hover:text-black transition-colors border-b border-slate-400 pb-1">
                        {card.linkText}
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>

                      <span className="font-mono text-xs text-slate-400">
                        0{card.id} / 0{totalCards}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* PHOTO PANEL (Matches Card 2 Reference Cover Image & Subtitle Style) */
                  <div className="w-full h-full flex flex-col justify-between z-10">
                    {/* Card Top Graphic Frame / Image Cover */}
                    <div className="relative w-full flex-1 rounded-2xl overflow-hidden mb-6 bg-slate-200 shadow-sm border border-slate-300/40">
                      {card.imageUrl ? (
                        <img
                          src={card.imageUrl}
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
                      )}
                      
                      {/* Gradient Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Top Badge inside Image */}
                      {card.badge && (
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest font-bold uppercase bg-white/90 backdrop-blur-md text-slate-900 border border-white/50 shadow-sm">
                            {card.badge}
                          </span>
                        </div>
                      )}

                      {/* Overlay Title inside Image (e.g. "Hi, I'm Alex.") */}
                      {card.subtitle && (
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight drop-shadow-md">
                            {card.subtitle}
                          </h3>
                        </div>
                      )}
                    </div>

                    {/* Bottom Metadata & Link Row (Matches Reference Image) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl sm:text-2xl font-medium text-[#1a1a1a] tracking-tight">
                          {card.title}
                        </h4>

                        <span className="font-mono text-xs text-slate-400">
                          0{card.id} / 0{totalCards}
                        </span>
                      </div>

                      {card.description && (
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4 max-w-md">
                          {card.description}
                        </p>
                      )}

                      <div className="pt-3 border-t border-slate-300/50 flex items-center justify-between">
                        <button className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-slate-800 font-bold uppercase group-hover:text-black transition-colors border-b border-slate-400 pb-1">
                          {card.linkText}
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
