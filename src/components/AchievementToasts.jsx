export default function AchievementToasts({ toasts }) {
  return (
    <div className="achievement-stack" aria-live="polite" aria-label="Achievements">
      {toasts.map((toast) => (
        <article className="achievement-toast" key={toast.toastId}>
          <span className="achievement-toast__badge" aria-hidden="true">
            {toast.mark}
          </span>
          <div>
            <strong>{toast.title}</strong>
            <p>{toast.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
