import React from 'react';
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react';
import { Language, PageId } from '../types';

interface FooterProps {
  language: Language;
  onNavigate: (page: PageId) => void;
  onOpenCredits?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  return (
    <footer className="bg-[#101820] text-white pt-0 pb-12 relative" role="contentinfo">
      {/* Mandatory 6px dual-color bar: light blue (#6CACE4) then primary blue (#10069F) */}
      <div className="w-full h-[6px] grid grid-cols-2">
        <div className="bg-[#6CACE4] h-full" />
        <div className="bg-[#10069F] h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* 4-Column Grid per mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/15">
          {/* COLUMN 1: PENSION RELATED MATTERS */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-base font-extrabold uppercase tracking-wider text-white font-['Google_Sans',sans-serif]">
              {language === 'EN' ? 'PENSION RELATED MATTERS' : 'HAL EHWAL BERKAITAN PENCEN'}
            </h3>

            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              Level 6, Block A Quill 18 Lingkaran Teknokrat 3 Barat Cyber 4, 63000 Cyberjaya Selangor
            </p>

            <div className="space-y-3 pt-2 text-sm text-white/90">
              {/* Phone */}
              <div className="grid grid-cols-12 gap-2 items-baseline">
                <span className="col-span-3 text-xs font-bold uppercase tracking-wider text-[#6CACE4]">
                  Phone
                </span>
                <div className="col-span-9 space-y-1">
                  <div>
                    <a href="tel:+60388878700" className="hover:text-[#FFA400] transition-colors font-medium">
                      +603 8887 8700
                    </a>{' '}
                    <span className="text-xs text-white/60">(General line)</span>
                  </div>
                  <div>
                    <a href="tel:+60388878777" className="hover:text-[#FFA400] transition-colors font-medium">
                      +603 8887 8777
                    </a>{' '}
                    <span className="text-xs text-white/60">(Call centre)</span>
                  </div>
                </div>
              </div>

              {/* Fax */}
              <div className="grid grid-cols-12 gap-2 items-baseline">
                <span className="col-span-3 text-xs font-bold uppercase tracking-wider text-[#6CACE4]">
                  Fax
                </span>
                <div className="col-span-9 font-medium">
                  +603 8887 8770
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-12 gap-2 items-baseline">
                <span className="col-span-3 text-xs font-bold uppercase tracking-wider text-[#6CACE4]">
                  Email
                </span>
                <div className="col-span-9">
                  <a
                    href="mailto:mypesara@kwap.gov.my"
                    className="hover:text-[#FFA400] transition-colors font-medium underline underline-offset-2"
                  >
                    mypesara@kwap.gov.my
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: CORPORATE, INVESTMENT AND CONTRIBUTION RELATED MATTERS */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-base font-extrabold uppercase tracking-wider text-white font-['Google_Sans',sans-serif]">
              {language === 'EN'
                ? 'CORPORATE, INVESTMENT AND CONTRIBUTION RELATED MATTERS'
                : 'HAL EHWAL KORPORAT, PELABURAN DAN CARUMAN'}
            </h3>

            <p className="text-sm text-white/80 leading-relaxed max-w-sm whitespace-pre-line">
              Level 36,{'\n'}
              Integra Tower, The Intermark{'\n'}
              348, Jalan Tun Razak{'\n'}
              50400 Kuala Lumpur
            </p>

            <div className="space-y-3 pt-2 text-sm text-white/90">
              {/* Phone */}
              <div className="grid grid-cols-12 gap-2 items-baseline">
                <span className="col-span-3 text-xs font-bold uppercase tracking-wider text-[#6CACE4]">
                  Phone
                </span>
                <div className="col-span-9">
                  <a href="tel:+60321748000" className="hover:text-[#FFA400] transition-colors font-medium">
                    +603 2174 8000
                  </a>
                </div>
              </div>

              {/* Fax */}
              <div className="grid grid-cols-12 gap-2 items-baseline">
                <span className="col-span-3 text-xs font-bold uppercase tracking-wider text-[#6CACE4]">
                  Fax
                </span>
                <div className="col-span-9 font-medium">
                  +603 2174 8510
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-12 gap-2 items-baseline">
                <span className="col-span-3 text-xs font-bold uppercase tracking-wider text-[#6CACE4]">
                  Email
                </span>
                <div className="col-span-9">
                  <a
                    href="mailto:info@kwap.gov.my"
                    className="hover:text-[#FFA400] transition-colors font-medium underline underline-offset-2"
                  >
                    info@kwap.gov.my
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: About KWAP */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-extrabold text-white font-['Google_Sans',sans-serif]">
              {language === 'EN' ? 'About KWAP' : 'Mengenai KWAP'}
            </h3>

            <ul className="space-y-2 text-xs font-semibold uppercase tracking-wider text-white/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FFA400] transition-colors text-left"
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FFA400] transition-colors text-left"
                >
                  CORPORATE
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#FFA400] transition-colors text-left"
                >
                  PENSION SERVICES
                </button>
              </li>
              <li>
                <a
                  href="#contribution"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('services');
                  }}
                  className="hover:text-[#FFA400] transition-colors text-left block"
                >
                  CONTRIBUTION
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('investment')}
                  className="hover:text-[#FFA400] transition-colors text-left"
                >
                  INVESTMENT
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FFA400] transition-colors text-left"
                >
                  CONTACT US
                </button>
              </li>
              <li>
                <a
                  href="https://www.kwap.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFA400] transition-colors text-left block"
                >
                  CAREER
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FFA400] transition-colors text-left"
                >
                  PRIVACY NOTICE
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FFA400] transition-colors text-left"
                >
                  SITE MAP
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Useful Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-extrabold text-white font-['Google_Sans',sans-serif]">
              {language === 'EN' ? 'Useful Links' : 'Pautan Berguna'}
            </h3>

            <ul className="space-y-2 text-xs font-semibold uppercase tracking-wider text-white/80">
              <li>
                <a
                  href="https://caruman.kwap.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFA400] transition-colors block text-left"
                >
                  CONTRIBUTION PORTAL
                </a>
              </li>
              <li>
                <a
                  href="https://www.jpa.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFA400] transition-colors block text-left"
                >
                  JABATAN PERKHIDMATAN AWAM
                </a>
              </li>
              <li>
                <a
                  href="https://www.kwap.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFA400] transition-colors block text-left"
                >
                  WHISTLEBLOWING
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM ROW: Copyright + Social Icons + Back to Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-4">
          {/* Copyright notice per mockup */}
          <div>
            <p className="font-medium">
              Copyright Reserved @ Retirement Fund (Incorporated)
            </p>
          </div>

          {/* Social Icons per mockup */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KWAP on Facebook"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-[#FFA400] hover:bg-white/10 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KWAP on Instagram"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-[#FFA400] hover:bg-white/10 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KWAP on YouTube"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-[#FFA400] hover:bg-white/10 transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KWAP on LinkedIn"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-[#FFA400] hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
