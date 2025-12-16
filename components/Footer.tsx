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
    // Secret backdoor to enable admin mode
    const confirmAdmin = window.confirm("進入管理者模式 (Creator Mode)?");
    if (confirmAdmin) {
        window.history.pushState({}, '', '?admin=true');
        // Force a reload to pick up the new URL parameter and init CreatorMode
        window.location.reload();
    }
  };

  return (
    <footer id="about" className="bg-black py-20 border-t border-neutral-900 relative">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
            {/* Secret Admin Button disguised as the Profile Name */}
            <h3 
                onClick={handleSecretAdmin}
                className="text-2xl font-cinzel text-white mb-2 cursor-pointer hover:text-yellow-500 transition-colors select-none"
                title="© EDEN"
            >
                {config.profileName}
            </h3>
            <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-2">
            {/* Copy Email Button */}
            <div className="relative group">
                <button 
                    onClick={handleCopyEmail}
                    className="flex items-center gap-3 text-xl text-neutral-300 hover:text-white font-serif-display transition-all hover:scale-105"
                >
                    {config.contactEmail}
                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={16} className="text-neutral-600 group-hover:text-white" />}
                </button>
                
                {/* Toast Notification */}
                <div className={`absolute -top-10 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded shadow-lg transition-all duration-300 pointer-events-none ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    已複製到剪貼簿
                </div>
            </div>

            <div className="flex gap-6 mt-2">
                {config.socialLinks.instagram && (
                    <a href={config.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-white uppercase text-xs tracking-widest transition-colors">
                        Instagram
                    </a>
                )}
                {config.socialLinks.threads && (
                    <a href={config.socialLinks.threads} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-white uppercase text-xs tracking-widest transition-colors">
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