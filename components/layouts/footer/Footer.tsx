'use client';
import React from 'react';
import './footer.css';
import { Linkedin, Github, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">Mbarndouka</h1>

        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>

          <li>
            <a href="#portfolio" className="footer__link">
              Projects
            </a>
          </li>

          <li>
            <a href="#pitch" className="footer__link">
              Elevator Pitch
            </a>
          </li>
        </ul>

        <div className="footer__social">
          <a
            href="https://www.linkedin.com/in/mbarndouka"
            className="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={20} />
          </a>

          <a
            href="https://github.com/mbarndouka"
            className="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>

          <a
            href="https://twitter.com/mbarndouka"
            className="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter Profile"
          >
            <Twitter size={20} />
          </a>
        </div>

        <span className="footer__copy">
          <Heart size={14} className="footer__heart" /> Mbarndouka. All rights
          reserved - {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
