const baseInput =
  'w-full px-4 py-3 rounded-xl border bg-white text-sm text-night placeholder:text-night/35 outline-none transition-colors';

function wrapperClasses(error) {
  return error ? 'border-red-400 focus:border-red-500' : 'border-night/15 focus:border-ochre';
}

export function Field({ label, htmlFor, error, hint, required, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-night mb-1.5">
        {label}
        {required && <span className="text-ochre ml-0.5" aria-hidden="true">*</span>}
      </label>
      {hint && <p className="text-xs text-night/45 mb-2">{hint}</p>}
      {children}
      {error && (
        <p className="text-xs text-red-600 mt-1.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ id, error, ...props }) {
  return (
    <input
      id={id}
      className={`${baseInput} ${wrapperClasses(error)}`}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
  );
}

export function TextArea({ id, error, rows = 4, ...props }) {
  return (
    <textarea
      id={id}
      rows={rows}
      className={`${baseInput} ${wrapperClasses(error)} resize-y`}
      aria-invalid={Boolean(error)}
      {...props}
    />
  );
}

export function Select({ id, error, children, ...props }) {
  return (
    <select id={id} className={`${baseInput} ${wrapperClasses(error)}`} aria-invalid={Boolean(error)} {...props}>
      {children}
    </select>
  );
}