'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { getAllProjects, getProjectCategories } from '@/lib/data';
import { Project } from '@/types';

import './portfolio.css';

// Lazy load the modal component
const PortfolioModal = dynamic(
  () => import('../../components/PortfolioModal'),
  {
    loading: () => <div>Loading...</div>,
  }
);

interface TransitionProps {
  duration: number;
  delay?: number;
}

const Portfolio: React.FC = () => {
  const projects = getAllProjects();
  const projectCategories = getProjectCategories();
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Filter categories - 'all' plus actual project categories
  const categories = ['all', ...projectCategories];

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
