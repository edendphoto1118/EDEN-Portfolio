import React, { useRef, useState } from 'react';
import { WorkItem } from '../types';
import Section from './Section';
import { ExternalLink, Code } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { EditableTrigger } from './CreatorMode';

interface ToolsAndStatsProps {
  items: WorkItem[];
  isCreatorMode: boolean;
}

// Custom tooltip for Recharts to match the dark theme
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-neutral-700 p-3 shadow-xl z-50">
        <p className="text-neutral-200 font-mono text-xs mb-1">{label}</p>
        <p className="text-yellow-500 font-bold text-sm">
          {payload[0].value} <span className="text-[10px] font-normal text-neutral-500">SCORE</span>
        </p>
      </div>
    );
  }
  return null;
};

const ToolCard: React.FC<{ 
    item: WorkItem; 
    index: number; 
    isCreatorMode: boolean; 
}> = ({ item, index, isCreatorMode }) => {
    // Changed Ref type to HTMLAnchorElement since the container is now an <a> tag
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <Section delay={index * 150} className="relative group rounded-xl">
             {/* Spotlight Effect Border - Converted to Anchor Tag for Full Clickability */}
            <a 
                href={item.link}
                target="_blank"
                rel="noreferrer"
                ref={cardRef}
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
                        <h3 className="text-2xl text-white font-medium group-hover:text-yellow-500 transition-colors">{item.title}</h3>
                        <div className="text-neutral-500 group-hover:text-white transition-colors">
                            <ExternalLink size={20} />
                        </div>
                    </div>
                    <p className="text-neutral-400 mb-6 text-sm leading-relaxed flex-1">
                        {item.description}
                    </p>
                    
                    {/* Data Viz for this tool */}
                    {item.stats && (
                        <div className="h-32 w-full mt-4 bg-black/40 border border-white/5 rounded-lg p-2 relative">
                            {isCreatorMode && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                    <span className="text-[10px] text-yellow-600/50 bg-black/50 px-2 rounded">
                                        Recharts Visualization
                                    </span>
                                </div>
                            )}
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={item.stats} layout="vertical" barSize={8}>
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        dataKey="label" 
                                        type="category" 
                                        width={80} 
                                        tick={{fill: '#888', fontSize: 10, fontFamily: 'monospace'}} 
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                        {item.stats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#525252' : '#737373'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                    
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