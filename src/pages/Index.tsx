
import { Eye, FileText, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedNews from '../components/FeaturedNews';
import HighlightCard from '../components/HighlightCard';
import LogoCloud from '../components/LogoCloud';
import AudioPlayer from '../components/AudioPlayer';

const Index = () => {
  const navigate = useNavigate();

  const handleVisionClick = () => {
    navigate('/research');
  };

  const handlePublicationClick = () => {
    navigate('/publications');
  };

  const handleJoinUsClick = () => {
    navigate('/vacancies');
  };

  return (
    <div>
      <Hero />

      {/* Podcast Player Section */}
      <section className="py-12 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <AudioPlayer 
            src="/LLMs for Architectural Design Decisions.mp3" 
            title="LLMs for Architectural Design Decisions"
          />
        </div>
      </section>
      
      {/* Featured News Section */}
      <FeaturedNews />
      
      {/* Research Highlights Section */}
      <section className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Research Highlights
            </h2>
            <div className="prose text-gray-600 max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                The SA4S research group at SERC, IIIT-Hyderabad, focuses on developing 
                intelligent software systems that can adapt to changing environments while 
                maintaining optimal performance and energy efficiency.
              </p>
              <p className="leading-relaxed">
                Our interdisciplinary approach combines software engineering, machine learning, 
                and systems research to create solutions that are both theoretically sound and 
                practically impactful. We work closely with industry partners to ensure our 
                innovations address real-world challenges in cloud computing, IoT systems, 
                and distributed applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Strip */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HighlightCard
              icon={<Eye size={32} />}
              title="Our Vision"
              description="To pioneer the next generation of self-adaptive software systems that intelligently optimize for performance, reliability, and sustainability."
              ctaText="Learn More"
              ctaAction={handleVisionClick}
            />
            
            <HighlightCard
              icon={<FileText size={32} />}
              title="Latest Publication"
              description="Engineering End-to-End Remote Labs Using IoT-Based Retrofitting - Published in IEEE Access 2025"
              ctaText="Read Paper"
              ctaAction={() => window.open('https://doi.org/10.1109/ACCESS.2024.3523066', '_blank')}
            />
            
            <HighlightCard
              icon={<Users size={32} />}
              title="Join Us"
              description="We're looking for passionate researchers interested in adaptive systems, ML for software engineering, and sustainable computing."
              ctaText="View Openings"
              ctaAction={handleJoinUsClick}
            />
          </div>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <LogoCloud />
    </div>
  );
};

export default Index;
