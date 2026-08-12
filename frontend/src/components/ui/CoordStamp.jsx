import { SITE } from '@/lib/constants';

/**
 * Recurring "survey marker" label used across sections.
 * Ties the visual identity back to the spec's mapping/GPS-accuracy requirements.
 */
export default function CoordStamp({ label, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase ${className}`}>
      <span className="h-px w-6 bg-current opacity-40" aria-hidden="true" />
      <span className="opacity-70">{label || SITE.defaultCoord}</span>
    </div>
  );
}
