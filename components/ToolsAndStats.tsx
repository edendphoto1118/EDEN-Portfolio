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
        const storageKey = `eden_tool_clicks_${item.id}`;
        const currentClicks = parseInt(localStorage.getItem(storageKey) || '0', 10);
        const newClicks = currentClicks + 1;
        localStorage.setItem(storageKey, newClicks.toString());
        
        const baseCount = item.initialViews || 500;
        setUserCount(baseCount + (newClicks * 3));
    };

    const [mainTitle, subTitle] = item.title.includes('|') 
        ? item.title.split('|').map(s => s.trim()) 
        : [item.title, null];

    return (
        <Section delay={index * 150} className="relative group rounded-xl">
            <a 
                href={item.link}
                target="_blank"
                rel="noreferrer"
                ref={cardRef}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="bg-neutral-900/60 border border-neutral-800 hover:border-cyan-500/50 transition-colors duration-500 rounded-xl overflow-hidden flex flex-col relative h-full z-10 cursor-pointer block"
            >
                {/* 1. Internal Aurora Effect (Card Background) - BRIGHTER & LIQUID */}
                <div className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-1000 pointer-events-none overflow-hidden mix-blend-screen">
                    {/* Primary Cyan Blob */}
                    <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] bg-gradient-to-br from-cyan-500/30 via-teal-400/20 to-transparent animate-[spin_12s_linear_infinite] blur-[60px] rounded-full"></div>
                    {/* Secondary Emerald Blob (Counter rotation) */}
                    <div className="absolute bottom-[-20%] right-[-20%] w-[120%] h-[120%] bg-gradient-to-tl from-emerald-400/20 via-cyan-400/10 to-transparent animate-[spin_15s_linear_infinite_reverse] blur-[50px] rounded-full"></div>
                </div>

                {/* 2. Spotlight Gradient Overlay (Mouse Follower) */}
                <div 
                    className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10 rounded-xl"
                    style={{
                        opacity,
                        background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(34, 211, 238, 0.15), transparent 40%)` // Cyan-400 glow
                    }}
                />

                <div className="h-48 overflow-hidden relative border-b border-neutral-800 group-hover:border-cyan-500/30 transition-colors">
                    <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-70 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white p-2 rounded-lg z-20 shadow-[0_0_15px_rgba(34,211,238,0.3)] border border-cyan-500/30">
                        <Code size={20} className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
                    </div>
                    <EditableTrigger isCreatorMode={isCreatorMode} label="更新工具截圖" />
                </div>

                <div className="p-8 flex-1 flex flex-col relative z-20">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col">
                            <h3 className="text-2xl text-white font-medium group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-lg">
                                {mainTitle}
                            </h3>
                            {subTitle && (
                                <span className="text-lg text-cyan-500/90 font-sans-tw font-bold tracking-[0.2em] mt-1 drop-shadow-sm uppercase">
                                    {subTitle}
                                </span>
                            )}
                        </div>
                        <div className="text-neutral-500 group-hover:text-cyan-200 transition-colors pt-1">
                            <ExternalLink size={20} />
                        </div>
                    </div>
                    <p className="text-neutral-400 group-hover:text-neutral-300 mb-6 text-sm leading-relaxed flex-1 transition-colors">
                        {item.description}
                    </p>
                    
                    {/* Stats Display */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between group-hover:border-cyan-500/30 transition-colors">
                         <div className="flex items-center gap-2 text-cyan-500 group-hover:text-cyan-400">
                            <Users size={16} />
                            <span className="font-mono text-xl font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">{userCount.toLocaleString()}</span>
                            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-sans-tw group-hover:text-cyan-600 transition-colors">使用人數</span>
                         </div>
                         
                         <div className="flex items-center gap-1 text-emerald-500 text-[10px] drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">
                            <TrendingUp size={12} />
                            <span>Active</span>
                         </div>
                    </div>
                </div>
            </a>
        </Section>
    );
}

const ToolsAndStats: React.FC<ToolsAndStatsProps> = ({ items, isCreatorMode }) => {
  return (
    <div id="web-tools" className="py-24 bg-neutral-950 relative overflow-hidden z-10">
        {/* Decorative code background */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none font-mono text-sm text-white hidden md:block select-none">
            {`const Portfolio = () => {\n  return "Masterpiece";\n}`}
        </div>

      <div className="container mx-auto px-6 relative z-10">
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