'use client';
import React from 'react';
import './skills.css';
import SkillCard from '../../components/features/SkillCard';
import { motion } from 'framer-motion';
import { useAnimation } from '../../lib/hooks/useAnimation';
import { getAllSkillCategories } from '@/lib/data';

const Skills = () => {
  const { staggerContainer, staggerItem } = useAnimation();
  const skillCategories = getAllSkillCategories();

  return (
    <section className="skills section" id="skills">
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Skills Arsenal
      </motion.h2>

      <motion.span
        className="section__subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        My technical superpowers
      </motion.span>

      <motion.div
        className="skills__container container grid"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {skillCategories.map((category) => (
          <motion.div key={category.id} variants={staggerItem}>
            <SkillCard title={category.title} skills={category.skills} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
