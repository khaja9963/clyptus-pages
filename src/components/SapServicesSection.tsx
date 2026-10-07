import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Compass,
  Layers,
  RefreshCw,
  Code,
  Cloud,
  ShieldCheck,
  ArrowRight,
  Factory,
  Zap,
  Briefcase,
  ChevronDown,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { Magnetic } from './Magnetic';
import { DigiLabSapEngine } from './DigiLabSapEngine';
import { SpotlightCard } from './SpotlightCard';

interface SapServicesSectionProps {
  onContactClick: () => void;
}

export const SapServicesSection: React.FC<SapServicesSectionProps> = ({ onContactClick }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // 6 End-to-End SAP S/4HANA Services with explicit accent colors
  const sapServices = [
    {
      num: '01',
      name: 'S/4HANA Roadmap & Strategy',
      desc: 'Assess the current landscape, build the business case and sequence the move.',
      icon: Compass,
      color: 'from-orange-500 to-amber-500',
      accentHex: '#EA580C',
    },
    {
      num: '02',
      name: 'S/4HANA Implementation',
      desc: 'Greenfield implementation across core finance, logistics and supply chain processes.',
      icon: Layers,
      color: 'from-sky-500 to-blue-600',
      accentHex: '#2563EB',
    },
    {
      num: '03',
      name: 'S/4HANA Conversion',
      desc: 'Brownfield conversion from ECC, including readiness checks and custom-code remediation.',
      icon: RefreshCw,
      color: 'from-emerald-500 to-teal-600',
      accentHex: '#10B981',
    },
    {
      num: '04',
      name: 'S/4HANA Development',
      desc: 'ABAP and Fiori development, extensions and custom reports on the new stack.',
      icon: Code,
      color: 'from-purple-500 to-indigo-600',
      accentHex: '#7C3AED',
    },
    {
      num: '05',
      name: 'RISE with SAP',
      desc: 'Advising on the cloud move SAP packages as RISE, and delivering the migration behind it.',
      icon: Cloud,
      color: 'from-sky-600 to-indigo-600',
      accentHex: '#0284C7',
    },
    {
      num: '06',
      name: 'Application Support (AMS)',
      desc: 'Post go-live support: incidents, enhancements and release updates.',
      icon: ShieldCheck,
      color: 'from-orange-600 to-red-600',
      accentHex: '#F97316',
    },
  ];

  // Selected SAP & Analytics Engagements
  const sapProjects = [
    {
      id: 1,
      name: 'Hume Cement',
      location: 'Malaysia',
      industry: 'Manufacturing',
      description:
        'SAP migration delivered close to completion in record time, with a joint project-manager and technical-lead team supported by senior consultants.',
      accentHex: '#10B981',
    },
    {
      id: 2,
      name: 'Sapura Energy Berhad',
      location: 'Malaysia',
      industry: 'Energy services',
      description:
        'High-volume ERP data was hard to analyse. Clyptus assessed the need, recommended Zoho Analytics and delivered dashboards with live filtering.',
      accentHex: '#EA580C',
    },
    {
      id: 3,
      name: 'SAP Implementation',
      location: 'Global',
      industry: 'Client name withheld',
      description:
        'Full SAP implementation delivered successfully; the client singled out project communication and attention to detail.',
      accentHex: '#2563EB',
    },
  ];

  // Industries We Support
  const industries = [
    {
      name: 'Manufacturing & Building Materials',
      icon: Factory,
      desc: 'Streamlined supply chain, plant maintenance, and real-time inventory management.',
      accentHex: '#2563EB',
    },
    {
      name: 'Energy & Oil & Gas Services',
      icon: Zap,
      desc: 'Complex asset tracking, high-volume operational analytics, and resource scheduling.',
      accentHex: '#EA580C',
    },
    {
      name: 'Professional & Management Consulting',
      icon: Briefcase,
      desc: 'Project accounting, talent allocation, and integrated financial reporting.',
      accentHex: '#7C3AED',
    },
  ];

  // FAQ Accordion Data
  const faqs = [
    {
      question: 'Is Clyptus an SAP partner?',
      answer:
        "Yes. Clyptus is a Silver SAP partner, and we align our delivery approach to SAP's current product and release roadmap on every implementation, conversion and support engagement.",
    },
    {
      question: 'Can you move us from SAP ECC to S/4HANA?',
      answer:
        'Yes. We handle brownfield conversions from ECC as well as greenfield S/4HANA implementations, starting with a readiness assessment and a roadmap so you know the scope before you commit.',
    },
    {
      question: 'What is RISE with SAP, and do you support it?',
      answer:
        "RISE with SAP is SAP's packaged route to running S/4HANA in the cloud. We advise on whether it fits your landscape and deliver the migration and process change that follow.",
    },
    {
      question: 'Do you support the system after go-live?',
      answer:
        'Yes. We provide application management and support covering incidents, enhancements and release updates, under a response model agreed with you up front.',
    },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-900 select-none overflow-hidden">
      {/* ================= 3-STAGE DIGILAB SCROLLYTELLING ENGINE ================= */}
      <DigiLabSapEngine onContactClick={onContactClick} />

      {/* ================= 6 END-TO-END SAP S/4HANA SERVICES ================= */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-sky-700 font-bold uppercase shadow-sm">
            <Database className="w-3.5 h-3.5 text-orange-500" />
            ENTERPRISE CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            End-to-End SAP S/4HANA Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl font-medium">
            Tailored engineering & advisory to modernize your enterprise resource planning stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sapServices.map((service, idx) => {
            const IconComponent = service.icon;

            return (
              <SpotlightCard key={service.num} accentColor={service.accentHex} delay={idx * 0.12}>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {service.num}
                    </span>

                    <div
                      className={`p-3 rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium mb-6">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-orange-500 transition-colors">
                  <span>Explore Service</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* ================= SELECTED PROJECTS ================= */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-sky-700 font-bold uppercase shadow-sm">
            PROVEN TRACK RECORD
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Selected SAP & Analytics Engagements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sapProjects.map((proj, idx) => (
            <SpotlightCard key={proj.id} accentColor={proj.accentHex} delay={idx * 0.15}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-extrabold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                    {proj.industry}
                  </span>
                  <span className="text-xs font-bold text-slate-600">{proj.location}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">{proj.name}</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Engagement</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ================= INDUSTRIES WE SUPPORT ================= */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center flex flex-col items-center gap-2">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Industries We Support
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-lg">
              Tailored SAP domain expertise across key vertical sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industries.map((ind, idx) => {
              const IndIcon = ind.icon;
              return (
                <SpotlightCard key={ind.name} accentColor={ind.accentHex} delay={idx * 0.15}>
                  <div className="p-3 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 w-fit mb-3">
                    <IndIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{ind.name}</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {ind.desc}
                  </p>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FAQ ACCORDION ================= */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-4xl mx-auto">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-sky-700 font-bold uppercase shadow-sm">
            GOT QUESTIONS?
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-l-4 border-l-blue-600 border-sky-300 shadow-[0_10px_30px_rgba(37,99,235,0.12)]'
                    : 'border-slate-200/90 shadow-xs'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-base hover:text-sky-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-sky-400 text-xs font-mono font-bold uppercase backdrop-blur-md">
            <Building className="w-3.5 h-3.5" />
            START YOUR SAP JOURNEY
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to move forward with SAP?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
            Talk to the Clyptus SAP team about your roadmap, implementation, conversion or support
            requirements.
          </p>

          <Magnetic strength={0.12}>
            <button
              onClick={onContactClick}
              className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 text-slate-950 font-black text-sm shadow-xl transition-all hover:shadow-orange-500/20"
            >
              <span>Get SAP Consultation →</span>
            </button>
          </Magnetic>
        </div>
      </section>
    </div>
  );
};
