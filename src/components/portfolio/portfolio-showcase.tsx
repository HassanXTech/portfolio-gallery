"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PortfolioModal } from "./portfolio-modal";
// Switch data source to portfolios list
import { gridPortfolios } from "@/data/portfolios";
import { categories } from "@/data/categories";
import PatternGrid from "./portfolio-grid";
import PatternEmptyState from "./portfolio-empty-state";
import { SearchBar } from "../search/search-bar";
import { AdvancedFilters } from "../search/advanced-filters";
import { searchAndFilterPortfolios } from "@/lib/utils";
import { FilterState } from "@/lib/filter-options";
// No dynamic import needed; this file is a client component and modal handles client-only logic internally

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
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [detailsItem, setDetailsItem] = useState<typeof gridPortfolios[number] | null>(null);

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
                  <span className="block truncate">{category.label}</span>
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
                {filteredPatterns.length} portfolio
                {filteredPatterns.length !== 1 ? "s" : ""}
                {category.id !== "all" && ` in ${category.label}`}
              </p>
            </div>

            {/* Grid */}
            {filteredPatterns.length > 0 ? (
              <PatternGrid
                patterns={filteredPatterns}
                activePattern={activePattern}
                theme={theme}
                onOpenDetails={(item) => {
                  setDetailsItem(item);
                  setDetailsOpen(true);
                }}
              />
            ) : (
              <PatternEmptyState
                activeTab={activeTab}
                theme={theme}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
      <PortfolioModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        item={detailsItem}
      />
    </section>
  );
}
