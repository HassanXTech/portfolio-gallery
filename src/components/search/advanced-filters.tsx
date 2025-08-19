"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FILTER_OPTIONS, FilterState } from "@/lib/filter-options";

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isPatternDark: boolean;
}

export function AdvancedFilters({ filters, onFiltersChange, isPatternDark }: AdvancedFiltersProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const filterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Handle click outside to close filters
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openFilter && filterRefs.current[openFilter]) {
        const target = event.target as Node;
        if (!filterRefs.current[openFilter]?.contains(target)) {
          setOpenFilter(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openFilter]);

  const updateFilter = (filterType: keyof Omit<FilterState, 'searchQuery' | 'category'>, value: string) => {
    const currentValues = filters[filterType] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({
      ...filters,
      [filterType]: newValues
    });
  };

  const clearFilter = (filterType: keyof Omit<FilterState, 'searchQuery' | 'category'>) => {
    onFiltersChange({
      ...filters,
      [filterType]: []
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      ...filters,
      techStack: [],
      colorScheme: [],
      layoutType: [],
      designStyle: [],
      complexity: []
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) && value.length > 0
  );

  const FilterDropdown = ({ 
    title, 
    filterType, 
    options, 
    isOpen, 
    onToggle 
  }: {
    title: string;
    filterType: keyof Omit<FilterState, 'searchQuery' | 'category'>;
    options: string[];
    isOpen: boolean;
    onToggle: () => void;
  }) => {
    const selectedValues = filters[filterType] as string[];
    
    return (
      <div className="relative" ref={el => filterRefs.current[filterType] = el}>
        <Button
          variant="outline"
          onClick={onToggle}
          className={`gap-2 px-3 py-2.5 text-sm border transition-all duration-300 hover:scale-105 ${
            isPatternDark
              ? "bg-black/30 border-white/20 text-white hover:bg-black/40 hover:border-white/30"
              : "bg-white/70 border-gray-200/30 text-gray-900 hover:bg-white/80 hover:border-gray-300/50"
          } ${selectedValues.length > 0 ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">{title}</span>
          <span className="sm:hidden text-xs">{title.split(' ')[0]}</span>
          {selectedValues.length > 0 && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs bg-blue-500 text-white">
              {selectedValues.length}
            </Badge>
          )}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        {isOpen && (
          <div className={`absolute top-full left-0 mt-2 w-72 sm:w-80 z-50 rounded-xl shadow-2xl border transition-all duration-300 backdrop-blur-xl ${
            isPatternDark
              ? "bg-black/95 border-white/20"
              : "bg-white/98 border-gray-200/50"
          }`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold text-sm ${
                  isPatternDark ? "text-white" : "text-gray-900"
                }`}>
                  {title}
                </h3>
                {selectedValues.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearFilter(filterType)}
                    className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Clear
                  </Button>
                )}
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {options.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:scale-[1.02] transition-all duration-200 ${
                      isPatternDark 
                        ? "hover:bg-white/10" 
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(option)}
                      onChange={() => updateFilter(filterType, option)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-0"
                    />
                    <span className={`text-sm font-medium ${
                      isPatternDark ? "text-gray-200" : "text-gray-700"
                    }`}>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h3 className={`text-lg sm:text-xl font-bold ${
            isPatternDark ? "text-white" : "text-gray-900"
          }`}>
            Advanced Filters
          </h3>
          {hasActiveFilters && (
            <Badge variant="secondary" className="px-2 py-1 text-xs bg-blue-500 text-white">
              {Object.values(filters).reduce((acc, val) => 
                acc + (Array.isArray(val) ? val.length : 0), 0
              )} active
            </Badge>
          )}
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full sm:w-auto"
          >
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Filter Grid - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <FilterDropdown
          title="Tech Stack"
          filterType="techStack"
          options={FILTER_OPTIONS.techStack}
          isOpen={openFilter === 'techStack'}
          onToggle={() => setOpenFilter(openFilter === 'techStack' ? null : 'techStack')}
        />

        <FilterDropdown
          title="Color Scheme"
          filterType="colorScheme"
          options={FILTER_OPTIONS.colorScheme}
          isOpen={openFilter === 'colorScheme'}
          onToggle={() => setOpenFilter(openFilter === 'colorScheme' ? null : 'colorScheme')}
        />

        <FilterDropdown
          title="Layout Type"
          filterType="layoutType"
          options={FILTER_OPTIONS.layoutType}
          isOpen={openFilter === 'layoutType'}
          onToggle={() => setOpenFilter(openFilter === 'layoutType' ? null : 'layoutType')}
        />

        <FilterDropdown
          title="Design Style"
          filterType="designStyle"
          options={FILTER_OPTIONS.designStyle}
          isOpen={openFilter === 'designStyle'}
          onToggle={() => setOpenFilter(openFilter === 'designStyle' ? null : 'designStyle')}
        />

        <FilterDropdown
          title="Complexity"
          filterType="complexity"
          options={FILTER_OPTIONS.complexity}
          isOpen={openFilter === 'complexity'}
          onToggle={() => setOpenFilter(openFilter === 'complexity' ? null : 'complexity')}
        />
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className={`mt-6 p-4 rounded-xl border bg-opacity-50 backdrop-blur-sm transition-all duration-300 ${
          isPatternDark
            ? "bg-black/20 border-white/10"
            : "bg-white/50 border-gray-200/30"
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-sm font-medium ${
              isPatternDark ? "text-gray-300" : "text-gray-600"
            }`}>
              Active Filters:
            </span>
            <Badge variant="secondary" className="px-2 py-1 text-xs bg-blue-500 text-white">
              {Object.values(filters).reduce((acc, val) => 
                acc + (Array.isArray(val) ? val.length : 0), 0
              )}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([filterType, values]) => {
              if (filterType === 'searchQuery' || filterType === 'category' || !Array.isArray(values) || values.length === 0) {
                return null;
              }
              
              return values.map((value) => (
                <Badge
                  key={`${filterType}-${value}`}
                  variant="secondary"
                  className={`gap-2 px-3 py-2 text-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isPatternDark
                      ? "bg-white/20 text-white hover:bg-white/30 hover:shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg"
                  }`}
                  onClick={() => updateFilter(filterType as keyof Omit<FilterState, 'searchQuery' | 'category'>, value)}
                >
                  <span className="text-xs opacity-70">{filterType}:</span>
                  {value}
                  <X className="h-3 w-3 hover:text-red-500 transition-colors" />
                </Badge>
              ));
            })}
          </div>
        </div>
      )}
    </div>
  );
}
