import React, { useRef, useState, useEffect } from 'react';
import { WorkItem } from '../types';
import Section from './Section';
import { ExternalLink, Code, Users, TrendingUp } from 'lucide-react';
import { EditableTrigger } from './CreatorMode';

interface ToolsAndStatsProps {
  items: WorkItem[];
  isCreatorMode: boolean;
}

const ToolCard: React.FC<{ 
    item: WorkItem; 
    index: number; 
    isCreatorMode: boolean; 
}> = ({ item, index, isCreatorMode }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [userCount, setUserCount] = useState(0);

    // Initialize View Count logic
    useEffect(() => {
        const storageKey = `eden_tool_clicks_${item.id}`;
        const savedClicks = parseInt(localStorage.getItem(storageKey) || '0', 10);
        
        // Base count + (Real clicks * 3)
        // We use initialViews from constants as a base to make it look active
        const baseCount = item.initialViews || 500;
        const totalUsers = baseCount + (savedClicks * 3);
        
        setUserCount(totalUsers);
    }, [item.id, item.initialViews]);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    const handleClick = () => {
        // Increment click count in local storage
        const storageKey = `eden_tool_clicks_${item.id}`;
        const currentClicks = parseInt(localStorage.getItem(storageKey) || '0', 10);
        const newClicks = currentClicks + 1;
        localStorage.setItem(storageKey, newClicks.toString());
        
        // Update local state immediately for visual feedback (though user is navigating away)
        const baseCount = item.initialViews || 500;
        setUserCount(baseCount + (newClicks * 3));
    };

    // Special title parsing for mixed fonts (English | Stylish Chinese)
    const [mainTitle, subTitle] = item.title.includes('|') 
        ? item.title.split('|').map(s => s.trim()) 
        : [item.title, null];

    return (
        <Section delay={index * 150} className="relative group rounded-xl">
             {/* Spotlight Effect Border - Converted to Anchor Tag for Full Clickability */}
            <a 
                href={item.link}
                target="_blank"
                rel="noreferrer"
                ref={cardRef}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors rounded-xl overflow-hidden flex flex-col relative h-full z-10 cursor-pointer block"
            >
                {/* The Radial Gradient Overlay */}
                <div 
                    className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10 rounded-xl"
                    style={{
                        opacity,
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`
                    }}
                />

                <div className="h-48 overflow-hidden relative border-b border-neutral-800">
                    <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-60 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-white p-2 rounded-lg z-20">
                        <Code size={20} />
                    </div>
                    {/* EditableTrigger has e.stopPropagation() so it won't trigger the link */}
                    <EditableTrigger isCreatorMode={isCreatorMode} label="更新工具截圖" />
                </div>

                <div className="p-8 flex-1 flex flex-col relative z-20">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col">
                            <h3 className="text-2xl text-white font-medium group-hover:text-yellow-500 transition-colors">
                                {mainTitle}
                            </h3>
                            {subTitle && (
                                <span className="text-lg text-yellow-500/90 font-sans-tw font-bold tracking-[0.2em] mt-1 drop-shadow-sm uppercase">
                                    {subTitle}
                                </span>
                            )}
                        </div>
                        <div className="text-neutral-500 group-hover:text-white transition-colors pt-1">
                            <ExternalLink size={20} />
                        </div>
                    </div>
                    <p className="text-neutral-400 mb-6 text-sm leading-relaxed flex-1">
                        {item.description}
                    </p>
                    
                    {/* Simplified Stats Display: Users Only */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-yellow-500">
                            <Users size={16} />
                            <span className="font-mono text-xl font-bold">{userCount.toLocaleString()}</span>
                            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-sans-tw">使用人數</span>
                         </div>
                         
                         {/* Fake "trending" indicator */}
                         <div className="flex items-center gap-1 text-green-500/50 text-[10px]">
                            <TrendingUp size={12} />
                            <span>Active</span>
                         </div>
                    </div>
                    
                    <div className="mt-6 flex gap-3">
                            {item.tags?.map(tag => (
                            <span key={tag} className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-1 rounded font-mono border border-neutral-700">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </a>
        </Section>
    );
}

const ToolsAndStats: React.FC<ToolsAndStatsProps> = ({ items, isCreatorMode }) => {
  return (
    <div id="web-tools" className="py-24 bg-neutral-950 relative overflow-hidden">
        {/* Decorative background code */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none font-mono text-sm text-white hidden md:block select-none">
            {`const Portfolio = () => {\n  return "Masterpiece";\n}`}
        </div>

      <div className="container mx-auto px-6">
        <Section className="mb-16 text-center">
             <h2 className="text-4xl md:text-5xl font-serif-display text-white mb-6">Digital Craftsmanship</h2>
             <p className="text-neutral-400 max-w-2xl mx-auto">
                除了實體空間，我也在數位領域建構工具。這些是為了優化設計流程與視覺體驗而開發的 Web 應用。
             </p>
        </Section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {items.map((item, idx) => (
                <ToolCard 
                    key={item.id} 
                    item={item} 
                    index={idx} 
                    isCreatorMode={isCreatorMode} 
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsAndStats;