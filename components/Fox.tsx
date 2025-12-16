import React from 'react';

interface FoxProps {
  isEscaping?: boolean;
}

const Fox: React.FC<FoxProps> = ({ isEscaping = false }) => {
  return (
    <div 
      // Adjusted positioning: z-20 to be above the image container border visually, 
      // but logic in parent keeps it behind content if needed.
      // -top-16 aligns the "floor" of the SVG with the top of the parent div
      className={`absolute -top-[70px] right-4 w-32 h-32 z-20 pointer-events-none transition-all duration-300
        ${!isEscaping ? 'animate-in slide-in-from-bottom-2 fade-in duration-1000' : ''}
      `}
    >
      <style>{`
        @keyframes fox-wake-run {
          0% { transform: scale(1) translateY(0); }
          20% { transform: scale(1.1) translateY(10px); } /* Squish down to jump */
          40% { transform: scale(1.2) translateY(-30px) rotate(-10deg); } /* Jump Up */
          100% { transform: scale(0) translateY(100px) rotate(45deg); opacity: 0; } /* Disappear */
        }
        
        @keyframes fox-sleep-breath {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.03); } /* Subtle breathing */
        }

        .animate-fox-escape {
          animation: fox-wake-run 0.6s forwards cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-fox-sleep {
          animation: fox-sleep-breath 4s infinite ease-in-out;
          transform-origin: bottom center;
        }
      `}</style>

      <div 
        className={`w-full h-full relative drop-shadow-xl ${isEscaping ? 'animate-fox-escape' : 'animate-fox-sleep'}`} 
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* --- The Reference Image Style: Baby Red Fox --- */}
          
          {/* 1. Tail (Tucked behind/side) */}
          <path 
            d="M85 80 Q95 60 85 50 Q75 40 60 60" 
            fill="#D97706" /* Amber-600 */
            stroke="#B45309" strokeWidth="2"
          />
          <circle cx="85" cy="50" r="8" fill="#FFFFFF" /> {/* Tail Tip */}

          {/* 2. Paws (Hanging over the edge line at y=90) */}
          {/* Right Paw */}
          <ellipse cx="65" cy="92" rx="8" ry="6" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
          {/* Left Paw */}
          <ellipse cx="35" cy="92" rx="8" ry="6" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />

          {/* 3. Main Head/Body Fluff (The "Bun" shape) */}
          <path
            d="M20 85 C15 75 15 50 30 40 C40 33 60 33 70 40 C85 50 85 75 80 85 C70 92 30 92 20 85 Z"
            fill="#F59E0B" /* Amber-500 (Golden Orange) */
          />
          
          {/* 4. White Face Markings (Muzzle & Cheeks) */}
          <path
            d="M30 85 C25 75 30 65 35 60 C45 65 55 65 65 60 C70 65 75 75 70 85 C60 92 40 92 30 85 Z"
            fill="#FFFFFF"
          />

          {/* 5. Ears (Rounded, Baby style) */}
          {/* Left Ear */}
          <path d="M25 45 Q15 25 35 35" fill="#D97706" />
          <path d="M28 42 Q22 32 32 38" fill="#525252" /> {/* Dark inner ear */}
          {/* Right Ear */}
          <path d="M75 45 Q85 25 65 35" fill="#D97706" />
          <path d="M72 42 Q78 32 68 38" fill="#525252" />

          {/* 6. Face Details */}
          {/* Nose */}
          <path d="M48 80 Q50 82 52 80 Q52 80 50 84 Q48 80 48 80" fill="#1F2937" />

          {/* Eyes */}
          {isEscaping ? (
            // Scared/Awake Eyes (Wide Open Ovals)
            <g>
                <ellipse cx="40" cy="70" rx="3" ry="4" fill="#1F2937" />
                <ellipse cx="60" cy="70" rx="3" ry="4" fill="#1F2937" />
                <circle cx="41" cy="69" r="1" fill="white" />
                <circle cx="61" cy="69" r="1" fill="white" />
            </g>
          ) : (
            // Sleeping Eyes (Lines)
            <g opacity="0.8">
               <path d="M36 70 Q40 72 44 70" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
               <path d="M56 70 Q60 72 64 70" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* 7. Snow/Dust Details (From reference photo) */}
          {!isEscaping && (
             <g opacity="0.8">
                <circle cx="50" cy="35" r="1.5" fill="white" />
                <circle cx="45" cy="45" r="1" fill="white" />
                <circle cx="65" cy="40" r="1.2" fill="white" />
                {/* On Nose */}
                <circle cx="51" cy="79" r="0.8" fill="white" />
             </g>
          )}

        </svg>
      </div>
    </div>
  );
};

export default Fox;