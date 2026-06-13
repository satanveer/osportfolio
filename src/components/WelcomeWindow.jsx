import RetroWindow from "./RetroWindow";

export default function WelcomeWindow({ onClose, onOpenWindow, onPrintResume, osMode }) {
  return (
    <RetroWindow title="Welcome" onClose={onClose} compact className="welcome-window">
      <div className="welcome-content">
        <div className="welcome-logo" aria-hidden="true">
          <span>{osMode === "windows" ? "95" : "OS"}</span>
        </div>
        <h2>Welcome to TanveerOS</h2>
        <p>
          Pick a folder, print the resume, or switch operating systems. This desktop rewards
          curiosity.
        </p>
        <div className="welcome-actions">
          <button type="button" onClick={() => onOpenWindow("projects")}>
            Open Projects
          </button>
          <button type="button" onClick={() => onOpenWindow("explorer")}>
            Browse Tanveer HD
          </button>
          <button type="button" onClick={onPrintResume}>
            Print Resume
          </button>
        </div>
      </div>
    </RetroWindow>
  );
}
