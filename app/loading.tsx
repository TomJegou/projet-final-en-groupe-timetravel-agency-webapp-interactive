export default function Loading() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6">
        <span className="relative flex h-12 w-12 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
          <span className="relative flex h-3 w-3 rounded-full bg-gold" />
        </span>
        <p className="text-[10px] uppercase tracking-[0.4em] text-ivory-mute">
          Calibration temporelle…
        </p>
      </div>
    </section>
  );
}
