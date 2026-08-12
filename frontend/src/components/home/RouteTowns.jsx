import { Link } from 'react-router-dom';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { TOWNS } from '@/data/towns';

export default function RouteTowns() {
  return (
    <section className="bg-sand pt-28 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <SectionHeading eyebrow="Three towns, one route" title="Along the Siyathemba stretch" />
          <Link to="/routes/self-drive" className="hidden md:flex items-center gap-1 text-sm text-night/60 hover:text-ochre">
            View self-drive route <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8 md:gap-6">
          {/* connecting line */}
          <div className="hidden md:block absolute top-[38px] left-[16.6%] right-[16.6%] h-px bg-night/15" aria-hidden="true" />
          {TOWNS.map((t, i) => (
            <Link key={t.slug} to={`/towns/${t.slug}`} className="relative block group">
              <div className="hidden md:flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full bg-ochre ring-4 ring-ochre/15" />
                <span className="font-mono text-[11px] tracking-widest text-night/40 uppercase">
                  Stop {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="bg-white rounded-2xl p-7 h-full border border-night/5 group-hover:border-ochre/30 group-hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-display text-2xl text-night mb-1">{t.name}</h3>
                <p className="text-ochre text-xs font-medium uppercase tracking-wide mb-4">{t.tag}</p>
                <p className="text-night/60 text-sm leading-relaxed mb-6">{t.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-night/40">{t.coord}</span>
                  <ChevronRight size={16} className="text-ochre" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
