import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

/**
 * Desktop dropdown for one nav item.
 *
 * Open/close state is owned by the parent Navbar (only one panel open at a
 * time), so this component is presentational plus event wiring.
 */
export default function NavDropdown({ item, isOpen, onOpen, onClose, onToggle }) {
  const panelId = `nav-panel-${item.label.replace(/\W+/g, '-').toLowerCase()}`;

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <div className="flex items-center gap-1">
        {/* Parent stays a real link — the dropdown supplements the landing
            page, it doesn't replace it. */}
        <Link
          to={item.href}
          className={`text-sm transition-colors ${isOpen ? 'text-gold' : 'text-sand/80 hover:text-gold'}`}
        >
          {item.label}
        </Link>
        {/* Separate control so keyboard users can open the panel without
            being forced to navigate to the parent page first. */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={`${isOpen ? 'Hide' : 'Show'} ${item.label} menu`}
          className={`transition-all ${isOpen ? 'text-gold rotate-180' : 'text-sand/50 hover:text-gold'}`}
        >
          <ChevronDown size={14} />
        </button>
      </div>

      {isOpen && (
        <div
          id={panelId}
          /* pt-5 bridges the gap between trigger and panel so the pointer
             never crosses dead space on the way down. */
          className="absolute left-1/2 -translate-x-1/2 top-full pt-5 z-40"
        >
          <div className="w-[320px] bg-night border border-sand/10 rounded-2xl shadow-2xl shadow-black/50 p-2 overflow-hidden">
            {item.description && (
              <p className="px-4 pt-3 pb-2 font-mono text-[10px] tracking-widest uppercase text-sand/40">
                {item.description}
              </p>
            )}
            <ul>
              {item.children.map((child) => (
                <li key={child.label}>
                  <Link
                    to={child.href}
                    onClick={onClose}
                    className="block px-4 py-2.5 rounded-xl hover:bg-panel transition-colors group"
                  >
                    <span className="block text-sm text-sand group-hover:text-gold transition-colors">
                      {child.label}
                    </span>
                    {child.description && (
                      <span className="block text-xs text-sand/45 mt-0.5">{child.description}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}