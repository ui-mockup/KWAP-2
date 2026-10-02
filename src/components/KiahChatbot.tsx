import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User, RefreshCw, ChevronUp } from 'lucide-react';
import { Language, PageId } from '../types';

interface KiahChatbotProps {
  language: Language;
  onNavigate?: (page: PageId) => void;
}

interface Message {
  id: string;
  sender: 'kiah' | 'user';
  text: string;
  time: string;
  suggestions?: string[];
}

export const KiahChatbot: React.FC<KiahChatbotProps> = ({ language, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll listener to show Back to Top button only when scrolled past the hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setShowBackToTop(heroBottom <= 0);
      } else {
        setShowBackToTop(window.scrollY > 450);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const avatarUrl = '/src/assets/images/kiah_avatar_1790790131770.jpg';

  const initialMessages: Message[] = [
    {
      id: 'welcome-1',
      sender: 'kiah',
      text:
        language === 'EN'
          ? 'Salam Sejahtera! I am KIAH, KWAP’s Virtual Assistant. How may I assist you with your pension, contributions, or investment inquiries today?'
          : 'Salam Sejahtera! Saya KIAH, Pembantu Maya KWAP. Bagaimana saya boleh bantu anda mengenai urusan pencen, caruman, atau pelaburan hari ini?',
      time: 'Just now',
      suggestions:
        language === 'EN'
          ? [
              'Pension Payment Dates 2026',
              'MyPesara App Download',
              'Change Bank Account',
              'Life Certification (Pengesahan Hayat)',
              'Contribution Portal'
            ]
          : [
              'Tarikh Bayaran Pencen 2026',
              'Muat Turun Aplikasi MyPesara',
              'Tukar Akaun Bank Pencen',
              'Pengesahan Hayat Pesara',
              'Portal Caruman Majikan'
            ]
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Formulate response
    setTimeout(() => {
      let replyText = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('tarikh') || qLower.includes('date') || qLower.includes('payment') || qLower.includes('bayaran')) {
        replyText =
          language === 'EN'
            ? 'Monthly pension disbursements are credited punctually between the 15th and 21st of each month. For October 2026, scheduled crediting is 15 October 2026. You can check your verified slip anytime on the MyPesara app.'
            : 'Bayaran pencen bulanan dikreditkan tepat pada antara 15 hingga 21 hari bulan setiap bulan. Untuk bulan Oktober 2026, bayaran dijadualkan pada 15 Oktober 2026. Penyata boleh disemak melalui aplikasi MyPesara.';
      } else if (qLower.includes('mypesara') || qLower.includes('download') || qLower.includes('app') || qLower.includes('aplikasi')) {
        replyText =
          language === 'EN'
            ? 'The MyPesara app is available for free download on the Apple App Store and Google Play Store. It features your Digital Pensioner Card, instant payslip downloads, and digital life verification.'
            : 'Aplikasi MyPesara boleh dimuat turun secara percuma di Apple App Store dan Google Play Store. Ia mengandungi Kad Pesara Digital, penyata pencen bulanan, dan pengesahan hayat digital.';
      } else if (qLower.includes('akaun') || qLower.includes('bank') || qLower.includes('tukar') || qLower.includes('change')) {
        replyText =
          language === 'EN'
            ? 'To update your pension crediting bank account, submit Form KWAP-1M together with your certified bank statement at any KWAP counter or via the MyPesara portal.'
            : 'Untuk menukar akaun bank bayaran pencen, sila kemukakan Borang KWAP-1M bersama salinan penyata akaun bank yang disahkan di kaunter KWAP atau melalui portal MyPesara.';
      } else if (qLower.includes('hayat') || qLower.includes('life') || qLower.includes('certif')) {
        replyText =
          language === 'EN'
            ? 'Pensioners residing abroad or elderly pensioners requiring annual life verification can perform verification via biometric facial recognition on the MyPesara app or at Malaysian diplomatic missions.'
            : 'Pengesahan hayat tahunan bagi pesara yang menetap di luar negara atau warga emas boleh dilakukan melalui imbasan biometrik di aplikasi MyPesara atau di pejabat perwakilan Malaysia.';
      } else if (qLower.includes('caruman') || qLower.includes('contribution') || qLower.includes('majikan') || qLower.includes('portal')) {
        replyText =
          language === 'EN'
            ? 'Statutory employer contributions must be remitted by statutory bodies and local authorities by the 15th of each month through the official KWAP Contribution Portal.'
            : 'Caruman statutori majikan bagi agensi kerajaan dan pihak berkuasa tempatan perlu dijelaskan sebelum 15 hari bulan setiap bulan melalui Portal Caruman KWAP.';
      } else {
        replyText =
          language === 'EN'
            ? `Thank you for your question regarding "${query}". For detailed official verification, please contact our Call Centre at +603 8887 8777 (Cyberjaya) or +603 2174 8000 (Kuala Lumpur), or email mypesara@kwap.gov.my.`
            : `Terima kasih atas pertanyaan anda mengenai "${query}". Untuk bantuan lanjut, sila hubungi Pusat Panggilan kami di talian +603 8887 8777 (Cyberjaya) atau +603 2174 8000 (Kuala Lumpur), atau e-mel ke mypesara@kwap.gov.my.`;
      }

      const botReply: Message = {
        id: `kiah-${Date.now()}`,
        sender: 'kiah',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Cluster: "Chat with KIAH" Button + "Back to Top" Button */}
      <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 flex items-center gap-3">
        {/* Chat with KIAH button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={language === 'EN' ? 'Chat with KIAH Virtual Assistant' : 'Bual bersama Pembantu Maya KIAH'}
          className="group relative flex items-center bg-white text-[#101820] hover:text-[#10069F] rounded-full shadow-2xl border-2 border-[#10069F]/20 hover:border-[#10069F] py-1.5 pl-5 pr-1.5 gap-3 transition-all transform hover:scale-[1.03] active:scale-95 cursor-pointer"
        >
          <span className="font-bold text-sm tracking-wide">
            {language === 'EN' ? 'Chat with KIAH' : 'Bual dengan KIAH'}
          </span>
          <div className="relative">
            <img
              src={avatarUrl}
              alt="KIAH"
              width={48}
              height={48}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#10069F] shadow-sm group-hover:ring-2 group-hover:ring-[#FFA400] transition-all"
            />
            {/* Green Online status badge */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-600/30" />
          </div>
        </button>

        {/* Back to Top Button (appears only when user has scrolled past the hero section) */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={language === 'EN' ? 'Back to top' : 'Kembali ke atas'}
            title={language === 'EN' ? 'Back to top' : 'Kembali ke atas'}
            className="w-12 h-12 bg-[#10069F] hover:bg-[#0c047d] text-white rounded-lg flex items-center justify-center transition-all shadow-2xl hover:scale-105 active:scale-95 cursor-pointer border border-[#6CACE4]/40 animate-in fade-in zoom-in-75 duration-200"
          >
            <ChevronUp className="w-6 h-6 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* KIAH Chatbot Dialog Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="KIAH Virtual Assistant"
          className="fixed bottom-36 sm:bottom-40 right-4 sm:right-6 z-50 w-[380px] max-w-[calc(100vw-32px)] h-[520px] max-h-[calc(100vh-180px)] bg-white rounded-2xl shadow-2xl border border-[#D0D3D4] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200"
        >
          {/* Header Bar: KWAP Primary Blue */}
          <div className="bg-[#10069F] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt="KIAH"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#FFA400]"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#10069F]" />
              </div>
              <div>
                <div className="font-extrabold text-sm flex items-center gap-1.5">
                  <span>KIAH</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#FFA400] text-[#101820] font-bold rounded">
                    KWAP AI
                  </span>
                </div>
                <div className="text-[11px] text-white/80">
                  {language === 'EN' ? 'KWAP Virtual Assistant' : 'Pembantu Maya KWAP'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages(initialMessages)}
                title={language === 'EN' ? 'Reset Conversation' : 'Mula Semula'}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close KIAH chat"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F4F6F8]">
            <div className="text-center my-1">
              <span className="text-[11px] text-[#101820]/50 bg-white/80 px-2.5 py-1 rounded-full border border-[#D0D3D4]/50">
                {language === 'EN' ? 'Today · Official KWAP Assistance' : 'Hari Ini · Bantuan Rasmi KWAP'}
              </span>
            </div>

            {messages.map((m) => {
              const isKiah = m.sender === 'kiah';
              return (
                <div key={m.id} className={`flex flex-col ${isKiah ? 'items-start' : 'items-end'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isKiah
                        ? 'bg-white text-[#101820] rounded-tl-xs border border-[#D0D3D4]/70'
                        : 'bg-[#10069F] text-white rounded-tr-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    <div
                      className={`text-[10px] mt-1 text-right ${
                        isKiah ? 'text-[#101820]/50' : 'text-white/70'
                      }`}
                    >
                      {m.time}
                    </div>
                  </div>

                  {/* Suggestion Chips */}
                  {isKiah && m.suggestions && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                      {m.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(suggestion)}
                          className="text-[11px] font-semibold bg-white hover:bg-[#EAF3FB] text-[#10069F] border border-[#6CACE4]/40 hover:border-[#10069F] px-2.5 py-1 rounded-full transition-all text-left shadow-2xs"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#101820]/60 p-2 bg-white rounded-xl w-fit border border-[#D0D3D4]/50">
                <span className="w-2 h-2 rounded-full bg-[#10069F] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#10069F] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#10069F] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-[#101820]/70 ml-1">
                  {language === 'EN' ? 'KIAH is typing...' : 'KIAH sedang menaip...'}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#D0D3D4] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === 'EN' ? 'Ask KIAH anything about KWAP...' : 'Tanya KIAH apa-apa mengenai KWAP...'
              }
              className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-[#F4F6F8] rounded-full border border-[#D0D3D4] focus:outline-none focus:border-[#10069F] focus:ring-1 focus:ring-[#10069F]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="w-9 h-9 rounded-full bg-[#10069F] hover:bg-[#0c047d] disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
