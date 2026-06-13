const labels = {
  mac: {
    from: "Win95",
    to: "Mac OS",
    left: "WIN",
    right: "MAC",
  },
  windows: {
    from: "Mac OS",
    to: "Win95",
    left: "MAC",
    right: "WIN",
  },
};

export default function OsTransition({ target }) {
  if (!target) return null;

  const copy = labels[target];

  return (
    <div className="os-transition" role="status" aria-live="polite">
      <div className="os-transition__panel">
        <p>SWITCHING OS...</p>
        <div className="os-transition__icons" aria-hidden="true">
          <span>{copy.left}</span>
          <i />
          <span>{copy.right}</span>
        </div>
        <div className="os-transition__bar" aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.055}s` }} />
          ))}
        </div>
        <strong>
          Translating pixels from {copy.from} to {copy.to}
          <span aria-hidden="true">...</span>
        </strong>
        <div className="os-transition__orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
