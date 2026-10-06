import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe, Building2, UserCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'AI Solutions',
    message: '',
  });

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
        
        {/* Header Title */}
        <div className="text-center flex flex-col items-center gap-3">
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
        </div>

        {/* Global Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {globalOffices.map((office, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-sky-300 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${office.color} shadow-xs`}>
                    {office.badge}
                  </span>
                  <Globe className="w-5 h-5 text-slate-400 group-hover:text-sky-600 transition-colors" />
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                  {office.city}
                </h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  {office.country}
                </p>

                <div className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
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
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-sky-600 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-sky-600" />
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
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-sky-600 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{phone}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
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

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
