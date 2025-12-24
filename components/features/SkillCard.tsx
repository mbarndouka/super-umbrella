import React from 'react';
import { BadgeCheck } from 'lucide-react';
import styles from './skillCard.module.css';

interface Skill {
  name: string;
  level: string;
}

interface SkillCardProps {
  title: string;
  skills: Skill[];
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills }) => {
  // Split skills into two columns
  const leftColumnSkills = skills.filter((_, index) => index % 2 === 0);
  const rightColumnSkills = skills.filter((_, index) => index % 2 === 1);

  return (
    <div className={styles.skillCard}>
      <h2 className={styles.cardTitle}>{title}</h2>

      <div className={styles.skillColumns}>
        <div className={styles.skillColumn}>
          {leftColumnSkills.map((skill, index) => (
            <div key={index} className={styles.skillItem}>
              <BadgeCheck className={styles.skillIcon} size={24} />
              <div className={styles.skillInfo}>
                <h3 className={styles.skillName}>{skill.name}</h3>
                <p className={styles.skillLevel}>{skill.level}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.skillColumn}>
          {rightColumnSkills.map((skill, index) => (
            <div key={index} className={styles.skillItem}>
              <BadgeCheck className={styles.skillIcon} size={24} />
              <div className={styles.skillInfo}>
                <h3 className={styles.skillName}>{skill.name}</h3>
                <p className={styles.skillLevel}>{skill.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
