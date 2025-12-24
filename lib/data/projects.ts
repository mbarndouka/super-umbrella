import { Project } from '@/types';

/**
 * Portfolio projects data
 * Add new projects here to display them in the portfolio section
 */
export const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description:
      'Full-stack e-commerce application with React, Node.js, and MongoDB',
    detailedDescription:
      'A comprehensive e-commerce solution that includes product management, shopping cart, user authentication, payment processing, and order tracking. Built with a React frontend, Node.js backend, and MongoDB database.',
    image: '/project1.jpg',
    category: 'web',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/yourusername/project1',
    featured: true,
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'Personal portfolio website built with Next.js and TypeScript',
    detailedDescription:
      'A modern, responsive portfolio website to showcase projects and skills. Built with Next.js and TypeScript, featuring dark mode, animations, and contact form with server-side validation.',
    image: '/project2.jpg',
    category: 'web',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/yourusername/project2',
    featured: true,
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Task management application with drag-and-drop functionality',
    detailedDescription:
      'A productivity app that helps users organize tasks with drag-and-drop functionality. Features include task categories, due dates, priority levels, and progress tracking.',
    image: '/project3.jpg',
    category: 'app',
    tags: ['React', 'Redux', 'Firebase'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/yourusername/project3',
  },
  {
    id: 4,
    title: 'Finance Dashboard',
    description: 'Financial analytics dashboard with data visualization',
    detailedDescription:
      'An interactive dashboard that visualizes financial data with charts, graphs, and tables. Allows users to track expenses, income, and investments with customizable date ranges.',
    image: '/project4.jpg',
    category: 'data',
    tags: ['React', 'D3.js', 'Firebase'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/yourusername/project4',
  },
  {
    id: 5,
    title: 'AI Image Generator',
    description: 'Image generation tool using machine learning APIs',
    detailedDescription:
      'A web application that generates images based on text prompts using AI. Integrates with external machine learning APIs and allows users to save and share their generated images.',
    image: '/project5.jpg',
    category: 'ml',
    tags: ['React', 'OpenAI', 'Node.js'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/yourusername/project5',
    featured: true,
  },
  {
    id: 6,
    title: 'Weather App',
    description: 'Real-time weather application with location services',
    detailedDescription:
      'A weather app that provides real-time weather information based on user location or search. Features include hourly and weekly forecasts, weather maps, and severe weather alerts.',
    image: '/project6.jpg',
    category: 'app',
    tags: ['React', 'Weather API', 'Geolocation'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/yourusername/project6',
  },
];

/**
 * Get all projects
 */
export const getAllProjects = (): Project[] => {
  return projects;
};

/**
 * Get featured projects
 */
export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured);
};

/**
 * Get projects by category
 */
export const getProjectsByCategory = (
  category: Project['category']
): Project[] => {
  return projects.filter((project) => project.category === category);
};

/**
 * Get project by ID
 */
export const getProjectById = (id: number): Project | undefined => {
  return projects.find((project) => project.id === id);
};

/**
 * Get all project categories
 */
export const getProjectCategories = (): Project['category'][] => {
  const categories = new Set(projects.map((project) => project.category));
  return Array.from(categories);
};
