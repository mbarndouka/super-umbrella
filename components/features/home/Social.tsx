import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSocialLinks } from '@/lib/data';

const Social = () => {
  const socialLinks = getSocialLinks();

  const socialVariants = {
    hidden: { opacity: 0, x: -25 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.2,
        duration: 0.5,
      },
    }),
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return <Linkedin size={20} />;
      case 'Github':
        return <Github size={20} />;
      case 'Twitter':
        return <Twitter size={20} />;
      default:
        return null;
    }
  };

  const getHoverColor = (name: string) => {
    switch (name) {
      case 'LinkedIn':
        return '#0A66C2';
      case 'GitHub':
        return '#333';
      case 'Twitter':
        return '#1DA1F2';
      default:
        return undefined;
    }
  };

  return (
    <div className="home__social">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          className="home__social-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.ariaLabel}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={socialVariants}
          whileHover={{ y: -5, color: getHoverColor(link.name) }}
          whileTap={{ scale: 0.9 }}
        >
          {getIcon(link.icon)}
        </motion.a>
      ))}
    </div>
  );
};

export default Social;
