import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Photography', targetId: 'photography' },
    { name: 'Architecture', targetId: 'architecture' },
    { name: 'Web Tools', targetId: 'web-tools' },
    { name: 'About', targetId: 'about' },
  ];

  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const element = document.getElementById(targetId);
    if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
        console.warn(`Element with id ${targetId} not found`);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled ? 'py-4 bg-neutral-950/80 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-2xl font-cinzel tracking-widest text-white z-50 relative hover:text-yellow-500 transition-colors"
          >
            EDEN
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.targetId}`}
                onClick={(e) => handleScrollTo(e, link.targetId)}
                className="text-sm uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors duration-300 relative group py-2"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 bg-neutral-950 z-30 flex items-center justify-center transition-opacity duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.targetId}`}
              onClick={(e) => handleScrollTo(e, link.targetId)}
              className="text-3xl font-serif-display text-neutral-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;