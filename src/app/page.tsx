"use client";

import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { gridPortfolios } from "@/data/portfolios";
import { useTheme } from "@/hooks/useTheme";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/home/hero";
import GalleryShowcase from "@/components/portfolio/portfolio-showcase";
import SupportDropdown from "@/components/home/support-dropdown";
import ReturnToPreview from "@/components/home/return-to-preview";
import { FavoritesProvider } from "@/context/favourites-context";

export default function Home() {
  const [activePattern, setActivePattern] = useState<string | null>(null);
  const { theme, updateThemeFromPattern } = useTheme();

  // Update theme based on background color (if provided on portfolio)
  useEffect(() => {
    updateThemeFromPattern(activePattern, gridPortfolios);
  }, [activePattern, updateThemeFromPattern]);

  // Find the active pattern object
  const activePatternObj = activePattern
    ? gridPortfolios.find((p) => p.id === activePattern)
    : null;

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <FavoritesProvider>
          <div className="min-h-screen relative">
            {/* Apply the active pattern as background */}
            {activePatternObj && (
              <div
                className="fixed inset-0 z-0"
                style={activePatternObj.style}
              />
            )}
            <div className="relative z-10">
              <Navbar theme={theme} />
              <SupportDropdown theme={theme} />
              <Hero
                activePattern={activePattern}
                setActivePattern={setActivePattern}
                theme={theme}
              />
              <GalleryShowcase
                activePattern={activePattern}
                setActivePattern={setActivePattern}
                theme={theme}
              />
              <Footer theme={theme} />
            </div>
            <ReturnToPreview theme={theme} />
          </div>
        </FavoritesProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}
