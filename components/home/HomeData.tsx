import React from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import PillButton from '../PillButton';
import { getPersonalInfo } from '@/lib/data';

const HomeData = () => {
  const personalInfo = getPersonalInfo();

  return (
    <div className="home__data">
      <motion.h1
        className="home__title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {personalInfo.name}
      </motion.h1>

      <div className="home__subtitle-wrapper">
        <h3 className="home__subtitle">
          <TypeAnimation
            sequence={[
              personalInfo.title,
              1000,
              personalInfo.alternateTitle,
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="home__typed-text"
          />
        </h3>
      </div>

      <motion.p
        className="home__description"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {personalInfo.bio}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="home__button-container"
      >
        <PillButton href="#contact" className="home-pill-button">
          Say Hello
          <Send className="button__icon" size={18} />
        </PillButton>
      </motion.div>
    </div>
  );
};

export default HomeData;
