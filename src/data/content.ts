import { PersonaContent, TaskCard, NewsItem, FAQItem, ReportItem, PhotoCredit } from '../types';

export const PERSONA_DATA: Record<string, PersonaContent> = {
  pensioners: {
    id: 'pensioners',
    label: { EN: 'Pensioners & Retirees', BM: 'Pesara & Bakal Pesara' },
    badge: { EN: 'Retiree Support', BM: 'Sokongan Pesara' },
    headline: {
      EN: 'Peace of mind in every stage of retirement.',
      BM: 'Ketenangan fikiran di setiap fasa persaraan anda.'
    },
    subtext: {
      EN: 'Access your monthly pension status, update banking particulars, and receive caring assistance anytime.',
      BM: 'Semak penyata bulanan, kemas kini butiran akaun, dan dapatkan bimbingan mesra pada bila-bila masa.'
    },
    primaryCta: {
      text: { EN: 'Check Pension Status', BM: 'Semak Status Penyata' },
      page: 'services',
      anchor: 'status-checker'
    },
    secondaryCta: {
      text: { EN: 'Download MyPesara App', BM: 'Muat Turun MyPesara' },
      page: 'services',
      anchor: 'mypesara'
    },
    statusChip: {
      title: { EN: 'Next Pension Credit', BM: 'Kredit Pencen Seterusnya' },
      value: { EN: '15 October 2026', BM: '15 Oktober 2026' }
    },
    heroImage: 'https://images.unsplash.com/photo-1758691031749-607d43c14f63?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb',
    imageAlt: 'Retirees in Malaysia enjoying vibrant active retirement'
  },
  government: {
    id: 'government',
    label: { EN: 'Government & Employers', BM: 'Kerajaan & Majikan' },
    badge: { EN: 'Statutory Body Portal', BM: 'Portal Badan Berkanun' },
    headline: {
      EN: 'Safeguarding Malaysia’s public service stewardship.',
      BM: 'Memelihara amanah perkhidmatan awam Malaysia.'
    },
    subtext: {
      EN: 'Streamlined employer contribution remittances, statutory actuarial records, and verified pension reporting for ministries and agencies.',
      BM: 'Pengurusan caruman majikan teratur, rekod aktuari statutori, dan laporan pencen telus bagi kementerian serta agensi awam.'
    },
    primaryCta: {
      text: { EN: 'Statutory Contributions', BM: 'Sistem Caruman Statutori' },
      page: 'services',
      anchor: 'employer'
    },
    secondaryCta: {
      text: { EN: 'Actuarial Statements', BM: 'Penyata Aktuari' },
      page: 'investment',
      anchor: 'reports'
    },
    statusChip: {
      title: { EN: 'Statutory Compliance', BM: 'Pematuhan Statutori' },
      value: { EN: '100% Audited Rating', BM: '100% Penarafan Diaudit' }
    },
    heroImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=75',
    imageAlt: 'Public sector professionals reviewing institutional governance records'
  },
  investors: {
    id: 'investors',
    label: { EN: 'Investment & Market', BM: 'Pelaburan & Pasaran' },
    badge: { EN: 'Sovereign Fund', BM: 'Dana Berdaulat' },
    headline: {
      EN: 'Disciplined compounding for multigenerational security.',
      BM: 'Pelaburan berdisiplin demi jaminan masa depan bergenerasi.'
    },
    subtext: {
      EN: 'Allocating RM 184.5 billion across strategic domestic equities, resilient fixed income, real estate, and global alternative markets.',
      BM: 'Mengurus RM 184.5 bilion merentasi ekuiti domestik, pendapatan tetap berdaya tahan, hartanah, dan pasaran alternatif global.'
    },
    primaryCta: {
      text: { EN: 'View Portfolio Performance', BM: 'Lihat Prestasi Portfolio' },
      page: 'investment',
      anchor: 'performance'
    },
    secondaryCta: {
      text: { EN: 'Read Annual Report 2025', BM: 'Laporan Tahunan 2025' },
      page: 'investment',
      anchor: 'reports'
    },
    statusChip: {
      title: { EN: 'Assets Under Management', BM: 'Aset Di Bawah Pengurusan' },
      value: { EN: 'RM 184.5 Billion', BM: 'RM 184.5 Bilion' }
    },
    heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=75',
    imageAlt: 'Panoramic view of Kuala Lumpur skyline showcasing Malaysia financial district'
  },
  society: {
    id: 'society',
    label: { EN: 'Society & Nation', BM: 'Masyarakat & Negara' },
    badge: { EN: 'Social Impact', BM: 'Impak Sosial' },
    headline: {
      EN: 'Fostering dignified aging and community resilience.',
      BM: 'Memartabatkan penuaan bermaruah dan kesejahteraan komuniti.'
    },
    subtext: {
      EN: 'Discover KWAP initiatives in senior active living, elder wellness advocacy, sustainability leadership, and nation-building investments.',
      BM: 'Inisiatif KWAP memperkasa gaya hidup aktif warga emas, advokasi kesihatan, kelestarian ESG, dan pembangunan sosioekonomi negara.'
    },
    primaryCta: {
      text: { EN: 'Explore Outreach & News', BM: 'Terokai Berita & Komuniti' },
      page: 'newsroom'
    },
    secondaryCta: {
      text: { EN: 'Community Contact', BM: 'Hubungi Kami' },
      page: 'contact'
    },
    statusChip: {
      title: { EN: 'Community Beneficiaries', BM: 'Penerima Manfaat Komuniti' },
      value: { EN: '790,000+ Seniors', BM: '790,000+ Warga Emas' }
    },
    heroImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=75',
    imageAlt: 'Warm multi-generational gathering reflecting Malaysian social harmony'
  }
};

