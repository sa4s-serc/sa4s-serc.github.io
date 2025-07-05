
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink } from 'lucide-react';

interface Publication {
  id: string;
  authors: string[];
  title: string;
  venue: string;
  volume?: string;
  year: number;
  pages?: string;
  doi: string;
  publisher?: string;
}

interface YearlyPublications {
  year: number;
  papers: Publication[];
}

const conferences = [
  { name: 'IEEE', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/df/IEEE_logo.svg' },
  { name: 'ACM', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/ACM_logo.svg' },
  { name: 'Springer', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Springer_Logo.svg' },
  { name: 'Elsevier', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Elsevier.svg' },
  { name: 'CoRR', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ArXiv-logo-color.svg/1280px-ArXiv-logo-color.svg.png'},
];

const publicationsByYear: YearlyPublications[] = [
  {
    year: 2025,
    papers: [
      {
        id: 'DBLP:journals/access/KandalaGWASCVCBKH25',
        authors: ['Kandala, Savitha Viswanadh', 'Akshit Gureja', 'Nagesh Walchatwar', 'Rishabh Agrawal', 'Shiven Sinha', 'Sachin Chaudhari', 'Karthik Vaidhyanathan', 'et al.'],
        title: 'Engineering End-to-End Remote Labs Using IoT-Based Retrofitting',
        venue: 'IEEE Access',
        volume: '13',
        year: 2025,
        pages: '1106-32',
        doi: 'https://doi.org/10.1109/ACCESS.2024.3523066'
      },
      {
        id: 'DBLP:conf/icsa/ArunTV25',
        authors: ['Arun, Shrikara', 'Meghana Tedla', 'Karthik Vaidhyanathan'],
        title: 'LLMs for Generation of Architectural Components: An Exploratory Empirical Study in the Serverless World',
        venue: '22nd IEEE International Conference on Software Architecture, ICSA 2025, Odense, Denmark, March 31 - April 4, 2025',
        pages: '25-36',
        publisher: 'IEEE',
        year: 2025,
        doi: 'https://doi.org/10.1109/ICSA65012.2025.00013'
      },
      {
        id: 'DBLP:conf/icsa/BhattSKBGRTS25',
        authors: ['Bhatt, Hiya', 'Sahil', 'Karthik Vaidhyanathan', 'Rahul Biju', 'Deepak Gangadharan', 'Ramona Trestian', 'Purav Shah'],
        title: 'Architecting Digital Twins for Intelligent Transportation Systems',
        venue: '22nd IEEE International Conference on Software Architecture, ICSA - Companion, Odense, Denmark, March 31 - April 4, 2025',
        pages: '215-23',
        publisher: 'IEEE',
        year: 2025,
        doi: 'https://doi.org/10.1109/ICSA-C65153.2025.00041'
      },
      {
        id: 'DBLP:conf/icsa/AdnanMSVDS25',
        authors: ['Adnan, Bassam', 'Sathvika Miryala', 'Aneesh Sambu', 'Karthik Vaidhyanathan', 'Martina De Sanctis', 'Romina Spalazzese'],
        title: 'Leveraging LLMs for Dynamic IoT Systems Generation Through Mixed-Initiative Interaction',
        venue: '22nd IEEE International Conference on Software Architecture, ICSA - Companion, Odense, Denmark, March 31 - April 4, 2025',
        pages: '488-97',
        publisher: 'IEEE',
        year: 2025,
        doi: 'https://doi.org/10.1109/ICSA-C65153.2025.00073'
      },
      {
        id: 'DBLP:conf/icsa/MatathammalGLHGV25',
        authors: ['Matathammal, Akhila', 'Kriti Gupta', 'Larissa Lavanya', 'Ananya Vishal Halgatti', 'Priyanshi Gupta', 'Karthik Vaidhyanathan'],
        title: 'EdgeMLBalancer: A Self-Adaptive Approach for Dynamic Model Switching on Resource-Constrained Edge Devices',
        venue: '22nd IEEE International Conference on Software Architecture, ICSA - Companion, Odense, Denmark, March 31 - April 4, 2025',
        pages: '543-52',
        publisher: 'IEEE',
        year: 2025,
        doi: 'https://doi.org/10.1109/ICSA-C65153.2025.00081'
      },
      {
        id: 'DBLP:journals/corr/abs-2501-08243',
        authors: ['Parthasarathy, Kannan', 'Karthik Vaidhyanathan', 'Rudra Dhar', 'Venkat Krishnamachari', 'Basil Muhammed', 'Adyansh Kakran', 'Sreemaee Akshathala', 'et al.'],
        title: 'Engineering LLM Powered Multi-Agent Framework for Autonomous CloudOps',
        venue: 'CoRR',
        volume: 'abs/2501.08243',
        year: 2025,
        doi: 'https://doi.org/10.48550/ARXIV.2501.08243'
      },
      {
        id: 'DBLP:journals/corr/abs-2501-14165',
        authors: ['Maddireddy, Kritin', 'Santhosh Kotekal Methukula', 'Chandrasekar Sridhar', 'Karthik Vaidhyanathan'],
        title: 'LoCoML: A Framework for Real-World ML Inference Pipelines',
        venue: 'CoRR',
        volume: 'abs/2501.14165',
        year: 2025,
        doi: 'https://doi.org/10.48550/ARXIV.2501.14165'
      },
      {
        id: 'DBLP:journals/corr/abs-2501-17028',
        authors: ['Sridhar, Chandrasekar', 'Vyakhya Gupta', 'Prakhar Jain', 'Karthik Vaidhyanathan'],
        title: 'Approach Towards Semi-Automated Certification for Low Criticality ML-Enabled Airborne Applications',
        venue: 'CoRR',
        volume: 'abs/2501.17028',
        year: 2025,
        doi: 'https://doi.org/10.48550/ARXIV.2501.17028'
      },
      {
        id: 'DBLP:journals/corr/abs-2503-13310',
        authors: ['Esposito, Matteo', 'Xiaozhou Li', 'Sergio Moreschini', 'Noman Ahmad', 'Tomás Cerný', 'Karthik Vaidhyanathan', 'Valentina Lenarduzzi', 'Davide Taibi'],
        title: 'Generative AI for Software Architecture. Applications, Trends, Challenges, and Future Directions',
        venue: 'CoRR',
        volume: 'abs/2503.13310',
        year: 2025,
        doi: 'https://doi.org/10.48550/ARXIV.2503.13310'
      },
      {
        id: 'DBLP:journals/corr/abs-2504-08207',
        authors: ['Dhar, Rudra', 'Adyansh Kakran', 'Amey Karan', 'Karthik Vaidhyanathan', 'Vasudeva Varma'],
        title: 'DRAFT-Ing Architectural Design Decisions Using LLMs',
        venue: 'CoRR',
        volume: 'abs/2504.08207',
        year: 2025,
        doi: 'https://doi.org/10.48550/ARXIV.2504.08207'
      },
      {
        id: 'DBLP:journals/corr/abs-2504-19277',
        authors: ['Kavathekar, Ishan', 'Raghav Donakanti', 'Ponnurangam Kumaraguru', 'Karthik Vaidhyanathan'],
        title: 'Small Models, Big Tasks: An Exploratory Empirical Study on Small Language Models for Function Calling',
        venue: 'CoRR',
        volume: 'abs/2504.19277',
        year: 2025,
        doi: 'https://doi.org/10.48550/ARXIV.2504.19277'
      }
    ]
  },
  {
    year: 2024,
    papers: [
      {
        id: 'DBLP:conf/icsa/PranavasriFPMVVG24',
        authors: ['Pranavasri, VJS', 'Leo Francis', 'Gaurav Pal', 'Ushasri Mogadali', 'Anuradha Vattem', 'Karthik Vaidhyanathan', 'Deepak Gangadharan'],
        title: 'Exploratory Study of oneM2M-Based Interoperability Architectures For IoT: A Smart City Perspective',
        venue: '21st IEEE International Conference on Software Architecture, ICSA 2024 - Companion, Hyderabad, India, June 4-8, 2024',
        pages: '16-23',
        publisher: 'IEEE',
        year: 2024,
        doi: 'https://doi.org/10.1109/ICSA-C63560.2024.00009'
      },
      {
        id: 'DBLP:conf/icsa/DharVV24',
        authors: ['Dhar, Rudra', 'Karthik Vaidhyanathan', 'Vasudeva Varma'],
        title: 'Can LLMs Generate Architectural Design Decisions? - An Exploratory Empirical Study',
        venue: '21st IEEE International Conference on Software Architecture, ICSA 2024, Hyderabad, India, June 4-8, 2024',
        pages: '79-89',
        publisher: 'IEEE',
        year: 2024,
        doi: 'https://doi.org/10.1109/ICSA59870.2024.00016'
      },
      {
        id: 'DBLP:conf/icsa/DharVV24a',
        authors: ['Dhar, Rudra', 'Karthik Vaidhyanathan', 'Vasudeva Varma'],
        title: 'Leveraging Generative AI for Architecture Knowledge Management',
        venue: '21st IEEE International Conference on Software Architecture, ICSA 2024 - Companion, Hyderabad, India, June 4-8, 2024',
        pages: '163-66',
        publisher: 'IEEE',
        year: 2024,
        doi: 'https://doi.org/10.1109/ICSA-C63560.2024.00034'
      },
      {
        id: 'DBLP:conf/icsa/DonakantiJKV24',
        authors: ['Donakanti, Raghav', 'Prakhar Jain', 'Shubham Kulkarni', 'Karthik Vaidhyanathan'],
        title: 'Reimagining Self-Adaptation in the Age of Large Language Models',
        venue: '21st IEEE International Conference on Software Architecture, ICSA 2024 - Companion, Hyderabad, India, June 4-8, 2024',
        pages: '171-74',
        publisher: 'IEEE',
        year: 2024,
        doi: 'https://doi.org/10.1109/ICSA-C63560.2024.00036'
      },
      {
        id: 'DBLP:conf/icsa/BhattAKV24',
        authors: ['Bhatt, Hiya', 'Shrikara Arun', 'Adyansh Kakran', 'Karthik Vaidhyanathan'],
        title: 'Towards Architecting Sustainable MLOps: A Self-Adaptation Approach',
        venue: '21st IEEE International Conference on Software Architecture, ICSA 2024 - Companion, Hyderabad, India, June 4-8, 2024',
        pages: '179-82',
        publisher: 'IEEE',
        year: 2024,
        doi: 'https://doi.org/10.1109/ICSA-C63560.2024.00038'
      },
      {
        id: 'DBLP:conf/icsa/TedlaKV24',
        authors: ['Tedla, Meghana', 'Shubham Kulkarni', 'Karthik Vaidhyanathan'],
        title: 'EcoMLS: A Self-Adaptation Approach for Architecting Green ML-Enabled Systems',
        venue: '21st IEEE International Conference on Software Architecture, ICSA 2024 - Companion, Hyderabad, India, June 4-8, 2024',
        pages: '230-37',
        publisher: 'IEEE',
        year: 2024,
        doi: 'https://doi.org/10.1109/ICSA-C63560.2024.00048'
      },
      {
        id: 'DBLP:conf/icsa/KanigollaPVGV24',
        authors: ['Kanigolla, Likhith', 'Gaurav Pal', 'Karthik Vaidhyanathan', 'Deepak Gangadharan', 'Anuradha Vattem'],
        title: 'Architecting Digital Twin for Smart City Systems: A Case Study',
        venue: '21st IEEE International Conference on Software Architecture, ICSA 2024 - Companion, Hyderabad, India, June 4-8, 2024',
        pages: '326-34',
        publisher: 'IEEE',
        year: 2024,
        doi: 'https://doi.org/10.1109/ICSA-C63560.2024.00061'
      },
      {
        id: 'DBLP:conf/icsoc/JainSPQV24',
        authors: ['Jain, Prakhar', 'Prakhar Singhal', 'Divyansh Pandey', 'Giovanni Quatrocchi', 'Karthik Vaidhyanathan'],
        title: 'POSEIDON: Efficient Function Placement at the Edge Using Deep Reinforcement Learning',
        venue: 'Service-Oriented Computing - 22nd International Conference, ICSOC 2024, Tunis, Tunisia, December 3-6, 2024, Proceedings, Part I',
        volume: '15404',
        pages: '21-37',
        publisher: 'Springer',
        year: 2024,
        doi: 'https://doi.org/10.1007/978-981-96-0805-8_2'
      },
      {
        id: 'DBLP:conf/sac/VaidhyanathanCFM24',
        authors: ['Vaidhyanathan, Karthik', 'Mauro Caporuscio', 'Stefano Florio', 'Henry Muccini'],
        title: 'ML-Enabled Service Discovery for Microservice Architecture: a QoS Approach',
        venue: 'Proceedings of the 39th ACM/SIGAPP Symposium on Applied Computing, SAC 2024, Avila, Spain, April 8-12, 2024',
        pages: '1193-1200',
        publisher: 'ACM',
        year: 2024,
        doi: 'https://doi.org/10.1145/3605098.3635942'
      },
      {
        id: 'DBLP:conf/seams/MardaKV24',
        authors: ['Marda, Arya', 'Shubham Kulkarni', 'Karthik Vaidhyanathan'],
        title: 'SWITCH: An Exemplar for Evaluating Self-Adaptive ML-Enabled Systems',
        venue: 'Proceedings of the 19th International Symposium on Software Engineering for Adaptive and Self-Managing Systems, SEAMS 2024, Lisbon, Portugal, April 15-16, 2024',
        pages: '143-49',
        publisher: 'ACM',
        year: 2024,
        doi: 'https://doi.org/10.1145/3643915.3644105'
      },
      {
        id: 'DBLP:journals/corr/abs-2402-05466',
        authors: ['Viswanadh, K. S.', 'Akshit Gureja', 'Nagesh Walchatwar', 'Rishabh Agrawal', 'Shiven Sinha', 'Sachin Chaudhari', 'Karthik Vaidhyanathan', 'et al.'],
        title: 'Engineering End-to-End Remote Labs Using IoT-Based Retrofitting',
        venue: 'CoRR',
        volume: 'abs/2402.05466',
        year: 2024,
        doi: 'https://doi.org/10.48550/ARXIV.2402.05466'
      },
      {
        id: 'DBLP:journals/corr/abs-2402-06351',
        authors: ['Marda, Arya', 'Shubham Kulkarni', 'Karthik Vaidhyanathan'],
        title: 'SWITCH: An Exemplar for Evaluating Self-Adaptive ML-Enabled Systems',
        venue: 'CoRR',
        volume: 'abs/2402.06351',
        year: 2024,
        doi: 'https://doi.org/10.48550/ARXIV.2402.06351'
      },
      {
        id: 'DBLP:journals/corr/abs-2403-01709',
        authors: ['Dhar, Rudra', 'Karthik Vaidhyanathan', 'Vasudeva Varma'],
        title: 'Can LLMs Generate Architectural Design Decisions? -An Exploratory Empirical Study',
        venue: 'CoRR',
        volume: 'abs/2403.01709',
        year: 2024,
        doi: 'https://doi.org/10.48550/ARXIV.2403.01709'
      },
      {
        id: 'DBLP:journals/corr/abs-2404-04572',
        authors: ['Bhatt, Hiya', 'Shrikara Arun', 'Adyansh Kakran', 'Karthik Vaidhyanathan'],
        title: 'Towards Architecting Sustainable MLOps: A Self-Adaptation Approach',
        venue: 'CoRR',
        volume: 'abs/2404.04572',
        year: 2024,
        doi: 'https://doi.org/10.48550/ARXIV.2404.04572'
      },
      {
        id: 'DBLP:journals/corr/abs-2404-09866',
        authors: ['Donakanti, Raghav', 'Prakhar Jain', 'Shubham Kulkarni', 'Karthik Vaidhyanathan'],
        title: 'Reimagining Self-Adaptation in the Age of Large Language Models',
        venue: 'CoRR',
        volume: 'abs/2404.09866',
        year: 2024,
        doi: 'https://doi.org/10.48550/ARXIV.2404.09866'
      },
      {
        id: 'DBLP:journals/corr/abs-2404-11411',
        authors: ['Tedla, Meghana', 'Shubham Kulkarni', 'Karthik Vaidhyanathan'],
        title: 'EcoMLS: A Self-Adaptation Approach for Architecting Green ML-Enabled Systems',
        venue: 'CoRR',
        volume: 'abs/2404.11411',
        year: 2024,
        doi: 'https://doi.org/10.48550/ARXIV.2404.11411'
      },
      {
        id: 'DBLP:journals/corr/abs-2410-11879',
        authors: ['Jain, Prakhar', 'Prakhar Singhal', 'Divyansh Pandey', 'Giovanni Quatrocchi', 'Karthik Vaidhyanathan'],
        title: 'POSEIDON : Efficient Function Placement at the Edge Using Deep Reinforcement Learning',
        venue: 'CoRR',
        volume: 'abs/2410.11879',
        year: 2024,
        doi: 'https://doi.org/10.48550/ARXIV.2410.11879'
      }
    ]
  },
  {
    year: 2023,
    papers: [
      {
        id: 'DBLP:journals/pacmhci/AlipourMVK23',
        authors: ['Alipour, Mina', 'Mahyar Tourchi Moghaddam', 'Karthik Vaidhyanathan', 'Mikkel Baun Kjærgaard'],
        title: 'Emoticontrol: Emotions-Based Control of User-Interfaces Adaptations',
        venue: 'Proc. ACM Hum. Comput. Interact.',
        volume: '7',
        pages: '1-29',
        year: 2023,
        doi: 'https://doi.org/10.1145/3593227'
      },
      {
        id: 'DBLP:conf/comped/KarreVR23',
        authors: ['Karre, Sai Anirudh', 'Karthik Vaidhyanathan', 'Y. Raghu Reddy'],
        title: 'A Tool Based Experiment to Teach Elicitation and Specification Of Virtual Reality Product Requirements',
        venue: 'Proceedings of the ACM Conference on Global Computing Education Vol 2, CompEd 2023, Hyderabad, India, December 5-9, 2023',
        pages: '195',
        publisher: 'ACM',
        year: 2023,
        doi: 'https://doi.org/10.1145/3617650.3624936'
      },
      {
        id: 'DBLP:conf/hci/AlipourMVKA23',
        authors: ['Alipour, Mina', 'Mahyar Tourchi Moghaddam', 'Karthik Vaidhyanathan', 'Tobias Kristensen', 'Nicolai Krogager Asmussen'],
        title: 'Emotional Internet of Behaviors: A QoE-QoS Adjustment Mechanism',
        venue: 'Artificial Intelligence in HCI - 4th International Conference, AI-HCI 2023, Held as Part of the 25th HCI International Conference, HCII 2023, Copenhagen, Denmark, July 23-28, 2023, Proceedings, Part I',
        volume: '14050',
        pages: '3-22',
        publisher: 'Springer',
        year: 2023,
        doi: 'https://doi.org/10.1007/978-3-031-35891-3_1'
      },
      {
        id: 'DBLP:conf/kbse/KulkarniMV23',
        authors: ['Kulkarni, Shubham', 'Arya Marda', 'Karthik Vaidhyanathan'],
        title: 'Towards Self-Adaptive Machine Learning-Enabled Systems Through QoS-Aware Model Switching',
        venue: '38th IEEE/ACM International Conference on Automated Software Engineering, ASE 2023, Luxembourg, September 11-15, 2023',
        pages: '1721-25',
        publisher: 'IEEE',
        year: 2023,
        doi: 'https://doi.org/10.1109/ASE56229.2023.00172'
      },
      {
        id: 'DBLP:conf/um/AlipourMVK23',
        authors: ['Alipour, Mina', 'Mahyar Tourchi Moghaddam', 'Karthik Vaidhyanathan', 'Mikkel Baun Kjærgaard'],
        title: 'Toward Changing Users Behavior with Emotion-Based Adaptive Systems',
        venue: 'Proceedings of the 31st ACM Conference on User Modeling, Adaptation and Personalization, UMAP 2023, Limassol, Cyprus, June 26-29, 2023',
        pages: '85-95',
        publisher: 'ACM',
        year: 2023,
        doi: 'https://doi.org/10.1145/3565472.3595614'
      },
      {
        id: 'DBLP:conf/wf-iot/GurejaACVC23',
        authors: ['Gureja, Akshit', 'Rishabh Agrawal', 'Sachin Chaudhari', 'Karthik Vaidhyanathan', 'Venkatesh Choppella'],
        title: 'Software Architecture for Multi-User Multiplexing to Enhance Scalability in IoT-Based Remote Labs',
        venue: '9th IEEE World Forum on Internet of Things, WF-IoT 2023, Aveiro, Portugal, October 12-27, 2023',
        pages: '1-7',
        publisher: 'IEEE',
        year: 2023,
        doi: 'https://doi.org/10.1109/WF-IOT58464.2023.10539512'
      },
      {
        id: 'DBLP:conf/wf-iot/PranavasriFMPVVVG23',
        authors: ['Pranavasri, VJS', 'Leo Francis', 'Ushasri Mogadali', 'Gaurav Pal', 'SVSLN Surya Suhas Vaddhiparthy', 'Anuradha Vattem', 'Karthik Vaidhyanathan', 'Deepak Gangadharan'],
        title: 'Scalable and Interoperable Distributed Architecture for IoT in Smart Cities',
        venue: '9th IEEE World Forum on Internet of Things, WF-IoT 2023, Aveiro, Portugal, October 12-27, 2023',
        pages: '1-6',
        publisher: 'IEEE',
        year: 2023,
        doi: 'https://doi.org/10.1109/WF-IOT58464.2023.10539501'
      },
      {
        id: 'DBLP:journals/corr/abs-2308-09960',
        authors: ['Kulkarni, Shubham', 'Arya Marda', 'Karthik Vaidhyanathan'],
        title: 'Towards Self-Adaptive Machine Learning-Enabled Systems Through QoS-Aware Model Switching',
        venue: 'CoRR',
        volume: 'abs/2308.09960',
        year: 2023,
        doi: 'https://doi.org/10.48550/ARXIV.2308.09960'
      },
      {
        id: 'DBLP:journals/dagstuhl-reports/LewisMOVWZ23',
        authors: ['Lewis, Grace A.', 'Henry Muccini', 'Ipek Ozkaya', 'Karthik Vaidhyanathan', 'Roland Weiss', 'Liming Zhu'],
        title: 'Software Architecture and Machine Learning (Dagstuhl Seminar 23302)',
        venue: 'Dagstuhl Reports',
        volume: '13',
        pages: '166-88',
        year: 2023,
        doi: 'https://doi.org/10.4230/DAGREP.13.7.166'
      }
    ]
  },

  {
    year: 2022,
    papers: [
      {
        id: 'DBLP:journals/ieeesoft/VaidhyanathanCMR22',
        authors: ['Vaidhyanathan, Karthik', 'Anish Chandran', 'Henry Muccini', 'Regi Roy'],
        title: 'Agile4MLS - Leveraging Agile Practices for Developing Machine Learning-Enabled Systems: An Industrial Experience.',
        venue: 'IEEE Softw.',
        volume: '39',
        pages: '43-50',
        publisher: 'IEEE',
        year: 2022,
        doi: 'https://doi.org/10.1109/MS.2022.3195432'
      },
      {
        id: 'DBLP:conf/sac/MennaMV22',
        authors: ['Menna, Federico Di', 'Henry Muccini', 'Karthik Vaidhyanathan'],
        title: 'FEAST: a Framework for Evaluating Implementation Architectures Of Self-Adaptive IoT Systems.',
        venue: 'SAC ’22: The 37th ACM/SIGAPP Symposium on Applied Computing, Virtual Event, April 25 - 29, 2022',
        pages: '1440-47',
        publisher: 'ACM',
        year: 2022,
        doi: 'https://doi.org/10.1145/3477314.3507146'
      }
    ]
  },
  {
    year: 2021,
    papers: [
      {
        id: 'DBLP:conf/ecsa/CaporuscioDTMV21',
        authors: ['Caporuscio, Mauro', 'Marco De Toma', 'Henry Muccini', 'Karthik Vaidhyanathan'],
        title: 'A Machine Learning Approach to Service Discovery for Microservice Architectures.',
        venue: 'Software Architecture - 15th European Conference, ECSA 2021, Virtual Event, Sweden, September 13-17, 2021, Proceedings',
        volume: '12857',
        pages: '66-82',
        publisher: 'Springer',
        year: 2021,
        doi: 'https://doi.org/10.1007/978-3-030-86044-8_5'
      },
      {
        id: 'DBLP:conf/ecsa/AbughazalaMV21',
        authors: ['Abughazala, Moamin', 'Mahyar Tourchi Moghaddam', 'Henry Muccini', 'Karthik Vaidhyanathan'],
        title: 'Human Behavior-Oriented Architectural Design.',
        venue: 'Software Architecture - 15th European Conference, ECSA 2021, Virtual Event, Sweden, September 13-17, 2021, Proceedings',
        volume: '12857',
        pages: '134-43',
        publisher: 'Springer',
        year: 2021,
        doi: 'https://doi.org/10.1007/978-3-030-86044-8_9'
      },
      {
        id: 'DBLP:conf/wain/MucciniV21',
        authors: ['Muccini, Henry', 'Karthik Vaidhyanathan'],
        title: 'Software Architecture for ML-Based Systems: What Exists and What Lies Ahead.',
        venue: '1st IEEE/ACM Workshop on AI Engineering - Software Engineering for AI, WAIN@ICSE 2021, Madrid, Spain, May 30-31, 2021',
        pages: '121-28',
        publisher: 'IEEE',
        year: 2021,
        doi: 'https://doi.org/10.1109/WAIN52551.2021.00026'
      },
      {
        id: 'DBLP:conf/iot/SanctisMV21',
        authors: ['De Sanctis, Martina', 'Henry Muccini', 'Karthik Vaidhyanathan'],
        title: 'A User-Driven Adaptation Approach for Microservice-Based IoT Applications.',
        venue: 'IoT ’21: 11th International Conference on the Internet of Things, St. Gallen, Switzerland, November 8 - 12, 2021',
        pages: '48-56',
        publisher: 'ACM',
        year: 2021,
        doi: 'https://doi.org/10.1145/3494322.3494329'
      },
      {
        id: 'DBLP:journals/corr/abs-2103-07950',
        authors: ['Muccini, Henry', 'Karthik Vaidhyanathan'],
        title: 'Software Architecture for ML-Based Systems: What Exists and What Lies Ahead.',
        venue: 'CoRR',
        volume: 'abs/2103.07950',
        year: 2021,
        doi: 'https://arxiv.org/abs/2103.07950'
      },
      {
        id: 'DBLP:journals/corr/abs-2109-07900',
        authors: ['Vaidhyanathan, Karthik', 'Antonio Bruno', 'Eleonora Mendola', 'Filippo Mignosi', 'Mahyar Tourchi Moghaddam', 'Henry Muccini', 'Monica Nesi'],
        title: 'A Service for Supporting Digital and Immersive Cultural Experiences.',
        venue: 'CoRR',
        volume: 'abs/2109.07900',
        year: 2021,
        doi: 'https://arxiv.org/abs/2109.07900'
      },
      {
        id: 'DBLP:journals/corr/abs-2109-10073',
        authors: ['Moghaddam, Mahyar Tourchi', 'Moamin B. Abughazala', 'Vittorio Cortellessa', 'Antinisca Di Marco', 'Henry Muccini', 'Fabrizio Rossi', 'Karthik Vaidhyanathan'],
        title: 'Architecture Design for Human-Driven Systems.',
        venue: 'CoRR',
        volume: 'abs/2109.10073',
        year: 2021,
        doi: 'https://arxiv.org/abs/2109.10073'
      }
    ]
  },
  {
    year: 2020,
    papers: [
      {
        id: 'DBLP:conf/icsa/CamaraMV20',
        authors: ['Cámara, Javier', 'Henry Muccini', 'Karthik Vaidhyanathan'],
        title: 'Quantitative Verification-Aided Machine Learning: A Tandem Approach for Architecting Self-Adaptive IoT Systems.',
        venue: '2020 IEEE International Conference on Software Architecture, ICSA 2020, Salvador, Brazil, March 16-20, 2020',
        pages: '11-22',
        publisher: 'IEEE',
        year: 2020,
        doi: 'https://doi.org/10.1109/ICSA47634.2020.00010'
      },
      {
        id: 'DBLP:conf/icsa/SanctisMV20',
        authors: ['De Sanctis, Martina', 'Henry Muccini', 'Karthik Vaidhyanathan'],
        title: 'Data-Driven Adaptation in Microservice-Based IoT Architectures.',
        venue: '2020 IEEE International Conference on Software Architecture Companion, ICSA Companion 2020, Salvador, Brazil, March 16-20, 2020',
        pages: '59-62',
        publisher: 'IEEE',
        year: 2020,
        doi: 'https://doi.org/10.1109/ICSA-C50368.2020.00019'
      },
      {
        id: 'DBLP:conf/smartcomp/MucciniV20',
        authors: ['Muccini, Henry', 'Karthik Vaidhyanathan'],
        title: 'Leveraging Machine Learning Techniques for Architecting Self-Adaptive IoT Systems.',
        venue: 'IEEE International Conference on Smart Computing, SMARTCOMP 2020, Bologna, Italy, September 14-17, 2020',
        pages: '65-72',
        publisher: 'IEEE',
        year: 2020,
        doi: 'https://doi.org/10.1109/SMARTCOMP50058.2020.00029'
      },
      {
        id: 'DBLP:journals/ercim/MucciniV20',
        authors: ['Muccini, Henry', 'Karthik Vaidhyanathan'],
        title: 'Towards Self-Learnable Software Architectures.',
        venue: 'ERCIM News',
        volume: '122',
        year: 2020,
        doi: 'https://ercim-news.ercim.eu/en122/special/towards-self-learnable-software-architectures'
      }
    ]
  },
  {
    year: 2019,
    papers: [
      {
        id: 'DBLP:conf/ecsa/MucciniV19',
        authors: ['Muccini, Henry', 'Karthik Vaidhyanathan'],
        title: 'ArchLearner: Leveraging Machine-Learning Techniques for Proactive Architectural Adaptation.',
        venue: 'Proceedings of the 13th European Conference on Software Architecture, ECSA 2019, Paris, France, September 9-13, 2019, Companion Proceedings (Proceedings Volume 2)',
        pages: '38-41',
        publisher: 'ACM',
        year: 2019,
        doi: 'https://doi.org/10.1145/3344948.3344962'
      },
      {
        id: 'DBLP:conf/icsa/MucciniV19',
        authors: ['Muccini, Henry', 'Karthik Vaidhyanathan'],
        title: 'A Machine Learning-Driven Approach for Proactive Decision Making In Adaptive Architectures.',
        venue: 'IEEE International Conference on Software Architecture Companion, ICSA Companion 2019, Hamburg, Germany, March 25-26, 2019',
        pages: '242-45',
        publisher: 'IEEE',
        year: 2019,
        doi: 'https://doi.org/10.1109/ICSA-C.2019.00050'
      }
    ]
  }
];

const Publications = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sa4s-teal-50 to-sa4s-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Publications
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Our research contributions published in leading conferences and journals in software engineering and computing.
          </p>
        </div>
      </div>

      {/* Conference Banner */}
      <div className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 overflow-x-auto pb-4">
            {conferences.map((conference) => (
              <div key={conference.name} className="flex-shrink-0">
                <img
                  src={conference.logo}
                  alt={conference.name}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-150"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Publications by Year */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="multiple" className="space-y-8">
            {publicationsByYear.map((yearData) => (
              <AccordionItem key={yearData.year} value={yearData.year.toString()} className="border border-gray-200 rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                  <div className="flex items-center justify-between w-full">
                    <h2 className="text-2xl font-bold text-gray-900">{yearData.year}</h2>
                    <span className="text-sm text-gray-500 mr-4">
                      {yearData.papers.length} publication{yearData.papers.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <ul className="space-y-4">
                    {yearData.papers.map((paper, index) => (
                      <li key={paper.id} className="leading-relaxed">
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-sa4s-teal-500 rounded-full mr-4 flex-shrink-0 mt-2"></span>
                          <div>
                            <span className="text-gray-700">
                              {paper.authors.join(', ')}. 
                            </span>
                            <span className="italic text-gray-900 font-medium">
                              "{paper.title}." 
                            </span>
                            <span className="text-gray-700">
                              <em>{paper.venue}</em>
                              {paper.volume && `, vol. ${paper.volume}`}
                              {paper.pages && `, pp. ${paper.pages}`}
                              , {paper.year}.
                            </span>
                            {paper.doi && (
                              <a
                                href={paper.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-sa4s-teal-600 hover:text-sa4s-teal-700 underline inline-flex items-center"
                              >
                                DOI
                                <ExternalLink size={14} className="ml-1" />
                              </a>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Publications;
