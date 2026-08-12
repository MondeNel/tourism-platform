import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-sand text-xl tracking-tight">Prieska</span>
          <span className="hidden sm:inline text-[10px] font-mono tracking-[0.25em] text-gold uppercase">
            Northern Cape
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className="text-sm text-sand/80 hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Button as={Link} to="/directory/add" variant="ochre" className="px-4 py-2">
            List your business
          </Button>
        </nav>

        <button
          className="md:hidden text-sand"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-night/95 backdrop-blur border-t border-sand/10 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} to={l.href} className="text-sand/90 text-base" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/directory/add" className="text-gold text-base" onClick={() => setOpen(false)}>
            List your business
          </Link>
        </div>
      )}
    </header>
  );
}
