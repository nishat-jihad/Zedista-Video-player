import { Video } from "../types";

/**
 * Standard Levenshtein distance for typo tolerance
 */
export function getLevenshteinDistance(a: string, b: string): number {
  const tmp = [];
  let i, j, val;
  for (i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      val = a[i - 1] === b[j - 1] ? 0 : 1;
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1, // deletion
        tmp[i][j - 1] + 1, // insertion
        tmp[i - 1][j - 1] + val // substitution
      );
    }
  }
  return tmp[a.length][b.length];
}

/**
 * Searches and ranks videos based on the search query.
 * Ranking layers:
 * 1. Exact match on Title (case-insensitive) -> Score +100
 * 2. Prefix match on Title -> Score +50
 * 3. Title contains whole query -> Score +35
 * 4. Title contains query words -> Score +15 per word
 * 5. Category matches exactly -> Score +40
 * 6. Channel name matches exactly -> Score +30
 * 7. Description contains whole query -> Score +10
 * 8. Typo-tolerant fuzzy matches (Levenshtein distance <= 2 for words >= 4 chars) -> Score +5
 */
export function searchAndRankVideos(videos: Video[], query: string): Video[] {
  if (!query || query.trim() === "") {
    // Return sorted by createdAt descending as default
    return [...videos].sort((a, b) => b.createdAt - a.createdAt);
  }

  const cleanQuery = query.trim().toLowerCase();
  const queryWords = cleanQuery.split(/\s+/).filter(w => w.length > 0);

  interface RankedVideo {
    video: Video;
    score: number;
  }

  const ranked: RankedVideo[] = videos.map((video) => {
    let score = 0;
    const title = video.title.toLowerCase();
    const desc = video.description.toLowerCase();
    const category = video.category.toLowerCase();
    const channel = video.channelName.toLowerCase();

    // 1. Exact title match
    if (title === cleanQuery) {
      score += 100;
    }

    // 2. Title prefix match
    if (title.startsWith(cleanQuery)) {
      score += 50;
    }

    // 3. Title contains full query
    if (title.includes(cleanQuery)) {
      score += 35;
    }

    // 4. Title contains query words
    queryWords.forEach((word) => {
      if (title.includes(word)) {
        score += 15;
      }
    });

    // 5. Category match
    if (category === cleanQuery) {
      score += 40;
    } else if (category.includes(cleanQuery)) {
      score += 20;
    }

    // 6. Channel match
    if (channel === cleanQuery) {
      score += 30;
    } else if (channel.includes(cleanQuery)) {
      score += 15;
    }

    // 7. Description contains full query
    if (desc.includes(cleanQuery)) {
      score += 10;
    }

    // 8. Typo-tolerance fallback for longer query words
    queryWords.forEach((qWord) => {
      if (qWord.length >= 4) {
        // Check title words
        const titleWords = title.split(/\s+/).filter(w => w.length >= 4);
        titleWords.forEach((tWord) => {
          if (getLevenshteinDistance(qWord, tWord) <= 2) {
            score += 5;
          }
        });

        // Check channel words
        const channelWords = channel.split(/\s+/).filter(w => w.length >= 4);
        channelWords.forEach((cWord) => {
          if (getLevenshteinDistance(qWord, cWord) <= 2) {
            score += 3;
          }
        });
      }
    });

    return { video, score };
  });

  // Filter out zero-score matches (if query is not empty, only return matching items)
  // But wait, to be safe and responsive, if no videos have a score > 0, we can return empty.
  return ranked
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.video.createdAt - a.video.createdAt)
    .map((item) => item.video);
}
