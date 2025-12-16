import React from 'react';
import { SiteConfig } from '../types';

const Footer: React.FC<{ config: SiteConfig }> = ({ config }) => {
  return (
    <footer id="about" className="bg-black py-20 border-t border-neutral-900">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
            <h3 className="text-2xl font-cinzel text-white mb-2">{config.profileName}</h3>
            <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-2">
            <a href={`mailto:${config.contactEmail}`} className="text-xl text-neutral-300 hover:text-white hover:underline decoration-1 underline-offset-4 font-serif-display transition-colors">
                {config.contactEmail}
            </a>
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