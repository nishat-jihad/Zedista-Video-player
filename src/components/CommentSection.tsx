import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  User, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Check, 
  X 
} from "lucide-react";
import { Comment } from "../types";
import { formatRelativeTime } from "../utils/videoUtils";

interface CommentSectionProps {
  videoId: string;
  comments: Comment[];
  username: string;
  onSetUsername: (name: string) => void;
  onAddComment: (videoId: string, text: string) => void;
  onEditComment: (commentId: string, newText: string) => void;
  onDeleteComment: (commentId: string) => void;
}

export default function CommentSection({
  videoId,
  comments,
  username,
  onSetUsername,
  onAddComment,
  onEditComment,
  onDeleteComment
}: CommentSectionProps) {
  const [commentText, setCommentText] = useState("");
  const [userInputName, setUserInputName] = useState("");
  const [showNameForm, setShowNameForm] = useState(false);
  
  // States for comment editing
  const [activeMenuCommentId, setActiveMenuCommentId] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);
  const videoComments = comments
    .filter((c) => c.videoId === videoId)
    .sort((a, b) => b.createdAt - a.createdAt);

  // Close 3-dot menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuCommentId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSetUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInputName.trim()) {
      onSetUsername(userInputName.trim());
      setShowNameForm(false);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!username) {
      setShowNameForm(true);
      return;
    }

    onAddComment(videoId, commentText.trim());
    setCommentText("");
  };

  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
    setActiveMenuCommentId(null);
  };

  const handleSaveEdit = (commentId: string) => {
    if (editText.trim()) {
      onEditComment(commentId, editText.trim());
      setEditingCommentId(null);
      setEditText("");
    }
  };

  return (
    <div id="comment-section-container" className="mt-8 bg-bg-card rounded-xl border border-border-custom p-6">
      <h3 className="text-base font-semibold mb-4 text-neutral-950 flex items-center">
        <span>Comments</span>
        <span className="ml-2 bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded-full font-medium">
          {videoComments.length}
        </span>
      </h3>

      {/* Profile Identifier & Handle Setup */}
      {!username && showNameForm ? (
        <form 
          onSubmit={handleSetUser} 
          id="username-form"
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl space-y-3"
        >
          <div className="flex items-center space-x-2 text-red-700 text-xs font-semibold">
            <User className="w-4 h-4" />
            <span>Set your Profile Username first:</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="username-input"
              type="text"
              placeholder="Enter your name / nickname"
              value={userInputName}
              onChange={(e) => setUserInputName(e.target.value)}
              className="w-full max-w-xs px-3 py-1.5 text-sm border border-red-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:bg-white bg-white text-neutral-900"
              required
            />
            <button
              id="username-submit-btn"
              type="submit"
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Set Name
            </button>
            <button
              id="username-cancel-btn"
              type="button"
              onClick={() => setShowNameForm(false)}
              className="px-3 py-1.5 text-neutral-500 hover:text-neutral-700 text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : username ? (
        <div id="username-display" className="mb-4 text-xs text-text-sub flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
            {username.charAt(0)}
          </div>
          <span>Commenting as <strong className="text-neutral-900 font-semibold">{username}</strong></span>
          <button
            id="username-change-btn"
            onClick={() => {
              setUserInputName(username);
              setShowNameForm(true);
            }}
            className="text-red-600 hover:underline cursor-pointer focus:outline-none font-medium ml-1"
          >
            (change)
          </button>
        </div>
      ) : null}

      {/* Main Comment Input Form */}
      <form onSubmit={handleSubmitComment} id="comment-add-form" className="mb-8 flex items-start space-x-3">
        <div className="w-10 h-10 rounded-full bg-neutral-100 flex-shrink-0 flex items-center justify-center text-neutral-500 border border-neutral-200">
          {username ? (
            <span className="font-bold text-red-600 text-sm uppercase">{username.charAt(0)}</span>
          ) : (
            <User className="w-5 h-5" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <textarea
            id="comment-text-input"
            rows={2}
            placeholder={username ? "Add a public comment..." : "Click to type and set your handle..."}
            value={commentText}
            onClick={() => {
              if (!username && !showNameForm) {
                setShowNameForm(true);
              }
            }}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-border-custom rounded-xl focus:outline-none focus:border-red-500 bg-neutral-50 focus:bg-white text-neutral-900 resize-none transition-colors"
            required
          />
          <div className="flex justify-end">
            <button
              id="comment-submit-btn"
              type="submit"
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>Comment</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </form>

      {/* Comment List */}
      <div id="comments-list-wrapper" className="space-y-4">
        {videoComments.length === 0 ? (
          <p className="text-center text-xs text-text-sub py-6 italic">
            No comments yet. Be the first to start the discussion!
          </p>
        ) : (
          videoComments.map((comment) => {
            const isEditing = editingCommentId === comment.id;

            return (
              <div 
                key={comment.id} 
                id={`comment-item-${comment.id}`}
                className="flex items-start space-x-3 text-sm p-3 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                {/* User Circle */}
                <div className="w-9 h-9 rounded-full bg-neutral-100 flex-shrink-0 flex items-center justify-center text-neutral-700 font-bold border border-neutral-200 uppercase">
                  {comment.username.charAt(0)}
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-neutral-950 text-xs">{comment.username}</span>
                    <span className="text-[10px] text-text-sub">{formatRelativeTime(comment.createdAt)}</span>
                  </div>

                  {isEditing ? (
                    <div className="mt-2 space-y-2">
                      <input
                        id={`comment-edit-input-${comment.id}`}
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-border-custom rounded-lg focus:outline-none focus:border-red-500 bg-white text-neutral-900"
                        required
                      />
                      <div className="flex space-x-2">
                        <button
                          id={`comment-edit-save-btn-${comment.id}`}
                          onClick={() => handleSaveEdit(comment.id)}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold rounded flex items-center space-x-1 cursor-pointer transition-colors"
                        >
                          <Check className="w-3 h-3" />
                          <span>Save</span>
                        </button>
                        <button
                          id={`comment-edit-cancel-btn-${comment.id}`}
                          onClick={() => setEditingCommentId(null)}
                          className="px-3 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-[10px] font-bold rounded flex items-center space-x-1 cursor-pointer transition-colors"
                        >
                          <X className="w-3 h-3" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-800 mt-1 leading-relaxed whitespace-pre-wrap">
                      {comment.text}
                    </p>
                  )}
                </div>

                {/* 3-Dot Options dropdown for editing/deleting */}
                {!isEditing && (
                  <div ref={menuRef} className="relative flex-shrink-0">
                    <button
                      id={`comment-menu-btn-${comment.id}`}
                      onClick={() => setActiveMenuCommentId(
                        activeMenuCommentId === comment.id ? null : comment.id
                      )}
                      className="p-1 rounded-full hover:bg-neutral-200 text-neutral-400 hover:text-neutral-700 cursor-pointer focus:outline-none"
                      aria-label="Comment options"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>

                    {activeMenuCommentId === comment.id && (
                      <div 
                        id={`comment-dropdown-${comment.id}`}
                        className="absolute right-0 mt-1 w-32 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 py-1 text-[11px] text-neutral-800 animate-in fade-in duration-100"
                      >
                        <button
                          id={`comment-edit-btn-${comment.id}`}
                          onClick={() => handleStartEdit(comment)}
                          className="w-full px-3 py-1.5 hover:bg-neutral-100 flex items-center text-left text-blue-600 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5 mr-2 text-blue-500" />
                          <span>Edit</span>
                        </button>
                        <button
                          id={`comment-delete-btn-${comment.id}`}
                          onClick={() => {
                            if (window.confirm("Delete this comment permanently?")) {
                              onDeleteComment(comment.id);
                            }
                            setActiveMenuCommentId(null);
                          }}
                          className="w-full px-3 py-1.5 hover:bg-neutral-100 flex items-center text-left text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-2 text-red-500" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
