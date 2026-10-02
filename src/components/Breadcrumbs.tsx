import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Language, PageId } from '../types';

interface BreadcrumbsProps {
  currentPage: PageId;
  language: Language;
  onNavigate: (page: PageId) => void;
  subItemTitle?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPage,
  language,
  onNavigate,
  subItemTitle
}) => {
  const pageLabels: Record<PageId, { EN: string; BM: string }> = {
    home: { EN: 'Home', BM: 'Utama' },
    services: { EN: 'Pensioner Services', BM: 'Perkhidmatan Pesara' },
    newsroom: { EN: 'Newsroom', BM: 'Pusat Berita' },
    investment: { EN: 'Investment', BM: 'Pelaburan' },
    contact: { EN: 'Contact & Locations', BM: 'Hubungi & Lokasi' }
  };

  if (currentPage === 'home') return null;

  return (
    <nav
      aria-label={language === 'EN' ? 'Breadcrumb' : 'Navigasi Jejak'}
      className="bg-[#EAF3FB]/70 border-b border-[#D0D3D4]/50 py-3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm text-[#101820]/70 flex-wrap">
          <li className="flex items-center">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 hover:text-[#10069F] font-medium transition-colors min-h-[32px]"
            >
              <Home className="w-4 h-4 text-[#10069F]" strokeWidth={1.75} aria-hidden="true" />
              <span>{pageLabels.home[language]}</span>
            </button>
          </li>

          <li className="flex items-center" aria-hidden="true">
            <ChevronRight className="w-4 h-4 text-[#D0D3D4]" strokeWidth={1.75} />
          </li>

          <li className="flex items-center">
            {subItemTitle ? (
              <button
                type="button"
                onClick={() => onNavigate(currentPage)}
                className="hover:text-[#10069F] font-medium transition-colors min-h-[32px]"
              >
                {pageLabels[currentPage][language]}
              </button>
            ) : (
              <span className="font-bold text-[#10069F]" aria-current="page">
                {pageLabels[currentPage][language]}
              </span>
            )}
          </li>

          {subItemTitle && (
            <>
              <li className="flex items-center" aria-hidden="true">
                <ChevronRight className="w-4 h-4 text-[#D0D3D4]" strokeWidth={1.75} />
              </li>
              <li className="flex items-center">
                <span className="font-bold text-[#10069F] truncate max-w-xs md:max-w-md" aria-current="page">
                  {subItemTitle}
                </span>
              </li>
            </>
          )}
        </ol>
      </div>
    </nav>
  );
};
