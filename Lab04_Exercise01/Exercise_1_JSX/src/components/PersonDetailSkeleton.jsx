export default function PersonDetailSkeleton() {
  return (
    <section
      className="person-skeleton"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="sr-only">Loading person details...</p>

      <div className="skeleton skeleton-title" aria-hidden="true" />
      <div className="skeleton skeleton-text" aria-hidden="true" />
      <div className="skeleton skeleton-text" aria-hidden="true" />
      <div className="skeleton skeleton-text" aria-hidden="true" />
    </section>
  );
}