import React, { useState, useEffect, useRef } from "react";
import { 
  ThumbsUp, 
  Share2,
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
  FileText,
  BookOpen,
  Plus,
  Clock,
  StickyNote
} from "lucide-react";
import { Video, Comment, Course, VideoNote } from "../types";
import { getEmbedHtml, formatRelativeTime, extractYouTubeId, getChannelAvatarUrl, getVideoDuration } from "../utils/videoUtils";
import CommentSection from "./CommentSection.tsx";

// Renders description text with clickable hyperlinks
function renderDescriptionWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 underline break-all"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const VideoPlayer = React.memo(({ embedCode }: { embedCode: string }) => {
  return (
    <div 
      className="absolute inset-0 w-full h-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0 [&_video]:absolute [&_video]:inset-0 [&_video]:w-full [&_video]:h-full [&_video]:border-0"
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

  // Timestamp Notes state
  const [notes, setNotes] = useState<VideoNote[]>([]);
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [noteTimestamp, setNoteTimestamp] = useState("");
  const [noteText, setNoteText] = useState("");
  const [noteToast, setNoteToast] = useState(false);
  
  // Metadata edit forms
  const [editTitle, setEditTitle] = useState(activeVideo.title);
  const [editDesc, setEditDesc] = useState(activeVideo.description);
  const [editChannelLink, setEditChannelLink] = useState(activeVideo.channelLink || "");
  const [editDuration, setEditDuration] = useState(activeVideo.duration || getVideoDuration(activeVideo));

  const watchMenuRef = useRef<HTMLDivElement>(null);

  const isLiked = likedVideoIds.includes(activeVideo.id);
  const isFavorite = favoriteVideoIds.includes(activeVideo.id);

  // Sync edit form fields when active video shifts
  useEffect(() => {
    setEditTitle(activeVideo.title);
    setEditDesc(activeVideo.description);
    setEditChannelLink(activeVideo.channelLink || "");
    setEditDuration(activeVideo.duration || getVideoDuration(activeVideo));
    setDescExpanded(false);
    setMobileCommentsExpanded(false);
    setShowNotesPanel(false);
    // Load notes for this video from localStorage
    const stored = localStorage.getItem(`zedistra_notes_${activeVideo.id}`);
    if (stored) {
      try { setNotes(JSON.parse(stored)); } catch { setNotes([]); }
    } else {
      setNotes([]);
    }
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

  // Convert "1:23" or "1:23:45" to seconds
  const timestampToSeconds = (ts: string): number => {
    const parts = ts.split(":").map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  };

  // Seek YouTube iframe to given timestamp
  const handleSeekToTimestamp = (timestamp: string) => {
    if (timestamp === "--:--") return;
    const seconds = timestampToSeconds(timestamp);
    const ytId = extractYouTubeId(activeVideo.embedCode);
    if (ytId) {
      const iframe = document.querySelector("#watch-page-container iframe") as HTMLIFrameElement;
      if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${ytId}?start=${seconds}&autoplay=1&rel=0`;
      }
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    const newNote: VideoNote = {
      id: `note-${Date.now()}`,
      videoId: activeVideo.id,
      timestamp: noteTimestamp.trim() || "--:--",
      text: noteText.trim(),
      createdAt: Date.now(),
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem(`zedistra_notes_${activeVideo.id}`, JSON.stringify(updated));
    setNoteTimestamp("");
    setNoteText("");
    setNoteToast(true);
    setTimeout(() => setNoteToast(false), 2000);
  };

  const handleDeleteNote = (noteId: string) => {
    const updated = notes.filter((n) => n.id !== noteId);
    setNotes(updated);
    localStorage.setItem(`zedistra_notes_${activeVideo.id}`, JSON.stringify(updated));
  };

  const handleShareClick = () => {
    const videoUrl = `${window.location.origin}?video=${activeVideo.id}`;
    navigator.clipboard.writeText(videoUrl);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
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
        channelLink: editChannelLink.trim() || undefined,
        duration: editDuration.trim() || undefined
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
          <div className="relative -mx-4 sm:mx-0 aspect-video rounded-none sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg border-y sm:border border-border-custom bg-black">
            <VideoPlayer embedCode={activeVideo.embedCode} />
          </div>

          {/* Title & Metadata & Action row */}
          <div className="space-y-3 mt-3 px-2 sm:px-0">
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

            {/* Middle row: Channel Profile info and Engagement Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 pb-4 border-b border-border-custom">
              
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
                      className="font-bold text-sm text-text-main hover:text-red-600 transition-colors block truncate"
                    >
                      {activeVideo.channelName}
                    </a>
                  ) : (
                    <h4 className="font-bold text-sm text-text-main truncate">{activeVideo.channelName}</h4>
                  )}
                  <p className="text-[10px] text-text-sub font-medium leading-none mt-1">
                    Uploaded {formatRelativeTime(activeVideo.createdAt)}
                  </p>
                </div>
              </div>

              {/* Engagement Controls: Likes and Save */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Likes button */}
                <button
                  id="watch-like-btn"
                  onClick={() => onToggleLike(activeVideo.id)}
                  className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
                    isLiked 
                      ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400" 
                      : "bg-neutral-50 dark:bg-neutral-900 border-border-custom hover:bg-neutral-100 dark:hover:bg-neutral-800 text-text-sub hover:text-text-main"
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-red-600 dark:fill-red-400" : ""}`} />
                  <span>{activeVideo.likes} Likes</span>
                </button>

                {/* Favorites save Button */}
                <button
                  id="watch-favorite-btn"
                  onClick={() => onToggleFavorite(activeVideo.id)}
                  className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
                    isFavorite 
                      ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400" 
                      : "bg-neutral-50 dark:bg-neutral-900 border-border-custom hover:bg-neutral-100 dark:hover:bg-neutral-800 text-text-sub hover:text-text-main"
                  }`}
                  title="Save to favorites list"
                >
                  <Star className={`w-4 h-4 ${isFavorite ? "fill-amber-500 text-amber-500" : ""}`} />
                  <span>{isFavorite ? "Favorited" : "Save"}</span>
                </button>
              </div>

            </div>

            {/* Description Box collapse block */}
            <div id="collapsible-description-box" className="p-4 bg-neutral-50/50 dark:bg-neutral-900/40 rounded-xl border border-border-custom space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-text-sub">
                <FileText className="w-3.5 h-3.5" />
                <span>Description Metadata Log</span>
              </div>
              <p className={`text-xs text-text-main leading-relaxed whitespace-pre-wrap break-all break-words text-left ${descExpanded ? "" : "line-clamp-3"}`}>
                {renderDescriptionWithLinks(activeVideo.description || "No lecture notes included.")}
              </p>
              <button
                id="watch-toggle-desc-btn"
                onClick={() => setDescExpanded(!descExpanded)}
                className="text-[11px] font-bold text-red-600 dark:text-red-400 hover:text-red-700 flex items-center space-x-0.5 cursor-pointer focus:outline-none"
              >
                <span>{descExpanded ? "Show Less" : "Show More"}</span>
                {descExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Timestamp Notes Panel */}
            <div className="rounded-xl border border-border-custom overflow-hidden">
              {/* Notes Header Toggle */}
              <button
                onClick={() => setShowNotesPanel(!showNotesPanel)}
                className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2 text-xs font-semibold text-text-sub">
                  <StickyNote className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-text-main">Timestamp Notes</span>
                  {notes.length > 0 && (
                    <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {notes.length}
                    </span>
                  )}
                </div>
                {showNotesPanel ? <ChevronUp className="w-4 h-4 text-text-sub" /> : <ChevronDown className="w-4 h-4 text-text-sub" />}
              </button>

              {showNotesPanel && (
                <div className="p-4 space-y-4 bg-neutral-50/30 dark:bg-neutral-900/20">
                  {/* Add Note Form */}
                  <form onSubmit={handleAddNote} className="space-y-2">
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-800 border border-border-custom rounded-lg px-2.5 py-1.5 w-28 flex-shrink-0">
                        <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                        <input
                          type="text"
                          placeholder="12:34"
                          value={noteTimestamp}
                          onChange={(e) => setNoteTimestamp(e.target.value)}
                          className="w-full text-xs bg-transparent focus:outline-none text-text-main placeholder:text-text-sub"
                          maxLength={8}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="এখানে note লিখো..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="flex-1 text-xs px-3 py-1.5 border border-border-custom rounded-lg bg-white dark:bg-neutral-800 focus:outline-none focus:border-amber-500 text-text-main placeholder:text-text-sub"
                      />
                      <button
                        type="submit"
                        className="flex-shrink-0 p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg cursor-pointer transition-colors"
                        title="Note যোগ করো"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </form>

                  {/* Notes List */}
                  {notes.length === 0 ? (
                    <p className="text-xs text-text-sub italic text-center py-2">
                      কোনো note নেই। ভিডিও দেখতে দেখতে important জায়গায় note রাখো।
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
                      {notes.map((note) => (
                        <div
                          key={note.id}
                          className="flex items-start gap-2.5 bg-white dark:bg-neutral-800 border border-border-custom rounded-lg px-3 py-2.5"
                        >
                          <button
                            onClick={() => handleSeekToTimestamp(note.timestamp)}
                            className="flex-shrink-0 text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-1.5 py-0.5 rounded mt-0.5 hover:bg-amber-200 dark:hover:bg-amber-800/50 cursor-pointer transition-colors"
                            title="এই সময়ে jump করো"
                          >
                            {note.timestamp}
                          </button>
                          <p className="flex-1 text-xs text-text-main leading-relaxed break-words">
                            {note.text}
                          </p>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="flex-shrink-0 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-red-400 hover:text-red-600 cursor-pointer transition-all"
                            title="Note মুছে ফেলো"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Saved toast */}
                  {noteToast && (
                    <p className="text-[11px] text-green-600 dark:text-green-400 font-semibold text-center animate-in fade-in duration-200">
                      ✓ Note saved!
                    </p>
                  )}
                </div>
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
                  <label className="block font-medium text-neutral-500 text-left flex justify-between">
                    <span>Video Duration</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Format: MM:SS or H:MM:SS</span>
                  </label>
                  <input
                    id="watch-edit-duration-input"
                    type="text"
                    value={editDuration}
                    onChange={(e) => setEditDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-border-custom rounded-lg focus:outline-none focus:border-red-500 text-sm bg-neutral-50 focus:bg-white text-neutral-900"
                    placeholder="e.g. 14:23, 5:00, 1:24:50"
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
