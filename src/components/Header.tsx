import React, { useState, useRef } from 'react';
import { Zap, ArrowRight, Sliders, ChevronDown, Database, Users, Cpu } from 'lucide-react';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onToggleCustomizer: () => void;
  onPlayIntro: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onToggleCustomizer,
  onPlayIntro,
}) => {
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinks = [
    'Home',
    'Services',
    'Projects',
    'Industries',
    'Solutions',
    'Blogs',
    'Contact'
  ];

  const serviceOptions = [
    {
      name: 'SAP',
      desc: 'Enterprise SAP Solutions & S/4HANA Consulting',
      icon: Database,
      badge: 'ENTERPRISE',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      name: 'IT Recruiting',
      desc: 'Top Tech Staff Augmentation & Executive Search',
      icon: Users,
      badge: 'TALENT',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      name: 'AI',
      desc: 'Custom Machine Learning & Generative AI Systems',
      icon: Cpu,
      badge: 'NEXT-GEN',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
  ];

  const handleMouseEnterServices = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeaveServices = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm select-none">
      {/* Main Navbar */}
      <div className="w-full px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              onNavigate('Home');
              onPlayIntro();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black shadow-[0_4px_15px_rgba(2,132,199,0.3)] group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Clyptus<span className="text-sky-600">.</span>
              </span>
            </div>
          </button>
        </div>

        {/* Center Navigation Links (Pill Container) */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activePage === link;
            const isServices = link === 'Services';

            if (isServices) {
              return (
                <div
                  key={link}
                  className="relative"
                  onMouseEnter={handleMouseEnterServices}
                  onMouseLeave={handleMouseLeaveServices}
                >
                  <button
                    onClick={() => {
                      onNavigate('Services');
                      setIsServicesOpen(!isServicesOpen);
                    }}
                    className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isActive || isServicesOpen
                        ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    <span>Services</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-sky-600' : 'text-slate-400'}`} />
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-sky-600" />
                    )}
                  </button>

                  {/* Services Dropdown Menu */}
                  {isServicesOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 p-2 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_40px_rgba(15,23,42,0.15)] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest text-slate-600 uppercase font-bold">OUR SERVICES</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                      </div>

                      <div className="flex flex-col gap-1">
                        {serviceOptions.map((srv) => {
                          const IconComp = srv.icon;
                          return (
                            <button
                              key={srv.name}
                              onClick={() => {
                                onNavigate('Services');
                                setIsServicesOpen(false);
                                alert(`Selected Service: ${srv.name}`);
                              }}
                              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100/90 transition-all text-left w-full"
                            >
                              <div className={`p-2 rounded-lg ${srv.color} border group-hover:scale-110 transition-transform shadow-xs`}>
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                                    {srv.name}
                                  </span>
                                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                    {srv.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5 font-medium">
                                  {srv.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link}
                onClick={() => onNavigate(link)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {link}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-sky-600" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Studio Toggle on mobile/desktop */}
          <button
            onClick={onToggleCustomizer}
            className="p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:text-sky-600 transition-all text-xs font-semibold"
            title="Toggle Studio Controls"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Get Consultation CTA Button */}
          <button
            onClick={() => onNavigate('Contact')}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <span>Get Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>
    </header>
  );
};

