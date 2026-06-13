import { useDragPosition } from "./useDragPosition";

export default function DesktopActionIcon({ label, variant, onOpen, ariaLabel }) {
  const { position, movedRef, dragProps } = useDragPosition();

  const handleClick = () => {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    onOpen();
  };

  return (
    <button
      className={`desktop-icon desktop-icon--special desktop-icon--${variant}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onClick={handleClick}
      type="button"
      aria-label={ariaLabel ?? `Open ${label}`}
      {...dragProps}
    >
      <span className={`desktop-action-glyph desktop-action-glyph--${variant}`} aria-hidden="true">
        <i />
      </span>
      <span className="desktop-icon__label">{label}</span>
    </button>
  );
}
