import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { publicUrl } from '../lib/utils';

const SHOT = '/autose/dashboard.png';

/**
 * The AutoSE dashboard screenshot, hiding behind the launch card and peeking
 * over its top-right corner. It bobs gently until clicked, then opens full size.
 */
const AutoSEPreview = ({ variant = 'peek' }: { variant?: 'peek' | 'inline' }) => {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const isPeek = variant === 'peek';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Expand the AutoSE dashboard screenshot"
        className={
          isPeek
            ? 'group relative block w-full origin-bottom cursor-pointer rounded-t-xl border border-b-0 border-[#D8D2C4] bg-[#F0EBE1] p-1.5 pb-0 shadow-xl shadow-[#1A1710]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D6A4F]'
            : 'group relative block w-full overflow-hidden rounded-xl border border-[#1C4030] bg-[#0A1C12] text-left transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7FD1A0]'
        }
        animate={isPeek && !reduceMotion ? { y: [0, -7, 0] } : undefined}
        transition={
          isPeek && !reduceMotion
            ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
        whileHover={isPeek ? { y: -14, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
        whileTap={{ scale: 0.97 }}
      >
        {isPeek ? (
          <span className="block overflow-hidden rounded-t-lg">
            <img
              src={publicUrl(SHOT)}
              alt="The AutoSE dashboard, showing open sessions and a new session prompt"
              loading="lazy"
              width={1100}
              height={777}
              className="block w-full object-cover object-top"
            />
          </span>
        ) : (
          <img
            src={publicUrl(SHOT)}
            alt="The AutoSE dashboard, showing open sessions and a new session prompt"
            loading="lazy"
            width={1100}
            height={777}
            className="block w-full origin-top scale-[1.02] object-cover object-top opacity-90 transition-all duration-300 ease-out [aspect-ratio:1100/420] group-hover:scale-105 group-hover:opacity-100 sm:[aspect-ratio:1100/360]"
          />
        )}

        {!isPeek && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A1C12] via-[#0A1C12]/70 to-transparent"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-3.5 pb-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8DB8A2]">
                The dashboard
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2D6A4F]/60 bg-[#0C2118]/90 px-2.5 py-1 text-[10px] font-semibold text-[#7FD1A0]">
                <Maximize2 size={10} />
                Tap to view
              </span>
            </span>
          </>
        )}

        {isPeek && (
          <span className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#0C2118]/85 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#7FD1A0] opacity-90 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
            <Maximize2 size={9} />
            View
          </span>
        )}
      </motion.button>

      {/* portalled to the body: a transformed ancestor (the tilted peek) would
          otherwise become the containing block for position: fixed */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              role="dialog"
            aria-modal="true"
            aria-label="AutoSE dashboard screenshot"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#06120C]/92 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 16 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            >
              <img
                src={publicUrl(SHOT)}
                alt="The AutoSE dashboard, showing open sessions and a new session prompt"
                className="max-h-[82vh] w-full rounded-xl border border-[#1C4030] object-contain shadow-2xl"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close screenshot"
                className="absolute -top-3 -right-3 rounded-full border border-[#1C4030] bg-[#0C2118] p-2 text-[#C4DDD1] transition-colors duration-150 hover:bg-[#1F4A30] hover:text-[#EDE8DF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7FD1A0]"
              >
                <X size={16} />
              </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};

export default AutoSEPreview;
