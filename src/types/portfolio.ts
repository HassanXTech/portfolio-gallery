import type { CSSProperties } from "react";
import type { CategoryId } from "@/data/categories";

export interface Portfolio {
  id: string;
  name: string;
  category: CategoryId;
  description?: string;
  tags?: string[];
  badge?: "New" | " ";
  thumbnailUrl?: string;
  thumbnailFit?: "contain" | "cover";
  sourceUrl?: string;
  liveUrl?: string;
  style?: CSSProperties;
}


