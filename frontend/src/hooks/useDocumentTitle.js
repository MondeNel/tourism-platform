import { useEffect } from 'react';

const SITE_SUFFIX = 'Prieska Tourism | Siyathemba Municipality';

/**
 * Sets document.title and the meta description tag for the current page.
 * Kept dependency-free (no react-helmet) since this is a client-rendered
 * SPA for now — real SSR/prerendering for search visibility is a backend
 * concern flagged separately for §4.5 (SEO & Digital Marketing).
 */
export default function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_SUFFIX}` : SITE_SUFFIX;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}
