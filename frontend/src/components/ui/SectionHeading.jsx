import CoordStamp from './CoordStamp';

export default function SectionHeading({
  eyebrow,
  title,
  align = 'left',
  tone = 'dark', // 'dark' text on light bg, 'light' text on dark bg
  className = '',
}) {
  const titleColor = tone === 'light' ? 'text-sand' : 'text-night';
  const eyebrowColor = tone === 'light' ? 'text-gold' : 'text-ochre';

  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {eyebrow && <CoordStamp label={eyebrow} className={`${eyebrowColor} mb-3 ${align === 'center' ? 'justify-center' : ''}`} />}
      <h2 className={`font-display text-3xl md:text-4xl ${titleColor}`}>{title}</h2>
    </div>
  );
}
