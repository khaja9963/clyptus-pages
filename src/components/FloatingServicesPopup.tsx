import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Database, Users, Sparkles, X, ChevronUp, ArrowRight } from 'lucide-react';

interface FloatingServicesPopupProps {
  onSelectService: (serviceName: string) => void;
}

export const FloatingServicesPopup: React.FC<FloatingServicesPopupProps> = ({ onSelectService }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: 'SAP',
      name: 'SAP Services',
      subtitle: 'S/4HANA Consulting & Cloud Migration',
      icon: Database,
      badge: 'ENTERPRISE',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      id: 'IT Recruiting',
      name: 'IT Recruiting',
      subtitle: 'Talent Acquisition & Staffing',
      icon: Users,
      badge: 'TALENT',
      color: 'text-orange-600 bg-orange-50 border-orange-200',
    },
    {
      id: 'AI',
      route: '/ai-services',
      name: 'AI & Data Analytics',
      subtitle: 'Analytics, Intelligent Automation & S/4HANA AI',
      icon: Sparkles,
      badge: 'NEXT-GEN',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      highlights: [
        'Data Science & Analytics',
        'Intelligent Process Automation',
        'AI Inside SAP S/4HANA',
      ],
    },
  ];

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start select-none"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-72 sm:w-80 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_20px_50px_rgba(37,99,235,0.18)] overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-slate-100 mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-500 to-orange-500 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-slate-800 uppercase font-extrabold">
                  CORE CAPABILITIES
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {services.map((srv) => {
                const IconComp = srv.icon;
                return (
                  <button
                    key={srv.id}
                    onClick={() => {
                      onSelectService(srv.id);
                      setIsOpen(false);
                    }}
                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all text-left w-full border border-transparent hover:border-slate-200/70"
                  >
                    <div
                      className={`p-2.5 rounded-xl ${srv.color} border group-hover:scale-110 transition-transform shadow-xs shrink-0 mt-0.5`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {srv.name}
                        </span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {srv.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-tight mb-1">
                        {srv.subtitle}
                      </p>

                      {srv.highlights && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {srv.highlights.map((item, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200/60"
                            >
                              • {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button (Clyptus Logo Blue & Orange Gradient) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 text-white font-extrabold text-xs shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_35px_rgba(249,115,22,0.4)] border border-white/20 transition-all group"
      >
        <div className="p-1 rounded-md bg-white/20 backdrop-blur-xs text-white">
          <LayoutGrid className="w-3.5 h-3.5" />
        </div>
        <span className="tracking-wide">Core Capabilities</span>
        <ChevronUp
          className={`w-3.5 h-3.5 text-white/80 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </motion.button>
    </div>
  );
};
