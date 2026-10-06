import React from 'react';
import type { SliderCard } from '../data/sliderData';
import { X, Sparkles, Download, Layers, Activity, Code, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CardDetailModalProps {
  card: SliderCard | null;
  onClose: () => void;
  onOpenCodeModal: (card: SliderCard) => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  onClose,
  onOpenCodeModal,
}) => {
  const [liked, setLiked] = React.useState(false);

  if (!card) return null;

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#0284c7', '#6366f1']
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-900 flex flex-col md:flex-row">
        {/* Left Side: Large Media Preview */}
        <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden group">
          <img
            src={card.imageUrl}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-white/90 text-sky-700 border border-sky-300 backdrop-blur-md shadow-sm">
              {card.category}
            </span>
          </div>

          <button
            onClick={handleLike}
            className={`absolute bottom-4 left-4 p-2.5 rounded-full border backdrop-blur-md transition-all shadow-sm ${
              liked 
                ? 'bg-pink-500 text-white border-pink-400 shadow-[0_4px_15px_rgba(236,72,153,0.4)]' 
                : 'bg-white/90 text-slate-700 border-slate-200 hover:text-pink-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Right Side: Details & Metrics */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-sky-600 font-bold uppercase tracking-wider">
                {card.subtitle}
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
              {card.title}
            </h2>

            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              {card.description}
            </p>

            {/* Performance & Spec Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Activity className="w-5 h-5 text-sky-600" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Frame Rate</div>
                  <div className="text-sm font-bold text-slate-900">{card.stats.fps} FPS Smooth</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Layers className="w-5 h-5 text-indigo-600" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Depth Cue</div>
                  <div className="text-sm font-bold text-slate-900">{card.stats.depth}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Complexity</div>
                  <div className="text-sm font-bold text-slate-900">{card.stats.vertices} Poly</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Download className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Downloads</div>
                  <div className="text-sm font-bold text-slate-900">{card.stats.downloads}</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {card.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={() => onOpenCodeModal(card)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs transition-all shadow-[0_4px_15px_rgba(2,132,199,0.3)]"
            >
              <Code className="w-4 h-4" /> Get Prompt & Code
            </button>

            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
