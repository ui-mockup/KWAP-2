import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Eye,
  Sparkles,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  RotateCcw,
  Send,
  HelpCircle,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { Language, PageId, PersonaId, AccessibilitySettings } from '../types';
import { KWAPLogo } from './KWAPLogo';
import { NAVIGATION_MENU, NavMenuSection } from '../data/navigationMenu';
import { MegaMenu } from './MegaMenu';
import { AccessibilityPopup } from './AccessibilityPopup';

interface HeaderProps {
  currentPage: PageId;
  activePersona: PersonaId;
  onNavigate: (page: PageId, persona?: PersonaId, anchor?: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  accessibility: AccessibilitySettings;
  onAccessibilityChange: (settings: Partial<AccessibilitySettings>) => void;
  onOpenSearch: (query?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  activePersona,
  onNavigate,
  language,
  onLanguageChange,
  accessibility,
  onAccessibilityChange,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');

  // Top Bar Custom Modals
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const accessibilityCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  // Close menus/modals on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMegaMenu(null);
        setAccessibilityOpen(false);
        setSitemapOpen(false);
        setFaqOpen(false);
        setFeedbackOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onOpenSearch(searchInput.trim());
      setSearchInput('');
      setActiveMegaMenu(null);
    }
  };

  const currentMegaSection = NAVIGATION_MENU.find((s) => s.id === activeMegaMenu && s.hasDropdown);

