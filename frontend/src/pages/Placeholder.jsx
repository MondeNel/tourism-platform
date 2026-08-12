import { useParams, useLocation, Link } from 'react-router-dom';
import { Construction } from 'lucide-react';
import Button from '@/components/ui/Button';
import useDocumentTitle from '@/hooks/useDocumentTitle';

export default function Placeholder({ title }) {
  const params = useParams();
  const location = useLocation();
  const slug = Object.values(params)[0];

  useDocumentTitle(title || 'Page coming soon');

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-sand pt-32 pb-20">
      <Construction size={28} className="text-ochre mb-5" strokeWidth={1.5} aria-hidden="true" />
      <p className="font-mono text-[11px] tracking-widest uppercase text-night/40 mb-3">
        {location.pathname}
      </p>
      <h1 className="font-display text-3xl text-night mb-2">
        {title || 'This page is coming soon'}
      </h1>
      {slug && <p className="text-night/50 text-sm mb-8">Building out: {slug}</p>}
      <Button as={Link} to="/" variant="ochre">
        Back to home
      </Button>
    </div>
  );
}
