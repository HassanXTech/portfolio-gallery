export const PATTERN_CATEGORIES = [
  { id: "all", label: "All Portfolios" },
  { id: "web", label: "Web Development" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "uiux", label: "UI/UX Design" },
  { id: "data-ml", label: "Data Science & ML" },
  { id: "backend-devops", label: "Backend & DevOps" },
  { id: "agency", label: "Agency" },
  { id: "design-engineering", label: "Design Engineering" },
  { id: "indie", label: "Indie Makers" },
  { id: "game", label: "Game Dev" },
  { id: "student", label: "Student/Junior" },
  { id: "content", label: "Content & Writing" },
  { id: "favourites", label: "Favourites" },
] as const;

export const THEME_CONFIG = {
  light: "light",
  dark: "dark",
} as const;

export const SUPPORT_CONFIG = {
  BUY_ME_COFFEE_URL: "https://coff.ee/meghdev",
} as const;

export const APP_CONFIG = {
  GITHUB_URL: "https://github.com/HassanXTech/portfolio-gallery",
  TWITTER_URL: "https://twitter.com/HassanXTech",
  CONTRIBUTING_URL: "https://github.com/HassanXTech/portfolio-gallery#contributing",
} as const;
