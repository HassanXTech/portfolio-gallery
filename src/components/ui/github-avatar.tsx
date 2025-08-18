"use client";

interface GitHubAvatarProps {
  sourceUrl?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GitHubAvatar({ sourceUrl, name, size = "md", className = "" }: GitHubAvatarProps) {
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

  // Generate consistent gradient based on name
  const getGradientColors = (name: string): string => {
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

  // Get initials from name
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
          Portfolio
        </span>
      </div>
    </div>
  );
}
