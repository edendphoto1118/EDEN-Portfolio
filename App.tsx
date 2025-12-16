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
import { Category, WorkItem } from './types';

const App: React.FC = () => {
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  
  const [allItems, setAllItems] = useState<WorkItem[]>(WORK_ITEMS);

  const handleUpdateImage = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        if (e.target?.result) {
            setAllItems(prev => prev.map(item => 
                item.id === id ? { ...item, imageUrl: e.target!.result as string } : item
            ));
        }
    };
    reader.readAsDataURL(file);
  };

  const handleAddNewItem = (category: Category) => {
    const newItem: WorkItem = {
        id: `${category}-${Date.now()}`,
        title: 'New Project',
        category: category,
        imageUrl: 'https://placehold.co/800x600/1a1a1a/FFF?text=Upload+Image', 
        date: new Date().toISOString().split('T')[0],
        description: '新增的專案描述...',
        tags: ['New']
    };
    setAllItems(prev => [...prev, newItem]);
  };
  
  const photoItems = allItems.filter(item => item.category === 'photography');
  const archItems = allItems.filter(item => item.category === 'architecture');
  const webItems = allItems.filter(item => item.category === 'web');

  return (
    <div className="bg-[#0a0a0a] min-h-screen cursor-none relative overflow-x-hidden">
      {/* Film Grain Texture Overlay - High Z but click-through */}
      <div className="bg-noise z-50 pointer-events-none"></div>

      {/* Global Background Aurora (Layer 0) - Healing Cyan/Teal Vibe */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
         <style>{`
            /* Slow, breathing, floating animation */
            @keyframes aurora-float-1 {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
                50% { transform: translate(-30px, 50px) scale(1.1); opacity: 0.7; }
            }
            @keyframes aurora-float-2 {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                50% { transform: translate(50px, -30px) scale(1.2); opacity: 0.6; }
            }
            @keyframes aurora-float-3 {
                0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.3; }
                50% { transform: translate(-20px, 20px) rotate(10deg) scale(1.15); opacity: 0.5; }
            }
         `}</style>
         
         {/* Orb 1: Top Left - Bright Cyan */}
         <div 
            className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] mix-blend-screen bg-gradient-to-br from-cyan-600/20 via-teal-500/15 to-transparent"
            style={{ animation: 'aurora-float-1 20s ease-in-out infinite' }}
         ></div>

         {/* Orb 2: Bottom Right - Deep Emerald/Teal */}
         <div 
            className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[60vw] rounded-full blur-[140px] mix-blend-screen bg-gradient-to-tl from-emerald-600/20 via-teal-600/15 to-transparent"
            style={{ animation: 'aurora-float-2 25s ease-in-out infinite' }}
         ></div>

         {/* Orb 3: Floating Middle - Soft Blue/Cyan */}
         <div 
            className="absolute top-[40%] left-[30%] w-[50vw] h-[50vw] rounded-full blur-[130px] mix-blend-screen bg-gradient-to-r from-sky-600/15 via-cyan-500/10 to-transparent"
            style={{ animation: 'aurora-float-3 30s ease-in-out infinite' }}
         ></div>
      </div>

      <CustomCursor />
      <Navigation />
      
      {/* Main Content (Layer 10 - Above aurora) */}
      <main className="relative z-10">
        <Hero config={SITE_CONFIG} isCreatorMode={isCreatorMode} />
        
        <PhotoGallery 
            items={photoItems} 
            isCreatorMode={isCreatorMode} 
            onUpdateImage={handleUpdateImage}
            onAddNew={() => handleAddNewItem('photography')}
        />
        
        <Architecture 
            items={archItems} 
            isCreatorMode={isCreatorMode} 
            onUpdateImage={handleUpdateImage}
            onAddNew={() => handleAddNewItem('architecture')}
        />
        
        <ToolsAndStats 
            items={webItems} 
            isCreatorMode={isCreatorMode} 
        />
      </main>

      <Footer config={SITE_CONFIG} />

      <CreatorMode 
        enabled={isCreatorMode} 
        toggle={() => setIsCreatorMode(!isCreatorMode)}
        currentItems={allItems}
      />
    </div>
  );
};

export default App;