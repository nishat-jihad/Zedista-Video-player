import React, { useState, useRef, useEffect } from "react";
import { 
  MoreVertical, 
  Trash2, 
  Edit, 
  Clock, 
  Play, 
  Plus, 
  Star,
  Check
} from "lucide-react";
import { Video, Course } from "../types";
import { extractYouTubeId, formatRelativeTime, getChannelAvatarUrl } from "../utils/videoUtils";

interface VideoCardProps {
  key?: string;
  video: Video;
  courses: Course[];
  favoriteVideoIds: string[];
  onPlayVideo: (id: string) => void;
  onEditVideo: (video: Video) => void;
  onDeleteVideo: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onAddVideoToCourse: (courseId: string, videoId: string) => void;
  onCreateCourseWithVideo: (courseName: string, videoId: string) => void;
}

export default function VideoCard({
  video,
  courses,
  favoriteVideoIds,
  onPlayVideo,
  onEditVideo,
  onDeleteVideo,
  onToggleFavorite,
  onAddVideoToCourse,
  onCreateCourseWithVideo
}: VideoCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showPlaylistSubmenu, setShowPlaylistSubmenu] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const isFavorite = favoriteVideoIds.includes(video.id);
  const menuRef = useRef<HTMLDivElement>(null);

  // Extract YouTube ID for thumbnail
  const ytId = extractYouTubeId(video.embedCode);
  const isYoutube = !!ytId;
  const thumbnailUrl = isYoutube 
    ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` 
    : null;

  // Handle outside click to close menus
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setShowPlaylistSubmenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePlaylistAdd = (courseId: string) => {
    onAddVideoToCourse(courseId, video.id);
    setShowMenu(false);
    setShowPlaylistSubmenu(false);
  };

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      onCreateCourseWithVideo(newPlaylistName.trim(), video.id);
      setNewPlaylistName("");
      setShowMenu(false);
      setShowPlaylistSubmenu(false);
    }
  };

  // Pre-selected seed gradients based on title hash for consistency
  const getGradientClass = (title: string) => {
    const gradients = [
      "from-rose-500 to-orange-500",
      "from-violet-600 to-indigo-600",
      "from-emerald-500 to-teal-600",
      "from-pink-500 to-rose-600",
      "from-amber-500 to-orange-600"
    ];
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  };

  return (
    <div 
      id={`video-card-${video.id}`}
      className="group relative flex flex-col bg-transparent w-full transition-all duration-300"
    >
      {/* Thumbnail */}
      <div 
        onClick={() => onPlayVideo(video.id)}
        className="relative aspect-video w-full bg-neutral-900 cursor-pointer overflow-hidden rounded-xl border border-neutral-100/10"
      >
        {isYoutube && thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={video.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-tr ${getGradientClass(video.title)} flex flex-col items-center justify-center p-4 relative text-white`}>
            <div className="p-3 rounded-full bg-black/40 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="absolute bottom-2 left-2 right-2 text-center text-xs font-semibold uppercase tracking-wider opacity-90 truncate bg-black/35 py-1 px-2 rounded backdrop-blur-xs">
              {video.category}
            </span>
          </div>
        )}

        {/* Thumbnail Overlays */}
        <div className="absolute bottom-2 right-2 flex items-center space-x-1.5 bg-black/75 px-2 py-0.5 rounded text-[10px] font-semibold text-white tracking-wide">
          <Clock className="w-3 h-3" />
          <span>{formatRelativeTime(video.createdAt)}</span>
        </div>
      </div>

      {/* Description / Content Details */}
      <div className="pt-3 pb-1 flex gap-3 flex-1 w-full">
        {/* Channel Profile Picture / Initial Circle */}
        <div className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 border border-border-custom overflow-hidden">
          <img 
            src={getChannelAvatarUrl(video.channelLink, video.channelName)} 
            alt={video.channelName} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(video.channelName || "V")}&background=E11D48&color=ffffff&size=128&bold=true`;
            }}
          />
        </div>

        {/* Title, Channel and Metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-1">
            <h3 
              onClick={() => onPlayVideo(video.id)}
              className="text-sm font-semibold leading-snug line-clamp-2 cursor-pointer text-text-main hover:text-red-600 transition-colors"
              title={video.title}
            >
              {video.title}
            </h3>

            {/* Options Button */}
            <div ref={menuRef} className="relative flex-shrink-0">
              <button
                id={`video-menu-btn-${video.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                  setShowPlaylistSubmenu(false);
                }}
                className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-text-sub hover:text-text-main cursor-pointer focus:outline-none"
                aria-label="Video management options"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
              <div 
                id={`video-dropdown-${video.id}`}
                className="absolute right-0 mt-2 w-56 bg-bg-card border border-border-custom rounded-xl shadow-xl z-30 py-1.5 text-xs text-text-main animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {/* Save to Favorites */}
                <button
                  id={`video-menu-fav-${video.id}`}
                  onClick={() => {
                    onToggleFavorite(video.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 flex items-center text-left cursor-pointer transition-colors text-text-main"
                >
                  <Star className={`w-4 h-4 mr-2.5 ${isFavorite ? "text-amber-500 fill-amber-500" : "text-text-sub"}`} />
                  <span>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
                </button>

                {/* Add to Course/Playlist */}
                <button
                  id={`video-menu-course-${video.id}`}
                  onClick={() => setShowPlaylistSubmenu(!showPlaylistSubmenu)}
                  className="w-full px-4 py-2 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 flex items-center text-left cursor-pointer transition-colors justify-between text-text-main"
                >
                  <span className="flex items-center">
                    <Plus className="w-4 h-4 mr-2.5 text-text-sub" />
                    <span>Add to Course</span>
                  </span>
                  <span className="text-[10px] text-text-sub bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">
                    {courses.length} courses
                  </span>
                </button>

                {/* Submenu for playlists */}
                {showPlaylistSubmenu && (
                  <div className="px-3 py-2 bg-neutral-50/50 dark:bg-neutral-900/40 border-y border-border-custom space-y-2 max-h-40 overflow-y-auto no-scrollbar">
                    {courses.map((course) => {
                      const alreadyInCourse = course.videoIds.includes(video.id);
                      return (
                        <button
                          key={course.id}
                          id={`video-menu-add-course-${course.id}-${video.id}`}
                          onClick={() => handlePlaylistAdd(course.id)}
                          className="w-full py-1 px-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded flex items-center justify-between text-[11px] text-left text-text-main cursor-pointer"
                        >
                          <span className="truncate">{course.name}</span>
                          {alreadyInCourse ? (
                            <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                          ) : (
                            <Plus className="w-3.5 h-3.5 text-text-sub flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}

                    {/* Quick creation in menu */}
                    <form onSubmit={handleCreatePlaylist} className="flex items-center space-x-1 pt-1.5 border-t border-border-custom">
                      <input
                        type="text"
                        placeholder="New course..."
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        className="w-full px-2 py-0.5 text-[10px] border border-border-custom rounded focus:outline-none focus:border-red-500 bg-bg-card text-text-main"
                      />
                      <button
                        type="submit"
                        className="p-1 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer"
                        title="Create Course"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </form>
                  </div>
                )}

                <hr className="my-1 border-border-custom" />

                {/* Edit Title/Description */}
                <button
                  id={`video-menu-edit-${video.id}`}
                  onClick={() => {
                    onEditVideo(video);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 flex items-center text-left text-blue-600 dark:text-blue-400 cursor-pointer transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2.5 text-blue-500 dark:text-blue-400" />
                  <span>Edit Details</span>
                </button>

                {/* Delete Video */}
                <button
                  id={`video-menu-delete-${video.id}`}
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this video? It will be removed permanently.")) {
                      onDeleteVideo(video.id);
                    }
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 flex items-center text-left text-red-600 dark:text-red-400 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2.5 text-red-500 dark:text-red-400" />
                  <span>Delete Video</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-text-sub mt-1.5 truncate" title={video.channelName}>
            {video.channelName || "Creator"}
          </p>

          <div className="flex items-center space-x-1.5 text-xs text-text-sub mt-0.5 font-normal">
            <span>{video.likes} likes</span>
            <span>•</span>
            <span>{formatRelativeTime(video.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