export const POPULAR_TOPICS = [
  { id: 'status', label: { EN: 'Pension Status & Slip', BM: 'Semakan Penyata Pencen' }, icon: 'FileText', page: 'services' as const },
  { id: 'dates', label: { EN: 'Payment Schedule 2026', BM: 'Jadual Pembayaran 2026' }, icon: 'Calendar', page: 'services' as const },
  { id: 'forms', label: { EN: 'Forms & Downloads', BM: 'Borang & Muat Turun' }, icon: 'Download', page: 'services' as const },
  { id: 'annual-report', label: { EN: 'Annual Report', BM: 'Laporan Tahunan' }, icon: 'BookOpen', page: 'investment' as const },
  { id: 'mypesara', label: { EN: 'MyPesara Mobile App', BM: 'Aplikasi Mudah Alih MyPesara' }, icon: 'Smartphone', page: 'services' as const },
  { id: 'podcasts', label: { EN: 'KWAP Retiree News', BM: 'Berita & Majalah KWAP' }, icon: 'Radio', page: 'newsroom' as const },
  { id: 'branches', label: { EN: 'Service Counter Locations', BM: 'Lokasi Kaunter Khidmat' }, icon: 'MapPin', page: 'contact' as const }
];

export const TASK_CARDS: TaskCard[] = [
  {
    id: 'status',
    category: 'pensioner',
    title: { EN: 'Check Pension Status', BM: 'Semak Status Penyata Pencen' },
    description: {
      EN: 'View monthly crediting dates, historical disbursement slips, and statutory deductions online with ease.',
      BM: 'Semak tarikh bayaran bulanan, slip pembayaran terdahulu, dan potongan statutori secara selamat.'
    },
    actionLabel: { EN: 'Open Status Checker', BM: 'Buka Semakan Status' },
    iconName: 'Search',
    badge: { EN: 'Self-Service', BM: 'Layan Diri' }
  },
  {
    id: 'update',
    category: 'pensioner',
    title: { EN: 'Update Banking Particulars', BM: 'Kemas Kini Maklumat Akaun' },
    description: {
      EN: 'Safely change your recipient bank account, residential address, or primary phone number.',
      BM: 'Kemas kini akaun bank penerima, alamat surat-menyurat, atau nombor telefon secara rasmi.'
    },
    actionLabel: { EN: 'Update Details', BM: 'Kemas Kini Maklumat' },
    iconName: 'UserCheck',
    badge: { EN: 'Secure Portal', BM: 'Portal Selamat' }
  },
  {
    id: 'plan',
    category: 'future',
    title: { EN: 'Plan Your Retirement', BM: 'Rancang Persaraan Anda' },
    description: {
      EN: 'Use the interactive retirement pension estimator to calculate prospective gratuity and monthly entitlement.',
      BM: 'Gunakan kalkulator pencen interaktif untuk menganggarkan ganjaran perkhidmatan dan pencen bulanan.'
    },
    actionLabel: { EN: 'Calculate Estimate', BM: 'Kira Anggaran' },
    iconName: 'Calculator',
    badge: { EN: 'Calculator', BM: 'Kalkulator' }
  },
  {
    id: 'forms',
    category: 'everyone',
    title: { EN: 'Forms & Official Downloads', BM: 'Borang & Dokumen Rasmi' },
    description: {
      EN: 'Download verified JPA and KWAP authorization forms, statutory declarations, and direct debit kits.',
      BM: 'Muat turun borang rasmi JPA dan KWAP, surat akuan berkanun, serta borang kebenaran bank.'
    },
    actionLabel: { EN: 'Browse Forms', BM: 'Lihat Senarai Borang' },
    iconName: 'FileDown',
    badge: { EN: 'PDF & Guides', BM: 'PDF & Panduan' }
  },
  {
    id: 'mypesara',
    category: 'everyone',
    title: { EN: 'Get the MyPesara App', BM: 'Muat Turun Aplikasi MyPesara' },
    description: {
      EN: 'Carry your digital pensioner ID card, discount privileges, and instant payment alerts everywhere.',
      BM: 'Bawa kad pesara digital, nikmati diskaun istimewa, dan terima notifikasi bayaran terus di telefon.'
    },
    actionLabel: { EN: 'Download App', BM: 'Muat Turun Aplikasi' },
    iconName: 'Smartphone',
    badge: { EN: 'iOS & Android', BM: 'iOS & Android' }
  },
  {
    id: 'beneficiary',
    category: 'beneficiary',
    title: { EN: 'Derivative Pension Claims', BM: 'Tuntutan Pencen Terbitan' },
    description: {
      EN: 'Compassionate assistance for spouses and eligible dependents navigating derivative pension transition.',
      BM: 'Bantuan mesra bagi pasangan dan tanggungan yang layak dalam urusan permohonan pencen terbitan.'
    },
    actionLabel: { EN: 'View Guide & Steps', BM: 'Panduan & Langkah' },
    iconName: 'HeartHandshake',
    badge: { EN: 'Welfare Care', BM: 'Kebajikan' }
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    title: {
      EN: 'KWAP Records Resilient 7.2% Total Fund Investment Return for FY2025',
      BM: 'KWAP Mencatat Pulangan Pelaburan Berdaya Tahan 7.2% bagi TK2025'
    },
    summary: {
      EN: 'Strategic diversification across public equities and global infrastructure reinforces long-term solvency for Malaysia’s civil service pension fund.',
      BM: 'Kepelbagaian strategik merentasi ekuiti awam dan infrastruktur global mengukuhkan solvabiliti jangka panjang dana persaraan awam negara.'
    },
    category: 'Reports',
    categoryBM: 'Laporan',
    date: '18 September 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'KWAP leadership analyzing financial growth figures and portfolio performance',
    photographer: 'Adeolu Eletu',
    photographerUrl: 'https://unsplash.com/@adeolueletu',
    featured: true,
    content: {
      EN: 'Kumpulan Wang Persaraan (Diperbadankan) [KWAP] today announced a resilient net investment return of 7.2% for the fiscal year 2025, driven by proactive asset rebalancing and prudent liquidity management across international markets and resilient domestic bond yields. Total assets under management grew steadily to RM 184.5 billion, maintaining top-tier solvency buffers for the nation’s 790,000 pensioners.',
      BM: 'Kumpulan Wang Persaraan (Diperbadankan) [KWAP] hari ini mengumumkan pulangan pelaburan bersih berdaya tahan sebanyak 7.2% bagi tahun kewangan 2025. Prestasi ini disokong pengimbangan semula aset yang proaktif dan pengurusan kecairan berhemah di pasaran antarabangsa serta hasil bon domestik. Jumlah aset di bawah pengurusan meningkat kepada RM 184.5 bilion, mengekalkan penampan solvabiliti kukuh demi kesejahteraan 790,000 pesara perkhidmatan awam.'
    }
  },
  {
    id: 'news-2',
    title: {
      EN: 'KWAP Expands Senior Active Living Grants Across 14 Malaysian States',
      BM: 'KWAP Luaskan Geran Gaya Hidup Aktif Warga Emas ke Seluruh 14 Negeri'
    },
    summary: {
      EN: 'New community partnership funds empower retiree clubs with free health screenings, digital literacy classes, and intergenerational craft workshops.',
      BM: 'Dana kerjasama komuniti baharu memperkasa persatuan pesara dengan saringan kesihatan percuma, kelas celik digital, dan bengkel intergenerasi.'
    },
    category: 'Campaigns',
    categoryBM: 'Kempen',
    date: '02 September 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'Smiling elderly woman participating in community senior wellness programme',
    photographer: 'Eye for Ebony',
    photographerUrl: 'https://unsplash.com/@eyeforebony',
    content: {
      EN: 'Under the "Teman Persaraan Anda" initiative, KWAP has launched the 2026 Senior Living Impact Grant. The programme funds local pensioner associations to conduct regular gentle fitness sessions, nutritional guidance, and digital smartphone coaching to ensure every retiree stays connected and vibrant.',
      BM: 'Di bawah inisiatif "Teman Persaraan Anda", KWAP melancarkan Geran Impak Kehidupan Warga Emas 2026. Program ini membiayai persatuan pesara tempatan bagi menganjurkan aktiviti kecergasan lembut, panduan pemakanan sihat, dan bimbingan digital agar setiap pesara kekal aktif dan berhubung.'
    }
  },
  {
    id: 'news-3',
    title: {
      EN: 'Public Sector Pension Payment Calendar for Q4 2026 Published',
      BM: 'Jadual Pembayaran Pencen Perkhidmatan Awam Suku Keempat 2026 Diterbitkan'
    },
    summary: {
      EN: 'Official payment disbursement dates for October, November, and December 2026 are now accessible on the portal and MyPesara mobile app.',
      BM: 'Tarikh rasmi pengkreditan bayaran pencen bagi bulan Oktober, November, dan Disember 2026 kini boleh disemak di portal dan aplikasi MyPesara.'
    },
    category: 'Announcements',
    categoryBM: 'Pengumuman',
    date: '24 August 2026',
    readTime: '2 min read',
    imageUrl: '/images/calendar-r1CDF8HXgJY.jpg',
    imageAlt: 'A close-up photograph of a calendar on a table by Road Ahead',
    photographer: 'Road Ahead',
    photographerUrl: 'https://unsplash.com/@roadahead_2223',
    content: {
      EN: 'The public service pension disbursement schedule for the final quarter of 2026 has been finalized in coordination with the Accountant General’s Department (JANM) and Bank Negara Malaysia commercial partners. Beneficiaries are encouraged to verify their direct deposit accounts in advance.',
      BM: 'Jadual pengkreditan bayaran pencen bagi suku keempat 2026 telah dimuktamadkan bersama Jabatan Akauntan Negara Malaysia (JANM) dan rakan institusi perbankan. Penerima dinasihatkan memastikan maklumat akaun bank sentiasa aktif.'
    }
  },
  {
    id: 'news-4',
    title: {
      EN: 'Invitation to Tender: Enterprise Cloud Security and Data Governance Infrastructure',
      BM: 'Tawaran Tender: Infrastruktur Keselamatan Awan dan Tadbir Urus Data'
    },
    summary: {
      EN: 'KWAP invites qualified and certified bumiputera and open technology vendors to participate in the upcoming institutional infrastructure modernization tender.',
      BM: 'KWAP mempelawa pembekal teknologi bertauliah menyertai tender pemodenan infrastruktur keselamatan awan dan tadbir urus data korporat.'
    },
    category: 'Tenders',
    categoryBM: 'Tender',
    date: '15 August 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'Modern architectural glass skyscraper representing corporate integrity',
    photographer: 'Sean Pollock',
    photographerUrl: 'https://unsplash.com/@seanpollock',
    content: {
      EN: 'Notice is hereby given that KWAP is opening tender RFP/KWAP/IT/2026/04 for institutional enterprise security modernization. Detailed tender documents, mandatory technical briefing schedules, and submission deadlines are available in the KWAP e-Procurement portal.',
      BM: 'Notis ini memaklumkan pembukaan tender RFP/KWAP/IT/2026/04 bagi pemodenan keselamatan sistem maklumat korporat. Dokumen terperinci, sesi taklimat wajib, dan syarat kelayakan boleh diakses melalui portal e-Perolehan KWAP.'
    }
  },
  {
    id: 'news-5',
    title: {
      EN: 'Sustainability Report 2025: Scaling Net-Zero Transition in Malaysia’s Sovereign Assets',
      BM: 'Laporan Kelestarian 2025: Mempercepat Transisi Sifar Bersih dalam Portfolio KWAP'
    },
    summary: {
      EN: 'KWAP surpasses 28% ESG-screened domestic portfolio target and expands renewable energy co-investments in line with the National Energy Transition Roadmap.',
      BM: 'KWAP melepasi sasaran 28% saringan ESG dalam portfolio domestik dan meluaskan pelaburan tenaga boleh diperbaharui selaras Pelan Hala Tuju Peralihan Tenaga Negara.'
    },
    category: 'Reports',
    categoryBM: 'Laporan',
    date: '04 August 2026',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'Modern green sustainable architecture with vertical gardens and glass facade',
    photographer: 'Danist Soh',
    photographerUrl: 'https://unsplash.com/@danistsoh',
    content: {
      EN: 'As a signatory to the United Nations Principles for Responsible Investment (UNPRI), KWAP has embedded climate resilience, ethical governance, and social uplift into every asset management mandate. The 2025 Sustainability Report illustrates quantifiable emissions reduction across owned infrastructure.',
      BM: 'Sebagai penandatangan Prinsip Pelaburan Bertanggungjawab PBB (UNPRI), KWAP telah menyepadukan daya tahan iklim, tadbir urus beretika, dan kesejahteraan masyarakat ke dalam mandat pelaburan. Laporan Kelestarian 2025 memperincikan penurunan jejak karbon merentasi portfolio pelaburan.'
    }
  },
  {
    id: 'news-6',
    title: {
      EN: 'MyPesara 3.0 Major Update: Enhanced Face-Verification for Bedridden Pensioners',
      BM: 'Kemas Kini Utama MyPesara 3.0: Pengecaman Wajah Selamat Bagi Pesara Uzur'
    },
    summary: {
      EN: 'New accessible biometric validation enables elderly and bedridden pensioners to complete annual life verification directly from home without visiting branch counters.',
      BM: 'Ciri biometrik terbaharu membolehkan pesara warga emas dan uzur melengkapkan pengesahan hayat tahunan dari rumah tanpa perlu hadir ke kaunter.'
    },
    category: 'Announcements',
    categoryBM: 'Pengumuman',
    date: '20 July 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=75',
    imageAlt: 'Elderly gentleman with gentle smile using mobile digital service',
    photographer: 'Centre for Ageing Better',
    photographerUrl: 'https://unsplash.com/@ageing_better',
    content: {
      EN: 'To eliminate travelling hardship for frail and elderly pensioners, KWAP and the Public Service Department (JPA) have rolled out enhanced AI-guided biometric verification in the MyPesara mobile application. The feature includes spoken voice assistance in Bahasa Melayu and English.',
      BM: 'Bagi meringankan kesukaran pesara uzur bergerak ke kaunter, KWAP bersama JPA telah memperkenalkan pengesahan biometrik pintar dalam aplikasi MyPesara dengan panduan suara dwibahasa yang mesra warga emas.'
    }
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: {
      EN: 'When is the civil service pension credited into bank accounts every month?',
      BM: 'Bilakah bayaran pencen perkhidmatan awam dikreditkan ke dalam akaun bank setiap bulan?'
    },
    answer: {
      EN: 'Pension disbursements generally take place between the 15th and 20th of each calendar month, or earlier if festive holidays (such as Hari Raya Aidilfitri, Chinese New Year, Deepavali, or Christmas) coincide with the week. You can view the complete annual schedule on our portal or via the MyPesara mobile application.',
      BM: 'Bayaran pencen lazimnya dikreditkan antara 15 hingga 20 hari bulan setiap bulan, atau lebih awal sekiranya terdapat cuti perayaan utama (seperti Hari Raya Aidilfitri, Tahun Baru Cina, Deepavali, atau Krismas). Jadual lengkap setahun boleh disemak di portal ini atau aplikasi MyPesara.'
    },
    category: 'Disbursement'
  },
  {
    id: 'faq-2',
    question: {
      EN: 'How do I update my bank account if I switch to a different commercial bank?',
      BM: 'Bagaimanakah cara menukar akaun bank penerima bayaran pencen?'
    },
    answer: {
      EN: 'You can update your banking particulars either directly through the verified MyPesara app, via the KWAP online portal using your MyKad credentials, or by submitting Form JPA.BP.SKP.B01b along with a copy of your bank passbook/statement to any KWAP or JPA service counter.',
      BM: 'Anda boleh mengemas kini nombor akaun bank melalui aplikasi MyPesara, portal rasmi KWAP dengan MyKad yang disahkan, atau menghantar Borang JPA.BP.SKP.B01b berserta salinan penyata akaun bank ke mana-mana kaunter khidmat pelanggan KWAP atau JPA.'
    },
    category: 'Account'
  },
  {
    id: 'faq-3',
    question: {
      EN: 'Who is eligible to receive a derivative pension upon the passing of a pensioner?',
      BM: 'Siapakah yang layak menerima pencen terbitan sekiranya pesara meninggal dunia?'
    },
    answer: {
      EN: 'Under the statutory Pensions Act 1980 (Act 227), a derivative pension is payable to the surviving legal spouse married during the service period, as well as surviving children below the age of 21 (or until completion of first degree for higher education, or lifelong for children with disabilities certified by the Department of Social Welfare).',
      BM: 'Di bawah Akta Pencen 1980 (Akta 227), pencen terbitan layak dibayar kepada balu atau duda yang sah berkahwin semasa dalam perkhidmatan, serta anak-anak di bawah umur 21 tahun (atau sehingga tamat ijazah pertama, atau seumur hidup bagi anak kelainan upaya yang disahkan JKM).'
    },
    category: 'Derivative'
  }
];

