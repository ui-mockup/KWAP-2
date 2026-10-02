import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, FileText, Newspaper, TrendingUp, HelpCircle } from 'lucide-react';
import { Language, PageId } from '../types';
import { NEWS_ITEMS, TASK_CARDS, FAQ_ITEMS, REPORT_ITEMS } from '../data/content';

interface SearchModalProps {
  isOpen: boolean;
  initialQuery?: string;
  onClose: () => void;
  language: Language;
  onNavigate: (page: PageId, persona?: any, anchor?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  initialQuery = '',
  onClose,
  language,
  onNavigate
}) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search task cards
  const matchingTasks = TASK_CARDS.filter(
    (t) =>
      t.title[language].toLowerCase().includes(q) ||
      t.description[language].toLowerCase().includes(q)
  );

  // Search news
  const matchingNews = NEWS_ITEMS.filter(
    (n) =>
      n.title[language].toLowerCase().includes(q) ||
      n.summary[language].toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q)
  );

  // Search reports
  const matchingReports = REPORT_ITEMS.filter(
    (r) =>
      r.title[language].toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q)
  );

  // Search FAQs
  const matchingFaqs = FAQ_ITEMS.filter(
    (f) =>
      f.question[language].toLowerCase().includes(q) ||
      f.answer[language].toLowerCase().includes(q)
  );

  const totalResults = matchingTasks.length + matchingNews.length + matchingReports.length + matchingFaqs.length;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:pt-20"
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-title"
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full flex flex-col border border-[#D0D3D4] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#D0D3D4] bg-[#EAF3FB] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#10069F] shrink-0" strokeWidth={1.75} />
          <input
            id="global-search-title"
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'EN'
                ? 'Type to search services, news, forms, FAQs...'
                : 'Taip untuk cari perkhidmatan, berita, borang, soalan lazim...'
            }
            className="w-full bg-transparent text-[#101820] text-base focus:outline-none placeholder:text-[#101820]/50"
          />
          <button
            type="button"
            onClick={onClose}
            className="min-w-[40px] h-10 flex items-center justify-center text-[#101820]/70 hover:text-[#101820] rounded-md hover:bg-black/5"
            aria-label={language === 'EN' ? 'Close search' : 'Tutup carian'}
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-6">
          {!q ? (
            <div className="py-8 text-center text-[#101820]/60">
              <p className="text-sm">
                {language === 'EN'
                  ? 'Start typing to search the KWAP portal. Try keywords like "pension", "schedule", "forms", "report", or "derivative".'
                  : 'Mula menaip untuk membuat carian di portal KWAP. Cuba kata kunci seperti "pencen", "jadual", "borang", "laporan", atau "terbitan".'}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Pension Slip', 'Payment Schedule', 'MyPesara', 'Annual Report', 'Derivative'].map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setQuery(k)}
                    className="px-3 py-1 bg-[#EAF3FB] hover:bg-[#D0D3D4]/50 rounded-full text-xs font-medium text-[#10069F]"
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-[#101820]/60">
              <p className="text-base font-semibold text-[#101820]">
                {language === 'EN' ? 'No results found' : 'Tiada padanan dijumpai'}
              </p>
              <p className="text-sm mt-1">
                {language === 'EN'
                  ? `We couldn't find any results matching "${query}". Try alternative terms or contact our assistance desk.`
                  : `Tiada maklumat sepadan dengan "${query}". Sila cuba kata kunci lain atau hubungi meja bantuan kami.`}
              </p>
            </div>
          ) : (
            <>
              {/* Task & Services Matches */}
              {matchingTasks.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#10069F] mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{language === 'EN' ? 'Pensioner Services' : 'Perkhidmatan Pesara'}</span>
                  </h4>
                  <div className="space-y-1">
                    {matchingTasks.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          onClose();
                          onNavigate('services');
                        }}
                        className="w-full p-2.5 hover:bg-[#EAF3FB] rounded-md text-left flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-[#101820] group-hover:text-[#10069F]">
                            {t.title[language]}
                          </div>
                          <div className="text-xs text-[#101820]/70 line-clamp-1">
                            {t.description[language]}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#D0D3D4] group-hover:text-[#10069F] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsroom Matches */}
              {matchingNews.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#10069F] mb-2 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>{language === 'EN' ? 'Newsroom Articles' : 'Pusat Berita'}</span>
                  </h4>
                  <div className="space-y-1">
                    {matchingNews.map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => {
                          onClose();
                          onNavigate('newsroom');
                        }}
                        className="w-full p-2.5 hover:bg-[#EAF3FB] rounded-md text-left flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-[#101820] group-hover:text-[#10069F]">
                            {n.title[language]}
                          </div>
                          <div className="text-xs text-[#101820]/70 line-clamp-1">
                            {n.summary[language]}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#D0D3D4] group-hover:text-[#10069F] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Investment Reports Matches */}
              {matchingReports.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#10069F] mb-2 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{language === 'EN' ? 'Investment Reports' : 'Laporan Pelaburan'}</span>
                  </h4>
                  <div className="space-y-1">
                    {matchingReports.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => {
                          onClose();
                          onNavigate('investment');
                        }}
                        className="w-full p-2.5 hover:bg-[#EAF3FB] rounded-md text-left flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-[#101820] group-hover:text-[#10069F]">
                            {r.title[language]}
                          </div>
                          <div className="text-xs text-[#101820]/70">
                            {r.type} · {r.size}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#D0D3D4] group-hover:text-[#10069F] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Matches */}
              {matchingFaqs.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#10069F] mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{language === 'EN' ? 'Frequently Asked Questions' : 'Soalan Lazim'}</span>
                  </h4>
                  <div className="space-y-1">
                    {matchingFaqs.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          onClose();
                          onNavigate('services');
                        }}
                        className="w-full p-2.5 hover:bg-[#EAF3FB] rounded-md text-left flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-[#101820] group-hover:text-[#10069F]">
                            {f.question[language]}
                          </div>
                          <div className="text-xs text-[#101820]/70 line-clamp-1">
                            {f.answer[language]}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#D0D3D4] group-hover:text-[#10069F] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#EAF3FB] border-t border-[#D0D3D4] flex items-center justify-between text-xs text-[#101820]/70">
          <span>{language === 'EN' ? `${totalResults} result(s) found` : `${totalResults} keputusan ditemui`}</span>
          <span className="hidden sm:inline">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
