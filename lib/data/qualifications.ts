import { Qualification } from '@/types';

/**
 * Education qualifications data
 */
export const education: Qualification = {
  type: 'education',
  items: [
    {
      id: 1,
      title: 'Bachelor in Computer Science',
      subtitle: 'University of Technology',
      date: '2018 - 2022',
      isLeft: true,
    },
    {
      id: 2,
      title: 'Data Science Specialization',
      subtitle: 'ALX Africa',
      date: '2023 - Present',
      isLeft: false,
    },
    {
      id: 3,
      title: 'Full Stack Development',
      subtitle: 'Online Bootcamp',
      date: '2022 - 2023',
      isLeft: true,
    },
  ],
};

/**
 * Work experience qualifications data
 */
export const experience: Qualification = {
  type: 'experience',
  items: [
    {
      id: 1,
      title: 'Frontend Developer',
      subtitle: 'Tech Company Inc.',
      date: '2023 - Present',
      isLeft: true,
    },
    {
      id: 2,
      title: 'Junior Developer',
      subtitle: 'Startup Solutions',
      date: '2022 - 2023',
      isLeft: false,
    },
    {
      id: 3,
      title: 'Freelance Developer',
      subtitle: 'Various Clients',
      date: '2021 - 2022',
      isLeft: true,
    },
  ],
};

/**
 * Get all qualifications
 */
export const getAllQualifications = () => {
  return {
    education,
    experience,
  };
};

/**
 * Get qualifications by type
 */
export const getQualificationsByType = (
  type: 'education' | 'experience'
): Qualification => {
  return type === 'education' ? education : experience;
};
