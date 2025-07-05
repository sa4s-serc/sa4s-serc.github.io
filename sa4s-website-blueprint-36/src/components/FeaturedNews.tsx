
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItem {
  date: string;
  title: string;
  excerpt: string;
}

const FeaturedNews = () => {
  const featuredNews: NewsItem[] = [
    {
      date: 'Dec 2024',
      title: 'New ICSE paper accepted on adaptive microservices architecture',
      excerpt: 'Our latest research on self-healing distributed systems gets recognized at top venue.'
    },
    {
      date: 'Nov 2024',
      title: 'SA4S team presents at IEEE International Conference',
      excerpt: 'Three papers presented on energy-efficient computing and ML-driven optimization.'
    },
    {
      date: 'Oct 2024',
      title: 'Collaboration with Microsoft Research India announced',
      excerpt: 'Joint project on sustainable cloud computing technologies begins.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured News</h2>
          <p className="text-gray-600">Stay updated with our latest research developments and achievements</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {featuredNews.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="text-sm text-sa4s-teal-600 font-medium mb-2">
                {item.date}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {item.excerpt}
              </p>
              <Link 
                to="/news"
                className="inline-flex items-center text-sa4s-blue-600 hover:text-sa4s-blue-700 font-medium text-sm group"
              >
                Read more
                <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-150" size={16} />
              </Link>
            </div>
          ))}
        </div>
        
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
