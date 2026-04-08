import { ArrowRight, BookOpen, FolderKanban, Mic, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

import {
  agenticHero,
  agenticMilestones,
  lifecycleExplorations,
  projectHighlights,
  publicationHighlights,
  talkHighlights,
} from "../data/agentic-ai";
import { AgenticLink } from "../data/agentic-ai/types";

const phaseOrder = [
  "Requirements",
  "Design",
  "Development",
  "Testing",
  "Deployment",
  "Maintenance",
] as const;

function LinkButton({ link }: { link: AgenticLink }) {
  const className =
    "inline-flex items-center gap-2 text-sm font-semibold text-sa4s-teal-700 transition-colors hover:text-sa4s-teal-900";

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className={className}>
        {link.label}
        <ArrowRight size={14} />
      </a>
    );
  }

  return (
    <Link to={link.href} className={className}>
      {link.label}
      <ArrowRight size={14} />
    </Link>
  );
}

function LinkRow({ links }: { links: AgenticLink[] }) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {links.map((link) => (
        <LinkButton key={`${link.label}-${link.href}`} link={link} />
      ))}
    </div>
  );
}

function HighlightSection({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: typeof projectHighlights;
}) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
            {icon}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600">Curated highlights collected into one place.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sa4s-teal-700">
                {item.subtitle}
              </p>
              <h3 className="mt-3 text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <LinkRow links={item.links} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const AgenticAI = () => {
  return (
    <div className="min-h-screen bg-[#f7faf9] pt-16">
      <section className="border-b border-gray-200 bg-[linear-gradient(135deg,#f6fbfa_0%,#eef7ff_55%,#f8fafc_100%)]">
        <div className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sa4s-teal-700">
              Centralized research map
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              {agenticHero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              {agenticHero.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="text-3xl font-bold text-gray-900">{lifecycleExplorations.length}</div>
                <p className="mt-1 text-sm text-gray-600">Lifecycle-mapped explorations</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="text-3xl font-bold text-gray-900">{projectHighlights.length}</div>
                <p className="mt-1 text-sm text-gray-600">Projects and systems pulled together</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="text-3xl font-bold text-gray-900">
                  {talkHighlights.length + publicationHighlights.length + agenticMilestones.length}
                </div>
                <p className="mt-1 text-sm text-gray-600">Talk, publication, and news highlights</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-white p-4 shadow-xl">
            <img
              src={agenticHero.image}
              alt={agenticHero.imageAlt}
              className="w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sa4s-teal-700">
              Lifecycle view
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              The image is now backed by centralized page content
            </h2>
            <p className="mt-4 text-gray-600">
              Instead of leaving the map as a disconnected graphic, the work items below are grouped
              by lifecycle phase so the page can be maintained from one place.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {phaseOrder.map((phase) => {
              const items = lifecycleExplorations.filter((item) => item.phase === phase);

              return (
                <section
                  key={phase}
                  className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-bold text-gray-900">{phase}</h3>
                    <span className="rounded-full bg-sa4s-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sa4s-teal-700">
                      {items.length} items
                    </span>
                  </div>
                  <div className="mt-5 space-y-4">
                    {items.map((item) => (
                      <article
                        key={`${phase}-${item.title}`}
                        className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="text-base font-semibold leading-6 text-gray-900">
                            {item.title}
                          </h4>
                          <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
                            {item.venue}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-gray-600">{item.note}</p>
                        <LinkRow links={item.links} />
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <HighlightSection
        title="Projects and Systems"
        icon={<FolderKanban className="text-sa4s-teal-700" size={22} />}
        items={projectHighlights}
      />

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sa4s-teal-50">
                  <Mic className="text-sa4s-teal-700" size={22} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Talks and Tutorials</h2>
                  <p className="text-gray-600">Public-facing material that was previously buried in news posts.</p>
                </div>
              </div>
              <div className="space-y-5">
                {talkHighlights.map((item) => (
                  <article key={item.title} className="rounded-3xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sa4s-teal-700">
                      {item.subtitle}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{item.description}</p>
                    <LinkRow links={item.links} />
                  </article>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                  <BookOpen className="text-blue-700" size={22} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Publication Highlights</h2>
                  <p className="text-gray-600">A curated subset of the Agentic AI publication trail.</p>
                </div>
              </div>
              <div className="space-y-5">
                {publicationHighlights.map((item) => (
                  <article key={item.title} className="rounded-3xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                      {item.subtitle}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{item.description}</p>
                    <LinkRow links={item.links} />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
              <Newspaper className="text-amber-700" size={22} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Milestones</h2>
              <p className="text-gray-600">Key moments that show how the Agentic AI line has evolved.</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {agenticMilestones.map((item) => (
              <article key={`${item.date}-${item.headline}`} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
                  {item.date}
                </p>
                <h3 className="mt-3 text-xl font-bold text-gray-900">{item.headline}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{item.description}</p>
                <LinkRow links={item.links} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgenticAI;
