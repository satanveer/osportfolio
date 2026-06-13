import RetroWindow from "./RetroWindow";

const skillMarks = ["JS", "TS", "RE", "PY", "FL", "SB", "DB"];

export default function AboutWindow({ onClose }) {
  return (
    <RetroWindow title="About me" onClose={onClose} compact className="about-window">
      <div className="about-content">
        <img className="about-mac" src="/assets/about-mac.png" alt="" />
        <h2>TanveerOS 95</h2>
        <h3>Version 3.141592...</h3>

        <div className="memory-head">
          <span>Memory</span>
          <span>0.06MB free of 965 ZB</span>
        </div>
        <div className="memory-bar" aria-label="Memory use">
          <span />
          <span>Code</span>
          <span>Ideas</span>
          <span>Ship</span>
        </div>

        <dl className="about-specs">
          <div>
            <dt>Processor</dt>
            <dd>Full Stack Developer</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Open to SDE roles</dd>
          </div>
          <div>
            <dt>Experience</dt>
            <dd>Fidelity, Elucidata, AssignmentPal</dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>B.Tech CSE, GNDU</dd>
          </div>
          <div>
            <dt>Skills</dt>
            <dd className="about-skills">
              {skillMarks.map((mark) => (
                <span key={mark}>{mark}</span>
              ))}
            </dd>
          </div>
        </dl>

        <a className="resume-button" href="/Tanveer.pdf" download>
          Download instruction manual
          <span aria-hidden="true">⇩</span>
        </a>
        <p className="about-footer">
          Tanveer Singh Systems © 2021–2026. Built in India.
          <br />
          Designed to be useful, occasionally delightful.
        </p>
      </div>
    </RetroWindow>
  );
}
