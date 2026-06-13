export default function ResumePrinter({ job, onClose, onOpenPdf }) {
  if (!job) return null;

  const ready = job.status === "ready";
  const sent = job.status === "sent";

  return (
    <section className="printer-window" role="status" aria-live="polite">
      <header>
        <strong>Resume Printer</strong>
        <button type="button" aria-label="Close resume printer" onClick={onClose}>
          X
        </button>
      </header>
      <div className="printer-body">
        <div className="printer-glyph" aria-hidden="true">
          <span />
        </div>
        <div className="printer-copy">
          <strong>
            {sent ? "Sent to PDF viewer" : ready ? "Printer needs one more click" : "Printing Tanveer.pdf"}
          </strong>
          <p>
            {sent
              ? "Resume launched. Check the new tab."
              : ready
                ? "Popup was blocked, so open it manually."
                : "Spooling pages, aligning pixels, pretending toner exists..."}
          </p>
        </div>
        <div className={`printer-progress${ready || sent ? " is-complete" : ""}`} aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.09}s` }} />
          ))}
        </div>
        {ready ? (
          <button className="printer-open" type="button" onClick={onOpenPdf}>
            Open PDF
          </button>
        ) : null}
      </div>
    </section>
  );
}
