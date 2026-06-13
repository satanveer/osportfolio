export default function Screensaver({ active, onDismiss }) {
  if (!active) return null;

  return (
    <button className="screensaver" type="button" onClick={onDismiss} aria-label="Wake desktop">
      <span className="screensaver__stars" aria-hidden="true" />
      <span className="screensaver__logo">TanveerOS</span>
      <span className="screensaver__pet" aria-hidden="true">
        Zzz
      </span>
      <span className="screensaver__hint">move mouse / tap to wake</span>
    </button>
  );
}
