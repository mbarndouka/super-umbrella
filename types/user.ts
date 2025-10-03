// User related types
export interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'ADMIN' | 'USER';
  avatar?: string | null;
  emailVerified?: string | null; // Will be a date string from JSON
  lastLogin?: string | null; // Will be a date string from JSON
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Blog related types
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  imageUrl: string;
  content: string;
}

// Dashboard related types
export interface DashboardStats {
  projectCount: number;
  skillCount: number;
  experienceCount: number;
}