export const REPORT_ITEMS: ReportItem[] = [
  {
    id: 'rep-1',
    title: { EN: 'KWAP Annual Report 2025: Sustaining Multigenerational Value', BM: 'Laporan Tahunan KWAP 2025: Memperkasa Nilai Bergenerasi' },
    type: 'Annual Report',
    year: '2025',
    size: '14.8 MB',
    language: 'EN / BM'
  },
  {
    id: 'rep-2',
    title: { EN: 'Q2 2026 Quarterly Portfolio Performance & Economic Review', BM: 'Kajian Ekonomi & Prestasi Portfolio Suku Kedua 2026' },
    type: 'Quarterly Review',
    year: '2026',
    size: '4.2 MB',
    language: 'EN'
  },
  {
    id: 'rep-3',
    title: { EN: 'KWAP Sustainability & ESG Impact Statement 2025', BM: 'Penyata Kelestarian & Impak ESG KWAP 2025' },
    type: 'Sustainability Report',
    year: '2025',
    size: '8.6 MB',
    language: 'EN / BM'
  },
  {
    id: 'rep-4',
    title: { EN: 'Audited Financial Statements & Actuarial Solvency Report', BM: 'Penyata Kewangan Diaudit & Laporan Solvabiliti Aktuari' },
    type: 'Financial Statements',
    year: '2025',
    size: '11.1 MB',
    language: 'EN / BM'
  }
];

