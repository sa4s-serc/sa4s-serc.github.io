
import { Github, FileText, Youtube, ArrowRight } from 'lucide-react';

const Tools = () => {
  const tools = [
    {
      name: 'LoCoML',
      tagline: 'Low-Code Framework for Real-World ML Inference Pipelines',
      description: 'LoCoML abstracts away engineering complexity with a low-code, drag-and-drop interface—stitching ASR, MT, TTS & OCR into robust 20+-language inference pipelines for the Bhashini Project with just ~2% runtime overhead.',
      logo: '/images/tools/locoml.png',
      links: {
        paper: 'https://arxiv.org/abs/2501.14165',
        github: 'https://github.com/sa4s-serc/locoml',
        demo: 'https://locoml-website.vercel.app/',
        video: 'https://www.youtube.com/watch?v=cdJv43Jsv_c'
      }
    },
    {
      name: 'EnergyOptimizer',
      tagline: 'ML-Driven Power Management',
      description: 'Machine learning toolkit for predicting and optimizing energy consumption in distributed systems, reducing carbon footprint by up to 40%.',
      logo: '⚡',
      links: {
        paper: 'https://example.com/paper2',
        github: 'https://github.com/sa4s/energy-optimizer',
        demo: 'https://demo.energyoptimizer.org'
      }
    },
    {
      name: 'CloudAdapt',
      tagline: 'Intelligent Cloud Resource Manager',
      description: 'Autonomous cloud resource management system that adapts to workload patterns and optimizes cost-performance trade-offs in real-time.',
      logo: '☁️',
      links: {
        paper: 'https://example.com/paper3',
        github: 'https://github.com/sa4s/cloudadapt',
        demo: 'https://demo.cloudadapt.org',
        video: 'https://youtube.com/watch?v=example3'
      }
    },
    {
      name: 'SystemMonitor',
      tagline: 'Adaptive Performance Analytics',
      description: 'Real-time monitoring and analysis platform that learns system behavior patterns to predict performance issues before they occur.',
      logo: '📊',
      links: {
        paper: 'https://example.com/paper4',
        github: 'https://github.com/sa4s/system-monitor',
        demo: 'https://demo.systemmonitor.org'
      }
    }
  ];

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'paper': return <FileText size={16} />;
      case 'github': return <Github size={16} />;
      case 'demo': return <ArrowRight size={16} />;
      case 'video': return <Youtube size={16} />;
      default: return <ArrowRight size={16} />;
    }
  };

  const getLinkLabel = (type: string) => {
    switch (type) {
      case 'paper': return 'Paper';
      case 'github': return 'GitHub';
      case 'demo': return 'Platform';
      case 'video': return 'Demo';
      default: return 'Link';
    }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tools & Frameworks
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Open-source tools and frameworks developed by our research group to advance 
            self-adaptive systems and sustainable computing practices.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 group"
            >
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {tool.logo.startsWith('/') ? <img src={tool.logo} alt={`${tool.name} logo`} className="w-16 h-16 object-contain" /> : tool.logo}
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-sa4s-teal-600 font-medium mb-4">
                  {tool.tagline}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap justify-center gap-3">
                {Object.entries(tool.links).map(([type, url]) => (
                  <a
                    key={type}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-sa4s-teal-50 text-gray-700 hover:text-sa4s-teal-700 rounded-lg border border-gray-200 hover:border-sa4s-teal-200 transition-all duration-150 text-sm font-medium"
                  >
                    {getLinkIcon(type)}
                    <span>{getLinkLabel(type)}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-sa4s-teal-500 to-sa4s-blue-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Interested in Contributing?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Our tools are open-source and we welcome contributions from the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-sa4s-teal-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-all duration-150">
                View All Projects
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-sa4s-teal-600 px-8 py-3 rounded-lg font-medium transition-all duration-150">
                Collaboration Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
