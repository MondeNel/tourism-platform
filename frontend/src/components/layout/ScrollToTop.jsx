import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Resets scroll to the top on navigation.
 *
 * Skipped for POP (browser back/forward) so returning to a list keeps the
 * reader where they were — only forward navigation jumps to the top.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === 'POP') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, navType]);

  return null;
}