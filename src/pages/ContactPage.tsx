import React, { useState, useRef } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  ExternalLink
} from 'lucide-react';
import { Language, PageId } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface ContactPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  topic?: string;
  message?: string;
  consent?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ language, onNavigate }) => {
  // Form input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  // Field refs for programmatic focus on first error
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const topicRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName =
        language === 'EN'
          ? 'Please enter your full official name as per MyKad.'
          : 'Sila masukkan nama penuh anda seperti dalam MyKad.';
    }

    if (!email.trim()) {
      newErrors.email =
        language === 'EN'
          ? 'Please provide a valid email address.'
          : 'Sila masukkan alamat emel yang sah.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email =
        language === 'EN'
          ? 'Email format is invalid (e.g. name@domain.com).'
          : 'Format emel tidak sah (contoh: nama@domain.com).';
    }

    if (!topic) {
      newErrors.topic =
        language === 'EN' ? 'Please select an enquiry topic.' : 'Sila pilih topik pertanyaan anda.';
    }

    if (!message.trim() || message.trim().length < 15) {
      newErrors.message =
        language === 'EN'
          ? 'Message must be at least 15 characters long.'
          : 'Mesej mestilah sekurang-kurangnya 15 aksara.';
    }

    if (!consent) {
      newErrors.consent =
        language === 'EN'
          ? 'You must consent to the processing of personal data under the PDPA.'
          : 'Anda perlu bersetuju dengan pemprosesan data peribadi di bawah APDP.';
    }

    setErrors(newErrors);

    // Focus moved to the first error
    if (newErrors.fullName) {
      fullNameRef.current?.focus();
      return;
    }
    if (newErrors.email) {
      emailRef.current?.focus();
      return;
    }
    if (newErrors.topic) {
      topicRef.current?.focus();
      return;
    }
    if (newErrors.message) {
      messageRef.current?.focus();
      return;
    }
    if (newErrors.consent) {
      consentRef.current?.focus();
      return;
    }

    // Success State
    const generatedRef = `KWAP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceNumber(generatedRef);
    setSubmittedSuccess(true);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setTopic('');
    setMessage('');
    setConsent(false);
    setErrors({});
    setSubmittedSuccess(false);
  };

  return (
    <div className="bg-white">
      {/* Subpage Breadcrumb */}
      <Breadcrumbs currentPage="contact" language={language} onNavigate={onNavigate} />

      {/* TOP BANNER */}
      <section id="hero-section" className="relative bg-[#10069F] text-white overflow-hidden py-16 lg:py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=75"
            alt="Modern skyscraper Integra Tower in Kuala Lumpur"
            width={1600}
            height={600}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10069F] via-[#10069F]/90 to-transparent" />
          <div className="absolute inset-0 kwap-diamond-pattern opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-balance leading-tight">
              {language === 'EN' ? 'Contact & Service Counters' : 'Hubungi & Kaunter Khidmat'}
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              {language === 'EN'
                ? 'Get in touch with KWAP officers. Visit our customer service counters or submit an enquiry online for prompt, caring guidance.'
                : 'Hubungi pegawai khidmat pelanggan KWAP. Kunjungi kaunter perkhidmatan kami atau hantar pertanyaan dalam talian untuk bantuan segera.'}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN CONTACT SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT COLUMN: CONTACT FORM WITH INLINE VALIDATION & SUCCESS STATE */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D0D3D4] p-6 sm:p-10 shadow-sm">
            {submittedSuccess ? (
              /* Animated Success State */
              <div
                className="py-12 px-4 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200"
                role="status"
                aria-live="polite"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101820]">
                  {language === 'EN' ? 'Enquiry Logged Successfully' : 'Pertanyaan Berjaya Direkodkan'}
                </h2>

                <div className="p-4 bg-[#EAF3FB] border border-[#6CACE4] rounded-lg max-w-md mx-auto text-sm text-[#101820]">
                  <span className="text-xs uppercase font-bold text-[#10069F] block mb-1">
                    {language === 'EN' ? 'Official Reference Number' : 'Nombor Rujukan Rasmi'}
                  </span>
                  <span className="text-xl font-mono font-extrabold text-[#10069F]">
                    #{referenceNumber}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#101820]/75 max-w-md mx-auto leading-relaxed">
                  {language === 'EN'
                    ? `Thank you, ${fullName}. A confirmation email has been dispatched to ${email}. Our customer care officer will follow up within 2 business days.`
                    : `Terima kasih, ${fullName}. Pengesahan telah dihantar ke emel ${email}. Pegawai khidmat pelanggan kami akan menghubungi anda dalam tempoh 2 hari bekerja.`}
                </p>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="min-h-[48px] px-6 py-2.5 bg-[#10069F] text-white font-bold text-sm rounded-md hover:bg-[#0c0580] transition-colors"
                  >
                    {language === 'EN' ? 'Submit Another Enquiry' : 'Hantar Pertanyaan Lain'}
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#101820]">
                    {language === 'EN' ? 'Send Us an Enquiry' : 'Borang Pertanyaan Dalam Talian'}
                  </h2>
                  <p className="text-sm text-[#101820]/70 mt-1">
                    {language === 'EN'
                      ? 'Fields marked with * are required. We handle all personal data with strict statutory privacy.'
                      : 'Ruangan bertanda * adalah wajib. Maklumat anda dilindungi di bawah privasi statutori.'}
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="fullname" className="block text-xs font-bold uppercase tracking-wider text-[#10069F] mb-1.5">
                    {language === 'EN' ? 'Full Name (as per MyKad) *' : 'Nama Penuh (seperti MyKad) *'}
                  </label>
                  <input
                    ref={fullNameRef}
                    id="fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder={language === 'EN' ? 'e.g. Haji Ahmad bin Ismail' : 'cth. Haji Ahmad bin Ismail'}
                    className={`w-full min-h-[48px] px-4 border rounded-md text-base text-[#101820] bg-white transition-colors ${
                      errors.fullName ? 'border-[#BA0C2F] ring-1 ring-[#BA0C2F]' : 'border-[#D0D3D4] focus:border-[#10069F]'
                    }`}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullname-error' : undefined}
                  />
                  {errors.fullName && (
                    <p id="fullname-error" className="mt-1.5 text-xs text-[#BA0C2F] font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email Address & Phone Number Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#10069F] mb-1.5">
                      {language === 'EN' ? 'Email Address *' : 'Alamat Emel *'}
                    </label>
                    <input
                      ref={emailRef}
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="name@example.com"
                      className={`w-full min-h-[48px] px-4 border rounded-md text-base text-[#101820] bg-white transition-colors ${
                        errors.email ? 'border-[#BA0C2F] ring-1 ring-[#BA0C2F]' : 'border-[#D0D3D4] focus:border-[#10069F]'
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-[#BA0C2F] font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone (Optional) */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#10069F] mb-1.5">
                      {language === 'EN' ? 'Phone Number (Optional)' : 'Nombor Telefon (Pilihan)'}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="012-345 6789"
                      className="w-full min-h-[48px] px-4 border border-[#D0D3D4] focus:border-[#10069F] rounded-md text-base text-[#101820] bg-white"
                    />
                  </div>
                </div>

                {/* Topic Select */}
                <div>
                  <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-wider text-[#10069F] mb-1.5">
                    {language === 'EN' ? 'Enquiry Topic *' : 'Topik Pertanyaan *'}
                  </label>
                  <select
                    ref={topicRef}
                    id="topic"
                    required
                    value={topic}
                    onChange={(e) => {
                      setTopic(e.target.value);
                      if (errors.topic) setErrors({ ...errors, topic: undefined });
                    }}
                    className={`w-full min-h-[48px] px-4 border rounded-md text-base text-[#101820] bg-white transition-colors ${
                      errors.topic ? 'border-[#BA0C2F] ring-1 ring-[#BA0C2F]' : 'border-[#D0D3D4] focus:border-[#10069F]'
                    }`}
                    aria-invalid={!!errors.topic}
                    aria-describedby={errors.topic ? 'topic-error' : undefined}
                  >
                    <option value="">
                      {language === 'EN' ? '-- Select Enquiry Topic --' : '-- Pilih Topik Pertanyaan --'}
                    </option>
                    <option value="pension-payment">
                      {language === 'EN' ? 'Pension Payment / Monthly Disbursement' : 'Bayaran Pencen / Pengkreditan Bulanan'}
                    </option>
                    <option value="bank-update">
                      {language === 'EN' ? 'Change of Recipient Bank Account' : 'Pertukaran Akaun Bank Penerima'}
                    </option>
                    <option value="derivative">
                      {language === 'EN' ? 'Derivative Pension / Dependent Claim' : 'Pencen Terbitan / Tuntutan Waris'}
                    </option>
                    <option value="mypesara">
                      {language === 'EN' ? 'MyPesara App & Digital ID Assistance' : 'Bantuan Aplikasi MyPesara & ID Digital'}
                    </option>
                    <option value="employer">
                      {language === 'EN' ? 'Statutory Employer Remittance' : 'Caruman Majikan Statutori'}
                    </option>
                    <option value="general">
                      {language === 'EN' ? 'General Enquiry' : 'Pertanyaan Umum Lain'}
                    </option>
                  </select>
                  {errors.topic && (
                    <p id="topic-error" className="mt-1.5 text-xs text-[#BA0C2F] font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.topic}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#10069F] mb-1.5">
                    {language === 'EN' ? 'Your Message *' : 'Mesej Anda *'}
                  </label>
                  <textarea
                    ref={messageRef}
                    id="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder={
                      language === 'EN'
                        ? 'Please describe your query with relevant details (e.g. pension reference number)...'
                        : 'Sila nyatakan pertanyaan anda berserta butiran berkaitan (cth. nombor rujukan pencen)...'
                    }
                    className={`w-full p-4 border rounded-md text-base text-[#101820] bg-white transition-colors ${
                      errors.message ? 'border-[#BA0C2F] ring-1 ring-[#BA0C2F]' : 'border-[#D0D3D4] focus:border-[#10069F]'
                    }`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-[#BA0C2F] font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div>
                  <div className="flex items-start gap-3">
                    <input
                      ref={consentRef}
                      id="consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (errors.consent) setErrors({ ...errors, consent: undefined });
                      }}
                      className="w-5 h-5 rounded-sm border-[#D0D3D4] text-[#10069F] accent-[#10069F] mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-xs sm:text-sm text-[#101820]/80 leading-relaxed cursor-pointer">
                      {language === 'EN'
                        ? 'I hereby consent to KWAP processing my personal data in accordance with the Personal Data Protection Act (PDPA 2010) and KWAP Privacy Policy.'
                        : 'Saya dengan ini bersetuju KWAP memproses data peribadi saya selaras dengan Akta Perlindungan Data Peribadi (APDP 2010) dan Dasar Privasi KWAP.'}
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="mt-1.5 text-xs text-[#BA0C2F] font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.consent}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full min-h-[50px] px-6 py-3 bg-[#FFA400] text-[#101820] font-bold text-base rounded-md hover:bg-[#f39c00] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-5 h-5 text-[#101820]" />
                    <span>{language === 'EN' ? 'Send Enquiry Message' : 'Hantar Mesej Pertanyaan'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: HEADQUARTERS & SERVICE COUNTERS */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Photo Card */}
            <div className="bg-white rounded-2xl border border-[#D0D3D4] overflow-hidden shadow-sm">
              <div className="h-52 relative overflow-hidden bg-[#EAF3FB]">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=75"
                  alt="Integra Tower Kuala Lumpur modern headquarters facade"
                  width={800}
                  height={400}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-white bg-[#10069F] px-2.5 py-1 rounded-sm">
                  {language === 'EN' ? 'Integra Tower KL' : 'Menara Integra KL'}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-[#101820]">
                  {language === 'EN' ? 'KWAP Headquarters' : 'Ibu Pejabat KWAP'}
                </h3>

                <div className="space-y-3 text-sm text-[#101820]/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#10069F] shrink-0 mt-0.5" />
                    <span>
                      Level 36, Integra Tower, The Intermark, 348 Jalan Tun Razak, 50400 Kuala Lumpur
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#10069F] shrink-0" />
                    <a href="tel:+60321748000" className="hover:text-[#10069F] font-bold">
                      +603 2174 8000
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#10069F] shrink-0" />
                    <a href="mailto:info@kwap.gov.my" className="hover:text-[#10069F] font-bold">
                      info@kwap.gov.my
                    </a>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-[#D0D3D4]/50">
                    <Clock className="w-5 h-5 text-[#10069F] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#101820]">
                        {language === 'EN' ? 'Counter Operating Hours:' : 'Waktu Operasi Kaunter:'}
                      </div>
                      <div className="text-xs text-[#101820]/70 mt-0.5">
                        {language === 'EN'
                          ? 'Monday - Thursday: 8:30 AM – 5:30 PM'
                          : 'Isnin - Khamis: 8:30 pagi – 5:30 petang'}
                      </div>
                      <div className="text-xs text-[#101820]/70">
                        {language === 'EN'
                          ? 'Friday: 8:30 AM – 12:15 PM, 2:45 PM – 5:30 PM'
                          : 'Jumaat: 8:30 pagi – 12:15 tgh hari, 2:45 ptg – 5:30 ptg'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cyberjaya Service Centre Card */}
            <div className="bg-[#EAF3FB] rounded-xl border border-[#6CACE4]/40 p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#10069F]">
                <Building className="w-5 h-5" />
                <h4 className="font-bold text-base text-[#101820]">
                  {language === 'EN' ? 'Cyberjaya Operations Hub' : 'Pusat Operasi Cyberjaya'}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#101820]/80 leading-relaxed">
                KWAP Cyberjaya, Persiaran APEC, 63000 Cyberjaya, Selangor Darul Ehsan.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#10069F] flex items-center justify-between">
                <span>{language === 'EN' ? 'Specialized Pension Enquiries' : 'Kaunter Khidmat Pesara'}</span>
                <span className="text-[#101820]/60">Mon - Fri</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HTML Licence Record Comment Block */}
      {/*
        =============================================================================
        KWAP PROTOTYPE PHOTO LICENCE RECORDS: CONTACT PAGE
        - Integra Tower Skyscraper: Sean Pollock (https://unsplash.com/@seanpollock) - photo-1486406146926-c627a92ad1ab
        =============================================================================
      */}
    </div>
  );
};
