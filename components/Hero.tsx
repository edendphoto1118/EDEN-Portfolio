import React, { useEffect, useState } from 'react';
import { SiteConfig } from '../types';
import { EditableTrigger } from './CreatorMode';

interface HeroProps {
  config: SiteConfig;
  isCreatorMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ config, isCreatorMode }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-60"
        style={{
            backgroundImage: `url('https://picsum.photos/1920/1080?grayscale')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${offset * 0.5}px) scale(${1 + offset * 0.0005})`,
            transition: 'transform 0.1s cubic-bezier(0,0,0.2,1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-neutral-950/90"></div>
      </div>
      
      <EditableTrigger isCreatorMode={isCreatorMode} label="更換主視覺背景" className="z-20" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h2 className="text-yellow-500 text-sm md:text-base tracking-[0.4em] uppercase mb-6 animate-pulse">
            {config.profileTitle}
        </h2>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-cinzel text-white mb-8 tracking-wide drop-shadow-2xl mix-blend-overlay opacity-90">
            {config.profileName}
        </h1>
        <p className="max-w-xl mx-auto text-neutral-300 text-lg md:text-xl font-light font-serif-display leading-relaxed opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards" style={{animationDelay: '0.5s'}}>
            {config.aboutText}
        </p>
      </div>

      {/* Camera Shutter / Focus Scale Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 z-10 flex flex-col items-center gap-2">
         <span className="text-[10px] font-mono tracking-widest uppercase mb-2 text-yellow-500">Scroll</span>
         <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent relative overflow-hidden">
             {/* Moving Ticks */}
             <div className="absolute inset-0 w-full animate-[shutterScroll_2s_linear_infinite] flex flex-col gap-2">
                 <div className="w-full h-[1px] bg-white translate-x-[-2px] w-[5px]"></div>
                 <div className="w-full h-[1px] bg-white/50"></div>
                 <div className="w-full h-[1px] bg-white/50"></div>
                 <div className="w-full h-[1px] bg-white translate-x-[-2px] w-[5px]"></div>
                 <div className="w-full h-[1px] bg-white/50"></div>
                 <div className="w-full h-[1px] bg-white/50"></div>
                 <div className="w-full h-[1px] bg-white translate-x-[-2px] w-[5px]"></div>
             </div>
         </div>
         <style>{`
            @keyframes shutterScroll {
                0% { transform: translateY(-50%); opacity: 0; }
                20% { opacity: 1; }
                80% { opacity: 1; }
                100% { transform: translateY(50%); opacity: 0; }
            }
         `}</style>
      </div>
    </div>
  );
};

export default Hero;