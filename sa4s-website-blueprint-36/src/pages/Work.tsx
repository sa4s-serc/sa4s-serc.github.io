
import { Users } from 'lucide-react';

interface ProjectMember {
  name: string;
  role: string;
}

interface Project {
  id: string;
  title: string;
  summary: string;
  members: ProjectMember[];
}

const projects: Project[] = [
  {
    id: 'llm4adr',
    title: 'LLM4ADR',
    summary: 'LLM4ADR is a research project that aims to generate architecture design decisions in the context of Architecture Decision Records, with Generative AI - LLMs.',
    members: [
      { name: 'Rudra Dhar', role: 'PhD Student' },
      { name: 'Adyansh Kakran', role: 'DD Student' },
      { name: 'Amey Karan', role: 'DD Student' },
    ]
  },
  {
    id: 'adamls',
    title: 'AdaMLs',
    summary: 'AdaMLs is a research project that aims to enable self-adaptation in machine learning enabled systems targeting QoS.',
    members: [
      { name: 'Arya Marda', role: 'Honours Student' },
      { name: 'Shubham Kulkarni', role: 'Masters Student' },
    ]
  },
  {
    id: 'locoml-platform',
    title: 'LoCoML Platform',
    summary: 'LoCoML is a low-code machine learning platform designed to allow users with limited machine learning knowledge to easily build, update, and deploy models tailored to their specific needs. It incorporates automation features throughout the machine learning pipeline, from data pre-processing to model deployment.',
    members: [
      { name: 'Chandrasekar S', role: 'Masters Student - current' },
      { name: 'Maddireddy Kritin', role: 'Honours Student - current' },
      { name: 'Kotekal Methukula Santhosh', role: 'Honours Student - current' },
      { name: 'Harshit Karwal', role: 'BTP Student - current' },
      { name: 'Mukta Chanda', role: 'BTP Student - current' },
      { name: 'Shashwat Dash', role: 'BTP Student - current' },
      { name: 'Ayush Agarwal', role: 'BTP Student - started the project' },
      { name: 'Siddharth Mavani', role: 'BTP Student - started the project' },
      { name: 'Rohan C', role: 'BTP Student - started the project' },
    ]
  }
];

const Work = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sa4s-teal-50 to-sa4s-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Current Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Explore our active research initiatives in self-adaptive systems and sustainable computing.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={project.id}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:shadow-lg hover:border-sa4s-blue-500 transition-all duration-150 group">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-sa4s-blue-600 transition-colors duration-150">
                    {project.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {project.summary}
                  </p>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <Users className="mr-2 text-sa4s-teal-600" size={20} />
                      <h3 className="text-lg font-semibold text-gray-900">Members</h3>
                    </div>
                    <ul className="space-y-2">
                      {project.members.map((member, memberIndex) => (
                        <li key={memberIndex} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-sa4s-teal-500 rounded-full mr-3 flex-shrink-0"></span>
                          <span className="font-medium">{member.name}</span>
                          <span className="text-gray-500 ml-2">— {member.role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Section divider - only show between rows, not after last items */}
                {index < projects.length - 2 && (index % 2 === 1 || (index === projects.length - 2 && projects.length % 2 === 1)) && (
                  <div className="col-span-1 lg:col-span-2 my-8">
                    <hr className="border-gray-200" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
