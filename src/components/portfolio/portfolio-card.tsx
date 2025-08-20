"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, Code2, Eye } from "lucide-react";
import { Portfolio } from "@/types/portfolio";
import { useFavorites } from "@/context/favourites-context";
import { GitHubAvatar } from "@/components/ui/github-avatar";

interface PortfolioCardProps {
  pattern: Portfolio;
  activePattern: string | null;
  theme: "light" | "dark";
}

export default function PortfolioCard({
  pattern,
  activePattern,
  theme,
}: PortfolioCardProps) {
  const { toggleFavourite, isFavourite } = useFavorites();
  const isPatternDark = theme === "dark";
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  
  // Only use live preview if no thumbnail is available
  const shouldUseLivePreview = !pattern.thumbnailUrl && pattern.liveUrl;

  return (
    <div className="group relative">
      <div
        className={`relative aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-background shadow-sm transition-all duration-300 ${
          activePattern === pattern.id ? "ring-2 ring-primary ring-offset-2" : ""
        } hover:shadow-lg hover:scale-[1.02]`}
      >
        {/* Favorite Button with Star Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite(pattern.id);
          }}
          className={`absolute top-2 left-2 z-50 p-2 rounded-full backdrop-blur-md shadow-lg border transition-all cursor-pointer duration-200 hover:scale-110 group/star ${
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

        {/* Smart content: Thumbnail > Live Preview > GitHub Avatar */}
        {pattern.thumbnailUrl ? (
          // Priority 1: Use thumbnail if available (best performance)
          <>
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${pattern.thumbnailUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(20px)",
                transform: "scale(1.08)",
              }}
            />
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40 z-10" />
            <img
              src={pattern.thumbnailUrl}
              alt={pattern.name}
              className={`absolute inset-0 h-full w-full z-10 ${pattern.thumbnailFit === "cover" ? "object-cover" : "object-contain"}`}
              draggable={false}
            />
          </>
        ) : shouldUseLivePreview ? (
          // Priority 2: Use live preview if no thumbnail but has live URL
          <>
            {/* Blurred background fallback */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundColor: '#f3f4f6',
                backgroundImage: 'linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f3f4f6 75%), linear-gradient(-45deg, transparent 75%, #f3f4f6 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}
            />
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20 z-10" />
            
            {/* Live website preview iframe */}
            <iframe
              src={pattern.liveUrl}
              className="absolute inset-0 h-full w-full z-10 border-0 pointer-events-none"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="no-referrer"
              title={`Preview of ${pattern.name}`}
              style={{
                transform: 'scale(0.25)',
                transformOrigin: 'top left',
                width: '400%',
                height: '400%'
              }}
              onLoad={() => setIframeLoaded(true)}
              onError={() => setIframeError(true)}
            />
            
            {/* Loading overlay */}
            {!iframeLoaded && !iframeError && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 dark:bg-black/40">
                <div className="text-white text-sm font-medium">Loading preview...</div>
              </div>
            )}
            
            {/* Error fallback */}
            {iframeError && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 dark:bg-black/40">
                <div className="text-white text-sm font-medium text-center">
                  <div>Preview unavailable</div>
                  <div className="text-xs opacity-75 mt-1">Click Live button to visit</div>
                </div>
              </div>
            )}
            
            {/* Overlay to prevent interaction */}
            <div className="absolute inset-0 z-20 bg-transparent" />
          </>
        ) : (
          // Priority 3: GitHub Avatar fallback
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 z-10">
            <GitHubAvatar
              name={pattern.name}
              size="lg"
              className="relative z-20"
            />
          </div>
        )}

        {/* Badge */}
        {pattern.badge && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-50">
            <Badge
              variant="secondary"
              className="gap-1 text-xs bg-background/80 backdrop-blur-sm border-border/50 px-2 py-1"
            >
              <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-violet-600" />
              <span>{pattern.badge}</span>
            </Badge>
          </div>
        )}

        {/* Mobile View: Live and Source buttons - always show on mobile */}
        <div className="lg:hidden absolute bottom-2 left-2 right-2 z-50 flex justify-center gap-2 px-2">
          {pattern.liveUrl && (
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                window.open(pattern.liveUrl, "_blank");
              }}
              className="flex-1 bg-white/95 hover:bg-white text-black border-0 text-xs h-8"
            >
              <Eye className="h-3 w-3 mr-1" />
              Live
            </Button>
          )}
          {pattern.sourceUrl && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(pattern.sourceUrl, "_blank");
              }}
              className="flex-1 bg-gray-900/90 hover:bg-gray-900 text-white border-0 text-xs h-8"
            >
              <Code2 className="h-3 w-3 mr-1" />
              Code
            </Button>
          )}
        </div>

        {/* Desktop View: Hover overlay */}
        <div className="hidden lg:flex absolute inset-0 cursor-pointer bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center p-4 z-50">
          <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg mb-4 drop-shadow-lg">
              {pattern.name}
            </h3>
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full xs:w-auto">
              {pattern.liveUrl && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(pattern.liveUrl, "_blank");
                  }}
                  className="cursor-pointer shadow-xl backdrop-blur-md bg-white/95 hover:bg-white text-black border-0 transition-all duration-200 hover:scale-105 text-xs sm:text-sm px-3 py-2 h-auto w-full xs:w-auto"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Live
                </Button>
              )}
              {pattern.sourceUrl && (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(pattern.sourceUrl, "_blank");
                  }}
                  className="cursor-pointer shadow-xl backdrop-blur-md gap-1 border-0 transition-all duration-200 hover:scale-105 text-xs sm:text-sm px-3 py-2 h-auto w-full xs:w-auto bg-gray-900/90 hover:bg-gray-900 text-white"
                >
                  <Code2 className="h-3 w-3" />
                  Code
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom content: title only */}
      <div className="mt-4">
        <h3 className={`text-lg sm:text-xl font-semibold ${isPatternDark ? "text-white" : "text-gray-900 dark:text-white"}`}>
          {pattern.name}
        </h3>
      </div>
    </div>
  );
}
