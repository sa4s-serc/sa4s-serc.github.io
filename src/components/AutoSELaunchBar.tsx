import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

const DISMISS_KEY = 'autose-launch-bar-dismissed';

/**
 * Thin launch banner for AutoSE. Stays out of the way until the visitor has
 * scrolled past the hero, and stays dismissed for the rest of the session.
 */
const AutoSELaunchBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === '1');
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;
    // Hold off for a beat on load, then fade in and stay put.
    const timer = window.setTimeout(() => setVisible(true), 1000);
    return () => window.clearTimeout(timer);
  }, [dismissed]);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* non-persistent dismissal is fine */
    }
  };

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 hidden border-t border-[#1C4030] bg-[#0C2118]/95 backdrop-blur-sm transition-opacity duration-700 ease-out sm:block ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 py-2.5">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#7FD1A0] opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7FD1A0]" />
          </span>

          <p className="min-w-0 flex-1 text-xs sm:text-sm text-[#C4DDD1] truncate">
            <span className="font-semibold text-[#EDE8DF]">AutoSE is live.</span>
            <span className="hidden sm:inline">
              {' '}Autonomous software engineering that runs entirely on your own machine.
            </span>
          </p>

          <a
            href="https://autose.dev"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#2D6A4F] px-3.5 py-1.5 text-xs font-semibold text-[#EDE8DF] hover:bg-[#1D5038] transition-colors duration-150"
          >
            autose.dev
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-150" />
          </a>

          <button
            onClick={dismiss}
            aria-label="Dismiss AutoSE banner"
            className="shrink-0 rounded p-1 text-[#8DB8A2] hover:text-[#EDE8DF] hover:bg-[#1F4A30] transition-colors duration-150"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoSELaunchBar;
