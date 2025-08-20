"use client";

import { Portfolio } from "@/types/portfolio";
import PortfolioCard from "./portfolio-card";
import { useFavorites } from "@/context/favourites-context";

interface PortfolioGridProps {
  patterns: Portfolio[];
  activePattern: string | null;
  theme: "light" | "dark";
}

export default function PortfolioGrid({
  patterns,
  activePattern,
  theme,
}: PortfolioGridProps) {
  const { favourites } = useFavorites();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-8">
      {patterns.map((pattern, index) => (
        <div
          key={`${pattern.id}-${favourites.includes(pattern.id)}`}
          className={`animate-fade-in portfolio-card-stagger-${(index % 6) + 1}`}
          style={{
            animationDelay: `${(index % 6) * 0.1}s`,
            animationFillMode: 'both'
          }}
        >
          <PortfolioCard
            pattern={pattern}
            activePattern={activePattern}
            theme={theme}
          />
        </div>
      ))}
    </div>
  );
}
