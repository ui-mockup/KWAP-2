import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  X,
  Moon,
  Sun,
  Link2,
  Minus,
  Plus
} from 'lucide-react';

export interface AccessibilityState {
  invertColors: boolean;
  monochrome: boolean;
  darkContrast: boolean;
  lightContrast: boolean;
  lowSaturation: boolean;
  highSaturation: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  contentScaling: number; // percentage 80-160
  fontSize: number; // percentage 80-160
  lineHeight: number; // percentage 80-160
  letterSpacing: number; // percentage 80-160
}

const DEFAULT_STATE: AccessibilityState = {
  invertColors: false,
  monochrome: false,
  darkContrast: false,
  lightContrast: false,
  lowSaturation: false,
  highSaturation: false,
  highlightLinks: false,
  highlightHeadings: false,
  contentScaling: 100,
  fontSize: 100,
  lineHeight: 100,
  letterSpacing: 100
};

interface AccessibilityPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const AccessibilityPopup: React.FC<AccessibilityPopupProps> = ({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave
}) => {
  const [state, setState] = useState<AccessibilityState>(() => {
    try {
      const saved = localStorage.getItem('kwap_accessibility_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_STATE;
  });

  // Apply visual side effects to document
  useEffect(() => {
    try {
      localStorage.setItem('kwap_accessibility_v2', JSON.stringify(state));
    } catch {
      // ignore
    }

    const html = document.documentElement;
    const body = document.body;

    // Filters
    const filters: string[] = [];
    if (state.invertColors) filters.push('invert(1)');
    if (state.monochrome) filters.push('grayscale(1)');
    if (state.lowSaturation) filters.push('saturate(0.3)');
    if (state.highSaturation) filters.push('saturate(2)');
    html.style.filter = filters.length > 0 ? filters.join(' ') : '';

    // Dark/Light Contrast
    if (state.darkContrast) {
      body.classList.add('a11y-dark-contrast');
      body.classList.remove('a11y-light-contrast');
    } else if (state.lightContrast) {
      body.classList.add('a11y-light-contrast');
      body.classList.remove('a11y-dark-contrast');
    } else {
      body.classList.remove('a11y-dark-contrast', 'a11y-light-contrast');
    }

    // Highlight Links & Headings
    if (state.highlightLinks) {
      body.classList.add('a11y-highlight-links');
    } else {
      body.classList.remove('a11y-highlight-links');
    }

    if (state.highlightHeadings) {
      body.classList.add('a11y-highlight-headings');
    } else {
      body.classList.remove('a11y-highlight-headings');
    }

    // Scaling / Font Size / Line Height / Letter Spacing
    html.style.fontSize = state.fontSize !== 100 ? `${(state.fontSize / 100) * 16}px` : '';
    body.style.lineHeight = state.lineHeight !== 100 ? `${state.lineHeight / 100 * 1.5}` : '';
    body.style.letterSpacing = state.letterSpacing !== 100 ? `${(state.letterSpacing - 100) * 0.05}px` : '';
    
    // Zoom / content scaling
    if (state.contentScaling !== 100) {
      (body.style as unknown as { zoom?: string }).zoom = `${state.contentScaling / 100}`;
    } else {
      (body.style as unknown as { zoom?: string }).zoom = '';
    }

    return () => {
      // Cleanup styles on unmount or reset
    };
  }, [state]);

  const toggle = (key: keyof AccessibilityState) => {
    setState(prev => {
      const next = { ...prev };
      if (typeof next[key] === 'boolean') {
        // Handle mutually exclusive contrast
        if (key === 'darkContrast') {
          next.darkContrast = !next.darkContrast;
          if (next.darkContrast) next.lightContrast = false;
        } else if (key === 'lightContrast') {
          next.lightContrast = !next.lightContrast;
          if (next.lightContrast) next.darkContrast = false;
        } else if (key === 'lowSaturation') {
          next.lowSaturation = !next.lowSaturation;
          if (next.lowSaturation) next.highSaturation = false;
        } else if (key === 'highSaturation') {
          next.highSaturation = !next.highSaturation;
          if (next.highSaturation) next.lowSaturation = false;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (next as any)[key] = !prev[key];
        }
      }
      return next;
    });
  };

  const adjustNumeric = (key: 'contentScaling' | 'fontSize' | 'lineHeight' | 'letterSpacing', delta: number) => {
    setState(prev => {
      const current = prev[key];
      const newVal = Math.max(70, Math.min(150, current + delta));
      return { ...prev, [key]: newVal };
    });
  };

  const handleReset = () => {
    setState(DEFAULT_STATE);
  };

  if (!isOpen) return null;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute right-0 sm:right-0 top-full mt-2 w-[360px] sm:w-[390px] max-w-[calc(100vw-24px)] bg-white rounded-3xl shadow-2xl border border-slate-200/90 z-50 p-5 text-slate-800 animate-in fade-in zoom-in-95 duration-150"
      role="dialog"
      aria-label="Accessibility Tools"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight">
          Accessibility Tools
        </h2>
        <div className="flex items-center gap-2">
          {/* Reset Button */}
          <button
            type="button"
            onClick={handleReset}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Reset to default"
            aria-label="Reset all accessibility settings"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#2563eb] text-white flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
            aria-label="Close accessibility tools"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 8 Toggle Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 pb-4">
        {/* 1. Invert colors */}
        <button
          type="button"
          onClick={() => toggle('invertColors')}
          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
            state.invertColors
              ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-xs'
              : 'bg-[#F8FAFC] border-slate-200 hover:bg-slate-100/80 text-slate-700'
          }`}
        >
          {/* Custom half-filled circle icon */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8v16z" />
          </svg>
          <span className="text-xs sm:text-[13px] font-semibold leading-tight">Invert colors</span>
        </button>

        {/* 2. Monochrome */}
        <button
          type="button"
          onClick={() => toggle('monochrome')}
          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
            state.monochrome
              ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-xs'
              : 'bg-[#F8FAFC] border-slate-200 hover:bg-slate-100/80 text-slate-700'
          }`}
        >
          {/* Custom striped circle icon */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M7 8l8 8M9 5l10 10M5 11l8 8" />
          </svg>
          <span className="text-xs sm:text-[13px] font-semibold leading-tight">Monochrome</span>
        </button>

        {/* 3. Dark contrast */}
        <button
          type="button"
          onClick={() => toggle('darkContrast')}
          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
            state.darkContrast
              ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-xs'
              : 'bg-[#F8FAFC] border-slate-200 hover:bg-slate-100/80 text-slate-700'
          }`}
        >
          <Moon className="w-5 h-5 shrink-0 fill-current" />
          <span className="text-xs sm:text-[13px] font-semibold leading-tight">Dark contrast</span>
        </button>

        {/* 4. Light contrast */}
        <button
          type="button"
          onClick={() => toggle('lightContrast')}
          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
            state.lightContrast
              ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-xs'
              : 'bg-[#F8FAFC] border-slate-200 hover:bg-slate-100/80 text-slate-700'
          }`}
        >
          <Sun className="w-5 h-5 shrink-0" />
          <span className="text-xs sm:text-[13px] font-semibold leading-tight">Light contrast</span>
        </button>

        {/* 5. Low saturation */}
        <button
          type="button"
          onClick={() => toggle('lowSaturation')}
          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
            state.lowSaturation
              ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-xs'
              : 'bg-[#F8FAFC] border-slate-200 hover:bg-slate-100/80 text-slate-700'
          }`}
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 18a6 6 0 000-12v12z" stroke="none" fill="currentColor" opacity="0.3" />
          </svg>
          <span className="text-xs sm:text-[13px] font-semibold leading-tight">Low saturation</span>
        </button>

        {/* 6. High saturation */}
        <button
          type="button"
          onClick={() => toggle('highSaturation')}
          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
            state.highSaturation
              ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-xs'
              : 'bg-[#F8FAFC] border-slate-200 hover:bg-slate-100/80 text-slate-700'
          }`}
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 21a9 9 0 000-18v18z" fill="currentColor" stroke="none" />
          </svg>
          <span className="text-xs sm:text-[13px] font-semibold leading-tight">High saturation</span>
        </button>

        {/* 7. Highlight links */}
        <button
          type="button"
          onClick={() => toggle('highlightLinks')}
          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
            state.highlightLinks
              ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-xs'
              : 'bg-[#F8FAFC] border-slate-200 hover:bg-slate-100/80 text-slate-700'
          }`}
        >
          <Link2 className="w-5 h-5 shrink-0 -rotate-45" />
          <span className="text-xs sm:text-[13px] font-semibold leading-tight">Highlight links</span>
        </button>

        {/* 8. Highlight headings */}
        <button
          type="button"
          onClick={() => toggle('highlightHeadings')}
          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
            state.highlightHeadings
              ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-xs'
              : 'bg-[#F8FAFC] border-slate-200 hover:bg-slate-100/80 text-slate-700'
          }`}
        >
          <div className="w-5 h-5 rounded border border-current flex items-center justify-center font-bold text-[10px] leading-none shrink-0">
            H1
          </div>
          <span className="text-xs sm:text-[13px] font-semibold leading-tight">Highlight headings</span>
        </button>
      </div>

      {/* 4 Range Stepper Rows */}
      <div className="space-y-2 pb-4">
        {/* Row 1: Content scaling */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
          <span className="text-xs sm:text-[13px] font-medium text-slate-700 w-28 shrink-0">
            Content scaling
          </span>
          <div className="flex-1 px-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563eb] rounded-full transition-all"
                style={{ width: `${Math.max(0, Math.min(100, ((state.contentScaling - 70) / 80) * 100))}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-600 w-9 text-right font-mono">
              {state.contentScaling}%
            </span>
          </div>
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden shrink-0 bg-white">
            <button
              type="button"
              onClick={() => adjustNumeric('contentScaling', -10)}
              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 border-r border-slate-200 transition-colors"
              aria-label="Decrease content scaling"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => adjustNumeric('contentScaling', 10)}
              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Increase content scaling"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Row 2: Font size */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
          <span className="text-xs sm:text-[13px] font-medium text-slate-700 w-28 shrink-0">
            Font size
          </span>
          <div className="flex-1 px-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563eb] rounded-full transition-all"
                style={{ width: `${Math.max(0, Math.min(100, ((state.fontSize - 70) / 80) * 100))}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-600 w-9 text-right font-mono">
              {state.fontSize}%
            </span>
          </div>
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden shrink-0 bg-white">
            <button
              type="button"
              onClick={() => adjustNumeric('fontSize', -10)}
              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 border-r border-slate-200 transition-colors"
              aria-label="Decrease font size"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => adjustNumeric('fontSize', 10)}
              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Increase font size"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Row 3: Line height */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
          <span className="text-xs sm:text-[13px] font-medium text-slate-700 w-28 shrink-0">
            Line height
          </span>
          <div className="flex-1 px-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563eb] rounded-full transition-all"
                style={{ width: `${Math.max(0, Math.min(100, ((state.lineHeight - 70) / 80) * 100))}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-600 w-9 text-right font-mono">
              {state.lineHeight}%
            </span>
          </div>
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden shrink-0 bg-white">
            <button
              type="button"
              onClick={() => adjustNumeric('lineHeight', -10)}
              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 border-r border-slate-200 transition-colors"
              aria-label="Decrease line height"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => adjustNumeric('lineHeight', 10)}
              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Increase line height"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Row 4: Letter spacing */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
          <span className="text-xs sm:text-[13px] font-medium text-slate-700 w-28 shrink-0">
            Letter spacing
          </span>
          <div className="flex-1 px-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563eb] rounded-full transition-all"
                style={{ width: `${Math.max(0, Math.min(100, ((state.letterSpacing - 70) / 80) * 100))}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-600 w-9 text-right font-mono">
              {state.letterSpacing}%
            </span>
          </div>
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden shrink-0 bg-white">
            <button
              type="button"
              onClick={() => adjustNumeric('letterSpacing', -10)}
              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 border-r border-slate-200 transition-colors"
              aria-label="Decrease letter spacing"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => adjustNumeric('letterSpacing', 10)}
              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Increase letter spacing"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          {/* Hexagonal colored logo */}
          <div className="flex items-center -space-x-1">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-teal-500 bg-white" />
            <div className="w-2.5 h-2.5 rounded-full border-2 border-orange-500 bg-white -mt-2" />
            <div className="w-2.5 h-2.5 rounded-full border-2 border-yellow-500 bg-white" />
          </div>
          <span>djextensions</span>
        </div>

        <a
          href="https://dj-extensions.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-800 transition-colors"
        >
          <span className="underline font-medium">Web Accessibility plugin</span> by DJ-Extensions.com
        </a>
      </div>
    </div>
  );
};
