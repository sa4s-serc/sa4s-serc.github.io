import {
  ClipboardList,
  PencilRuler,
  Code2,
  TestTube2,
  Rocket,
  Wrench,
  BookOpen,
  FileText,
  Newspaper,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  AgenticLifecyclePhase,
  AgenticLink,
  LifecycleMapNode,
} from "../data/agentic-ai/types";

/* ================================================================== */
/*  Phase metadata (shared by both views)                             */
/* ================================================================== */

type PhaseInfo = {
  name: AgenticLifecyclePhase;
  icon: LucideIcon;
  color: string;
  gradient: string;
};

const PHASE_LIST: PhaseInfo[] = [
  { name: "Requirements", icon: ClipboardList, color: "#0ea5e9", gradient: "linear-gradient(135deg,#38bdf8,#0284c7)" },
  { name: "Design",       icon: PencilRuler,   color: "#8b5cf6", gradient: "linear-gradient(135deg,#a78bfa,#7c3aed)" },
  { name: "Development",  icon: Code2,         color: "#10b981", gradient: "linear-gradient(135deg,#34d399,#059669)" },
  { name: "Testing",      icon: TestTube2,     color: "#f59e0b", gradient: "linear-gradient(135deg,#fbbf24,#d97706)" },
  { name: "Deployment",   icon: Rocket,        color: "#f43f5e", gradient: "linear-gradient(135deg,#fb7185,#e11d48)" },
  { name: "Maintenance",  icon: Wrench,        color: "#06b6d4", gradient: "linear-gradient(135deg,#22d3ee,#0891b2)" },
];

/* ================================================================== */
/*  SVG GRAPH — desktop (hidden below lg)                             */
/* ================================================================== */

const W = 2260;
const H = 1340;
const PHASE_W = 230;
const PHASE_H = 74;

type PhaseConfig = { icon: LucideIcon; cx: number; cy: number };

const PHASES: Record<AgenticLifecyclePhase, PhaseConfig> = {
  Maintenance:  { icon: Wrench,        cx: 400,  cy: 760 },
  Requirements: { icon: ClipboardList, cx: 820,  cy: 600 },
  Design:       { icon: PencilRuler,   cx: 1440, cy: 600 },
  Development:  { icon: Code2,         cx: 1860, cy: 760 },
  Testing:      { icon: TestTube2,     cx: 1440, cy: 920 },
  Deployment:   { icon: Rocket,        cx: 820,  cy: 920 },
};

const CYCLE: AgenticLifecyclePhase[] = [
  "Requirements", "Design", "Development", "Testing", "Deployment", "Maintenance",
];

const NOTE_W = 220;
const NOTE_H = 160;

type NotePos = { x: number; y: number; labelPos: "top" | "bottom" };

const NOTE_POSITIONS: Record<string, NotePos> = {
  // Maintenance — left column
  change:   { x: 20,  y: 50,   labelPos: "bottom" },
  calm:     { x: 20,  y: 280,  labelPos: "bottom" },
  polaris:  { x: 20,  y: 510,  labelPos: "bottom" },
  moya:     { x: 20,  y: 850,  labelPos: "bottom" },
  "sa-llm": { x: 20,  y: 1080, labelPos: "bottom" },

  // Design — four papers evenly spaced across the top (100px gap)
  monoliths:     { x: 430,  y: 50, labelPos: "top" },
  "enroute-akm": { x: 750,  y: 50, labelPos: "top" },
  "self-coding": { x: 1070, y: 50, labelPos: "top" },
  "adr-context": { x: 1390, y: 50, labelPos: "top" },

  // Requirements (shared with Design) — second row
  archview: { x: 560, y: 300, labelPos: "top" },

  // Development — second row + right column
  serverless: { x: 1500, y: 300, labelPos: "top" },
  "study-agentic": { x: 2010, y: 50,   labelPos: "bottom" },
  "agentic-akm":   { x: 2010, y: 280,  labelPos: "bottom" },
  "agents-micro":  { x: 2010, y: 510,  labelPos: "bottom" },
  "energy-code":   { x: 2010, y: 850,  labelPos: "bottom" },
  "fn-call":       { x: 2010, y: 1080, labelPos: "bottom" },

  // Testing
  "agent-assess": { x: 1230, y: 1140, labelPos: "bottom" },
  swenergy:       { x: 1620, y: 1140, labelPos: "bottom" },

  // Deployment
  iaac:          { x: 540, y: 1140, labelPos: "bottom" },
  "auto-deploy": { x: 800, y: 1140, labelPos: "bottom" },
};

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                    */
/* ------------------------------------------------------------------ */

