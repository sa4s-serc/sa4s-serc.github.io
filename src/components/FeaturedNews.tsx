
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { getAllNewsItems, NewsItem } from '../data/newsLoader';

const MARKDOWN_IMAGE_REGEX = /!\[[^\]]*?\]\(([^)\s]+)[^)]*\)/g;
const HTML_IMAGE_REGEX = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/i;

function extractPreviewImage(description: string): string | undefined {
  const markdownMatch = description.match(MARKDOWN_IMAGE_REGEX);
  if (markdownMatch && markdownMatch.length > 0) {
    const src = markdownMatch[0].match(/!\[[^\]]*?\]\(([^)\s]+)[^)]*\)/);
    if (src?.[1]) return src[1];
  }

  const htmlMatch = description.match(HTML_IMAGE_REGEX);
  if (htmlMatch?.[1]) {
    return htmlMatch[1];
  }

  return undefined;
}

function toPreviewText(description: string): string {
  return description
    .replace(MARKDOWN_IMAGE_REGEX, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/`{1,3}([^`]*)`{1,3}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

const FeaturedNews = () => {
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedNews = async () => {
      try {
        const allItems = await getAllNewsItems();
        setFeaturedNews(allItems.slice(0, 3));
      } catch (error) {
        console.error('Error loading featured news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedNews();
  }, []);

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured News</h2>
          <p className="text-gray-600">Stay updated with our latest research developments and achievements</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-600">Loading featured news...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredNews.map((item, index) => {
              const description = item.description || '';
              const imageSrc = extractPreviewImage(description);
              const previewText = toPreviewText(description);

              return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="text-sm text-sa4s-teal-600 font-medium mb-2">
                  {item.date}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {item.headline}
                </h3>
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={item.headline}
                    className="w-full h-40 object-cover rounded-md border border-gray-200 mb-4"
                    loading="lazy"
                  />
                )}
                {previewText && (
                  <p
                    className="text-gray-600 mb-4 line-clamp-3"
                  >
                    {previewText.slice(0, 140)}{previewText.length > 140 ? '…' : ''}
                  </p>
                )}
                <Link
                  to="/news"
                  className="inline-flex items-center text-sa4s-blue-600 hover:text-sa4s-blue-700 font-medium text-sm group"
                >
                  Read more
                  <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-150" size={16} />
                </Link>
              </div>
            )})}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/news"
            className="inline-flex items-center bg-sa4s-teal-600 hover:bg-sa4s-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-150 group"
          >
            See all News
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-150" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
