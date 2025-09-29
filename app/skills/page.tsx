"use client";
import React from "react";
import "./skills.css";
import SkillCard from "../../components/SkillCard";
import { motion } from "framer-motion";

const Skills = () => {
  // Define frontend developer skills with creative levels
  const frontendSkills = [
    { name: "HTML", level: "Rock Solid" },
    { name: "NextJs", level: "Power User" },
    { name: "CSS", level: "Style Master" },
    { name: "Git", level: "Branch Wizard" },
    { name: "Javascript", level: "Logic Ninja" },
    { name: "React", level: "Component Architect" },
    { name: "TypeScript", level: "Type Guardian" },
  ];

  // Define backend skills with creative levels
  const backendSkills = [
    { name: "Node.js", level: "Runtime Ranger" },
    { name: "Express", level: "API Artisan" },
    { name: "RESTful APIs", level: "Endpoint Engineer" },
    { name: "GraphQL", level: "Query Craftsman" },
    { name: "Authentication", level: "Security Sentinel" },
  ];

  // Database skills with creative levels
  const databaseSkills = [
    { name: "MongoDB", level: "NoSQL Navigator" },
    { name: "PostgreSQL", level: "Query Commander" },
    { name: "MySQL", level: "Data Architect" },
    { name: "Redis", level: "Cache Conjurer" },
  ];

  // Data Science skills with actual data science technologies
  const dataScienceSkills = [
    { name: "Python", level: "Data Wrangler" },
    { name: "Pandas", level: "Frame Tamer" },
    { name: "NumPy", level: "Array Artist" },
    { name: "Matplotlib", level: "Viz Virtuoso" },
    { name: "Jupyter", level: "Notebook Navigator" },
  ];

  // Tools and environments
  const toolsSkills = [
    { name: "VS Code", level: "Power User" },
    { name: "Docker", level: "Container Captain" },
    { name: "CI/CD", level: "Pipeline Pioneer" },
    { name: "AWS", level: "Cloud Surfer" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <SkillCard title="Frontend Wizardry" skills={frontendSkills} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SkillCard title="Backend Sorcery" skills={backendSkills} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SkillCard title="Database Command" skills={databaseSkills} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SkillCard title="Data Science Alchemy" skills={dataScienceSkills} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SkillCard title="Tools & Environments" skills={toolsSkills} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
