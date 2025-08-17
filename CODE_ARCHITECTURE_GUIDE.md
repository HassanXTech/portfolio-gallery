# 🏗️ PortfolioGallery Code Architecture Guide

## 📋 Overview
This guide explains the complete codebase structure, what each file does, and how all components work together to create the PortfolioGallery application.

---

## 🗂️ **Project Structure Overview**

```
PortfolioGallery/
├── 📁 public/                 # Static assets (images, icons, manifest)
├── 📁 src/                    # Source code
│   ├── 📁 app/               # Next.js App Router (pages & layout)
│   ├── 📁 components/        # React components organized by feature
│   ├── 📁 context/           # React Context for state management
│   ├── 📁 data/              # Static data and sample portfolios
│   ├── 📁 hooks/             # Custom React hooks
│   ├── 📁 lib/               # Utility functions and constants
│   └── 📁 types/             # TypeScript type definitions
├── 📄 package.json            # Dependencies and scripts
├── 📄 next.config.ts         # Next.js configuration
├── 📄 tsconfig.json          # TypeScript configuration
└── 📄 tailwind.config.js     # Tailwind CSS configuration
```

---

## 🚀 **Core Configuration Files**

### **package.json**
```json
{
  "name": "portfolio-gallery",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",        # Development server
    "build": "next build",    # Production build
    "start": "next start",    # Production server
    "lint": "next lint"       # Code linting
  }
}
```
**Purpose**: Defines project metadata, dependencies, and scripts.

### **next.config.ts**
```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "github.com" },
      { hostname: "imgur.com" },
      { hostname: "cloudinary.com" }
    ]
  }
}
```
**Purpose**: Configures Next.js, especially image optimization for external sources.

### **tsconfig.json**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]      # Path aliases for imports
    }
  }
}
```
**Purpose**: TypeScript configuration and path mapping.

---

## 🎨 **Styling & UI**

### **tailwind.config.js**
```javascript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { /* Custom colors */ },
      animation: { /* Custom animations */ }
    }
  }
}
```
**Purpose**: Tailwind CSS configuration with custom design tokens.

### **src/app/globals.css**
```css
@tailwind base;      # Base styles
@tailwind components; # Component styles  
@tailwind utilities;  # Utility classes
```
**Purpose**: Global CSS imports and custom styles.

---

## 🏠 **App Router Structure (Next.js 13+)**

### **src/app/layout.tsx** - Root Layout
```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* SEO Meta Tags */}
        {/* JSON-LD Structured Data */}
      </head>
      <body>
        <ThemeProvider>
          <div className="min-h-screen">
            {/* Global Background */}
            <div className="relative z-10">
              {children}  {/* Page content goes here */}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
```
**Purpose**: 
- Global HTML structure
- SEO metadata
- Theme provider wrapper
- Global background styling
- App-wide layout

### **src/app/page.tsx** - Home Page
```typescript
export default function Home() {
  const { theme, setTheme } = useTheme();
  const [activePattern, setActivePattern] = useState(null);

  return (
    <>
      <Navbar />
      <Hero />
      <GalleryShowcase 
        activePattern={activePattern}
        setActivePattern={setActivePattern}
        theme={theme}
      />
      <Footer />
    </>
  )
}
```
**Purpose**: 
- Main page component
- State management for theme and active portfolio
- Component composition

---

## 🧩 **Component Architecture**

### **📁 src/components/layout/** - Layout Components

#### **navbar.tsx**
```typescript
export function Navbar() {
  return (
    <nav className="sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <Logo />
        <ThemeToggle />
        <SupportDropdown />
      </div>
    </nav>
  )
}
```
**Purpose**: 
- Site navigation
- Logo display
- Theme toggle
- Support menu

#### **footer.tsx**
```typescript
export function Footer() {
  return (
    <footer className="border-t">
      <div className="text-center py-6">
        <p>© 2025 PortfolioGallery. All rights reserved.</p>
      </div>
    </footer>
  )
}
```
**Purpose**: 
- Site footer
- Copyright information
- Additional links

### **📁 src/components/home/** - Home Page Components

#### **hero.tsx**
```typescript
export function Hero() {
  return (
    <section className="text-center py-20">
      <h1>Portfolio Gallery</h1>
      <p>Browse curated developer portfolios</p>
      <div className="grid grid-cols-3 gap-4">
        <FeatureCard title="Live Previews" />
        <FeatureCard title="Source Code" />
        <FeatureCard title="Easy Sharing" />
      </div>
    </section>
  )
}
```
**Purpose**: 
- Hero section with main headline
- Feature highlights
- Call-to-action buttons

#### **support-dropdown.tsx**
```typescript
export function SupportDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Support</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => window.open(GITHUB_URL)}>
          <Star className="h-4 w-4" />
          Star Repository
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```
**Purpose**: 
- Support menu
- GitHub repository link
- Star repository functionality

---

## 🔄 **State Management**

### **📁 src/context/favourites-context.tsx** - Favorites System
```typescript
interface FavoritesContextType {
  favourites: string[];
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  clearFavourites: () => void;
}

