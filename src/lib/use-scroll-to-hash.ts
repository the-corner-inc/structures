import { useEffect } from "react";

/**
 * When the URL carries a fragment (e.g. `/naming#rules`), jump straight to the
 * matching element — a direct scroll, never a smooth animation. Content may
 * still be rendering (async markdown), so it retries until the element shows
 * up or a short timeout elapses. Run once per mount and again on any hash
 * change so SPA navigation deep-links also land.
 */
export function useScrollToHash() {
  useEffect(() => {
    let cancelled = false;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = decodeURIComponent(hash.slice(1));
      let attempts = 0;
      const tryScroll = () => {
        if (cancelled) return;
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
          return;
        }
        if (attempts < 60) {
          attempts += 1;
          window.setTimeout(tryScroll, 100);
        }
      };
      window.setTimeout(tryScroll, 0);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);
}
