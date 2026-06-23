import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  BookOpen, 
  Star, 
  PlusSquare, 
  Database, 
  X, 
  Folder,
  ChevronRight
} from "lucide-react";
import { Course, Video } from "../types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onNavigate: (view: "feed" | "watch" | "add" | "courses" | "backup", id?: string | null) => void;
  videos: Video[];
  courses: Course[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectCourse: (courseId: string) => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  currentView,
  onNavigate,
  videos,
  courses,
  activeCategory,
  onSelectCategory,
  onSelectCourse
}: SidebarProps) {
  // Get unique categories from videos
  const categories = ["All", "Recent", "Old", ...Array.from(
    new Set(videos.map((v) => v.category))
  ).filter((cat) => cat !== "Recent" && cat !== "Old" && cat.trim() !== "")];

  const menuItems = [
    { id: "feed", label: "Home Feed", icon: Home },
    { id: "courses", label: "Courses (Playlists)", icon: BookOpen },
    { id: "favorites", label: "Favorites", icon: Star },
    { id: "add", label: "Add Video", icon: PlusSquare },
    { id: "backup", label: "Backup & Restore", icon: Database },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            id="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Left Slidebar */}
          <motion.div
            id="sidebar-container"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 bottom-0 left-0 w-80 bg-bg-card border-r border-border-custom shadow-2xl z-50 flex flex-col h-full text-text-main"
          >
            {/* Header */}
            <div className="p-4 border-b border-border-custom flex justify-between items-center bg-neutral-50/20 dark:bg-neutral-900/40">
              <div className="flex items-center gap-2">
                <div className="bg-red-600 p-1.5 rounded-lg flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 .6-.03 1.29-.1 2.09-.06.8-.15 1.43-.28 1.9-.13.47-.4.85-.8 1.13-.4.28-.9.46-1.51.53-1.09.12-2.69.18-4.8.18s-3.71-.06-4.8-.18c-.61-.07-1.11-.25-1.51-.53-.4-.28-.67-.66-.8-1.13-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L7.5 12c0-.6.03-1.29.1-2.09.06-.8.15-1.43.28-1.9.13-.47.4-.85.8-1.13.4-.28.9-.46 1.51-.53 1.09-.12 2.69-.18 4.8-.18s3.71.06 4.8.18c.61.07 1.11.25 1.51.53.4.28.67.66.8 1.13" />
                  </svg>
                </div>
                <span className="font-bold text-xl tracking-tighter text-text-main">
                  ZEDISTRA
                </span>
              </div>
              <button
                id="close-sidebar-btn"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-150"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-text-main" strokeWidth={2} />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
              {/* Standard Website Navigation */}
              <div>
                <h3 className="px-3 text-xs font-semibold text-text-sub uppercase tracking-wider mb-2">
                  Navigation
                </h3>
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = 
                      (item.id === "feed" && currentView === "feed") ||
                      (item.id === "courses" && currentView === "courses") ||
                      (item.id === "add" && currentView === "add") ||
                      (item.id === "backup" && currentView === "backup") ||
                      (item.id === "favorites" && currentView === "feed" && activeCategory === "Favorites");

                    return (
                      <button
                        key={item.id}
                        id={`sidebar-nav-${item.id}`}
                        onClick={() => {
                          onClose();
                          if (item.id === "favorites") {
                            onSelectCategory("Favorites");
                            onNavigate("feed");
                          } else {
                            if (activeCategory === "Favorites") {
                              onSelectCategory("All");
                            }
                            onNavigate(item.id as any);
                          }
                        }}
                        className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                          isActive
                            ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-semibold shadow-sm"
                            : "text-text-sub hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-text-main"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? "text-red-600 dark:text-red-400" : "text-text-sub"}`} strokeWidth={1.8} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Categories Section */}
              <div>
                <h3 className="px-3 text-xs font-semibold text-text-sub uppercase tracking-wider mb-2 flex items-center">
                  <Folder className="w-3.5 h-3.5 mr-1" strokeWidth={1.8} />
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((cat) => {
                    const isCatActive = activeCategory === cat && currentView === "feed";
                    return (
                      <button
                        key={cat}
                        id={`sidebar-cat-${cat}`}
                        onClick={() => {
                          onClose();
                          onSelectCategory(cat);
                          onNavigate("feed");
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors duration-150 ${
                          isCatActive
                            ? "bg-neutral-100 dark:bg-neutral-800 text-text-main font-semibold"
                            : "text-text-sub hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                        }`}
                      >
                        <span className="truncate">{cat}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-40" strokeWidth={1.8} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Courses Section */}
              {courses.length > 0 && (
                <div>
                  <h3 className="px-3 text-xs font-semibold text-text-sub uppercase tracking-wider mb-2 flex items-center">
                    <BookOpen className="w-3.5 h-3.5 mr-1" strokeWidth={1.8} />
                    Active Courses
                  </h3>
                  <div className="space-y-1">
                    {courses.map((course) => (
                      <button
                        key={course.id}
                        id={`sidebar-course-${course.id}`}
                        onClick={() => {
                          onClose();
                          onSelectCourse(course.id);
                          onNavigate("courses");
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm text-text-sub hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-150"
                      >
                        <span className="truncate">{course.name}</span>
                        <span className="text-xs text-text-sub bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded-md flex-shrink-0">
                          {course.videoIds.length} vids
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Copyright */}
            <div className="p-4 border-t border-border-custom bg-neutral-50/50 dark:bg-neutral-900/20 text-xs text-text-sub space-y-1">
              <p>© 2026 ZEDISTRA. Premium Polished Design.</p>
              <p>Saved locally with precision.</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
