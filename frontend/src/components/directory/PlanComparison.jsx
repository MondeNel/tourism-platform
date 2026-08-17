import { Check, Minus } from 'lucide-react';
import { PLANS, PLAN_FEATURE_ROWS } from '@/data/plans';

function Cell({ value }) {
  if (value === false) {
    return (
      <>
        <Minus size={14} className="text-night/25 mx-auto" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  if (value === true) {
    return (
      <>
        <Check size={14} className="text-river mx-auto" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  return <span className="text-night/70">{value}</span>;
}

export default function PlanComparison() {
  return (
    <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <caption className="sr-only">
          Feature comparison across Standard, Premium and Platinum listing plans
        </caption>
        <thead>
          <tr>
            <th scope="col" className="text-left font-mono text-[10px] tracking-widest uppercase text-night/40 pb-4 pr-4 font-normal">
              Feature
            </th>
            {PLANS.map((p) => (
              <th key={p.slug} scope="col" className="pb-4 px-4 text-center">
                <span className="block font-display text-lg text-night font-normal">{p.name}</span>
                <span className="block text-xs text-night/40 mt-0.5">
                  {p.priceLabel}
                  {p.cadence}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PLAN_FEATURE_ROWS.map((row) => (
            <tr key={row.key} className="border-t border-night/10">
              <th scope="row" className="text-left py-3 pr-4 font-normal text-night/60">
                {row.label}
              </th>
              {PLANS.map((p) => (
                <td key={p.slug} className="py-3 px-4 text-center">
                  <Cell value={p.features[row.key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}