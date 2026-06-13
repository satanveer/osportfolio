import { useEffect, useState } from "react";
import { projects } from "../data";
import RetroWindow from "./RetroWindow";

function FloppyDisk({ project, selected, onClick }) {
  return (
    <button
      type="button"
      className={`floppy-disk${selected ? " is-selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="floppy-disk__shutter" aria-hidden="true" />
      <span className="floppy-disk__label">
        <strong>{project.title}</strong>
        <small>CASE STUDY</small>
      </span>
    </button>
  );
}

function ProjectPreview({ project, loading }) {
  return (
    <div className={`project-preview project-preview--${project.id}`}>
      {loading ? (
        <div className="disk-loader" role="status">
          Loading {project.title}.disk...
        </div>
      ) : null}
      <div className="preview-browser">
        <div className="preview-browser-bar">
          <i />
          <i />
          <i />
          <span>{project.title.toLowerCase().replaceAll(" ", "-")}.app</span>
        </div>
        <div className="preview-canvas">
          <small>{project.title}</small>
          <strong>{project.previewLabel}</strong>
          <div className="preview-grid">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsWindow({ onClose, onInspectProject }) {
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const [loadingId, setLoadingId] = useState(null);
  const project = projects.find((item) => item.id === selectedId) ?? projects[0];
  const loading = loadingId === project.id;

  useEffect(() => {
    if (!loadingId) return undefined;
    const timer = window.setTimeout(() => setLoadingId(null), 700);
    return () => window.clearTimeout(timer);
  }, [loadingId]);

  const selectProject = (id) => {
    setSelectedId(id);
    setLoadingId(id);
    onInspectProject?.(id);
  };

  return (
    <RetroWindow title="Projects" onClose={onClose} className="projects-window">
      <div className="projects-layout">
        <aside className="project-sidebar">
          <h2>CASE DISKS</h2>
          <div className="project-list" role="list">
            {projects.map((item) => {
              const selected = item.id === selectedId;
              return (
                <FloppyDisk
                  key={item.id}
                  project={item}
                  selected={selected}
                  onClick={() => selectProject(item.id)}
                />
              );
            })}
          </div>
        </aside>

        <article className="project-copy">
          <h2>{project.title}</h2>
          <h3>{project.subtitle}</h3>
          <p>{project.description}</p>
          <h4>{project.tech}</h4>
          <div className="project-actions">
            {project.live ? (
              <a href={project.live} target="_blank" rel="noreferrer">
                <span className="browser-glyph" aria-hidden="true">
                  WWW
                </span>
                Live site
              </a>
            ) : null}
            <a href={project.github} target="_blank" rel="noreferrer">
              <span className="browser-glyph" aria-hidden="true">
                git
              </span>
              Source
            </a>
          </div>
        </article>

        <ProjectPreview project={project} loading={loading} />
      </div>
    </RetroWindow>
  );
}
