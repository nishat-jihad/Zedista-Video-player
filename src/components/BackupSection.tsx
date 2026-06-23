import React, { useState, useRef } from "react";
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle,
  FileCode
} from "lucide-react";
import { Video, Comment, Course } from "../types";

interface BackupSectionProps {
  videos: Video[];
  comments: Comment[];
  courses: Course[];
  username: string;
  onRestoreData: (restored: {
    videos: Video[];
    comments: Comment[];
    courses: Course[];
    username: string;
  }) => void;
  onResetToDefaults: () => void;
}

export default function BackupSection({
  videos,
  comments,
  courses,
  username,
  onRestoreData,
  onResetToDefaults
}: BackupSectionProps) {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBackupExport = () => {
    try {
      const dataToBackup = {
        videos,
        comments,
        courses,
        username,
        exportedAt: Date.now(),
        appSignature: "zedistra_static_database"
      };

      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(dataToBackup, null, 2)
      )}`;
      
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", jsonString);
      downloadAnchor.setAttribute("download", `zedistra_backup_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setSuccessMsg("Database export completed successfully! File downloaded.");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg("Failed to generate backup JSON file.");
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  const handleBackupImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        
        // Validate imported schema
        if (
          !parsed ||
          typeof parsed !== "object" ||
          !Array.isArray(parsed.videos) ||
          !Array.isArray(parsed.comments) ||
          !Array.isArray(parsed.courses)
        ) {
          throw new Error("Invalid schema format. Missing videos, comments, or courses lists.");
        }

        onRestoreData({
          videos: parsed.videos,
          comments: parsed.comments,
          courses: parsed.courses,
          username: parsed.username || ""
        });

        setSuccessMsg("Database successfully synchronized and restored! All items updated.");
        setErrorMsg("");
        setTimeout(() => setSuccessMsg(""), 4000);
      } catch (err: any) {
        setErrorMsg(err.message || "Invalid JSON backup file selected.");
        setSuccessMsg("");
      }
    };
    reader.readAsText(file);
    // Clear input so same file can be uploaded again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the entire database to original factory defaults? This will erase all your custom uploads, playlists, and comments."
      )
    ) {
      onResetToDefaults();
      setSuccessMsg("Database successfully reset to standard educational seed items!");
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  return (
    <div id="backup-section-container" className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Title block */}
      <div className="border-b border-border-custom pb-5">
        <h2 className="text-xl font-bold text-neutral-900 flex items-center">
          <Database className="w-6 h-6 mr-2 text-red-600" />
          <span>Database Synchronization & Local Backups</span>
        </h2>
        <p className="text-xs text-text-sub mt-1">
          This platform operates strictly on client-side storage for local privacy. You can synchronize datasets between different devices or browsers using standard JSON database backup sheets.
        </p>
      </div>

      {/* Success / Error Toast notification blocks */}
      {successMsg && (
        <div id="backup-toast-success" className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs flex items-center space-x-2 animate-in slide-in-from-top-1">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div id="backup-toast-error" className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center space-x-2 animate-in slide-in-from-top-1">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Grid of actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-neutral-900">
        
        {/* Export Card */}
        <div className="bg-bg-card p-6 border border-border-custom rounded-xl flex flex-col justify-between space-y-4 shadow-sm">
          <div className="space-y-2">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm">Download Backup Sheet</h3>
            <p className="text-xs text-text-sub leading-relaxed font-light">
              Export all your videos, course structures, custom comments, and user state as a compact <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-[10px]">.json</code> database file.
            </p>
          </div>

          <button
            id="backup-export-btn"
            onClick={handleBackupExport}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg cursor-pointer transition-colors flex items-center justify-center space-x-1.5 shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .json file</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="bg-bg-card p-6 border border-border-custom rounded-xl flex flex-col justify-between space-y-4 shadow-sm">
          <div className="space-y-2">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm">Import Backup Sheet</h3>
            <p className="text-xs text-text-sub leading-relaxed font-light">
              Upload a previously exported database sheet to completely restore your video library tracks, course lists, and custom profiles.
            </p>
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleBackupImport}
              className="hidden"
            />
            <button
              id="backup-import-btn"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-lg cursor-pointer transition-colors flex items-center justify-center space-x-1.5 shadow"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Select sheet file</span>
            </button>
          </div>
        </div>

      </div>

      {/* Danger Zone Factory Defaults */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-neutral-900 space-y-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-sm text-red-800">Danger Zone</h3>
            <p className="text-xs text-red-700 mt-1 leading-relaxed">
              Resetting elements returns the local directory database to default academic training lectures. Your comments, likes, custom course syllabuses, and uploads will be wiped out.
            </p>
          </div>
        </div>

        <button
          id="backup-reset-defaults-btn"
          onClick={handleReset}
          className="py-2 px-4 border border-red-300 hover:bg-red-100 text-red-700 font-bold text-xs rounded-lg cursor-pointer transition-colors flex items-center space-x-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Factory Defaults</span>
        </button>
      </div>

    </div>
  );
}
