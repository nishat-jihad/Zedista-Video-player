import React, { useState, useEffect } from "react";
import { 
  Plus, 
  HelpCircle, 
  Sparkles, 
  Video as VideoIcon, 
  BookOpen, 
  FolderPlus, 
  Tv 
} from "lucide-react";
import { Video, Course } from "../types";
import { getEmbedHtml, extractYouTubeId } from "../utils/videoUtils";

interface AddVideoFormProps {
  videos: Video[];
  courses: Course[];
  onAddVideo: (video: Omit<Video, "id" | "createdAt" | "likes">, courseId?: string, newCourseName?: string) => void;
  onNavigate: (view: "feed" | "watch" | "add" | "courses" | "backup") => void;
}

export default function AddVideoForm({
  videos,
  courses,
  onAddVideo,
  onNavigate
}: AddVideoFormProps) {
  const [embedInput, setEmbedInput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [channelName, setChannelName] = useState("");
  const [channelLink, setChannelLink] = useState("");
  
  // Category management
  const [categoryOption, setCategoryOption] = useState("Recent");
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);

  // Playlist / Course management
  const [courseOption, setCourseOption] = useState("none");
  const [customCourseName, setCustomCourseName] = useState("");
  const [showCustomCourseInput, setShowCustomCourseInput] = useState(false);

  // Auto-detection preview
  const [detectedYtId, setDetectedYtId] = useState<string | null>(null);

  // Get list of existing unique categories
  const existingCategories = Array.from(
    new Set(videos.map((v) => v.category))
  ).filter((cat) => cat.trim() !== "");

  // If "Recent" and "Old" aren't in the list, ensure they are options
  if (!existingCategories.includes("Recent")) existingCategories.push("Recent");
  if (!existingCategories.includes("Old")) existingCategories.push("Old");

  useEffect(() => {
    const ytId = extractYouTubeId(embedInput);
    setDetectedYtId(ytId);

    // Dynamic auto-fill suggestion (neat helper for a super professional developer vibe!)
    if (ytId && !title) {
      // Suggest a template title
      setTitle(`Pasted Video - YouTube (${ytId})`);
    }
  }, [embedInput]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCategoryOption(val);
    if (val === "new") {
      setShowCustomCategoryInput(true);
    } else {
      setShowCustomCategoryInput(false);
      setCustomCategory("");
    }
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCourseOption(val);
    if (val === "new") {
      setShowCustomCourseInput(true);
    } else {
      setShowCustomCourseInput(false);
      setCustomCourseName("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!embedInput.trim() || !title.trim()) return;

    const finalCategory = categoryOption === "new" ? customCategory.trim() : categoryOption;
    if (!finalCategory) {
      alert("Please provide a category name.");
      return;
    }

    const videoData = {
      embedCode: embedInput.trim(),
      title: title.trim(),
      description: description.trim() || "No description provided.",
      channelName: channelName.trim() || "Independent Creator",
      channelLink: channelLink.trim() || undefined,
      category: finalCategory,
      originalCategory: finalCategory
    };

    const targetCourseId = courseOption !== "none" && courseOption !== "new" ? courseOption : undefined;
    const targetNewCourseName = courseOption === "new" ? customCourseName.trim() : undefined;

    onAddVideo(videoData, targetCourseId, targetNewCourseName);
    onNavigate("feed");
  };

  return (
    <div id="add-video-container" className="max-w-2xl mx-auto bg-bg-card border border-border-custom rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Header Banner */}
      <div className="bg-neutral-900 px-6 py-5 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-500/30">
            <VideoIcon className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Creator Video Upload</h2>
            <p className="text-xs text-neutral-400">Add custom URLs or raw iframe embed elements</p>
          </div>
        </div>
        <button
          id="back-feed-btn"
          onClick={() => onNavigate("feed")}
          className="text-xs text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} id="video-add-form" className="p-6 space-y-5">
        
        {/* Source Embed code / URL */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide flex items-center justify-between">
            <span>Video URL or Embed Iframe Code *</span>
            <span className="text-[10px] lowercase text-neutral-400 font-normal flex items-center">
              <HelpCircle className="w-3 h-3 mr-0.5" />
              YouTube, Vimeo, MP4 direct url or full &lt;iframe&gt; code
            </span>
          </label>
          <textarea
            id="embed-input-field"
            rows={3}
            value={embedInput}
            onChange={(e) => setEmbedInput(e.target.value)}
            placeholder="Paste YouTube Link (e.g. https://youtube.com/watch?v=...) OR copy-paste the raw iframe embed block from any sharing menu..."
            className="w-full px-3 py-2 text-sm border border-border-custom rounded-lg focus:outline-none focus:border-red-500 bg-neutral-50 focus:bg-white text-neutral-900 resize-none font-mono text-xs"
            required
          />

          {/* Autodetection Feedback Badge */}
          {detectedYtId && (
            <div id="detection-feedback" className="flex items-center space-x-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Valid YouTube ID <strong>{detectedYtId}</strong> detected! Real thumbnail will sync automatically.</span>
            </div>
          )}
        </div>

        {/* Video Title */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            Video Title *
          </label>
          <input
            id="title-input-field"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write a catchy, descriptive title for the video"
            className="w-full px-3 py-2 text-sm border border-border-custom rounded-lg focus:outline-none focus:border-red-500 bg-neutral-50 focus:bg-white text-neutral-900"
            required
          />
        </div>

        {/* Channel Name */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            Channel Name / Author Name
          </label>
          <input
            id="channel-input-field"
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="e.g. Veritasium, Fireship, StyleCode Studio (Defaults to Independent Creator)"
            className="w-full px-3 py-2 text-sm border border-border-custom rounded-lg focus:outline-none focus:border-red-500 bg-neutral-50 focus:bg-white text-neutral-900"
          />
        </div>

        {/* The creator channel link */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            The creator channel link
          </label>
          <input
            id="channel-link-input-field"
            type="url"
            value={channelLink}
            onChange={(e) => setChannelLink(e.target.value)}
            placeholder="e.g. https://www.youtube.com/@Veritasium or copy-paste creator's channel link"
            className="w-full px-3 py-2 text-sm border border-border-custom rounded-lg focus:outline-none focus:border-red-500 bg-neutral-50 focus:bg-white text-neutral-900"
          />
          <p className="text-[10px] text-neutral-400">
            If provided, the creator's real profile picture will be automatically fetched and displayed!
          </p>
        </div>

        {/* Category Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              Category Classification
            </label>
            <select
              id="category-dropdown-select"
              value={categoryOption}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 text-sm border border-border-custom rounded-lg focus:outline-none focus:border-red-500 bg-neutral-50 text-neutral-900"
            >
              <option value="Recent">Recent (Default - moves to Old in 3 hrs)</option>
              <option value="Old">Old</option>
              {existingCategories
                .filter((cat) => cat !== "Recent" && cat !== "Old")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              <option value="new" className="text-red-600 font-semibold">
                + Create New Category...
              </option>
            </select>
          </div>

          {/* Quick Add Course Playlist option */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              Course / Playlist Association
            </label>
            <select
              id="course-dropdown-select"
              value={courseOption}
              onChange={handleCourseChange}
              className="w-full px-3 py-2 text-sm border border-border-custom rounded-lg focus:outline-none focus:border-red-500 bg-neutral-50 text-neutral-900"
            >
              <option value="none">Do not associate with a Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} ({course.videoIds.length} videos)
                </option>
              ))}
              <option value="new" className="text-red-600 font-semibold">
                + Create New Course Playlist...
              </option>
            </select>
          </div>
        </div>

        {/* Conditional Custom inputs */}
        <div className="space-y-4">
          {showCustomCategoryInput && (
            <div id="custom-category-wrapper" className="p-3 bg-red-50 border border-red-100 rounded-lg space-y-1 animate-in fade-in duration-100">
              <label className="block text-xs font-semibold text-red-700 flex items-center">
                <FolderPlus className="w-3.5 h-3.5 mr-1" />
                Custom Category Name
              </label>
              <input
                id="custom-category-input"
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter unique category (e.g. Design, Astronomy, Cooking)"
                className="w-full px-3 py-1.5 text-sm border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 bg-white text-neutral-900"
                required={showCustomCategoryInput}
              />
            </div>
          )}

          {showCustomCourseInput && (
            <div id="custom-course-wrapper" className="p-3 bg-red-50 border border-red-100 rounded-lg space-y-1 animate-in fade-in duration-100">
              <label className="block text-xs font-semibold text-red-700 flex items-center">
                <BookOpen className="w-3.5 h-3.5 mr-1" />
                New Course Playlist Title
              </label>
              <input
                id="custom-course-input"
                type="text"
                value={customCourseName}
                onChange={(e) => setCustomCourseName(e.target.value)}
                placeholder="Enter new course title (e.g. Intro to Astrophysics)"
                className="w-full px-3 py-1.5 text-sm border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 bg-white text-neutral-900"
                required={showCustomCourseInput}
              />
            </div>
          )}
        </div>

        {/* Video Description */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            Description Box
          </label>
          <textarea
            id="desc-input-field"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add structured, interesting metadata, links, or timestamps for this video..."
            className="w-full px-3 py-2 text-sm border border-border-custom rounded-lg focus:outline-none focus:border-red-500 bg-neutral-50 focus:bg-white text-neutral-900 resize-none"
          />
        </div>

        {/* Real-time Preview Area if embed exists */}
        {embedInput.trim() && (
          <div id="live-embed-preview" className="p-4 bg-neutral-100 rounded-lg border border-neutral-200">
            <span className="block text-[10px] uppercase font-bold text-neutral-500 mb-2 tracking-wider flex items-center">
              <Tv className="w-3 h-3 mr-1" />
              Real-time Output Preview
            </span>
            <div className="aspect-video w-full rounded overflow-hidden shadow-inner border border-neutral-300 bg-black flex items-center justify-center">
              <div 
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: getEmbedHtml(embedInput) }}
              />
            </div>
          </div>
        )}

        {/* Actions Submit */}
        <div className="pt-2 flex justify-end space-x-3">
          <button
            id="add-form-reset-btn"
            type="button"
            onClick={() => {
              setEmbedInput("");
              setTitle("");
              setDescription("");
              setChannelName("");
              setChannelLink("");
              setCategoryOption("Recent");
              setShowCustomCategoryInput(false);
              setCustomCategory("");
              setCourseOption("none");
              setShowCustomCourseInput(false);
              setCustomCourseName("");
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-border-custom hover:bg-neutral-100 text-neutral-700 cursor-pointer"
          >
            Reset Form
          </button>
          <button
            id="add-form-submit-btn"
            type="submit"
            className="px-5 py-2 rounded-lg text-sm font-bold bg-red-600 hover:bg-red-700 text-white flex items-center space-x-1 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Video</span>
          </button>
        </div>

      </form>
    </div>
  );
}
