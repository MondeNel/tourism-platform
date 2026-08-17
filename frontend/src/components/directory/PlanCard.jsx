import { Check, Crown } from 'lucide-react';

export default function PlanCard({ plan, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plan.slug)}
      aria-pressed={selected}
      className={`relative text-left rounded-2xl p-6 border-2 transition-all duration-200 flex flex-col h-full ${
        selected
          ? 'border-ochre bg-white shadow-lg shadow-ochre/10'
          : 'border-night/10 bg-white hover:border-night/25'
      }`}
    >
      {plan.highlight && (
        <span className="absolute -top-3 left-6 px-2.5 py-1 rounded-full bg-gold text-night text-[11px] font-medium">
          Most popular
        </span>
      )}

      <div className="flex items-start justify-between mb-1">
        <h3 className="font-display text-2xl text-night">{plan.name}</h3>
        {plan.slug === 'platinum' && <Crown size={18} className="text-gold" />}
      </div>

      <p className="text-night/50 text-sm mb-4">{plan.tagline}</p>

      <p className="mb-5">
        <span className="font-display text-3xl text-night">{plan.priceLabel}</span>
        {plan.cadence && <span className="text-night/40 text-sm">{plan.cadence}</span>}
      </p>

      <ul className="space-y-2 flex-1">
        {plan.summary.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-night/70">
            <Check size={14} className="text-river mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <span
        className={`mt-6 block text-center px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
          selected ? 'bg-ochre text-sand' : 'bg-night/5 text-night/60'
        }`}
      >
        {selected ? 'Selected' : 'Choose plan'}
      </span>
    </button>
  );
}