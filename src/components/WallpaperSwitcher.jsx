import RetroWindow from "./RetroWindow";

export default function WallpaperSwitcher({ onClose, options, selected, onChange }) {
  return (
    <RetroWindow title="Display Properties" onClose={onClose} compact className="wallpaper-window">
      <section className="wallpaper-panel">
        <header>
          <h2>Display Properties</h2>
          <p>Choose a desktop wallpaper. The spirit has opinions.</p>
        </header>
        <div className="wallpaper-options" role="list">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`wallpaper-option wallpaper-option--${option.id}${
                selected === option.id ? " is-selected" : ""
              }`}
              onClick={() => onChange(option.id)}
              aria-pressed={selected === option.id}
            >
              <span aria-hidden="true" />
              <strong>{option.label}</strong>
              <small>{option.description}</small>
            </button>
          ))}
        </div>
        <button className="wallpaper-done" type="button" onClick={onClose}>
          Close Display
        </button>
      </section>
    </RetroWindow>
  );
}
