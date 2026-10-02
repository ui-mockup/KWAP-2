import { PageId, PersonaId } from '../types';

export interface SubMenuItem {
  id: string;
  label: { EN: string; BM: string };
  page: PageId;
  persona?: PersonaId;
  anchor?: string;
  badge?: string;
}

export interface MenuGroup {
  id: string;
  title: { EN: string; BM: string };
  page?: PageId;
  persona?: PersonaId;
  anchor?: string;
  items?: SubMenuItem[];
}

export interface NavMenuSection {
  id: string;
  label: { EN: string; BM: string };
  page: PageId;
  persona?: PersonaId;
  anchor?: string;
  hasDropdown: boolean;
  featuredDescription?: { EN: string; BM: string };
  groups?: MenuGroup[];
}

export const NAVIGATION_MENU: NavMenuSection[] = [
  {
    id: 'home',
    label: { EN: 'Home', BM: 'Utama' },
    page: 'home',
    hasDropdown: false
  },
  {
    id: 'corporate',
    label: { EN: 'Corporate', BM: 'Korporat' },
    page: 'newsroom',
    hasDropdown: true,
    featuredDescription: {
      EN: 'Managing Malaysia\'s civil service retirement fund with statutory governance, institutional integrity, and strategic outreach.',
      BM: 'Mengurus dana persaraan perkhidmatan awam Malaysia dengan tadbir urus statutori, integriti institusi, dan program libat urus strategik.'
    },
    groups: [
      {
        id: 'corp-overview',
        title: { EN: 'Overview', BM: 'Gambaran Keseluruhan' },
        page: 'newsroom',
        items: [
          { id: 'corp-about', label: { EN: 'About KWAP', BM: 'Mengenai KWAP' }, page: 'newsroom' },
          { id: 'corp-pvc', label: { EN: 'Pension Value Chain', BM: 'Rantaian Nilai Pencen' }, page: 'services' },
          { id: 'corp-career', label: { EN: 'Career at KWAP', BM: 'Kerjaya di KWAP' }, page: 'contact' },
          { id: 'corp-contact', label: { EN: 'Contact Us', BM: 'Hubungi Kami' }, page: 'contact' }
        ]
      },
      {
        id: 'corp-governance',
        title: { EN: 'Corporate Governance', BM: 'Tadbir Urus Korporat' },
        page: 'newsroom',
        items: [
          { id: 'team', label: { EN: 'KWAP’s Team', BM: 'Pasukan KWAP' }, page: 'newsroom' },
          { id: 'org-chart', label: { EN: 'Organisation Chart', BM: 'Carta Organisasi' }, page: 'newsroom' },
          { id: 'integrity', label: { EN: 'Integrity and Governance', BM: 'Integriti & Tadbir Urus' }, page: 'newsroom' },
          { id: 'risk', label: { EN: 'Managing Risk', BM: 'Pengurusan Risiko' }, page: 'investment' },
          { id: 'statement-gov', label: { EN: 'Statement of Governance', BM: 'Penyata Tadbir Urus' }, page: 'investment', anchor: 'reports' },
          { id: 'internal-control', label: { EN: 'Statement of Internal Control', BM: 'Kawalan Dalaman' }, page: 'investment', anchor: 'reports' },
          { id: 'legislation', label: { EN: 'Legislation and Acts (Act 662)', BM: 'Perundangan & Akta (Akta 662)' }, page: 'newsroom' }
        ]
      },
      {
        id: 'corp-media',
        title: { EN: 'Media & Downloads', BM: 'Media & Muat Turun' },
        page: 'newsroom',
        items: [
          { id: 'press-release', label: { EN: 'Press Release', BM: 'Siaran Media' }, page: 'newsroom' },
          { id: 'announcements', label: { EN: 'Announcements', BM: 'Pengumuman' }, page: 'newsroom' },
          { id: 'insights', label: { EN: 'Insights', BM: 'Kupasan & Wacana' }, page: 'newsroom' },
          { id: 'publications', label: { EN: 'Publications & Reports', BM: 'Penerbitan & Laporan' }, page: 'investment', anchor: 'reports' },
          { id: 'tender', label: { EN: 'Notice of Tender', BM: 'Notis Tender' }, page: 'newsroom' },
          { id: 'video-gallery', label: { EN: 'Video Gallery', BM: 'Galeri Video' }, page: 'newsroom' }
        ]
      },
      {
        id: 'corp-outreach',
        title: { EN: 'Outreach & Programmes', BM: 'Program Libat Urus' },
        page: 'newsroom',
        items: [
          { id: 'inspire', label: { EN: 'KWAP Inspire Conference', BM: 'Persidangan KWAP Inspire' }, page: 'newsroom', badge: 'Flagship' },
          { id: 'anugerah', label: { EN: 'Anugerah MyPesara', BM: 'Anugerah MyPesara' }, page: 'newsroom' },
          { id: 'jelajah', label: { EN: 'Jelajah MyPesara', BM: 'Jelajah MyPesara' }, page: 'services' },
          { id: 'karnival', label: { EN: 'Karnival MyPesara', BM: 'Karnival MyPesara' }, page: 'services' },
          { id: 'app', label: { EN: 'MyPesara Mobile Application', BM: 'Aplikasi Mudah Alih MyPesara' }, page: 'services', anchor: 'mypesara' }
        ]
      }
    ]
  },
  {
    id: 'investment',
    label: { EN: 'Investment', BM: 'Pelaburan' },
    page: 'investment',
    hasDropdown: true,
    featuredDescription: {
      EN: 'Stewarding sovereign long-term assets to guarantee sustainable returns across domestic and global portfolios.',
      BM: 'Mengurus aset jangka panjang berdaulat demi menjamin pulangan mampan merentasi portfolio domestik dan antarabangsa.'
    },
    groups: [
      {
        id: 'inv-core',
        title: { EN: 'Portfolio & Strategy', BM: 'Portfolio & Strategi' },
        page: 'investment',
        items: [
          { id: 'inv-overview', label: { EN: 'Overview', BM: 'Gambaran Keseluruhan' }, page: 'investment' },
          { id: 'inv-equity', label: { EN: 'Equity', BM: 'Ekuiti' }, page: 'investment' },
          { id: 'inv-fixed-income', label: { EN: 'Fixed Income', BM: 'Pendapatan Tetap' }, page: 'investment' },
          { id: 'inv-pe', label: { EN: 'Private Equity', BM: 'Ekuiti Persendirian' }, page: 'investment' },
          { id: 'inv-re', label: { EN: 'Real Estate', BM: 'Hartanah' }, page: 'investment' }
        ]
      },
      {
        id: 'inv-stewardship',
        title: { EN: 'Governance & Framework', BM: 'Tadbir Urus & Kerangka' },
        page: 'investment',
        items: [
          { id: 'stewardship', label: { EN: 'Investment Stewardship', BM: 'Amanah Pelaburan (ESG)' }, page: 'investment' },
          { id: 'ips', label: { EN: 'Investment Policy Statement', BM: 'Pernyataan Dasar Pelaburan' }, page: 'investment', anchor: 'reports' },
          { id: 'solvency', label: { EN: 'Solvency & Fund Metrics', BM: 'Solvabiliti & Metrik Dana' }, page: 'investment', anchor: 'performance' },
          { id: 'annual-report', label: { EN: 'Annual Audited Financials', BM: 'Laporan Kewangan Diaudit' }, page: 'investment', anchor: 'reports' }
        ]
      }
    ]
  },
  {
    id: 'retirement',
    label: { EN: 'Retirement', BM: 'Persaraan' },
    page: 'services',
    persona: 'pensioners',
    hasDropdown: true,
    featuredDescription: {
      EN: 'Serving over 790,000 public service retirees, future pensioners, and surviving beneficiaries across Malaysia.',
      BM: 'Menyantuni lebih 790,000 pesara perkhidmatan awam, bakal pesara, dan waris penerima manfaat di seluruh negara.'
    },
    groups: [
      {
        id: 'ret-services',
        title: { EN: 'Pensioner Services', BM: 'Perkhidmatan Pesara' },
        page: 'services',
        persona: 'pensioners',
        items: [
          { id: 'ret-overview', label: { EN: 'Overview', BM: 'Gambaran Keseluruhan' }, page: 'services' },
          { id: 'ret-statement', label: { EN: 'Print Pension Statement', BM: 'Cetak Penyata Pencen' }, page: 'services', anchor: 'status-checker', badge: 'Online' },
          { id: 'ret-letter', label: { EN: 'Print Optional Retirement Letter', BM: 'Cetak Surat Persaraan Pilihan' }, page: 'services', anchor: 'status-checker' },
          { id: 'ret-forms', label: { EN: 'Statutory Forms & Downloads', BM: 'Borang Statutori & Muat Turun' }, page: 'services', anchor: 'forms' },
          { id: 'ret-schedule', label: { EN: 'Pension Payment Schedule 2026', BM: 'Jadual Bayaran Pencen 2026' }, page: 'services', anchor: 'status-checker' }
        ]
      },
      {
        id: 'ret-schemes',
        title: { EN: 'Schemes & Beneficiaries', BM: 'Skim & Penerima' },
        page: 'services',
        persona: 'pensioners',
        items: [
          { id: 'pensioners-list', label: { EN: 'Pensioners', BM: 'Pesara' }, page: 'services', persona: 'pensioners' },
          { id: 'future-pensioners', label: { EN: 'Future Pensioners', BM: 'Bakal Pesara' }, page: 'services', persona: 'pensioners' },
          { id: 'derivatives', label: { EN: 'Pension Derivatives (Waris)', BM: 'Pencen Terbitan (Waris)' }, page: 'services', persona: 'pensioners' },
          { id: 'representative', label: { EN: 'Pensioner’s Representative (Wakil)', BM: 'Wakil Pesara' }, page: 'services' },
          { id: 'medical-travel', label: { EN: 'Medical or Travel Coverage', BM: 'Perlindungan Perubatan & Lawatan' }, page: 'services' }
        ]
      },
      {
        id: 'ret-support',
        title: { EN: 'Administration & Help', BM: 'Pentadbiran & Bantuan' },
        page: 'services',
        items: [
          { id: 'managing-dept', label: { EN: 'Managing Department', BM: 'Jabatan Pengurusan Pencen' }, page: 'contact' },
          { id: 'ret-info', label: { EN: 'Pension Related Information', BM: 'Maklumat Berkaitan Pencen' }, page: 'services' },
          { id: 'ret-faq', label: { EN: 'FAQs on Pension Services', BM: 'Soalan Lazim Perkhidmatan Pencen' }, page: 'services', anchor: 'faq' },
          { id: 'ret-counters', label: { EN: 'Customer Service Counters', BM: 'Kaunter Khidmat Pelanggan' }, page: 'contact' }
        ]
      }
    ]
  },
  {
    id: 'contribution',
    label: { EN: 'Contribution', BM: 'Caruman' },
    page: 'services',
    persona: 'government',
    anchor: 'status-checker',
    hasDropdown: true,
    featuredDescription: {
      EN: 'Statutory employer contributions, remittances, compliance guidelines, and enforcement for public sector agencies.',
      BM: 'Caruman statutori majikan, kiriman dana, garis panduan pematuhan, dan penguatkuasaan bagi agensi sektor awam.'
    },
    groups: [
      {
        id: 'contrib-guidelines',
        title: { EN: 'Employer Remittance', BM: 'Caruman Majikan' },
        page: 'services',
        persona: 'government',
        items: [
          { id: 'contrib-overview', label: { EN: 'Overview', BM: 'Gambaran Keseluruhan' }, page: 'services', persona: 'government' },
          { id: 'employers', label: { EN: 'Contributing Employers', BM: 'Majikan Mencarum' }, page: 'services', persona: 'government' },
          { id: 'members', label: { EN: 'Contributing Members', BM: 'Ahli Mencarum' }, page: 'services', persona: 'government' },
          { id: 'rate', label: { EN: 'Rate of Contribution', BM: 'Kadar Caruman Statutori' }, page: 'services', persona: 'government' }
        ]
      },
      {
        id: 'contrib-governance',
        title: { EN: 'Compliance & Assistance', BM: 'Pematuhan & Bantuan' },
        page: 'services',
        persona: 'government',
        items: [
          { id: 'compliance', label: { EN: 'Compliance and Enforcement', BM: 'Pematuhan dan Penguatkuasaan' }, page: 'services', persona: 'government' },
          { id: 'contrib-faqs', label: { EN: 'FAQs on Contribution', BM: 'Soalan Lazim Caruman' }, page: 'services', persona: 'government', anchor: 'faq' },
          { id: 'employer-portal', label: { EN: 'Employer e-Submission Portal', BM: 'Portal e-Caruman Majikan' }, page: 'services', persona: 'government' }
        ]
      }
    ]
  }
];