  return (
    <>
      {/* Skip Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-3 focus:bg-[#FFA400] focus:text-[#101820] focus:font-bold focus:shadow-xl focus:rounded-sm"
      >
        {language === 'EN' ? 'Skip to main content' : 'Langkau ke kandungan utama'}
      </a>

      {/* TOP UTILITY BAR (Matching user screenshot: Deep Royal Blue, EN/MS language toggle, and 5 custom uploaded PNG icons) */}
      <div
        className="bg-[#0c047d] text-white text-xs border-b border-white/10"
        role="region"
        aria-label={language === 'EN' ? 'Top utility bar' : 'Bar utiliti atas'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
          {/* Left: Official Tagline & Fund Identity */}
          <div className="flex items-center gap-2 text-white/90">
            <span className="font-semibold tracking-wide text-xs">
              {language === 'EN' ? 'Your Retirement Companion' : 'Teman Persaraan Anda'}
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden md:inline text-white/70 text-xs">
              {language === 'EN' ? 'Malaysia Public Service Pension Fund' : 'Kumpulan Wang Persaraan (Diperbadankan)'}
            </span>
          </div>

          {/* Right: Language switch + 5 Custom Uploaded PNG Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Language Selector: EN  MS */}
            <div
              className="flex items-center gap-2 font-bold text-xs tracking-wider"
              role="group"
              aria-label={language === 'EN' ? 'Language selector' : 'Pemilihan bahasa'}
            >
              <button
                type="button"
                onClick={() => onLanguageChange('EN')}
                className={`transition-colors cursor-pointer ${
                  language === 'EN'
                    ? 'text-white font-extrabold'
                    : 'text-white/60 hover:text-white font-medium'
                }`}
                aria-pressed={language === 'EN'}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('BM')}
                className={`transition-colors cursor-pointer ${
                  language === 'BM'
                    ? 'text-white font-extrabold'
                    : 'text-white/60 hover:text-white font-medium'
                }`}
                aria-pressed={language === 'BM'}
              >
                MS
              </button>
            </div>

            {/* Custom PNG Icons Cluster per user's design: FAQ, Contact Us, Feedback, Sitemap, W3C */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* 1. FAQ (faq.png) */}
              <button
                type="button"
                onClick={() => setFaqOpen(true)}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-colors p-0.5 cursor-pointer"
                title={language === 'EN' ? 'Frequently Asked Questions (FAQ)' : 'Soalan Lazim (FAQ)'}
                aria-label={language === 'EN' ? 'Frequently Asked Questions (FAQ)' : 'Soalan Lazim (FAQ)'}
              >
                <img
                  src="/faq.png"
                  alt="FAQ"
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain hover:scale-110 transition-transform"
                />
              </button>

              {/* 2. Contact Us (contact-us.png) */}
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-colors p-0.5 cursor-pointer"
                title={language === 'EN' ? 'Contact Us' : 'Hubungi Kami'}
                aria-label={language === 'EN' ? 'Contact Us' : 'Hubungi Kami'}
              >
                <img
                  src="/contact-us.png"
                  alt="Contact Us"
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain hover:scale-110 transition-transform"
                />
              </button>

              {/* 3. Feedback (feedback.png) */}
              <button
                type="button"
                onClick={() => {
                  setFeedbackSubmitted(false);
                  setFeedbackOpen(true);
                }}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-colors p-0.5 cursor-pointer"
                title={language === 'EN' ? 'Customer Feedback & Enquiries' : 'Maklum Balas & Pertanyaan'}
                aria-label={language === 'EN' ? 'Customer Feedback & Enquiries' : 'Maklum Balas & Pertanyaan'}
              >
                <img
                  src="/feedback.png"
                  alt="Feedback"
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain hover:scale-110 transition-transform"
                />
              </button>

              {/* 4. Sitemap (sitemap.png) */}
              <button
                type="button"
                onClick={() => setSitemapOpen(true)}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-colors p-0.5 cursor-pointer"
                title={language === 'EN' ? 'Site Map & Directory' : 'Peta Laman & Direktori'}
                aria-label={language === 'EN' ? 'Site Map & Directory' : 'Peta Laman & Direktori'}
              >
                <img
                  src="/sitemap.png"
                  alt="Sitemap"
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain hover:scale-110 transition-transform"
                />
              </button>

              {/* 5. W3C Accessibility (w3c.png) - Wheelchair icon with hover & click popup */}
              <div
                className="relative inline-block ml-1 sm:ml-2"
                onMouseEnter={() => {
                  if (accessibilityCloseTimeoutRef.current) {
                    clearTimeout(accessibilityCloseTimeoutRef.current);
                  }
                  setAccessibilityOpen(true);
                }}
                onMouseLeave={() => {
                  accessibilityCloseTimeoutRef.current = setTimeout(() => {
                    setAccessibilityOpen(false);
                  }, 300);
                }}
              >
                <button
                  type="button"
                  onClick={() => setAccessibilityOpen(prev => !prev)}
                  className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-colors p-0.5 cursor-pointer"
                  title={language === 'EN' ? 'W3C Accessibility Settings (Text Size, Contrast, Modes)' : 'Tetapan Kebolehcapaian W3C (Saiz Teks, Kontras, Mod)'}
                  aria-label={language === 'EN' ? 'W3C Accessibility Settings' : 'Tetapan Kebolehcapaian W3C'}
                  aria-haspopup="dialog"
                  aria-expanded={accessibilityOpen}
                >
                  <img
                    src="/w3c.png"
                    alt="W3C Accessibility"
                    width={22}
                    height={22}
                    className="w-5 h-5 object-contain hover:scale-110 transition-transform"
                  />
                </button>

                {/* Accessibility Popup appearing right next to wheelchair icon */}
                <AccessibilityPopup
                  isOpen={accessibilityOpen}
                  onClose={() => setAccessibilityOpen(false)}
                  onMouseEnter={() => {
                    if (accessibilityCloseTimeoutRef.current) {
                      clearTimeout(accessibilityCloseTimeoutRef.current);
                    }
                  }}
                  onMouseLeave={() => {
                    accessibilityCloseTimeoutRef.current = setTimeout(() => {
                      setAccessibilityOpen(false);
                    }, 300);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Glass Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D0D3D4] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo Link to Homepage with Clear-Space Guard */}
            <div className="shrink-0">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
                className="block focus-visible:outline-none"
                aria-label="KWAP Home"
              >
                <KWAPLogo />
              </a>
            </div>

            {/* Main Navigation (Uppercase Google Sans: HOME, CORPORATE, INVESTMENT, RETIREMENT, CONTRIBUTION) */}
            <nav
              className="hidden lg:flex items-center space-x-1"
              aria-label={language === 'EN' ? 'Main navigation' : 'Navigasi utama'}
            >
              {NAVIGATION_MENU.map((item) => {
                const isActive =
                  item.id === 'home'
                    ? currentPage === 'home'
                    : item.id === 'corporate'
                    ? currentPage === 'newsroom'
                    : item.id === 'investment'
                    ? currentPage === 'investment'
                    : item.id === 'retirement'
                    ? currentPage === 'services' && activePersona === 'pensioners'
                    : item.id === 'contribution'
                    ? currentPage === 'services' && activePersona === 'government'
                    : false;

                const isMegaOpen = activeMegaMenu === item.id;

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => {
                      if (item.hasDropdown) {
                        setActiveMegaMenu(item.id);
                      } else {
                        setActiveMegaMenu(null);
                      }
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMegaMenu(null);
                        onNavigate(item.page, item.persona, item.anchor);
                      }}
                      onFocus={() => {
                        if (item.hasDropdown) setActiveMegaMenu(item.id);
                        else setActiveMegaMenu(null);
                      }}
                      className={`min-h-[48px] px-3 py-2 text-[12px] uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap font-['Google_Sans',sans-serif] transition-colors ${
                        isActive || isMegaOpen
                          ? 'font-bold text-[#10069F]'
                          : 'font-normal text-[#101820] hover:text-[#10069F]'
                      }`}
                      aria-expanded={item.hasDropdown ? isMegaOpen : undefined}
                      aria-haspopup={item.hasDropdown ? 'true' : undefined}
                    >
                      <span>{item.label[language]}</span>
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            isMegaOpen ? 'rotate-180 text-[#10069F]' : 'text-[#101820]/50'
                          }`}
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </nav>

            {/* Always-Visible Search Box + Quick Services Link */}
            <div className="flex items-center gap-3">
              <form
                onSubmit={handleSearchSubmit}
                className="relative hidden sm:flex items-center"
                role="search"
              >
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={
                    language === 'EN'
                      ? 'Search pension, forms, news...'
                      : 'Cari pencen, borang, berita...'
                  }
                  className="w-48 md:w-64 h-11 pl-9 pr-3 text-sm bg-[#EAF3FB] border border-[#D0D3D4] rounded-md text-[#101820] placeholder:text-[#101820]/50 focus:bg-white focus:border-[#10069F] transition-all"
                  aria-label={language === 'EN' ? 'Search KWAP portal' : 'Cari portal KWAP'}
                />
                <Search
                  className="w-4 h-4 text-[#10069F] absolute left-3 pointer-events-none"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
              </form>

              {/* Mobile Search Button */}
              <button
                type="button"
                onClick={() => onOpenSearch()}
                className="sm:hidden min-w-[48px] min-h-[48px] flex items-center justify-center text-[#10069F] rounded-md hover:bg-[#EAF3FB]"
                aria-label={language === 'EN' ? 'Open search' : 'Buka carian'}
              >
                <Search className="w-5 h-5" strokeWidth={1.75} />
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden min-w-[48px] min-h-[48px] flex items-center justify-center text-[#10069F] rounded-md hover:bg-[#EAF3FB]"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" strokeWidth={1.75} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown (Desktop) */}
        {currentMegaSection && (
          <MegaMenu
            section={currentMegaSection}
            language={language}
            onNavigate={(page, persona, anchor) => {
              setActiveMegaMenu(null);
              onNavigate(page, persona, anchor);
            }}
            onClose={() => setActiveMegaMenu(null)}
          />
        )}

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#D0D3D4] px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-150 max-h-[85vh] overflow-y-auto">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={
                    language === 'EN'
                      ? 'Search pension, forms, reports...'
                      : 'Cari pencen, borang, laporan...'
                  }
                  className="w-full h-12 pl-10 pr-4 text-base bg-[#EAF3FB] border border-[#D0D3D4] rounded-md text-[#101820]"
                />
                <Search
                  className="w-5 h-5 text-[#10069F] absolute left-3 top-3.5 pointer-events-none"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
              </div>
            </form>

            <div className="font-bold text-xs uppercase tracking-wider text-[#10069F] mb-2 px-2 font-['Google_Sans',sans-serif]">
              {language === 'EN' ? 'Menu' : 'Menu Utama'}
            </div>

            {/* Hierarchical Accordion Navigation for Mobile */}
            <div className="space-y-1 mb-5">
              {NAVIGATION_MENU.map((item) => {
                const isActive =
                  item.id === 'home'
                    ? currentPage === 'home'
                    : item.id === 'corporate'
                    ? currentPage === 'newsroom'
                    : item.id === 'investment'
                    ? currentPage === 'investment'
                    : item.id === 'retirement'
                    ? currentPage === 'services' && activePersona === 'pensioners'
                    : item.id === 'contribution'
                    ? currentPage === 'services' && activePersona === 'government'
                    : false;

                const isExpanded = mobileExpandedSection === item.id;

                if (!item.hasDropdown) {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate(item.page);
                      }}
                      className={`w-full min-h-[44px] px-3 py-2 flex items-center justify-between text-[12px] uppercase tracking-wider font-['Google_Sans',sans-serif] transition-colors ${
                        isActive
                          ? 'font-bold text-[#10069F]'
                          : 'font-normal text-[#101820] hover:text-[#10069F]'
                      }`}
                    >
                      <span>{item.label[language]}</span>
                      <ArrowRight className="w-4 h-4 text-[#D0D3D4]" strokeWidth={1.75} />
                    </button>
                  );
                }

                return (
                  <div key={item.id} className="border-b border-[#D0D3D4]/40 last:border-b-0 pb-1">
                    <button
                      type="button"
                      onClick={() => setMobileExpandedSection(isExpanded ? null : item.id)}
                      className={`w-full min-h-[44px] px-3 py-2 flex items-center justify-between text-[12px] uppercase tracking-wider font-['Google_Sans',sans-serif] transition-colors ${
                        isActive || isExpanded
                          ? 'font-bold text-[#10069F]'
                          : 'font-normal text-[#101820] hover:text-[#10069F]'
                      }`}
                      aria-expanded={isExpanded}
                    >
                      <span>{item.label[language]}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#10069F] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Accordion Sub-Tree */}
                    {isExpanded && item.groups && (
                      <div className="pl-4 pr-2 py-2 space-y-4 bg-[#EAF3FB]/40 rounded-md my-1 text-left">
                        {item.groups.map((grp) => (
                          <div key={grp.id} className="space-y-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#10069F] block">
                              {grp.title[language]}
                            </span>
                            {grp.items && (
                              <div className="space-y-1 pl-2 border-l border-[#6CACE4]/40">
                                {grp.items.map((sub) => (
                                  <button
                                    key={sub.id}
                                    type="button"
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      onNavigate(sub.page, sub.persona, sub.anchor);
                                    }}
                                    className="w-full text-left py-1 text-xs text-[#101820] hover:text-[#10069F] flex items-center justify-between"
                                  >
                                    <span>{sub.label[language]}</span>
                                    {sub.badge && (
                                      <span className="text-[9px] uppercase px-1 rounded-xs bg-[#EAF3FB] text-[#10069F] font-bold border border-[#6CACE4]/30">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}

                        <div className="pt-2 border-t border-[#D0D3D4]/60">
                          <button
                            type="button"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              onNavigate(item.page, item.persona, item.anchor);
                            }}
                            className="text-xs font-bold text-[#10069F] flex items-center gap-1 hover:underline"
                          >
                            <span>{language === 'EN' ? `Go to ${item.label.EN} Hub` : `Pergi ke Pusat ${item.label.BM}`}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#D0D3D4]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('contact');
                }}
                className="w-full min-h-[50px] bg-[#10069F] text-white font-bold text-sm uppercase tracking-wider font-['Google_Sans',sans-serif] rounded-md flex items-center justify-center gap-2"
              >
                <span>{language === 'EN' ? 'Contact & Locations' : 'Hubungi & Lokasi'}</span>
                <ArrowRight className="w-4 h-4 text-white" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. FAQ MODAL (Opened via faq.png) */}
      {faqOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="faq-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setFaqOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl border border-[#D0D3D4] w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#0c047d] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <img
                  src="/faq.png"
                  alt="FAQ"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                <div>
                  <h3 id="faq-modal-title" className="text-base font-bold">
                    {language === 'EN' ? 'Frequently Asked Questions (FAQ)' : 'Soalan Lazim (FAQ)'}
                  </h3>
                  <p className="text-xs text-white/80">
                    {language === 'EN' ? 'Immediate answers to common pension & portal questions' : 'Jawapan pantas soalan pesara & portal'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFaqOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions List */}
            <div className="p-6 overflow-y-auto space-y-3 divide-y divide-[#D0D3D4]/50">
              {[
                {
                  q: {
                    EN: 'When are monthly pensions credited to bank accounts?',
                    BM: 'Bilakah bayaran pencen dikreditkan setiap bulan?'
                  },
                  a: {
                    EN: 'Pension payments are scheduled between the 15th and 22nd of each month according to the statutory government gazette. You can view the full 2026 payment calendar under Pensioners Services.',
                    BM: 'Bayaran pencen dijadualkan antara 15 hingga 22 haribulan setiap bulan mengikut warta kerajaan. Anda boleh menyemak jadual penuh 2026 di bawah Khidmat Pesara.'
                  }
                },
                {
                  q: {
                    EN: 'How do I download and print my monthly pension slip?',
                    BM: 'Bagaimanakah cara mendapatkan penyata pencen bulanan?'
                  },
                  a: {
                    EN: 'You can download official PDF slips directly via the MyPesara mobile app or through the Pensioner Portal by verifying your MyKad number.',
                    BM: 'Anda boleh memuat turun penyata PDF rasmi secara terus melalui aplikasi MyPesara atau melalui Portal Pesara dengan pengesahan MyKad.'
                  }
                },
                {
                  q: {
                    EN: 'How do I update my recipient bank account number?',
                    BM: 'Bagaimanakah cara mengemas kini akaun bank penerima pencen?'
                  },
                  a: {
                    EN: 'Submit Form JPA.BP.SKP.PP together with a certified copy of your active savings bank book or statement to any KWAP counter or via the online services portal.',
                    BM: 'Kemukakan Borang JPA.BP.SKP.PP bersama salinan penyata akaun bank simpanan aktif yang disahkan ke mana-mana kaunter KWAP atau portal perkhidmatan.'
                  }
                },
                {
                  q: {
                    EN: 'What should family members do upon the demise of a pensioner?',
                    BM: 'Apakah yang perlu dilakukan oleh waris apabila berlaku kematian pesara?'
                  },
                  a: {
                    EN: 'Notify KWAP or JPA promptly and submit the original death certificate, marriage certificate, and dependents birth certificates for Derivative Pension (Pencen Terbitan) processing.',
                    BM: 'Maklumkan kepada KWAP atau JPA dengan segera dan kemukakan sijil kematian asal, sijil perkahwinan, dan sijil kelahiran tanggungan bagi urusan Pencen Terbitan.'
                  }
                },
                {
                  q: {
                    EN: 'Where can I download the official MyPesara mobile app?',
                    BM: 'Di manakah saya boleh memuat turun aplikasi rasmi MyPesara?'
                  },
                  a: {
                    EN: 'MyPesara is free to download on Apple App Store, Google Play Store, and Huawei AppGallery by searching "MyPesara" published by KWAP.',
                    BM: 'Aplikasi MyPesara percuma dimuat turun di Apple App Store, Google Play Store, dan Huawei AppGallery dengan carian "MyPesara" oleh KWAP.'
                  }
                },
                {
                  q: {
                    EN: 'How do public agencies remit statutory monthly contributions?',
                    BM: 'Bagaimanakah majikan/agensi menghantar caruman statutori?'
                  },
                  a: {
                    EN: 'Statutory bodies and local authorities must remit monthly contributions by the 15th through the KWAP Agency Remittance e-System portal.',
                    BM: 'Badan berkanun dan pihak berkuasa tempatan perlu menghantar caruman selewat-lewatnya pada 15 haribulan melalui e-Sistem Caruman Agensi KWAP.'
                  }
                }
              ].map((item, idx) => (
                <div key={idx} className={idx > 0 ? 'pt-3' : ''}>
                  <button
                    type="button"
                    onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? null : idx)}
                    className="w-full text-left flex items-start justify-between gap-3 py-2 text-sm font-bold text-[#101820] hover:text-[#0c047d]"
                  >
                    <span>{item.q[language]}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        activeFaqIndex === idx ? 'rotate-180 text-[#0c047d]' : 'text-gray-400'
                      }`}
                    />
                  </button>
                  {activeFaqIndex === idx && (
                    <div className="pb-2 text-xs sm:text-sm text-[#101820]/75 leading-relaxed pl-2 border-l-2 border-[#0c047d] mt-1 animate-in fade-in duration-150">
                      {item.a[language]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer with action */}
            <div className="p-4 bg-gray-50 border-t border-[#D0D3D4] flex items-center justify-between shrink-0">
              <span className="text-xs text-[#101820]/70">
                {language === 'EN' ? 'Need further assistance?' : 'Perlukan bantuan lanjut?'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setFaqOpen(false);
                  onNavigate('contact');
                }}
                className="px-4 py-2 bg-[#0c047d] text-white rounded-lg text-xs font-bold hover:bg-[#09035f] transition-colors"
              >
                {language === 'EN' ? 'Contact Support Center' : 'Hubungi Pusat Khidmat'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. FEEDBACK MODAL (Opened via feedback.png) */}
      {feedbackOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setFeedbackOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl border border-[#D0D3D4] w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#0c047d] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/feedback.png"
                  alt="Feedback"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                <div>
                  <h3 id="feedback-modal-title" className="text-base font-bold">
                    {language === 'EN' ? 'Customer Feedback & Enquiries' : 'Maklum Balas & Pertanyaan'}
                  </h3>
                  <p className="text-xs text-white/80">
                    {language === 'EN' ? 'KWAP Customer Experience & Service Quality' : 'Pengalaman Pelanggan & Kualiti Khidmat KWAP'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFeedbackOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              {feedbackSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-[#101820]">
                    {language === 'EN' ? 'Thank you for your feedback!' : 'Terima kasih atas maklum balas anda!'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#101820]/70 max-w-xs mx-auto">
                    {language === 'EN'
                      ? 'Your submission has been logged. Our customer service officers will follow up within 2 business days if requested.'
                      : 'Maklum balas anda telah direkodkan. Pegawai kami akan menghubungi anda dalam tempoh 2 hari bekerja jika diperlukan.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFeedbackOpen(false)}
                    className="mt-4 px-6 py-2 bg-[#0c047d] text-white rounded-lg text-xs font-bold hover:bg-[#09035f]"
                  >
                    {language === 'EN' ? 'Done' : 'Selesai'}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFeedbackSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-[#101820] mb-1">
                      {language === 'EN' ? 'Feedback Category' : 'Kategori Maklum Balas'}
                    </label>
                    <select
                      className="w-full h-10 px-3 text-xs bg-white border border-[#D0D3D4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c047d]"
                      required
                    >
                      <option value="pension">{language === 'EN' ? 'Pension Services & Payments' : 'Perkhidmatan & Bayaran Pencen'}</option>
                      <option value="app">{language === 'EN' ? 'MyPesara Mobile App' : 'Aplikasi Mudah Alih MyPesara'}</option>
                      <option value="employer">{language === 'EN' ? 'Statutory Employer Remittances' : 'Caruman Majikan Statutori'}</option>
                      <option value="portal">{language === 'EN' ? 'Website Experience & Accessibility' : 'Pengalaman Laman Web & Kebolehcapaian'}</option>
                      <option value="general">{language === 'EN' ? 'General Compliment / Inquiry' : 'Pujian / Pertanyaan Umum'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101820] mb-1">
                      {language === 'EN' ? 'Full Name' : 'Nama Penuh'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'EN' ? 'e.g. Ahmad bin Ibrahim' : 'cth. Ahmad bin Ibrahim'}
                      className="w-full h-10 px-3 text-xs border border-[#D0D3D4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c047d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101820] mb-1">
                      {language === 'EN' ? 'Email Address or Phone Number' : 'Alamat E-mel atau Nombor Telefon'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'EN' ? 'e.g. ahmad@example.com / 012-3456789' : 'cth. ahmad@example.com / 012-3456789'}
                      className="w-full h-10 px-3 text-xs border border-[#D0D3D4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c047d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101820] mb-1">
                      {language === 'EN' ? 'Comments or Feedback' : 'Ulasan atau Maklum Balas'}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={language === 'EN' ? 'Please describe your inquiry, suggestion, or experience in detail...' : 'Sila huraikan pertanyaan, cadangan, atau pengalaman anda secara terperinci...'}
                      className="w-full p-3 text-xs border border-[#D0D3D4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c047d] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setFeedbackOpen(false)}
                      className="px-4 py-2 border border-[#D0D3D4] text-[#101820] rounded-lg text-xs font-bold hover:bg-gray-50"
                    >
                      {language === 'EN' ? 'Cancel' : 'Batal'}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#0c047d] text-white rounded-lg text-xs font-bold hover:bg-[#09035f] flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === 'EN' ? 'Submit Feedback' : 'Hantar Maklum Balas'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. SITEMAP MODAL (Opened via sitemap.png) */}
      {sitemapOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sitemap-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSitemapOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl border border-[#D0D3D4] w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#0c047d] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <img
                  src="/sitemap.png"
                  alt="Sitemap"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                <div>
                  <h3 id="sitemap-modal-title" className="text-base font-bold">
                    {language === 'EN' ? 'Site Map & Navigation Directory' : 'Peta Laman & Direktori Navigasi'}
                  </h3>
                  <p className="text-xs text-white/80">
                    {language === 'EN' ? 'Complete structural index of all KWAP services, portals, and reports' : 'Indeks penuh perkhidmatan, portal, dan laporan KWAP'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSitemapOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sitemap Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Column 1: Gateways & Personas */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#0c047d] uppercase tracking-wider border-b border-[#D0D3D4] pb-2">
                  {language === 'EN' ? 'Audience Gateways' : 'Pintu Masuk Khusus'}
                </h4>
                <ul className="space-y-2 text-xs text-[#101820]">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('home');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'Home & Portal Overview' : 'Utama & Gambaran Keseluruhan'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('services', 'pensioners');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left font-medium"
                    >
                      {language === 'EN' ? 'Pensioners & Retirees Hub' : 'Pusat Pesara & Bakal Pesara'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('services', 'government');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left font-medium"
                    >
                      {language === 'EN' ? 'Government & Employers Hub' : 'Pusat Kerajaan & Majikan'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('investment');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left font-medium"
                    >
                      {language === 'EN' ? 'Institutional & Market Hub' : 'Pusat Institusi & Pasaran'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('newsroom');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left font-medium"
                    >
                      {language === 'EN' ? 'Society & Media Newsroom' : 'Masyarakat & Pusat Berita'}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 2: Pensioner Services */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#0c047d] uppercase tracking-wider border-b border-[#D0D3D4] pb-2">
                  {language === 'EN' ? 'Pension Services' : 'Khidmat Pesara'}
                </h4>
                <ul className="space-y-2 text-xs text-[#101820]">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('services', 'pensioners');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'Monthly Payment Dates Calendar' : 'Jadual Tarikh Bayaran Bulanan'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('services', 'pensioners');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'Pension Payslip Download' : 'Muat Turun Penyata Pencen'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('services', 'pensioners');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'Bank Account Update (JPA.BP.SKP.PP)' : 'Kemas Kini Akaun Bank Penerima'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('services', 'pensioners');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'Derivative Pension Guidance' : 'Panduan Permohonan Pencen Terbitan'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('services', 'pensioners');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'MyPesara Mobile Digital Card' : 'Kad Digital Aplikasi MyPesara'}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 3: Corporate & Investment */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#0c047d] uppercase tracking-wider border-b border-[#D0D3D4] pb-2">
                  {language === 'EN' ? 'Corporate & Fund' : 'Korporat & Pelaburan'}
                </h4>
                <ul className="space-y-2 text-xs text-[#101820]">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('investment');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'Strategic Asset Allocation' : 'Pengagihan Aset Strategik'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('investment');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'ESG & Sustainable Investing' : 'Tadbir Urus ESG & Pelaburan Mampan'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('newsroom');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'Audited Annual Reports' : 'Laporan Tahunan Beraudit'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('services', 'government');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'Actuarial Solvency Buffer' : 'Penampan Solvabiliti Aktuari'}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 4: Contact & Engagement */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#0c047d] uppercase tracking-wider border-b border-[#D0D3D4] pb-2">
                  {language === 'EN' ? 'Contact & Assistance' : 'Hubungi & Bantuan'}
                </h4>
                <ul className="space-y-2 text-xs text-[#101820]">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('contact');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'Menara KWAP Headquarters' : 'Ibu Pejabat Menara KWAP'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('contact');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'State Branch Counters' : 'Kaunter Cawangan Negeri'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('contact');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'Hotline: +603-8887 8777' : 'Talian Khidmat: +603-8887 8777'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSitemapOpen(false);
                        onNavigate('contact');
                      }}
                      className="hover:text-[#0c047d] hover:underline text-left"
                    >
                      {language === 'EN' ? 'Whistleblowing & Governance' : 'Saluran Perlindungan Maklumat'}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-[#D0D3D4] flex items-center justify-between shrink-0">
              <span className="text-xs text-[#101820]/70">
                {language === 'EN'
                  ? 'Retirement Fund (Incorporated) - KWAP Act 2007 (Act 662)'
                  : 'Kumpulan Wang Persaraan (Diperbadankan) - Akta KWAP 2007 (Akta 662)'}
              </span>
              <button
                type="button"
                onClick={() => setSitemapOpen(false)}
                className="px-4 py-2 bg-[#0c047d] text-white rounded-lg text-xs font-bold hover:bg-[#09035f] transition-colors"
              >
                {language === 'EN' ? 'Close Directory' : 'Tutup Direktori'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
