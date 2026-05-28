export interface Job {
  id: string;
  company: string;
  role: string;
  salary: string;
  location: string;
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  logo?: string;
}

export const mockJobs: Job[] = [
  {
    id: '1',
    company: 'TechFlow Corp',
    role: 'Junior Frontend Developer',
    salary: '120k - 150k ₽',
    location: 'Remote',
    matchPercentage: 95,
    matchedSkills: ['JavaScript', 'React', 'Tailwind CSS', 'Git'],
    missingSkills: ['TypeScript', 'Redux Toolkit'],
  },
  {
    id: '2',
    company: 'Innovate Solutions',
    role: 'React Developer',
    salary: '140k - 180k ₽',
    location: 'Moscow',
    matchPercentage: 88,
    matchedSkills: ['React', 'TypeScript', 'CSS Modules'],
    missingSkills: ['Next.js', 'GraphQL'],
  },
  {
    id: '3',
    company: 'DataPrism',
    role: 'Frontend Engineer',
    salary: '160k - 200k ₽',
    location: 'Remote',
    matchPercentage: 82,
    matchedSkills: ['JavaScript', 'HTML/CSS', 'Webpack'],
    missingSkills: ['React', 'Unit Testing'],
  },
  {
    id: '4',
    company: 'SkyNet Systems',
    role: 'Junior Web Developer',
    salary: '100k - 130k ₽',
    location: 'Saint Petersburg',
    matchPercentage: 75,
    matchedSkills: ['HTML5', 'CSS3', 'Basic JS'],
    missingSkills: ['React', 'Tailwind', 'Git'],
  },
  {
    id: '5',
    company: 'Future Apps',
    role: 'Mid Frontend Developer',
    salary: '220k - 280k ₽',
    location: 'Remote',
    matchPercentage: 90,
    matchedSkills: ['React', 'TypeScript', 'Redux', 'Jest'],
    missingSkills: ['Cypress', 'Storybook'],
  },
];
