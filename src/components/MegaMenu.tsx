import React from 'react';
import { ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import { NavMenuSection } from '../data/navigationMenu';
import { Language, PageId, PersonaId } from '../types';

interface MegaMenuProps {
  section: NavMenuSection;
  language: Language;
  onNavigate: (page: PageId, persona?: PersonaId, anchor?: string) => void;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  section,
  language,
  onNavigate,
  onClose
}) => {
  if (!section.groups || section.groups.length === 0) return null;

  return (
    <div
      role="menu"
      aria-label={`${section.label[language]} submenu`}
      className="absolute top-full left-0 w-full bg-white border-b-2 border-[#10069F] shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Summary Banner for Section */}
        {section.featuredDescription && (
          <div className="mb-6 pb-4 border-b border-[#D0D3D4]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10069F]" />
              <p className="text-xs sm:text-sm text-[#101820]/80 font-medium max-w-3xl">
                {section.featuredDescription[language]}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigate(section.page, section.persona, section.anchor);
              }}
              className="text-xs uppercase tracking-wider font-bold text-[#10069F] hover:text-[#0c0580] flex items-center gap-1.5 shrink-0"
            >
              <span>{language === 'EN' ? `View All ${section.label.EN}` : `Lihat Semua ${section.label.BM}`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Columnar Grid according to groups */}
        <div
          className={`grid gap-8 ${
            section.groups.length === 2
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
              : section.groups.length === 3
              ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {section.groups.map((group) => (
            <div key={group.id} className="space-y-3">
              <div className="border-b border-[#10069F]/20 pb-2">
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#10069F] font-['Google_Sans',sans-serif]">
                  {group.title[language]}
                </h3>
              </div>

              {group.items && (
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onNavigate(item.page, item.persona, item.anchor);
                        }}
                        className="group w-full py-1.5 text-left text-[13px] text-[#101820] hover:text-[#10069F] flex items-center justify-between transition-colors rounded-sm px-1.5 hover:bg-[#EAF3FB]/60"
                      >
                        <span className="flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform font-medium">
                          <ChevronRight className="w-3 h-3 text-[#6CACE4] group-hover:text-[#10069F] shrink-0" />
                          <span>{item.label[language]}</span>
                        </span>
                        {item.badge && (
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-[#EAF3FB] text-[#10069F] rounded-xs border border-[#6CACE4]/40">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
