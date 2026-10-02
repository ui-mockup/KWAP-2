import React, { useState } from 'react';
import {
  Search,
  UserCheck,
  Calculator,
  FileDown,
  Smartphone,
  HeartHandshake,
  CheckCircle2,
  ChevronDown,
  Phone,
  Mail,
  ArrowRight,
  Clock,
  X,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Language, PageId } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TASK_CARDS, FAQ_ITEMS } from '../data/content';

interface PensionerServicesPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
}

export const PensionerServicesPage: React.FC<PensionerServicesPageProps> = ({
  language,
  onNavigate
}) => {
  const [filterCategory, setFilterCategory] = useState<'everyone' | 'pensioner' | 'future' | 'beneficiary'>('everyone');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Interactive Task Modals State
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Status Checker Interactive Form State
  const [icNumber, setIcNumber] = useState('');
  const [statusResult, setStatusResult] = useState<any | null>(null);

  // Retirement Calculator Interactive State
  const [lastDrawnSalary, setLastDrawnSalary] = useState<number>(6500);
  const [monthsOfService, setMonthsOfService] = useState<number>(360); // 30 years

  const handleStatusSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!icNumber.trim()) return;

    // Simulate verified sample pensioner record
    setStatusResult({
      name: 'HAJI AHMAD BIN ISMAIL',
      ic: icNumber,
      pensionType: 'Perkhidmatan Awam Persekutuan (Pencen Hakiki)',
      status: 'Active / Berbayar',
      nextPaymentDate: '15 Oktober 2026',
      bankName: 'Maybank Berhad (Akaun: *******4921)',
      monthlyAmount: 'RM 3,250.00',
      lastSlipMonth: 'September 2026'
    });
  };

  // Retirement estimate formula under statutory formula: (Months / 720) * Last salary (capped at 60%)
  const estimatedMonthlyPension = Math.round((Math.min(monthsOfService, 360) / 600) * lastDrawnSalary);
  const estimatedGratuity = Math.round(7.5 / 100 * monthsOfService * lastDrawnSalary * 0.1);

  const filteredTasks = TASK_CARDS.filter((task) => {
    if (filterCategory === 'everyone') return true;
    return task.category === filterCategory || task.category === 'everyone';
  });

  const getTaskIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return Search;
      case 'UserCheck': return UserCheck;
      case 'Calculator': return Calculator;
      case 'FileDown': return FileDown;
      case 'Smartphone': return Smartphone;
      case 'HeartHandshake': return HeartHandshake;
      default: return FileText;
    }
  };

  return (
    <div className="bg-white">
      {/* Subpage Breadcrumb */}
      <Breadcrumbs currentPage="services" language={language} onNavigate={onNavigate} />

      {/* TOP BANNER WITH TABUNG HAJI STYLE ORGANIC SHAPES & WARM UNSPLASH PHOTO */}
      <section id="hero-section" className="relative bg-[#10069F] text-white overflow-hidden py-16 lg:py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1758691031749-607d43c14f63?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb"
            alt="Warm elderly couple enjoying peace of mind in retirement"
            width={1600}
            height={700}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10069F] via-[#10069F]/90 to-transparent" />
          <div className="absolute inset-0 kwap-diamond-pattern opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-balance leading-tight">
              {language === 'EN' ? 'Pensioner Services' : 'Perkhidmatan Pesara Awam'}
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              {language === 'EN'
                ? 'Clear, straightforward services designed for our seniors, spouses, and future retirees. Fast status checks, verified forms, and personal assistance.'
                : 'Khidmat mesra, ringkas, dan jelas buat warga emas, pasangan, serta bakal pesara. Semakan status pantas, muat turun borang rasmi, dan sokongan peribadi.'}
            </p>
          </div>
        </div>
      </section>

      {/* "I AM A..." AUDIENCE FILTER BAR */}
      <section className="bg-[#EAF3FB] py-8 border-b border-[#D0D3D4]" id="status-checker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#10069F]">
                {language === 'EN' ? 'Targetted Assistance' : 'Bantuan Mengikut Keperluan'}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#101820]">
                {language === 'EN' ? 'I am a...' : 'Pilih peranan anda...'}
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Task category filter">
              {[
                { id: 'everyone', label: { EN: 'Everyone', BM: 'Semua' } },
                { id: 'pensioner', label: { EN: 'Pensioner & Spouse', BM: 'Pesara & Pasangan' } },
                { id: 'future', label: { EN: 'Future Retiree', BM: 'Bakal Pesara' } },
                { id: 'beneficiary', label: { EN: 'Beneficiary / Dependents', BM: 'Waris & Penerima' } }
              ].map((cat) => {
                const isSelected = filterCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFilterCategory(cat.id as any)}
                    className={`min-h-[46px] px-5 py-2 rounded-full text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#10069F] text-white shadow-md'
                        : 'bg-white text-[#101820] hover:bg-white/80 border border-[#D0D3D4]'
                    }`}
                    aria-pressed={isSelected}
                  >
                    {cat.label[language]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SIX TASK CARDS WITH ICONS & WORKING MODAL HANDLERS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => {
            const Icon = getTaskIcon(task.iconName);
            return (
              <div
                key={task.id}
                className="bg-white rounded-xl border border-[#D0D3D4] p-6 flex flex-col justify-between hover:border-[#10069F] hover:shadow-lg transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-[#EAF3FB] text-[#10069F] flex items-center justify-center group-hover:bg-[#10069F] group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7" strokeWidth={1.75} />
                    </div>
                    {task.badge && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#EAF3FB] text-[#10069F]">
                        {task.badge[language]}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#101820] group-hover:text-[#10069F] transition-colors">
                    {task.title[language]}
                  </h3>

                  <p className="text-sm text-[#101820]/75 mt-2.5 leading-relaxed font-normal">
                    {task.description[language]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D0D3D4]/50">
                  <button
                    type="button"
                    onClick={() => setActiveModal(task.id)}
                    className="w-full min-h-[48px] px-4 py-2.5 bg-[#EAF3FB] hover:bg-[#FFA400] text-[#10069F] hover:text-[#101820] font-bold text-sm rounded-md transition-colors flex items-center justify-between"
                  >
                    <span>{task.actionLabel[language]}</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* THREE-STEP "HOW IT WORKS" STRIP (CPF / ABP Reference Style) */}
      <section className="bg-[#EAF3FB] py-16 border-y border-[#D0D3D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101820]">
              {language === 'EN'
                ? 'Three simple steps to manage your pension'
                : 'Tiga langkah mudah mengurus hal persaraan anda'}
            </h2>
            <p className="text-sm text-[#101820]/70 mt-2">
              {language === 'EN'
                ? 'We keep statutory procedures easy to understand with clear guidance at every stage.'
                : 'Kami memastikan segala urusan statutori difahami dengan jelas di setiap peringkat.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg border border-[#D0D3D4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#10069F] text-white font-extrabold flex items-center justify-center text-base mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-[#101820]">
                  {language === 'EN' ? 'Have your MyKad Ready' : 'Sediakan MyKad Anda'}
                </h3>
                <p className="text-sm text-[#101820]/75 mt-2 leading-relaxed">
                  {language === 'EN'
                    ? 'Your 12-digit Malaysian MyKad number is your single official key to verify disbursements and JPA files.'
                    : 'Nombor 12-digit MyKad adalah kunci rasmi untuk pengesahan bayaran dan fail rekod JPA.'}
                </p>
              </div>
              <div className="mt-4 pt-3 text-xs font-semibold text-[#10069F]">
                {language === 'EN' ? 'No complex passwords required' : 'Tiada kata laluan rumit diperlukan'}
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg border border-[#D0D3D4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#10069F] text-white font-extrabold flex items-center justify-center text-base mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-[#101820]">
                  {language === 'EN' ? 'Select Your Self-Service Task' : 'Pilih Urusan Layan Diri'}
                </h3>
                <p className="text-sm text-[#101820]/75 mt-2 leading-relaxed">
                  {language === 'EN'
                    ? 'Check pension payment records, download verified PDF slips, or submit an updated bank account.'
                    : 'Semak penyata bulanan, muat turun slip PDF rasmi, atau hantar kemas kini akaun bank.'}
                </p>
              </div>
              <div className="mt-4 pt-3 text-xs font-semibold text-[#10069F]">
                {language === 'EN' ? 'Instant online confirmation' : 'Pengesahan segera dalam talian'}
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg border border-[#D0D3D4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#10069F] text-white font-extrabold flex items-center justify-center text-base mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-[#101820]">
                  {language === 'EN' ? 'Receive Punctual Disbursement' : 'Terima Bayaran Punctual'}
                </h3>
                <p className="text-sm text-[#101820]/75 mt-2 leading-relaxed">
                  {language === 'EN'
                    ? 'Monthly pensions are credited safely into your chosen bank account around the 15th of each month.'
                    : 'Pencen bulanan dikredit selamat ke dalam akaun bank pilihan anda sekitar 15 hari bulan setiap bulan.'}
                </p>
              </div>
              <div className="mt-4 pt-3 text-xs font-semibold text-[#10069F]">
                {language === 'EN' ? 'Direct SMS & app notifications' : 'Notifikasi SMS & aplikasi terus'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION (3+ Items) */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101820]">
            {language === 'EN' ? 'Frequently Asked Questions' : 'Soalan Lazim Berkenaan Pencen'}
          </h2>
          <p className="text-sm text-[#101820]/70 mt-2">
            {language === 'EN'
              ? 'Plain language answers to common pension queries. Need further help? Our hotline is always ready.'
              : 'Jawapan ringkas dan jelas bagi soalan kerap ditanya. Masih memerlukan bantuan? Talian khidmat kami sedia membantu.'}
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-[#D0D3D4] rounded-lg overflow-hidden bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#101820] hover:text-[#10069F] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg">{faq.question[language]}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#10069F] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-[#101820]/80 leading-relaxed border-t border-[#D0D3D4]/40 bg-[#EAF3FB]/30">
                    <p>{faq.answer[language]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* HELP PANEL WITH PHONE, EMAIL & CONTACT BUTTON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#10069F] text-white rounded-2xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {language === 'EN' ? 'Prefer speaking to a friendly officer?' : 'Ingin bercakap dengan pegawai kami?'}
            </h3>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              {language === 'EN'
                ? 'Our dedicated pensioner hotline is open Monday to Friday, 8:30 AM to 5:30 PM. We assist with patience, respect, and clear answers.'
                : 'Talian khas pesara kami beroperasi Isnin hingga Jumaat, 8:30 pagi hingga 5:30 petang. Kami sedia membantu dengan penuh sabar dan hormat.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="tel:+60321748000"
              className="min-h-[50px] px-6 py-3 bg-[#FFA400] text-[#101820] font-bold text-sm sm:text-base rounded-md hover:bg-[#f39c00] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg"
            >
              <Phone className="w-5 h-5 text-[#101820]" strokeWidth={1.75} />
              <span>+603 2174 8000</span>
            </a>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="min-h-[50px] px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm sm:text-base rounded-md border border-white/30 transition-all flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              <span>{language === 'EN' ? 'Send a Message' : 'Hantar Mesej'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* WORKING INTERACTIVE MODALS FOR TASK CARDS */}

      {/* 1. STATUS CHECKER MODAL */}
      {activeModal === 'status' && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full border border-[#D0D3D4] overflow-hidden">
            <div className="p-5 bg-[#10069F] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#FFA400]" />
                <h3 className="font-bold text-lg">
                  {language === 'EN' ? 'Check Pension Status' : 'Semak Status Penyata Pencen'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  setStatusResult(null);
                  setIcNumber('');
                }}
                className="text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-[#101820]/75">
                {language === 'EN'
                  ? 'Enter your 12-digit Malaysian MyKad number (e.g. 510412-10-5231) to view immediate disbursement records.'
                  : 'Masukkan nombor MyKad 12 digit anda (contohnya 510412-10-5231) untuk melihat rekod pengkreditan terkini.'}
              </p>

              <form onSubmit={handleStatusSearch} className="space-y-4">
                <div>
                  <label htmlFor="ic-input" className="block text-xs font-bold uppercase text-[#10069F] mb-1">
                    {language === 'EN' ? 'MyKad Number' : 'Nombor MyKad'}
                  </label>
                  <input
                    id="ic-input"
                    type="text"
                    required
                    value={icNumber}
                    onChange={(e) => setIcNumber(e.target.value)}
                    placeholder="e.g. 510412-10-5231"
                    className="w-full h-12 px-4 border border-[#D0D3D4] rounded-md text-base text-[#101820] focus:border-[#10069F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] bg-[#10069F] text-white font-bold text-base rounded-md hover:bg-[#0c0580] transition-colors"
                >
                  {language === 'EN' ? 'Verify & View Status' : 'Sahkan & Semak Rekod'}
                </button>
              </form>

              {statusResult && (
                <div className="mt-4 p-4 bg-[#EAF3FB] border border-[#6CACE4] rounded-lg space-y-2 text-sm animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-[#D0D3D4]">
                    <span className="font-bold text-[#10069F]">{statusResult.name}</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      {statusResult.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#101820]/70">
                    <strong className="text-[#101820]">{language === 'EN' ? 'Next Credit:' : 'Kredit Seterusnya:'}</strong>{' '}
                    {statusResult.nextPaymentDate}
                  </div>
                  <div className="text-xs text-[#101820]/70">
                    <strong className="text-[#101820]">{language === 'EN' ? 'Disbursement Amount:' : 'Jumlah Bulanan:'}</strong>{' '}
                    <span className="font-bold text-[#10069F] text-sm">{statusResult.monthlyAmount}</span>
                  </div>
                  <div className="text-xs text-[#101820]/70">
                    <strong className="text-[#101820]">{language === 'EN' ? 'Crediting Bank:' : 'Bank Penerima:'}</strong>{' '}
                    {statusResult.bankName}
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => alert(language === 'EN' ? 'Downloading pension slip PDF...' : 'Memuat turun slip penyata pencen PDF...')}
                      className="text-xs font-bold text-[#10069F] underline"
                    >
                      {language === 'EN' ? 'Download Latest Payslip (PDF) ↓' : 'Muat Turun Slip Pencen Terkini (PDF) ↓'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. RETIREMENT ESTIMATOR CALCULATOR MODAL */}
      {activeModal === 'plan' && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full border border-[#D0D3D4] overflow-hidden">
            <div className="p-5 bg-[#10069F] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#FFA400]" />
                <h3 className="font-bold text-lg">
                  {language === 'EN' ? 'Retirement Pension Estimator' : 'Kalkulator Anggaran Pencen'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-xs text-[#101820]/75">
                {language === 'EN'
                  ? 'Calculate prospective civil service pension benefits based on statutory Act 227 formulas for preliminary retirement planning.'
                  : 'Anggarkan faedah persaraan perkhidmatan awam berdasarkan formula Akta 227 untuk perancangan persaraan.'}
              </p>

              <div>
                <label className="block text-xs font-bold uppercase text-[#10069F] mb-1">
                  {language === 'EN' ? 'Last Drawn Basic Salary (RM)' : 'Gaji Pokok Akhir (RM)'}
                </label>
                <input
                  type="number"
                  min="1500"
                  max="30000"
                  step="100"
                  value={lastDrawnSalary}
                  onChange={(e) => setLastDrawnSalary(Number(e.target.value))}
                  className="w-full h-11 px-3 border border-[#D0D3D4] rounded-md text-base font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#10069F] mb-1">
                  {language === 'EN' ? `Total Service: ${Math.floor(monthsOfService / 12)} Years (${monthsOfService} Months)` : `Tempoh Perkhidmatan: ${Math.floor(monthsOfService / 12)} Tahun (${monthsOfService} Bulan)`}
                </label>
                <input
                  type="range"
                  min="120"
                  max="420"
                  step="12"
                  value={monthsOfService}
                  onChange={(e) => setMonthsOfService(Number(e.target.value))}
                  className="w-full accent-[#10069F]"
                />
              </div>

              <div className="p-4 bg-[#EAF3FB] border border-[#6CACE4] rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#101820]/80">
                    {language === 'EN' ? 'Estimated Monthly Pension:' : 'Anggaran Pencen Bulanan:'}
                  </span>
                  <span className="text-xl font-extrabold text-[#10069F] tabular-nums">
                    RM {estimatedMonthlyPension.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#101820]/80">
                    {language === 'EN' ? 'Estimated Service Gratuity:' : 'Anggaran Ganjaran Perkhidmatan:'}
                  </span>
                  <span className="text-lg font-bold text-[#101820] tabular-nums">
                    RM {estimatedGratuity.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-[#101820]/60 italic pt-1 border-t border-[#D0D3D4]">
                  * {language === 'EN' ? 'Subject to final verification by the Public Service Department (JPA).' : 'Tertakluk kepada pengesahan muktamad Bahagian Pasca Perkhidmatan JPA.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-full min-h-[46px] bg-[#FFA400] text-[#101820] font-bold text-sm rounded-md"
              >
                {language === 'EN' ? 'Close Estimator' : 'Tutup Kalkulator'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. FORMS DOWNLOAD MODAL */}
      {(activeModal === 'forms' || activeModal === 'update' || activeModal === 'beneficiary') && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full border border-[#D0D3D4] overflow-hidden">
            <div className="p-5 bg-[#10069F] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileDown className="w-5 h-5 text-[#FFA400]" />
                <h3 className="font-bold text-lg">
                  {language === 'EN' ? 'Official Forms & Documentation' : 'Borang & Dokumen Rasmi'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-[#101820]/75">
                {language === 'EN'
                  ? 'All forms are official JPA and KWAP statutory PDF templates. Print, sign, and mail or deliver to our service counter.'
                  : 'Semua borang adalah templat rasmi statutori JPA dan KWAP dalam format PDF. Cetak, tandatangan, dan hantar ke kaunter khidmat kami.'}
              </p>

              <div className="space-y-2.5">
                {[
                  { code: 'JPA.BP.SKP.B01b', title: 'Borang Pertukaran Akaun Bank Pembayaran Pencen', size: '184 KB' },
                  { code: 'JPA.BP.UMUM.B04', title: 'Permohonan Faedah Pencen Terbitan (Balu / Duda)', size: '290 KB' },
                  { code: 'KWAP-OPS-03', title: 'Surat Akuan Pengesahan Hayat Pesara Luar Negara', size: '142 KB' },
                  { code: 'KWAP-GRAT-2026', title: 'Borang Arahan Pembayaran Ganjaran Perkhidmatan', size: '210 KB' }
                ].map((form) => (
                  <div key={form.code} className="p-3 bg-[#EAF3FB] rounded-md flex items-center justify-between hover:bg-[#EAF3FB]/80">
                    <div>
                      <div className="text-xs font-bold text-[#10069F]">{form.code}</div>
                      <div className="text-xs text-[#101820] font-medium">{form.title}</div>
                      <div className="text-[10px] text-[#101820]/60">{form.size} · PDF</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Simulating download of ${form.code} PDF`)}
                      className="px-3 py-1.5 bg-[#10069F] text-white font-bold text-xs rounded hover:bg-[#0c0580]"
                    >
                      {language === 'EN' ? 'Download' : 'Muat Turun'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full min-h-[44px] bg-[#FFA400] text-[#101820] font-bold text-sm rounded-md"
                >
                  {language === 'EN' ? 'Close Window' : 'Tutup Tetingkap'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MYPESARA APP MODAL */}
      {activeModal === 'mypesara' && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full border border-[#D0D3D4] overflow-hidden text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EAF3FB] text-[#10069F] flex items-center justify-center mx-auto">
              <Smartphone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#101820]">
              {language === 'EN' ? 'MyPesara Mobile Application' : 'Aplikasi Mudah Alih MyPesara'}
            </h3>
            <p className="text-sm text-[#101820]/75 leading-relaxed">
              {language === 'EN'
                ? 'Available on the Apple App Store, Google Play Store, and Huawei AppGallery. Download free to manage your pension on your phone.'
                : 'Tersedia di Apple App Store, Google Play Store, dan Huawei AppGallery. Muat turun percuma untuk kemudahan semakan pencen anda.'}
            </p>
            <div className="p-4 bg-[#EAF3FB] rounded-lg">
              <span className="text-xs font-semibold text-[#10069F] block mb-1">
                Version 3.2 · Verified Secure
              </span>
              <span className="text-xs text-[#101820]/70">
                Requires iOS 14+ or Android 8.0+
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full min-h-[46px] bg-[#10069F] text-white font-bold text-sm rounded-md hover:bg-[#0c0580]"
            >
              {language === 'EN' ? 'Done' : 'Selesai'}
            </button>
          </div>
        </div>
      )}

      {/* HTML Licence Record Comment Block */}
      {/*
        =============================================================================
        KWAP PROTOTYPE PHOTO LICENCE RECORDS: PENSIONER SERVICES
        - Banner Couple: Vince Fleming (https://unsplash.com/@vincefleming) - photo-1581579438747-1dc8d17bbce4
        =============================================================================
      */}
    </div>
  );
};
