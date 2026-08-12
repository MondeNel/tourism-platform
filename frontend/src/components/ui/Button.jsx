const VARIANTS = {
  ochre: 'bg-ochre text-sand hover:bg-ochre-dark',
  gold: 'bg-gold text-night hover:bg-gold-light',
  sand: 'bg-sand text-night hover:bg-gold',
  outline: 'bg-transparent text-sand border border-sand/30 hover:border-gold hover:text-gold',
};

export default function Button({ children, variant = 'ochre', className = '', as: As = 'button', ...props }) {
  return (
    <As
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </As>
  );
}
