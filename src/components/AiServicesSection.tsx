import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  BarChart3,
  Cpu,
  Database,
  Factory,
  Zap,
  ChevronDown,
  ArrowRight,
  Mail,
  MapPin,
  CheckCircle2,
  Building2,
  Layers,
  HelpCircle,
  Briefcase,
} from 'lucide-react';
import { DigiLabAiEngine } from './DigiLabAiEngine';

interface AiServicesSectionProps {
  onContactClick: () => void;
}

export const AiServicesSection: React.FC<AiServicesSectionProps> = ({ onContactClick }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Set document title & meta tags
  useEffect(() => {
    document.title = 'AI & Data Analytics Consulting Services | Clyptus';
  }, []);

  // Target Industries Section (3 Evidenced Sector Cards)
  const targetIndustries = [
    {
      id: 1,
      title: 'Energy & Oil and Gas Services',
      subtitle: 'High-volume Operational & ERP Analytics',
      desc: 'High-volume operational and ERP data analytics dashboards with live filtering and predictive forecasting.',
      icon: Zap,
      color: 'from-orange-500 to-amber-600',
      tag: 'ENERGY & UTILITIES',
    },
    {
      id: 2,
      title: 'Manufacturing',
      subtitle: 'Production & Supply Chain Intelligence',
      desc: 'Real-time manufacturing insights, inventory optimization, and automated master-data reconciliation workflows.',
      icon: Factory,
      color: 'from-blue-600 to-indigo-600',
      tag: 'INDUSTRIAL MANUFACTURING',
    },
    {
      id: 3,
      title: 'Enterprise SAP Landscapes',
      subtitle: 'Eliminating Data Delays & Manual Reconciliations',
      desc: 'Eliminating reporting bottlenecks, data latency, and labor-intensive manual reconciliation workflows in complex SAP environments.',
      icon: Layers,
      color: 'from-purple-600 to-indigo-600',
      tag: 'SAP & ERP SYSTEMS',
    },
  ];

  // AI FAQ Accordion Items (Verbatim)
  const faqs = [
    {
      question: 'Do you build AI from scratch or use existing platforms?',
      answer:
        'Both. Where a proven analytics or automation platform solves the problem we configure it, because it is faster and cheaper. Where nothing fits, we build.',
    },
    {
      question: 'Can you work with our SAP or ERP data?',
      answer:
        'Yes, and that is usually the starting point. Our consultants know the underlying ERP data model, so the analysis reflects how the business actually runs.',
    },
    {
      question: 'What does a first engagement look like?',
      answer:
        'A short discovery on a single use case with a defined output at the end, so you can judge the value before committing to a larger programme.',
    },
    {
      question: 'How do you handle our data and confidentiality?',
      answer:
        'Work is done under NDA, with access limited to the named project team and data handled according to the terms agreed in the contract.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 select-none flex flex-col items-center">
      
      {/* 1. SCROLLEYTELLING ENGINE (HERO CANVAS + 3 CORE PILLARS PINNED STAGE + TELEMETRY RADAR) */}
      <DigiLabAiEngine onContactClick={onContactClick} />

      {/* 2. TARGET INDUSTRIES SECTION */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-12 bg-white border-y border-slate-200/80 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>DOMAINS OF EXCELLENCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Target Industries
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              We deploy proven analytics and intelligent automation across complex data-intensive sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {targetIndustries.map((ind) => {
              const IconComp = ind.icon;
              return (
                <div
                  key={ind.id}
                  className="group relative p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:bg-white hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3.5 rounded-2xl bg-gradient-to-r ${ind.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 shadow-2xs">
                        {ind.tag}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {ind.title}
                    </h3>

                    <p className="text-xs font-bold text-slate-500 mb-3">
                      {ind.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">
                      {ind.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Explore Sector Solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. AI FAQ ACCORDION SECTION */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-12 bg-slate-50 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          
          <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-bold text-slate-700 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              AI & Analytics FAQ
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Clear answers on implementation timelines, platform integration, and data confidentiality.
            </p>
          </div>

          {/* Accordion List */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xs font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        Q0{index + 1}
                      </span>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. CONTACT & FOOTER BLOCK */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white flex flex-col items-center relative overflow-hidden">
        
        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-600/20 to-orange-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold text-sky-400 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>TALK TO OUR HYDERABAD TEAM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-2xl">
            Interested in Discussing Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-orange-400">AI & Analytics</span> Needs?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl">
            Schedule a short discovery workshop on a single use case to judge value before committing to a larger programme.
          </p>

          {/* Contact Details */}
          <div className="flex flex-wrap items-center justify-center gap-6 py-4">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <Mail className="w-4 h-4 text-orange-400" />
              <a href="mailto:sales@clyptus.com" className="hover:text-white transition-colors">
                sales@clyptus.com
              </a>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Hyderabad, India</span>
            </div>
          </div>

          <button
            onClick={onContactClick}
            className="mt-2 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 text-white font-extrabold text-sm sm:text-base shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.5)] hover:scale-105 transition-all group"
          >
            <span>Talk to Our Hyderabad AI Team</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </section>

    </div>
  );
};
