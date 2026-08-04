import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Users, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { blogPosts } from '@/lib/posts';
import { useEffect, useState } from 'react';
import { publicUrl } from '@/lib/utils';
import { defaultPhoto, teamMembers } from '@/data/teamData';
import { memberSlug } from '@/pages/Team';

function findTeamMember(authorName: string) {
  const target = authorName.trim().toLowerCase();
  return teamMembers.find((m) => m.name.trim().toLowerCase() === target);
}

function parseAuthors(author: string) {
  return author
    .split(/,|&|\band\b/i)
    .map((s) => s.trim())
    .filter(Boolean);
}

function AuthorCard({ author }: { author: string }) {
  const authors = parseAuthors(author);
  const isGroup = authors.length > 1;
  const single = !isGroup ? findTeamMember(authors[0]) : null;
  const singlePhoto = single?.photo && single.photo !== '' ? single.photo : defaultPhoto;

  return (
    <div className="bg-[#173B29] border border-[#2D6A4F]/40 rounded-xl px-4 py-3 shadow-lg flex flex-col items-center text-center w-40">
      {isGroup ? (
        <div className="w-14 h-14 rounded-full bg-[#2D6A4F]/40 ring-2 ring-[#2D6A4F]/50 mb-2 flex items-center justify-center">
          <Users size={26} className="text-[#8DB8A2]" />
        </div>
      ) : (
        <img
          src={publicUrl(singlePhoto)}
          alt={authors[0]}
          loading="lazy"
          decoding="async"
          className="w-14 h-14 rounded-full object-cover ring-2 ring-[#2D6A4F]/50 mb-2"
        />
      )}
      <p className="text-xs text-[#8DB8A2] tracking-wide uppercase mb-0.5">
        {isGroup ? 'Authors' : 'Author'}
      </p>
      <div className="text-sm font-semibold text-[#EDE8DF] leading-snug flex flex-col gap-0.5">
        {authors.map((name) => {
          const member = findTeamMember(name);
          return member ? (
            <Link
              key={name}
              to={`/team#${memberSlug(member.name)}`}
              className="hover:text-[#52B788] hover:underline transition-colors duration-150"
            >
              {name}
            </Link>
          ) : (
            <span key={name}>{name}</span>
          );
        })}
      </div>
      {!isGroup && single && (
        <Link
          to={`/team#${memberSlug(single.name)}`}
          className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-[#52B788] hover:text-[#EDE8DF] transition-colors duration-150"
        >
          View profile
          <ArrowRight size={11} />
        </Link>
      )}
    </div>
  );
}


      
/*
      <p class="mb-6">Using the Proximal Policy Optimization (PPO) algorithm, POSEIDON's Deep RL model learns from past experiences, figuring out which function placements work well in different situations. The model can then quickly make decisions about where to place functions, responding to dynamic workloads in real time. This is particularly useful in fast-changing environments like MEC networks, where rapid adaptation is key.</p>
      
      <p class="mb-6">Once the function placement is decided by the Deep RL model, POSEIDON applies MILP to determine the most efficient routing policy, ensuring that overloaded nodes can offload tasks to other nodes in the network.</p>
      
      <p class="mb-8">This combination of Deep RL and MILP provides a more scalable and responsive system compared to traditional approaches like NEPTUNE.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">POSEIDON vs. NEPTUNE: Key Differences</h2>
      
      <p class="mb-4">While both POSEIDON and NEPTUNE address the same core challenges in MEC network management, POSEIDON's use of Deep RL offers several potential advantages:</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Faster Decision-Making:</strong> POSEIDON's Deep RL model can make decisions about function placement in constant time, significantly reducing the time it takes to respond to changing network conditions. This makes it well-suited for real-time applications.</li>
        <li><strong>Scalability:</strong> As the number of nodes and applications grows, NEPTUNE's performance declines due to the increasing complexity of MILP-based optimization. POSEIDON's hybrid approach maintains consistent performance, even as the network scales.</li>
        <li><strong>Comparable Performance:</strong> Initial tests show that POSEIDON delivers results similar to NEPTUNE in terms of network efficiency and workload distribution. However, POSEIDON achieves this with much faster processing times.</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">A Step Forward, but More Research Ahead</h2>
      
      <p class="mb-4">While POSEIDON offers promising improvements in MEC network management, it's still a developing area of research. The integration of Deep RL with traditional optimization methods is relatively new, and more work is needed to fully explore its potential. For example, understanding the trade-offs between decision speed and accuracy in different types of networks will be important as POSEIDON continues to evolve.</p>
      
      <p class="mb-6">However, the early results are encouraging. POSEIDON has demonstrated the ability to scale more effectively than NEPTUNE, making it an interesting direction for future research in MEC networks.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Looking Ahead</h2>
      
      <p class="mb-6">As IoT and 5G technologies continue to expand, MEC networks will play an increasingly important role in providing real-time services for smart cities, autonomous vehicles, and other data-driven applications. Managing these networks efficiently is critical, and frameworks like POSEIDON offer new tools for tackling the growing complexity of edge computing.</p>
      
      <p class="mb-6">Researchers and developers interested in exploring this area further can access POSEIDON's source code on <a href="https://github.com/example/poseidon" class="text-sa4s-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a> and read the <a href="#" class="text-sa4s-teal-600 hover:underline">research paper</a>. Although it's still early days, POSEIDON offers a glimpse into how AI-driven methods could enhance the future of network management.</p>
      
      <p class="mb-8">POSEIDON represents a step toward more flexible and scalable solutions for managing MEC networks, providing a foundation for future developments in this rapidly evolving field.</p>
    `,
    date: '2024-10-23',
    author: 'Research Team',
    category: 'Network Systems',
    thumbnail: '/images/blogpic/poseidon_networks.png'
  }
*/
export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<{
    slug: string;
    title: string;
    excerpt?: string;
    date: string;
    author: string;
    category: string;
    thumbnail: string;
    content: string;
  } | null>(null);
  
  useEffect(() => {
    if (id && blogPosts[id]) {
      setPost({
        ...blogPosts[id].metadata,
        slug: id,
        content: blogPosts[id].content
      });
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs text-[#2D6A4F] tracking-[0.25em] uppercase font-semibold mb-3">Not found</p>
          <h1 className="text-2xl font-bold text-[#1A1710] mb-4">Post not found</h1>
          <Link to="/blogs" className="text-[#2D6A4F] hover:text-[#1A1710] text-sm underline transition-colors">
            Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">

      {/* Header */}
      <div className="relative bg-[#0C2118] border-b border-[#1C4030] py-12">
        {post.author && (
          <div className="hidden lg:block absolute top-1/2 right-[max(1rem,calc(50%-42rem+1rem))] -translate-y-1/2 z-10">
            <AuthorCard author={post.author} />
          </div>
        )}
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blogs"
              className="inline-flex items-center text-[#8DB8A2] hover:text-[#EDE8DF] mb-6 text-sm transition-colors duration-150"
            >
              <ArrowLeft size={15} className="mr-2" />
              Back to all posts
            </Link>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#EDE8DF] mb-4 leading-snug pr-0 lg:pr-44">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-[#8DB8A2] mb-6 leading-relaxed max-w-2xl">{post.excerpt}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#8DB8A2]">
              {post.category && (
                <span className="bg-[#1F4A30] text-[#8DB8A2] px-3 py-1 rounded font-medium tracking-wide">
                  {post.category}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <User size={12} />
                {post.author}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-sm md:prose-base prose-headings:font-bold prose-headings:text-[#1A1710] prose-p:text-[#6B6455] prose-p:mb-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4 prose-li:my-1 prose-strong:text-[#1A1710] prose-a:text-[#2D6A4F] hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-[#D8D2C4]">
          {post && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-2xl md:text-3xl font-bold mt-8 mb-5 text-[#1A1710]" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-8 mb-4 text-[#1A1710]" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-base font-bold mt-6 mb-3 text-[#1A1710]" {...props} />,
                p:  ({node, ...props}) => <p className="mb-4 leading-relaxed text-[#6B6455]" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-5 space-y-1.5 text-[#6B6455]" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-[#6B6455]" {...props} />,
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                a:  ({node, ...props}) => <a className="text-[#2D6A4F] hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote
                    className="not-italic border-none my-6 pl-5 md:pl-6 py-1 border-l-4 border-[#2D6A4F] text-base md:text-lg font-medium leading-snug text-[#1A1710] [&>p]:mb-0"
                    {...props}
                  />
                ),
                img: ({node, ...props}) => {
                  const src = props.src ? publicUrl(props.src) : '';
                  return (
                    <div className="my-6">
                      <img src={src} alt={props.alt || ''} className="rounded-xl border border-[#D8D2C4] w-full" />
                      {props.alt && (
                        <p className="text-center text-xs text-[#6B6455] mt-2">{props.alt}</p>
                      )}
                    </div>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          )}

          {post.author && (
            <div className="lg:hidden mt-10 pt-8 border-t border-[#D8D2C4] flex justify-center">
              <AuthorCard author={post.author} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
