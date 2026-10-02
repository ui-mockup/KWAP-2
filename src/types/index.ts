export type Language = 'EN' | 'BM';

export type PageId = 'home' | 'services' | 'newsroom' | 'investment' | 'contact';

export type PersonaId = 'pensioners' | 'government' | 'investors' | 'society';

export interface AccessibilitySettings {
  textScale: '100' | '125' | '150';
  highContrast: boolean;
  colourBlind: boolean;
  elderlyMode: boolean;
}

export interface PersonaContent {
  id: PersonaId;
  label: { EN: string; BM: string };
  badge: { EN: string; BM: string };
  headline: { EN: string; BM: string };
  subtext: { EN: string; BM: string };
  primaryCta: { text: { EN: string; BM: string }; page: PageId; anchor?: string };
  secondaryCta: { text: { EN: string; BM: string }; page: PageId; anchor?: string };
  statusChip: { title: { EN: string; BM: string }; value: { EN: string; BM: string } };
  heroImage: string;
  imageAlt: string;
}

export interface TaskCard {
  id: string;
  category: 'everyone' | 'pensioner' | 'future' | 'beneficiary';
  title: { EN: string; BM: string };
  description: { EN: string; BM: string };
  actionLabel: { EN: string; BM: string };
  iconName: string;
  badge?: { EN: string; BM: string };
}

export interface NewsItem {
  id: string;
  title: { EN: string; BM: string };
  summary: { EN: string; BM: string };
  category: 'Announcements' | 'Campaigns' | 'Reports' | 'Tenders';
  categoryBM: string;
  date: string;
  readTime: string;
  imageUrl: string;
  imageAlt: string;
  photographer: string;
  photographerUrl: string;
  featured?: boolean;
  content: { EN: string; BM: string };
}

export interface FAQItem {
  id: string;
  question: { EN: string; BM: string };
  answer: { EN: string; BM: string };
  category: string;
}

export interface ReportItem {
  id: string;
  title: { EN: string; BM: string };
  type: string;
  year: string;
  size: string;
  language: string;
}

export interface PhotoCredit {
  id: string;
  subject: string;
  photographer: string;
  profileUrl: string;
  unsplashUrl: string;
  pageUsed: string;
}
