import { useDragPosition } from "./useDragPosition";

export default function RetroWindow({
  title,
  onClose,
  children,
  compact = false,
  className = "",
}) {
  const { position, dragProps } = useDragPosition();

  return (
    <section
      className={`retro-window${compact ? " retro-window--compact" : ""} ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <header className="window-header" {...dragProps}>
        <button
          className="window-close"
          type="button"
          aria-label={`Close ${title}`}
          onClick={onClose}
        >
          X
        </button>
        <strong className="window-title">{title}</strong>
        <div className="window-stripes" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
      </header>
      <div className="window-body">{children}</div>
    </section>
  );
}
