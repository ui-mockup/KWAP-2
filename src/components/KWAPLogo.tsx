import React, { useState } from 'react';

interface KWAPLogoProps {
  reverse?: boolean;
  className?: string;
}

export const KWAPLogo: React.FC<KWAPLogoProps> = ({ reverse = false, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  const logoUrl = 'https://www.kwap.gov.my/wp-content/uploads/2021/11/logo.png';

  return (
    <div
      className={`inline-flex items-center select-none py-1.5 px-2 transition-opacity ${className}`}
      aria-label="KWAP - Kumpulan Wang Persaraan (Diperbadankan)"
      role="img"
    >
      {!hasError ? (
        <img
          src={logoUrl}
          alt="KWAP - Kumpulan Wang Persaraan (Diperbadankan)"
          className={`h-10 sm:h-12 w-auto object-contain transition-all ${
            reverse ? 'brightness-0 invert drop-shadow-xs' : ''
          }`}
          onError={() => setHasError(true)}
          loading="eager"
        />
      ) : (
        /* Graceful fallback if external connection is restricted */
        <div className="flex items-center gap-2.5">
          <div
            className={`flex items-center justify-center font-extrabold tracking-tighter text-2xl leading-none px-2.5 py-1.5 rounded-sm ${
              reverse ? 'bg-white text-[#10069F]' : 'bg-[#10069F] text-white'
            }`}
          >
            KWAP
          </div>
          <div className="flex flex-col justify-center text-left">
            <span
              className={`text-xs font-bold tracking-tight uppercase leading-tight ${
                reverse ? 'text-white' : 'text-[#10069F]'
              }`}
            >
              Kumpulan Wang Persaraan
            </span>
            <span
              className={`text-[10px] tracking-wide font-medium leading-none ${
                reverse ? 'text-[#6CACE4]' : 'text-[#101820]/75'
              }`}
            >
              (Diperbadankan)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

