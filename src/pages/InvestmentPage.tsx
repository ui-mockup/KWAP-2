import React, { useState } from 'react';
import {
  TrendingUp,
  PieChart,
  BarChart3,
  Table,
  Download,
  FileText,
  Shield,
  CheckCircle,
  ExternalLink,
  Info
} from 'lucide-react';
import { Language, PageId, ReportItem } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { REPORT_ITEMS } from '../data/content';

interface InvestmentPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
}

export const InvestmentPage: React.FC<InvestmentPageProps> = ({ language, onNavigate }) => {
  const [chartHorizon, setChartHorizon] = useState<'1Y' | '3Y' | '5Y'>('5Y');
  const [showTableView, setShowTableView] = useState<boolean>(false);
  const [hoveredDonutSegment, setHoveredDonutSegment] = useState<number | null>(null);
  const [downloadSuccessModal, setDownloadSuccessModal] = useState<ReportItem | null>(null);

  // Sample Multi-horizon Performance Data
  const performanceData = {
    '1Y': [
      { quarter: 'Q3 2025', returnRate: 6.8, benchmark: 5.0, aum: 181.2 },
      { quarter: 'Q4 2025', returnRate: 7.2, benchmark: 5.0, aum: 184.5 },
      { quarter: 'Q1 2026', returnRate: 7.0, benchmark: 5.0, aum: 186.1 },
      { quarter: 'Q2 2026', returnRate: 7.4, benchmark: 5.0, aum: 188.4 }
    ],
    '3Y': [
      { quarter: 'FY 2023', returnRate: 6.9, benchmark: 5.0, aum: 172.8 },
      { quarter: 'FY 2024', returnRate: 6.5, benchmark: 5.0, aum: 178.4 },
      { quarter: 'FY 2025', returnRate: 7.2, benchmark: 5.0, aum: 184.5 }
    ],
    '5Y': [
      { quarter: 'FY 2021', returnRate: 6.1, benchmark: 5.0, aum: 158.2 },
      { quarter: 'FY 2022', returnRate: 5.8, benchmark: 5.0, aum: 164.5 },
      { quarter: 'FY 2023', returnRate: 6.9, benchmark: 5.0, aum: 172.8 },
      { quarter: 'FY 2024', returnRate: 6.5, benchmark: 5.0, aum: 178.4 },
      { quarter: 'FY 2025', returnRate: 7.2, benchmark: 5.0, aum: 184.5 }
    ]
  };

  const activeData = performanceData[chartHorizon];

  // Asset Allocation Donut Data (NBIM / PNB style)
  const assetAllocation = [
    { label: { EN: 'Domestic Public Equities', BM: 'Ekuiti Awam Domestik' }, percent: 42, color: '#10069F', val: 'RM 77.5B' },
    { label: { EN: 'Fixed Income & Sovereign Bonds', BM: 'Pendapatan Tetap & Bon' }, percent: 35, color: '#009CA6', val: 'RM 64.6B' },
    { label: { EN: 'Global Private Equity & Alternatives', BM: 'Ekuiti Persendirian Global' }, percent: 10, color: '#FFA400', val: 'RM 18.5B' },
    { label: { EN: 'Real Estate & Prime Infrastructure', BM: 'Hartanah & Infrastruktur' }, percent: 9, color: '#6CACE4', val: 'RM 16.6B' },
    { label: { EN: 'Cash & Short-Term Money Market', BM: 'Tunai & Pasaran Wang' }, percent: 4, color: '#101820', val: 'RM 7.3B' }
  ];

  return (
    <div className="bg-white">
      {/* Subpage Breadcrumb */}
      <Breadcrumbs currentPage="investment" language={language} onNavigate={onNavigate} />

      {/* TOP BANNER */}
      <section id="hero-section" className="relative bg-[#10069F] text-white overflow-hidden py-16 lg:py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=75"
            alt="Kuala Lumpur financial city lights reflecting wealth management"
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
              {language === 'EN' ? 'Investment & Solvency' : 'Pelaburan & Solvabiliti'}
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              {language === 'EN'
                ? 'Managing RM 184.5 billion in strategic sovereign assets to guarantee long-term civil service pension disbursements through disciplined multigenerational compounding.'
                : 'Mengurus RM 184.5 bilion aset berdaulat strategik demi menjamin pembayaran pencen perkhidmatan awam bergenerasi melalui pengurusan risiko berdisiplin.'}
            </p>
          </div>
        </div>
      </section>

      {/* THREE KPI TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20" id="performance">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-xl border border-[#D0D3D4] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#10069F] mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#10069F]">
                {language === 'EN' ? 'Total Assets Under Management' : 'Jumlah Aset Diuruskan (AUM)'}
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#101820] tabular-nums">
              RM 184.5B
            </div>
            <p className="text-xs text-[#101820]/70 mt-2">
              {language === 'EN' ? 'Audited closing balance FY2025' : 'Baki penutup diaudit TK2025'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-xl border border-[#D0D3D4] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#10069F] mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#10069F]">
                {language === 'EN' ? '10-Year Rolling Net Return' : 'Pulangan Bersih 10-Tahun'}
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#101820] tabular-nums flex items-baseline gap-2">
              <span>6.8%</span>
              <span className="text-sm font-semibold text-emerald-700">p.a.</span>
            </div>
            <p className="text-xs text-[#101820]/70 mt-2">
              {language === 'EN' ? 'Exceeding statutory actuarial hurdle by 180 bps' : 'Melepasi penanda aras aktuari sebanyak 180 mata asas'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-xl border border-[#D0D3D4] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#10069F] mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#10069F]">
                {language === 'EN' ? 'ESG Mandated Portfolio' : 'Portfolio Patuh ESG'}
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#101820] tabular-nums">
              28.4%
            </div>
            <p className="text-xs text-[#101820]/70 mt-2">
              {language === 'EN' ? 'Committed to UNPRI Net-Zero Transition by 2050' : 'Komitmen UNPRI Transisi Sifar Bersih menjelang 2050'}
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE BAR CHART WITH 1, 3, 5-YEAR TOGGLES & "VIEW AS TABLE" TOGGLE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-[#D0D3D4] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#10069F]">
                {language === 'EN' ? 'Portfolio Performance Trajectory' : 'Trajektori Prestasi Portfolio'}
              </span>
              <h2 className="text-2xl font-extrabold text-[#101820] mt-1">
                {language === 'EN' ? 'Net Annual Return vs Actuarial Hurdle (%)' : 'Pulangan Bersih vs Penanda Aras (%)'}
              </h2>
            </div>

            <div className="flex items-center flex-wrap gap-3">
              {/* Horizon Toggle */}
              <div className="flex items-center bg-[#EAF3FB] p-1 rounded-lg border border-[#D0D3D4]" role="group" aria-label="Time horizon">
                {(['1Y', '3Y', '5Y'] as const).map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setChartHorizon(h)}
                    className={`min-h-[38px] px-3.5 py-1 text-xs font-bold rounded-md transition-all ${
                      chartHorizon === h
                        ? 'bg-[#10069F] text-white shadow-xs'
                        : 'text-[#101820] hover:text-[#10069F]'
                    }`}
                    aria-pressed={chartHorizon === h}
                  >
                    {h}
                  </button>
                ))}
              </div>

              {/* View as Table Toggle (Accessibility Requirement) */}
              <button
                type="button"
                onClick={() => setShowTableView(!showTableView)}
                className="min-h-[44px] px-4 py-2 border border-[#D0D3D4] bg-white hover:bg-[#EAF3FB] text-[#10069F] text-xs font-bold rounded-md transition-colors flex items-center gap-2"
                aria-pressed={showTableView}
              >
                {showTableView ? (
                  <>
                    <BarChart3 className="w-4 h-4" />
                    <span>{language === 'EN' ? 'View as Chart' : 'Lihat sebagai Carta'}</span>
                  </>
                ) : (
                  <>
                    <Table className="w-4 h-4" />
                    <span>{language === 'EN' ? 'View as Table' : 'Lihat sebagai Jadual'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Accessible Table View */}
          {showTableView ? (
            <div className="overflow-x-auto border border-[#D0D3D4] rounded-lg">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  {language === 'EN' ? 'Historical Return vs Benchmark Table' : 'Jadual Pulangan Sejarah vs Penanda Aras'}
                </caption>
                <thead className="bg-[#EAF3FB] border-b border-[#D0D3D4] text-xs uppercase tracking-wider text-[#10069F]">
                  <tr>
                    <th scope="col" className="p-4 font-bold">{language === 'EN' ? 'Period' : 'Tempoh'}</th>
                    <th scope="col" className="p-4 font-bold">{language === 'EN' ? 'Net Return (%)' : 'Pulangan Bersih (%)'}</th>
                    <th scope="col" className="p-4 font-bold">{language === 'EN' ? 'Benchmark Hurdle (%)' : 'Penanda Aras (%)'}</th>
                    <th scope="col" className="p-4 font-bold">{language === 'EN' ? 'Excess Outperformance' : 'Lebihan Pulangan'}</th>
                    <th scope="col" className="p-4 font-bold">{language === 'EN' ? 'Total AUM (RM)' : 'Jumlah AUM (RM)'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D0D3D4]/60">
                  {activeData.map((row) => (
                    <tr key={row.quarter} className="hover:bg-[#EAF3FB]/30">
                      <td className="p-4 font-bold text-[#101820]">{row.quarter}</td>
                      <td className="p-4 font-bold text-[#10069F] tabular-nums">{row.returnRate}%</td>
                      <td className="p-4 text-[#101820]/75 tabular-nums">{row.benchmark}%</td>
                      <td className="p-4 font-semibold text-emerald-700 tabular-nums">
                        +{(row.returnRate - row.benchmark).toFixed(1)}%
                      </td>
                      <td className="p-4 text-[#101820] tabular-nums">RM {row.aum}B</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Bar Chart Visualization */
            <div className="space-y-6">
              <div className="flex items-center gap-6 text-xs text-[#101820]/80">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-xs bg-[#10069F]" />
                  <span>{language === 'EN' ? 'KWAP Net Realised Return' : 'Pulangan Bersih KWAP'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-xs bg-[#FFA400]" />
                  <span>{language === 'EN' ? 'Actuarial Benchmark (5.0%)' : 'Penanda Aras Aktuari (5.0%)'}</span>
                </div>
              </div>

              <div className="pt-6 pb-2">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 items-end h-64 border-b border-[#D0D3D4] px-4">
                  {activeData.map((d) => {
                    const heightPercent = (d.returnRate / 8.5) * 100;
                    const benchmarkHeightPercent = (d.benchmark / 8.5) * 100;
                    return (
                      <div key={d.quarter} className="flex flex-col items-center h-full justify-end group relative">
                        {/* Tooltip on Hover/Focus */}
                        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 bg-[#101820] text-white text-xs px-2.5 py-1.5 rounded shadow-lg transition-opacity pointer-events-none z-30 whitespace-nowrap">
                          <div><strong>{d.quarter}:</strong> {d.returnRate}% vs {d.benchmark}%</div>
                          <div className="text-[10px] text-[#6CACE4]">AUM: RM {d.aum}B</div>
                        </div>

                        {/* Bars Container */}
                        <div className="w-full flex items-end justify-center gap-1.5 h-full">
                          {/* Net Return Bar */}
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-7 sm:w-10 bg-[#10069F] rounded-t-sm group-hover:bg-[#0c0580] transition-all relative flex justify-center"
                          >
                            <span className="text-[10px] sm:text-xs font-bold text-white absolute -top-5 tabular-nums">
                              {d.returnRate}%
                            </span>
                          </div>

                          {/* Benchmark Bar */}
                          <div
                            style={{ height: `${benchmarkHeightPercent}%` }}
                            className="w-4 sm:w-6 bg-[#FFA400] rounded-t-sm group-hover:bg-[#f39c00] transition-all opacity-80"
                          />
                        </div>

                        {/* Label */}
                        <div className="mt-3 text-xs font-bold text-[#101820] text-center">
                          {d.quarter}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-xs text-[#101820]/60 italic">
                * {language === 'EN' ? 'Audited historical returns and hurdle rates based on published statutory financial disclosures.' : 'Pulangan sejarah dan kadar penanda aras beraudit berdasarkan pendedahan kewangan statutori.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ASSET ALLOCATION DONUT CHART WITH LEGEND HIGHLIGHT (NBIM Reference Style) */}
      <section className="bg-[#EAF3FB] py-16 border-y border-[#D0D3D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101820]">
              {language === 'EN' ? 'Strategic Asset Allocation Framework' : 'Kerangka Pengagihan Aset Strategik'}
            </h2>
            <p className="text-sm text-[#101820]/70 mt-2">
              {language === 'EN'
                ? 'Prudently balanced across fixed income stability, domestic growth equities, and defensive real assets.'
                : 'Diimbangi berhemah antara kestabilan pendapatan tetap, ekuiti pertumbuhan tempatan, dan hartanah berdaya tahan.'}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#D0D3D4] p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive SVG Donut */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                  {/* SVG Circles simulating Donut Segments */}
                  {/* Total Circumference = 2 * PI * 65 ≈ 408.4 */}
                  {/* Domestic Equities: 42% -> 171.5 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="65"
                    fill="none"
                    stroke="#10069F"
                    strokeWidth={hoveredDonutSegment === 0 ? "34" : "28"}
                    strokeDasharray="171.5 236.9"
                    strokeDashoffset="0"
                    className="transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredDonutSegment(0)}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                  />
                  {/* Fixed Income: 35% -> 142.9 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="65"
                    fill="none"
                    stroke="#009CA6"
                    strokeWidth={hoveredDonutSegment === 1 ? "34" : "28"}
                    strokeDasharray="142.9 265.5"
                    strokeDashoffset="-171.5"
                    className="transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredDonutSegment(1)}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                  />
                  {/* Global PE: 10% -> 40.8 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="65"
                    fill="none"
                    stroke="#FFA400"
                    strokeWidth={hoveredDonutSegment === 2 ? "34" : "28"}
                    strokeDasharray="40.8 367.6"
                    strokeDashoffset="-314.4"
                    className="transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredDonutSegment(2)}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                  />
                  {/* Real Estate: 9% -> 36.7 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="65"
                    fill="none"
                    stroke="#6CACE4"
                    strokeWidth={hoveredDonutSegment === 3 ? "34" : "28"}
                    strokeDasharray="36.7 371.7"
                    strokeDashoffset="-355.2"
                    className="transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredDonutSegment(3)}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                  />
                  {/* Cash: 4% -> 16.3 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="65"
                    fill="none"
                    stroke="#101820"
                    strokeWidth={hoveredDonutSegment === 4 ? "34" : "28"}
                    strokeDasharray="16.3 392.1"
                    strokeDashoffset="-391.9"
                    className="transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredDonutSegment(4)}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                  />
                </svg>

                {/* Donut Center Hole Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
                  <span className="text-[11px] font-bold text-[#101820]/60 uppercase tracking-wider">
                    {hoveredDonutSegment !== null
                      ? assetAllocation[hoveredDonutSegment].label[language]
                      : language === 'EN' ? 'Total AUM' : 'Jumlah AUM'}
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#10069F] tabular-nums mt-0.5">
                    {hoveredDonutSegment !== null
                      ? `${assetAllocation[hoveredDonutSegment].percent}%`
                      : 'RM 184.5B'}
                  </span>
                  <span className="text-[10px] text-[#101820]/50 mt-0.5">
                    {hoveredDonutSegment !== null
                      ? assetAllocation[hoveredDonutSegment].val
                      : 'Total Fund'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Legend with Hover Effects */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#10069F] mb-4">
                {language === 'EN' ? 'Asset Class Breakdown' : 'Pecahan Kelas Aset'}
              </h3>
              {assetAllocation.map((item, idx) => {
                const isHovered = hoveredDonutSegment === idx;
                return (
                  <div
                    key={item.label.EN}
                    onMouseEnter={() => setHoveredDonutSegment(idx)}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                      isHovered
                        ? 'border-[#10069F] bg-[#EAF3FB] shadow-xs'
                        : 'border-[#D0D3D4] bg-white hover:border-[#10069F]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-bold text-[#101820]">
                        {item.label[language]}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold text-[#101820]/70">
                        {item.val}
                      </span>
                      <span className="text-base font-extrabold text-[#10069F] tabular-nums min-w-[42px] text-right">
                        {item.percent}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOADABLE REPORTS LIST */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="reports">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101820]">
              {language === 'EN' ? 'Downloadable Statutory Reports' : 'Laporan Statutori Boleh Dimuat Turun'}
            </h2>
          </div>
          <span className="text-xs text-[#101820]/60">
            {language === 'EN' ? 'All files in PDF format' : 'Semua fail dalam format PDF'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REPORT_ITEMS.map((rep) => (
            <div
              key={rep.id}
              className="bg-white rounded-xl border border-[#D0D3D4] p-6 hover:border-[#10069F] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#10069F] font-bold mb-2">
                  <span className="bg-[#EAF3FB] px-2.5 py-1 rounded-sm">{rep.type}</span>
                  <span className="text-[#101820]/60 font-medium">{rep.size} · {rep.language}</span>
                </div>

                <h3 className="text-lg font-bold text-[#101820] mt-2 leading-snug">
                  {rep.title[language]}
                </h3>

                <p className="text-xs text-[#101820]/70 mt-2">
                  {language === 'EN'
                    ? 'Complete audited statutory statement including actuarial valuation, risk governance, and sustainable investment benchmarks.'
                    : 'Penyata statutori diaudit lengkap termasuk penilaian aktuari, tadbir urus risiko, dan penanda aras pelaburan mampan.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D0D3D4]/50 flex items-center justify-between">
                <span className="text-xs text-[#101820]/60 font-semibold">FY {rep.year}</span>
                <button
                  type="button"
                  onClick={() => setDownloadSuccessModal(rep)}
                  className="min-h-[44px] px-4 py-2 bg-[#10069F] hover:bg-[#0c0580] text-white text-xs font-bold rounded-md transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'EN' ? 'Download PDF' : 'Muat Turun PDF'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DOWNLOAD SUCCESS MODAL */}
      {downloadSuccessModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-[#D0D3D4] p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#101820]">
              {language === 'EN' ? 'Report Download Initiated' : 'Muat Turun Laporan Dimulakan'}
            </h3>
            <p className="text-sm text-[#101820]/75">
              {downloadSuccessModal.title[language]} ({downloadSuccessModal.size})
            </p>
            <p className="text-xs text-[#101820]/60 italic">
              {language === 'EN'
                ? 'Official verified report is ready for viewing.'
                : 'Dokumen laporan rasmi telah sedia untuk semakan.'}
            </p>
            <button
              type="button"
              onClick={() => setDownloadSuccessModal(null)}
              className="w-full min-h-[44px] bg-[#10069F] text-white font-bold text-sm rounded-md"
            >
              {language === 'EN' ? 'Close' : 'Tutup'}
            </button>
          </div>
        </div>
      )}

      {/* HTML Licence Record Comment Block */}
      {/*
        =============================================================================
        KWAP PROTOTYPE PHOTO LICENCE RECORDS: INVESTMENT
        - Financial Skyline: Esmonde Yong (https://unsplash.com/@esmonde_yong) - photo-1596422846543-75c6fc197f07
        =============================================================================
      */}
    </div>
  );
};
