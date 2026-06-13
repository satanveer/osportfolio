export default function Win95ErrorEgg({ open, onClose, onHire }) {
  if (!open) return null;

  return (
    <section className="win95-error" role="alertdialog" aria-label="Networking.exe">
      <header>
        <strong>Networking.exe</strong>
        <button type="button" aria-label="Close hire prompt" onClick={onClose}>
          X
        </button>
      </header>
      <div className="win95-error__body">
        <span className="win95-error__icon" aria-hidden="true">
          !
        </span>
        <p>Networking.exe has detected strong candidate energy.</p>
      </div>
      <footer>
        <button type="button" onClick={onClose}>
          Ignore
        </button>
        <a
          href="mailto:satanveersingh@gmail.com?subject=Let%27s%20work%20together"
          onClick={onHire}
        >
          Hire
        </a>
      </footer>
    </section>
  );
}
