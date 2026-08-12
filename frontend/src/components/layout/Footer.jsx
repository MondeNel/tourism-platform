import { Phone, Mail } from 'lucide-react';
import { SITE } from '@/lib/constants';

// lucide-react no longer ships brand/logo icons — minimal inline glyphs instead
function FacebookGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.57 14.2 3.57c-2.4 0-4.05 1.47-4.05 4.17V9.9H7.4V13h2.75v8h3.35Z" />
    </svg>
  );
}

function InstagramGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const COLUMNS = [
  { h: 'Explore', items: ['Attractions', 'Accommodation', 'Events', 'Routes'] },
  { h: 'Business', items: ['List your business', 'Premium listings', 'Analytics'] },
  { h: 'Municipality', items: ['About LED', 'Contact', 'POPIA notice'] },
];

export default function Footer() {
  return (
    <footer className="bg-ink pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <span className="font-display text-xl text-sand">{SITE.name}</span>
            <p className="text-sand/40 text-sm mt-3 leading-relaxed">
              Official tourism platform for Prieska, Marydale &amp; Niekerkshoop &mdash;
              {' '}{SITE.municipality}.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.h}>
              <h5 className="text-sand text-sm font-medium mb-4">{col.h}</h5>
              <ul className="space-y-2.5">
                {col.items.map((it) => (
                  <li key={it}>
                    <a href="#" className="text-sand/40 text-sm hover:text-gold">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-sand/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] text-sand/30 tracking-widest uppercase">
            Siyathemba LED &middot; {SITE.defaultCoord}
          </span>
          <div className="flex items-center gap-4 text-sand/40">
            <Phone size={15} />
            <Mail size={15} />
            <FacebookGlyph />
            <InstagramGlyph />
          </div>
        </div>
      </div>
    </footer>
  );
}
