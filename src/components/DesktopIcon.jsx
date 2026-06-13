import { useDragPosition } from "./useDragPosition";

export default function DesktopIcon({ image, label, onOpen, inverted = false, windowsIcon }) {
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
      className={`desktop-icon${inverted ? " desktop-icon--inverted" : ""}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onClick={handleClick}
      type="button"
      aria-label={`Open ${label}`}
      {...dragProps}
    >
      <img src={image} alt="" draggable="false" />
      {windowsIcon ? (
        <span
          className={`windows-desktop-glyph windows-desktop-glyph--${windowsIcon}`}
          aria-hidden="true"
        >
          <i />
        </span>
      ) : null}
      <span className="desktop-icon__label">{label}</span>
    </button>
  );
}
