import { Video } from "../types";

/**
 * Extracts a YouTube Video ID from various YouTube URL formats.
 */
export function extractYouTubeId(urlOrEmbed: string): string | null {
  if (!urlOrEmbed) return null;

  // Check if it is an iframe embed code and extract src
  if (urlOrEmbed.includes("<iframe")) {
    const srcMatch = urlOrEmbed.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      return extractYouTubeId(srcMatch[1]);
    }
  }

  // Handle standard YouTube URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = urlOrEmbed.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }

  return null;
}

/**
 * Extracts a Vimeo ID from various Vimeo formats.
 */
export function extractVimeoId(urlOrEmbed: string): string | null {
  if (!urlOrEmbed) return null;

  if (urlOrEmbed.includes("<iframe")) {
    const srcMatch = urlOrEmbed.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      return extractVimeoId(srcMatch[1]);
    }
  }

  const regExp = /(?:vimeo)\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
  const match = urlOrEmbed.match(regExp);
  if (match && match[3]) {
    return match[3];
  }

  return null;
}

/**
 * Generates an iframe embed URL or standard player HTML based on the input string.
 * Supports iframe code directly, raw URLs (YouTube, Vimeo, direct MP4), and fallbacks.
 */
export function getEmbedHtml(urlOrEmbed: string): string {
  if (!urlOrEmbed) return "";

  let trimmed = urlOrEmbed.trim();

  // Helper to clean ONLY mute/muted params — NOT autoplay, which browsers need for permission
  const cleanUrlParams = (url: string): string => {
    try {
      const hasNoProtocol = url.startsWith("//");
      const urlToParse = hasNoProtocol ? "https:" + url : url;
      const parsedUrl = new URL(urlToParse);

      // Only remove mute/muted — keep autoplay intact so browser audio policy is respected
      parsedUrl.searchParams.delete("mute");
      parsedUrl.searchParams.delete("muted");

      let finalUrl = parsedUrl.toString();
      if (hasNoProtocol && finalUrl.startsWith("https://")) {
        finalUrl = finalUrl.substring(6);
      }
      return finalUrl;
    } catch (e) {
      let clean = url;
      clean = clean.replace(/([?&])mute=[^&]*/gi, "");
      clean = clean.replace(/([?&])muted=[^&]*/gi, "");
      clean = clean.replace(/&&+/g, "&").replace(/\?&/g, "?").replace(/[?&]$/g, "");
      return clean;
    }
  };

  // If it's already an iframe, clean its src and return it
  if (trimmed.startsWith("<iframe")) {
    let clean = trimmed;

    // Remove 'muted' attribute from iframe tag (but NOT autoplay — keep audio working)
    clean = clean.replace(/\bmuted\b/gi, "");
    clean = clean.replace(/\b(muted|mute)=["'][^"']*["']/gi, "");

    // Extract src attribute and clean it (remove mute/muted only)
    const srcMatch = clean.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      const originalSrc = srcMatch[1];
      const cleanedSrc = cleanUrlParams(originalSrc);
      clean = clean.replace(originalSrc, cleanedSrc);
    }

    if (!clean.includes("width=")) {
      clean = clean.replace("<iframe", '<iframe width="100%" height="100%"');
    } else {
      clean = clean.replace(/width=["']\d+["']/gi, 'width="100%"');
      clean = clean.replace(/height=["']\d+["']/gi, 'height="100%"');
    }

    if (!clean.toLowerCase().includes("allowfullscreen")) {
      clean = clean.replace(">", " allowfullscreen>");
    }

    // Ensure allow attribute includes all needed permissions for audio/video
    if (!clean.toLowerCase().includes("allow=")) {
      clean = clean.replace("<iframe", '<iframe allow="autoplay; encrypted-media; picture-in-picture; fullscreen"');
    } else {
      // Make sure autoplay and encrypted-media are in the allow attribute
      clean = clean.replace(/allow=["']([^"']+)["']/i, (match, p1) => {
        let perms = p1;
        if (!perms.toLowerCase().includes("autoplay")) perms += "; autoplay";
        if (!perms.toLowerCase().includes("encrypted-media")) perms += "; encrypted-media";
        if (!perms.toLowerCase().includes("picture-in-picture")) perms += "; picture-in-picture";
        return `allow="${perms}"`;
      });
    }

    // Remove any sandbox attribute that would block audio
    clean = clean.replace(/\bsandbox=["'][^"']*["']/gi, "");

    return clean;
  }

  // Handle YouTube links
  const ytId = extractYouTubeId(trimmed);
  if (ytId) {
    return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${ytId}?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="w-full h-full rounded-lg shadow-sm"></iframe>`;
  }

  // Handle Vimeo links
  const vimeoId = extractVimeoId(trimmed);
  if (vimeoId) {
    return `<iframe width="100%" height="100%" src="https://player.vimeo.com/video/${vimeoId}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen class="w-full h-full rounded-lg shadow-sm"></iframe>`;
  }

  // Handle direct video files (.mp4, .webm, .ogg)
  const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(trimmed);
  if (isDirectVideo) {
    return `<video controls class="w-full h-full rounded-lg shadow-sm bg-black" src="${trimmed}"></video>`;
  }

  // Fallback: If it's a regular URL, try to frame it
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    const cleanedUrl = cleanUrlParams(trimmed);
    return `<iframe width="100%" height="100%" src="${cleanedUrl}" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen class="w-full h-full rounded-lg shadow-sm"></iframe>`;
  }

  // Ultimate raw fallback
  return trimmed;
}

/**
 * Gets a video thumbnail URL.
 */
export function getVideoThumbnail(urlOrEmbed: string, seedIndex: number = 0): string {
  const ytId = extractYouTubeId(urlOrEmbed);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }

  const gradients = [
    "from-red-500 to-orange-500",
    "from-rose-500 to-purple-600",
    "from-coral-500 to-red-600",
    "from-pink-500 to-rose-600",
    "from-amber-500 to-red-500"
  ];
  const selectedGradient = gradients[seedIndex % gradients.length];
  return `gradient:${selectedGradient}`;
}

/**
 * Deterministically generates or resolves a channel avatar picture.
 */
export function getChannelAvatarUrl(channelLink: string | undefined, channelName: string): string {
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(channelName || "V")}&background=E11D48&color=ffffff&size=128&bold=true`;

  if (!channelLink) {
    return defaultAvatar;
  }

  const trimmed = channelLink.trim();
  if (!trimmed) {
    return defaultAvatar;
  }

  const handleMatch = trimmed.match(/@([\w\.\-]+)/);
  if (handleMatch && handleMatch[1]) {
    return `https://unavatar.io/youtube/${handleMatch[1]}`;
  }

  const cMatch = trimmed.match(/youtube\.com\/(c|user|channel)\/([\w\.\-]+)/);
  if (cMatch && cMatch[2]) {
    return `https://unavatar.io/youtube/${cMatch[2]}`;
  }

  if (trimmed.startsWith("@")) {
    return `https://unavatar.io/youtube/${trimmed.substring(1)}`;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (/\.(jpg|jpeg|png|webp|gif|svg)/i.test(trimmed)) {
      return trimmed;
    }
  }

  return defaultAvatar;
}

/**
 * Processes videos to check and handle the "category expiration" rule.
 */
export function processCategoryAging(videos: Video[]): { updatedVideos: Video[]; hasChanges: boolean } {
  let hasChanges = false;
  const THREE_HOURS = 3 * 60 * 60 * 1000;
  const now = Date.now();

  const updatedVideos = videos.map((video) => {
    if (video.category === "Recent" && now - video.createdAt > THREE_HOURS) {
      hasChanges = true;
      return {
        ...video,
        category: "Old",
      };
    }
    return video;
  });

  return { updatedVideos, hasChanges };
}

/**
 * Formats timestamps to friendly relative time.
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  if (diff < 0) return "Just now";

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ${days === 1 ? "day" : "days"} ago`;

  const months = Math.floor(days / 30);
  return `${months} ${months === 1 ? "month" : "months"} ago`;
}
