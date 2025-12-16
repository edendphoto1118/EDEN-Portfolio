import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { Check, Copy } from 'lucide-react';

const Footer: React.FC<{ config: SiteConfig }> = ({ config }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSecretAdmin = () => {
    const confirmAdmin = window.confirm("進入管理者模式 (Creator Mode)?");
    if (confirmAdmin) {
        window.history.pushState({}, '', '?admin=true');
        window.location.reload();
    }
  };

  return (
    <footer id="about" className="bg-black py-20 border-t border-neutral-900 relative overflow-hidden">
      {/* Persistent Footer Aurora - High Intensity Teal/Cyan */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <style>{`
            @keyframes footer-aurora-flow {
              0% { transform: translateX(-50%) skewX(-15deg) scaleY(1); opacity: 0.6; }
              50% { transform: translateX(50%) skewX(-15deg) scaleY(1.2); opacity: 0.8; }
              100% { transform: translateX(-50%) skewX(-15deg) scaleY(1); opacity: 0.6; }
            }
          `}</style>
          {/* Layer 1: Bright Cyan Base */}
          <div 
             className="absolute -bottom-1/2 left-0 w-[150%] h-[180%] bg-gradient-to-t from-cyan-600/30 via-teal-500/20 to-transparent blur-[80px]"
             style={{ animation: 'footer-aurora-flow 15s ease-in-out infinite' }}
          ></div>
          {/* Layer 2: Emerald/Teal Overlay */}
          <div 
             className="absolute -bottom-1/2 right-0 w-[150%] h-[180%] bg-gradient-to-t from-teal-600/30 via-emerald-500/20 to-transparent blur-[90px]"
             style={{ animation: 'footer-aurora-flow 20s ease-in-out infinite reverse' }}
          ></div>
      </div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="text-center md:text-left">
            <h3 
                onClick={handleSecretAdmin}
                className="text-2xl font-cinzel text-white mb-2 cursor-pointer hover:text-cyan-400 transition-colors select-none drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                title="© EDEN"
            >
                {config.profileName}
            </h3>
            <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-2">
            <div className="relative group">
                <button 
                    onClick={handleCopyEmail}
                    className="flex items-center gap-3 text-xl text-neutral-300 hover:text-white font-serif-display transition-all hover:scale-105"
                >
                    {config.contactEmail}
                    {copied ? <Check size={18} className="text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" /> : <Copy size={16} className="text-neutral-600 group-hover:text-cyan-200" />}
                </button>
                
                <div className={`absolute -top-10 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded shadow-lg transition-all duration-300 pointer-events-none ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    已複製到剪貼簿
                </div>
            </div>

            <div className="flex gap-6 mt-2">
                {config.socialLinks.instagram && (
                    <a href={config.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-cyan-300 uppercase text-xs tracking-widest transition-colors">
                        Instagram
                    </a>
                )}
                {config.socialLinks.threads && (
                    <a href={config.socialLinks.threads} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-cyan-300 uppercase text-xs tracking-widest transition-colors">
                        Threads
                    </a>
                )}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;