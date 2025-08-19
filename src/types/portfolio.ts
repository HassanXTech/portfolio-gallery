import type { CSSProperties } from "react";
import type { CategoryId } from "@/data/categories";

export interface Portfolio {
  id: string;
  name: string;
  category: CategoryId;
  description?: string;
  tags?: string[];
  badge?: "New" | "Popular" | " ";
  thumbnailUrl?: string;
  thumbnailFit?: "contain" | "cover";
  sourceUrl?: string;
  liveUrl?: string;
  style?: CSSProperties;
  
  // New filter fields
  techStack?: string[];
  colorScheme?: 'dark' | 'light' | 'colorful' | 'minimal' | 'monochrome';
  layoutType?: 'single-page' | 'multi-page' | 'blog' | 'dashboard' | 'landing';
  designStyle?: 'minimalist' | 'creative' | 'corporate' | 'artistic' | 'modern';
  complexity?: 'beginner' | 'intermediate' | 'advanced';
  performance?: {
    lighthouse?: number;
    mobileScore?: number;
    accessibilityScore?: number;
  };
}


