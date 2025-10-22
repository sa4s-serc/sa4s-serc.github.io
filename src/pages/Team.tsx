import { useState } from 'react';
import { Mail, Linkedin } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  photo: string;
  category: string;
  linkedin?: string;
  education?: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Karthik Vaidyanathan',
    role: 'Assistant Professor at the Software Engineering Research Center, IIIT-Hyderabad from 2022',
    email: 'karthikv1392@gmail.com',
    photo: '/team/karthik_vaidyanathan.jpg',
    category: 'Faculty',
    education: [
      "Postdoc and Cultore Della Materia (Subject Matter Expert), University of L'Aquila, Italy",
      'PhD in Computer Science from GSSI - Gran Sasso Science Institute, advised by Henry Muccini',
      'M.Tech from Amrita University',
      'MSc from University of L\'Aquila, Italy',
      'B.Tech in Computer Science from Amrita Vishwa Vidyapeetham',
    ],
  },
  {
    id: 2,
    name: 'Rudra Dhar',
    role: 'PhD CSE, Batch of Monsoon 2022',
    email: 'rudra.dhar@research.iiit.ac.in',
    photo: '/team/rudra_dhar.jpeg',
    category: 'PhD Students',
  },
  {
    id: 3,
    name: 'Akhila Matathammal',
    role: 'PhD, started in July 2023',
    email: 'akhila.matathammal@research.iiit.ac.in',
    photo: '/team/akhila_matathammal.jpeg',
    category: 'PhD Students',
  },
  {
    id: 4,
    name: 'Sabyasachi Mukhopadhyay',
    role: 'PhD CSE (Part-time), Co-advised with Dr. Manish Shrivastava',
    email: '',
    photo: '/team/sabyasachi_mukhopadhyay.jpeg',
    category: 'PhD Students',
  },
  {
    id: 5,
    name: 'Chandrasekar S',
    role: 'MS by Research, started in May 2024',
    email: 'chandrasekar.s@research.iiiit.ac.in',
    photo: '/team/chandrasekar_s.jpeg',
    category: 'Masters Students',
  },
  {
    id: 6,
    name: 'Hiya Bhatt',
    role: 'MS CSE, started in May 2024',
    email: 'hiya.bhatt@research.iiiit.ac.in',
    photo: '/team/hiya_bhatt.jpeg',
    category: 'Masters Students',
    education: ['Best Poster Award - ICSA 2024'],
  },
  {
    id: 7,
    name: 'Likhith Kanigolla',
    role: 'MS CSE, started in Jan 2025',
    email: 'likhith.kanigolla@research.iiit.ac.in',
    photo: '/team/likhith_kanigolla.jpeg',
    category: 'Masters Students'
  },
  {
    id: 8,
    name: 'Sreemaee Akshathala',
    role: 'MS CSE, started in Aug 2025',
    email: 'sreemaee.akshathala@research.iiit.ac.in',
    photo: '/team/sreemaee_akshathala.jpeg',
    category: 'Masters Students',
    education: ['Worked as an RE earlier on a project with MontyCloud'],
  },
  {
    id: 9,
    name: 'Adyansh Kakran',
    role: 'Undergraduate Researcher, started in May 2023',
    email: 'adyansh.kakran@research.iiit.ac.in',
    photo: '/team/adyansh_kakran.jpeg',
    category: 'Undergraduate Researchers',
    education: ['Best Poster Award - ICSA 2024'],
  },
  {
    id: 10,
    name: 'Prakhar Jain',
    role: 'Undergraduate Researcher, started in May 2023',
    email: 'prakhar.jain@research.iiit.ac.in',
    photo: '/team/male.png',
    category: 'Undergraduate Researchers',
  },
  {
    id: 11,
    name: 'Amey Karan',
    role: 'Undergraduate Researcher, started in May 2024',
    email: 'amey.karan@research.iiit.ac.in',
    photo: '/team/amey_karan.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 12,
    name: 'Aneesh Sambu',
    role: 'Undergraduate Researcher, started in May 2024',
    email: 'sambu.aneesh@research.iiit.ac.in',
    photo: '/team/aneesh_sambu.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 13,
    name: 'Bassam Adnan',
    role: 'Undergraduate Researcher, started in May 2024',
    email: 'bassam.adnan@research.iiit.ac.in',
    photo: '/team/bassam_adnan.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 14,
    name: 'Prakhar Singhal',
    role: 'Undergraduate Researcher, started in May 2024',
    email: 'prakhar.singhal@research.iiit.ac.in',
    photo: '/team/prakhar_singhal.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 15,
    name: 'Sathvika Miryala',
    role: 'Undergraduate Researcher, started in May 2024',
    email: 'miryala.sathvika@research.iiit.ac.in',
    photo: '/team/sathvika_miryala.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 16,
    name: 'Shailender Goyal',
    role: 'Undergraduate Researcher, started in May 2024',
    email: 'shailender.goyal@research.iiit.ac.in',
    photo: '/team/shailender_goyal.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 17,
    name: 'Shaunak Biswas',
    role: 'Undergraduate Researcher, started in May 2024',
    email: 'shaunak.biswas@research.iiit.ac.in',
    photo: '/team/shaunak_biswas.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 18,
    name: 'Arihant Tripathy',
    role: 'Undergraduate Researcher, started in May 2025',
    email: 'arihant.tripathy@research.iiit.ac.in',
    photo: '/team/arihant_tripathy.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 19,
    name: 'Aviral Gupta',
    role: 'Undergraduate Researcher, started in May 2025',
    email: 'aviral.gupta@research.iiit.ac.in',
    photo: '/team/aviral_gupta.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 20,
    name: 'Divyansh Pandey',
    role: 'Undergraduate Researcher, started in May 2024',
    email: 'divyansh.pandey@students.iiit.ac.in',
    photo: '/team/divyansh_pandey.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 21,
    name: 'Kritin Maddireddy',
    role: 'Undergraduate Researcher, started in May 2024',
    email: 'kritin.maddireddy@students.iiit.ac.in',
    photo: '/team/kritin_maddireddy.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 22,
    name: 'Kotekal Methukula Santhosh',
    role: 'Undergraduate Researcher, started in May 2024',
    email: 'santhosh.km@students.iiit.ac.in',
    photo: '/team/kotekal_methukula_santhosh.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 23,
    name: 'Vyakhya Gupta',
    role: 'Undergraduate Researcher, started in May 2024',
    email: 'vyakhya.gupta@students.iiit.ac.in',
    photo: '/team/female.png',
    category: 'Undergraduate Researchers',
  },
  {
    id: 24,
    name: 'Ananya Halgatti',
    role: 'Undergraduate Researcher, started in May 2025',
    email: 'ananya.halgatti@students.iiit.ac.in',
    photo: '/team/ananya_halgatti.jpeg',
    category: 'Undergraduate Researchers',
  },
  {
    id: 25,
    name: 'Shubham Kulkarni',
    role: 'Worked on Adaptive MLOPs from 2022 - 2024',
    email: 'shubham.kulkarni@research.iiit.ac.in',
    photo: '/team/shubham_kulkarni.jpeg',
    category: 'Alumni',
    education: ['First student to graduate from the group'],
  },
  {
    id: 26,
    name: 'Arya Marda',
    role: 'Worked on Adaptive systems from 2023-2025',
    email: 'arya.marda@students.iiit.ac.in',
    photo: '/team/arya_marda.jpeg',
    category: 'Alumni',
  },
  {
    id: 27,
    name: 'Meghana Tedla',
    role: 'Worked on Green software from 2023-2025',
    email: 'meghana.tedla@students.iiit.ac.in',
    photo: '/team/meghana_tedla.jpeg',
    category: 'Alumni',
  },
  {
    id: 28,
    name: 'Shrikara A',
    role: 'Worked on Microservices from 2023-2025',
    email: 'shrikara.a@students.iiit.ac.in',
    photo: '/team/shrikara_a.jpeg',
    category: 'Alumni',
    education: ['Best Poster Award - ICSA 2024'],
  },
  {
    id: 29,
    name: 'Ch Pavan',
    role: 'Research Engineer',
    email: 'pavan.harshit@research.iiit.ac.in',
    photo: '/team/ch_pavan.jpg',
    category: 'Research Staff',
    education: [
      'BE in Computer Science from CBIT, Hyderabad',
      'Currently working on the LLoyds Sustainability project'
    ],
  },
  {
    id: 30,
    name: 'Mahisha Ramesh',
    role: 'Research Engineer',
    email: 'mahisha26r@gmail.com',
    photo: '/team/mahisha_ramesh.jpeg',
    category: 'Research Staff',
    education: [
      'Mtech in CSE with AI specialisation in IIIT Delhi',
      'Currently working with MontyCloud company on Project Marvin',
      'Building agentic AI systems that help Managed Service Providers (MSPs) streamline CloudOps through intelligent memory, context-aware reasoning, and smarter automation.'
    ],
  },  
  {
    id: 31,
    name: 'Aneetta Sara Shany',
    role: 'Junior Research Fellow',
    email: 'sara18anee@gmail.com',
    photo: '/team/aneetta_sara_shany.jpeg',
    category: 'Research Staff',
    education: [
      'Working on the SustaIND project, focussing on building a software-centric framework for sustainable AI systems',
    ],
  },
  {
    id: 32,
    name: 'Chandrasekar S',
    role: 'Junior Research Fellow, started in Oct 2025',
    email: 'chandrasekar.s@research.iiiit.ac.in',
    photo: '/team/chandrasekar_s.jpeg',
    category: 'Research Staff',
    education: [
      'Working on the SustaIND project, focussing on building a software-centric framework for sustainable AI systems',
    ],
  },

];

const categories = ['All', 'Faculty', 'PhD Students', 'Masters Students', 'Undergraduate Researchers', 'Research Staff', 'Alumni'];

const Team = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMembers = activeCategory === 'All'
    ? teamMembers
    : teamMembers.filter(member => member.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sa4s-teal-50 to-sa4s-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Team
          </h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 font-medium rounded-t-lg transition-all duration-150 ${
                activeCategory === category
                  ? 'bg-sa4s-teal-600 text-white'
                  : 'text-gray-600 hover:text-sa4s-teal-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all duration-200"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
              {member.education && member.education.length > 0 && (
                <ul className="text-left text-gray-500 mt-4 list-disc list-inside">
                  {member.education.map((edu, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: edu }}></li>
                  ))}
                </ul>
              )}
              <div className="flex justify-center mt-4 space-x-4">
                <a
                  href={`mailto:${member.email}`}
                  className="w-10 h-10 bg-gray-200 hover:bg-sa4s-teal-500 hover:text-white rounded-lg flex items-center justify-center transition-all duration-150"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail size={20} />
                </a>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-200 hover:bg-sa4s-blue-500 hover:text-white rounded-lg flex items-center justify-center transition-all duration-150"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
