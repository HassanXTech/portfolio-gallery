"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface GitHubAvatarProps {
  sourceUrl?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GitHubAvatar({ sourceUrl, name, size = "md", className = "" }: GitHubAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Extract GitHub username from source URL
  const extractGitHubUsername = (url: string): string | null => {
    try {
      const match = url.match(/github\.com\/([^\/]+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  // Fetch GitHub avatar
  useEffect(() => {
    if (!sourceUrl) {
      setIsLoading(false);
      return;
    }

    const username = extractGitHubUsername(sourceUrl);
    if (!username) {
      setIsLoading(false);
      return;
    }

    const fetchAvatar = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
          const data = await response.json();
          setAvatarUrl(data.avatar_url);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvatar();
  }, [sourceUrl]);

  // Size classes
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20", 
    lg: "w-24 h-24"
  };

  const containerSizeClasses = {
    sm: "w-20 h-20",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };

  // If we have a GitHub avatar, display it
  if (avatarUrl && !error && !isLoading) {
    return (
      <div className={`${containerSizeClasses[size]} rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center p-2 ${className}`}>
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
          <Image
            src={avatarUrl}
            alt={`${name} GitHub avatar`}
            width={size === "sm" ? 64 : size === "md" ? 80 : 96}
            height={size === "sm" ? 64 : size === "md" ? 80 : 96}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-md shadow-sm">
            GitHub
          </span>
        </div>
      </div>
    );
  }

  // Fallback to gradient with name initials
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getGradientColors = (name: string): string => {
    // Generate consistent gradient based on name
    const colors = [
      "from-blue-500 to-purple-600",
      "from-green-500 to-blue-600", 
      "from-purple-500 to-pink-600",
      "from-orange-500 to-red-600",
      "from-teal-500 to-green-600",
      "from-indigo-500 to-purple-600",
      "from-pink-500 to-rose-600",
      "from-cyan-500 to-blue-600"
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className={`${containerSizeClasses[size]} rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center p-2 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${getGradientColors(name)} flex items-center justify-center`}>
        <span className={`font-bold text-white ${
          size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"
        }`}>
          {getInitials(name)}
        </span>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-md shadow-sm">
          {avatarUrl ? "GitHub" : "Portfolio"}
        </span>
      </div>
    </div>
  );
}
