import { SkillCategory } from '@/types';

/**
 * Skills data organized by category
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Wizardry',
    skills: [
      { name: 'HTML', level: 'Rock Solid' },
      { name: 'NextJs', level: 'Power User' },
      { name: 'CSS', level: 'Style Master' },
      { name: 'Git', level: 'Branch Wizard' },
      { name: 'Javascript', level: 'Logic Ninja' },
      { name: 'React', level: 'Component Architect' },
      { name: 'TypeScript', level: 'Type Guardian' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Sorcery',
    skills: [
      { name: 'Node.js', level: 'Runtime Ranger' },
      { name: 'Express', level: 'API Artisan' },
      { name: 'RESTful APIs', level: 'Endpoint Engineer' },
      { name: 'GraphQL', level: 'Query Craftsman' },
      { name: 'Authentication', level: 'Security Sentinel' },
    ],
  },
  {
    id: 'database',
    title: 'Database Command',
    skills: [
      { name: 'MongoDB', level: 'NoSQL Navigator' },
      { name: 'PostgreSQL', level: 'Query Commander' },
      { name: 'MySQL', level: 'Data Architect' },
      { name: 'Redis', level: 'Cache Conjurer' },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science Alchemy',
    skills: [
      { name: 'Python', level: 'Data Wrangler' },
      { name: 'Pandas', level: 'Frame Tamer' },
      { name: 'NumPy', level: 'Array Artist' },
      { name: 'Matplotlib', level: 'Viz Virtuoso' },
      { name: 'Jupyter', level: 'Notebook Navigator' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Environments',
    skills: [
      { name: 'VS Code', level: 'Power User' },
      { name: 'Docker', level: 'Container Captain' },
      { name: 'CI/CD', level: 'Pipeline Pioneer' },
      { name: 'AWS', level: 'Cloud Surfer' },
    ],
  },
];

/**
 * Get all skill categories
 */
export const getAllSkillCategories = (): SkillCategory[] => {
  return skillCategories;
};

/**
 * Get skill category by ID
 */
export const getSkillCategoryById = (id: string): SkillCategory | undefined => {
  return skillCategories.find((category) => category.id === id);
};

/**
 * Get all skills flattened
 */
export const getAllSkills = () => {
  return skillCategories.flatMap((category) =>
    category.skills.map((skill) => ({
      ...skill,
      category: category.title,
    }))
  );
};
