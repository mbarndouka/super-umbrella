'use client';
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';
import './qualification.css';
import { ThemeContext } from '@/context/ThemeContext';

// QualificationTab component for the tab buttons
const QualificationTab = ({
  isActive,
  icon,
  title,
  onClick,
}: {
  isActive: boolean;
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  return (
    <motion.div
      className={
        isActive
          ? 'qualification__button qualification__active button--flex'
          : 'qualification__button button--flex'
      }
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="qualification__icon">{icon}</span>{' '}
      <motion.span
        animate={{
          color: isActive ? (isDarkMode ? '#ffffff' : '#000000') : '#757575',
          fontWeight: isActive ? 'bold' : 'normal',
        }}
      >
        {title}
      </motion.span>
      {isActive && (
        <motion.div
          className="tab__indicator"
          layoutId="activeTab"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            backgroundColor: isDarkMode ? '#ffffff' : '#000000',
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

// QualificationItem component for each qualification entry
const QualificationItem = ({
  title,
  subtitle,
  date,
  isLeft = true,
  delay = 0.1,
}: {
  title: string;
  subtitle: string;
  date: string;
  isLeft?: boolean;
  delay?: number;
}) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  return (
    <motion.div
      className="qualification__data"
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        color: isDarkMode ? '#ffffff' : '#000000',
      }}
    >
      {!isLeft && <div></div>}

      {!isLeft && (
        <div>
          <span
            className="qualification__rounder"
            style={{
              backgroundColor: isDarkMode ? '#757575' : undefined,
              borderColor: isDarkMode ? '#ffffff' : undefined,
            }}
          ></span>
          <span
            className="qualification__line"
            style={{
              backgroundColor: isDarkMode ? '#757575' : undefined,
            }}
          ></span>
        </div>
      )}

      <div>
        <h3
          className="qualification__title"
          style={{
            color: isDarkMode ? '#ffffff' : undefined,
          }}
        >
          {title}
        </h3>
        <span
          className="qualification__subtitle"
          style={{
            color: isDarkMode ? '#e0e0e0' : undefined,
          }}
        >
          {subtitle}
        </span>
        <div className="qualification__calendar">
          <Calendar size={16} className="qualification__calendar-icon" /> {date}
        </div>
      </div>

      {isLeft && (
        <div>
          <span
            className="qualification__rounder"
            style={{
              backgroundColor: isDarkMode ? '#757575' : undefined,
              borderColor: isDarkMode ? '#ffffff' : undefined,
            }}
          ></span>
          <span
            className="qualification__line"
            style={{
              backgroundColor: isDarkMode ? '#757575' : undefined,
            }}
          ></span>
        </div>
      )}
    </motion.div>
  );
};

// QualificationSection component to organize qualification items
const QualificationSection = ({
  isActive,
  items,
}: {
  isActive: boolean;
  items: Array<{
    title: string;
    subtitle: string;
    date: string;
    isLeft: boolean;
    delay: number;
  }>;
}) => {
  return (
    <div
      className={
        isActive
          ? 'qualification__content qualification__content-active'
          : 'qualification__content'
      }
    >
      {items.map((item, index) => (
        <QualificationItem
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          date={item.date}
          isLeft={item.isLeft}
          delay={item.delay}
        />
      ))}
    </div>
  );
};

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  // Education data
  const educationData = [
    {
      title: 'Software Engineering',
      subtitle: 'Adventist University of Central Africa',
      date: '2022 - 2025',
      isLeft: true,
      delay: 0.2,
    },
    {
      title: 'Data Science',
      subtitle: 'ALX',
      date: 'May 2023 - August 2024',
      isLeft: false,
      delay: 0.3,
    },
    {
      title: 'Software Engineering',
      subtitle: 'University of Technology',
      date: '2018 - 2021',
      isLeft: true,
      delay: 0.4,
    },
  ];

  // Experience data
  const experienceData = [
    {
      title: 'Data Engineer - Intern',
      subtitle: 'Edencare Medical',
      date: 'July 2024 - Oct 2024',
      isLeft: true,
      delay: 0.1,
    },
    {
      title: 'Junior Frontend Developer ',
      subtitle: 'Totonga',
      date: '2022 - 2023',
      isLeft: false,
      delay: 0.2,
    },
    {
      title: 'Frontend Developer - Intern',
      subtitle: 'Solvit',
      date: 'May 2022 - Oct 2022',
      isLeft: true,
      delay: 0.3,
    },
  ];

  return (
    <section className="qualification section" id="qualification">
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ color: isDarkMode ? '#ffffff' : undefined }}
      >
        My Journey
      </motion.h2>
      <motion.span
        className="section__subtitle"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ color: isDarkMode ? '#e0e0e0' : undefined }}
      >
        Education & Experience Pathway
      </motion.span>

      <div className="qualification__container container">
        <motion.div
          className="qualification__tabs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <QualificationTab
            isActive={toggleState === 1}
            icon={<GraduationCap size={20} />}
            title="Education"
            onClick={() => toggleTab(1)}
          />

          <QualificationTab
            isActive={toggleState === 2}
            icon={<Briefcase size={20} />}
            title="Experience"
            onClick={() => toggleTab(2)}
          />
        </motion.div>

        <div className="qualification__sections">
          <QualificationSection
            isActive={toggleState === 1}
            items={educationData}
          />

          <QualificationSection
            isActive={toggleState === 2}
            items={experienceData}
          />
        </div>
      </div>
    </section>
  );
};

export default Qualification;
