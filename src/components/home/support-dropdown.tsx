"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Star,
  Heart,
  Coffee,
} from "lucide-react";
import { SUPPORT_CONFIG } from "@/lib/constants";

interface SupportDropdownProps {
  theme?: "light" | "dark";
}

import { APP_CONFIG } from "@/lib/constants";

const SupportDropdown: React.FC<SupportDropdownProps> = ({
  theme = "light",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const openGithub = () => {
    window.open(APP_CONFIG.GITHUB_URL, "_blank", "noopener,noreferrer");
  };

  const handleBuyMeCoffee = () => {
    window.open(
      SUPPORT_CONFIG.BUY_ME_COFFEE_URL,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div ref={dropdownRef} className="fixed bottom-6 right-4 sm:right-6 z-50">
      {/* Dropdown Menu */}
      <div
        className={`
          absolute bottom-16 right-0 mb-2 w-[calc(100vw-2rem)] max-w-xs sm:w-72 md:w-64 lg:w-[18rem] rounded-xl backdrop-blur-md border shadow-xl
          transform transition-all duration-300 ease-out origin-bottom-right
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2 pointer-events-none"
          }
          ${
            theme === "dark"
              ? "bg-black/40 border-white/10"
              : "bg-white border-gray-300"
          }
        `}
      >
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <button
            onClick={openGithub}
            className={`
              w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-200 cursor-pointer
              ${
                theme === "dark"
                  ? "hover:bg-white/10 text-white/90 hover:text-white"
                  : "hover:bg-gray-300/50 text-gray-800 hover:text-gray-900"
              }
            `}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black text-white rounded-lg flex items-center justify-center">
              <Star className="w-3 sm:w-4 h-3 sm:h-4" />
            </div>
            <span className="font-medium text-sm sm:text-base">
              Star this repository
            </span>
          </button>

          {/* Buy Me Coffee Button */}
          <button
            onClick={handleBuyMeCoffee}
            className={`
              w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-200 cursor-pointer
              ${
                theme === "dark"
                  ? "hover:bg-white/10 text-white/90 hover:text-white"
                  : "hover:bg-gray-300/50 text-gray-800 hover:text-gray-900"
              }
            `}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Coffee className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
            </div>
            <span className="font-medium text-sm sm:text-base">
              Buy Me Coffee
            </span>
          </button>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md border shadow-xl
          flex items-center justify-center transition-all duration-300
          ${
            theme === "dark"
              ? "bg-black/50 border-white/10 hover:bg-black/40"
              : "bg-white border-gray-300 hover:bg-gray-50"
          }
          ${isOpen ? "rotate-180" : "rotate-0"}
        `}
        aria-label="Support options"
      >
        <Heart
            className={`w-5 sm:w-6 h-5 sm:h-6 ${
              theme === "dark" ? "text-white/80" : "text-red-600"
            }`}
        />
      </button>
    </div>
  );
};

export default SupportDropdown;
