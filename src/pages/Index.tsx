
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
      {/* Temporary announcement: DFL Agentic AI certificate course */}
      <section className="bg-gradient-to-r from-[#0f2f52] via-[#1a578c] to-[#1b6db8] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
            <div className="text-xs font-semibold uppercase tracking-wide bg-white/15 text-white rounded-full px-3 py-1 w-max">
              DFL Announcement
            </div>
            <div className="text-sm md:text-base flex-1 leading-snug">
              Division of Flexible Learning: Agentic AI: From Concepts to Practice. 12-week, online certificate. Applications close 29 Dec 2025.
            </div>
            <a
              href="https://dfl.iiit.ac.in/programs/cert/aai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-[#f2c400] text-[#0f2f52] font-semibold px-4 py-2 shadow hover:shadow-lg transition"
            >
              Apply now
            </a>
          </div>
        </div>
      </section>

      <Hero />

      {/* Podcast Player Section */}
      <section className="py-12 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <AudioPlayer 
            src="/LLMs for Architectural Design Decisions.mp3" 
            title="SA4S Research Summary Podcast"
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
