import React, { useState } from 'react';
import { WorkItem } from '../types';
import Section from './Section';
import { ArrowRight, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { EditableTrigger } from './CreatorMode';

interface ArchitectureProps {
  items: WorkItem[];
  isCreatorMode: boolean;
  onUpdateImage: (id: string, file: File) => void;
  onAddNew: () => void;
}

const Architecture: React.FC<ArchitectureProps> = ({ items, isCreatorMode, onUpdateImage, onAddNew }) => {
  // Load More Logic: Default show 3 items
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div id="architecture" className="py-24 bg-neutral-900 border-t border-neutral-800">
      <div className="container mx-auto px-6">
         <Section className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
                <h2 className="text-4xl md:text-6xl font-serif-display text-white mb-4">Space & Structure</h2>
                <p className="text-neutral-400 max-w-md text-lg font-light">
                    建築是凝固的音樂，是理性與感性在空間中的交匯。
                </p>
            </div>
            <div className="h-[1px] bg-neutral-800 flex-1 mx-8 hidden md:block"></div>
            <span className="text-neutral-600 font-mono">02 / WORKS</span>
         </Section>

         <div className="flex flex-col gap-32 mb-20">
            {visibleItems.map((item, index) => (
                <Section key={item.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center group`}>
                    {/* Image Area */}
                    <div 
                        className="w-full md:w-3/5 relative aspect-[16/9] bg-neutral-800 group-image-container"
                    >
                        <div className="w-full h-full overflow-hidden relative z-10">
                            <img 
                                src={item.imageUrl} 
                                alt={item.title}
                                className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0 brightness-90 group-hover:brightness-100"
                            />
                             <EditableTrigger 
                                isCreatorMode={isCreatorMode} 
                                label="更換建築渲染圖" 
                                className="z-10"
                                aspectRatio="16:9"
                                onFileSelect={(file) => onUpdateImage(item.id, file)}
                             />
                             
                             {/* Overlay info for mobile mainly, minimal on desktop */}
                             <div className="absolute inset-0 border border-white/5 pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Text Area */}
                    <div className="w-full md:w-2/5 flex flex-col justify-center relative">
                        {isCreatorMode && (
                             <div className="absolute -top-12 left-0 bg-yellow-900/30 text-yellow-500 text-xs px-2 py-1 mb-2 border border-yellow-700/50">
                                創作者提示：確保描述文字包含設計理念與解決的問題。
                            </div>
                        )}
                        <div className="text-7xl text-neutral-800 font-serif-display absolute -top-12 -left-6 md:-left-12 -z-10 opacity-50 select-none">
                            {(index + 1).toString().padStart(2, '0')}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-medium text-white mb-4 group-hover:text-yellow-500 transition-colors duration-300">
                            {item.title}
                        </h3>
                        <p className="text-neutral-400 leading-relaxed mb-8">
                            {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {item.tags?.map(tag => (
                                <span key={tag} className="text-xs text-neutral-500 uppercase tracking-wider font-bold">● {tag}</span>
                            ))}
                        </div>
                        <button className="self-start flex items-center gap-2 text-white border-b border-white pb-1 hover:text-yellow-500 hover:border-yellow-500 transition-all uppercase text-sm tracking-widest">
                            View Project <ArrowRight size={14}/>
                        </button>
                    </div>
                </Section>
            ))}
            
            {/* Add New Section */}
            {isCreatorMode && (
                <div onClick={onAddNew} className="w-full border-2 border-dashed border-neutral-800 hover:border-yellow-500/50 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer group transition-colors">
                    <div className="bg-neutral-800 p-4 rounded-full mb-4 group-hover:bg-yellow-500/20 transition-colors">
                        <Plus size={32} className="text-neutral-400 group-hover:text-yellow-500" />
                    </div>
                    <span className="text-neutral-500 font-mono tracking-widest uppercase group-hover:text-yellow-500">Add Architecture Project</span>
                </div>
            )}
         </div>

         {/* Load More Button */}
        {items.length > 3 && (
            <div className="flex justify-center">
                <button 
                    onClick={() => setVisibleCount(hasMore ? visibleCount + 3 : 3)}
                    className="flex items-center gap-2 px-8 py-3 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-all duration-300 font-mono text-xs tracking-widest uppercase rounded-full hover:bg-white/5"
                >
                    {hasMore ? (
                        <>Load More <ChevronDown size={14} /></>
                    ) : (
                        <>Show Less <ChevronUp size={14} /></>
                    )}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Architecture;