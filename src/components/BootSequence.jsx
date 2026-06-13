import { useEffect, useState } from "react";

const bootText = [
  "mounting portfolio desktop",
  "warming React circuits",
  "syncing projects, stack, social life",
  "rendering spirit companion",
  "ready",
];

export default function BootSequence({ onComplete }) {
  const [phase, setPhase] = useState("wake");

  useEffect(() => {
    const launchTimer = window.setTimeout(() => setPhase("launch"), 1650);
    const doneTimer = window.setTimeout(onComplete, 4300);
    return () => {
      window.clearTimeout(launchTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`boot-screen boot-screen--portal boot-screen--${phase}`}
      aria-label="Booting portfolio"
    >
      <div className="boot-portal" aria-hidden="true">
        <div className="boot-portal__rings">
          <span />
          <span />
          <span />
        </div>
        <div className="boot-pixel-core">
          {Array.from({ length: 49 }, (_, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.018}s` }} />
          ))}
        </div>
      </div>

      <div className="boot-copy">
        <h1>TanveerOS</h1>
        <div className="boot-progress" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <span key={index} style={{ animationDelay: `${0.6 + index * 0.08}s` }} />
          ))}
        </div>
        <div className="boot-lines">
          {bootText.map((line, index) => (
            <p key={line} style={{ animationDelay: `${1 + index * 0.18}s` }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
