// Project types
export interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string;
  image: string;
  category: 'web' | 'app' | 'data' | 'ml' | 'other';
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
  featured?: boolean;
}

// Skill types
export interface Skill {
  name: string;
  level: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

// Qualification types
export interface QualificationItem {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  isLeft?: boolean;
}

export interface Qualification {
  type: 'education' | 'experience';
  items: QualificationItem[];
}

// About info types
export interface AboutInfo {
  icon: string;
  title: string;
  subtitle: string;
}

// Social media types
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

// Contact info types
export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  availability: string;
}

// SEO Metadata types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
}
