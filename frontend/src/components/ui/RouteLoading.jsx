export default function RouteLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-sand" role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-ochre animate-pulse" />
        <span className="w-2 h-2 rounded-full bg-ochre animate-pulse [animation-delay:150ms]" />
        <span className="w-2 h-2 rounded-full bg-ochre animate-pulse [animation-delay:300ms]" />
        <span className="sr-only">Loading page…</span>
      </div>
    </div>
  );
}
