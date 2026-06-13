const questItems = [
  ["folders", "Open every folder"],
  ["os", "Switch OS"],
  ["resume", "Find the resume"],
  ["bonk", "Bonk the spirit"],
  ["terminal", "Open hidden terminal"],
  ["disk", "Load a case disk"],
  ["wallpaper", "Change wallpaper"],
  ["error", "Find hire.exe"],
  ["screensaver", "Wake screensaver"],
];

export default function QuestLog({ completed }) {
  const doneCount = questItems.filter(([id]) => completed[id]).length;

  return (
    <aside className="quest-log" aria-label="Desktop quest log">
      <header>
        <strong>Quest Log</strong>
        <span>
          {doneCount}/{questItems.length}
        </span>
      </header>
      <ul>
        {questItems.map(([id, label]) => (
          <li key={id} className={completed[id] ? "is-complete" : ""}>
            <span aria-hidden="true">{completed[id] ? "x" : ""}</span>
            {label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
