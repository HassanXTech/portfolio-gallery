export const FILTER_OPTIONS = {
  techStack: [
    'React', 'Next.js', 'Vue.js', 'Angular', 'Svelte',
    'TypeScript', 'JavaScript', 'Python', 'Node.js',
    'Tailwind CSS', 'Bootstrap', 'CSS-in-JS', 'SCSS',
    'GraphQL', 'REST API', 'MongoDB', 'PostgreSQL',
    'AWS', 'Vercel', 'Netlify', 'Docker'
  ],
  
  colorScheme: [
    'dark', 'light', 'colorful', 'minimal', 'monochrome'
  ],
  
  layoutType: [
    'single-page', 'multi-page', 'blog', 'dashboard', 'landing'
  ],
  
  designStyle: [
    'minimalist', 'creative', 'corporate', 'artistic', 'modern'
  ],
  
  complexity: [
    'beginner', 'intermediate', 'advanced'
  ]
};

export type TechStack = typeof FILTER_OPTIONS.techStack[number];
export type ColorScheme = typeof FILTER_OPTIONS.colorScheme[number];
export type LayoutType = typeof FILTER_OPTIONS.layoutType[number];
export type DesignStyle = typeof FILTER_OPTIONS.designStyle[number];
export type Complexity = typeof FILTER_OPTIONS.complexity[number];

export interface FilterState {
  techStack: string[];
  colorScheme: string[];
  layoutType: string[];
  designStyle: string[];
  complexity: string[];
  searchQuery: string;
  category: string;
}
