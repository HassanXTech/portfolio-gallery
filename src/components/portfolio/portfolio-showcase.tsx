"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, ArrowDown } from "lucide-react";
// Switch data source to portfolios list
import { gridPortfolios } from "@/data/portfolios";
import { categories } from "@/data/categories";
import PortfolioGrid from "./portfolio-grid";
import PatternEmptyState from "./portfolio-empty-state";
import { SearchBar } from "../search/search-bar";
import { AdvancedFilters } from "../search/advanced-filters";
import { searchAndFilterPortfolios } from "@/lib/utils";
import { FilterState } from "@/lib/filter-options";

interface GalleryShowcaseProps {
  activePattern: string | null;
  setActivePattern: (pattern: string | null) => void;
  theme: "light" | "dark";
}

export default function GalleryShowcase({
  activePattern,
  theme,
}: GalleryShowcaseProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const isPatternDark = theme === "dark";

  const [searchInput, setSearchInput] = useState<string>("");

  // Pagination state
  const [visibleCount, setVisibleCount] = useState<number>(12); // Show 12 portfolios initially
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Advanced filters state
  const [filters, setFilters] = useState<FilterState>({
    techStack: [],
    colorScheme: [],
    layoutType: [],
    designStyle: [],
    complexity: [],
    searchQuery: "",
    category: "all"
  });

  // Update filters when search input or active tab changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      searchQuery: searchInput,
      category: activeTab
    }));
    // Reset pagination when filters change
    setVisibleCount(12);
    setHasMore(true);
  }, [searchInput, activeTab]);

  // Desktop carousel: horizontal smooth scroll for middle categories
  const middleCategories = useMemo(
    () => categories.filter((c) => c.id !== "all" && c.id !== "favourites"),
    []
  );
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = () => {
    const el = rowRef.current;
    if (!el) return;
    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setCanPrev(!atStart);
    setCanNext(!atEnd);
  };

  const goPrev = () => {
    const el = rowRef.current;
    if (!el) return;
    const amount = Math.max(200, Math.round(el.clientWidth * 0.7));
    el.scrollBy({ left: -amount, behavior: "smooth" });
  };
  const goNext = () => {
    const el = rowRef.current;
    if (!el) return;
    const amount = Math.max(200, Math.round(el.clientWidth * 0.7));
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    updateScrollState();
    const el = rowRef.current;
    if (!el) return;
    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Ensure selected tab is scrolled into view smoothly
  useEffect(() => {
    if (activeTab === "all" || activeTab === "favourites") return;
    const el = rowRef.current;
    if (!el) return;
    const target = el.querySelector(`[data-cat-id="${activeTab}"]`) as
      | HTMLElement
      | null;
    target?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeTab]);

  // Filter patterns based on categories and advanced filters
  const filteredPatterns = useMemo(() => {
    return searchAndFilterPortfolios(gridPortfolios, filters);
  }, [filters]);

  // Get visible patterns for pagination
  const visiblePatterns = useMemo(() => {
    return filteredPatterns.slice(0, visibleCount);
  }, [filteredPatterns, visibleCount]);

  // Check if there are more patterns to show
  useEffect(() => {
    setHasMore(visibleCount < filteredPatterns.length);
  }, [visibleCount, filteredPatterns.length]);

  // Handle "Show More" button click
  const handleShowMore = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simulate loading delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Increase visible count by 12 more portfolios
    setVisibleCount(prev => prev + 12);
    setIsLoading(false);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="animate-pulse"
        >
          <div className="aspect-[16/9] rounded-xl sm:rounded-2xl bg-gray-200 dark:bg-gray-700 mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      id="pattern-showcase"
      className="container mx-auto pt-6 px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20"
    >
      {/* Header */}
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <div className="text-center sm:text-left">
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 transition-colors duration-300 ${
              isPatternDark ? "text-white" : "text-gray-900 dark:text-gray-50"
            }`}
          >
            Portfolio Gallery
          </h2>
          <p
            className={`text-sm sm:text-base transition-colors duration-300 ${
              isPatternDark ? "text-gray-300" : "text-muted-foreground"
            }`}
          >
            Tap on mobile or hover on desktop to see portfolio options
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-8"
      >
        {/* Desktop & Tablet Tabs - Carousel */}
        <TabsList
          className={`hidden md:flex items-center w-full h-auto p-1.5 gap-2 overflow-hidden
            backdrop-blur-md shadow-lg border rounded-xl mb-8 transition-all duration-300
            ${
              isPatternDark
                ? "bg-black/20 border-white/10 hover:bg-black/30"
                : "bg-white/70 border-gray-200/30 hover:bg-white/80"
            }`}
        >
          {/* Pinned: All */}
          <TabsTrigger
            value="all"
            className={`shrink-0 py-2.5 px-3 text-sm font-medium rounded-lg relative overflow-hidden group
              ${
                isPatternDark
                  ? `data-[state=active]:bg-white/10 data-[state=active]:text-white 
                     data-[state=inactive]:text-gray-300 data-[state=inactive]:hover:text-white`
                  : `data-[state=active]:bg-white/90 data-[state=active]:text-gray-900 
                     data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900`
              }`}
          >
            All Portfolios
          </TabsTrigger>

          {/* Prev button */}
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            className={`shrink-0 p-2 rounded-lg border transition-colors ${
              isPatternDark
                ? `border-white/10 ${canPrev ? "hover:bg-white/10" : "opacity-50"}`
                : `border-gray-200/40 ${canPrev ? "hover:bg-white" : "opacity-50"}`
            }`}
            aria-label="Previous categories"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Visible middle categories (h-scroll with smooth animation) */}
          <div className="flex-1 min-w-0">
            <div
              ref={rowRef}
              className="flex flex-nowrap items-center gap-2 overflow-x-auto scroll-smooth px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {middleCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  data-cat-id={category.id}
                  className={`shrink-0 max-w-[12rem] truncate whitespace-nowrap py-2.5 px-3 text-sm font-medium rounded-lg relative overflow-hidden group
                    ${
                      isPatternDark
                        ? `data-[state=active]:bg-white/10 data-[state=active]:text-white 
                           data-[state=inactive]:text-gray-300 data-[state=inactive]:hover:text-white`
                        : `data-[state=active]:bg-white/90 data-[state=active]:text-gray-900 
                           data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900`
                    }`}
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            className={`shrink-0 p-2 rounded-lg border transition-colors ${
              isPatternDark
                ? `border-white/10 ${canNext ? "hover:bg-white/10" : "opacity-50"}`
                : `border-gray-200/40 ${canNext ? "hover:bg-white" : "opacity-50"}`
            }`}
            aria-label="Next categories"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Pinned: Favourites */}
          <TabsTrigger
            value="favourites"
            className={`shrink-0 py-2.5 px-3 text-sm font-medium rounded-lg relative overflow-hidden group
              ${
                isPatternDark
                  ? `data-[state=active]:bg-white/10 data-[state=active]:text-white 
                     data-[state=inactive]:text-gray-300 data-[state=inactive]:hover:text-white`
                  : `data-[state=active]:bg-white/90 data-[state=active]:text-gray-900 
                     data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900`
              }`}
          >
            Favourites
          </TabsTrigger>
        </TabsList>

        {/* Mobile /Tablets */}
        <div className="block md:hidden mb-6">
          <div className="flex flex-wrap gap-2 px-1 pb-2 justify-center">
            {categories.map((category) => (
              <button
                key={`mobile-${category.id}`}
                onClick={() => setActiveTab(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap
                  text-sm font-medium transition-all duration-300 ease-in-out
                  backdrop-blur-md shadow-lg border
                  hover:scale-[1.02] hover:shadow-xl
                  ${
                    activeTab === category.id
                      ? isPatternDark
                        ? "bg-white/15 text-white border-white/20 shadow-lg"
                        : "bg-white/90 text-gray-900 border-gray-200/40 shadow-lg"
                      : isPatternDark
                      ? "bg-black/20 text-gray-300 border-white/10 hover:bg-black/30 hover:text-white hover:border-white/20"
                      : "bg-white/60 text-gray-600 border-gray-200/30 hover:bg-white/80 hover:text-gray-900 hover:border-gray-300/40"
                  }
                `}
              >
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          isPatternDark={isPatternDark}
        />

        {/* Advanced Filters */}
        <AdvancedFilters
          filters={filters}
          onFiltersChange={setFilters}
          isPatternDark={isPatternDark}
        />

        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.id}
            className="mt-0"
          >
            {/* Pattern count */}
            <div className="mb-6">
              <p
                className={`text-sm transition-colors duration-300 ${
                  isPatternDark ? "text-gray-300" : "text-muted-foreground"
                }`}
              >
                Showing {visiblePatterns.length} of {filteredPatterns.length} portfolio
                {filteredPatterns.length !== 1 ? "s" : ""}
                {category.id !== "all" && ` in ${category.label}`}
              </p>
            </div>

            {/* Grid */}
            {visiblePatterns.length > 0 ? (
              <>
                <PortfolioGrid
                  patterns={visiblePatterns}
                  activePattern={activePattern}
                  theme={theme}
                />
                
                {/* Show More Button */}
                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleShowMore}
                      disabled={isLoading}
                      className={`
                        group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm
                        transition-all duration-300 ease-out transform
                        backdrop-blur-md shadow-md border
                        hover:scale-102 hover:shadow-lg hover:-translate-y-0.5
                        active:scale-98 active:translate-y-0
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                        animate-fade-in-up
                        ${
                          isPatternDark
                            ? "bg-white/15 text-white border-white/25 hover:bg-white/25 hover:border-white/35 hover:shadow-white/10"
                            : "bg-white/90 text-gray-800 border-gray-200/50 hover:bg-white hover:border-gray-300/60 hover:shadow-gray-200/20"
                        }
                      `}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="animate-pulse">Loading...</span>
                        </>
                      ) : (
                        <>
                          <span className="font-semibold">Show More</span>
                          <span className="text-xs opacity-70 font-normal">
                            ({filteredPatterns.length - visibleCount} left)
                          </span>
                          <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Loading Skeleton */}
                {isLoading && (
                  <div className="mt-8 animate-fade-in">
                    <LoadingSkeleton />
                  </div>
                )}
              </>
            ) : (
              <PatternEmptyState
                activeTab={activeTab}
                theme={theme}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
