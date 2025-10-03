'use client';
import React from 'react';
import Link from 'next/link';
import { X, Github, ExternalLink } from 'lucide-react';

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

interface PortfolioModalProps {
  selectedProject: Project | null;
  showModal: boolean;
  closeProjectDetails: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({
  selectedProject,
  showModal,
  closeProjectDetails,
}) => {
  if (!selectedProject) return null;

  return (
    <div className={`portfolio__modal ${showModal ? 'active' : ''}`}>
      <div className="portfolio__modal-content">
        <button
          className="portfolio__modal-close"
          onClick={closeProjectDetails}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <h3 className="portfolio__modal-title">{selectedProject.title}</h3>

        <div className="portfolio__modal-img">
          <div className="portfolio__placeholder-image" />
        </div>

        <p className="portfolio__modal-description">
          {selectedProject.detailedDescription || selectedProject.description}
        </p>

        <div className="portfolio__modal-tech">
          <h4>Technologies</h4>
          <div className="portfolio__modal-tech-list">
            {selectedProject.tags.map((tag, index) => (
              <span key={index} className="portfolio__modal-tech-item">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="portfolio__modal-buttons">
          {selectedProject.demoUrl && (
            <Link
              href={selectedProject.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio__modal-button"
            >
              View Demo <ExternalLink size={16} />
            </Link>
          )}

          {selectedProject.codeUrl && (
            <Link
              href={selectedProject.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio__modal-button portfolio__modal-button-source"
            >
              View Code <Github size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
