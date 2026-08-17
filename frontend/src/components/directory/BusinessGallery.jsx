import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

/**
 * Listing gallery (§3.2 requires min. 10 images per listing at full rollout).
 *
 * No real photography exists yet, so tiles render as tinted placeholders.
 * Pass an `images` array of { src, alt } and it renders those instead — the
 * lightbox, keyboard nav and counter all work either way.
 */
export default function BusinessGallery({ business, images = [] }) {
  const count = images.length || business.galleryCount || 5;
  const items = images.length
    ? images
    : Array.from({ length: count }, (_, i) => ({ src: null, alt: `${business.name} — photo ${i + 1}` }));

  const [lightbox, setLightbox] = useState(null); // index or null

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );
  const next = useCallback(
    () => setLightbox((i) => (i + 1) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, prev, next]);

  const Tile = ({ item, index, className }) => (
    <button
      type="button"
      onClick={() => setLightbox(index)}
      aria-label={`Open ${item.alt}`}
      className={`relative overflow-hidden bg-gradient-to-br from-river/25 to-ochre/25 hover:opacity-90 transition-opacity ${className}`}
    >
      {item.src ? (
        <img src={item.src} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center">
          <ImageIcon size={20} className="text-night/25" aria-hidden="true" />
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Lead tile plus a 2x2 grid — falls back to a single tile on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-2 h-64 sm:h-80 rounded-2xl overflow-hidden">
        <Tile item={items[0]} index={0} className="sm:col-span-2 sm:row-span-2 h-full w-full" />
        {items.slice(1, 5).map((item, i) => (
          <Tile key={i} item={item} index={i + 1} className="hidden sm:block h-full w-full" />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setLightbox(0)}
        className="mt-3 text-sm text-ochre hover:underline"
      >
        View all {items.length} photos
      </button>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-60 bg-ink/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`${business.name} photo gallery`}
        >
          <button
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-5 right-5 text-sand/70 hover:text-sand p-2"
          >
            <X size={24} />
          </button>

          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-8 text-sand/70 hover:text-sand p-3"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="max-w-3xl w-full mx-12 aspect-[4/3] bg-gradient-to-br from-river/30 to-ochre/30 rounded-xl flex items-center justify-center">
            {items[lightbox].src ? (
              <img
                src={items[lightbox].src}
                alt={items[lightbox].alt}
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <p className="text-sand/40 text-sm font-mono">{items[lightbox].alt}</p>
            )}
          </div>

          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-3 sm:right-8 text-sand/70 hover:text-sand p-3"
          >
            <ChevronRight size={28} />
          </button>

          <p className="absolute bottom-6 left-0 right-0 text-center text-sand/50 text-xs font-mono">
            {lightbox + 1} / {items.length}
          </p>
        </div>
      )}
    </>
  );
}