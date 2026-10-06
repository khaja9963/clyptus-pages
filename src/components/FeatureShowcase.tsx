import React from 'react';
import { Box, Cpu, Sparkles, Copy, Check, Eye } from 'lucide-react';

interface FeatureShowcaseProps {
  onCopyMainPrompt: () => void;
  copied: boolean;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  onCopyMainPrompt,
  copied,
}) => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-200">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase bg-sky-100 text-sky-700 border border-sky-300">
          ARCHITECTURE & DESIGN SPECS
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How the <span className="text-sky-600">Spiral Slider</span> Moves
        </h2>
        <p className="max-w-2xl text-slate-600 text-sm leading-relaxed">
          Curved panels wound onto a 3D helix that appears to screw along its own track.
          The far side of the spiral remains visible through the gaps with a frosted glass depth effect.
        </p>
      </div>

      {/* 3 Core Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-400 transition-all flex flex-col gap-3 shadow-md group">
          <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
            <Box className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">3D Helical Projection</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cards are mapped dynamically using parametric helical formulas (X = R·sin(θ), Y = Pitch·i, Z = R·cos(θ)). Perspective depth sorting guarantees 60 FPS performance without visual clipping.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 transition-all flex flex-col gap-3 shadow-md group">
          <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">Frosted Glass Depth</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Panels passing behind the central axis receive dynamic backdrop blur filters, lower opacity, and reduced scale—allowing you to see through the spiral gaps with true spatial depth.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 transition-all flex flex-col gap-3 shadow-md group">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">Fluid Physics & Inertia</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Natural momentum drag velocity, mouse wheel winding, keyboard control, and auto-rotation toggle. Target offset lerp smoothing creates zero-lag cinematic motion.
          </p>
        </div>
      </div>

      {/* Copy Master Prompt CTA Banner */}
      <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-left">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>SCROLLTIDE MASTER PROMPT</span>
          </div>
          <h3 className="text-xl font-bold text-white">Want to generate this in your own app?</h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Copy the pre-engineered Scrolltide prompt, paste it into Cursor, Antigravity AI, or Claude, and launch a 3D spiral slider in seconds.
          </p>
        </div>

        <button
          onClick={onCopyMainPrompt}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-black text-sm transition-all shadow-[0_0_25px_rgba(2,132,199,0.4)] whitespace-nowrap"
        >
          {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Prompt Copied!' : 'Copy Scrolltide Prompt'}</span>
        </button>
      </div>
    </section>
  );
};
