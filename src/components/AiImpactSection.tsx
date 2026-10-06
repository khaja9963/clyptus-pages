import React, { useEffect, useRef, useState } from 'react';

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

  // Stage 1: "AI IS CHANGING HOW WE WORK." (progress 0.0 -> 0.46)
  const stage1Scale = 1.0 + Math.pow(Math.min(1, progress / 0.45), 1.2) * 0.6;
  const stage1Opacity = progress < 0.32 
    ? 1.0 
    : progress < 0.46 
      ? Math.max(0, 1.0 - (progress - 0.32) / 0.14) 
      : 0.0;
  const stage1Blur = progress > 0.32 ? (progress - 0.32) * 12 : 0;

  // Stage 2: "NO DEMOS. NO DECKS. BUILT FOR REAL WORK." (progress 0.54 -> 1.0)
  const stage2Opacity = progress < 0.54 
    ? 0.0 
    : progress < 0.70 
      ? (progress - 0.54) / 0.16 
      : progress < 0.92 
        ? 1.0 
        : Math.max(0, 1.0 - (progress - 0.92) / 0.08);
  
  const stage2Scale = 0.95 + (Math.max(0, progress - 0.54) / 0.46) * 0.12;

  // Floating network labels
  const labels = [
    { text: 'AUTOMATION', pos: 'top-20 left-12 md:left-24' },
    { text: 'INTELLIGENCE', pos: 'top-32 right-12 md:right-28' },
    { text: 'WORKFLOWS', pos: 'bottom-32 left-16 md:left-36' },
    { text: 'DECISION MAKING', pos: 'bottom-24 right-16 md:right-32' },
    { text: 'GENERATIVE AI', pos: 'bottom-12 left-1/2 -translate-x-1/2' },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[800vh] bg-[#f4f3ef]">
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

        {/* STAGE 1: Scroll-Driven Zooming Typography with Giggle/Jiggle Effect ("AI IS CHANGING HOW WE WORK.") */}
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
            <div className="flex flex-col items-center justify-center leading-[0.9] tracking-tight uppercase font-black text-slate-950 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]">
              {/* Line 1: AI IS */}
              <div className="text-slate-950 font-black">
                <GiggleText text="AI IS" baseDelay={0} />
              </div>

              {/* Line 2: CHANGING (Electric Royal Blue with Giggle Effect) */}
              <div className="font-black text-[#2563eb] my-1">
                <GiggleText text="CHANGING" baseDelay={0.4} />
              </div>

              {/* Line 3: HOW WE */}
              <div className="text-slate-950 font-black">
                <GiggleText text="HOW WE" baseDelay={0.8} />
              </div>

              {/* Line 4: WORK. */}
              <div className="text-slate-950 font-black">
                <GiggleText text="WORK." baseDelay={1.2} />
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: Second Hero Typography ("NO DEMOS. NO DECKS. BUILT FOR REAL WORK.") */}
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
            <div className="flex flex-col items-center justify-center leading-[0.9] tracking-tight uppercase font-black text-slate-950 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]">
              {/* Line 1: BUILT FOR */}
              <div className="text-slate-950 font-black">
                <GiggleText text="BUILT FOR" baseDelay={0.2} />
              </div>

              {/* Line 2: REAL WORK. */}
              <div className="font-black my-1">
                <GiggleText text="REAL " baseDelay={0.6} className="text-slate-950" />
                <GiggleText text="WORK." baseDelay={1.0} className="text-[#2563eb]" />
              </div>
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
