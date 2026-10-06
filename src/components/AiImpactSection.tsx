import React, { useEffect, useRef, useState } from 'react';
import { Layers, Cpu, Zap, Sparkles, ArrowRight } from 'lucide-react';

// Character component that renders individual letters with organic giggle / jiggle animation
const GiggleText: React.FC<{ text: string; baseDelay?: number; className?: string }> = ({
  text,
  baseDelay = 0,
  className = '',
}) => {
  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`}>
      {text.split('').map((char, idx) => {
        if (char === ' ') {
          return <span key={idx} className="w-[0.25em] inline-block">&nbsp;</span>;
        }
        // Staggered giggle animation delay per letter
        const delay = (baseDelay + idx * 0.18) % 4.2;
        return (
          <span
            key={idx}
            className="animate-giggle inline-block hover:scale-125 hover:text-sky-500 transition-transform cursor-pointer"
            style={{
              animationDelay: `${delay}s`,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

interface FeatureCardItem {
  id: number;
  badge: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  gradient: string;
  iconBg: string;
  borderStyle: string;
  icon: React.ElementType;
}

const featureCards: FeatureCardItem[] = [
  {
    id: 1,
    badge: 'ADAPTIVE ARCHITECTURE',
    title: 'Dynamic Micro-Interactions',
    metric: '99.9%',
    metricLabel: 'Fluidity Rate',
    description: 'Next-gen responsive layouts engineered for instant component switching across all device viewports.',
    gradient: 'from-blue-600 via-sky-500 to-indigo-600',
    iconBg: 'bg-blue-50 border-blue-200 text-blue-600',
    borderStyle: 'hover:border-blue-400 hover:shadow-blue-500/15',
    icon: Layers,
  },
  {
    id: 2,
    badge: 'CONTENT STRATEGY ENGINE',
    title: 'Context-Aware AI Personalization',
    metric: '4.8x',
    metricLabel: 'Higher Engagement',
    description: 'Modular content generation systems tailored dynamically to user intent and real-time interaction signals.',
    gradient: 'from-indigo-600 via-purple-600 to-sky-500',
    iconBg: 'bg-indigo-50 border-indigo-200 text-indigo-600',
    borderStyle: 'hover:border-indigo-400 hover:shadow-indigo-500/15',
    icon: Cpu,
  },
  {
    id: 3,
    badge: '60 FPS MOTION PIPELINE',
    title: 'Ultra-Low Latency Canvas',
    metric: '<12ms',
    metricLabel: 'Frame Latency',
    description: 'Silky smooth GPU-accelerated motion systems ensuring continuous immersion and seamless page transitions.',
    gradient: 'from-emerald-500 via-teal-600 to-sky-500',
    iconBg: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    borderStyle: 'hover:border-emerald-400 hover:shadow-emerald-500/15',
    icon: Zap,
  },
];

export const AiImpactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  // RAF scroll progress sampling for zero lag
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
              setProgress(p);
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

  // Neural Constellation Network Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Node particle data
    const numNodes = 50;
    const nodes = Array.from({ length: numNodes }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 3.5 + 2,
      isBlue: Math.random() > 0.6,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw constellation connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Update node position
        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Mouse attraction physics
        const dxMouse = mouseRef.current.x - n1.x;
        const dyMouse = mouseRef.current.y - n1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 200) {
          n1.x += (dxMouse / distMouse) * 0.8;
          n1.y += (dyMouse / distMouse) * 0.8;
        }

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.28;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = n1.isBlue || n2.isBlue 
              ? `rgba(37, 99, 235, ${alpha * 1.6})` 
              : `rgba(71, 85, 105, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw node points
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = n1.isBlue ? 'rgba(37, 99, 235, 0.9)' : 'rgba(51, 65, 85, 0.75)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Stage 1: "SMART IT SERVICES TO ELEVATE YOUR BUSINESS SUCCESS." (progress 0.0 -> 0.32)
  const stage1Scale = 1.0 + Math.pow(Math.min(1, progress / 0.32), 1.2) * 0.5;
  const stage1Opacity = progress < 0.22 
    ? 1.0 
    : progress < 0.32 
      ? Math.max(0, 1.0 - (progress - 0.22) / 0.10) 
      : 0.0;
  const stage1Blur = progress > 0.22 ? (progress - 0.22) * 12 : 0;

  // Stage 2: "NO DEMOS. NO DECKS. ADAPTIVE DESIGN AND CONTENT STRATEGY." (progress 0.32 -> 0.60)
  const stage2Opacity = progress < 0.32 
    ? 0.0 
    : progress < 0.42 
      ? (progress - 0.32) / 0.10 
      : progress < 0.52 
        ? 1.0 
        : Math.max(0, 1.0 - (progress - 0.52) / 0.08);
  
  const stage2Scale = 0.95 + (Math.max(0, progress - 0.32) / 0.28) * 0.10;

  // Stage 3: Feature Cards ("Cards move from bottom right -> UP -> slide LEFT") (progress 0.60 -> 1.00)
  let stage3Opacity = 0;
  let stage3TranslateX = 100; // in vw
  let stage3TranslateY = 60;  // in vh

  if (progress >= 0.58 && progress < 0.75) {
    // PHASE A: Entry from Bottom-Right (Upwards to Center Stage)
    const t = (progress - 0.58) / 0.17;
    stage3Opacity = Math.min(1.0, t * 1.4);
    stage3TranslateX = (1 - t) * 75; // 75vw -> 0vw
    stage3TranslateY = (1 - t) * 55; // 55vh -> 0vh
  } else if (progress >= 0.75 && progress < 0.88) {
    // PHASE B: Fully Visible Focus Hold in Center
    stage3Opacity = 1.0;
    stage3TranslateX = 0;
    stage3TranslateY = 0;
  } else if (progress >= 0.88) {
    // PHASE C: Exit Slide Left off screen
    const t = (progress - 0.88) / 0.12;
    stage3Opacity = Math.max(0, 1.0 - t * 1.2);
    stage3TranslateX = -t * 130; // 0vw -> -130vw (Slide Left)
    stage3TranslateY = 0;
  }

  // Floating network labels
  const labels = [
    { text: 'AUTOMATION', pos: 'top-20 left-12 md:left-24' },
    { text: 'INTELLIGENCE', pos: 'top-32 right-12 md:right-28' },
    { text: 'WORKFLOWS', pos: 'bottom-32 left-16 md:left-36' },
    { text: 'DECISION MAKING', pos: 'bottom-24 right-16 md:right-32' },
    { text: 'GENERATIVE AI', pos: 'bottom-12 left-1/2 -translate-x-1/2' },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[1100vh] bg-[#f4f3ef]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none">
        
        {/* Interactive Neural Canvas Network Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0"
        />

        {/* Floating Feature Labels */}
        {labels.map((lbl, idx) => (
          <div
            key={idx}
            className={`absolute ${lbl.pos} z-10 hidden sm:flex items-center gap-2 font-mono text-[11px] tracking-widest font-bold text-slate-600 uppercase pointer-events-none transition-opacity duration-300`}
            style={{
              opacity: Math.max(0, 1 - progress * 1.8),
            }}
          >
            <span className="w-2 h-2 bg-blue-600 rounded-sm" />
            <span>{lbl.text}</span>
          </div>
        ))}

        {/* STAGE 1: Scroll-Driven Zooming Typography ("SMART IT SERVICES TO ELEVATE YOUR BUSINESS SUCCESS.") */}
        {stage1Opacity > 0 && (
          <div
            className="absolute z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl transition-transform duration-75 ease-out"
            style={{
              transform: `scale3d(${stage1Scale}, ${stage1Scale}, 1)`,
              opacity: stage1Opacity,
              filter: stage1Blur > 0 ? `blur(${stage1Blur}px)` : 'none',
              willChange: 'transform, opacity, filter',
            }}
          >
            <div className="flex flex-col items-center justify-center leading-[0.9] tracking-tight uppercase font-black text-slate-950 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
              {/* Line 1: SMART IT */}
              <div className="text-slate-950 font-black">
                <GiggleText text="SMART IT" baseDelay={0} />
              </div>

              {/* Line 2: SERVICES (Electric Royal Blue with Giggle Effect) */}
              <div className="font-black text-[#2563eb] my-1">
                <GiggleText text="SERVICES" baseDelay={0.3} />
              </div>

              {/* Line 3: TO ELEVATE YOUR */}
              <div className="text-slate-950 font-black">
                <GiggleText text="TO ELEVATE YOUR" baseDelay={0.6} />
              </div>

              {/* Line 4: BUSINESS SUCCESS. */}
              <div className="text-slate-950 font-black">
                <GiggleText text="BUSINESS SUCCESS." baseDelay={0.9} />
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: Second Hero Typography ("NO DEMOS. NO DECKS. ADAPTIVE DESIGN AND CONTENT STRATEGY.") */}
        {stage2Opacity > 0 && (
          <div
            className="absolute z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl transition-transform duration-75 ease-out"
            style={{
              transform: `scale3d(${stage2Scale}, ${stage2Scale}, 1)`,
              opacity: stage2Opacity,
              willChange: 'transform, opacity',
            }}
          >
            {/* Tagline */}
            <div className="font-mono text-xs sm:text-sm tracking-[0.35em] text-slate-500 font-bold uppercase mb-4">
              NO DEMOS. NO DECKS.
            </div>

            {/* Main Headline with Giggle Effect */}
            <div className="flex flex-col items-center justify-center leading-[0.9] tracking-tight uppercase font-black text-slate-950 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
              {/* Line 1: ADAPTIVE DESIGN */}
              <div className="text-slate-950 font-black">
                <GiggleText text="ADAPTIVE DESIGN" baseDelay={0.2} />
              </div>

              {/* Line 2: AND CONTENT STRATEGY. */}
              <div className="font-black my-1">
                <GiggleText text="AND CONTENT " baseDelay={0.6} className="text-slate-950" />
                <GiggleText text="STRATEGY." baseDelay={1.0} className="text-[#2563eb]" />
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: Animation Feature Cards ("Cards move from bottom right -> UP -> slide LEFT") */}
        {stage3Opacity > 0 && (
          <div 
            className="absolute z-20 w-full max-w-6xl px-6 sm:px-10 flex flex-col items-center justify-center transition-transform duration-100 ease-out"
            style={{
              transform: `translate3d(${stage3TranslateX}vw, ${stage3TranslateY}vh, 0)`,
              opacity: stage3Opacity,
              willChange: 'transform, opacity',
            }}
          >
            {/* Stage 3 Section Pill Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-300 text-[11px] font-mono tracking-widest text-slate-800 uppercase font-bold mb-6 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 fill-blue-600/20" />
              ADAPTIVE CAPABILITIES & STRATEGY
            </div>

            {/* 3 Interactive Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
              {featureCards.map((card, idx) => {
                const IconComponent = card.icon;
                
                // Slight staggered transform shift for depth
                const cardStaggerX = (stage3TranslateX !== 0 ? (idx - 1) * 4 : 0);

                return (
                  <div
                    key={card.id}
                    style={{
                      transform: `translate3d(${cardStaggerX}px, 0, 0)`,
                    }}
                    className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_15px_45px_rgba(0,0,0,0.06)] ${card.borderStyle} transition-all duration-300 group`}
                  >
                    {/* Top Row: Icon Badge + Metric */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs ${card.iconBg}`}>
                          <IconComponent className="w-6 h-6 stroke-[1.75]" />
                        </div>

                        {/* Metric Highlight */}
                        <div className="text-right">
                          <div className={`text-2xl sm:text-3xl font-black font-mono bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                            {card.metric}
                          </div>
                          <div className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                            {card.metricLabel}
                          </div>
                        </div>
                      </div>

                      {/* Card Category Badge */}
                      <span className="inline-block text-[10px] font-mono tracking-widest font-bold text-slate-500 uppercase mb-2">
                        {card.badge}
                      </span>

                      {/* Card Title */}
                      <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug uppercase mb-3 group-hover:text-blue-600 transition-colors">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {card.description}
                      </p>
                    </div>

                    {/* Card Footer Link */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      <span>EXPLORE MODULE</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Scroll Hint Pill */}
        <div 
          className="absolute bottom-8 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/10 border border-slate-900/15 text-[11px] font-mono text-slate-700 tracking-wider font-semibold pointer-events-none transition-opacity duration-300"
          style={{
            opacity: Math.max(0, 1 - progress * 2.5),
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span>SCROLL DOWN TO ANIMATE</span>
        </div>
      </div>
    </div>
  );
};
