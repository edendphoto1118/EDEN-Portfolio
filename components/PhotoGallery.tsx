import React, { useState } from 'react';
import { WorkItem } from '../types';
import { X } from 'lucide-react';
import Section from './Section';
import { EditableTrigger } from './CreatorMode';

interface PhotoGalleryProps {
  items: WorkItem[];
  isCreatorMode: boolean;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ items, isCreatorMode }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<WorkItem | null>(null);

  const getColumnItems = (colIndex: number, totalCols: number) => 
    items.filter((_, idx) => idx % totalCols === colIndex);

  return (
    <div id="photography" className="py-24 bg-[#0a0a0a] min-h-screen relative">
      <div className="container mx-auto px-4 md:px-8">
        <Section className="mb-20">
            <div className="flex flex-col items-start gap-4">
                <span className="text-yellow-600/80 font-mono text-xs tracking-[0.2em] uppercase pl-1">01 — Selected Works</span>
                <h2 className="text-5xl md:text-7xl font-serif-display text-neutral-100">Visual Echoes</h2>
            </div>
            <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-neutral-800 to-transparent"></div>
        </Section>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6 md:gap-12">
              {getColumnItems(colIndex, 3).map((item, idx) => (
                <Section key={item.id} delay={idx * 150} className="relative group">
                   <div 
                        className="relative overflow-hidden cursor-zoom-in bg-neutral-900 aspect-[3/4] z-10" 
                        onClick={() => setSelectedPhoto(item)}
                    >
                        {/* Luxurious Image Transition */}
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform scale-100 filter grayscale brightness-[0.85] contrast-[1.1] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100"
                          loading="lazy"
                        />
                        
                        {/* Minimalist Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Text appearing from bottom */}
                        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            <span className="text-yellow-500 font-mono text-[10px] tracking-widest uppercase block mb-2">{item.date}</span>
                            <h3 className="text-white text-2xl font-serif-display italic tracking-wide">{item.title}</h3>
                        </div>
                        
                        <EditableTrigger isCreatorMode={isCreatorMode} label="更換作品圖片" />
                    </div>
                </Section>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[200] bg-[#050505]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500">
          <button
            className="absolute top-8 right-8 text-neutral-500 hover:text-white transition-colors hover:rotate-90 duration-300"
            onClick={() => setSelectedPhoto(null)}
          >
            <X size={40} strokeWidth={1} />
          </button>
          
          <div className="w-full h-full flex flex-col items-center justify-center">
             <div className="relative w-full h-[80vh] flex items-center justify-center">
                <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    className="max-h-full max-w-full object-contain shadow-2xl"
                />
             </div>
             
             <div className="mt-8 text-center">
                <h3 className="text-3xl text-white font-serif-display italic mb-2">{selectedPhoto.title}</h3>
                <p className="text-neutral-500 font-mono text-xs tracking-widest uppercase">{selectedPhoto.category} — {selectedPhoto.date}</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;