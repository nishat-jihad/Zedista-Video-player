import React, { useState, useEffect, useRef } from "react";
import { 
  ThumbsUp, 
  ThumbsDown,
  Share2,
  Bell,
  Star, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  ArrowLeft, 
  Layers, 
  MoreVertical, 
  Edit, 
  Trash2,
  X,
  FileText
} from "lucide-react";
import { Video, Comment, Course } from "../types";
import { getEmbedHtml, formatRelativeTime, extractYouTubeId, getChannelAvatarUrl } from "../utils/videoUtils";
import CommentSection from "./CommentSection.tsx";

const VideoPlayer = React.memo(({ embedCode }: { embedCode: string }) => {
  return (
    <div 
      className="w-full h-full"
      dangerouslySetInnerHTML={{ __html: getEmbedHtml(embedCode) }}
    />
  );
}, (prevProps, nextProps) => prevProps.embedCode === nextProps.embedCode);

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
  onToggleLike: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onPlayVideo: (id: string) => void;
  onEditVideoDetails: (video: Video) => void;
  onDeleteVideo: (id: string) => void;
  onNavigate: (view: "feed" | "watch" | "add" | "courses" | "backup") => void;
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
  const [descExpanded, setDescExpanded] = useState(false);
  const [showMetadataEdit, setShowMetadataEdit] = useState(false);
  const [showWatchMenu, setShowWatchMenu] = useState(false);
  const [mobileCommentsExpanded, setMobileCommentsExpanded] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // Subscribed channels from local storage to simulate persistent subscriptions
  const [subscribedChannels, setSubscribedChannels] = useState<string[]>(() => {
    const stored = localStorage.getItem("zedistra_subscribed_channels");
    return stored ? JSON.parse(stored) : [];
  });

  // Disliked videos from local storage to simulate dislike behavior
  const [dislikedVideoIds, setDislikedVideoIds] = useState<string[]>(() => {
    const stored = localStorage.getItem("zedistra_disliked_videos");
    return stored ? JSON.parse(stored) : [];
  });
  
  // Metadata edit forms
  const [editTitle, setEditTitle] = useState(activeVideo.title);
  const [editDesc, setEditDesc] = useState(activeVideo.description);
  const [editChannelLink, setEditChannelLink] = useState(activeVideo.channelLink || "");

  const watchMenuRef = useRef<HTMLDivElement>(null);

  const isLiked = likedVideoIds.includes(activeVideo.id);
  const isFavorite = favoriteVideoIds.includes(activeVideo.id);
  const isSubscribed = subscribedChannels.includes(activeVideo.channelName);
  const isDisliked = dislikedVideoIds.includes(activeVideo.id);

  // Sync edit form fields when active video shifts
  useEffect(() => {
    setEditTitle(activeVideo.title);
    setEditDesc(activeVideo.description);
    setEditChannelLink(activeVideo.channelLink || "");
    setDescExpanded(false);
    setMobileCommentsExpanded(false);
  }, [activeVideo]);

  // Handle clicking outside 3-dot menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (watchMenuRef.current && !watchMenuRef.current.contains(event.target as Node)) {
        setShowWatchMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleSubscribe = () => {
    let updated;
    if (isSubscribed) {
      updated = subscribedChannels.filter((c) => c !== activeVideo.channelName);
    } else {
      updated = [...subscribedChannels, activeVideo.channelName];
    }
    setSubscribedChannels(updated);
    localStorage.setItem("zedistra_subscribed_channels", JSON.stringify(updated));
  };

  const handleToggleDislike = () => {
    let updated;
    if (isDisliked) {
      updated = dislikedVideoIds.filter((id) => id !== activeVideo.id);
    } else {
      updated = [...dislikedVideoIds, activeVideo.id];
      if (likedVideoIds.includes(activeVideo.id)) {
        onToggleLike(activeVideo.id);
      }
    }
    setDislikedVideoIds(updated);
    localStorage.setItem("zedistra_disliked_videos", JSON.stringify(updated));
  };

  const handleLikeClick = () => {
    if (isDisliked) {
      const updatedDislikes = dislikedVideoIds.filter((id) => id !== activeVideo.id);
      setDislikedVideoIds(updatedDislikes);
      localStorage.setItem("zedistra_disliked_videos", JSON.stringify(updatedDislikes));
    }
    onToggleLike(activeVideo.id);
  };

  const handleShareClick = () => {
    const videoUrl = `${window.location.origin}?video=${activeVideo.id}`;
    navigator.clipboard.writeText(videoUrl);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const getSubscribersText = (channelName: string) => {
    const sum = channelName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const count = (sum % 900) + 100; // 100 to 999
    const suffix = sum % 2 === 0 ? "K" : "M";
    return `${(count / 10).toFixed(1)}${suffix} subscribers`;
  };

  const getViewsText = (likesCount: number) => {
    const count = likesCount * 47 + 1042;
    return count.toLocaleString();
  };

  // Find containing course playlist (if any)
  const containingCourse = courses.find((c) => c.videoIds.includes(activeVideo.id));

  // Recommended list: Videos in the same category, excluding current video, capped at 6
  let recommended = videos
    .filter((v) => v.category === activeVideo.category && v.id !== activeVideo.id)
    .slice(0, 6);

  // If we don't have enough matching category, fill in general videos
  if (recommended.length < 6) {
    const filler = videos
      .filter((v) => v.id !== activeVideo.id && !recommended.some((r) => r.id === v.id))
      .slice(0, 6 - recommended.length);
    recommended = [...recommended, ...filler];
  }

  // Comments specifically for this video to support the mobile quick preview
  const videoComments = comments
    .filter((c) => c.videoId === activeVideo.id)
    .sort((a, b) => b.createdAt - a.createdAt);

  const handleMetadataUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onEditVideoDetails({
        ...activeVideo,
        title: editTitle.trim(),
        description: editDesc.trim() || "No description provided.",
        channelLink: editChannelLink.trim() || undefined
      });
      setShowMetadataEdit(false);
    }
  };

  return (
    <div id="watch-page-container" className="animate-in fade-in duration-200 text-text-main">
      
      {/* Return button row */}
      <div className="mb-4 flex items-center justify-between">
        <button
          id="watch-back-feed-btn"
          onClick={() => onNavigate("feed")}
          className="px-3 py-1.5 text-xs text-text-sub hover:text-text-main hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-border-custom rounded-lg flex items-center space-x-1 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </button>

        {containingCourse && (
          <div className="text-xs text-red-600 dark:text-red-400 font-semibold flex items-center space-x-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Playlist Track Active: {containingCourse.name}</span>
          </div>
        )}
      </div>

      {/* Grid: 2 columns on large displays (Left: Video & Comment Section, Right: Playlist or Recommendations) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Player and Details */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Iframe Aspect Ratio Responsive Video Frame */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-border-custom bg-black">
            <VideoPlayer embedCode={activeVideo.embedCode} />
          </div>

          {/* Title & Metadata & Action row */}
          <div className="space-y-3 mt-3 px-1 sm:px-0">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-base sm:text-lg md:text-xl font-bold leading-snug text-text-main break-words text-left">
                {activeVideo.title}
              </h1>

              {/* Watching Creator 3-dot Options Menu */}
              <div ref={watchMenuRef} className="relative flex-shrink-0">
                <button
                  id="watch-menu-toggle-btn"
                  onClick={() => setShowWatchMenu(!showWatchMenu)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-text-sub hover:text-text-main cursor-pointer focus:outline-none flex items-center justify-center"
                  aria-label="Video management options"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {showWatchMenu && (
                  <div 
                    id="watch-dropdown-menu"
                    className="absolute right-0 mt-1 w-44 bg-bg-card border border-border-custom rounded-xl shadow-xl z-30 py-1.5 text-xs text-text-main animate-in fade-in slide-in-from-top-1"
                  >
                    <button
                      id="watch-menu-edit-btn"
                      onClick={() => {
                        setShowMetadataEdit(true);
                        setShowWatchMenu(false);
                      }}
                      className="w-full px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center text-left text-blue-600 dark:text-blue-400 cursor-pointer"
                    >
                      <Edit className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" />
                      <span>Edit Video Details</span>
                    </button>

                    <button
                      id="watch-menu-delete-btn"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this video? It will be removed permanently from your library.")) {
                          onDeleteVideo(activeVideo.id);
                          onNavigate("feed");
                        }
                        setShowWatchMenu(false);
                      }}
                      className="w-full px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center text-left text-red-600 dark:text-red-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 mr-2 text-red-500 dark:text-red-400" />
                      <span>Delete Video</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Middle row: Channel Profile info and Quick Engagement bars */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1 pb-3 border-b border-border-custom">
              
              {/* Creator channel info */}
              <div className="flex items-center gap-3">
                {activeVideo.channelLink ? (
                  <a 
                    href={activeVideo.channelLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Visit Creator's Channel"
                    className="w-10 h-10 rounded-full border border-border-custom overflow-hidden block cursor-pointer transition-transform hover:scale-105"
                  >
                    <img 
                      src={getChannelAvatarUrl(activeVideo.channelLink, activeVideo.channelName)} 
                      alt={activeVideo.channelName} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeVideo.channelName || "V")}&background=E11D48&color=ffffff&size=128&bold=true`;
                      }}
                    />
                  </a>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/40 border border-red-200 dark:border-red-900 overflow-hidden flex items-center justify-center">
                    <img 
                      src={getChannelAvatarUrl(undefined, activeVideo.channelName)} 
                      alt={activeVideo.channelName} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 text-left">
                  {activeVideo.channelLink ? (
                    <a 
                      href={activeVideo.channelLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-bold text-xs sm:text-sm text-text-main hover:text-red-600 transition-colors block truncate"
                    >
                      {activeVideo.channelName}
                    </a>
                  ) : (
                    <h4 className="font-bold text-xs sm:text-sm text-text-main truncate">{activeVideo.channelName}</h4>
                  )}
                  <p className="text-[10px] text-text-sub font-medium leading-none mt-0.5">
                    {getSubscribersText(activeVideo.channelName)}
                  </p>
                </div>

                {/* Subscribe Button */}
                <div className="ml-2 flex-shrink-0">
                  {isSubscribed ? (
                    <button
                      onClick={handleToggleSubscribe}
                      className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-text-main font-semibold px-3 sm:px-4 py-1.5 rounded-full text-xs cursor-pointer transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <Bell className="w-3.5 h-3.5 text-text-sub" />
                      <span>Subscribed</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleToggleSubscribe}
                      className="bg-black hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold px-3 sm:px-4 py-1.5 rounded-full text-xs cursor-pointer transition-colors shadow-sm"
                    >
                      Subscribe
                    </button>
                  )}
                </div>
              </div>

              {/* Engagement Controls: Likes, Share, and Save */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 max-w-full">
                {/* Likes / Dislikes joined split button */}
                <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-full h-9 p-0.5 overflow-hidden flex-shrink-0">
                  <button
                    id="watch-like-btn"
                    onClick={handleLikeClick}
                    className={`flex items-center gap-1.5 px-3.5 h-full text-xs font-semibold cursor-pointer rounded-l-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors ${
                      isLiked 
                        ? "text-red-600 dark:text-red-400" 
                        : "text-text-main"
                    }`}
                    title="I like this lecture"
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? "fill-red-600 dark:fill-red-400 text-red-600 dark:text-red-400" : ""}`} />
                    <span>{activeVideo.likes}</span>
                  </button>
                  <div className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700" />
                  <button
                    id="watch-dislike-btn"
                    onClick={handleToggleDislike}
                    className={`flex items-center justify-center px-3.5 h-full cursor-pointer rounded-r-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors ${
                      isDisliked 
                        ? "text-red-600 dark:text-red-400" 
                        : "text-text-sub"
                    }`}
                    title="I dislike this lecture"
                  >
                    <ThumbsDown className={`w-3.5 h-3.5 ${isDisliked ? "fill-red-600 dark:fill-red-400 text-red-600 dark:text-red-400" : ""}`} />
                  </button>
                </div>

                {/* Share Pill Button */}
                <div className="relative flex-shrink-0">
                  <button
                    id="watch-share-btn"
                    onClick={handleShareClick}
                    className="flex items-center gap-1.5 px-3.5 h-9 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-text-main rounded-full text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-text-sub" />
                    <span>Share</span>
                  </button>
                  
                  {shareToast && (
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-[10px] py-1 px-2.5 rounded-md whitespace-nowrap shadow-lg z-20 animate-in fade-in duration-200">
                      Copied lecture link!
                    </div>
                  )}
                </div>

                {/* Save to Favorites Star Pill */}
                <button
                  id="watch-favorite-btn"
                  onClick={() => onToggleFavorite(activeVideo.id)}
                  className={`flex items-center gap-1.5 px-3.5 h-9 rounded-full text-xs font-semibold cursor-pointer transition-colors flex-shrink-0 ${
                    isFavorite 
                      ? "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold" 
                      : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-text-main"
                  }`}
                  title="Save to favorites"
                >
                  <Star className={`w-3.5 h-3.5 ${isFavorite ? "fill-amber-500 text-amber-500" : ""}`} />
                  <span>{isFavorite ? "Saved" : "Save"}</span>
                </button>
              </div>

            </div>

            {/* Description Box collapse block styled like modern Youtube */}
            <div 
              id="collapsible-description-box" 
              onClick={() => !descExpanded && setDescExpanded(true)}
              className={`p-3 bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800/40 dark:hover:bg-neutral-800/60 rounded-xl transition-all select-none text-xs sm:text-sm space-y-1.5 ${
                !descExpanded ? "cursor-pointer" : ""
              }`}
            >
              <div className="flex flex-wrap items-center gap-x-3 text-xs font-bold text-text-main">
                <span>{getViewsText(activeVideo.likes)} views</span>
                <span>{formatRelativeTime(activeVideo.createdAt)}</span>
                <span className="text-blue-600 dark:text-blue-400">#{activeVideo.category.replace(/\s+/g, '')}</span>
                <span className="text-blue-600 dark:text-blue-400">#Education</span>
              </div>
              
              <p className={`text-xs sm:text-sm text-text-main leading-relaxed whitespace-pre-wrap break-words text-left ${descExpanded ? "" : "line-clamp-2"}`}>
                {activeVideo.description || "No lecture syllabus notes included."}
              </p>

              {descExpanded ? (
                <button
                  id="watch-toggle-desc-btn-less"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDescExpanded(false);
                  }}
                  className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mt-1 hover:underline flex items-center space-x-0.5 cursor-pointer focus:outline-none"
                >
                  <span>Show Less</span>
                </button>
              ) : (
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mt-0.5 text-left">
                  ...more
                </span>
              )}
            </div>

          </div>

          {/* Conditional Metadata Inline Editor Form */}
          {showMetadataEdit && (
            <form 
              onSubmit={handleMetadataUpdateSubmit}
              id="watch-edit-metadata-form"
              className="bg-bg-card border-2 border-red-500 rounded-2xl p-5 space-y-4 animate-in slide-in-from-top-1"
            >
              <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                <h3 className="font-bold text-sm text-neutral-900 flex items-center">
                  <Edit className="w-4 h-4 mr-1.5 text-blue-500" />
                  <span>Update Video Information</span>
                </h3>
                <button
                  id="watch-cancel-edit-btn"
                  type="button"
                  onClick={() => setShowMetadataEdit(false)}
                  className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="block font-medium text-neutral-500 text-left">Video Title *</label>
                  <input
                    id="watch-edit-title-input"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-border-custom rounded-lg focus:outline-none focus:border-red-500 text-sm bg-neutral-50 focus:bg-white text-neutral-900"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-medium text-neutral-500 text-left">The creator channel link</label>
                  <input
                    id="watch-edit-channel-link-input"
                    type="url"
                    value={editChannelLink}
                    onChange={(e) => setEditChannelLink(e.target.value)}
                    placeholder="e.g. https://www.youtube.com/@channelName"
                    className="w-full px-3 py-2 border border-border-custom rounded-lg focus:outline-none focus:border-red-500 text-sm bg-neutral-50 focus:bg-white text-neutral-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-medium text-neutral-500 text-left">Description syllabus</label>
                  <textarea
                    id="watch-edit-desc-input"
                    rows={4}
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-border-custom rounded-lg focus:outline-none focus:border-red-500 text-sm bg-neutral-50 focus:bg-white text-neutral-900 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 text-xs">
                <button
                  id="watch-edit-submit-btn"
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Save Changes
                </button>
                <button
                  id="watch-edit-cancel-btn-bottom"
                  type="button"
                  onClick={() => setShowMetadataEdit(false)}
                  className="px-4 py-2 border border-border-custom rounded-lg hover:bg-neutral-100 text-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Mobile Comments Card Preview (Visible on md and smaller, hidden on lg) */}
          <div 
            id="comments-preview-card-mobile"
            onClick={() => setMobileCommentsExpanded(!mobileCommentsExpanded)}
            className="block lg:hidden bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 border border-border-custom rounded-xl p-3 cursor-pointer transition-all mt-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-text-main">Comments</span>
                <span className="text-[10px] sm:text-xs text-text-sub font-medium bg-neutral-200 dark:bg-neutral-850 px-2 py-0.5 rounded-full">
                  {videoComments.length}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-text-sub transition-transform ${mobileCommentsExpanded ? "rotate-180" : ""}`} />
            </div>

            {videoComments.length > 0 ? (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center font-bold text-[9px] uppercase text-text-main flex-shrink-0">
                  {videoComments[0].username.charAt(0)}
                </div>
                <p className="text-text-main truncate flex-1 leading-tight text-left">
                  <strong className="font-semibold text-text-main mr-1">{videoComments[0].username}</strong>
                  {videoComments[0].text}
                </p>
              </div>
            ) : (
              <p className="text-[11px] text-text-sub italic text-left">No comments yet. Tap to start the discussion!</p>
            )}
          </div>

          {/* Comment Section container: toggled on mobile, always visible on desktop */}
          <div className={`${mobileCommentsExpanded ? "block" : "hidden lg:block"} mt-4 animate-in fade-in duration-200`}>
            <CommentSection
              videoId={activeVideo.id}
              comments={comments}
              username={username}
              onSetUsername={onSetUsername}
              onAddComment={onAddComment}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
            />
          </div>

        </div>

        {/* RIGHT COLUMN: Playlists / Recommendations Sidebar */}
        <div className="space-y-5">
          
          {/* Active Course Playlist Box Display */}
          {containingCourse && (
            <div id="watch-course-playlist-panel" className="bg-neutral-900 text-white rounded-2xl border border-neutral-800 shadow-md overflow-hidden">
              {/* Header Box title */}
              <div className="bg-neutral-950 p-4 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-xs uppercase tracking-wider text-red-500">Course Syllabus</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded font-mono">
                    {containingCourse.videoIds.indexOf(activeVideo.id) + 1} / {containingCourse.videoIds.length}
                  </span>
                </div>
                <h3 className="font-bold text-sm mt-1.5 line-clamp-1">{containingCourse.name}</h3>
              </div>

              {/* Playlist Tracks List */}
              <div className="max-h-80 overflow-y-auto no-scrollbar py-1">
                {containingCourse.videoIds.map((vidId, index) => {
                  const itemVideo = videos.find((v) => v.id === vidId);
                  if (!itemVideo) return null;
                  
                  const isCurrent = itemVideo.id === activeVideo.id;
                  
                  return (
                    <div
                      key={itemVideo.id}
                      id={`watch-playlist-track-${itemVideo.id}`}
                      onClick={() => onPlayVideo(itemVideo.id)}
                      className={`flex items-center space-x-3 p-2.5 cursor-pointer text-left transition-colors border-l-4 ${
                        isCurrent 
                          ? "bg-neutral-800 border-red-600 text-white font-semibold" 
                          : "border-transparent text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                      }`}
                    >
                      {/* Play or Index status */}
                      <span className="w-6 text-center text-xs font-mono font-bold flex-shrink-0">
                        {isCurrent ? <Play className="w-3.5 h-3.5 text-red-500 fill-current mx-auto" /> : String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold truncate leading-tight">{itemVideo.title}</h4>
                        <p className="text-[10px] text-neutral-500 truncate mt-0.5">{itemVideo.channelName}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommended Videos list */}
          <div id="watch-recommendations-panel" className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Recommended Lessons</h3>

            <div className="space-y-3">
              {recommended.map((video) => {
                const ytId = extractYouTubeId(video.embedCode);
                
                return (
                  <div
                    key={video.id}
                    id={`watch-rec-row-${video.id}`}
                    onClick={() => onPlayVideo(video.id)}
                    className="flex space-x-3 group cursor-pointer text-left"
                  >
                    {/* Small thumbnail */}
                    <div className="relative w-28 aspect-video bg-neutral-950 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-200">
                      {ytId ? (
                        <img
                          src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                          alt={video.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-neutral-800 to-red-950 flex items-center justify-center text-white text-[10px] font-bold">
                          <Play className="w-3 h-3 fill-current text-red-500" />
                        </div>
                      )}
                    </div>

                    {/* Lesson texts */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 
                        className="text-xs font-semibold leading-tight text-neutral-900 group-hover:text-red-600 line-clamp-2 transition-colors"
                        title={video.title}
                      >
                        {video.title}
                      </h4>
                      <p className="text-[10px] text-text-sub mt-1 truncate">{video.channelName}</p>
                      <span className="text-[9px] text-neutral-400 mt-0.5">{video.likes} likes</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
