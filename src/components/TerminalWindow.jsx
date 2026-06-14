import { useEffect, useRef, useState } from "react";
import RetroWindow from "./RetroWindow";

const initialLines = [
  "TanveerOS terminal v1.0",
  "type `help` for commands. try `sudo hire tanveer` if you are brave.",
];

export default function TerminalWindow({
  onClose,
  onOpenWindow,
  onPrintResume,
  onSwitchOs,
  onShowErrorEgg,
  onStartSpiritRun,
  onChangeWallpaper,
  onMoodChange,
  questCompleted,
  wallpaper,
  wallpaperOptions,
}) {
  const [lines, setLines] = useState(initialLines);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const wallpaperIds = wallpaperOptions.map((option) => option.id).join(" | ");
  const completedCount = Object.values(questCompleted).filter(Boolean).length;

  const writeLine = (line) => {
    setLines((current) => [...current, line]);
  };

  const runCommand = (rawCommand) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    setLines((current) => [...current, `> ${rawCommand}`]);

    if (command === "clear") {
      setLines(initialLines);
      return;
    }

    if (command === "help") {
      writeLine("commands: whoami, projects, resume, spirit, spirit run, quest, wallpaper, os, clear");
      writeLine("secret: sudo hire tanveer");
      return;
    }

    if (command === "whoami") {
      writeLine("Tanveer Singh: full stack dev, React enjoyer, builder of practical AI tools.");
      return;
    }

    if (command === "projects") {
      writeLine("mounting /projects...");
      onOpenWindow("projects");
      return;
    }

    if (command === "resume") {
      writeLine("spooling Tanveer.pdf...");
      onPrintResume();
      return;
    }

    if (command === "spirit") {
      onMoodChange("hacker");
      writeLine("spirit mood set to hacker. it is inspecting your tabs.");
      return;
    }

    if (command === "spirit run" || command === "run") {
      writeLine("arming lower desktop runner lane...");
      onStartSpiritRun();
      return;
    }

    if (command === "quest") {
      writeLine(`quest progress: ${completedCount}/9 complete.`);
      return;
    }

    if (command === "os") {
      writeLine("switching desktop shell...");
      onSwitchOs();
      return;
    }

    if (command.startsWith("wallpaper")) {
      const [, requested] = command.split(/\s+/);
      if (!requested) {
        writeLine(`current wallpaper: ${wallpaper}. options: ${wallpaperIds}`);
        return;
      }
      if (!wallpaperOptions.some((option) => option.id === requested)) {
        writeLine(`unknown wallpaper "${requested}". options: ${wallpaperIds}`);
        return;
      }
      onChangeWallpaper(requested);
      writeLine(`wallpaper changed to ${requested}.`);
      return;
    }

    if (command === "sudo hire tanveer") {
      writeLine("permission granted. launching hire.exe...");
      onShowErrorEgg();
      return;
    }

    writeLine(`command not found: ${rawCommand}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runCommand(input);
    setInput("");
  };

  return (
    <RetroWindow title="Hidden Terminal" onClose={onClose} compact className="terminal-window">
      <div className="terminal-content" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-lines" aria-live="polite">
          {lines.map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </div>
        <form className="terminal-input" onSubmit={handleSubmit}>
          <span aria-hidden="true">&gt;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </RetroWindow>
  );
}
