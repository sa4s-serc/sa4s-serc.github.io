
import { useState } from 'react';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  thumbnail: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Adaptive Systems in Cloud Computing',
    excerpt: 'Exploring how self-adaptive systems can revolutionize cloud infrastructure management through intelligent resource allocation and automated scaling.',
    date: '2024-03-15',
    author: 'Dr. Rajesh Kumar',
    category: 'Cloud Computing',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Energy-Efficient Machine Learning',
    excerpt: 'Recent breakthroughs in reducing energy consumption for ML workloads while maintaining performance benchmarks.',
    date: '2024-03-10',
    author: 'Priya Sharma',
    category: 'Green Computing',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Context-Aware Task Scheduling',
    excerpt: 'How contextual information can improve task scheduling algorithms in distributed computing environments.',
    date: '2024-03-05',
    author: 'Dr. Sarah Chen',
    category: 'Distributed Systems',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '4',
    title: 'Self-Healing Network Architectures',
    excerpt: 'Implementation strategies for networks that automatically detect and recover from failures using ML techniques.',
    date: '2024-02-28',
    author: 'Vikram Singh',
    category: 'Network Systems',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '5',
    title: 'Sustainable Computing Practices',
    excerpt: 'Best practices for developing environmentally conscious software systems that minimize carbon footprint.',
    date: '2024-02-20',
    author: 'Dr. Michael Brown',
    category: 'Green Computing',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '6',
    title: 'AI-Driven System Optimization',
    excerpt: 'Leveraging artificial intelligence to optimize system performance and resource utilization in real-time.',
    date: '2024-02-15',
    author: 'Lisa Zhang',
    category: 'AI Systems',
    thumbnail: '/placeholder.svg'
  }
];

const categories = ['All', 'Cloud Computing', 'Green Computing', 'Distributed Systems', 'Network Systems', 'AI Systems'];

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sa4s-teal-50 to-sa4s-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blogs
          </h1>
          <p className="text-xl text-gray-600">
            Insights, updates, and discoveries from our research community.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                Filter by category: {selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Masonry Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar size={16} className="mr-1" />
                  <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                  <User size={16} className="mr-1" />
                  <span>{post.author}</span>
                </div>
                <Button className="w-full bg-sa4s-teal-600 hover:bg-sa4s-teal-700">
                  Read More
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Blogs;
