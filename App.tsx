import React, { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Architecture from './components/Architecture';
import PhotoGallery from './components/PhotoGallery';
import ToolsAndStats from './components/ToolsAndStats';
import Footer from './components/Footer';
import CreatorMode from './components/CreatorMode';
import CustomCursor from './components/CustomCursor';
import { SITE_CONFIG, WORK_ITEMS } from './constants';
import { WorkItem } from './types';

const App: React.FC = () => {
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  
  // Fox State
  const [foxLocation, setFoxLocation] = useState<string | null>(null);
  const [isFoxEscaping, setIsFoxEscaping] = useState(false);

  // Initialize Fox position
  useEffect(() => {
    // Pick a random item ID after mount
    const randomItem = WORK_ITEMS[Math.floor(Math.random() * WORK_ITEMS.length)];
    setFoxLocation(randomItem.id);
  }, []);

  // Function to move the fox when disturbed
  const handleFoxEscape = useCallback(() => {
    if (isFoxEscaping) return; // Prevent double trigger
    
    // 1. Trigger escape animation
    setIsFoxEscaping(true);
    
    // 2. Wait for animation to finish (500ms), then move
    setTimeout(() => {
        setFoxLocation(null); // Remove from DOM
        setIsFoxEscaping(false); // Reset animation state
        
        // 3. Pick a new location after a short pause
        setTimeout(() => {
            let newId;
            do {
                const randomItem = WORK_ITEMS[Math.floor(Math.random() * WORK_ITEMS.length)];
                newId = randomItem.id;
            } while (newId === foxLocation); // Ensure it moves to a different spot
            
            setFoxLocation(newId);
        }, 300); 
    }, 500); // Matches the CSS animation duration in Fox.tsx
  }, [foxLocation, isFoxEscaping]);

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
            foxLocation={foxLocation}
            isFoxEscaping={isFoxEscaping}
            onFoxEscape={handleFoxEscape}
        />
        
        <Architecture 
            items={archItems} 
            isCreatorMode={isCreatorMode} 
            foxLocation={foxLocation}
            isFoxEscaping={isFoxEscaping}
            onFoxEscape={handleFoxEscape}
        />
        
        <ToolsAndStats 
            items={webItems} 
            isCreatorMode={isCreatorMode} 
            foxLocation={foxLocation}
            isFoxEscaping={isFoxEscaping}
            onFoxEscape={handleFoxEscape}
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