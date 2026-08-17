import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import NavDropdown from './NavDropdown';
import MobileNavItem from './MobileNavItem';
import { NAV_LINKS } from '@/lib/constants';
import useScrolled from '@/hooks/useScrolled';

// Small grace period before a hover panel closes, so moving the pointer
// diagonally from trigger to panel doesn't dismiss it mid-travel.
const CLOSE_DELAY = 120;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimer = useRef(null);

  const { pathname, search } = useLocation();
  const scrolled = useScrolled(40);

  // Only the homepage has a dark hero for the transparent nav to sit over.
  // Every other route starts on a light background, so the nav must be
  // solid from the first frame there.
  const isHome = pathname === '/';
  const solid = !isHome || scrolled || openDropdown !== null;

  const openNow = useCallback((label) => {
    clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }, []);

  const closeSoon = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), CLOSE_DELAY);
  }, []);

  const closeNow = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpenDropdown(null);
  }, []);

  // Clear any pending timer on unmount so we never setState after teardown.
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Dismiss everything when the route changes (covers dropdown links,
  // mobile links, logo, and browser back/forward).
  useEffect(() => {
    closeNow();
    setMobileOpen(false);
    setExpandedMobile(null);
  }, [pathname, search, closeNow]);

  // Escape closes an open panel — expected behaviour for any disclosure UI.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      closeNow();
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeNow]);

  // Prevent background scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-night/95 backdrop-blur border-b border-sand/10 shadow-sm' : 'bg-transparent'
      }`}
      onMouseLeave={closeSoon}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-sand text-xl tracking-tight">Prieska</span>
          <span className="hidden sm:inline text-[10px] font-mono tracking-[0.25em] text-gold uppercase">
            Northern Cape
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((item) =>
            item.children?.length ? (
              <NavDropdown
                key={item.label}
                item={item}
                isOpen={openDropdown === item.label}
                onOpen={() => openNow(item.label)}
                onClose={closeSoon}
                onToggle={() =>
                  openDropdown === item.label ? closeNow() : openNow(item.label)
                }
              />
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm text-sand/80 hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
          <Button as={Link} to="/directory/add" variant="ochre" className="px-4 py-2">
            List your business
          </Button>
        </nav>

        <button
          className="lg:hidden text-sand"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="lg:hidden bg-night/98 backdrop-blur border-t border-sand/10 px-6 pb-8 max-h-[calc(100vh-88px)] overflow-y-auto"
        >
          {NAV_LINKS.map((item) => (
            <MobileNavItem
              key={item.label}
              item={item}
              isExpanded={expandedMobile === item.label}
              onToggle={() =>
                setExpandedMobile((cur) => (cur === item.label ? null : item.label))
              }
              onNavigate={() => setMobileOpen(false)}
            />
          ))}
          <Link
            to="/directory/add"
            className="block mt-6 text-center px-5 py-3 rounded-full bg-ochre text-sand text-sm font-medium"
            onClick={() => setMobileOpen(false)}
          >
            List your business
          </Link>
        </nav>
      )}
    </header>
  );
}