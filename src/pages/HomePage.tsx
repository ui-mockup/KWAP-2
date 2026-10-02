import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Users,
  ShieldCheck,
  Calendar,
  FileText,
  Download,
  BookOpen,
  Smartphone,
  Radio,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Landmark
} from 'lucide-react';
import { Language, PageId, PersonaId } from '../types';
import { PERSONA_DATA, POPULAR_TOPICS, NEWS_ITEMS } from '../data/content';

interface HomePageProps {
  language: Language;
  activePersona: PersonaId;
  onSelectPersona: (persona: PersonaId) => void;
  onNavigate: (page: PageId, persona?: PersonaId, anchor?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  activePersona,
  onSelectPersona,
  onNavigate
}) => {
  const persona = PERSONA_DATA[activePersona] || PERSONA_DATA.pensioners;

  // News horizontal scroll container ref
  const newsRailRef = useRef<HTMLDivElement>(null);

  // Performance trend interactive year state
  const [selectedTrendYear, setSelectedTrendYear] = useState<number>(2025);

  const trendData = [
    { year: 2021, returnRate: 6.1, aum: 158.2, x: 50, y: 130 },
    { year: 2022, returnRate: 5.8, aum: 164.5, x: 200, y: 140 },
    { year: 2023, returnRate: 6.9, aum: 172.8, x: 350, y: 95 },
    { year: 2024, returnRate: 6.5, aum: 178.4, x: 500, y: 110 },
    { year: 2025, returnRate: 7.2, aum: 184.5, x: 650, y: 70 }
  ];

  const scrollNews = (direction: 'left' | 'right') => {
    if (newsRailRef.current) {
      const scrollAmount = 360;
      newsRailRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return FileText;
      case 'Calendar': return Calendar;
      case 'Download': return Download;
      case 'BookOpen': return BookOpen;
      case 'Smartphone': return Smartphone;
      case 'Radio': return Radio;
      case 'MapPin': return MapPin;
      default: return FileText;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* SECTION 1: HERO WITH AUDIENCE TABS & FULL-BLEED UNSPLASH PHOTO */}
      <section
        id="hero-section"
        className="relative bg-[#10069F] text-white min-h-[580px] lg:min-h-[640px] flex flex-col justify-center"
        aria-label={language === 'EN' ? 'Hero introduction' : 'Pengenalan utama'}
      >
        {/* Full-bleed Photographic Background with Verified Unsplash URL & Fallback */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={persona.heroImage}
            alt={persona.imageAlt}
            width={1600}
            height={900}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Gradient Scrim for WCAG AA readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#10069F]/95 via-[#10069F]/85 to-[#10069F]/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10069F] via-transparent to-black/30" />
          {/* Subtle KWAP Diamond Graphic Device Watermark (horizontal, opacity 8%) */}
          <div className="absolute inset-0 kwap-diamond-pattern pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full flex flex-col justify-center">
          {/* Main Headline & Supporting Text (Vertically Centered) */}
          <div className="max-w-3xl space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              {persona.headline[language]}
            </h1>

            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl font-normal">
              {persona.subtext[language]}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate(persona.primaryCta.page, activePersona, persona.primaryCta.anchor)}
                className="min-h-[50px] px-6 py-3 bg-[#FFA400] text-[#101820] font-bold text-base rounded-md hover:bg-[#f39c00] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg"
              >
                <span>{persona.primaryCta.text[language]}</span>
                <ArrowRight className="w-5 h-5 text-[#101820]" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STAT TILES OVERLAPPING HERO BOTTOM EDGE (PNB Reference Style) */}
      <section
        className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label={language === 'EN' ? 'Key statutory figures' : 'Statistik statutori utama'}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Tile 1: Total Fund Size */}
          <div className="bg-white rounded-lg p-6 shadow-xl border border-[#D0D3D4] flex flex-col hover:translate-y-[-2px] transition-transform group">
            {/* [icon] */}
            <div className="text-[#10069F] mb-3">
              <Landmark className="w-8 h-8" strokeWidth={1.75} aria-hidden="true" />
            </div>
            {/* title */}
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#10069F] font-['Google_Sans',sans-serif]">
              {language === 'EN' ? 'Total Fund Size (AUM)' : 'Saiz Dana Keseluruhan (AUM)'}
            </h3>
            {/* data */}
            <div className="text-3xl sm:text-4xl font-extrabold text-[#101820] tracking-tight tabular-nums mt-2">
              RM 184.5B
            </div>
            {/* description */}
            <p className="mt-2 text-sm text-[#101820]/70 flex items-center justify-between">
              <span>{language === 'EN' ? '+5.4% YoY Growth' : '+5.4% Pertumbuhan Tahunan'}</span>
              <span className="text-xs font-semibold text-[#10069F]">FY 2025</span>
            </p>
          </div>

          {/* Tile 2: Pensioners Served */}
          <div className="bg-white rounded-lg p-6 shadow-xl border border-[#D0D3D4] flex flex-col hover:translate-y-[-2px] transition-transform group">
            {/* [icon] */}
            <div className="text-[#10069F] mb-3">
              <Users className="w-8 h-8" strokeWidth={1.75} aria-hidden="true" />
            </div>
            {/* title */}
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#10069F] font-['Google_Sans',sans-serif]">
              {language === 'EN' ? 'Pensioners & Beneficiaries' : 'Pesara & Penerima Manfaat'}
            </h3>
            {/* data */}
            <div className="text-3xl sm:text-4xl font-extrabold text-[#101820] tracking-tight tabular-nums mt-2">
              790,000+
            </div>
            {/* description */}
            <p className="mt-2 text-sm text-[#101820]/70 flex items-center justify-between">
              <span>{language === 'EN' ? 'Civil Service Retirees' : 'Pesara Perkhidmatan Awam'}</span>
              <span className="text-xs font-semibold text-[#10069F]">Peninsular & Borneo</span>
            </p>
          </div>

          {/* Tile 3: Net Investment Return */}
          <div className="bg-white rounded-lg p-6 shadow-xl border border-[#D0D3D4] flex flex-col hover:translate-y-[-2px] transition-transform group">
            {/* [icon] */}
            <div className="text-[#10069F] mb-3">
              <TrendingUp className="w-8 h-8" strokeWidth={1.75} aria-hidden="true" />
            </div>
            {/* title */}
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#10069F] font-['Google_Sans',sans-serif]">
              {language === 'EN' ? 'Net Investment Return' : 'Pulangan Bersih Pelaburan'}
            </h3>
            {/* data */}
            <div className="text-3xl sm:text-4xl font-extrabold text-[#101820] tracking-tight tabular-nums mt-2 flex items-baseline gap-2">
              <span>7.2%</span>
              <span className="text-sm font-semibold text-emerald-700">▲ 0.7%</span>
            </div>
            {/* description */}
            <p className="mt-2 text-sm text-[#101820]/70 flex items-center justify-between">
              <span>{language === 'EN' ? 'Multi-Asset Solvency' : 'Solvabiliti Pelbagai Aset'}</span>
              <span className="text-xs font-semibold text-[#10069F]">10-Yr Avg: 6.8%</span>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: "WHAT BRINGS YOU HERE TODAY?" FOUR PERSONA CARDS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101820]">
            {language === 'EN' ? 'What brings you here today?' : 'Apakah tujuan kunjungan anda hari ini?'}
          </h2>
          <p className="text-base text-[#101820]/70 mt-2">
            {language === 'EN'
              ? 'Select your audience path for immediate access to specialized services, statutory guidance, and reports.'
              : 'Pilih kategori anda untuk capaian pantas kepada perkhidmatan khusus, panduan statutori, dan laporan.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Persona Card 1: Pensioners */}
          <div
            onClick={() => onNavigate('services', 'pensioners')}
            className="group bg-white rounded-lg border border-[#D0D3D4] overflow-hidden hover:border-[#10069F] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative bg-[#EAF3FB]">
              <img
                src="https://images.unsplash.com/photo-1758691031749-607d43c14f63?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb"
                alt="Pensioner couple smiling together"
                width={600}
                height={350}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#101820] group-hover:text-[#10069F] transition-colors">
                  {language === 'EN' ? 'Pensioners & Retirees' : 'Pesara & Bakal Pesara'}
                </h3>
                <p className="text-sm text-[#101820]/70 mt-2 leading-relaxed">
                  {language === 'EN'
                    ? 'Check pension payment dates, download monthly slips, and update recipient bank accounts.'
                    : 'Semak tarikh bayaran bulanan, muat turun penyata pencen, dan kemas kini akaun bank.'}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D0D3D4]/50 flex items-center justify-between text-sm font-bold text-[#10069F]">
                <span>{language === 'EN' ? 'Explore Services' : 'Lihat Khidmat'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Persona Card 2: Government */}
          <div
            onClick={() => onNavigate('services', 'government')}
            className="group bg-white rounded-lg border border-[#D0D3D4] overflow-hidden hover:border-[#10069F] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative bg-[#EAF3FB]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=75"
                alt="Government administrator reviewing civil service records"
                width={600}
                height={350}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#101820] group-hover:text-[#10069F] transition-colors">
                  {language === 'EN' ? 'Government & Employers' : 'Kerajaan & Majikan'}
                </h3>
                <p className="text-sm text-[#101820]/70 mt-2 leading-relaxed">
                  {language === 'EN'
                    ? 'Statutory employer contributions, actuarial verification data, and ministry remittances.'
                    : 'Pengurusan caruman majikan statutori, pengesahan aktuari, dan kiriman kementerian.'}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D0D3D4]/50 flex items-center justify-between text-sm font-bold text-[#10069F]">
                <span>{language === 'EN' ? 'Agency Portal' : 'Portal Agensi'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Persona Card 3: Investment & Market */}
          <div
            onClick={() => onNavigate('investment')}
            className="group bg-white rounded-lg border border-[#D0D3D4] overflow-hidden hover:border-[#10069F] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative bg-[#EAF3FB]">
              <img
                src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=75"
                alt="Kuala Lumpur financial center high-rises"
                width={600}
                height={350}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#101820] group-hover:text-[#10069F] transition-colors">
                  {language === 'EN' ? 'Investment & Market' : 'Pelaburan & Pasaran'}
                </h3>
                <p className="text-sm text-[#101820]/70 mt-2 leading-relaxed">
                  {language === 'EN'
                    ? 'Explore multi-asset allocation, sustainable ESG leadership, and audited annual reports.'
                    : 'Terokai pengagihan aset pelbagai kelas, tadbir urus ESG, dan laporan tahunan diaudit.'}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D0D3D4]/50 flex items-center justify-between text-sm font-bold text-[#10069F]">
                <span>{language === 'EN' ? 'Portfolio Performance' : 'Prestasi Portfolio'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Persona Card 4: Society & Nation */}
          <div
            onClick={() => onNavigate('newsroom')}
            className="group bg-white rounded-lg border border-[#D0D3D4] overflow-hidden hover:border-[#10069F] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative bg-[#EAF3FB]">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=75"
                alt="Malaysian community gathering"
                width={600}
                height={350}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#101820] group-hover:text-[#10069F] transition-colors">
                  {language === 'EN' ? 'Society & Community' : 'Masyarakat & Komuniti'}
                </h3>
                <p className="text-sm text-[#101820]/70 mt-2 leading-relaxed">
                  {language === 'EN'
                    ? 'Active aging empowerment programmes, senior wellness grants, and public procurement tenders.'
                    : 'Program penuaan aktif, geran kesejahteraan pesara, dan tawaran tender perolehan awam.'}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D0D3D4]/50 flex items-center justify-between text-sm font-bold text-[#10069F]">
                <span>{language === 'EN' ? 'Community News' : 'Berita Komuniti'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: POPULAR TOPICS ICON CHIPS (Quick Access Tasks) */}
      <section className="bg-[#EAF3FB] py-14 border-y border-[#D0D3D4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#101820]">
                {language === 'EN' ? 'Popular Topics & Tasks' : 'Topik & Urusan Paling Kerap'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="text-sm font-bold text-[#10069F] hover:underline inline-flex items-center gap-1.5"
            >
              <span>{language === 'EN' ? 'View all service guides' : 'Lihat semua panduan'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {POPULAR_TOPICS.map((topic) => {
              const IconComponent = getTopicIcon(topic.icon);
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => onNavigate(topic.page)}
                  className="min-h-[110px] p-4 bg-white rounded-lg border border-[#D0D3D4] hover:border-[#10069F] hover:shadow-md transition-all flex flex-col items-center text-center justify-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#EAF3FB] group-hover:bg-[#10069F] text-[#10069F] group-hover:text-white flex items-center justify-center transition-colors mb-2.5">
                    <IconComponent className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <span className="text-xs font-bold text-[#101820] leading-snug group-hover:text-[#10069F]">
                    {topic.label[language]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: "OUR PERFORMANCE" SOLID BLUE BAND WITH ANIMATED TREND LINE (Khazanah / Future Fund Reference) */}
      <section
        className="bg-[#10069F] text-white py-20 relative overflow-hidden"
        aria-label={language === 'EN' ? 'Performance Band' : 'Prestasi Pelaburan'}
      >
        <div className="absolute inset-0 kwap-diamond-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {language === 'EN' ? 'Our Institutional Performance' : 'Prestasi Institusi Kami'}
              </h2>
              <p className="text-base text-white/80 mt-2 max-w-xl">
                {language === 'EN'
                  ? 'Consistent compounding across five-year strategic cycles, ensuring sustainable solvency buffers for Malaysia’s civil service pension obligations.'
                  : 'Pertumbuhan konsisten merentasi kitaran strategik lima tahun, memastikan solvabiliti mampan bagi komitmen pencen perkhidmatan awam Malaysia.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('investment')}
              className="min-h-[48px] px-5 py-2.5 bg-[#FFA400] text-[#101820] font-bold text-sm rounded-md hover:bg-[#f39c00] active:scale-[0.98] transition-all self-start lg:self-auto flex items-center gap-2"
            >
              <span>{language === 'EN' ? 'Full Investment Breakdown' : 'Perincian Pelaburan Lengkap'}</span>
              <ArrowRight className="w-4 h-4 text-[#101820]" strokeWidth={1.75} />
            </button>
          </div>

          {/* Four Large Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-white/20">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#6CACE4]">
                {language === 'EN' ? '10-Yr Return Avg' : 'Purata Pulangan 10-Tahun'}
              </div>
              <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1 tabular-nums">
                6.8%
              </div>
              <div className="text-xs text-white/70 mt-1">
                {language === 'EN' ? 'Benchmark: 5.0% Inflation + GDP' : 'Penanda Aras: 5.0% Inflasi + KDNK'}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#6CACE4]">
                {language === 'EN' ? 'Fixed Income Resilience' : 'Pendapatan Tetap'}
              </div>
              <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1 tabular-nums">
                35.0%
              </div>
              <div className="text-xs text-white/70 mt-1">
                {language === 'EN' ? 'High-grade sovereign bonds' : 'Sekuriti berdaulat gred tinggi'}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#6CACE4]">
                {language === 'EN' ? 'ESG Portfolio Share' : 'Saringan ESG'}
              </div>
              <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1 tabular-nums">
                28.4%
              </div>
              <div className="text-xs text-white/70 mt-1">
                {language === 'EN' ? 'Target: 30% by 2027' : 'Sasaran: 30% menjelang 2027'}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#6CACE4]">
                {language === 'EN' ? 'Direct Pension Disbursements' : 'Bayaran Pencen Tahunan'}
              </div>
              <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1 tabular-nums">
                RM 24.2B
              </div>
              <div className="text-xs text-white/70 mt-1">
                {language === 'EN' ? 'Disbursed punctually monthly' : 'Dikredit tepat setiap bulan'}
              </div>
            </div>
          </div>

          {/* Interactive Trend Chart (SVG) */}
          <div className="pt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#FFA400]" />
                {language === 'EN'
                  ? 'Historical Net Return Trajectory (% p.a.)'
                  : 'Trajektori Pulangan Pelaburan Tahunan (% setahun)'}
              </span>
              <span className="text-xs text-white/60">
                {language === 'EN'
                  ? 'Click points to view annual fund size and returns'
                  : 'Klik titik untuk lihat saiz dana dan pulangan tahunan'}
              </span>
            </div>

            {/* SVG Trend line visualization */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <svg viewBox="0 0 700 200" className="w-full h-44 overflow-visible" role="img" aria-label="Investment return chart">
                {/* Horizontal grid lines */}
                <line x1="40" y1="40" x2="680" y2="40" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
                <line x1="40" y1="90" x2="680" y2="90" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
                <line x1="40" y1="140" x2="680" y2="140" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />

                {/* Return rate labels */}
                <text x="15" y="44" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">8%</text>
                <text x="15" y="94" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">7%</text>
                <text x="15" y="144" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">6%</text>

                {/* Trend line path */}
                <path
                  d="M 50 130 Q 120 145, 200 140 T 350 95 T 500 110 T 650 70"
                  fill="none"
                  stroke="#FFA400"
                  strokeWidth="3.5"
                  className="transition-all duration-700"
                />

                {/* Gradient area beneath path */}
                <path
                  d="M 50 130 Q 120 145, 200 140 T 350 95 T 500 110 T 650 70 L 650 180 L 50 180 Z"
                  fill="url(#trend-gradient)"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="trend-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFA400" />
                    <stop offset="100%" stopColor="#10069F" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Data points */}
                {trendData.map((d) => {
                  const isSelected = selectedTrendYear === d.year;
                  return (
                    <g key={d.year} onClick={() => setSelectedTrendYear(d.year)} className="cursor-pointer">
                      <circle
                        cx={d.x}
                        cy={d.y}
                        r={isSelected ? '8' : '5'}
                        fill={isSelected ? '#FFFFFF' : '#FFA400'}
                        stroke="#10069F"
                        strokeWidth="2.5"
                        className="transition-all hover:scale-125"
                      />
                      <text
                        x={d.x}
                        y={d.y - 14}
                        fill="#FFFFFF"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {d.returnRate}%
                      </text>
                      <text
                        x={d.x}
                        y="195"
                        fill="rgba(255,255,255,0.8)"
                        fontSize="12"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        {d.year}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Selected Year Detail Callout */}
              <div className="mt-4 p-3 bg-white/10 rounded-md flex flex-wrap items-center justify-between text-xs text-white">
                <div>
                  <span className="font-bold text-[#FFA400] mr-2">{selectedTrendYear}:</span>
                  <span>
                    {language === 'EN'
                      ? `Fund AUM grew to RM ${trendData.find((d) => d.year === selectedTrendYear)?.aum}B with a verified net yield of ${trendData.find((d) => d.year === selectedTrendYear)?.returnRate}%.`
                      : `AUM dana meningkat kepada RM ${trendData.find((d) => d.year === selectedTrendYear)?.aum}B dengan pulangan bersih ${trendData.find((d) => d.year === selectedTrendYear)?.returnRate}%.`}
                  </span>
                </div>
                <span className="text-white/60 text-[11px]">Source: KWAP Actuarial Registry</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: NEWSROOM HORIZONTAL SNAP-SCROLL RAIL (Official Communications) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101820]">
              {language === 'EN' ? 'Latest from KWAP Newsroom' : 'Terkini dari Pusat Berita KWAP'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollNews('left')}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md border border-[#D0D3D4] bg-white text-[#10069F] hover:bg-[#EAF3FB] transition-colors"
              aria-label={language === 'EN' ? 'Previous news cards' : 'Kad berita sebelumnya'}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollNews('right')}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md border border-[#D0D3D4] bg-white text-[#10069F] hover:bg-[#EAF3FB] transition-colors"
              aria-label={language === 'EN' ? 'Next news cards' : 'Kad berita seterusnya'}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('newsroom')}
              className="min-h-[44px] px-4 bg-[#EAF3FB] hover:bg-[#10069F] hover:text-white text-[#10069F] text-xs font-bold rounded-md transition-colors flex items-center gap-1.5 ml-2"
            >
              <span>{language === 'EN' ? 'View All News' : 'Lihat Semua Berita'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Snap-scroll rail */}
        <div
          ref={newsRailRef}
          className="flex space-x-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar"
        >
          {NEWS_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('newsroom')}
              className="min-w-[300px] sm:min-w-[360px] max-w-[360px] snap-start bg-white rounded-lg border border-[#D0D3D4] overflow-hidden hover:border-[#10069F] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between shrink-0 group"
            >
              <div className="h-48 overflow-hidden relative bg-[#EAF3FB]">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  width={400}
                  height={240}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#101820]/60 font-medium mb-2">
                    {item.date}
                  </div>
                  <h3 className="text-base font-bold text-[#101820] group-hover:text-[#10069F] line-clamp-2 transition-colors">
                    {item.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#101820]/70 mt-2 line-clamp-2 leading-relaxed">
                    {item.summary[language]}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#D0D3D4]/50 flex items-center justify-between text-xs font-bold text-[#10069F]">
                  <span>{language === 'EN' ? 'Read article' : 'Baca artikel'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: MYPESARA APP SECTION (Recreated based on Figma reference design) */}
      <section className="w-full relative overflow-hidden bg-[#10141D] text-white py-16 sm:py-20 lg:py-24 min-h-[500px] lg:min-h-[560px] flex items-center">
        {/* Soft subtle radial ambient glow behind phone on the right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headline, Description, 4 Features & 3 App Buttons */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.18] tracking-tight">
                {language === 'EN' ? (
                  <>
                    MyPesara in your pocket. Dignified,<br className="hidden sm:inline" /> simple &amp; safe.
                  </>
                ) : (
                  <>
                    MyPesara di genggaman anda. Mesra,<br className="hidden sm:inline" /> mudah &amp; selamat.
                  </>
                )}
              </h2>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl font-normal">
                {language === 'EN'
                  ? 'Carry your official Digital Pensioner Card, view monthly payslips without visiting counters, receive discount privileges across Malaysia, and complete life certification with ease.'
                  : 'Bawa Kad Pesara Digital rasmi anda, semak penyata pencen bulanan tanpa ke kaunter, nikmati keistimewaan diskaun di seluruh Malaysia, dan sahkan hayat secara mudah.'}
              </p>

              {/* 4 Feature Points (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 pt-1 text-white font-medium text-[15px] sm:text-base">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFA400] shrink-0" />
                  <span>{language === 'EN' ? 'Instant payment notification' : 'Pemberitahuan kredit segera'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFA400] shrink-0" />
                  <span>{language === 'EN' ? 'Large text & elderly friendly' : 'Tulisan besar mesra warga emas'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFA400] shrink-0" />
                  <span>{language === 'EN' ? 'Digital pensioner discounts' : 'Diskaun kad pesara digital'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFA400] shrink-0" />
                  <span>{language === 'EN' ? 'Secure MyKad authentication' : 'Pengesahan MyKad selamat'}</span>
                </div>
              </div>

              {/* Action Buttons: Get MyPesara App + App Store + Google Play */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-3">
                <a
                  href="#mypesara-download"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('services', 'pensioners', 'mypesara');
                  }}
                  className="h-12 px-6 bg-[#FFA400] text-[#101820] font-bold text-sm sm:text-base rounded-md hover:bg-[#f39c00] active:scale-[0.98] transition-all inline-flex items-center gap-2.5 shadow-md shrink-0 cursor-pointer"
                >
                  <Download className="w-5 h-5 text-[#101820]" strokeWidth={2.2} />
                  <span>{language === 'EN' ? 'Get MyPesara App' : 'Muat Turun Aplikasi MyPesara'}</span>
                </a>

                <a
                  href="https://apps.apple.com/my/app/mypesara/id1450275815"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 inline-flex items-center hover:opacity-90 active:scale-[0.98] transition-all shrink-0"
                  aria-label="Download on the App Store"
                >
                  <img
                    src="/images/app-store.png"
                    alt="Download on the App Store"
                    className="h-12 w-auto object-contain rounded-md"
                  />
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=my.gov.kwap.mypesara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 inline-flex items-center hover:opacity-90 active:scale-[0.98] transition-all shrink-0"
                  aria-label="Get it on Google Play"
                >
                  <img
                    src="/images/google-play.png"
                    alt="Get it on Google Play"
                    className="h-12 w-auto object-contain rounded-md"
                  />
                </a>
              </div>
            </div>

            {/* Mobile/Tablet Phone Mockup (< lg) */}
            <div className="lg:hidden mt-8 -mb-20 flex justify-center overflow-hidden">
              <img
                src="/images/mockup-phone.png"
                alt="MyPesara Mobile Application Mockup"
                className="w-[130%] max-w-[560px] object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Desktop Phone Mockup (lg and above): Tuned to ~960px with natural bottom overflow */}
        <div className="hidden lg:block absolute -top-6 xl:-top-8 right-[-80px] xl:right-[-40px] 2xl:right-0 w-[860px] lg:w-[920px] xl:w-[960px] pointer-events-none select-none z-10">
          <img
            src="/images/mockup-phone.png"
            alt="MyPesara Mobile Application Mockup"
            className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
            loading="lazy"
          />
        </div>
      </section>

      {/* SECTION 8: RELATED ORGANISATIONS (Recreated based on reference design) */}
      <section className="bg-white py-16 sm:py-20 border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-xs sm:text-sm uppercase font-bold tracking-[0.16em] text-[#5A6B82]">
              {language === 'EN' ? 'Institutional Governance & Oversight' : 'Tadbir Urus & Pemantauan Statutori'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start text-center">
            {/* Ministry of Finance */}
            <a
              href="https://www.mof.gov.my"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center focus:outline-hidden focus:ring-2 focus:ring-[#10069F] rounded-lg p-2 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="h-20 sm:h-24 w-full flex items-center justify-center mb-4">
                <img
                  src="/images/mof.png"
                  alt="Ministry of Finance Malaysia"
                  className="max-h-20 sm:max-h-24 max-w-[180px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#10069F] tracking-wide uppercase leading-snug">
                {language === 'EN' ? 'Ministry of Finance' : 'Kementerian Kewangan'}
              </h3>
            </a>

            {/* Public Service Department */}
            <a
              href="https://www.jpa.gov.my"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center focus:outline-hidden focus:ring-2 focus:ring-[#10069F] rounded-lg p-2 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="h-20 sm:h-24 w-full flex items-center justify-center mb-4">
                <img
                  src="/images/jpa.png"
                  alt="Public Service Department Malaysia"
                  className="max-h-20 sm:max-h-24 max-w-[180px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#10069F] tracking-wide uppercase leading-snug">
                {language === 'EN' ? 'Public Service Department' : 'Jabatan Perkhidmatan Awam'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6B82] font-normal mt-1.5 leading-normal">
                {language === 'EN' ? 'Post-Service Division' : 'Bahagian Pasca Perkhidmatan'}
              </p>
            </a>

            {/* Accountant General Department */}
            <a
              href="https://www.anm.gov.my"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center focus:outline-hidden focus:ring-2 focus:ring-[#10069F] rounded-lg p-2 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="h-20 sm:h-24 w-full flex items-center justify-center mb-4">
                <img
                  src="/images/janm.png"
                  alt="Accountant General Department Malaysia"
                  className="max-h-20 sm:max-h-24 max-w-[180px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#10069F] tracking-wide uppercase leading-snug">
                {language === 'EN' ? 'Accountant General Department' : 'Jabatan Akauntan Negara'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6B82] font-normal mt-1.5 leading-normal">
                {language === 'EN' ? 'Disbursement Partner' : 'Rakan Pengkreditan'}
              </p>
            </a>

            {/* Central Bank of Malaysia */}
            <a
              href="https://www.bnm.gov.my"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center focus:outline-hidden focus:ring-2 focus:ring-[#10069F] rounded-lg p-2 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="h-20 sm:h-24 w-full flex items-center justify-center mb-4">
                <img
                  src="/images/bank-negara.png"
                  alt="Central Bank of Malaysia (Bank Negara Malaysia)"
                  className="max-h-20 sm:max-h-24 max-w-[180px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#10069F] tracking-wide uppercase leading-snug">
                {language === 'EN' ? 'Central Bank of Malaysia' : 'Bank Negara Malaysia'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6B82] font-normal mt-1.5 leading-normal">
                {language === 'EN' ? 'Disbursement Partner' : 'Rakan Pengkreditan'}
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Mandatory HTML Licence Record Comment Block */}
      {/*
        =============================================================================
        KWAP PROTOTYPE PHOTO LICENCE RECORDS: HOMEPAGE
        Compliant with Unsplash Free Commercial License.
        - Hero Image: Vince Fleming (https://unsplash.com/@vincefleming) - photo-1581579438747-1dc8d17bbce4
        - Persona Government: Izuddin Helmi (https://unsplash.com/@izuddinhelmi) - photo-1573496359142-b8d87734a5a2
        - Persona Investment: Esmonde Yong (https://unsplash.com/@esmonde_yong) - photo-1596422846543-75c6fc197f07
        - Persona Society: Naassom Azevedo (https://unsplash.com/@naassomz1) - photo-1529156069898-49953e39b3ac
        - App Section Senior: Centre for Ageing Better (https://unsplash.com/@ageing_better) - photo-1576765608535-5f04d1e3f289
        - News Story 1: Adeolu Eletu (https://unsplash.com/@adeolueletu) - photo-1454165804606-c3d57bc86b40
        - News Story 2: Eye for Ebony (https://unsplash.com/@eyeforebony) - photo-1544717305-2782549b5136
        - News Story 3: Matthew Bennett (https://unsplash.com/@matthew_t_r_bennett) - photo-1516585427167-9f4af9627e6c
        =============================================================================
      */}
    </div>
  );
};
