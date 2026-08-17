import { X } from 'lucide-react';
import FilterPanel from './FilterPanel';
import Button from '@/components/ui/Button';

export default function MobileFilterDrawer({ open, onClose, resultCount, ...filterProps }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 lg:hidden">
      <button
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-night/60 backdrop-blur-sm"
      />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-sand flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-night/10">
          <h2 className="font-display text-lg text-night">Filters</h2>
          <button onClick={onClose} aria-label="Close filters" className="text-night/50 hover:text-night">
            <X size={22} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6">
          <FilterPanel {...filterProps} />
        </div>
        <div className="px-6 py-4 border-t border-night/10">
          <Button variant="ochre" onClick={onClose} className="w-full">
            Show {resultCount} {resultCount === 1 ? 'result' : 'results'}
          </Button>
        </div>
      </div>
    </div>
  );
}
