import { useEffect, useState } from 'react';

/**
 * Returns true once the page has scrolled past `threshold` px.
 * Throttled via requestAnimationFrame so it doesn't spam re-renders on scroll.
 */
export default function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrolled(window.scrollY > threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    onScroll(); // set initial state (e.g. on navigating in already scrolled)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
