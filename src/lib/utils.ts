/* eslint-disable @typescript-eslint/no-explicit-any */
import { Portfolio } from "@/types/portfolio";
import { FilterState } from "./filter-options";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends any[]>(
  fn: (...args: T) => any,
  timeout: number
) {
  let timeoutId: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}

export function searchPatterns(
  gridPatterns: Portfolio[],
  category: string,
  searchInput: string
) {
  if (searchInput === "") return gridPatterns;

  const loweredInput = searchInput.toLowerCase();

  const inputWords = loweredInput.split(" ").filter(Boolean);

  const filteredPatterns = gridPatterns.filter((pattern) => {
    if (pattern.category === category || category === "all") {
      const patternWords = pattern.name.toLowerCase().split(" ");

      if (inputWords.length === 1 && inputWords[0].length === 1) {
        return patternWords[0].startsWith(inputWords[0]);
      }

      return inputWords.every((inputWord) =>
        patternWords.some((patternWord) => patternWord.startsWith(inputWord))
      );
    } else {
      return false;
    }
  });

  const sortedPatterns = filteredPatterns.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    const posInA = aName.indexOf(inputWords[0]);
    const posInB = bName.indexOf(inputWords[0]);

    return posInA - posInB;
  });

  return sortedPatterns;
}

export function applyAdvancedFilters(
  portfolios: Portfolio[],
  filters: FilterState
): Portfolio[] {
  return portfolios.filter((portfolio) => {
    // Tech Stack filter
    if (filters.techStack.length > 0) {
      const portfolioTechStack = portfolio.techStack || [];
      const hasMatchingTech = filters.techStack.some(tech => 
        portfolioTechStack.includes(tech)
      );
      if (!hasMatchingTech) return false;
    }

    // Color Scheme filter
    if (filters.colorScheme.length > 0) {
      if (!portfolio.colorScheme || !filters.colorScheme.includes(portfolio.colorScheme)) {
        return false;
      }
    }

    // Layout Type filter
    if (filters.layoutType.length > 0) {
      if (!portfolio.layoutType || !filters.layoutType.includes(portfolio.layoutType)) {
        return false;
      }
    }

    // Design Style filter
    if (filters.designStyle.length > 0) {
      if (!portfolio.designStyle || !filters.designStyle.includes(portfolio.designStyle)) {
        return false;
      }
    }

    // Complexity filter
    if (filters.complexity.length > 0) {
      if (!portfolio.complexity || !filters.complexity.includes(portfolio.complexity)) {
        return false;
      }
    }

    return true;
  });
}

export function searchAndFilterPortfolios(
  portfolios: Portfolio[],
  filters: FilterState
): Portfolio[] {
  let filteredPortfolios = portfolios;

  // Apply category filter
  if (filters.category && filters.category !== "all") {
    filteredPortfolios = filteredPortfolios.filter(
      portfolio => portfolio.category === filters.category
    );
  }

  // Apply search query
  if (filters.searchQuery) {
    const searchQuery = filters.searchQuery.toLowerCase();
    filteredPortfolios = filteredPortfolios.filter(portfolio => {
      const nameMatch = portfolio.name.toLowerCase().includes(searchQuery);
      const descriptionMatch = portfolio.description?.toLowerCase().includes(searchQuery);
      const tagsMatch = portfolio.tags?.some(tag => 
        tag.toLowerCase().includes(searchQuery)
      );
      const techStackMatch = portfolio.techStack?.some(tech => 
        tech.toLowerCase().includes(searchQuery)
      );
      
      return nameMatch || descriptionMatch || tagsMatch || techStackMatch;
    });
  }

  // Apply advanced filters
  filteredPortfolios = applyAdvancedFilters(filteredPortfolios, filters);

  return filteredPortfolios;
}
