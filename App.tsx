import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Architecture from './components/Architecture';
import PhotoGallery from './components/PhotoGallery';
import ToolsAndStats from './components/ToolsAndStats';
import Footer from './components/Footer';
import CreatorMode from './components/CreatorMode';
import CustomCursor from './components/CustomCursor';
import { SITE_CONFIG, WORK_ITEMS } from './constants';

const App: React.FC = () => {
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  
  // Filter items by category
  const photoItems = WORK_ITEMS.filter(item => item.category === 'photography');
  const archItems = WORK_ITEMS.filter(item => item.category === 'architecture');
  const webItems = WORK_ITEMS.filter(item => item.category === 'web');

  return (
    <div className="bg-[#0a0a0a] min-h-screen cursor-none">
      {/* Film Grain Texture Overlay */}
      <div className="bg-noise"></div>

      <CustomCursor />
      <Navigation />
      
      <main className="relative z-10">
        <Hero config={SITE_CONFIG} isCreatorMode={isCreatorMode} />
        
        <PhotoGallery 
            items={photoItems} 
            isCreatorMode={isCreatorMode} 
        />
        
        <Architecture 
            items={archItems} 
            isCreatorMode={isCreatorMode} 
        />
        
        <ToolsAndStats 
            items={webItems} 
            isCreatorMode={isCreatorMode} 
        />
      </main>

      <Footer config={SITE_CONFIG} />

      {/* The special feature for the owner */}
      <CreatorMode 
        enabled={isCreatorMode} 
        toggle={() => setIsCreatorMode(!isCreatorMode)} 
      />
    </div>
  );
};

export default App;