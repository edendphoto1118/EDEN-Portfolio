import React, { useEffect, useRef, useState } from 'react';

// Particle Interface
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  life: number; // 1.0 to 0.0
  driftX: number;
  driftY: number;
}

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null); 
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number>(0);
  
  // To avoid too many React renders, we limit the particle count logic
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
        setIsVisible(true);
    } else {
        return;
    }

    const onMouseMove = (e: MouseEvent) => {
      // Update Main Cursor
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Add Particles (Meteor Dust)
      // We push to Ref first, state update happens in animation loop to sync
      const particleCount = 2; // Spawn 2 particles per move event for density
      for (let i = 0; i < particleCount; i++) {
        const newParticle: Particle = {
            id: Math.random(),
            x: e.clientX + (Math.random() - 0.5) * 10, // slight random offset
            y: e.clientY + (Math.random() - 0.5) * 10,
            size: Math.random() * 2 + 1, // 1px to 3px
            life: 1.0,
            driftX: (Math.random() - 0.5) * 0.5, // Slight drift
            driftY: (Math.random() * 0.5) + 0.5 // Fall down slightly (gravity)
        };
        particlesRef.current.push(newParticle);
      }
      
      // Keep array size manageable
      if (particlesRef.current.length > 50) {
        particlesRef.current = particlesRef.current.slice(-50);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-zoom-in') ||
        target.getAttribute('role') === 'button';

      setIsHovering(!!isInteractive);
    };

    const animateParticles = () => {
        // Update physics
        particlesRef.current = particlesRef.current
            .map(p => ({
                ...p,
                life: p.life - 0.02, // Decay rate
                x: p.x + p.driftX,
                y: p.y + p.driftY
            }))
            .filter(p => p.life > 0);

        // Sync with state for rendering
        setParticles([...particlesRef.current]);
        
        requestRef.current = requestAnimationFrame(animateParticles);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    requestRef.current = requestAnimationFrame(animateParticles);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.9); }
        }
        .star-blink {
          animation: twinkle 2s infinite ease-in-out;
        }
      `}</style>

      {/* Particle Trail Container */}
      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
          {particles.map(p => (
              <div 
                key={p.id}
                className="absolute rounded-full bg-white"
                style={{
                    left: p.x,
                    top: p.y,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    opacity: p.life * 0.6, // Max opacity 0.6
                    transform: `scale(${p.life})`,
                    boxShadow: `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.8)`
                }}
              />
          ))}
      </div>

      {/* Main Cursor Star */}
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
            <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="star-blink filter drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]"
            >
                <path d="M12 0L14 9L23 11L14 13L12 22L10 13L1 11L10 9L12 0Z" />
            </svg>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;