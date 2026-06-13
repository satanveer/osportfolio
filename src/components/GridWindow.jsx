import RetroWindow from "./RetroWindow";

export default function GridWindow({
  title,
  items,
  onClose,
  social = false,
}) {
  return (
    <RetroWindow title={title} onClose={onClose} className="grid-window">
      <div className={`icon-grid${social ? " icon-grid--social" : ""}`}>
        {items.map((item) => {
          const [mark, label] = Array.isArray(item)
            ? item
            : [item.mark, item.label];
          const contents = (
            <>
              <span className="grid-icon">
                <span>{mark}</span>
              </span>
              <strong>{label}</strong>
            </>
          );

          return social ? (
            <a
              key={label}
              className="grid-item"
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
            >
              {contents}
            </a>
          ) : (
            <div className="grid-item" key={label}>
              {contents}
            </div>
          );
        })}
      </div>
    </RetroWindow>
  );
}