export const PHOTO_CREDITS: PhotoCredit[] = [
  {
    id: 'credit-1',
    subject: 'Elderly Malaysian couple strolling happily outdoors in retirement',
    photographer: 'Vince Fleming',
    profileUrl: 'https://unsplash.com/@vincefleming',
    unsplashUrl: 'https://unsplash.com/photos/1581579438747-1dc8d17bbce4',
    pageUsed: 'Homepage Hero & Pensioner Services Banner'
  },
  {
    id: 'credit-2',
    subject: 'Kuala Lumpur modern skyline at twilight highlighting financial hub',
    photographer: 'Esmonde Yong',
    profileUrl: 'https://unsplash.com/@esmonde_yong',
    unsplashUrl: 'https://unsplash.com/photos/1596422846543-75c6fc197f07',
    pageUsed: 'Homepage & Investment Banner'
  },
  {
    id: 'credit-3',
    subject: 'Dignified elderly gentleman with warm friendly expression',
    photographer: 'Centre for Ageing Better',
    profileUrl: 'https://unsplash.com/@ageing_better',
    unsplashUrl: 'https://unsplash.com/photos/1576765608535-5f04d1e3f289',
    pageUsed: 'Newsroom & App Section'
  },
  {
    id: 'credit-4',
    subject: 'Warm multi-generational Southeast Asian family gathering',
    photographer: 'Naassom Azevedo',
    profileUrl: 'https://unsplash.com/@naassomz1',
    unsplashUrl: 'https://unsplash.com/photos/1529156069898-49953e39b3ac',
    pageUsed: 'Homepage Persona Card (Society)'
  },
  {
    id: 'credit-5',
    subject: 'Corporate financial leadership reviewing charts and portfolio records',
    photographer: 'Adeolu Eletu',
    profileUrl: 'https://unsplash.com/@adeolueletu',
    unsplashUrl: 'https://unsplash.com/photos/1454165804606-c3d57bc86b40',
    pageUsed: 'Newsroom Featured Story'
  },
  {
    id: 'credit-6',
    subject: 'Modern architectural glass tower (Integra Tower style)',
    photographer: 'Sean Pollock',
    profileUrl: 'https://unsplash.com/@seanpollock',
    unsplashUrl: 'https://unsplash.com/photos/1486406146926-c627a92ad1ab',
    pageUsed: 'Contact Page HQ Showcase'
  },
  {
    id: 'credit-7',
    subject: 'Elderly hands holding a warm tea cup, symbolizing social security',
    photographer: 'Matthew Bennett',
    profileUrl: 'https://unsplash.com/@matthew_t_r_bennett',
    unsplashUrl: 'https://unsplash.com/photos/1516585427167-9f4af9627e6c',
    pageUsed: 'Newsroom & Pensioner Services Guide'
  },
  {
    id: 'credit-8',
    subject: 'Smiling older woman in bright daylight',
    photographer: 'Eye for Ebony',
    profileUrl: 'https://unsplash.com/@eyeforebony',
    unsplashUrl: 'https://unsplash.com/photos/1544717305-2782549b5136',
    pageUsed: 'Newsroom Community Feature'
  }
];
