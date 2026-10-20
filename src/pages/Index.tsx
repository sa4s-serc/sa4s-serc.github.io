
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, Network, Code2, FlaskConical, ArrowRight, Check, Github, Mail } from 'lucide-react';
import Hero from '../components/Hero';
import PulseStrip from '../components/PulseStrip';
import FeaturedNews from '../components/FeaturedNews';
import LogoCloud from '../components/LogoCloud';
import AutoSELaunchBar from '../components/AutoSELaunchBar';
import AutoSEPreview from '../components/AutoSEPreview';
import allSpotlightItems from 'virtual:spotlight';
const spotlightItems = allSpotlightItems.filter((s) => s.homepage).slice(0, 10);
import { publicUrl } from '../lib/utils';

const inView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const;


const autoseHighlights = [
  'Autonomous software engineering.',
  'Asks before it runs anything.',
  'Highly compatible with local SLMs.',
  'Made in India.',
  'A product of SA4S backed by peer reviewed research from our group.',
];

// ── Research areas ─────────────────────────────────────────────────────────
const researchAreas = [
  {
    icon: <Layers size={18} />,
    title: 'Software Architecture for AI',
    abbr: 'SA for AI',
    desc: 'This research area investigates how to architect AI systems that hold up in production, covering architectural patterns for LLM-based pipelines, sustainable MLOps, multi-agent system design, energy-aware deployment, and empirical studies on how agentic frameworks behave under real workloads. The goal is to give practitioners principled architectural guidance for building AI systems that are observable, maintainable, and resource-efficient at scale.',
  },
  {
    icon: <Network size={18} />,
    title: 'AI for Software Architecture',
    abbr: 'AI for SA',
    desc: "This research area explores how large language models and autonomous agents can assist or automate generating and maintaining architectural decision records, recovering architecture views from source code, detecting and localising technical debt, supporting refactoring from monolith to microservices, and managing architecture knowledge over a system's lifetime. Work spans design-time tooling and benchmarking through to runtime self-adaptation, where systems reason about their own state and reconfigure to meet shifting quality goals without human intervention.",
  },
  {
    icon: <Code2 size={18} />,
    title: 'Code Generation',
    abbr: 'CodeGen',
    desc: 'As code generation shifts toward autonomous, multi-agent development workflows, software architecture becomes essential for designing systems that are modular, maintainable, and efficient. This research area studies how architectural techniques—including memory management, agent coordination, and hybrid SLM–LLM pipelines—can improve the accuracy, scalability, and robustness of AI-assisted software engineering. We also investigate energy-aware architectures that minimize computational overhead while maintaining high-quality code generation, with the goal of building sustainable and trustworthy agentic development systems.',
  },
  {
    icon: <FlaskConical size={18} />,
    title: 'Empirical Studies in Software Engineering',
    abbr: 'Empirical SE',
    desc: 'By grounding software architecture in empirical evidence, we systematically analyze engineering practices, trade-offs, and design artifacts. We formulate research questions and hypotheses, design experiments to test them on a wide range of real-world subjects, and analyze the results with rigorous statistical methods. Through these data-driven and experimental studies, we derive lessons and insights for both practitioners and researchers, and develop practical methodologies and decision-making frameworks to guide practitioners in designing reliable, maintainable, and sustainable architectures.',
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF7F2]">

      {/* ── Hero ──────────────────────────────────── */}
      <Hero />

      {/* ── AutoSE launch ─────────────────────────── */}
      {/* no z-index here: the page's grain and vignette overlays sit at z-5, and
          lifting the section above them made this band read lighter than the rest */}
      <section className="relative bg-[#FAF7F2] pt-10 pb-2">
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* desktop only: the dashboard hides behind the card and peeks over its
                corner, arriving after the highlights have animated in */}
            <motion.div
              className="absolute -top-14 right-8 z-0 hidden w-[22rem] rotate-[15deg] lg:block xl:-top-16 xl:right-16 xl:w-[27rem]"
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 1.05, ease: 'easeOut' }}
            >
              <AutoSEPreview variant="peek" />
            </motion.div>

            <motion.div
              className="relative z-10 overflow-hidden rounded-2xl border border-[#1C4030] bg-[#0C2118]"
              {...inView}
            >
            {/* soft green wash, keeps the block from reading as a flat ad slab */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#2D6A4F]/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid gap-7 p-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10 lg:p-8">
              <div className="min-w-0">
                <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#2D6A4F]/50 bg-[#102A1C] px-3 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#7FD1A0] opacity-60 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7FD1A0]" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7FD1A0]">
                      Patented
                    </span>
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8DB8A2]">
                    v0.2 · Apache 2.0
                  </span>
                </div>

                <h2 className="font-garamond text-3xl leading-tight text-[#EDE8DF] lg:text-[2.6rem] lg:leading-[1.15]">
                  AutoSE
                  <span className="block text-[#7FD1A0]">Local first and fully sovereign.</span>
                </h2>

                <motion.ul
                  className="mt-6 grid gap-x-7 gap-y-3 text-sm text-[#C4DDD1] sm:grid-cols-2 lg:text-[0.95rem]"
                  initial="hidden"
                  whileInView="shown"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={{ shown: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
                >
                  {autoseHighlights.map((point, i) => (
                    <motion.li
                      key={point}
                      className={`flex items-start gap-2.5 ${
                        i === autoseHighlights.length - 1 ? 'sm:col-span-2' : ''
                      }`}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        shown: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
                      }}
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2D6A4F]/25 text-[#7FD1A0]">
                        <Check size={13} strokeWidth={2.5} />
                      </span>
                      <span className="leading-snug">{point}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* provenance — SA4S first, then the ANRF grant */}
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-[#142E1E] pt-5">
                  {/* cream chip so the ANRF mark, which has dark type, stays legible */}
                  <div className="flex shrink-0 items-center gap-3.5 rounded-xl bg-[#EDE8DF] px-4 py-2.5">
                    <img
                      src={publicUrl('/images/logos/sa4s.png')}
                      alt="SA4S Research Group"
                      className="h-10 w-10 shrink-0 object-contain"
                    />
                    <span className="h-8 w-px shrink-0 bg-[#C8C2B6]" aria-hidden="true" />
                    <img
                      src={publicUrl('/images/collabpic/anrf.png')}
                      alt="Anusandhan National Research Foundation"
                      className="h-9 w-auto shrink-0 object-contain"
                    />
                  </div>
                  <p className="min-w-0 basis-full text-[11px] leading-relaxed text-[#8DB8A2] sm:basis-0 sm:flex-1">
                    Patented technology from AutoSE Labs and the SA4S research group, supported by{' '}
                    <a
                      href="https://anrfonline.in/"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#7FD1A0] underline decoration-[#2D6A4F] underline-offset-2 transition-colors duration-150 hover:text-[#EDE8DF]"
                    >
                      ANRF
                    </a>{' '}
                    under the SustAInd project.
                  </p>
                </div>
              </div>

              {/* terminal + the dashboard tucked in behind it */}
              <div className="relative flex min-w-0 flex-col">
                <div className="relative z-10 min-w-0 overflow-hidden rounded-xl border border-[#1C4030] bg-[#06120C] shadow-lg shadow-[#06120C]/50">
                  <div className="flex items-center gap-2 border-b border-[#142E1E] bg-[#0A1C12] px-3.5 py-2.5">
                    <span className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2E4036]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2E4036]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2E4036]" />
                    </span>
                    <span className="ml-1 font-mono text-[10px] tracking-wide text-[#6F9A82]">
                      install
                    </span>
                  </div>

                  <div className="px-4 py-4 sm:px-5">
                    <code className="block overflow-x-auto whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-[#EDE8DF] sm:whitespace-nowrap sm:break-normal sm:text-[15px]">
                      <span className="select-none text-[#4A7C61]">$ </span>
                      curl -fsSL https://autose.dev/install.sh | sh
                    </code>
                    <p className="mt-3 border-t border-[#142E1E] pt-3 font-mono text-[11px] leading-relaxed text-[#6F9A82] sm:text-[13px]">
                      <span className="select-none">PS&gt; </span>
                      irm https://autose.dev/install.ps1 | iex
                    </p>
                  </div>
                </div>

                {/* actions sit directly under the install block */}
                <div className="relative z-10 mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href="https://autose.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#2D6A4F] px-5 py-2.5 text-sm font-medium text-[#EDE8DF] shadow-sm transition-colors duration-200 hover:bg-[#1D5038]"
                  >
                    Explore AutoSE
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-150 group-hover:translate-x-0.5"
                    />
                  </a>
                  <a
                    href="https://github.com/AutoSE-Labs/autose"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#1C4030] px-5 py-2.5 text-sm font-medium text-[#C4DDD1] transition-colors duration-200 hover:border-[#2D6A4F] hover:text-[#EDE8DF]"
                  >
                    <Github size={14} />
                    Source on GitHub
                  </a>
                </div>

                {/* phone and tablet keep the screenshot in the flow, under the buttons */}
                <div className="relative z-0 mt-6 lg:hidden">
                  <AutoSEPreview variant="inline" />
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Research areas ────────────────────────── */}
      <section className="py-8 bg-[#FAF7F2]">
        <div className="container mx-auto px-4">
          <motion.div className="mb-6 text-center" {...inView}>
            <h2 className="text-xl lg:text-2xl text-[#2D6A4F] tracking-[0.25em] uppercase font-semibold">What We Work On</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {researchAreas.map((area, i) => (
              <motion.button
                key={area.abbr}
                onClick={() => navigate('/research')}
                className="group flex gap-4 text-left border border-[#D8D2C4] hover:border-[#2D6A4F]/45 rounded-xl p-5 bg-[#F0EBE1] hover:bg-[#EAE4D6] transition-all duration-200 w-full md:w-[calc(33.333%-0.5rem)]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              >
                <div className="flex-shrink-0 mt-0.5 text-[#2D6A4F] group-hover:text-[#1D5038] transition-colors duration-200">
                  {area.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#2D6A4F] tracking-widest uppercase font-semibold mb-1.5">
                    {area.abbr}
                  </div>
                  <h3 className="font-semibold text-sm text-[#1A1710] mb-1.5 leading-snug">
                    {area.title}
                  </h3>
                  <p className="text-xs text-[#6B6455] leading-relaxed line-clamp-2">{area.desc}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#2D6A4F]/60 group-hover:text-[#2D6A4F] transition-colors duration-150">
                    Read more <ArrowRight size={10} />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subscribe — mobile only, above spotlight ──────── */}
      <div className="lg:hidden bg-[#F0EBE1] border-b border-[#D8D2C4] px-6 py-6 text-center">
        <p className="text-xs text-[#2D6A4F] tracking-[0.25em] uppercase font-semibold mb-3">Newsletter</p>
        <p className="text-sm text-[#6B6455] mb-5 max-w-xs mx-auto leading-relaxed">
          Research updates, paper releases, and lab news from SA4S.
        </p>
        <a
          href="mailto:sa4sserc@gmail.com?subject=I%20wish%20to%20subscribe%20to%20the%20SA4S%20Newsletter.&body=Simply%20hit%20send%20on%20this%20mail%20and%20we%20will%20add%20you%20to%20our%20list%20%3A%29"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D6A4F] text-[#EDE8DF] rounded-full text-sm font-medium hover:bg-[#1D5038] transition-colors duration-200"
        >
          <Mail size={14} />
          Subscribe to Updates
        </a>
        <p className="text-[11px] text-[#9A9080] mt-3">Unsubscribe anytime.</p>
      </div>

      {/* ── Spotlight grid ── */}
      <section id="spotlight" className="w-full">
        <div className="px-4 pt-10 pb-2 lg:px-[clamp(6rem,14vw,12rem)] lg:pt-12 lg:pb-4 text-center">
          <h2 className="text-xl lg:text-2xl text-[#2D6A4F] tracking-[0.25em] uppercase font-semibold">Spotlight</h2>
        </div>

        {/* Mobile: single column, image + title below */}
        <div className="lg:hidden flex flex-col gap-5 px-4 py-4">
          {spotlightItems.map((s, i) => (
            <motion.div
              key={s.date}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link to={`/spotlight?item=${s.date}`} className="block">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  {s.image && (
                    <img
                      src={publicUrl(s.image)}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading={i < 2 ? 'eager' : 'lazy'}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                  {s.tag && (
                    <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#52B788]">
                      {s.tag}
                    </span>
                  )}
                </div>
                <div className="pt-2.5 px-0.5">
                  <h3 className="text-sm font-semibold text-[#1A1710] leading-snug">{s.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop: 2-column grid with overlay text */}
        <div className="hidden lg:block px-[clamp(6rem,14vw,12rem)] py-8">
          <div className="grid grid-cols-2 gap-5">
            {spotlightItems.map((s, i) => {
              const isLastOdd = spotlightItems.length % 2 === 1 && i === spotlightItems.length - 1;
              return (
                <motion.div
                  key={s.date}
                  className={isLastOdd ? 'col-span-2 w-1/2 mx-auto' : ''}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.08 }}
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl group cursor-pointer">
                    <Link to={`/spotlight?item=${s.date}`} className="absolute inset-0 z-10" aria-label={s.title} />
                    {s.image && (
                      <img
                        src={publicUrl(s.image)}
                        alt={s.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                        loading={i < 2 ? 'eager' : 'lazy'}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/5 to-transparent" />
                    <div className="absolute inset-0 ring-inset ring-0 group-hover:ring-[1.5px] ring-white/25 transition-all duration-400" />
                    <div className="absolute top-0 left-0 right-0 p-5">
                      <h3 className="text-base font-bold text-white leading-snug">{s.title}</h3>
                    </div>
                    <div className="absolute bottom-0 left-0 p-6">
                      {s.tag && (
                        <span className="text-[11px] tracking-[0.22em] uppercase font-semibold text-[#52B788]">
                          {s.tag}
                        </span>
                      )}
                      <div className="mt-3 flex items-center gap-1.5 text-white/60 text-sm font-medium group-hover:text-white transition-colors duration-200">
                        <span>Explore</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-150" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────── */}
      <PulseStrip />

      {/* ── Subscribe strip — desktop only, below stats ───── */}
      <div className="hidden lg:block bg-[#F0EBE1] border-b border-[#D8D2C4]">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between gap-8">
          <div>
            <p className="text-sm font-semibold text-[#1A1710]">Stay in touch with our group</p>
            <p className="text-xs text-[#6B6455] mt-0.5">Research updates, paper releases, and lab news. Unsubscribe anytime.</p>
          </div>
          <a
            href="mailto:sa4sserc@gmail.com?subject=I%20wish%20to%20subscribe%20to%20the%20SA4S%20Newsletter.&body=Simply%20hit%20send%20on%20this%20mail%20and%20we%20will%20add%20you%20to%20our%20list%20%3A%29"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2 bg-[#2D6A4F] text-[#EDE8DF] rounded-full text-sm font-medium hover:bg-[#1D5038] transition-colors duration-200"
          >
            <Mail size={14} />
            Subscribe to Updates
          </a>
        </div>
      </div>

      {/* ── Latest news ───────────────────────────── */}
      <motion.div {...inView}>
        <FeaturedNews />
      </motion.div>

      {/* ── Logos ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <LogoCloud />
      </motion.div>

      <AutoSELaunchBar />

    </div>
  );
};

export default Index;
