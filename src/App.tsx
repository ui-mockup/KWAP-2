/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, PersonaId, Language, AccessibilitySettings } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { KiahChatbot } from './components/KiahChatbot';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { PensionerServicesPage } from './pages/PensionerServicesPage';
import { NewsroomPage } from './pages/NewsroomPage';
import { InvestmentPage } from './pages/InvestmentPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [activePersona, setActivePersona] = useState<PersonaId>('pensioners');

  // Language State
  const [language, setLanguage] = useState<Language>('EN');

  // Accessibility Settings State
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    textScale: '100',
    highContrast: false,
    colourBlind: false,
    elderlyMode: false
  });

  // Global Modals State
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  // Sync hash with currentPage
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages: PageId[] = ['home', 'services', 'newsroom', 'investment', 'contact'];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update Body CSS classes based on accessibility settings
  useEffect(() => {
    const body = document.body;

    // Font Scale
    body.classList.remove('font-scale-100', 'font-scale-125', 'font-scale-150');
    body.classList.add(`font-scale-${accessibility.textScale}`);

    // High Contrast
    if (accessibility.highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    // Colour-Blind Mode
    if (accessibility.colourBlind) {
      body.classList.add('colour-blind');
    } else {
      body.classList.remove('colour-blind');
    }

    // Elderly-friendly Mode
    if (accessibility.elderlyMode) {
      body.classList.add('elderly-mode');
    } else {
      body.classList.remove('elderly-mode');
    }
  }, [accessibility]);

  // Navigate handler with optional anchor scrolling
  const handleNavigate = (page: PageId, persona?: PersonaId, anchor?: string) => {
    setCurrentPage(page);
    window.location.hash = page;

    if (persona) {
      setActivePersona(persona);
    }

    window.scrollTo({ top: 0, behavior: accessibility.elderlyMode ? 'auto' : 'smooth' });

    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: accessibility.elderlyMode ? 'auto' : 'smooth' });
        }
      }, 100);
    }
  };

  const handleAccessibilityChange = (settings: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => ({ ...prev, ...settings }));
  };

  const handleOpenSearch = (query: string = '') => {
    setSearchInitialQuery(query);
    setSearchModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#101820] selection:bg-[#6CACE4]/30 selection:text-[#10069F]">
      {/* Sticky Header with Utility Bar */}
      <Header
        currentPage={currentPage}
        activePersona={activePersona}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
        accessibility={accessibility}
        onAccessibilityChange={handleAccessibilityChange}
        onOpenSearch={handleOpenSearch}
      />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {currentPage === 'home' && (
          <HomePage
            language={language}
            activePersona={activePersona}
            onSelectPersona={setActivePersona}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'services' && (
          <PensionerServicesPage
            language={language}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'newsroom' && (
          <NewsroomPage
            language={language}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'investment' && (
          <InvestmentPage
            language={language}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            language={language}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        language={language}
        onNavigate={handleNavigate}
      />

      {/* Official KIAH Chatbot Floating Companion */}
      <KiahChatbot
        language={language}
        onNavigate={handleNavigate}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        initialQuery={searchInitialQuery}
        onClose={() => setSearchModalOpen(false)}
        language={language}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
