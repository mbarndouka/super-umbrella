'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import Image from "next/image";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, ExternalLink } from 'lucide-react';

import './portfolio.css';

// Lazy load the modal component
const PortfolioModal = dynamic(
  () => import('../../components/PortfolioModal'),
  {
    loading: () => <div>Loading...</div>,
  }
);

// Define animation props interface
// interface AnimationProps {
//   opacity: number;
//   y: number;
// }

interface TransitionProps {
  duration: number;
  delay?: number;
}

// Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string;
  image: string;
  category: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
}

// Sample project data
const projects: Project[] = [
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
    category: 'ai',
    tags: ['React', 'OpenAI API', 'Node.js'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/yourusername/project5',
  },
  {
    id: 6,
    title: 'Weather App',
    description: 'Real-time weather application with location services',
    detailedDescription:
      'A weather application that provides real-time forecasts based on user location or search. Features include hourly and weekly forecasts, weather maps, and notifications for severe weather alerts.',
    image: '/project6.jpg',
    category: 'app',
    tags: ['React Native', 'Weather API', 'Geolocation'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/yourusername/project6',
  },
];

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Filter categories
  const categories = ['all', 'web', 'app', 'data', 'ai'];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === activeFilter)
      );
    }
  }, [activeFilter]);

  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
  };

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeProjectDetails = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <section className="portfolio section" id="portfolio">
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 } as TransitionProps}
      >
        Portfolio
      </motion.h2>

      <motion.p
        className="section__subtitle"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 } as TransitionProps}
      >
        My recent projects
      </motion.p>

      {/* Filter buttons */}
      <div className="portfolio__filters">
        {categories.map((category, index) => (
          <span
            key={index}
            className={`portfolio__filter-item ${
              activeFilter === category ? 'active-filter' : ''
            }`}
            onClick={() => handleFilterClick(category)}
          >
            {category}
          </span>
        ))}
      </div>

      <div className="portfolio__container">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="portfolio__card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="portfolio__image-container">
              {/* Replace with actual images when available */}
              <div className="portfolio__placeholder-image" />
            </div>

            <div className="portfolio__content">
              <h3 className="portfolio__title">{project.title}</h3>
              <p className="portfolio__description">{project.description}</p>

              <div className="portfolio__links">
                <button
                  className="portfolio__link portfolio__details-button"
                  onClick={() => openProjectDetails(project)}
                  aria-label={`View details for ${project.title}`}
                >
                  Details
                  <ArrowRight className="portfolio__link-icon" size={16} />
                </button>

                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio__link portfolio__demo-button"
                    aria-label={`View live demo for ${project.title}`}
                  >
                    Demo
                    <ExternalLink className="portfolio__link-icon" size={16} />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <PortfolioModal
        selectedProject={selectedProject}
        showModal={showModal}
        closeProjectDetails={closeProjectDetails}
      />
    </section>
  );
};

export default Portfolio;
