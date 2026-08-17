import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

/**
 * Mobile nav item. Tap the chevron to expand children; tap the label to
 * navigate to the parent page. Hover menus don't work on touch, so the same
 * nav data renders as an accordion here.
 */
export default function MobileNavItem({ item, isExpanded, onToggle, onNavigate }) {
  const panelId = `mobile-panel-${item.label.replace(/\W+/g, '-').toLowerCase()}`;
  const hasChildren = Boolean(item.children?.length);

  return (
    <div className="border-b border-sand/10 last:border-b-0">
      <div className="flex items-center justify-between py-4">
        <Link to={item.href} onClick={onNavigate} className="text-sand/90 text-base">
          {item.label}
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={panelId}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label} menu`}
            className="p-2 -mr-2 text-sand/50"
          >
            <ChevronDown
              size={18}
              className={`transition-transform ${isExpanded ? 'rotate-180 text-gold' : ''}`}
            />
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <ul id={panelId} className="pb-3 pl-4 border-l border-sand/10 ml-1 space-y-1">
          {item.children.map((child) => (
            <li key={child.label}>
              <Link
                to={child.href}
                onClick={onNavigate}
                className="block py-2 text-sm text-sand/65 hover:text-gold transition-colors"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}