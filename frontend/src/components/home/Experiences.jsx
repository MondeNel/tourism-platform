import { Link } from 'react-router-dom';
import { Moon, Waves, Landmark, Mountain, Wheat, Tent, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { EXPERIENCES } from '@/data/experiences';

const ICONS = { Moon, Waves, Landmark, Mountain, Wheat, Tent };

export default function Experiences() {
  return (
    <section className="bg-night py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="What to do here" title="Six ways into the Karoo" tone="light" className="mb-14 max-w-lg" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-sand/10 rounded-2xl overflow-hidden">
          {EXPERIENCES.map(({ icon, name, desc, slug }) => {
            const Icon = ICONS[icon];
            return (
              <Link
                key={slug}
                to={`/experiences/${slug}`}
                className="group bg-night p-8 hover:bg-panel transition-colors"
              >
                <Icon size={22} className="text-gold mb-5" strokeWidth={1.5} />
                <h3 className="text-sand font-medium mb-2">{name}</h3>
                <p className="text-sand/50 text-sm leading-relaxed mb-4">{desc}</p>
                <span className="inline-flex items-center gap-1 text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ChevronRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
