import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe, Building2, UserCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Magnetic } from './Magnetic';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'AI Solutions',
    message: '',
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start end', 'end start'],
  });

  // Scroll-linked scale (95% -> 100% -> 105%) and subtle vertical shift
  const headerScale = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.95, 1.0, 1.05]);
  const headerY = useTransform(scrollYProgress, [0, 0.45, 0.9], [25, 0, -15]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.6, 1, 1, 0.8]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: 'AI Solutions', message: '' });
    }, 4000);
  };

  const globalOffices = [
    {
      country: 'INDIA (Head Office)',
      city: 'Hyderabad',
      address: '12A01A 13th Floor, Manjeera Trinity Corporate, JNTU - Hitech City Road, Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500072',
      emails: ['hr.india@clyptus.com', 'Sales@clyptus.com'],
      phones: ['+91 7799988139 (Sales)', '+91 9100115466 (HR)', '+91 7331161699 (HR)'],
      color: 'from-blue-600 to-indigo-600',
      badge: 'HEADQUARTERS',
    },
    {
      country: 'UNITED ARAB EMIRATES',
      city: 'Dubai',
      address: '101 Sheikh Zayed Rd - Trade Centre - DIFC - Dubai - United Arab Emirates',
      emails: ['hr.uae@clyptus.com', 'shabana.shaik@clyptus.com'],
      phones: ['+971 504836190'],
      color: 'from-emerald-600 to-teal-600',
      badge: 'UAE OFFICE',
    },
    {
      country: 'UNITED STATES',
      city: 'California',
      address: '45627 Basswood Ct, Temecula, California 92592',
      emails: ['hr.usa@clyptus.com', 'pavan.sunkara@clyptus.com'],
      phones: ['+1 (480) 427-6373'],
      color: 'from-purple-600 to-indigo-600',
      badge: 'USA OFFICE',
    },
  ];

  const regionalOffices = [
    { city: 'Vijayawada', address: 'Corporate Centre, MG Road, Main Road, beside Chandana Grand, Brindavan Colony, Vijayawada, AP 520010' },
    { city: 'Bengaluru', address: 'No. 3, 7th Cross, Venkateswara Layout, Bangalore, Karnataka 560068' },
  ];

  return (
    <section id="contact" className="w-full bg-slate-50 py-20 px-4 sm:px-8 lg:px-16 border-t border-slate-200 select-none relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header Title with Scroll-Linked Animation */}
        <motion.div
          ref={headerRef}
          style={{ scale: headerScale, y: headerY, opacity: headerOpacity }}
          className="text-center flex flex-col items-center gap-3 will-change-transform"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-sky-700 font-bold uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            GET IN TOUCH WITH CLYPTUS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Interested in Discussing Your <br />
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              IT & AI Support Needs?
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-medium">
            Reach out directly to our global sales and talent management teams or visit one of our international offices.
          </p>
        </motion.div>

        {/* Connected Route Hub Ribbon */}
        <div className="flex flex-col items-center gap-3 -mb-6 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 sm:px-6 py-2 rounded-full bg-white/90 border border-sky-200/80 shadow-md text-xs font-mono font-bold text-slate-800 backdrop-blur-md"
          >
            <span className="flex items-center gap-1.5 text-sky-600">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
              </span>
              India (HQ)
            </span>

            <span className="hidden sm:inline text-slate-300 font-extrabold">───⚡───</span>
            <span className="sm:hidden text-slate-300">➔</span>

            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Dubai (UAE)
            </span>

            <span className="hidden sm:inline text-slate-300 font-extrabold">───⚡───</span>
            <span className="sm:hidden text-slate-300">➔</span>

            <span className="flex items-center gap-1.5 text-purple-600">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
              </span>
              California (USA)
            </span>
          </motion.div>
        </div>

        {/* Global Contacts Grid & Animated Connecting Route */}
        <div className="relative">
          {/* SVG Animated Route Line - Desktop Arc */}
          <div className="hidden md:block absolute -top-10 left-0 right-0 h-20 pointer-events-none z-0 overflow-visible">
            <svg className="w-full h-full" viewBox="0 0 1000 80" fill="none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="routeGradientIndiaDubai" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="routeGradientDubaiUSA" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
                <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Arc 1: India (x ≈ 166) -> Dubai (x ≈ 500) */}
              <motion.path
                d="M 166 45 C 270 10, 396 10, 500 45"
                stroke="url(#routeGradientIndiaDubai)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#routeGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
              <path
                d="M 166 45 C 270 10, 396 10, 500 45"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-route-dash opacity-90"
              />

              {/* Arc 2: Dubai (x ≈ 500) -> California (x ≈ 834) */}
              <motion.path
                d="M 500 45 C 604 10, 730 10, 834 45"
                stroke="url(#routeGradientDubaiUSA)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#routeGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
              <path
                d="M 500 45 C 604 10, 730 10, 834 45"
                stroke="#c084fc"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-route-dash opacity-90"
              />
            </svg>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {globalOffices.map((office, idx) => (
              <Magnetic key={office.city} strength={0.06} tilt={true} maxTilt={9} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.22,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="group relative flex flex-col justify-between h-full p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:border-sky-300 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${office.color} shadow-xs`}>
                          {office.badge}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                          HUB 0{idx + 1}
                        </span>
                      </div>

                      <motion.div
                        initial={{ rotate: -90, scale: 0.6 }}
                        whileInView={{ rotate: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.22 + 0.3, type: 'spring', stiffness: 150 }}
                        className="relative"
                      >
                        <span className="absolute -inset-1 rounded-full bg-sky-400/20 animate-ping opacity-75" />
                        <Globe className="w-5 h-5 text-sky-600 relative z-10 transition-transform duration-300 group-hover:rotate-45" />
                      </motion.div>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                      {office.city}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                      {office.country}
                    </p>

                    <div className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                      <motion.div
                        initial={{ y: -16, scale: 0.5, opacity: 0 }}
                        whileInView={{ y: [-16, 0, -5, 0], scale: [0.5, 1.25, 0.9, 1], opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: idx * 0.22 + 0.35, ease: 'easeOut' }}
                        className="shrink-0 mt-0.5"
                      >
                        <MapPin className="w-4 h-4 text-sky-600" />
                      </motion.div>
                      <span>{office.address}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                    {/* Emails */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">EMAIL US</span>
                      {office.emails.map((email, eIdx) => (
                        <a
                          key={eIdx}
                          href={`mailto:${email}`}
                          className="group/email inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-sky-600 transition-colors"
                        >
                          <motion.span
                            initial={{ x: -10, opacity: 0, rotate: -15 }}
                            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.22 + 0.4 + eIdx * 0.1 }}
                            className="inline-flex items-center"
                          >
                            <Mail className="w-3.5 h-3.5 text-sky-600 transition-transform duration-300 group-hover/email:scale-115 group-hover/email:-translate-y-0.5" />
                          </motion.span>
                          <span>{email}</span>
                        </a>
                      ))}
                    </div>

                    {/* Phones */}
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">CALL US</span>
                      {office.phones.map((phone, pIdx) => (
                        <a
                          key={pIdx}
                          href={`tel:${phone.split(' ')[0]}`}
                          className="group/phone inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-sky-600 transition-colors"
                        >
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1, rotate: [0, -15, 15, -10, 10, 0] }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.22 + 0.5 + pIdx * 0.1 }}
                            className="inline-flex items-center"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-600 transition-transform duration-300 group-hover/phone:rotate-12 group-hover/phone:scale-110" />
                          </motion.span>
                          <span>{phone}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Regional Offices Across India */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Offices Across India</h3>
              <p className="text-xs text-slate-500 font-medium">Regional delivery & development centers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {regionalOffices.map((reg, rIdx) => (
              <div key={rIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col gap-1.5">
                <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  {reg.city}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {reg.address}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-2xl">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md w-fit">
              <UserCheck className="w-3.5 h-3.5" />
              DIRECT CONSULTATION
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              Send us a message and our experts will respond in 24 hours.
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Whether you require SAP implementation, IT staffing augmentation, or generative AI workflows, Clyptus engineered solutions deliver results.
            </p>
            
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>Sales: Sales@clyptus.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Direct Hotline: +91 7799988139</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-lg">
            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
                <h4 className="text-xl font-extrabold text-slate-900">Thank You!</h4>
                <p className="text-xs text-slate-600">Your inquiry has been received. A Clyptus specialist will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Required Service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white"
                    >
                      <option value="AI Solutions">AI Solutions</option>
                      <option value="SAP Consulting">SAP Consulting</option>
                      <option value="IT Recruiting">IT Recruiting</option>
                      <option value="General Support">General Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project or staffing requirement..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
                  />
                </div>

                <Magnetic strength={0.1}>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
