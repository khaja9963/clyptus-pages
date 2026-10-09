import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  Mail,
  MapPin,
  CheckCircle2,
  Award,
  Lock,
} from 'lucide-react';

export interface CapabilityDetailViewProps {
  capabilityNum: string | null; // '01', '02', ..., '09'
  onClose: () => void;
  onContactClick?: () => void;
}

export const CapabilityDetailView: React.FC<CapabilityDetailViewProps> = ({
  capabilityNum,
  onClose,
  onContactClick,
}) => {
  if (!capabilityNum) return null;

  const renderSharedCTA = () => (
    <div className="mt-16 pt-10 border-t-2 border-slate-900">
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-orange-600 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h4 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready to Plan, Move, or Optimize Your SAP Practice?
          </h4>
          <p className="text-slate-100 text-sm font-medium">
            Speak directly with our Hyderabad SAP consulting team about your landscape.
          </p>
        </div>
        <button
          onClick={() => {
            onClose();
            if (onContactClick) onContactClick();
          }}
          className="px-7 py-3.5 rounded-full bg-white text-slate-900 font-black text-sm shadow-md hover:bg-slate-100 transition-all shrink-0"
        >
          Talk to our SAP experts
        </button>
      </div>

      {/* Shared Address Footer */}
      <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-slate-600 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <span className="font-extrabold text-slate-900 text-sm block">Corporate Head Office</span>
          <p className="flex items-start gap-2 leading-relaxed text-slate-700">
            <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <span>12A01A, 13th Floor, Manjeera Trinity Corporate, JNTU-Hitech City Road, Kukatpally, Hyderabad, Telangana 500072</span>
          </p>
        </div>
        <div className="space-y-1">
          <span className="font-extrabold text-slate-900 text-sm block">Direct Contact</span>
          <p className="flex items-center gap-2 font-semibold text-slate-800">
            <Mail className="w-4 h-4 text-blue-600 shrink-0" />
            <span>contact@clyptus.com</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-white overflow-y-auto w-full min-h-screen flex flex-col font-sans text-slate-900"
      >
        {/* Sticky Top Document Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-extrabold text-xs transition-all border border-slate-200 group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to SAP Capabilities</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 pl-4 font-mono text-xs">
              <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 font-extrabold">
                CAPABILITY {capabilityNum}
              </span>
              <span className="text-slate-400 font-medium">•</span>
              <span className="text-slate-500 font-bold uppercase">
                Clyptus Enterprise Specification
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                if (onContactClick) onContactClick();
              }}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-all shadow-xs"
            >
              Talk to SAP Experts
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Page Document Area (Full-bleed white document canvas) */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
          <div className="space-y-12">
            
            {/* ================= 01. SAP S/4HANA ================= */}
            {capabilityNum === '01' && (
              <div className="space-y-10">
                {/* Document Title Header */}
                <div className="border-b-2 border-slate-900 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded bg-blue-50 text-blue-700 font-mono text-xs font-black">
                      SILVER SAP PARTNER
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      /sap-services/s4hana/
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                    SAP S/4HANA Implementation, Conversion and Support
                  </h1>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                    Clyptus helps businesses plan, move to and run SAP S/4HANA. As a Silver SAP partner, we cover the whole journey: roadmap, implementation, conversion from ECC, development, and support after go-live.
                  </p>
                </div>

                {/* What We Do - Editorial List (NO CARDS) */}
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 uppercase font-mono tracking-wider">
                      What We Do
                    </h3>
                    <span className="text-xs font-mono text-slate-500 font-bold">
                      Core S/4HANA Service Catalog
                    </span>
                  </div>

                  <div className="divide-y divide-slate-200">
                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div className="sm:w-1/3">
                        <h4 className="font-extrabold text-slate-900 text-base">S/4HANA roadmap & strategy</h4>
                      </div>
                      <div className="sm:w-2/3">
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                          Assess the current landscape, build the business case and sequence the move.
                        </p>
                      </div>
                    </div>

                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div className="sm:w-1/3">
                        <h4 className="font-extrabold text-slate-900 text-base">S/4HANA implementation</h4>
                      </div>
                      <div className="sm:w-2/3">
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                          Greenfield implementation across core finance, logistics and supply chain processes.
                        </p>
                      </div>
                    </div>

                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div className="sm:w-1/3">
                        <h4 className="font-extrabold text-slate-900 text-base">S/4HANA conversion</h4>
                      </div>
                      <div className="sm:w-2/3">
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                          Brownfield conversion from ECC, including readiness checks and custom-code remediation.
                        </p>
                      </div>
                    </div>

                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div className="sm:w-1/3">
                        <h4 className="font-extrabold text-slate-900 text-base">S/4HANA development</h4>
                      </div>
                      <div className="sm:w-2/3">
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                          ABAP and Fiori development, extensions and custom reports on the new stack.
                        </p>
                      </div>
                    </div>

                    <div id="rise" className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div className="sm:w-1/3 flex items-center gap-2">
                        <h4 className="font-extrabold text-blue-900 text-base">RISE with SAP</h4>
                        <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">#rise</span>
                      </div>
                      <div className="sm:w-2/3">
                        <p className="text-sm text-blue-950 font-medium leading-relaxed">
                          Advising on the cloud move that SAP packages as RISE, and delivering the migration behind it.
                        </p>
                      </div>
                    </div>

                    <div id="support" className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div className="sm:w-1/3 flex items-center gap-2">
                        <h4 className="font-extrabold text-orange-900 text-base">Application support</h4>
                        <span className="text-[10px] font-mono font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">#support</span>
                      </div>
                      <div className="sm:w-2/3">
                        <p className="text-sm text-orange-950 font-medium leading-relaxed">
                          Post go-live support: incidents, enhancements and release updates, under a response model agreed with you up front.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* How an S/4HANA Programme Runs - Timeline List (NO CARDS) */}
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-black text-slate-900 uppercase font-mono tracking-wider">
                      How an S/4HANA programme runs
                    </h3>
                  </div>

                  <div className="space-y-6 pl-2 border-l-2 border-blue-600 ml-2">
                    {[
                      { num: '01', title: 'Review the current ERP', desc: 'Map siloed or legacy systems.' },
                      { num: '02', title: 'Transformation roadmap', desc: 'Strategy, assessment and plan.' },
                      { num: '03', title: 'Process reengineering', desc: 'Optimize and standardize the processes.' },
                      { num: '04', title: 'Migration and integration', desc: 'Migrate to the new platform and integrate it.' },
                      { num: '05', title: 'Run and improve', desc: 'Support, then scale on the new platform.' },
                    ].map((step) => (
                      <div key={step.num} className="pl-6 relative">
                        <span className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-blue-600 text-white font-mono text-xs font-black flex items-center justify-center ring-4 ring-white">
                          {step.num}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 mb-1">{step.title}</h4>
                        <p className="text-sm text-slate-600 font-medium">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Industries */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-black text-slate-900 uppercase font-mono tracking-wider border-b border-slate-200 pb-2">
                    Target Industries
                  </h3>
                  <ul className="text-sm text-slate-800 font-semibold space-y-2 list-disc list-inside">
                    <li>Manufacturing & building materials</li>
                    <li>Energy and oil & gas services</li>
                  </ul>
                  <p className="text-xs text-slate-400 font-mono italic pt-1">
                    Pharma, retail and automotive stay off until management confirms them.
                  </p>
                </div>

                {/* Proof & Projects */}
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-black text-slate-900 uppercase font-mono tracking-wider">
                      Proof and projects
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-3 text-sm text-slate-700 font-medium border-l-4 border-blue-600 pl-4 py-1">
                      <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 font-extrabold block">Silver SAP Partner</strong>
                        <p className="text-slate-600 mt-1">
                          First international SAP project delivered in Dubai, followed by major SAP implementations in the UAE and India.
                        </p>
                      </div>
                    </div>

                    <div className="divide-y divide-slate-200 border-y border-slate-200">
                      <div className="py-5 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-extrabold text-blue-700 uppercase">PROJECT 01</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs font-semibold text-slate-500">SAP Migration in Malaysia</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                          SAP migration for a manufacturer in Malaysia, delivered close to completion in record time, with a joint project-manager and technical-lead team supported by senior consultants.
                        </p>
                        <p className="text-xs text-slate-500 font-mono italic pt-1">
                          Client&apos;s words: use the testimonial already on clyptus.com
                        </p>
                      </div>

                      <div className="py-5 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-extrabold text-blue-700 uppercase">PROJECT 02</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs font-semibold text-slate-500">Full SAP Implementation</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                          A full SAP implementation delivered successfully. The client singled out the project communication and attention to detail.
                        </p>
                        <p className="text-xs text-slate-500 font-mono italic pt-1">
                          Client&apos;s words: use the testimonial already on clyptus.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQs */}
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-black text-slate-900 uppercase font-mono tracking-wider">
                      Frequently Asked Questions (FAQs)
                    </h3>
                  </div>

                  <div className="divide-y divide-slate-200">
                    <div className="py-4 space-y-1.5">
                      <h4 className="text-base font-extrabold text-slate-900">What is SAP S/4HANA?</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        SAP S/4HANA is SAP&apos;s current ERP suite, built to run on the SAP HANA database. It covers finance, logistics, supply chain and other core business processes in one system.
                      </p>
                    </div>

                    <div className="py-4 space-y-1.5">
                      <h4 className="text-base font-extrabold text-slate-900">Can you move us from SAP ECC to S/4HANA?</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        Yes. We handle brownfield conversions from ECC as well as greenfield S/4HANA implementations, starting with a readiness assessment and a roadmap so you know the scope before you commit.
                      </p>
                    </div>

                    <div className="py-4 space-y-1.5">
                      <h4 className="text-base font-extrabold text-slate-900">What is RISE with SAP, and do you support it?</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        RISE with SAP is SAP&apos;s packaged route to running S/4HANA in the cloud. We advise on whether it fits your landscape and deliver the migration and process change that follow.
                      </p>
                    </div>

                    <div className="py-4 space-y-1.5">
                      <h4 className="text-base font-extrabold text-slate-900">Do you support the system after go-live?</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        Yes. We provide application management and support covering incidents, enhancements and release updates, under a response model agreed with you up front.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Compliance Rules Notice */}
                <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 font-medium space-y-1">
                  <span className="font-extrabold font-mono text-[10px] text-slate-400 block uppercase">Compliance Note</span>
                  <p>Client names write &quot;a manufacturer in Malaysia&quot; until written consent. No unverified percentage claims or superlatives used.</p>
                </div>
              </div>
            )}

            {/* ================= 02. SAP CLOUD SERVICES ================= */}
            {capabilityNum === '02' && (
              <div className="space-y-10">
                <div className="border-b-2 border-slate-900 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs font-black uppercase">
                      INTERIM PANEL
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      #cloud-services
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                    SAP Cloud Services
                  </h1>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                    Clyptus helps businesses run SAP in the cloud. We advise on the move, deliver the migration and support the system afterwards.
                  </p>
                </div>

                {/* What We Do - Verbatim Bullet Ledger */}
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-black text-slate-900 uppercase font-mono tracking-wider">
                      What We Do
                    </h3>
                  </div>

                  <div className="divide-y divide-slate-200 border-y border-slate-200">
                    <div className="py-4 flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base">SAP cloud deployment and services</h4>
                      </div>
                    </div>

                    <div className="py-4 flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                          <span>RISE with SAP</span>
                          <span className="text-xs font-normal text-slate-500 font-mono">(advice on fit and delivery of the migration)</span>
                        </h4>
                        <a
                          href="#rise"
                          onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            const el = document.getElementById('core-capabilities');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="inline-flex items-center text-xs font-bold text-blue-600 hover:underline mt-1"
                        >
                          → Link to the RISE section on the S/4HANA page (#rise)
                        </a>
                      </div>
                    </div>

                    <div className="py-4 flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base">Cloud ERP migration and integration</h4>
                      </div>
                    </div>

                    <div className="py-4 flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                          <span>Support after go-live</span>
                        </h4>
                        <a
                          href="#support"
                          onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            const el = document.getElementById('core-capabilities');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="inline-flex items-center text-xs font-bold text-blue-600 hover:underline mt-1"
                        >
                          → Link to the support panel (#support)
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel Compliance Rules & Management Points */}
                <div className="pt-6 border-t border-slate-200 text-xs text-slate-600 space-y-4">
                  <div className="space-y-1">
                    <span className="font-extrabold font-mono text-[10px] text-slate-400 block uppercase">Rules for this panel</span>
                    <ul className="list-disc list-inside space-y-1 font-medium text-slate-500">
                      <li>Show only the lines above. Do not add more services, products or numbers.</li>
                      <li>Do not copy text from other websites or from SAP&apos;s own pages. A one-line definition in your own words is fine.</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="font-extrabold font-mono text-[10px] text-amber-600 block uppercase">Still to confirm with management</span>
                    <ul className="list-disc list-inside space-y-1 font-medium text-amber-800">
                      <li>Which SAP cloud offerings do we deliver: RISE, private cloud, public cloud?</li>
                      <li>Is there one client example we can describe without a name?</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 03. SAP BTP AND ADD-ONS ================= */}
            {capabilityNum === '03' && (
              <div className="space-y-10">
                <div className="border-b-2 border-slate-900 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs font-black uppercase">
                      INTERIM PANEL
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      #btp
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                    SAP BTP and add-on solutions
                  </h1>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                    SAP Business Technology Platform (BTP) is SAP&apos;s platform for building extensions and integrations around the core SAP system. Clyptus runs a BTP practice and builds custom SAP add-on solutions.
                  </p>
                </div>

                {/* What We Do */}
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-black text-slate-900 uppercase font-mono tracking-wider">
                      What We Do
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-200 border-y border-slate-200">
                    <div className="py-4 flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base">Extensions built on BTP, alongside the core SAP system</h4>
                      </div>
                    </div>
                    <div className="py-4 flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base">Custom SAP add-on solutions</h4>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rules & Still to confirm with management */}
                <div className="pt-6 border-t border-slate-200 text-xs text-slate-600 space-y-4">
                  <div className="space-y-1">
                    <span className="font-extrabold font-mono text-[10px] text-slate-400 block uppercase">Rules for this panel</span>
                    <ul className="list-disc list-inside space-y-1 font-medium text-slate-500">
                      <li>Show only the lines above. Do not name any BTP service or add-on product.</li>
                      <li>Do not copy text from other websites or from SAP&apos;s own pages.</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="font-extrabold font-mono text-[10px] text-amber-600 block uppercase">Still to confirm with management</span>
                    <ul className="list-disc list-inside space-y-1 font-medium text-amber-800">
                      <li>Which add-on solutions have we built? Name each and say what it does.</li>
                      <li>Which BTP services do we use, and is there a client example?</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 04. SAP HCM ================= */}
            {capabilityNum === '04' && (
              <div className="space-y-10">
                <div className="border-b-2 border-slate-900 pb-6">
                  <span className="text-xs font-mono font-extrabold text-orange-600 uppercase tracking-wider block mb-2">
                    #hcm
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                    SAP HCM (Human Capital Management)
                  </h1>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                    SAP HCM is SAP&apos;s solution for human capital management. It has been part of Clyptus&apos;s SAP practice since the company was founded in 2014.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4 py-2 space-y-1 text-sm text-slate-700">
                  <strong className="text-slate-900 font-extrabold block">Need SAP HCM or SuccessFactors specialists?</strong>
                  <p>Visit our Talent Acquisition page to explore specialized placement models and talent services.</p>
                </div>
              </div>
            )}

            {/* ================= 05. SAP BRIM ================= */}
            {capabilityNum === '05' && (
              <div className="space-y-10">
                <div className="border-b-2 border-slate-900 pb-6">
                  <span className="text-xs font-mono font-extrabold text-blue-600 uppercase tracking-wider block mb-2">
                    /sap-services/sap-brim/
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                    SAP BRIM Implementation and Consulting
                  </h1>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                    SAP BRIM (Billing and Revenue Innovation Management) is SAP&apos;s suite for subscription billing, usage-based charging, invoicing and revenue management. Clyptus covers the whole lifecycle, from subscription order capture to financial settlement and reporting, and connects it to S/4HANA. We work with any company, whether starting fresh or migrating an existing system.
                  </p>
                </div>

                {/* What We Do - Ledger Rows */}
                <div className="space-y-6">
                  <h3 className="text-lg font-black text-slate-900 uppercase font-mono tracking-wider border-b border-slate-200 pb-2">
                    What We Do
                  </h3>
                  <div className="divide-y divide-slate-200 border-y border-slate-200">
                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base sm:w-1/3">Greenfield Implementation</h4>
                      <p className="text-sm text-slate-600 font-medium sm:w-2/3">New build for subscription, usage-based, or invoicing setups.</p>
                    </div>
                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base sm:w-1/3">Brownfield Migration & Upgrades</h4>
                      <p className="text-sm text-slate-600 font-medium sm:w-2/3">Migrating existing billing/revenue setups onto SAP BRIM or upgrading existing systems.</p>
                    </div>
                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base sm:w-1/3">Application Management & Support</h4>
                      <p className="text-sm text-slate-600 font-medium sm:w-2/3">Post go-live L2/L3 support and continuous enhancements.</p>
                    </div>
                  </div>
                </div>

                {/* Modules Covered - Ledger Table */}
                <div className="space-y-6">
                  <h3 className="text-lg font-black text-slate-900 uppercase font-mono tracking-wider border-b border-slate-200 pb-2">
                    Modules We Cover
                  </h3>
                  <div className="divide-y divide-slate-200 border-y border-slate-200">
                    {[
                      { mod: 'SOM', name: 'Subscription Order Management', desc: 'Master data setup, product catalog design, subscription lifecycle management, order orchestration, contract master configuration.' },
                      { mod: 'CC', name: 'Convergent Charging', desc: 'Rating engine configuration, pricing strategy, charge calculation logic, aggregation rules, real-time monetization.' },
                      { mod: 'CI', name: 'Convergent Invoicing', desc: 'Invoice document generation, multi-format output, billing run optimization, mass processing.' },
                      { mod: 'CM', name: 'Convergent Mediation', desc: 'Ingesting, cleaning, validating, and transforming high-volume usage records for CC ingestion.' },
                      { mod: 'FI-CA & RAR', name: 'Contract AR & Revenue Accounting', desc: 'Contract AR, payment processing, clearing, ASC 606/IFRS 15 compliance, S/4HANA integration.' },
                      { mod: 'BRIM Technical', name: 'ABAP & Integration Tuning', desc: 'Custom ABAP, Convergent Invoicing tuning, and PI/PO & CPI integration support.' },
                    ].map((m) => (
                      <div key={m.mod} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="sm:w-1/3">
                          <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block mb-1">{m.mod}</span>
                          <h4 className="font-extrabold text-slate-900 text-sm">{m.name}</h4>
                        </div>
                        <p className="sm:w-2/3 text-sm text-slate-600 font-medium leading-relaxed">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Models */}
                <div className="border-l-4 border-blue-600 pl-4 py-2 space-y-1 text-sm text-slate-700">
                  <strong className="text-slate-900 font-extrabold block">How We Work (Engagement Models)</strong>
                  <p>Dedicated Pod (3-10 specialists) · Offshore Managed Service (L2/L3, SLA-driven) · Hybrid India & Onsite · Individual Niche Consultants (CC, CI, RAR).</p>
                </div>
              </div>
            )}

            {/* ================= 06. SAP AI (JOULE) ================= */}
            {capabilityNum === '06' && (
              <div className="space-y-10">
                <div className="border-b-2 border-slate-900 pb-6">
                  <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-wider block mb-2">
                    /sap-services/sap-ai/
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                    SAP AI and Joule on SAP S/4HANA
                  </h1>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                    Joule is SAP&apos;s AI copilot, built into SAP applications. Clyptus helps you adopt it, along with the machine learning and analytics already built into S/4HANA, and put them to work on your finance, supply chain and operations processes.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-black text-slate-900 uppercase font-mono tracking-wider border-b border-slate-200 pb-2">
                    What We Do
                  </h3>
                  <div className="divide-y divide-slate-200 border-y border-slate-200">
                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base sm:w-1/3">Joule & AI Inside S/4HANA</h4>
                      <p className="text-sm text-slate-600 font-medium sm:w-2/3">Adopting Joule and operationalizing built-in S/4HANA machine learning.</p>
                    </div>
                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base sm:w-1/3">Dashboards & Predictive Models</h4>
                      <p className="text-sm text-slate-600 font-medium sm:w-2/3">Built on operational ERP data for immediate executive visibility.</p>
                    </div>
                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base sm:w-1/3">Automation Around SAP</h4>
                      <p className="text-sm text-slate-600 font-medium sm:w-2/3">Automating repetitive document handling, master-data validations, approvals, and reconciliations.</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-emerald-600 pl-4 py-2 space-y-1 text-sm text-slate-700">
                  <strong className="text-slate-900 font-extrabold block">Engagement Model</strong>
                  <p>Short discovery on a single focused use case with a defined deliverable before wider scaling.</p>
                </div>
              </div>
            )}

            {/* ================= 07. SAP AMS AND SUPPORT ================= */}
            {capabilityNum === '07' && (
              <div className="space-y-10">
                <div className="border-b-2 border-slate-900 pb-6">
                  <span className="text-xs font-mono font-extrabold text-red-600 uppercase tracking-wider block mb-2">
                    /sap-services/s4hana/#support
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                    SAP Application Management and Support
                  </h1>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                    Go-live is the start, not the end. Clyptus provides application management and support for your SAP system after it goes live, under a response model agreed with you up front.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-black text-slate-900 uppercase font-mono tracking-wider border-b border-slate-200 pb-2">
                    What Support Covers
                  </h3>
                  <div className="divide-y divide-slate-200 border-y border-slate-200">
                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base sm:w-1/3">Incidents</h4>
                      <p className="text-sm text-slate-600 font-medium sm:w-2/3">Timely resolution of system and operational issues under SLA metrics.</p>
                    </div>
                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base sm:w-1/3">Enhancements</h4>
                      <p className="text-sm text-slate-600 font-medium sm:w-2/3">Continuous improvements and functional changes post go-live.</p>
                    </div>
                    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base sm:w-1/3">Release Updates</h4>
                      <p className="text-sm text-slate-600 font-medium sm:w-2/3">Systematic deployment of SAP platform updates.</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-red-600 pl-4 py-2 space-y-1 text-sm text-slate-700">
                  <strong className="text-slate-900 font-extrabold block">Delivery Models</strong>
                  <p>Managed Service Team · Offshore Managed Service (India) · Hybrid Onsite and Offshore.</p>
                </div>
              </div>
            )}

            {/* ================= 08 & 09. ORACLE CLOUD ERP & DYNAMICS 365 ================= */}
            {(capabilityNum === '08' || capabilityNum === '09') && (
              <div className="space-y-8">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-mono font-bold bg-amber-50 p-3 border-l-4 border-amber-500">
                  <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>INTERIM PRACTICE PANEL: Hidden by default pending management confirmation.</span>
                </div>

                <div className="border-b-2 border-slate-900 pb-6">
                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                    {capabilityNum === '08' ? 'Oracle Cloud ERP Services' : 'Microsoft Dynamics 365 Services'}
                  </h1>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                    {capabilityNum === '08'
                      ? 'Oracle Cloud ERP implementation, data migration, and application management services for enterprise landscapes.'
                      : 'Microsoft Dynamics 365 ERP & CRM implementation, custom extensions, and SLA-driven support services.'}
                  </p>
                </div>
              </div>
            )}

            {/* Shared Global Call to Action (CTA Block) */}
            {renderSharedCTA()}
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};
