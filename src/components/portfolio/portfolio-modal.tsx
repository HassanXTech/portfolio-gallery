"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Portfolio } from "@/types/portfolio";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Code2, Eye, Image as ImageIcon } from "lucide-react";
import { GitHubAvatar } from "@/components/ui/github-avatar";

interface PortfolioModalProps {
  open: boolean;
  onClose: () => void;
  item: Portfolio | null;
}

export function PortfolioModal({ open, onClose, item }: PortfolioModalProps) {
  const [useIframe, setUseIframe] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadedRef = useRef<boolean>(false);

  useEffect(() => {
    // Reset for new item
    // cleanup old timer
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
      loadTimerRef.current = null;
    }
    loadedRef.current = false;
    // Start on thumbnail slide by default
    setUseIframe(false);
    setLoaded(false);
    if (!item?.liveUrl) return;
    // If not loaded within 5s, assume blocked and fallback to thumbnail/style
    loadTimerRef.current = setTimeout(() => {
      if (!loadedRef.current) setUseIframe(false);
    }, 5000);
    return () => {
      if (loadTimerRef.current) clearTimeout(loadTimerRef.current);
    };
  }, [item?.id, item?.liveUrl]);

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 max-w-5xl w-[92%] md:w-[85%] rounded-2xl overflow-hidden shadow-2xl border bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white border-black/10 dark:border-white/10">
        <button
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-black/80 dark:bg-white/10 dark:hover:bg-white/20"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex flex-col">
          <div className="relative w-full aspect-video bg-neutral-100 dark:bg-neutral-800">
            {/* Slide 1: Thumbnail/Style or GitHub Avatar */}
            {!useIframe ? (
              item.thumbnailUrl ? (
                <>
                  {/* Auto-fill background using blurred thumbnail */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${item.thumbnailUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(28px)",
                      transform: "scale(1.08)",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.name}
                    fill
                    className={`relative z-10 ${item.thumbnailFit === "cover" ? "object-cover" : "object-contain"}`}
                  />
                </>
              ) : (
                // GitHub Avatar Fallback
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <GitHubAvatar
                    name={item.name}
                    size="lg"
                    className="relative z-10"
                  />
                </div>
              )
            ) : item.liveUrl ? (
              <>
                <iframe
                  src={item.liveUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  onLoad={() => {
                    loadedRef.current = true;
                    setLoaded(true);
                    if (loadTimerRef.current) {
                      clearTimeout(loadTimerRef.current);
                      loadTimerRef.current = null;
                    }
                  }}
                  onError={() => setUseIframe(false)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  referrerPolicy="no-referrer"
                />
                {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-600 dark:text-neutral-300">
                    Loading preview...
                  </div>
                )}
              </>
            ) : null}

            {/* Controls: dots + toggle button */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
              <div className="rounded-full bg-black/50 backdrop-blur-md border border-white/20 px-1 py-1 flex items-center gap-1 shadow-md">
                <button
                  onClick={() => setUseIframe(false)}
                  className={`flex items-center gap-1 text-[11px] leading-none px-2 py-1 rounded-full transition-colors ${
                    !useIframe ? "bg-white text-black" : "text-white/90 hover:bg-white/10"
                  }`}
                  aria-label="Show thumbnail"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  Thumbnail
                </button>
                {item.liveUrl && (
                  <button
                    onClick={() => setUseIframe(true)}
                    className={`flex items-center gap-1 text-[11px] leading-none px-2 py-1 rounded-full transition-colors ${
                      useIframe ? "bg-white text-black" : "text-white/90 hover:bg-white/10"
                    }`}
                    aria-label="Show live preview"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Live
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">{item.name}</h3>
            {item.description && (
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 mb-5 max-w-3xl">
                {item.description}
              </p>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full border bg-white/70 dark:bg-white/10 dark:border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              {item.liveUrl && (
                <Button
                  size="lg"
                  className="gap-2 bg-slate-950 hover:bg-slate-900 dark:bg-white dark:text-black"
                  onClick={() => window.open(item.liveUrl!, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" /> Open in New Tab
                </Button>
              )}
              {item.sourceUrl && (
                <Button
                  size="lg"
                  className="gap-2 bg-white text-black hover:bg-gray-100 dark:bg-slate-900 dark:text-white"
                  onClick={() => window.open(item.sourceUrl!, "_blank")}
                >
                  <Code2 className="h-4 w-4" /> Source Code
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


