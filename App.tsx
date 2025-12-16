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
  
  // Move items to state to allow real-time updates in Creator Mode
  const [allItems, setAllItems] = useState<WorkItem[]>(WORK_ITEMS);

  // Function to update an image for a specific item
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

  // Function to add a new placeholder item
  const handleAddNewItem = (category: Category) => {
    const newItem: WorkItem = {
        id: `${category}-${Date.now()}`,
        title: 'New Project',
        category: category,
        // Use a placeholder that indicates it needs an update
        imageUrl: 'https://placehold.co/800x600/1a1a1a/FFF?text=Upload+Image', 
        date: new Date().toISOString().split('T')[0],
        description: '新增的專案描述...',
        tags: ['New']
    };
    setAllItems(prev => [...prev, newItem]);
  };
  
  // Filter items by category
  const photoItems = allItems.filter(item => item.category === 'photography');
  const archItems = allItems.filter(item => item.category === 'architecture');
  const webItems = allItems.filter(item => item.category === 'web');

  return (
    <div className="bg-[#0a0a0a] min-h-screen cursor-none relative overflow-x-hidden">
      {/* Film Grain Texture Overlay */}
      <div className="bg-noise"></div>

      {/* Passing Aurora Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <style>{`
            /* Define movement from one side to another */
            @keyframes aurora-pass-1 {
                0% { top: 10%; left: -20%; opacity: 0; transform: scale(0.8) rotate(0deg); }
                10% { opacity: 0.6; } /* Fade in quickly */
                80% { opacity: 0.6; }
                100% { top: 60%; left: 120%; opacity: 0; transform: scale(1.5) rotate(20deg); }
            }
            
            @keyframes aurora-pass-2 {
                0% { bottom: 10%; right: -20%; opacity: 0; transform: scale(1) rotate(0deg); }
                10% { opacity: 0.5; }
                80% { opacity: 0.5; }
                100% { bottom: 50%; right: 120%; opacity: 0; transform: scale(1.3) rotate(-15deg); }
            }

            @keyframes aurora-pass-3 {
                0% { top: -20%; left: 40%; opacity: 0; transform: scale(0.5); }
                10% { opacity: 0.7; }
                90% { opacity: 0.7; }
                100% { top: 120%; left: 60%; opacity: 0; transform: scale(2); }
            }
         `}</style>
         
         {/* Aurora 1: Top-Left to Bottom-Right (Teal/Cyan) */}
         <div 
            className="absolute w-[40vw] h-[40vw] rounded-full blur-[80px] mix-blend-screen"
            style={{ 
                background: 'radial-gradient(circle, rgba(45, 212, 191, 0.4), transparent 70%)',
                animation: 'aurora-pass-1 12s linear infinite',
                animationDelay: '0s'
            }}
         ></div>

         {/* Aurora 2: Bottom-Right to Top-Left (Purple/Indigo) */}
         <div 
            className="absolute w-[50vw] h-[50vw] rounded-full blur-[100px] mix-blend-screen"
            style={{ 
                background: 'radial-gradient(circle, rgba(167, 139, 250, 0.35), transparent 70%)',
                animation: 'aurora-pass-2 15s linear infinite',
                animationDelay: '5s' 
            }}
         ></div>
         
         {/* Aurora 3: Top-Center vertical pass (Green/Silver) */}
         <div 
            className="absolute w-[30vw] h-[60vw] rounded-full blur-[90px] mix-blend-screen"
            style={{ 
                background: 'radial-gradient(circle, rgba(200, 255, 230, 0.25), transparent 70%)',
                animation: 'aurora-pass-3 10s linear infinite',
                animationDelay: '2s' 
            }}
         ></div>
      </div>

      <CustomCursor />
      <Navigation />
      
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

      {/* The special feature for the owner */}
      <CreatorMode 
        enabled={isCreatorMode} 
        toggle={() => setIsCreatorMode(!isCreatorMode)} 
      />
    </div>
  );
};

export default App;