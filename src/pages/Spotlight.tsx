
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import allSpotlightItems from 'virtual:spotlight';
import { publicUrl } from '../lib/utils';

type SpotlightItem = typeof allSpotlightItems[number];

const TAG_COLORS: Record<string, string> = {
  Latest:     'bg-[#1F4A30] text-[#52B788]',
  Award:      'bg-[#3B2A0A] text-[#D4A843]',
  Conference: 'bg-[#0A2233] text-[#5BA4CF]',
  Team:       'bg-[#2A1040] text-[#A78BDA]',
  Research:   'bg-[#1F4A30] text-[#52B788]',
};
const defaultTag = 'bg-[#1C2A1E] text-[#8DB8A2]';

function tagClass(tag: string) {
  return TAG_COLORS[tag] ?? defaultTag;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

// ── Content renderer ─────────────────────────────────────────────────────────
function SpotlightContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="mb-5 leading-relaxed text-[#3A342A]">
            {children}
          </p>
        ),
        img: ({ src, alt }) => (
          <img
            src={src?.startsWith('/') ? publicUrl(src) : src}
            alt={alt ?? ''}
            className="w-full rounded-xl border border-[#D8D2C4] my-4 object-cover"
          />
        ),
        a: ({ href, children }) => {
          const cls = "inline-flex items-center gap-1.5 px-4 py-2 bg-[#2D6A4F] text-[#EDE8DF] rounded-full text-sm font-medium hover:bg-[#1D5038] transition-colors duration-200 no-underline mr-2 mb-2";
          const isFile = /\.\w{2,5}$/.test(href ?? '');
          if (href?.startsWith('/') && !isFile) {
            return <Link to={href} className={cls}>{children}</Link>;
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
              {children}
              {(href?.startsWith('http') || isFile) && <ExternalLink size={12} />}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
function Card({ item, onClick }: { item: SpotlightItem; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      className="group text-left w-full flex flex-col rounded-2xl overflow-hidden border border-[#D8D2C4] hover:border-[#2D6A4F] bg-[#F0EBE1] hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 shrink-0 overflow-hidden bg-[#E0DBD0]">
        {item.image ? (
          <img
            src={publicUrl(item.image)}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1F4A30]/20 to-[#D8D2C4]" />
        )}
        {item.tag && (
          <span className={`absolute top-3 left-3 text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full ${tagClass(item.tag)}`}>
            {item.tag}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[11px] text-[#9A8F80] mb-2">{formatDate(item.date)}</p>
        <h3 className="text-xl font-semibold text-[#1A1710] leading-snug mb-2 group-hover:text-[#2D6A4F] transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-xs text-[#7A7060] leading-relaxed line-clamp-3 flex-1">{item.preview}</p>
        <div className="flex items-center gap-1.5 text-[#2D6A4F] text-xs font-medium mt-4">
          Read more
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-150" />
        </div>
      </div>
    </motion.button>
  );
}

// ── Mosaic gallery ────────────────────────────────────────────────────────────
// Bento pattern: images named big1/big2/... always take the largest slot;
// everything else cycles through a repeating rhythm of wide/tall/large/small
// cells so the grid reads as a designed mosaic rather than a thumbnail sheet.
function isFeatured(src: string) {
  return /\/big\d+\.\w+$/i.test(src);
}
const BENTO_PATTERN = [
  'col-span-2 row-span-2',
  '',
  'row-span-2',
  '',
  'col-span-2',
  '',
  '',
  'row-span-2',
  'col-span-2 row-span-2',
  '',
  'col-span-2',
  '',
];
function bentoSpan(src: string, order: number) {
  if (isFeatured(src)) return 'col-span-2 row-span-2';
  return BENTO_PATTERN[order % BENTO_PATTERN.length];
}

function GalleryMosaic({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const step = (dir: -1 | 1) => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + dir + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-[#6B6455] mb-4">
        Gallery
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[190px] md:auto-rows-[220px] gap-3 grid-flow-dense">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActiveIndex(i)}
            className={`group relative overflow-hidden rounded-xl border border-[#D8D2C4] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${bentoSpan(src, i)}`}
          >
            <img
              src={publicUrl(src)}
              alt={`${title} photo ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={close}
          onKeyDown={(e) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') step(-1);
            if (e.key === 'ArrowRight') step(1);
          }}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={close} className="absolute top-4 right-4 text-white/70 hover:text-white z-10" aria-label="Close">
              <X size={28} />
            </button>
            <button onClick={() => step(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10" aria-label="Previous image">
              <ChevronLeft size={40} />
            </button>
            <button onClick={() => step(1)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10" aria-label="Next image">
              <ChevronRight size={40} />
            </button>
            <img
              src={publicUrl(images[activeIndex])}
              alt={`${title} photo ${activeIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Detail view ───────────────────────────────────────────────────────────────
function Detail({ item, onBack }: { item: SpotlightItem; onBack: () => void }) {
  const hasGallery = item.gallery && item.gallery.length > 0;

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`mx-auto ${hasGallery ? 'max-w-6xl' : 'max-w-2xl'}`}
    >
      <div className={hasGallery ? 'max-w-2xl mx-auto' : ''}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#6B6455] hover:text-[#2D6A4F] transition-colors duration-150 mb-8 group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
          Back
        </button>

        {item.tag && (
          <span className={`inline-block text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full mb-4 ${tagClass(item.tag)}`}>
            {item.tag}
          </span>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1710] leading-tight mb-3">
          {item.title}
        </h1>

        <p className="text-sm text-[#9A8F80] mb-8">{formatDate(item.date)}</p>
      </div>

      {item.video ? (
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden mb-8 border border-[#D8D2C4] aspect-video bg-black">
          <video
            src={publicUrl(item.video)}
            poster={item.image ? publicUrl(item.image) : undefined}
            controls
            preload="none"
            className="w-full h-full object-cover"
          />
        </div>
      ) : item.image ? (
        <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden mb-8 border border-[#D8D2C4] aspect-video">
          <img
            src={publicUrl(item.image)}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      <div className={hasGallery ? 'max-w-2xl mx-auto' : ''}>
        <div className="mb-10">
          <SpotlightContent content={item.content} />
        </div>
      </div>

      {hasGallery && <GalleryMosaic images={item.gallery} title={item.title} />}
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
const Spotlight = () => {
  const [selected, setSelected] = useState<SpotlightItem | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const itemDate = searchParams.get('item');
    if (itemDate) {
      const found = allSpotlightItems.find((s) => s.date === itemDate);
      if (found) {
        setSelected(found);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  const openItem = (item: SpotlightItem) => {
    setSelected(item);
    setSearchParams({ item: item.date }, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setSelected(null);
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      <div className="bg-[#0C2118] border-b border-[#1C4030] py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#EDE8DF]">Spotlight</h1>
          <p className="mt-3 text-sm text-[#8DB8A2]">
            Highlights from our research, awards, and community.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-14">
        <AnimatePresence mode="wait">
          {selected ? (
            <Detail key="detail" item={selected} onBack={goBack} />
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {allSpotlightItems.map((item) => (
                <Card key={item.date} item={item} onClick={() => openItem(item)} />
              ))}
              {allSpotlightItems.length === 0 && (
                <p className="col-span-3 text-center text-[#6B6455] text-sm py-16">No spotlight items yet.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Spotlight;
