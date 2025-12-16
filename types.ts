export type Category = 'photography' | 'architecture' | 'web';

export interface WorkItem {
  id: string;
  title: string;
  category: Category;
  imageUrl: string;
  date: string;
  description?: string;
  tags?: string[];
  link?: string; // For web tools or external links
  stats?: { label: string; value: number }[]; // For charts
}

export interface CreatorTip {
  targetId: string;
  message: string;
}

export interface SiteConfig {
  profileName: string;
  profileTitle: string;
  aboutText: string;
  contactEmail: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
}