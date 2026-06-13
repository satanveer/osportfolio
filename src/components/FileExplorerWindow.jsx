import RetroWindow from "./RetroWindow";

const explorerItems = [
  {
    id: "projects",
    label: "Projects",
    kind: "folder",
    meta: "3 featured builds",
    action: "projects",
  },
  {
    id: "stack",
    label: "Stack",
    kind: "folder",
    meta: "15 tools loaded",
    action: "stack",
  },
  {
    id: "social",
    label: "Social Life",
    kind: "folder",
    meta: "links and contact",
    action: "social",
  },
  {
    id: "about",
    label: "About Me",
    kind: "folder",
    meta: "system profile",
    action: "about",
  },
  {
    id: "resume",
    label: "Tanveer.pdf",
    kind: "pdf",
    meta: "printable resume",
    action: "resume",
  },
];

function ExplorerGlyph({ kind }) {
  return <span className={`explorer-glyph explorer-glyph--${kind}`} aria-hidden="true" />;
}

export default function FileExplorerWindow({ onClose, onOpenWindow, onPrintResume }) {
  const openItem = (item) => {
    if (item.action === "resume") {
      onPrintResume();
      return;
    }
    onOpenWindow(item.action);
  };

  return (
    <RetroWindow title="Tanveer HD" onClose={onClose} className="explorer-window">
      <div className="explorer-layout">
        <aside className="explorer-sidebar">
          <strong>Quick Access</strong>
          <span>Desktop</span>
          <span>Portfolio</span>
          <span>Resume spooler</span>
        </aside>
        <section className="explorer-main" aria-label="Tanveer HD files">
          <div className="explorer-address">
            <span>Tanveer HD</span>
            <span>/ portfolio</span>
          </div>
          <div className="explorer-list" role="list">
            {explorerItems.map((item) => (
              <button key={item.id} type="button" onClick={() => openItem(item)}>
                <ExplorerGlyph kind={item.kind} />
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </button>
            ))}
          </div>
        </section>
      </div>
    </RetroWindow>
  );
}
