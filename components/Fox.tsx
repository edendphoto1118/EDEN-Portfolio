import React from 'react';

interface FoxProps {
  isEscaping?: boolean;
}

const Fox: React.FC<FoxProps> = ({ isEscaping = false }) => {
  return (
    <div 
      className={`absolute -top-12 -right-8 w-24 h-24 z-0 pointer-events-none transition-all duration-300
        ${!isEscaping ? 'animate-in slide-in-from-bottom-4 fade-in duration-700' : ''}
      `}
    >
      <style>{`
        @keyframes fox-scared {
          0% { transform: scale(1) rotate(12deg); }
          20% { transform: scale(1.4) rotate(0deg) translateY(-10px); } /* Scared Jump! */
          40% { transform: scale(1.4) rotate(-5deg); }
          100% { transform: scale(0) rotate(45deg) translateY(50px); opacity: 0; } /* Run away/Hide */
        }
        .animate-fox-escape {
          animation: fox-scared 0.5s forwards ease-in-out;
        }
        .animate-fox-idle {
          animation: bounce 3s infinite;
        }
      `}</style>

      <div 
        className={`w-full h-full relative ${isEscaping ? 'animate-fox-escape' : 'animate-fox-idle'}`} 
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-lg transform rotate-12 transition-transform`}
        >
          {/* Main Head (Silver White) */}
          <path
            d="M20 30 L50 70 L80 30 L50 45 L20 30Z"
            fill="#F3F4F6" /* Zinc-100 */
            stroke="#E5E7EB"
            strokeWidth="1"
          />
          
          {/* Ears (Darker Silver/Gray) */}
          <path d="M20 30 L10 10 L40 35 Z" fill="#D4D4D8" /> /* Zinc-300 */
          <path d="M80 30 L90 10 L60 35 Z" fill="#D4D4D8" />
          
          {/* Inner Ears (Pinkish White) */}
          <path d="M20 30 L15 15 L30 32 Z" fill="#FAFAFA" />
          <path d="M80 30 L85 15 L70 32 Z" fill="#FAFAFA" />

          {/* Cheeks/Fur (Pure White) */}
          <path d="M20 30 L50 70 L50 55 L35 35 Z" fill="#FFFFFF" />
          <path d="M80 30 L50 70 L50 55 L65 35 Z" fill="#FFFFFF" />

          {/* Blush (Cute Pink) */}
          <circle cx="32" cy="48" r="3" fill="#FECACA" opacity="0.6" />
          <circle cx="68" cy="48" r="3" fill="#FECACA" opacity="0.6" />

          {/* Nose (Black) */}
          <circle cx="50" cy="70" r="3.5" fill="#18181B" />
          
          {/* Eyes (Scared or Happy based on state) */}
          {isEscaping ? (
            // Scared Eyes (Wide open circles)
            <>
               <circle cx="40" cy="45" r="3" fill="#18181B" />
               <circle cx="60" cy="45" r="3" fill="#18181B" />
               <circle cx="41" cy="44" r="1" fill="white" />
               <circle cx="61" cy="44" r="1" fill="white" />
            </>
          ) : (
            // Cute Closed Eyes
            <>
              <path d="M38 45 Q42 42 46 45" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
              <path d="M54 45 Q58 42 62 45" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

        </svg>
      </div>
    </div>
  );
};

export default Fox;