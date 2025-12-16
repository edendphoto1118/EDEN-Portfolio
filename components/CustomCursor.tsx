import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null); // The Star
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Use ref for position to avoid re-renders on every mouse move
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable on devices with a mouse
    if (window.matchMedia("(pointer: fine)").matches) {
        setIsVisible(true);
    } else {
        return;
    }

    const onMouseMove = (e: MouseEvent) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
      
      if (cursorRef.current) {
        // Direct DOM manipulation for performance
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Define interactive elements
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-zoom-in') ||
        target.closest('.cursor-zoom-in') !== null ||
        target.getAttribute('role') === 'button';

      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Global Animation Styles for the Star */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.9); }
        }
        .star-blink {
          animation: twinkle 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Cursor: The Thin 4-Pointed Star (Star of Bethlehem shape) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div 
            className={`
                relative -translate-x-1/2 -translate-y-1/2 text-white transition-transform duration-500 ease-out
                ${isHovering ? 'rotate-90 scale-150' : 'rotate-0 scale-100'}
            `}
        >
            {/* The Star SVG */}
            <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="star-blink filter drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]"
            >
                {/* A path drawing a sharp 4-pointed star */}
                <path d="M12 0L14 9L23 11L14 13L12 22L10 13L1 11L10 9L12 0Z" />
            </svg>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;