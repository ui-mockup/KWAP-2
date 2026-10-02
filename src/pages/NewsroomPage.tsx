import React, { useState } from 'react';
import {
  Search,
  Calendar,
  ArrowRight,
  Filter,
  X,
  Share2,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Language, PageId, NewsItem } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NEWS_ITEMS } from '../data/content';

interface NewsroomPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
}

export const NewsroomPage: React.FC<NewsroomPageProps> = ({ language, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  const categories = [
    { id: 'All', label: { EN: 'All News', BM: 'Semua Berita' } },
    { id: 'Announcements', label: { EN: 'Announcements', BM: 'Pengumuman' } },
    { id: 'Campaigns', label: { EN: 'Campaigns & Society', BM: 'Kempen & Komuniti' } },
    { id: 'Reports', label: { EN: 'Reports & Solvency', BM: 'Laporan & Solvabiliti' } },
    { id: 'Tenders', label: { EN: 'Tenders & Procurement', BM: 'Tender & Perolehan' } }
  ];

  // Filtering
  const filteredNews = NEWS_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured Story (First story or featured marked)
  const featuredStory = NEWS_ITEMS.find((n) => n.featured) || NEWS_ITEMS[0];

  // Pagination (4 items per page)
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPageNum - 1) * itemsPerPage,
    currentPageNum * itemsPerPage
  );

  return (
    <div className="bg-white">
      {/* Subpage Breadcrumbs */}
      <Breadcrumbs currentPage="newsroom" language={language} onNavigate={onNavigate} />

      {/* TOP BANNER */}
      <section id="hero-section" className="relative bg-[#10069F] text-white overflow-hidden py-16 lg:py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=75"
            alt="Modern architectural lines of Kuala Lumpur"
            width={1600}
            height={600}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10069F] via-[#10069F]/90 to-transparent" />
          <div className="absolute inset-0 kwap-diamond-pattern opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-balance leading-tight">
              {language === 'EN' ? 'KWAP Newsroom' : 'Pusat Berita & Media KWAP'}
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              {language === 'EN'
                ? 'Official press releases, community wellness initiatives, statutory disbursement dates, and institutional reports.'
                : 'Kenyataan media rasmi, inisiatif kesejahteraan pesara, tarikh pengkreditan pencen, dan laporan statutori.'}
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED STORY HERO (Khazanah Reference Style: Large Photo Card with Image Overlay) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div
          onClick={() => setSelectedArticle(featuredStory)}
          className="bg-white rounded-2xl border border-[#D0D3D4] overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
        >
          <div className="lg:col-span-7 h-72 lg:h-[400px] relative overflow-hidden bg-[#EAF3FB]">
            <img
              src={featuredStory.imageUrl}
              alt={featuredStory.imageAlt}
              width={1200}
              height={700}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span className="absolute top-4 left-4 text-xs font-bold bg-[#FFA400] text-[#101820] px-3 py-1 rounded-sm shadow-md">
              {language === 'EN' ? 'Featured Announcement' : 'Pengumuman Utama'}
            </span>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#101820]/70">
                <span className="font-bold text-[#10069F] bg-[#EAF3FB] px-2.5 py-1 rounded-sm">
                  {language === 'EN' ? featuredStory.category : featuredStory.categoryBM}
                </span>
                <span>{featuredStory.date}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#101820] group-hover:text-[#10069F] transition-colors leading-snug">
                {featuredStory.title[language]}
              </h2>

              <p className="text-sm sm:text-base text-[#101820]/75 leading-relaxed font-normal">
                {featuredStory.summary[language]}
              </p>
            </div>

            <div className="pt-6 border-t border-[#D0D3D4]/50 flex items-center justify-between text-sm font-bold text-[#10069F]">
              <span>{language === 'EN' ? 'Read full statement' : 'Baca kenyataan penuh'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & LIVE SEARCH BAR */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF3FB] p-4 sm:p-6 rounded-xl border border-[#D0D3D4] flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter Pills (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="News category filter">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPageNum(1);
                  }}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#10069F] text-white shadow-sm'
                      : 'bg-white text-[#101820] hover:bg-white/80 border border-[#D0D3D4]'
                  }`}
                  aria-pressed={isSelected}
                >
                  {cat.label[language]}
                </button>
              );
            })}
          </div>

          {/* Live Search Input */}
          <div className="relative min-w-[260px] sm:w-80">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPageNum(1);
              }}
              placeholder={
                language === 'EN' ? 'Filter news headlines...' : 'Tapis tajuk berita...'
              }
              className="w-full h-11 pl-10 pr-4 text-sm bg-white border border-[#D0D3D4] rounded-md text-[#101820] focus:border-[#10069F] focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#10069F] absolute left-3 top-3.5" />
          </div>
        </div>
      </section>

      {/* ANIMATED CARD GRID OF AT LEAST SIX ITEMS */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredNews.length === 0 ? (
          /* Empty State Message */
          <div className="text-center py-16 px-4 bg-white rounded-xl border border-[#D0D3D4] max-w-lg mx-auto">
            <div className="w-14 h-14 bg-[#EAF3FB] rounded-full flex items-center justify-center mx-auto mb-4 text-[#10069F]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#101820]">
              {language === 'EN' ? 'No news articles match your criteria' : 'Tiada artikel berita ditemui'}
            </h3>
            <p className="text-sm text-[#101820]/70 mt-1">
              {language === 'EN'
                ? `No articles found for "${searchQuery}" in category "${selectedCategory}". Clear your filters to see all news.`
                : `Tiada padanan bagi "${searchQuery}" dalam kategori "${selectedCategory}". Kosongkan tapisan untuk melihat semua berita.`}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 bg-[#10069F] text-white text-xs font-bold rounded-md hover:bg-[#0c0580]"
            >
              {language === 'EN' ? 'Clear Filters' : 'Kosongkan Tapisan'}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {paginatedNews.map((news) => (
                <div
                  key={news.id}
                  onClick={() => setSelectedArticle(news)}
                  className="bg-white rounded-xl border border-[#D0D3D4] overflow-hidden hover:border-[#10069F] hover:shadow-xl transition-all cursor-pointer flex flex-col sm:flex-row group"
                >
                  <div className="sm:w-2/5 h-52 sm:h-auto relative overflow-hidden bg-[#EAF3FB] shrink-0">
                    <img
                      src={news.imageUrl}
                      alt={news.imageAlt}
                      width={500}
                      height={320}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-[#101820]/60 mb-2">
                        {news.date}
                      </div>

                      <h3 className="text-lg font-bold text-[#101820] group-hover:text-[#10069F] transition-colors line-clamp-2">
                        {news.title[language]}
                      </h3>

                      <p className="text-sm text-[#101820]/75 mt-2 line-clamp-3 leading-relaxed">
                        {news.summary[language]}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#D0D3D4]/50 flex items-center justify-between text-xs font-bold text-[#10069F]">
                      <span>{language === 'EN' ? 'Read full notice' : 'Baca notis penuh'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2" role="navigation" aria-label="Pagination">
                <button
                  type="button"
                  disabled={currentPageNum === 1}
                  onClick={() => setCurrentPageNum((p) => Math.max(p - 1, 1))}
                  className="min-w-[44px] min-h-[44px] px-3 rounded-md border border-[#D0D3D4] bg-white text-[#10069F] font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EAF3FB] flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCurrentPageNum(num)}
                    className={`min-w-[44px] min-h-[44px] rounded-md font-bold text-sm ${
                      currentPageNum === num
                        ? 'bg-[#10069F] text-white shadow-xs'
                        : 'bg-white border border-[#D0D3D4] text-[#101820] hover:bg-[#EAF3FB]'
                    }`}
                    aria-current={currentPageNum === num ? 'page' : undefined}
                  >
                    {num}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPageNum === totalPages}
                  onClick={() => setCurrentPageNum((p) => Math.min(p + 1, totalPages))}
                  className="min-w-[44px] min-h-[44px] px-3 rounded-md border border-[#D0D3D4] bg-white text-[#10069F] font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EAF3FB] flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* FULL ARTICLE READER MODAL (Eliminates dead stubs) */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-reader-title"
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-[#D0D3D4] overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-5 bg-[#10069F] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#FFA400]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#6CACE4]">
                  {language === 'EN' ? selectedArticle.category : selectedArticle.categoryBM}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="text-white/80 hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="h-60 overflow-hidden rounded-lg bg-[#EAF3FB] relative">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.imageAlt}
                  width={800}
                  height={400}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-[#101820]/60 mb-2">
                  <Calendar className="w-4 h-4 text-[#10069F]" />
                  <span>{selectedArticle.date}</span>
                </div>

                <h2 id="article-reader-title" className="text-2xl font-extrabold text-[#101820] leading-snug">
                  {selectedArticle.title[language]}
                </h2>
              </div>

              <div className="prose max-w-none text-base text-[#101820]/85 leading-relaxed space-y-4">
                <p className="font-semibold text-lg text-[#101820]">
                  {selectedArticle.summary[language]}
                </p>
                <p>
                  {selectedArticle.content[language]}
                </p>
                <p className="text-sm text-[#101820]/70 border-t border-[#D0D3D4] pt-4">
                  {language === 'EN'
                    ? 'Official statement released by KWAP Corporate Communications Department. Integra Tower, Kuala Lumpur.'
                    : 'Kenyataan rasmi dikeluarkan oleh Jabatan Komunikasi Korporat KWAP. Integra Tower, Kuala Lumpur.'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#EAF3FB] border-t border-[#D0D3D4] flex items-center justify-between shrink-0">
              <span className="text-xs text-[#101820]/70">Photo: {selectedArticle.photographer} (Unsplash)</span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-[#10069F] text-white font-bold text-sm rounded-md hover:bg-[#0c0580]"
              >
                {language === 'EN' ? 'Close Article' : 'Tutup Artikel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HTML Licence Record Comment Block */}
      {/*
        =============================================================================
        KWAP PROTOTYPE PHOTO LICENCE RECORDS: NEWSROOM
        - Featured Story: Adeolu Eletu (https://unsplash.com/@adeolueletu) - photo-1454165804606-c3d57bc86b40
        - Community Story: Eye for Ebony (https://unsplash.com/@eyeforebony) - photo-1544717305-2782549b5136
        - Disbursement Schedule: Matthew Bennett (https://unsplash.com/@matthew_t_r_bennett) - photo-1516585427167-9f4af9627e6c
        - Tender Skyscraper: Sean Pollock (https://unsplash.com/@seanpollock) - photo-1486406146926-c627a92ad1ab
        - Sustainability Green: Izuddin Helmi (https://unsplash.com/@izuddinhelmi) - photo-1548013146-72479768bbaa
        - Senior Smartphone: Centre for Ageing Better (https://unsplash.com/@ageing_better) - photo-1576765608535-5f04d1e3f289
        =============================================================================
      */}
    </div>
  );
};
