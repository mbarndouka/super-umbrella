'use client';
import React from 'react';
import './about.css';
import Image from 'next/image';
import { FileText, Award, Briefcase } from 'lucide-react';
import PillButton from '../../components/PillButton';
import Face from '../../assets/images/face12.jpg';

const About = () => {
  return (
    <section className="about section" id="about">
      <h2 className="section__title">About Me</h2>
      <span className="section__subtitle">My introduction</span>

      <div className="about__container container grid">
        <div className="about__img-container">
          <Image
            src={Face}
            alt="Mbarndouka - About Me"
            width={350}
            height={350}
            className="about__img"
            loading="lazy"
            placeholder="blur"
            quality={85}
          />
        </div>

        <div className="about__data">
          <div className="about__info grid">
            <div className="about__box">
              <FileText className="about__icon" size={24} />
              <h3 className="about__title">Experience</h3>
              <span className="about__subtitle">1 Years Working</span>
            </div>

            <div className="about__box glow-hover">
              <Briefcase className="about__icon pulse" size={24} />
              <h3 className="about__title">Completed</h3>
              <span className="about__subtitle">20+ Projects</span>
            </div>

            <div className="about__box glow-hover">
              <Award className="about__icon pulse" size={24} />
              <h3 className="about__title">Support</h3>
              <span className="about__subtitle">Online 24/7</span>
            </div>
          </div>

          <p className="about__description typewriter">
            Frontend developer with extensive experience in web application
            development. I create{' '}
            <span className="highlight">successful responsive websites</span>{' '}
            that are fast, easy to use, and built with best practices. The main
            areas of my expertise are{' '}
            <span className="highlight-alt">HTML, CSS, JavaScript, React</span>,
            and building small and medium web applications.
          </p>

          <div className="button-container">
            <PillButton href="#contact" className="glow-button">
              Contact Me
            </PillButton>
            <div className="glowing-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
