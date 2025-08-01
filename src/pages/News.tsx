import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { getAllNewsItems, NewsItem } from '../data/newsLoader';

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const items = await getAllNewsItems();
        setNewsItems(items);
        if (items.length > 0) {
          setSelectedItem(items[0]);
        }
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sa4s-teal-50 to-sa4s-blue-50 py-16">
        <div className="container mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-sa4s-teal-600 hover:text-sa4s-teal-700 mb-6 transition-colors duration-150"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest News
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Stay updated with the latest developments, achievements, and announcements from the SA4S research group.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-gray-600">Loading news...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Headlines list */}
              <div className="lg:col-span-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">All News</h2>
                <div className="space-y-4">
                  {newsItems.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedItem(item)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-150 ${
                        selectedItem === item
                          ? 'border-sa4s-teal-600 bg-sa4s-teal-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center text-sm text-sa4s-teal-600 font-medium mb-2">
                        <Calendar size={14} className="mr-2" />
                        {item.date}
                      </div>
                      <h3 className="font-medium text-gray-900 line-clamp-2">
                        {item.headline}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column - Expanded preview */}
              <div className="lg:col-span-2">
                {selectedItem && (
                  <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                    <div className="flex items-center text-sm text-sa4s-teal-600 font-medium mb-4">
                      <Calendar size={16} className="mr-2" />
                      {selectedItem.date}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {selectedItem.headline}
                    </h1>
                    {selectedItem.description && (
                      <div className="prose max-w-none">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                          {selectedItem.description}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