function pickPrimary(links: AgenticLink[]): AgenticLink | undefined {
  return (
    links.find((l) => l.label.toLowerCase().includes("publication")) ||
    links.find((l) => l.label.toLowerCase().includes("blog")) ||
    links.find((l) => l.label.toLowerCase().includes("news")) ||
    links[0]
  );
}

function LinkBadge({ link }: { link: AgenticLink }) {
  const label = link.label.toLowerCase();
  const Icon = label.includes("publication")
    ? FileText
    : label.includes("blog")
    ? BookOpen
    : Newspaper;
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const cls =
    "inline-flex items-center gap-1 rounded-full border border-yellow-600/30 bg-yellow-50 px-1.5 py-[1px] text-[10px] font-semibold text-yellow-900 shadow-sm transition hover:bg-white hover:text-sa4s-teal-700";

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className={cls} onClick={stop}>
        <Icon size={10} /> {link.label}
      </a>
    );
  }
  return (
    <Link to={link.href} className={cls} onClick={stop}>
      <Icon size={10} /> {link.label}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  StickyCard (used inside SVG foreignObject)                        */
/* ------------------------------------------------------------------ */

function StickyCard({ node }: { node: LifecycleMapNode }) {
  const primary = pickPrimary(node.links);
  const inner = (
    <>
      <div
        className="line-clamp-4 text-[13px] font-bold leading-[1.25] text-gray-900"
        style={{ fontFamily: '"Patrick Hand", "Kalam", system-ui, sans-serif' }}
      >
        {node.title}
      </div>
      {node.collab && (
        <div className="mt-1 text-[11px] font-bold italic text-gray-700">[Collaboration]</div>
      )}
      <div className="mt-auto flex flex-wrap gap-1 pt-2">
        {node.links.map((l) => (
          <LinkBadge key={`${l.label}-${l.href}`} link={l} />
        ))}
      </div>
    </>
  );

  const base =
    "group relative flex h-full w-full flex-col rounded-[8px] border p-3 text-left shadow-[2px_3px_8px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_5px_12px_rgba(0,0,0,0.14)]";
  const style: React.CSSProperties = {
    background: "linear-gradient(180deg, #fffdf0 0%, #fef9c3 70%, #fef3c7 100%)",
    borderColor: "rgba(202, 138, 4, 0.25)",
  };

  if (primary?.external) {
    return (
      <a href={primary.href} target="_blank" rel="noreferrer" className={base} style={style}>
        {inner}
      </a>
    );
  }
  if (primary) {
    return (
      <Link to={primary.href} className={base} style={style}>
        {inner}
      </Link>
    );
  }
  return <div className={base} style={style}>{inner}</div>;
}

/* ------------------------------------------------------------------ */
/*  SVG geometry helpers                                              */
/* ------------------------------------------------------------------ */

function stickyAnchor(note: NotePos, targetX: number, targetY: number) {
  const cx = note.x + NOTE_W / 2;
  const cy = note.y + NOTE_H / 2;
  const dx = targetX - cx;
  const dy = targetY - cy;
  if (Math.abs(dx) / NOTE_W > Math.abs(dy) / NOTE_H) {
    const x = dx > 0 ? note.x + NOTE_W : note.x;
    const y = cy + (dy * (NOTE_W / 2)) / Math.max(1, Math.abs(dx));
    return { x, y };
  } else {
    const y = dy > 0 ? note.y + NOTE_H : note.y;
    const x = cx + (dx * (NOTE_H / 2)) / Math.max(1, Math.abs(dy));
    return { x, y };
  }
}

function phaseAnchor(phase: PhaseConfig, fromX: number, fromY: number) {
  const cx = phase.cx;
  const cy = phase.cy;
  const dx = fromX - cx;
  const dy = fromY - cy;
  if (Math.abs(dx) / PHASE_W > Math.abs(dy) / PHASE_H) {
    const x = dx > 0 ? cx + PHASE_W / 2 : cx - PHASE_W / 2;
    const y = cy + (dy * (PHASE_W / 2)) / Math.max(1, Math.abs(dx));
    return { x, y };
  } else {
    const y = dy > 0 ? cy + PHASE_H / 2 : cy - PHASE_H / 2;
    const x = cx + (dx * (PHASE_H / 2)) / Math.max(1, Math.abs(dy));
    return { x, y };
  }
}

/* ------------------------------------------------------------------ */
/*  SVG Graph (desktop)                                               */
/* ------------------------------------------------------------------ */

function DesktopGraph({ nodes }: { nodes: LifecycleMapNode[] }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ minWidth: 1200 }}
      className="block"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
        </marker>
        <filter id="card-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodOpacity="0.12" />
        </filter>
        <linearGradient id="phase-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Dashed connectors */}
      {nodes.flatMap((n) => {
        const np = NOTE_POSITIONS[n.id];
        if (!np) return [];
        const targets: AgenticLifecyclePhase[] = [n.phase, ...(n.extraPhases ?? [])];
        return targets.map((phaseName) => {
          const phase = PHASES[phaseName];
          const a = stickyAnchor(np, phase.cx, phase.cy);
          const b = phaseAnchor(phase, np.x + NOTE_W / 2, np.y + NOTE_H / 2);
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const horizontalFirst = Math.abs(dx) > Math.abs(dy);
          const r = 12;
          let d: string;
          if (horizontalFirst) {
            const midX = a.x + dx / 2;
            const sx = Math.sign(dx) || 1;
            const sy = Math.sign(dy) || 1;
            d = `M ${a.x} ${a.y} H ${midX - r * sx} Q ${midX} ${a.y}, ${midX} ${a.y + r * sy} V ${b.y - r * sy} Q ${midX} ${b.y}, ${midX + r * sx} ${b.y} H ${b.x}`;
          } else {
            const midY = a.y + dy / 2;
            const sx = Math.sign(dx) || 1;
            const sy = Math.sign(dy) || 1;
            d = `M ${a.x} ${a.y} V ${midY - r * sy} Q ${a.x} ${midY}, ${a.x + r * sx} ${midY} H ${b.x - r * sx} Q ${b.x} ${midY}, ${b.x} ${midY + r * sy} V ${b.y}`;
          }
          return (
            <path
              key={`conn-${n.id}-${phaseName}`}
              d={d}
              stroke="#475569"
              strokeWidth={1.5}
              strokeDasharray="6 5"
              fill="none"
              opacity={0.85}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        });
      })}

      {/* Cycle arrows */}
      {CYCLE.map((from, i) => {
        const to = CYCLE[(i + 1) % CYCLE.length];
        const f = PHASES[from];
        const t = PHASES[to];
        const a = phaseAnchor(f, t.cx, t.cy);
        const b = phaseAnchor(t, f.cx, f.cy);
        return (
          <line key={`cy-${from}-${to}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#475569" strokeWidth={2} markerEnd="url(#arrow)" opacity={0.85} />
        );
      })}

      {/* Central hub */}
      {(() => {
        const cx = (PHASES.Maintenance.cx + PHASES.Development.cx) / 2;
        const cy = (PHASES.Requirements.cy + PHASES.Testing.cy) / 2;
        const iconSize = 80;
        return (
          <g>
            <foreignObject x={cx - iconSize / 2} y={cy - 90} width={iconSize} height={iconSize}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: iconSize, height: iconSize, background: "linear-gradient(135deg,#5eead4 0%,#93c5fd 100%)", borderRadius: 20, color: "#0f172a", boxShadow: "0 4px 14px rgba(148,163,184,0.35)" }}>
                <Sparkles size={36} />
              </div>
            </foreignObject>
            <text x={cx} y={cy + 18} textAnchor="middle" fontSize="38" fontWeight={700} fill="#0f172a" style={{ fontFamily: "Georgia, serif" }}>Our Explorations</text>
            <text x={cx} y={cy + 64} textAnchor="middle" fontSize="34" fontWeight={700} fill="#334155" style={{ fontFamily: "Georgia, serif" }}>in GenAI &amp; SE</text>
          </g>
        );
      })()}

      {/* Phase boxes */}
      {(Object.entries(PHASES) as [AgenticLifecyclePhase, PhaseConfig][]).map(([name, p]) => {
        const Icon = p.icon;
        return (
          <g key={`phase-${name}`} filter="url(#card-shadow)">
            <rect x={p.cx - PHASE_W / 2} y={p.cy - PHASE_H / 2} width={PHASE_W} height={PHASE_H} rx={12} fill="url(#phase-grad)" stroke="#475569" strokeWidth={1} />
            <foreignObject x={p.cx - PHASE_W / 2 + 14} y={p.cy - 18} width={36} height={36}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, background: "rgba(148,163,184,0.18)", borderRadius: 8, color: "#fcd34d" }}>
                <Icon size={22} />
              </div>
            </foreignObject>
            <text x={p.cx + 20} y={p.cy + 8} textAnchor="middle" fill="#ffffff" fontSize={22} fontWeight={700}>{name}</text>
          </g>
        );
      })}

      {/* Sticky notes */}
      {nodes.map((n) => {
        const np = NOTE_POSITIONS[n.id];
        if (!np) return null;
        const labelY = np.labelPos === "top" ? np.y - 14 : np.y + NOTE_H + 24;
        return (
          <g key={`note-${n.id}`}>
            <text x={np.x + NOTE_W / 2} y={labelY} textAnchor="middle" fontSize={18} fontWeight={700} fill="#0f172a">{n.venue}</text>
            <g filter="url(#card-shadow)">
              <foreignObject x={np.x} y={np.y} width={NOTE_W} height={NOTE_H}>
                <div style={{ width: NOTE_W, height: NOTE_H }}>
                  <StickyCard node={n} />
                </div>
              </foreignObject>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/* ================================================================== */
/*  Mobile accordion view                                             */
/* ================================================================== */

function MobileCard({ node }: { node: LifecycleMapNode }) {
  const primary = pickPrimary(node.links);

  const inner = (
    <div className="rounded-xl border border-amber-200/60 bg-gradient-to-b from-[#fffdf0] to-[#fef9c3] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-bold leading-snug text-gray-900">{node.title}</h4>
        <span className="shrink-0 rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-bold text-white">
          {node.venue}
        </span>
      </div>
      {node.collab && (
        <p className="mt-1 text-xs font-semibold italic text-gray-600">[Collaboration]</p>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {node.links.map((l) => (
          <LinkBadge key={`${l.label}-${l.href}`} link={l} />
        ))}
      </div>
    </div>
  );

  if (primary?.external) {
    return (
      <a href={primary.href} target="_blank" rel="noreferrer" className="block transition hover:opacity-90">
        {inner}
      </a>
    );
  }
  if (primary) {
    return <Link to={primary.href} className="block transition hover:opacity-90">{inner}</Link>;
  }
  return inner;
}

function MobileAccordion({ nodes }: { nodes: LifecycleMapNode[] }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 px-1">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow"
          style={{ background: "linear-gradient(135deg,#5eead4,#93c5fd)" }}
        >
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Our Explorations in GenAI &amp; SE</h3>
          <p className="text-xs text-gray-500">Tap a phase to see its publications</p>
        </div>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {PHASE_LIST.map((phase) => {
          const Icon = phase.icon;
          const items = nodes.filter(
            (n) => n.phase === phase.name || n.extraPhases?.includes(phase.name)
          );
          if (items.length === 0) return null;

          return (
            <AccordionItem
              key={phase.name}
              value={phase.name}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm"
                    style={{ background: phase.gradient }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="text-left">
                    <span className="text-base font-bold text-gray-900">{phase.name}</span>
                    <span className="ml-2 text-xs font-medium text-gray-500">
                      {items.length} {items.length === 1 ? "paper" : "papers"}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-3">
                  {items.map((node) => (
                    <MobileCard key={node.id} node={node} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

/* ================================================================== */
/*  Main export — switches between desktop graph & mobile accordion   */
/* ================================================================== */

export default function LifecycleMap({ nodes }: { nodes: LifecycleMapNode[] }) {
  return (
    <div className="rounded-[2rem] border border-gray-200 bg-gradient-to-br from-[#f8fafc] via-white to-[#f1f5f9] p-4 shadow-xl sm:p-6">
      {/* Header — visible on both */}
      <div className="mb-4 hidden items-center justify-between gap-3 px-2 lg:flex">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sa4s-teal-700">
            Interactive lifecycle map
          </p>
          <h3 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            Our Explorations in GenAI &amp; SE
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Click any sticky note to open its publication, blog, or news entry.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-[11px] font-medium text-gray-600 backdrop-blur">
          <span className="inline-flex items-center gap-1"><FileText size={12} /> Publication</span>
          <span className="text-gray-300">·</span>
          <span className="inline-flex items-center gap-1"><BookOpen size={12} /> Blog</span>
          <span className="text-gray-300">·</span>
          <span className="inline-flex items-center gap-1"><Newspaper size={12} /> News</span>
        </div>
      </div>

      {/* Desktop: SVG graph */}
      <div className="hidden overflow-x-auto lg:block">
        <DesktopGraph nodes={nodes} />
      </div>

      {/* Mobile: Accordion */}
      <div className="lg:hidden">
        <MobileAccordion nodes={nodes} />
      </div>
    </div>
  );
}
