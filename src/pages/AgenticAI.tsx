import { ArrowRight, BookOpen, FolderKanban, Mic } from "lucide-react";
import { Link } from "react-router-dom";

import CountUp from "../components/CountUp";
import LifecycleMap from "../components/LifecycleMap";
import {
  lifecycleExplorations,
  lifecycleMapNodes,
  projectHighlights,
  publicationHighlights,
  talkHighlights,
} from "../data/agentic-ai";
import { AgenticLink } from "../data/agentic-ai/types";

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

const AgenticAI = () => {
  return (
    <div className="min-h-screen bg-[#f7faf9]">
      {/* Page title */}
      <section className="bg-[linear-gradient(135deg,#f6fbfa_0%,#eef7ff_55%,#f8fafc_100%)] pb-10 pt-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Our Explorations in GenAI &amp; SE
          </h1>
        </div>
      </section>

      {/* Interactive lifecycle map */}
      <section className="border-b border-gray-200 bg-[linear-gradient(135deg,#f6fbfa_0%,#eef7ff_55%,#f8fafc_100%)]">
        <div className="container mx-auto px-4 pb-12">
          <LifecycleMap nodes={lifecycleMapNodes} />

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-gray-900">
                <CountUp to={lifecycleExplorations.length} />
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Lifecycle-mapped explorations
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-gray-900">
                <CountUp to={projectHighlights.length} />
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Projects and systems pulled together
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-gray-900">
                <CountUp
                  to={
                    talkHighlights.length +
                    publicationHighlights.length
                  }
                />
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Talk, publication, and news highlights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three-column: Projects | Talks | Publications — with dividers & theme accents */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid gap-0 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {/* Projects & Systems — teal theme */}
            <div className="px-4 lg:px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm" style={{ background: "linear-gradient(135deg,#ccfbf1,#99f6e4)" }}>
                  <FolderKanban className="text-sa4s-teal-700" size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Projects &amp; Systems</h2>
              </div>
              <div className="space-y-4">
                {projectHighlights.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-teal-100 bg-teal-50/40 p-5 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sa4s-teal-700">
                      {item.subtitle}
                    </p>
                    <h3 className="mt-2 text-base font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-medium text-gray-600 ring-1 ring-teal-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <LinkRow links={item.links} />
                  </article>
                ))}
              </div>
            </div>

            {/* Divider 1 */}
            <div className="hidden lg:flex lg:items-stretch lg:justify-center lg:px-0">
              <div className="w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
            </div>
            <hr className="my-8 border-gray-200 lg:hidden" />

            {/* Talks & Tutorials — amber/warm theme */}
            <div className="px-4 lg:px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm" style={{ background: "linear-gradient(135deg,#fef3c7,#fde68a)" }}>
                  <Mic className="text-amber-700" size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Talks &amp; Tutorials</h2>
              </div>
              <div className="space-y-4">
                {talkHighlights.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                      {item.subtitle}
                    </p>
                    <h3 className="mt-2 text-base font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                    <LinkRow links={item.links} />
                  </article>
                ))}
              </div>
            </div>

            {/* Divider 2 */}
            <div className="hidden lg:flex lg:items-stretch lg:justify-center lg:px-0">
              <div className="w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
            </div>
            <hr className="my-8 border-gray-200 lg:hidden" />

            {/* Publication Highlights — blue/indigo theme */}
            <div className="px-4 lg:px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm" style={{ background: "linear-gradient(135deg,#dbeafe,#bfdbfe)" }}>
                  <BookOpen className="text-blue-700" size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Publication Highlights</h2>
              </div>
              <div className="space-y-4">
                {publicationHighlights.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                      {item.subtitle}
                    </p>
                    <h3 className="mt-2 text-base font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                    <LinkRow links={item.links} />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgenticAI;
