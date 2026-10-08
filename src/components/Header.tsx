import React from 'react';
import { ArrowRight, Sliders } from 'lucide-react';
import logoImg from '../assets/logo.png';

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
  const navLinks = [
    'Home',
    'SAP',
    'Projects',
    'Industries',
    'Blogs',
    'Contact',
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm select-none">
      {/* Main Navbar */}
      <div className="w-full px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Official Image Logo */}
        <div className="flex items-center">
          <button 
            onClick={() => {
              onNavigate('Home');
              onPlayIntro();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="flex items-center group text-left transition-opacity hover:opacity-95"
          >
            <img
              src={logoImg}
              alt="Clyptus Software Solutions"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </button>
        </div>

        {/* Center Navigation Links (Pill Container) */}
        <nav className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activePage === link;

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
                {link === 'SAP' ? 'SAP & ERP' : link}
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
