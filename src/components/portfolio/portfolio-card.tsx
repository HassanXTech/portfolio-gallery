"use client";

import { Badge } from "@/components/ui/badge";
import { Sparkles, Star, ExternalLink } from "lucide-react";
import { Portfolio } from "@/types/portfolio";
import { useFavorites } from "@/context/favourites-context";
import { GitHubAvatar } from "@/components/ui/github-avatar";

interface PatternCardProps {
  pattern: Portfolio;
  activePattern: string | null;
  theme: "light" | "dark";
  onOpenDetails?: () => void;
}

export default function PortfolioCard({
  pattern,
  activePattern,
  theme,
  onOpenDetails,
}: PatternCardProps) {
  const { toggleFavourite, isFavourite } = useFavorites();
  const isPatternDark = theme === "dark";

  return (
    <div className="group relative rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 p-3 sm:p-4">
      <div
        className={`relative aspect-[16/9] rounded-2xl overflow-hidden bg-background shadow-sm transition-all duration-300 ${
          activePattern === pattern.id ? "ring-2 ring-primary ring-offset-2" : ""
        } hover:shadow-lg`}
        onClick={() => onOpenDetails?.()}
      >
        {/* Favorite Button with Star Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite(pattern.id);
          }}
          className={`absolute top-2 left-2 z-10 p-2 rounded-full backdrop-blur-md shadow-lg border transition-all cursor-pointer duration-200 hover:scale-110 group/star ${
            isFavourite(pattern.id)
              ? isPatternDark
                ? "bg-yellow-500/20 border-yellow-400/30 text-yellow-400"
                : "bg-yellow-500/20 border-yellow-500/30 text-yellow-600"
              : isPatternDark
              ? "bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30"
              : "bg-black/20 border-white/30 text-white hover:bg-black/30 hover:border-white/40"
          }`}
          title={
            isFavourite(pattern.id)
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Star
            className={`h-4 w-4 transition-all duration-200 ${
              isFavourite(pattern.id)
                ? "fill-current scale-110"
                : "group-hover/star:scale-110"
            }`}
          />
        </button>

        {/* Portfolio thumbnail or GitHub avatar fallback */}
        {pattern.thumbnailUrl ? (
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${pattern.thumbnailUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(20px)",
                transform: "scale(1.08)",
              }}
            />
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
            <img
              src={pattern.thumbnailUrl}
              alt={pattern.name}
              className={`absolute inset-0 h-full w-full ${pattern.thumbnailFit === "cover" ? "object-cover" : "object-contain"}`}
              draggable={false}
            />
          </>
        ) : (
          // GitHub Avatar Fallback
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <GitHubAvatar
              name={pattern.name}
              size="lg"
              className="relative z-10"
            />
          </div>
        )}

        {/* Badge */}
        {pattern.badge && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
            <Badge
              variant="secondary"
              className="gap-1 text-xs bg-background/80 backdrop-blur-sm border-border/50 px-2 py-1"
            >
              <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-violet-600" />
              <span>{pattern.badge}</span>
            </Badge>
          </div>
        )}

        {/* Bottom content: title, tags, external link */}
      </div>
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h3 className={`text-lg sm:text-xl font-semibold ${isPatternDark ? "text-white" : "text-gray-900 dark:text-white"}`}>{pattern.name}</h3>
          {pattern.tags && pattern.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {pattern.tags.slice(0, 6).map((tag) => (
                <span key={tag} className="text-[10px] sm:text-xs px-2 py-1 rounded-md border bg-white/70 text-gray-800 dark:bg-white/10 dark:text-white/90 dark:border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails?.();
          }}
          className="p-2 rounded-lg border shadow-sm hover:shadow transition-colors bg-white text-black dark:bg-neutral-900 dark:text-white dark:border-white/10"
          aria-label="Open details"
        >
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
