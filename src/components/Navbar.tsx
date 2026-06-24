import React, { useState, useEffect } from "react";
import { 
  Menu, 
  Search, 
  Video as VideoIcon, 
  MoreVertical, 
  Sun, 
  Moon, 
  BookOpen, 
  Database,
  Star,
  RefreshCw,
  ArrowLeft,
  X
} from "lucide-react";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  theme: "white" | "red";
  onToggleTheme: () => void;
  onOpenSidebar: () => void;
  onNavigate: (view: "feed" | "watch" | "add" | "courses" | "backup", id?: string | null) => void;
  onResetCategory: () => void;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  theme,
  onToggleTheme,
  onOpenSidebar,
  onNavigate,
  onResetCategory
}: NavbarProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Keep local search value in sync if searchQuery resets from outside
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearch);
    setIsMobileSearchOpen(false);
    onNavigate("feed");
  };

  const handleLogoClick = () => {
    setLocalSearch("");
    onSearchChange("");
    onResetCategory();
    onNavigate("feed");
  };

  if (isMobileSearchOpen) {
    return (
      <header className="sticky top-0 z-40 w-full bg-bg-navbar border-b border-border-custom transition-colors duration-200">
        <div className="mx-auto flex h-14 items-center px-4 gap-2">
          {/* Back button to exit search mode */}
          <button
            id="mobile-search-back-btn"
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-text-main transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Expanded mobile search form */}
          <form 
            id="search-form-mobile"
            onSubmit={handleSearchSubmit} 
            className="flex-1 flex items-center"
          >
            <div className="flex w-full relative">
              <input
                id="search-input-mobile"
                type="text"
                placeholder="Search lectures..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full px-4 py-1.5 pr-10 border border-border-custom bg-neutral-50 dark:bg-neutral-900 rounded-full focus:outline-none focus:border-red-600 dark:focus:border-red-500 shadow-inner text-text-main text-sm transition-all"
                autoFocus
              />
              {localSearch && (
                <button
                  id="search-clear-btn-mobile"
                  type="button"
                  onClick={() => {
                    setLocalSearch("");
                    onSearchChange("");
                  }}
                  className="absolute right-10 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-neutral-600 focus:outline-none cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                id="search-submit-btn-mobile"
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-3 bg-transparent hover:text-red-600 text-text-sub flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Submit Search"
              >
                <Search className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </form>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-bg-navbar border-b border-border-custom transition-colors duration-200">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <button
            id="sidebar-toggle-hamburger"
            onClick={onOpenSidebar}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-text-main flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" strokeWidth={2} />
          </button>

          <button
            id="logo-brand-btn"
            onClick={handleLogoClick}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer focus:outline-none"
          >
            <div className="bg-red-600 p-1.5 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 .6-.03 1.29-.1 2.09-.06.8-.15 1.43-.28 1.9-.13.47-.4.85-.8 1.13-.4.28-.9.46-1.51.53-1.09.12-2.69.18-4.8.18s-3.71-.06-4.8-.18c-.61-.07-1.11-.25-1.51-.53-.4-.28-.67-.66-.8-1.13-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L7.5 12c0-.6.03-1.29.1-2.09.06-.8.15-1.43.28-1.9.13-.47.4-.85.8-1.13.4-.28.9-.46 1.51-.53 1.09-.12 2.69-.18 4.8-.18s3.71.06 4.8.18c.61.07 1.11.25 1.51.53.4.28.67.66.8 1.13" />
              </svg>
            </div>
            <span className="font-bold text-base sm:text-lg md:text-xl tracking-tighter text-text-main hidden min-[360px]:inline-block">
              ZEDISTRA
            </span>
          </button>
        </div>

        {/* Center Side: Robust Search Bar (Hidden on Mobile, shown on MD and up) */}
        <form 
          id="search-form"
          onSubmit={handleSearchSubmit} 
          className="hidden md:flex flex-1 max-w-xl mx-4 items-center"
        >
          <div className="flex w-full relative">
            <input
              id="search-input"
              type="text"
              placeholder="Search by title, category, description, channel..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full px-4 py-2 pr-16 border border-border-custom bg-neutral-50 dark:bg-neutral-900 rounded-l-full focus:outline-none focus:border-red-600 dark:focus:border-red-500 shadow-inner text-text-main text-sm transition-all"
            />
            {localSearch && (
              <button
                id="search-clear-btn"
                type="button"
                onClick={() => {
                  setLocalSearch("");
                  onSearchChange("");
                }}
                className="absolute right-16 top-1/2 -translate-y-1/2 p-1.5 text-xs text-neutral-400 hover:text-neutral-600 focus:outline-none cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              id="search-submit-btn"
              type="submit"
              className="px-6 py-2 bg-neutral-100 dark:bg-neutral-800 border border-l-0 border-border-custom rounded-r-full hover:bg-neutral-200 dark:hover:bg-neutral-700 text-text-sub flex items-center justify-center cursor-pointer transition-colors flex-shrink-0"
              aria-label="Search"
            >
              <Search className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </form>

        {/* Right Side: Quick Action Bar */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          
          {/* Mobile-only Search Button */}
          <button
            id="nav-mobile-search-trigger"
            onClick={() => setIsMobileSearchOpen(true)}
            className="flex md:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-text-main transition-colors cursor-pointer items-center justify-center"
            aria-label="Open mobile search"
          >
            <Search className="w-5 h-5" strokeWidth={1.8} />
          </button>

          {/* Create Video Option ("Add Video") */}
          <button
            id="nav-add-video-btn"
            onClick={() => onNavigate("add")}
            className="flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-text-main rounded-full font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            aria-label="Add Video"
          >
            <VideoIcon className="w-4 h-4 text-red-600 flex-shrink-0" strokeWidth={2} />
            <span className="hidden sm:inline">Add Video</span>
          </button>

          {/* Courses List */}
          <button
            id="nav-courses-btn"
            onClick={() => onNavigate("courses")}
            className="hidden sm:flex p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-text-main transition-colors cursor-pointer relative group items-center justify-center"
            aria-label="Courses & Playlists"
          >
            <BookOpen className="w-5 h-5" strokeWidth={1.8} />
            <span className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-neutral-900 text-white text-[10px] py-1 px-1.5 rounded whitespace-nowrap shadow-md z-50">
              Courses
            </span>
          </button>

          {/* Favorites Filter */}
          <button
            id="nav-favorites-btn"
            onClick={() => {
              onResetCategory();
              onSearchChange("");
              onNavigate("feed");
              setTimeout(() => {
                const favoritesBtn = document.getElementById("sidebar-nav-favorites");
                if (favoritesBtn) favoritesBtn.click();
              }, 50);
            }}
            className="hidden sm:flex p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-text-main transition-colors cursor-pointer relative group items-center justify-center"
            aria-label="Favorites"
          >
            <Star className="w-5 h-5" strokeWidth={1.8} />
            <span className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-neutral-900 text-white text-[10px] py-1 px-1.5 rounded whitespace-nowrap shadow-md z-50">
              Favorites
            </span>
          </button>

          {/* Backup Database */}
          <button
            id="nav-backup-btn"
            onClick={() => onNavigate("backup")}
            className="hidden sm:flex p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-text-main transition-colors cursor-pointer relative group items-center justify-center"
            aria-label="Backup"
          >
            <Database className="w-5 h-5" strokeWidth={1.8} />
            <span className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-neutral-900 text-white text-[10px] py-1 px-1.5 rounded whitespace-nowrap shadow-md z-50">
              Backup & Sync
            </span>
          </button>

          {/* Theme Toggle: Sun / Moon */}
          <button
            id="nav-theme-toggle-btn"
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-text-main transition-colors cursor-pointer relative group flex items-center justify-center animate-in fade-in"
            aria-label="Toggle Theme"
          >
            {theme === "white" ? (
              <Moon className="w-5 h-5" strokeWidth={1.8} />
            ) : (
              <Sun className="w-5 h-5" strokeWidth={1.8} />
            )}
            <span className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-neutral-900 text-white text-[10px] py-1 px-1.5 rounded whitespace-nowrap shadow-md z-50">
              {theme === "white" ? "Red Theme" : "White Theme"}
            </span>
          </button>

          {/* Separator */}
          <div className="h-6 w-[1px] bg-border-custom hidden sm:block" />

          {/* 3-Dot Icon on Top Right to Open Left Slidebar */}
          <button
            id="sidebar-toggle-dot"
            onClick={onOpenSidebar}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-text-main transition-colors cursor-pointer relative group flex items-center justify-center"
            aria-label="Open sidebar drawer"
          >
            <MoreVertical className="w-5 h-5" strokeWidth={1.8} />
            <span className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-neutral-900 text-white text-[10px] py-1 px-1.5 rounded whitespace-nowrap shadow-md z-50">
              Drawer Menu
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}

