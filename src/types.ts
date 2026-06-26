export interface Video {
  id: string;
  embedCode: string; // iframe embed snippet or raw video URL
  title: string;
  description: string;
  channelName: string;
  channelLink?: string; // Link to the creator's channel
  category: string; // Current category (e.g., 'Recent', 'Old', or custom)
  originalCategory: string; // The category it was originally uploaded to
  createdAt: number; // timestamp in ms
  likes: number;
  duration?: string;
}

export interface Comment {
  id: string;
  videoId: string;
  username: string;
  text: string;
  createdAt: number; // timestamp
}

export interface Course {
  id: string;
  name: string;
  description: string;
  videoIds: string[]; // List of video IDs in the playlist/course
  createdAt: number;
}

export interface UserProfile {
  username: string;
  likedVideoIds: string[];
  favoriteVideoIds: string[];
}

export interface VideoNote {
  id: string;
  videoId: string;
  timestamp: string; // e.g. "12:34"
  text: string;
  createdAt: number;
}
