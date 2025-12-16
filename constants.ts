
import { WorkItem, SiteConfig } from './types';

export const SITE_CONFIG: SiteConfig = {
  profileName: "EDEN",
  profileTitle: "Architect & Visual Storyteller",
  aboutText: "遊走於實體空間與數位維度之間。我透過鏡頭捕捉光影的瞬息，透過代碼建構虛擬的邏輯，透過磚瓦堆砌永恆的居所。這不僅是作品集，更是我看待世界的方式。",
  contactEmail: "edendphoto1118@gmail.com",
  socialLinks: {
    instagram: "https://instagram.com/eden_d_photo",
    threads: "https://www.threads.net/@eden_d_photo"
  }
};

export const WORK_ITEMS: WorkItem[] = [
  // Photography
  {
    id: 'p1',
    title: 'Silent Concrete',
    category: 'photography',
    imageUrl: 'https://picsum.photos/800/1200?random=1',
    date: '2023.10',
    description: '探索都市野獸派建築的靜謐時刻。',
    tags: ['B&W', 'Architecture', 'Light']
  },
  {
    id: 'p2',
    title: 'Neon Rain',
    category: 'photography',
    imageUrl: 'https://picsum.photos/1200/800?random=2',
    date: '2023.11',
    description: '台北夜雨中的色彩流動。',
    tags: ['Street', 'Color', 'Night']
  },
  {
    id: 'p3',
    title: 'Mountain Breath',
    category: 'photography',
    imageUrl: 'https://picsum.photos/800/1000?random=3',
    date: '2024.01',
    description: '高海拔的稀薄空氣與晨曦。',
    tags: ['Nature', 'Landscape']
  },
  {
    id: 'p4',
    title: 'Void',
    category: 'photography',
    imageUrl: 'https://picsum.photos/900/900?random=4',
    date: '2023.08',
    description: '極簡主義視角下的室內空間。',
    tags: ['Minimalism', 'Interior']
  },
    {
    id: 'p5',
    title: 'Urban Geometry',
    category: 'photography',
    imageUrl: 'https://picsum.photos/800/1200?random=5',
    date: '2023.12',
    description: '幾何線條在城市中的交錯。',
    tags: ['Geometry', 'Urban']
  },
  {
    id: 'p6',
    title: 'Fading Memories',
    category: 'photography',
    imageUrl: 'https://picsum.photos/1000/1000?random=6',
    date: '2023.09',
    description: '舊城區的時光痕跡。',
    tags: ['Nostalgia', 'Texture']
  },

  // Architecture
  {
    id: 'a1',
    title: 'The Glass Pavilion',
    category: 'architecture',
    imageUrl: 'https://picsum.photos/1600/900?random=10',
    date: '2022 - 2023',
    description: '位於山林間的私人美術館設計，強調建築與自然的邊界消融。使用永續建材與被動式節能設計。',
    tags: ['Residential', 'Sustainable', 'Modern']
  },
  {
    id: 'a2',
    title: 'Urban Oasis Center',
    category: 'architecture',
    imageUrl: 'https://picsum.photos/1600/900?random=11',
    date: '2021 - 2022',
    description: '高密度城市中的垂直綠化商業綜合體。',
    tags: ['Commercial', 'Green', 'Public']
  },

  // Web Tools
  {
    id: 'w1',
    title: 'Vibe Check | 氣氛博士',
    category: 'web',
    imageUrl: 'https://images.unsplash.com/photo-1557180295-76eee20ae8aa?q=80&w=1600&auto=format&fit=crop', // Dark neon party vibe
    date: '2024.03',
    description: '派對互動遊戲 拒絕尷尬｜派對昇華。',
    tags: ['React', 'Vibe', 'Music API'],
    link: 'https://vibe-check-ih3e.vercel.app/',
    stats: [
      { label: 'Rhythm', value: 98 },
      { label: 'Energy', value: 100 },
      { label: 'Visuals', value: 95 }
    ]
  },
  {
    id: 'w2',
    title: 'Color Harmonizer',
    category: 'web',
    imageUrl: 'https://picsum.photos/1000/600?random=21',
    date: '2023.05',
    description: '基於 AI 的影像色彩分析與配色建議工具。',
    tags: ['AI', 'Utility', 'Design'],
    link: 'https://github.com',
     stats: [
      { label: 'Accuracy', value: 92 },
      { label: 'Speed (ms)', value: 120 },
      { label: 'Users', value: 85 }
    ]
  }
];
