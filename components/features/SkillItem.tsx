import React from 'react';
import { motion } from 'framer-motion';

interface SkillItemProps {
  icon: React.ReactNode;
  name: string;
  percentage: number;
  delay?: number;
}

const SkillItem: React.FC<SkillItemProps> = ({
  icon,
  name,
  percentage,
  delay = 0.1,
}) => {
  return (
    <div className="skills__data">
      {icon}

      <div className="skills__info">
        <div className="skills__header">
          <h3 className="skills__name">{name}</h3>
          <span className="skills__percentage">{percentage}%</span>
        </div>
        <div className="skills__bar">
          <motion.span
            className="skills__percentage-bar"
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay }}
          ></motion.span>
        </div>
      </div>
    </div>
  );
};

export default SkillItem;
