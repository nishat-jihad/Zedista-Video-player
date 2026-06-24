import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Send, 
  User,
  Clock,
  Link as LinkIcon,
  Check,
  Plus,
  FolderPlus,
  Tag
} from "lucide-react";
import { Video, Comment, Course } from "../types";
import { formatRelativeTime, extractYouTubeId, getChannelAvatarUrl } from "../utils/videoUtils";

interface WatchPageProps {
  activeVideo: Video;
  videos: Video[];
  comments: Comment[];
  courses: Course[];
  username: string;
  favoriteVideoIds: string[];
  likedVideoIds: string[];
  onSetUsername: (name: string) => void;
  onAddComment: (videoId: string, text: string) => void;
  onEditComment: (commentId: string, newText: string) => void;
  onDeleteComment: (commentId: string) => void;
  onToggleLike: (videoId: string) => void;
  onToggleFavorite: (videoId: string) => void;
  onPlayVideo: (videoId: string) => void;
  onEditVideoDetails: (video: Video) => void;
  onDeleteVideo: (videoId: string) => void;
  onNavigate: (view: "feed" | "watch" | "add" | "courses" | "backup", id?: string | null) => void;
}

export default function WatchPage({
  activeVideo,
  videos,
  comments,
  courses,
  username,
  favoriteVideoIds,
  likedVideoIds,
  onSetUsername,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onToggleLike,
  onToggleFavorite,
  onPlayVideo,
  onEditVideoDetails,
  onDeleteVideo,
  onNavigate
}: WatchPageProps) {
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTitle, setEditTitle] = useState(activeVideo.title);
  const [editDescription, setEditDescription] = useState(activeVideo.description);
  const [showAddToCourseMenu, setShowAddToCourseMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const isLiked = likedVideoIds.includes(activeVideo.id);
  const isFavorited = favoriteVideoIds.includes(activeVideo.id);
  const videoComments = comments.filter(c => c.videoId === activeVideo.id);
  const ytId = extractYouTubeId(activeVideo.embedCode);
  const isYoutube = !!ytId;

  // Memoize the iframe to prevent reset on re-renders
  const videoIframe = useMemo(() => {
    if (isYoutube) {
      return (
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            key={`${activeVideo.id}-${isLiked}-${isFavorited}`}
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
            title={activeVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-xl"
          />
        </div>
      );
    }
    return (
      <div 
        className="w-full rounded-xl overflow-hidden bg-neutral-900"
        dangerouslySetInnerHTML={{ __html: activeVideo.embedCode }}
      />
    );
  }, [activeVideo.id, activeVideo.embedCode, activeVideo.title, isLiked, isFavorited, ytId, isYoutube]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setShowAddToCourseMenu(false);
        setShowCategoryMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && username) {
      onAddComment(activeVideo.id, newComment.trim());
      setNewComment("");
    }
  };

  const handleStartEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.text);
  };

  const handleSaveEditComment = (commentId: string) => {
    if (editCommentText.trim()) {
      onEditComment(commentId, editCommentText.trim());
      setEditingCommentId(null);
      setEditCommentText("");
    }
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditCommentText("");
  };

  const handleSaveEditVideo = () => {
    if (editTitle.trim() && editDescription.trim()) {
      onEditVideoDetails({
        ...activeVideo,
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      setShowEditForm(false);
      setShowMenu(false);
    }
  };

  const handleAddToCourse = (courseId: string) => {
    // This would need a prop to add video to course - we'll use the existing mechanism
    // The parent App handles this via onAddVideoToCourse, but WatchPage doesn't have it directly
    // We'll use a workaround - navigate to feed and use the course section
    // Or we can add a prop. Let's add it via the parent.
    // For now, we'll use the onNavigate to go to courses
    onNavigate("courses", courseId);
    setShowAddToCourseMenu(false);
    setShowMenu(false);
  };

  const handleCreateCourseWithVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourseName.trim()) {
      // This needs to be handled by parent - we'll navigate to feed with a flag
      // For simplicity, we'll use the existing mechanism
      onNavigate("feed");
      // The parent will handle via onCreateCourseWithVideo from VideoCard
      // But we're in WatchPage, so we need a different approach
      // Let's use localStorage to signal the parent
      localStorage.setItem("zedistra_pending_course", JSON.stringify({
        name: newCourseName.trim(),
        videoId: activeVideo.id
      }));
      setNewCourseName("");
      setShowAddToCourseMenu(false);
      setShowMenu(false);
      // Refresh the page or navigate to trigger the parent
      window.location.reload();
    }
  };

  const handleCategoryChange = (category: string) => {
    // This needs to be handled by parent
    // We'll use localStorage to signal
    localStorage.setItem("zedistra_pending_category", JSON.stringify({
      videoId: activeVideo.id,
      category: category
    }));
    setShowCategoryMenu(false);
    setShowMenu(false);
    window.location.reload();
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      localStorage.setItem("zedistra_pending_category", JSON.stringify({
        videoId: activeVideo.id,
        category: newCategoryName.trim()
      }));
      setNewCategoryName("");
      setShowCategoryMenu(false);
      setShowMenu(false);
      window.location.reload();
    }
  };

  const defaultCategories = ["Recent", "Old"];

  // Check if description is long (more than 200 chars or contains links)
  const isLongDescription = activeVideo.description.length > 200 || 
    activeVideo.description.includes("http") || 
    activeVideo.description.includes("www.");

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Back button */}
      <button
        onClick={() => onNavigate("feed")}
        className="flex items-center space-x-2 text-text-sub hover:text-text-main transition-colors mb-4 text-sm font-medium group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Feed</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left: Video Player + Info */}
        <div className="flex-1 min-w-0">
          {/* Video Player */}
          <div className="w-full rounded-xl overflow-hidden bg-neutral-900 shadow-lg">
            {videoIframe}
          </div>

          {/* Video Title & Actions */}
          <div className="mt-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <h1 className="text-lg sm:text-xl font-bold text-text-main leading-snug">
                {activeVideo.title}
              </h1>
              <div className="flex items-center space-x-1 flex-shrink-0">
                <button
                  onClick={() => onToggleLike(activeVideo.id)}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked ? "text-red-600 bg-red-50" : "text-text-sub hover:bg-neutral-100"
                  }`}
                  aria-label="Like"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-red-600" : ""}`} />
                </button>
                <span className="text-xs font-medium text-text-sub mr-1">{activeVideo.likes}</span>
                
                <button
                  onClick={() => onToggleFavorite(activeVideo.id)}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorited ? "text-amber-500 bg-amber-50" : "text-text-sub hover:bg-neutral-100"
                  }`}
                  aria-label="Favorite"
                >
                  <Star className={`w-5 h-5 ${isFavorited ? "fill-amber-500" : ""}`} />
                </button>

                {/* 3-dot menu */}
                <div ref={menuRef} className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 rounded-full hover:bg-neutral-100 text-text-sub hover:text-text-main transition-colors"
                    aria-label="More options"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-56 max-w-[90vw] bg-bg-card border border-border-custom rounded-xl shadow-xl z-30 py-1.5 text-xs text-text-main animate-in fade-in slide-in-from-top-2 duration-150">
                      {/* Edit Details */}
                      <button
                        onClick={() => { setShowEditForm(!showEditForm); setShowMenu(false); }}
                        className="w-full px-4 py-2 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 flex items-center text-left text-blue-600 dark:text-blue-400 cursor-pointer transition-colors"
                      >
                        <Edit2 className="w-4 h-4 mr-2.5 text-blue-500" />
                        <span>Edit Details</span>
                      </button>

                      {/* Add to Course */}
                      <button
                        onClick={() => { setShowAddToCourseMenu(!showAddToCourseMenu); setShowCategoryMenu(false); }}
                        className="w-full px-4 py-2 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 flex items-center text-left cursor-pointer transition-colors justify-between text-text-main"
                      >
                        <span className="flex items-center">
                          <FolderPlus className="w-4 h-4 mr-2.5 text-text-sub" />
                          <span>Add to Course</span>
                        </span>
                        <span className="text-[10px] text-text-sub bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">
                          {courses.length}
                        </span>
                      </button>

                      {showAddToCourseMenu && (
                        <div className="px-3 py-2 bg-neutral-50/50 dark:bg-neutral-900/40 border-y border-border-custom space-y-2 max-h-40 overflow-y-auto no-scrollbar">
                          {courses.map((course) => {
                            const alreadyIn = course.videoIds.includes(activeVideo.id);
                            return (
                              <button
                                key={course.id}
                                onClick={() => handleAddToCourse(course.id)}
                                className="w-full py-1 px-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded flex items-center justify-between text-[11px] text-left text-text-main cursor-pointer"
                              >
                                <span className="truncate">{course.name}</span>
                                {alreadyIn ? <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" /> : <Plus className="w-3.5 h-3.5 text-text-sub flex-shrink-0" />}
                              </button>
                            );
                          })}
                          <form onSubmit={handleCreateCourseWithVideo} className="flex items-center space-x-1 pt-1.5 border-t border-border-custom">
                            <input
                              type="text"
                              placeholder="New course..."
                              value={newCourseName}
                              onChange={(e) => setNewCourseName(e.target.value)}
                              className="w-full px-2 py-0.5 text-[10px] border border-border-custom rounded focus:outline-none focus:border-red-500 bg-bg-card text-text-main"
                            />
                            <button type="submit" className="p-1 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer">
                              <Plus className="w-3 h-3" />
                            </button>
                          </form>
                        </div>
                      )}

                      {/* Move to Category */}
                      <button
                        onClick={() => { setShowCategoryMenu(!showCategoryMenu); setShowAddToCourseMenu(false); }}
                        className="w-full px-4 py-2 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 flex items-center text-left cursor-pointer transition-colors justify-between text-text-main"
                      >
                        <span className="flex items-center">
                          <Tag className="w-4 h-4 mr-2.5 text-text-sub" />
                          <span>Move to Category</span>
                        </span>
                        <span className="text-[10px] text-text-sub bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded truncate max-w-[70px]">
                          {activeVideo.category}
                        </span>
                      </button>

                      {showCategoryMenu && (
                        <div className="px-3 py-2 bg-neutral-50/50 dark:bg-neutral-900/40 border-y border-border-custom space-y-1 max-h-40 overflow-y-auto no-scrollbar">
                          {defaultCategories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => handleCategoryChange(cat)}
                              className="w-full py-1 px-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded flex items-center justify-between text-[11px] text-left text-text-main cursor-pointer"
                            >
                              <span>{cat}</span>
                              {activeVideo.category === cat && <Check className="w-3.5 h-3.5 text-green-600" />}
                            </button>
                          ))}
                          <form onSubmit={handleCreateCategory} className="flex items-center space-x-1 pt-1.5 border-t border-border-custom">
                            <input
                              type="text"
                              placeholder="New category..."
                              value={newCategoryName}
                              onChange={(e) => setNewCategoryName(e.target.value)}
                              className="w-full px-2 py-0.5 text-[10px] border border-border-custom rounded focus:outline-none focus:border-red-500 bg-bg-card text-text-main"
                            />
                            <button type="submit" className="p-1 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer">
                              <Plus className="w-3 h-3" />
                            </button>
                          </form>
                        </div>
                      )}

                      <hr className="my-1 border-border-custom" />

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this video?")) {
                            onDeleteVideo(activeVideo.id);
                          }
                          setShowMenu(false);
                        }}
                        className="w-full px-4 py-2 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 flex items-center text-left text-red-600 dark:text-red-400 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2.5 text-red-500" />
                        <span>Delete Video</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Channel & Upload info */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden flex-shrink-0">
                <img 
                  src={getChannelAvatarUrl(activeVideo.channelLink, activeVideo.channelName)}
                  alt={activeVideo.channelName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeVideo.channelName || "V")}&background=E11D48&color=ffffff&size=128&bold=true`;
                  }}
                />
              </div>
              <div>
                <p className="font-semibold text-sm text-text-main">{activeVideo.channelName || "Unknown Channel"}</p>
                <div className="flex items-center space-x-2 text-xs text-text-sub">
                  <span>{activeVideo.likes} likes</span>
                  <span>•</span>
                  <span>{formatRelativeTime(activeVideo.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Description - FIXED: proper wrapping and overflow handling */}
            <div className="bg-bg-card rounded-xl border border-border-custom p-4">
              <div 
                className={`text-sm text-text-main whitespace-pre-wrap break-words overflow-wrap-anywhere max-w-full ${
                  !showDescription && isLongDescription ? "line-clamp-3" : ""
                }`}
                style={{ 
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  maxWidth: "100%"
                }}
              >
                {activeVideo.description || "No description provided."}
              </div>
              {isLongDescription && (
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="mt-2 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                >
                  {showDescription ? "Show Less" : "Show More"}
                </button>
              )}
            </div>

            {/* Edit Video Form */}
            {showEditForm && (
              <div className="bg-bg-card border border-border-custom rounded-xl p-4 space-y-3 animate-in fade-in duration-200">
                <h3 className="text-sm font-bold text-text-main">Edit Video Details</h3>
                <div>
                  <label className="text-xs font-medium text-text-sub block mb-1">Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border-custom rounded-lg focus:outline-none focus:border-red-500 bg-bg-app text-text-main"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-text-sub block mb-1">Description</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 text-sm border border-border-custom rounded-lg focus:outline-none focus:border-red-500 bg-bg-app text-text-main resize-none"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveEditVideo}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => { setShowEditForm(false); setShowMenu(false); }}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-text-main text-xs font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Comments Section - responsive on mobile */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <div className="sticky top-20 space-y-4">
            <h3 className="font-bold text-sm text-text-main flex items-center space-x-2">
              <span>Comments</span>
              <span className="text-xs text-text-sub bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                {videoComments.length}
              </span>
            </h3>

            {/* Comment Input */}
            <form onSubmit={handleSubmitComment} className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {username ? username.charAt(0).toUpperCase() : "?"}
                </div>
                <input
                  type="text"
                  placeholder={username ? "Add a public comment..." : "Set username first"}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={!username}
                  className="flex-1 px-3 py-2 text-sm border border-border-custom rounded-full focus:outline-none focus:border-red-500 bg-bg-app text-text-main disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!username || !newComment.trim()}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {!username && (
                <div className="text-xs text-text-sub">
                  <button
                    onClick={() => {
                      const name = prompt("Enter your username:");
                      if (name) onSetUsername(name.trim());
                    }}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Set username
                  </button>
                  {" "}to comment
                </div>
              )}
            </form>

            {/* Comments List */}
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
              {videoComments.length === 0 ? (
                <div className="text-center py-8 text-text-sub text-xs">
                  <User className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p>No comments yet. Be the first!</p>
                </div>
              ) : (
                videoComments.map((comment) => {
                  const isEditing = editingCommentId === comment.id;
                  const isOwn = comment.username === username;
                  return (
                    <div key={comment.id} className="bg-bg-card rounded-xl p-3 border border-border-custom">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {comment.username ? comment.username.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-text-main">{comment.username || "Anonymous"}</span>
                            <span className="text-[10px] text-text-sub">{formatRelativeTime(comment.createdAt)}</span>
                          </div>
                          {isEditing ? (
                            <div className="mt-1 space-y-2">
                              <input
                                type="text"
                                value={editCommentText}
                                onChange={(e) => setEditCommentText(e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-border-custom rounded-lg focus:outline-none focus:border-red-500 bg-bg-app text-text-main"
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleSaveEditComment(comment.id)}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-semibold rounded-lg transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEditComment}
                                  className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-text-main text-[10px] font-semibold rounded-lg transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-text-main break-words overflow-wrap-anywhere mt-0.5">
                              {comment.text}
                            </p>
                          )}
                          {isOwn && !isEditing && (
                            <div className="flex space-x-3 mt-1.5">
                              <button
                                onClick={() => handleStartEditComment(comment)}
                                className="text-[10px] text-blue-600 hover:underline font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm("Delete this comment?")) {
                                    onDeleteComment(comment.id);
                                  }
                                }}
                                className="text-[10px] text-red-600 hover:underline font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
