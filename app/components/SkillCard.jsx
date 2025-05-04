"use client";
import React from "react";
import styles from "./skillCard.module.css";
import { BiCodeAlt } from "react-icons/bi";
import { motion } from "framer-motion";

// Animation variants for skill items
const skillVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  }),
};

const SkillCard = ({ title, skills }) => {
  // Split skills into two columns
  const midpoint = Math.ceil(skills.length / 2);
  const firstColumn = skills.slice(0, midpoint);
  const secondColumn = skills.slice(midpoint);

  return (
    <motion.div
      className={styles.skillCard}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.skillColumns}>
        <div className={styles.skillColumn}>
          {firstColumn.map((skill, index) => (
            <motion.div
              className={styles.skillItem}
              key={index}
              custom={index}
              variants={skillVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={styles.skillIcon}>
                <BiCodeAlt />
              </span>
              <div className={styles.skillInfo}>
                <h4 className={styles.skillName}>{skill.name}</h4>
                <p className={styles.skillLevel}>{skill.level}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className={styles.skillColumn}>
          {secondColumn.map((skill, index) => (
            <motion.div
              className={styles.skillItem}
              key={index}
              custom={index + midpoint}
              variants={skillVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={styles.skillIcon}>
                <BiCodeAlt />
              </span>
              <div className={styles.skillInfo}>
                <h4 className={styles.skillName}>{skill.name}</h4>
                <p className={styles.skillLevel}>{skill.level}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
