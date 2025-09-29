import React from "react";
import SkillItem from "./SkillItem";

interface SkillData {
  icon: React.ReactNode;
  name: string;
  percentage: number;
}

interface SkillCategoryProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  skills: SkillData[][];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({
  title,
  subtitle,
  icon,
  skills,
}) => {
  return (
    <div className="skills__content">
      <div className="skills__header">
        {icon}
        <div>
          <h3 className="skills__title">{title}</h3>
          <span className="skills__subtitle">{subtitle}</span>
        </div>
      </div>

      <div className="skills__box">
        {skills.map((group, groupIndex) => (
          <div key={groupIndex} className="skills__group">
            {group.map((skill, skillIndex) => (
              <SkillItem
                key={`${groupIndex}-${skillIndex}`}
                icon={skill.icon}
                name={skill.name}
                percentage={skill.percentage}
                delay={0.1 * (skillIndex + 1) + 0.1 * groupIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
