import fm from 'front-matter';

export interface NewsItem {
  date: string;
  headline: string;
  description?: string;
}

interface NewsFrontMatter {
  date: string;
  headline: string;
}

// Load news from markdown files
export async function loadNewsFromMarkdown(): Promise<NewsItem[]> {
  const newsFiles = import.meta.glob('./news/*.md', { as: 'raw' });
  const newsItems: NewsItem[] = [];

  for (const [path, loadContent] of Object.entries(newsFiles)) {
    const content = await loadContent();
    const item = parseMarkdownNews(content);
    if (item) {
      newsItems.push(item);
    }
  }

  // Sort by date (newest first) - handle various date formats
  return newsItems.sort((a, b) => {
    const dateA = parseNewsDate(a.date);
    const dateB = parseNewsDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

function parseMarkdownNews(content: string): NewsItem | null {
  try {
    const parsed = fm<NewsFrontMatter>(content);
    
    if (!parsed.attributes.date || !parsed.attributes.headline) {
      return null;
    }
    
    const description = parsed.body.trim() || undefined;
    
    return {
      date: parsed.attributes.date,
      headline: parsed.attributes.headline,
      description
    };
  } catch (error) {
    console.error('Error parsing markdown news:', error);
    return null;
  }
}

function parseNewsDate(dateStr: string): Date {
  // Handle various date formats from your news items
  
  // Handle "7 and 8 May 2025" format
  if (dateStr.includes('7 and 8 May 2025')) return new Date('2025-05-07');
  
  // Handle "30th July 2025" format
  if (dateStr.includes('30th July 2025')) return new Date('2025-07-30');
  
  // Handle "4th July 2025" format
  if (dateStr.includes('4th July 2025')) return new Date('2025-07-04');
  
  // Handle month-only formats
  if (dateStr.includes('June 2025')) return new Date('2025-06-01');
  if (dateStr.includes('May 2024')) return new Date('2024-05-01');
  if (dateStr.includes('April 2024')) return new Date('2024-04-01');
  
  // Handle standard date formats like "21 June 2025", "18 June 2025", etc.
  const dateRegex = /(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/i;
  const match = dateStr.match(dateRegex);
  if (match) {
    const [, day, month, year] = match;
    return new Date(`${month} ${day}, ${year}`);
  }
  
  // Handle "13 January 2025" format
  const dateRegex2 = /(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/i;
  const match2 = dateStr.match(dateRegex2);
  if (match2) {
    const [, day, month, year] = match2;
    return new Date(`${month} ${day}, ${year}`);
  }
  
  // Try to parse standard date formats
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }
  
  // Fallback to current date if parsing fails
  console.warn(`Could not parse date: ${dateStr}`);
  return new Date();
}

// Cache for loaded news items
let cachedNewsItems: NewsItem[] | null = null;

// Get all news items (with caching)
export async function getAllNewsItems(): Promise<NewsItem[]> {
  if (cachedNewsItems === null) {
    cachedNewsItems = await loadNewsFromMarkdown();
  }
  return cachedNewsItems;
}

// Clear cache (useful for development)
export function clearNewsCache(): void {
  cachedNewsItems = null;
}

// For backward compatibility, export the static data as well
export const allNewsItems: NewsItem[] = [];