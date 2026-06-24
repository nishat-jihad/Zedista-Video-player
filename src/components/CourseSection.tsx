import React, { useState } from "react";
import { 
  BookOpen, 
  Play, 
  Trash2, 
  Plus, 
  ChevronLeft, 
  Video as VideoIcon, 
  Layers, 
  ExternalLink 
} from "lucide-react";
import { Course, Video } from "../types";
import { getVideoThumbnail } from "../utils/videoUtils";

interface CourseSectionProps {
  courses: Course[];
  videos: Video[];
  selectedCourseId: string | null;
  onSelectCourse: (id: string | null) => void;
  onCreateCourse: (name: string, description: string) => void;
  onDeleteCourse: (id: string) => void;
  onRemoveVideoFromCourse: (courseId: string, videoId: string) => void;
  onPlayVideo: (id: string) => void;
}

export default function CourseSection({
  courses,
  videos,
  selectedCourseId,
  onSelectCourse,
  onCreateCourse,
  onDeleteCourse,
  onRemoveVideoFromCourse,
  onPlayVideo
}: CourseSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");

  const activeCourse = courses.find((c) => c.id === selectedCourseId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseName.trim()) {
      onCreateCourse(courseName.trim(), courseDesc.trim());
      setCourseName("");
      setCourseDesc("");
      setShowAddForm(false);
    }
  };

  // List mode: All courses grid
  if (!activeCourse) {
    return (
      <div id="course-section-list" className="space-y-6 animate-in fade-in duration-200">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-custom pb-5">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-red-600" />
              <span>Learning Courses & Playlists</span>
            </h2>
            <p className="text-xs text-text-sub mt-1">
              Organize your video inventory into curriculum courses or targeted training series.
            </p>
          </div>
          <button
            id="course-create-toggle-btn"
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg flex items-center space-x-1.5 shadow hover:shadow-md cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Course</span>
          </button>
        </div>

        {/* Quick Add Form card */}
        {showAddForm && (
          <form 
            onSubmit={handleSubmit} 
            id="course-create-form"
            className="bg-bg-card p-6 border border-border-custom rounded-xl shadow-md space-y-4 max-w-lg animate-in slide-in-from-top-2 duration-150"
          >
            <h3 className="font-semibold text-sm text-neutral-900">Configure New Curriculum Course</h3>
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block font-medium text-neutral-500 uppercase tracking-wider">Course Name *</label>
                <input
                  id="course-name-input"
                  type="text"
                  placeholder="e.g. Master React in 7 Days"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-3 py-2 border border-border-custom rounded-lg focus:outline-none focus:border-red-500 text-sm bg-neutral-50 focus:bg-white text-neutral-900"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block font-medium text-neutral-500 uppercase tracking-wider">Course Syllabus / Description</label>
                <textarea
                  id="course-desc-input"
                  rows={3}
                  placeholder="Write a brief synopsis of the lessons covered in this curriculum series..."
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-border-custom rounded-lg focus:outline-none focus:border-red-500 text-sm bg-neutral-50 focus:bg-white text-neutral-900 resize-none"
                />
              </div>
            </div>
            <div className="flex space-x-2 pt-2 text-xs">
              <button
                id="course-submit-btn"
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg cursor-pointer transition-colors"
              >
                Create Syllabus
              </button>
              <button
                id="course-cancel-btn"
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-border-custom rounded-lg hover:bg-neutral-100 text-neutral-700 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Courses Listing Grid */}
        {courses.length === 0 ? (
          <div id="no-courses-empty-state" className="p-12 text-center border border-dashed border-border-custom rounded-xl bg-bg-card">
            <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" strokeWidth={1} />
            <h4 className="font-semibold text-sm text-neutral-800">No Playlists or Courses Set Up</h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
              Add video tracks to playlists while creating videos, or establish an empty course structure above to build your curriculum list.
            </p>
          </div>
        ) : (
          <div id="courses-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              // Find the first video of the course to use as thumbnail
              const firstVideo = videos.find((v) => course.videoIds.includes(v.id));
              const firstVideoYtId = firstVideo ? firstVideo.embedCode : null;
              
              return (
                <div 
                  key={course.id}
                  id={`course-card-${course.id}`}
                  className="group relative flex flex-col bg-bg-card border border-border-custom rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
                >
                  {/* Visual Folder Indicator */}
                  <div 
                    onClick={() => onSelectCourse(course.id)}
                    className="relative aspect-video w-full bg-neutral-900 cursor-pointer overflow-hidden"
                  >
                    {firstVideo ? (
                      <div className="w-full h-full">
                        {firstVideo.embedCode.includes("youtube.com") || firstVideo.embedCode.includes("youtu.be") ? (
                          <img
                            src={`https://img.youtube.com/vi/${getVideoThumbnail(firstVideo.embedCode).split("vi/")[1]?.split("/")[0]}/hqdefault.jpg`}
                            alt={course.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-tr from-red-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm">
                            <Layers className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-neutral-800 to-neutral-700 flex items-center justify-center text-white text-xs font-semibold">
                        Empty Course Shell
                      </div>
                    )}

                    {/* YouTube Playlist Panel Overlay */}
                    <div className="absolute right-0 top-0 bottom-0 w-2/5 bg-black/85 backdrop-blur-xs text-white flex flex-col items-center justify-center p-3 text-center border-l border-white/10">
                      <Layers className="w-5 h-5 mb-1 text-red-500" />
                      <span className="font-bold text-lg leading-none">{course.videoIds.length}</span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-neutral-400 mt-1">videos</span>
                    </div>
                  </div>

                  {/* Course Details Panel */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 
                      onClick={() => onSelectCourse(course.id)}
                      className="font-bold text-sm text-neutral-900 cursor-pointer hover:text-red-600 line-clamp-1 transition-colors"
                      title={course.name}
                    >
                      {course.name}
                    </h3>
                    <p className="text-xs text-text-sub mt-1 flex-1 line-clamp-2 leading-relaxed">
                      {course.description || "No curriculum description configured."}
                    </p>

                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <button
                        id={`course-view-syllabus-btn-${course.id}`}
                        onClick={() => onSelectCourse(course.id)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer flex items-center space-x-1"
                      >
                        <span>Syllabus ({course.videoIds.length} vids)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <button
                        id={`course-delete-btn-${course.id}`}
                        onClick={() => {
                          if (window.confirm(`Delete the course playlist "${course.name}"? The videos in the course will not be deleted.`)) {
                            onDeleteCourse(course.id);
                          }
                        }}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded-full hover:bg-neutral-100 cursor-pointer transition-colors"
                        title="Delete Course Shell"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Detail mode: Detailed course listing (curriculum syllabus style)
  const courseVideos = activeCourse.videoIds
    .map((vidId) => videos.find((v) => v.id === vidId))
    .filter((v): v is Video => !!v);

  return (
    <div id="course-section-detail" className="space-y-6 animate-in fade-in duration-200">
      
      {/* Return Navigation button */}
      <button
        id="course-back-to-list-btn"
        onClick={() => onSelectCourse(null)}
        className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-border-custom rounded-lg flex items-center space-x-1 cursor-pointer transition-all focus:outline-none"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Courses</span>
      </button>

      {/* Two-Column Course View (Left: course card details, Right: list of lessons) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Course summary info */}
        <div className="lg:col-span-1 bg-gradient-to-b from-neutral-900 to-neutral-800 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between self-start lg:sticky lg:top-20">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-bold tracking-tight">{activeCourse.name}</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {activeCourse.description || "No description syllabus configured for this course."}
            </p>

            <div className="text-xs text-neutral-400 space-y-1.5 pt-4 border-t border-white/10">
              <div className="flex justify-between">
                <span>Total Lectures</span>
                <span className="font-bold text-white">{activeCourse.videoIds.length} lectures</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-red-400 font-semibold uppercase text-[10px] tracking-wide bg-red-600/10 px-1.5 py-0.5 rounded border border-red-500/20">Active Syllabus</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {courseVideos.length > 0 ? (
              <button
                id="course-start-first-video-btn"
                onClick={() => onPlayVideo(courseVideos[0].id)}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-md hover:shadow-lg cursor-pointer transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Begin Lecture Course</span>
              </button>
            ) : (
              <button
                disabled
                className="w-full py-3 bg-neutral-700 text-neutral-400 font-bold text-sm rounded-xl flex items-center justify-center cursor-not-allowed opacity-60"
              >
                No Lectures Loaded
              </button>
            )}
          </div>
        </div>

        {/* Right Col: Sorted video lists */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-neutral-900 flex items-center">
            <VideoIcon className="w-5 h-5 mr-1.5 text-red-600" />
            <span>Course Lecture List ({courseVideos.length} classes)</span>
          </h3>

          {courseVideos.length === 0 ? (
            <div id="course-no-lectures-empty" className="p-8 text-center border border-dashed border-border-custom rounded-xl bg-bg-card">
              <VideoIcon className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <p className="text-xs text-neutral-500">
                This course syllabus has no lessons yet. Save existing videos to this course via their home feed dropdown options!
              </p>
            </div>
          ) : (
            <div id="course-lectures-list" className="space-y-3">
              {courseVideos.map((video, index) => (
                <div
                  key={video.id}
                  id={`course-lecture-row-${video.id}`}
                  className="group flex items-center bg-bg-card border border-border-custom rounded-xl p-3 hover:bg-neutral-50 hover:shadow-sm transition-all text-neutral-900"
                >
                  {/* Sequence Count */}
                  <span className="w-8 text-center font-mono font-bold text-xs text-neutral-400 group-hover:text-red-600 transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Thumbnail snippet */}
                  <div 
                    onClick={() => onPlayVideo(video.id)}
                    className="relative w-24 sm:w-28 aspect-video bg-neutral-900 rounded overflow-hidden cursor-pointer flex-shrink-0 border border-neutral-200"
                  >
                    {video.embedCode.includes("youtube.com") || video.embedCode.includes("youtu.be") ? (
                      <img
                        src={`https://img.youtube.com/vi/${getVideoThumbnail(video.embedCode).split("vi/")[1]?.split("/")[0]}/hqdefault.jpg`}
                        alt={video.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center text-white">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Syllabus Card Text content */}
                  <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                    <h4 
                      onClick={() => onPlayVideo(video.id)}
                      className="font-semibold text-xs sm:text-sm text-neutral-900 hover:text-red-600 cursor-pointer truncate transition-colors"
                      title={video.title}
                    >
                      {video.title}
                    </h4>
                    <p className="text-[11px] text-text-sub mt-0.5 truncate">{video.channelName}</p>
                    <div className="flex items-center space-x-2 text-[10px] text-text-sub mt-1">
                      <span className="bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-medium">{video.category}</span>
                      <span>•</span>
                      <span>{video.likes} likes</span>
                    </div>
                  </div>

                  {/* Expel Video from course trigger */}
                  <button
                    id={`course-remove-video-btn-${video.id}`}
                    onClick={() => {
                      if (window.confirm(`Remove "${video.title}" from this course curriculum? (This will not delete the video itself).`)) {
                        onRemoveVideoFromCourse(activeCourse.id, video.id);
                      }
                    }}
                    className="p-1.5 rounded-full text-neutral-400 hover:text-red-600 hover:bg-neutral-100 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all cursor-pointer flex-shrink-0"
                    title="Remove lecture from syllabus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
