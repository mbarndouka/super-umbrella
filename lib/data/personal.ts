import { AboutInfo, SocialLink, ContactInfo, SEOMetadata } from '@/types';

/**
 * Personal information and bio
 */
export const personalInfo = {
  name: 'Mbarndouka.O Marius',
  title: 'Frontend Developer',
  alternateTitle: 'Data Scientist',
  location: 'Kigali, Rwanda',
  bio: 'I am a Front end developer based in Kigali and data science student at ALX. I am very passionate about data and dedicated to my work.',
};

/**
 * About section info boxes
 */
export const aboutInfo: AboutInfo[] = [
  {
    icon: 'FileText',
    title: 'Experience',
    subtitle: '1 Years Working',
  },
  {
    icon: 'Briefcase',
    title: 'Completed',
    subtitle: '20+ Projects',
  },
  {
    icon: 'Award',
    title: 'Support',
    subtitle: 'Online 24/7',
  },
];

/**
 * Social media links
 */
export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mbarndouka',
    icon: 'Linkedin',
    ariaLabel: 'LinkedIn Profile',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/mbarndouka',
    icon: 'Github',
    ariaLabel: 'GitHub Profile',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/mbarndouka',
    icon: 'Twitter',
    ariaLabel: 'Twitter Profile',
  },
];

/**
 * Contact information
 */
export const contactInfo: ContactInfo = {
  email: 'contact@mbarndouka.com',
  location: 'Kigali, Rwanda',
  availability: 'Available for freelance work',
};

/**
 * SEO metadata
 */
export const seoMetadata: SEOMetadata = {
  title: 'Mbarndouka.O Marius | Frontend Developer & Data Scientist',
  description:
    'Portfolio of Mbarndouka.O Marius, a Frontend Developer and Data Science student based in Kigali, Rwanda. Specializing in React, Next.js, and modern web technologies.',
  keywords: [
    'frontend developer',
    'data scientist',
    'React',
    'Next.js',
    'TypeScript',
    'web development',
    'Kigali',
    'Rwanda',
  ],
  author: 'Mbarndouka.O Marius',
  siteUrl: 'https://mbarndouka.com',
};

/**
 * Get personal information
 */
export const getPersonalInfo = () => personalInfo;

/**
 * Get about info boxes
 */
export const getAboutInfo = () => aboutInfo;

/**
 * Get social links
 */
export const getSocialLinks = () => socialLinks;

/**
 * Get contact information
 */
export const getContactInfo = () => contactInfo;

/**
 * Get SEO metadata
 */
export const getSEOMetadata = () => seoMetadata;
