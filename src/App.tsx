import React, { useState, useEffect, useCallback } from "react";
import { 
  Plus, 
  FolderPlus, 
  X, 
  Sparkles, 
  ListRestart, 
  Play, 
  Compass,
  Star,
  RefreshCw
} from "lucide-react";

import { Video, Comment, Course, UserProfile } from "./types";
import { getInitialVideos, getInitialCourses, getInitialComments } from "./data/seedData";
import { processCategoryAging } from "./utils/videoUtils";
import { searchAndRankVideos } from "./utils/searchUtils";

// Custom Components
import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import VideoCard from "./components/VideoCard.tsx";
import WatchPage from "./components/WatchPage.tsx";
import AddVideoForm from "./components/AddVideoForm.tsx";
import CourseSection from "./components/CourseSection.tsx";
import BackupSection from "./components/BackupSection.tsx";

export default function App() {
  // --- CORE STATE STORAGE ---
  const [videos, setVideos] = useState<Video[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  
  // User Profile Preferences
  const [username, setUsername] = useState("");
  const [likedVideoIds, setLikedVideoIds] = useState<string[]>([]);
  const [favoriteVideoIds, setFavoriteVideoIds] = useState<string[]>([]);
  
  // Theme Toggle: 'white' (light) or 'red' (dark crimson red)
  const [theme, setTheme] = useState<"white" | "red">("white");

  // --- VIEW STATE NAVIGATION ---
  const [currentView, setCurrentView] = useState<"feed" | "watch" | "add" | "courses" | "backup">("feed");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  // Controls opening of the watching page inline editor directly from feed dropdown click
  const [startEditingOnWatch, setStartEditingOnWatch] = useState(false);

  // --- FILTERS & INTERFACES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Inline category creator state on home feed
  const [showFeedCategoryInput, setShowFeedCategoryInput] = useState(false);
  const [feedCategoryName, setFeedCategoryName] = useState("");
  const [customEmptyCategories, setCustomEmptyCategories] = useState<string[]>([]);

  // --- MOUNT INITIALIZATION & AUTO SEEDING ---
  useEffect(() => {
    // Safe parsing wrapper helpers
    const safeParse = <T,>(str: string | null, fallback: T): T => {
      if (!str) return fallback;
      try {
        return JSON.parse(str) as T;
      } catch (err) {
        console.error("Corrupted local storage JSON found:", err);
        return fallback;
      }
    };

    // 1. Initialize Username & Profile lists
    const storedUsername = localStorage.getItem("zedistra_username") || "";
    const storedLikes = localStorage.getItem("zedistra_liked_video_ids");
    const storedFavs = localStorage.getItem("zedistra_favorite_video_ids");
    const storedTheme = localStorage.getItem("zedistra_theme") as "white" | "red" || "white";

    setUsername(storedUsername);
    setTheme(storedTheme);
    if (storedLikes) setLikedVideoIds(safeParse(storedLikes, []));
    if (storedFavs) setFavoriteVideoIds(safeParse(storedFavs, []));

    // Apply initial theme class to HTML element
    document.documentElement.className = storedTheme === "white" ? "theme-white" : "theme-red";

    // 2. Load Core Data or Seed safely
    const storedVideos = localStorage.getItem("zedistra_videos");
    const storedCourses = localStorage.getItem("zedistra_courses");
    const storedComments = localStorage.getItem("zedistra_comments");

    let loadedVideos: Video[] = [];
    let loadedCourses: Course[] = [];
    let loadedComments: Comment[] = [];

    if (storedVideos !== null) {
      loadedVideos = safeParse(storedVideos, []);
    } else {
      loadedVideos = getInitialVideos();
      localStorage.setItem("zedistra_videos", JSON.stringify(loadedVideos));
    }

    if (storedCourses !== null) {
      loadedCourses = safeParse(storedCourses, []);
    } else {
      loadedCourses = getInitialCourses();
      localStorage.setItem("zedistra_courses", JSON.stringify(loadedCourses));
    }

    if (storedComments !== null) {
      loadedComments = safeParse(storedComments, []);
    } else {
      loadedComments = getInitialComments();
      localStorage.setItem("zedistra_comments", JSON.stringify(loadedComments));
    }

    // Load any custom empty categories
    const storedCustomCats = localStorage.getItem("zedistra_custom_empty_cats");
    if (storedCustomCats) {
      setCustomEmptyCategories(safeParse(storedCustomCats, []));
    }

    // 3. Process Category Expiration Rules Immediately ("Recent" to "Old" after 3 hours)
    const { updatedVideos, hasChanges } = processCategoryAging(loadedVideos);
    if (hasChanges) {
      setVideos(updatedVideos);
      localStorage.setItem("zedistra_videos", JSON.stringify(updatedVideos));
    } else {
      setVideos(loadedVideos);
    }

    setCourses(loadedCourses);
    setComments(loadedComments);
  }, []);

  // --- BACKGROUND TIME TIMER (Checks aging of Recent videos every 30 seconds) ---
  useEffect(() => {
    const timer = setInterval(() => {
      if (videos.length === 0) return;
      const { updatedVideos, hasChanges } = processCategoryAging(videos);
      if (hasChanges) {
        setVideos(updatedVideos);
        localStorage.setItem("zedistra_videos", JSON.stringify(updatedVideos));
      }
    }, 30000); // 30 seconds

    return () => clearInterval(timer);
  }, [videos]);

  // --- SYNCHRONIZE STATE TO STORAGE HANDLERS ---
  const saveVideos = (newVideos: Video[]) => {
    setVideos(newVideos);
    localStorage.setItem("zedistra_videos", JSON.stringify(newVideos));
  };

  const saveCourses = (newCourses: Course[]) => {
    setCourses(newCourses);
    localStorage.setItem("zedistra_courses", JSON.stringify(newCourses));
  };

  const saveComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem("zedistra_comments", JSON.stringify(newComments));
  };

  const handleSetUsername = (name: string) => {
    setUsername(name);
    localStorage.setItem("zedistra_username", name);
  };

  // --- ACTIONS HANDLERS ---
  
  // Theme Switcher
  const handleToggleTheme = () => {
    const nextTheme = theme === "white" ? "red" : "white";
    setTheme(nextTheme);
    localStorage.setItem("zedistra_theme", nextTheme);
    document.documentElement.className = nextTheme === "white" ? "theme-white" : "theme-red";
  };

  // Like Toggle
  const handleToggleLike = (videoId: string) => {
    let newLikesList = [...likedVideoIds];
    const isAlreadyLiked = newLikesList.includes(videoId);

    if (isAlreadyLiked) {
      newLikesList = newLikesList.filter((id) => id !== videoId);
    } else {
      newLikesList.push(videoId);
    }

    setLikedVideoIds(newLikesList);
    localStorage.setItem("zedistra_liked_video_ids", JSON.stringify(newLikesList));

    // Update video likes counter
    const updatedVideos = videos.map((v) => {
      if (v.id === videoId) {
        return {
          ...v,
          likes: isAlreadyLiked ? Math.max(0, v.likes - 1) : v.likes + 1
        };
      }
      return v;
    });
    saveVideos(updatedVideos);
  };

  // Favorite Toggle
  const handleToggleFavorite = (videoId: string) => {
    let newFavsList = [...favoriteVideoIds];
    if (newFavsList.includes(videoId)) {
      newFavsList = newFavsList.filter((id) => id !== videoId);
    } else {
      newFavsList.push(videoId);
    }
    setFavoriteVideoIds(newFavsList);
    localStorage.setItem("zedistra_favorite_video_ids", JSON.stringify(newFavsList));
  };

  // Video Deletion
  const handleDeleteVideo = (videoId: string) => {
    // 1. Remove from video list
    const updatedVideos = videos.filter((v) => v.id !== videoId);
    saveVideos(updatedVideos);

    // 2. Remove comments associated
    const updatedComments = comments.filter((c) => c.videoId !== videoId);
    saveComments(updatedComments);

    // 3. Remove from any course list
    const updatedCourses = courses.map((c) => ({
      ...c,
      videoIds: c.videoIds.filter((id) => id !== videoId)
    }));
    saveCourses(updatedCourses);

    // 4. Remove from user profiles likes/favorites
    setLikedVideoIds((prev) => prev.filter((id) => id !== videoId));
    setFavoriteVideoIds((prev) => prev.filter((id) => id !== videoId));

    if (selectedVideoId === videoId) {
      setSelectedVideoId(null);
      setCurrentView("feed");
    }
  };

  // Video Update Title/Description/Category details
  const handleEditVideoDetails = (editedVideo: Video) => {
    const updatedVideos = videos.map((v) => {
      if (v.id === editedVideo.id) {
        return {
          ...v,
          title: editedVideo.title,
          description: editedVideo.description,
          category: editedVideo.category ?? v.category,
          originalCategory: editedVideo.originalCategory ?? v.originalCategory,
          duration: editedVideo.duration ?? v.duration
        };
      }
      return v;
    });
    saveVideos(updatedVideos);
  };

  const handleUpdateVideoCategory = (videoId: string, newCategory: string) => {
    const updatedVideos = videos.map((v) => {
      if (v.id === videoId) {
        return {
          ...v,
          category: newCategory,
          originalCategory: newCategory
        };
      }
      return v;
    });
    saveVideos(updatedVideos);
  };

  const handleAddCustomCategory = (categoryName: string) => {
    const cleanName = categoryName.trim();
    if (cleanName) {
      const list = getDynamicCategoryChips();
      if (!list.includes(cleanName)) {
        const updatedCats = [...customEmptyCategories, cleanName];
        setCustomEmptyCategories(updatedCats);
        localStorage.setItem("zedistra_custom_empty_cats", JSON.stringify(updatedCats));
      }
    }
  };

  // Triggering watch page edit details form directly from Feed
  const handleTriggerEditVideoFromFeed = (video: Video) => {
    setSelectedVideoId(video.id);
    setStartEditingOnWatch(true);
    setCurrentView("watch");
  };

  // Add Comment
  const handleAddComment = (videoId: string, text: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      videoId,
      username,
      text,
      createdAt: Date.now()
    };
    saveComments([...comments, newComment]);
  };

  // Edit Comment
  const handleEditComment = (commentId: string, newText: string) => {
    const updatedComments = comments.map((c) => {
      if (c.id === commentId) {
        return { ...c, text: newText };
      }
      return c;
    });
    saveComments(updatedComments);
  };

  // Delete Comment
  const handleDeleteComment = (commentId: string) => {
    const updatedComments = comments.filter((c) => c.id !== commentId);
    saveComments(updatedComments);
  };

  // Course Creation
  const handleCreateCourse = (name: string, description: string) => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      name,
      description,
      videoIds: [],
      createdAt: Date.now()
    };
    saveCourses([...courses, newCourse]);
  };

  // Delete Course Shell
  const handleDeleteCourse = (courseId: string) => {
    const updatedCourses = courses.filter((c) => c.id !== courseId);
    saveCourses(updatedCourses);
    if (selectedCourseId === courseId) {
      setSelectedCourseId(null);
    }
  };

  // Add Video to Course Playlist
  const handleAddVideoToCourse = (courseId: string, videoId: string) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        // Prevent duplicate entries in playlist
        if (course.videoIds.includes(videoId)) return course;
        return {
          ...course,
          videoIds: [...course.videoIds, videoId]
        };
      }
      return course;
    });
    saveCourses(updatedCourses);
  };

  // Create new course and immediately embed current video
  const handleCreateCourseWithVideo = (courseName: string, videoId: string) => {
    const newCourseId = `course-${Date.now()}`;
    const newCourse: Course = {
      id: newCourseId,
      name: courseName,
      description: `Course syllabus featuring lecture items including ${videos.find(v => v.id === videoId)?.title || "lessons"}.`,
      videoIds: [videoId],
      createdAt: Date.now()
    };
    saveCourses([...courses, newCourse]);
  };

  // Remove lecture video from course syllabus
  const handleRemoveVideoFromCourse = (courseId: string, videoId: string) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          videoIds: course.videoIds.filter((id) => id !== videoId)
        };
      }
      return course;
    });
    saveCourses(updatedCourses);
  };

  // Publish / Upload Video Creator flow
  const handleAddVideo = (
    videoData: Omit<Video, "id" | "createdAt" | "likes">, 
    courseId?: string, 
    newCourseName?: string
  ) => {
    const newVideoId = `video-${Date.now()}`;
    const newVideo: Video = {
      ...videoData,
      id: newVideoId,
      createdAt: Date.now(),
      likes: 0
    };

    const nextVideos = [newVideo, ...videos];
    saveVideos(nextVideos);

    // If adding directly to a course
    if (courseId) {
      handleAddVideoToCourse(courseId, newVideoId);
    } else if (newCourseName) {
      handleCreateCourseWithVideo(newCourseName, newVideoId);
    }
  };

  // --- BACKUP RESTORATIONS AND RAW SYNC RESET ---
  const handleRestoreData = (restored: {
    videos: Video[];
    comments: Comment[];
    courses: Course[];
    username: string;
  }) => {
    saveVideos(restored.videos);
    saveComments(restored.comments);
    saveCourses(restored.courses);
    if (restored.username) {
      setUsername(restored.username);
      localStorage.setItem("zedistra_username", restored.username);
    }
  };

  const handleResetToDefaults = () => {
    localStorage.clear();
    setVideos(getInitialVideos());
    setCourses(getInitialCourses());
    setComments(getInitialComments());
    setUsername("");
    setLikedVideoIds([]);
    setFavoriteVideoIds([]);
    setCustomEmptyCategories([]);
    setTheme("white");
    document.documentElement.className = "theme-white";
    setCurrentView("feed");
    setSelectedVideoId(null);
    setSelectedCourseId(null);
  };

  // --- VIEW ROUTER HELPER ---
  const handleNavigate = (view: typeof currentView, id: string | null = null) => {
    setCurrentView(view);
    if (view === "watch") {
      setSelectedVideoId(id);
      if (!id) setStartEditingOnWatch(false);
    } else if (view === "courses") {
      setSelectedCourseId(id);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- FILTERED VIDEOS GRID DERIVATIONS ---
  // Apply Search + Category chip filters
  const getFilteredVideos = () => {
    // 1. Search filter first
    let result = searchAndRankVideos(videos, searchQuery);

    // 2. Category filter
    if (activeCategory === "Favorites") {
      result = result.filter((v) => favoriteVideoIds.includes(v.id));
    } else if (activeCategory !== "All") {
      result = result.filter((v) => v.category === activeCategory);
    }

    return result;
  };

  // Get active rendering category chips list (dynamic tags row at the top)
  const getDynamicCategoryChips = () => {
    const list = ["All", "Recent", "Old", "Favorites"];
    
    // Extract other categories in use
    const activeCats = videos.map((v) => v.category);
    activeCats.forEach((cat) => {
      if (cat && !list.includes(cat)) {
        list.push(cat);
      }
    });

    // Add any empty categories created by user
    customEmptyCategories.forEach((cat) => {
      if (!list.includes(cat)) {
        list.push(cat);
      }
    });

    return list;
  };

  const handleCreateFeedCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = feedCategoryName.trim();
    if (cleanName) {
      const list = getDynamicCategoryChips();
      if (!list.includes(cleanName)) {
        const updatedCats = [...customEmptyCategories, cleanName];
        setCustomEmptyCategories(updatedCats);
        localStorage.setItem("zedistra_custom_empty_cats", JSON.stringify(updatedCats));
        setActiveCategory(cleanName);
      }
      setFeedCategoryName("");
      setShowFeedCategoryInput(false);
    }
  };

  const handleResetFiltersAndCategories = () => {
    setActiveCategory("All");
    setSearchQuery("");
  };

  const currentFilteredVideos = getFilteredVideos();
  const currentCategoryChips = getDynamicCategoryChips();

  return (
    <div className="min-h-screen flex flex-col bg-bg-app transition-colors duration-200">
      
      {/* 1. Header Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onNavigate={handleNavigate}
        onResetCategory={handleResetFiltersAndCategories}
      />

      {/* 2. Slide Drawer Sidebar navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onNavigate={handleNavigate}
        videos={videos}
        courses={courses}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onSelectCourse={setSelectedCourseId}
      />

      {/* 3. Main Stage Content Panel */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-20">
        
        {/* --- VIEW FEED HOME STAGE --- */}
        {currentView === "feed" && (
          <div className="space-y-6">
            
            {/* Category horizontal scrolling chip rows */}
            <div className="flex flex-wrap items-center gap-2 border-b border-border-custom pb-4 sticky top-14 bg-bg-app z-20 py-2">
              
              <div className="flex overflow-x-auto no-scrollbar py-1 space-x-2 flex-1 scroll-smooth">
                {currentCategoryChips.map((chip) => {
                  const isActive = activeCategory === chip;
                  return (
                    <button
                      key={chip}
                      id={`cat-chip-${chip}`}
                      onClick={() => setActiveCategory(chip)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all duration-150 ${
                        isActive
                          ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
                          : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-text-sub hover:text-text-main"
                      }`}
                    >
                      {chip === "Favorites" ? "★ Favorites" : chip}
                    </button>
                  );
                })}
              </div>

              {/* Quick Inline Add Category form toggle */}
              <div className="flex items-center flex-shrink-0">
                {!showFeedCategoryInput ? (
                  <button
                    id="feed-add-cat-btn"
                    onClick={() => setShowFeedCategoryInput(true)}
                    className="p-1.5 bg-bg-card hover:bg-neutral-100 border border-border-custom rounded-full cursor-pointer text-neutral-500 hover:text-red-600 transition-all flex items-center justify-center"
                    title="Add Custom Category Shell"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <form 
                    onSubmit={handleCreateFeedCategory} 
                    id="feed-add-cat-form"
                    className="flex items-center space-x-1.5 bg-bg-card border border-border-custom p-1 rounded-full shadow-inner animate-in slide-in-from-right-1 duration-100"
                  >
                    <input
                      id="feed-add-cat-input"
                      type="text"
                      placeholder="Category name..."
                      value={feedCategoryName}
                      onChange={(e) => setFeedCategoryName(e.target.value)}
                      className="px-2.5 py-0.5 text-xs focus:outline-none bg-transparent w-28 text-neutral-900"
                      required
                    />
                    <button
                      id="feed-add-cat-submit"
                      type="submit"
                      className="p-1 bg-red-600 text-white rounded-full cursor-pointer hover:bg-red-700 flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      id="feed-add-cat-cancel"
                      type="button"
                      onClick={() => setShowFeedCategoryInput(false)}
                      className="p-1 text-neutral-400 hover:text-neutral-600 rounded-full cursor-pointer flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Robust Search Feedbacks if searching */}
            {searchQuery && (
              <div id="search-feedback" className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-xs text-red-700 animate-in fade-in">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-red-500" />
                  <span>Showing search ranking results for: <strong className="font-bold text-neutral-900">"{searchQuery}"</strong> ({currentFilteredVideos.length} matched lectures)</span>
                </div>
                <button
                  id="search-feedback-reset"
                  onClick={() => setSearchQuery("")}
                  className="px-2 py-1 border border-red-300 hover:bg-red-100 text-[10px] font-bold rounded-md flex items-center space-x-1 cursor-pointer transition-colors"
                >
                  <ListRestart className="w-3 h-3" />
                  <span>Reset Search</span>
                </button>
              </div>
            )}

            {/* Video Cards Grid */}
            {currentFilteredVideos.length === 0 ? (
              <div id="feed-empty-state" className="p-16 text-center border border-dashed border-border-custom rounded-2xl bg-bg-card">
                <Compass className="w-12 h-12 text-neutral-300 mx-auto mb-3 animate-pulse" strokeWidth={1} />
                <h3 className="font-bold text-sm text-neutral-800">
                  {videos.length === 0 ? "Study Catalog is Empty" : "No Video Clips Cataloged"}
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-relaxed">
                  {videos.length === 0 
                    ? "Your local catalog is currently empty. You can restore the pre-loaded HSC test prep and calculator hack lectures with one click!"
                    : activeCategory === "Favorites" 
                      ? "You haven't saved any video items to your Favorites list yet. Click a video and star it to save!"
                      : "No lectures matched your search filters. Publish standard iframe files or create customized video files using the upload manager above."}
                </p>
                {videos.length === 0 ? (
                  <button
                    id="feed-restore-btn"
                    onClick={() => {
                      const initial = getInitialVideos();
                      setVideos(initial);
                      localStorage.setItem("zedistra_videos", JSON.stringify(initial));
                      setActiveCategory("All");
                    }}
                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restore Default Lectures</span>
                  </button>
                ) : (
                  activeCategory !== "All" && (
                    <button
                      id="feed-reset-cat-btn"
                      onClick={() => setActiveCategory("All")}
                      className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow hover:shadow-md transition-colors cursor-pointer"
                    >
                      Reset Categories
                    </button>
                  )
                )}
              </div>
            ) : (
              <div id="feed-videos-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-7">
                {currentFilteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    courses={courses}
                    favoriteVideoIds={favoriteVideoIds}
                    onPlayVideo={(id) => handleNavigate("watch", id)}
                    onEditVideo={handleTriggerEditVideoFromFeed}
                    onDeleteVideo={handleDeleteVideo}
                    onToggleFavorite={handleToggleFavorite}
                    onAddVideoToCourse={handleAddVideoToCourse}
                    onCreateCourseWithVideo={handleCreateCourseWithVideo}
                    allCategories={currentCategoryChips}
                    onUpdateVideoCategory={handleUpdateVideoCategory}
                    onAddCustomCategory={handleAddCustomCategory}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* --- VIEW WATCH PAGE WATCH STAGE --- */}
        {currentView === "watch" && selectedVideoId && (
          (() => {
            const activeVideo = videos.find((v) => v.id === selectedVideoId);
            if (!activeVideo) {
              return (
                <div className="text-center p-12 text-neutral-500 text-xs">
                  Error: Video clip has been deleted or cannot be found.
                </div>
              );
            }
            return (
              <WatchPage
                activeVideo={activeVideo}
                videos={videos}
                comments={comments}
                courses={courses}
                username={username}
                favoriteVideoIds={favoriteVideoIds}
                likedVideoIds={likedVideoIds}
                onSetUsername={handleSetUsername}
                onAddComment={handleAddComment}
                onEditComment={handleEditComment}
                onDeleteComment={handleDeleteComment}
                onToggleLike={handleToggleLike}
                onToggleFavorite={handleToggleFavorite}
                onPlayVideo={(id) => handleNavigate("watch", id)}
                onEditVideoDetails={handleEditVideoDetails}
                onDeleteVideo={handleDeleteVideo}
                onNavigate={handleNavigate}
              />
            );
          })()
        )}

        {/* --- VIEW ADD VIDEO FORM CREATOR STAGE --- */}
        {currentView === "add" && (
          <AddVideoForm
            videos={videos}
            courses={courses}
            onAddVideo={handleAddVideo}
            onNavigate={handleNavigate}
          />
        )}

        {/* --- VIEW COURSES ORGANIZER SYLLABUS STAGE --- */}
        {currentView === "courses" && (
          <CourseSection
            courses={courses}
            videos={videos}
            selectedCourseId={selectedCourseId}
            onSelectCourse={(id) => setSelectedCourseId(id)}
            onCreateCourse={handleCreateCourse}
            onDeleteCourse={handleDeleteCourse}
            onRemoveVideoFromCourse={handleRemoveVideoFromCourse}
            onPlayVideo={(id) => handleNavigate("watch", id)}
          />
        )}

        {/* --- VIEW DATABASE SYNC BACKUP STAGE --- */}
        {currentView === "backup" && (
          <BackupSection
            videos={videos}
            comments={comments}
            courses={courses}
            username={username}
            onRestoreData={handleRestoreData}
            onResetToDefaults={handleResetToDefaults}
          />
        )}

      </main>

    </div>
  );
}
