import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Cpu,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface DigiLabAiEngineProps {
  onContactClick: () => void;
}

export const DigiLabAiEngine: React.FC<DigiLabAiEngineProps> = ({ onContactClick }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // The 3 Core AI Pillars
  const pillars = [
    {
      id: 1,
      num: '01',
      title: 'Data Science & Analytics',
      subtitle: 'ERP & Operational Data Dashboards',
      desc: 'Dashboards and predictive models built on ERP and operational data, so leadership can see the business without waiting for a report.',
      evidence: 'Proven Reference: Delivered analytics dashboards for Sapura Energy Berhad.',
      color: 'from-blue-600 to-sky-500',
      badge: 'PREDICTIVE ANALYTICS',
      icon: BarChart3,
      accentColor: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      id: 2,
      num: '02',
      title: 'Intelligent Process Automation',
      subtitle: 'ERP Workflow & Document Automation',
      desc: 'Automating the repetitive steps around ERP — document handling, master-data checks, approvals and reconciliations.',
      evidence: 'Delivery Basis: Built on system integration and custom development capabilities.',
      color: 'from-orange-500 to-amber-500',
      badge: 'WORKFLOW AUTOMATION',
      icon: Cpu,
      accentColor: 'text-orange-600 bg-orange-50 border-orange-200',
    },
    {
      id: 3,
      num: '03',
      title: 'AI inside SAP S/4HANA',
      subtitle: 'Embedded Machine Learning & Multi-Model Analytics',
      desc: 'Putting the machine-learning and advanced analytics already built into S/4HANA to work on your processes.',
      evidence: 'Delivery Basis: Embedded machine learning and multi-model analytics in S/4HANA.',
      color: 'from-purple-600 to-indigo-600',
      badge: 'S/4HANA NATIVE AI',
      icon: Sparkles,
      accentColor: 'text-purple-600 bg-purple-50 border-purple-200',
    },
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % pillars.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + pillars.length) % pillars.length);
  };

  const currentPillar = pillars[activeSlide];
  const IconComponent = currentPillar.icon;

  return (
    <div className="w-full bg-slate-50 text-slate-900 select-none py-16 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col items-center">
        
        {/* HERO HEADLINE BLOCK */}
        <div className="w-full max-w-3xl text-center flex flex-col items-center gap-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border border-slate-200 bg-white shadow-xs text-slate-700">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="uppercase tracking-wider">AI & DATA ANALYTICS CONSULTING SERVICES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] text-slate-900">
            AI & Data Analytics{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              Consulting Services
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl leading-relaxed">
            Clyptus builds AI solutions for business: analytics, automation and AI-powered tools. Talk to our Hyderabad team about your use case.
          </p>

          <div className="pt-2">
            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>Talk to Our Hyderabad AI Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 CORE PILLARS CLEAN SLIDESHOW */}
        <div className="w-full max-w-4xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col gap-6 relative">
          
          {/* Slideshow Navigation Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                PILLAR 0{currentPillar.id} / 03
              </span>
              <span className={`text-xs font-mono font-extrabold px-3 py-1 rounded-full border ${currentPillar.accentColor}`}>
                {currentPillar.badge}
              </span>
            </div>

            {/* Slide Next/Prev Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                title="Previous Pillar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                title="Next Pillar"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Slide Card Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPillar.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 py-2"
            >
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${currentPillar.color} text-white shadow-md`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    {currentPillar.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                    {currentPillar.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mt-2">
                {currentPillar.desc}
              </p>

              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  {currentPillar.evidence}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100">
            {pillars.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === activeSlide ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>

        </div>

        {/* 3 PILLARS SUMMARY GRID (STATIC QUICK VIEW) */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {pillars.map((p, idx) => {
            const IconComp = p.icon;
            const isSelected = idx === activeSlide;

            return (
              <button
                key={p.id}
                onClick={() => setActiveSlide(idx)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-400/30'
                    : 'bg-white/70 border-slate-200/80 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`p-1.5 rounded-lg bg-gradient-to-r ${p.color} text-white`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-slate-900">{p.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-snug line-clamp-2">
                  {p.subtitle}
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