export function FavoritesProvider({ children }) {
  const [favourites, setFavourites] = useState<string[]>([]);

  const toggleFavourite = (id: string) => {
    setFavourites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const isFavourite = (id: string) => favourites.includes(id);

  const clearFavourites = () => setFavourites([]);

  return (
    <FavoritesContext.Provider value={{ 
      favourites, 
      toggleFavourite, 
      isFavourite, 
      clearFavourites 
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}
```
**Purpose**: 
- Global favorites state
- Add/remove favorites
- Persist favorites across components

### **📁 src/hooks/useTheme.tsx** - Theme Management
```typescript
export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const updateThemeFromPattern = (activePattern: string | null, patterns: Portfolio[]) => {
    if (!activePattern) {
      setTheme("light");
      return;
    }

    const activePatternObj = patterns.find((p) => p.id === activePattern);
    if (!activePatternObj) {
      setTheme("light");
      return;
    }

    // Check if portfolio has dark theme indicators
    const background = activePatternObj.style?.background || "";
    const isDark = activePatternObj.id.startsWith("dark-") || 
                   background.includes("#0") || 
                   background.includes("#1");

    setTheme(isDark ? "dark" : "light");
  };

  return { theme, setTheme, updateThemeFromPattern };
}
```
**Purpose**: 
- Theme state management
- Auto-theme based on portfolio colors
- Light/dark mode switching

---

## 📊 **Data Layer**

### **📁 src/data/portfolios.ts** - Sample Portfolio Data
```typescript
export const gridPortfolios: Portfolio[] = [
  {
    id: "portfolio-1",
    name: "Modern E-commerce",
    category: "web-development",
    description: "A responsive e-commerce platform built with Next.js",
    thumbnailUrl: "https://example.com/thumb1.png",
    liveUrl: "https://example.com/demo",
    sourceUrl: "https://github.com/user/project",
    tags: ["Next.js", "React", "Tailwind CSS"],
    thumbnailFit: "cover",
    badge: "New"
  },
  // ... more portfolios
];
```
**Purpose**: 
- Sample portfolio data
- Testing and development
- Example structure

### **📁 src/data/categories.ts** - Category Definitions
```typescript
export const PATTERN_CATEGORIES = [
  { id: "all", label: "All Portfolios" },
  { id: "web-development", label: "Web Development" },
  { id: "mobile-apps", label: "Mobile Apps" },
  { id: "ui-ux-design", label: "UI/UX Design" },
  { id: "data-science", label: "Data Science & ML" },
  { id: "backend-devops", label: "Backend & DevOps" },
  { id: "agency", label: "Agency" },
  { id: "design-engineering", label: "Design Engineering" },
  { id: "indie-makers", label: "Indie Makers" },
  { id: "game-dev", label: "Game Dev" },
  { id: "student-junior", label: "Student/Junior" },
  { id: "content-writing", label: "Content & Writing" },
  { id: "favourites", label: "Favourites" }
];
```
**Purpose**: 
- Category definitions
- Navigation structure
- Filtering options

---

## 🛠️ **Utility Functions**

### **📁 src/lib/utils.ts** - Helper Functions
```typescript
export function searchPortfolios(
  portfolios: Portfolio[],
  activeTab: string,
  searchInput: string
): Portfolio[] {
  if (searchInput === "") return portfolios;

  const searchTerm = searchInput.toLowerCase();
  
  return portfolios.filter((portfolio) => {
    const matchesName = portfolio.name.toLowerCase().includes(searchTerm);
    const matchesCategory = portfolio.category.toLowerCase().includes(searchTerm);
    const matchesTags = portfolio.tags?.some(tag => 
      tag.toLowerCase().includes(searchTerm)
    );
    
    return matchesName || matchesCategory || matchesTags;
  });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
```
**Purpose**: 
- Search functionality
- Class name utilities
- Common helper functions

### **📁 src/lib/constants.ts** - App Constants
```typescript
export const APP_CONFIG = {
  GITHUB_URL: "https://github.com/HassanXTech/portfolio-gallery",
  CONTRIBUTING_URL: "https://github.com/HassanXTech/portfolio-gallery/blob/main/CONTRIBUTING.md",
  SITE_NAME: "Portfolio Gallery",
  SITE_DESCRIPTION: "Curated developer portfolios with live previews"
};

export const THEME_CONFIG = {
  light: "light",
  dark: "dark"
};
```
**Purpose**: 
- Application constants
- Configuration values
- Centralized settings

---

## 📝 **Type Definitions**

### **📁 src/types/portfolio.ts** - Portfolio Interface
```typescript
export interface Portfolio {
  id: string;
  name: string;
  category: CategoryId;
  description?: string;
  badge?: "New" | " ";
  thumbnailUrl?: string;
  liveUrl?: string;
  sourceUrl?: string;
  tags?: string[];
  thumbnailFit?: "contain" | "cover";
  style?: CSSProperties; // Optional CSS styles
}

export type CategoryId = 
  | "all"
  | "web-development"
  | "mobile-apps"
  | "ui-ux-design"
  | "data-science"
  | "backend-devops"
  | "agency"
  | "design-engineering"
  | "indie-makers"
  | "game-dev"
  | "student-junior"
  | "content-writing"
  | "favourites";
```
**Purpose**: 
- Type safety
- Interface definitions
- Category type definitions

---

## 🔄 **Data Flow & Component Communication**

### **1. State Management Flow**
```
User Action → Component → Hook/Context → State Update → UI Re-render
```

**Example: Adding to Favorites**
1. User clicks star button in `PortfolioCard`
2. `PortfolioCard` calls `toggleFavourite(id)` from context
3. `FavoritesContext` updates `favourites` state
4. All components using favorites re-render
5. UI shows updated favorite state

### **2. Component Hierarchy**
```
Home (page.tsx)
├── Navbar
├── Hero
├── GalleryShowcase
│   ├── Category Tabs (with carousel)
│   ├── SearchBar
│   ├── PortfolioGrid
│   │   └── PortfolioCard (multiple)
│   └── PortfolioModal
└── Footer
```

### **3. Props Flow**
```
Home → GalleryShowcase: theme, activePattern, setActivePattern
GalleryShowcase → PortfolioGrid: patterns, theme, onOpenDetails
PortfolioGrid → PortfolioCard: pattern, theme, onOpenDetails
PortfolioCard → onClick → onOpenDetails → GalleryShowcase → PortfolioModal
```

---

## 🎯 **Key Features & How They Work**

### **1. Category Carousel**
- **Implementation**: Horizontal scrollable tabs with navigation arrows
- **State**: `canPrev`, `canNext` for arrow visibility
- **Logic**: `updateScrollState()` monitors scroll position
- **Navigation**: `goPrev()`, `goNext()` with smooth scrolling

### **2. Search Functionality**
- **Implementation**: Debounced search input
- **Filtering**: By name, category, and tags
- **State**: `searchInput` in `GalleryShowcase`
- **Real-time**: Updates as user types

### **3. Favorites System**
- **Implementation**: React Context for global state
- **Storage**: In-memory (can be extended to localStorage)
- **UI**: Star icons with filled/unfilled states
- **Persistence**: Survives component re-renders

### **4. Theme System**
- **Implementation**: `useTheme` hook with auto-detection
- **Auto-theme**: Based on portfolio color schemes
- **Manual toggle**: User can override auto-detection
- **Context**: Available throughout the app

### **5. Modal System**
- **Implementation**: Conditional rendering with state
- **Dual View**: Thumbnail vs Live Preview toggle
- **Iframe**: Live website preview with fallback
- **Loading**: 5-second timeout for iframe loading

---

## 🚀 **Performance Optimizations**

### **1. React.memo & useMemo**
- Category filtering memoized
- Search results cached
- Component re-renders minimized

### **2. Debounced Search**
- 300ms delay prevents excessive API calls
- Smooth user experience
- Reduced unnecessary filtering

### **3. Image Optimization**
- Next.js Image component for thumbnails
- External image host configuration
- Lazy loading for iframes

### **4. State Management**
- Local state for UI interactions
- Context for global state (favorites, theme)
- Minimal prop drilling

---

## 🔧 **Development Workflow**

### **1. Adding New Portfolios**
1. Add data to `src/data/portfolios.ts`
2. Ensure category exists in `src/data/categories.ts`
3. Add thumbnail image to public folder or external host
4. Test in development

### **2. Adding New Categories**
1. Update `src/data/categories.ts`
2. Add category ID to `CategoryId` type
3. Update any category-specific logic
4. Test navigation and filtering

### **3. Modifying Components**
1. Update component logic
2. Ensure TypeScript types match
3. Test component isolation
4. Test integration with parent components

---

## 📚 **Learning Points**

### **1. React Patterns**
- **Custom Hooks**: `useTheme`, `useFavorites`
- **Context API**: Global state management
- **Component Composition**: Building complex UIs from simple parts
- **State Lifting**: Managing state at appropriate levels

### **2. Next.js Features**
- **App Router**: File-based routing
- **Image Optimization**: Automatic image handling
- **TypeScript Integration**: Full type safety
- **Build Optimization**: Automatic code splitting

### **3. UI/UX Patterns**
- **Modal Systems**: Overlay dialogs
- **Carousel Navigation**: Horizontal scrolling
- **Search & Filtering**: Real-time data filtering
- **Responsive Design**: Mobile-first approach

### **4. Performance Concepts**
- **Debouncing**: Preventing excessive function calls
- **Memoization**: Caching expensive calculations
- **State Management**: Efficient state updates
- **Component Optimization**: Reducing unnecessary re-renders

---

## 🎓 **Next Steps for Learning**

### **1. Understanding the Code**
- Read through components in order of complexity
- Follow the data flow from user action to UI update
- Experiment with modifying component props and state

### **2. Adding Features**
- Implement localStorage for favorites persistence
- Add portfolio submission form
- Implement user authentication
- Add portfolio rating system

### **3. Advanced Concepts**
- Implement virtual scrolling for large lists
- Add real-time collaboration features
- Implement PWA capabilities
- Add analytics and performance monitoring

---

## 🔍 **How Components Work Together**

### **Portfolio Display Flow**
1. **Home Page** loads and renders `GalleryShowcase`
2. **GalleryShowcase** fetches portfolios and manages state
3. **Category Tabs** filter portfolios by category
4. **Search Bar** filters portfolios by search term
5. **PortfolioGrid** renders filtered portfolios as cards
6. **PortfolioCard** displays individual portfolio with thumbnail
7. **Click on Card** opens `PortfolioModal`
8. **PortfolioModal** shows detailed view with live preview

### **State Management Flow**
1. **Favorites**: Stored in React Context, accessible everywhere
2. **Theme**: Managed by `useTheme` hook, affects entire app
3. **Search**: Local state in `GalleryShowcase`, filters data
4. **Modal**: Local state for open/close and current item
5. **Categories**: Local state for active tab selection

### **Data Flow**
1. **Static Data**: Portfolios and categories from data files
2. **Filtering**: Search and category filters applied to data
3. **Rendering**: Filtered data passed to grid components
4. **Interactions**: User actions trigger state updates
5. **UI Updates**: Components re-render with new state

---

*This guide covers the complete architecture of PortfolioGallery. Use it to understand how each piece fits together and how to extend the application with new features.*
