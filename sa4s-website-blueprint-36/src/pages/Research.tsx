
import { ArrowRight, Cpu, Leaf, Network } from 'lucide-react';

interface ResearchTheme {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const researchThemes: ResearchTheme[] = [
  {
    id: 'adaptive-systems',
    icon: <Cpu size={80} className="text-sa4s-teal-600" />,
    title: 'Adaptive Systems',
    description: 'Developing intelligent systems that automatically adapt to changing environments, workloads, and user requirements through machine learning and feedback mechanisms.'
  },
  {
    id: 'sustainable-computing',
    icon: <Leaf size={80} className="text-sa4s-blue-600" />,
    title: 'Sustainable Computing',
    description: 'Creating energy-efficient computing solutions that minimize environmental impact while maintaining high performance and reliability standards.'
  },
  {
    id: 'distributed-systems',
    icon: <Network size={80} className="text-sa4s-teal-600" />,
    title: 'Distributed Systems',
    description: 'Designing resilient distributed architectures that can scale dynamically and self-heal from failures in cloud and edge computing environments.'
  }
];

const Research = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sa4s-teal-50 to-sa4s-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Research
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Our research focuses on developing intelligent, adaptive systems that can evolve with changing requirements while maintaining sustainability and efficiency.
          </p>
        </div>
      </div>

      {/* Three-Column Feature Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {researchThemes.map((theme) => (
              <div
                key={theme.id}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  {theme.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {theme.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {theme.description}
                </p>
                <button className="text-sa4s-blue-600 hover:text-sa4s-blue-700 font-medium flex items-center justify-center w-full group">
                  Learn More
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-150" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
