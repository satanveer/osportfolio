import { useCallback, useEffect, useRef, useState } from "react";
import AchievementToasts from "./components/AchievementToasts";
import AboutWindow from "./components/AboutWindow";
import BootSequence from "./components/BootSequence";
import DesktopActionIcon from "./components/DesktopActionIcon";
import DesktopIcon from "./components/DesktopIcon";
import DesktopPet from "./components/DesktopPet";
import FileExplorerWindow from "./components/FileExplorerWindow";
import GridWindow from "./components/GridWindow";
import OsTransition from "./components/OsTransition";
import ProjectsWindow from "./components/ProjectsWindow";
import QuestLog from "./components/QuestLog";
import ResumePrinter from "./components/ResumePrinter";
import Screensaver from "./components/Screensaver";
import SpiritRunGame from "./components/SpiritRunGame";
import TerminalWindow from "./components/TerminalWindow";
import WelcomeWindow from "./components/WelcomeWindow";
import WallpaperSwitcher from "./components/WallpaperSwitcher";
import Win95ErrorEgg from "./components/Win95ErrorEgg";
import { socialLinks, techStack } from "./data";

const folderWindowNames = ["projects", "stack", "social", "about"];

const achievements = {
  folders: {
    mark: "4/4",
    title: "Opened every folder",
    description: "The desktop has no secrets left.",
  },
  os: {
    mark: "95",
    title: "Switched OS",
    description: "Mac pixels successfully translated.",
  },
  resume: {
    mark: "PDF",
    title: "Found the resume",
    description: "Instruction manual acquired.",
  },
  bonk: {
    mark: "!",
    title: "Bonked the spirit",
    description: "He will remember this for about 0.7 seconds.",
  },
  terminal: {
    mark: ">_",
    title: "Opened hidden terminal",
    description: "Command line unlocked. Dangerous in a charming way.",
  },
  disk: {
    mark: "3.5",
    title: "Loaded a case disk",
    description: "Project data read from extremely official media.",
  },
  wallpaper: {
    mark: "RGB",
    title: "Changed wallpaper",
    description: "Interior design privileges granted.",
  },
  error: {
    mark: "EXE",
    title: "Found hire.exe",
    description: "The most suspiciously useful program.",
  },
  screensaver: {
    mark: "ZZZ",
    title: "Woke the screensaver",
    description: "The desktop dreamed in bouncing pixels.",
  },
  runner: {
    mark: "RUN",
    title: "Started Spirit Run",
    description: "The lower desktop became cardio.",
  },
};

const petReactions = {
  projects: { message: "good choice. this folder has the builds.", pose: "waving" },
  stack: { message: "toolbox unlocked. many tiny acronyms inside.", pose: "review" },
  social: { message: "network folder open. be normal in there.", pose: "waving" },
  about: { message: "lore unlocked.", pose: "waving" },
  explorer: { message: "hard drive found. do not defrag my snacks.", pose: "review" },
  resume: { message: "spooling the instruction manual.", pose: "review" },
  welcome: { message: "welcome panel loaded. very official.", pose: "waving" },
  terminal: { message: "terminal detected. black screen, big feelings.", pose: "review" },
  wallpaper: { message: "display settings open. choose wisely.", pose: "waving" },
};

const windowMoods = {
  projects: "curious",
  stack: "hacker",
  social: "curious",
  about: "curious",
  explorer: "curious",
  welcome: "curious",
  terminal: "hacker",
  wallpaper: "curious",
};

const wallpaperOptions = [
  {
    id: "default",
    label: "Classic Teal",
    description: "The official calm boot state.",
  },
  {
    id: "night",
    label: "Night Grid",
    description: "Late build energy with tiny stars.",
  },
  {
    id: "paper",
    label: "Paper Desk",
    description: "Soft resume-review mode.",
  },
  {
    id: "matrix",
    label: "Matrix-ish",
    description: "Terminal mood, but decorative.",
  },
];

const initialQuestFlags = {
  folders: false,
  os: false,
  resume: false,
  bonk: false,
  terminal: false,
  disk: false,
  wallpaper: false,
  error: false,
  screensaver: false,
};

function SystemIcon({ children, label, href, onClick }) {
  const className = "system-icon";
  if (href) {
    return (
      <a className={className} href={href} aria-label={label}>
        {children}
      </a>
    );
  }

  if (!onClick) {
    return (
      <span className={className} aria-label={label} role="img">
        {children}
      </span>
    );
  }

  return (
    <button className={className} type="button" onClick={onClick} aria-label={label}>
      {children}
    </button>
  );
}

function Clock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <time dateTime={time.toISOString()}>
      {time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
    </time>
  );
}

function SpeakerIcon({ muted }) {
  return (
    <svg viewBox="0 0 32 24" aria-hidden="true">
      <path d="M3 9h6l7-6v18l-7-6H3z" />
      {muted ? <path d="m21 8 8 8m0-8-8 8" /> : <path d="M21 7c3 2 3 8 0 10m4-14c6 4 6 14 0 18" />}
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 32 24" aria-hidden="true">
      <rect x="2" y="3" width="28" height="18" />
      <path d="m3 4 13 11L29 4M3 20l9-9m17 9-9-9" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 38 24" aria-hidden="true">
      <path d="M2 3h31v18H2zM35 8h2v8h-2zM5 6l21 12" />
    </svg>
  );
}

function OsSwitch({ mode, onSwitch, disabled }) {
  const isWindows = mode === "windows";
  const currentLabel = isWindows ? "Win95" : "Mac OS";
  const targetLabel = isWindows ? "Mac OS" : "Win95";

  return (
    <button
      className="os-switch"
      type="button"
      onClick={onSwitch}
      disabled={disabled}
      aria-label={`Switch to ${targetLabel}`}
    >
      <span className="os-switch__mark" aria-hidden="true">
        {isWindows ? "WIN" : "MAC"}
      </span>
      <span>{currentLabel}</span>
      <span className="os-switch__caret" aria-hidden="true" />
    </button>
  );
}

function StartMenu({
  open,
  osMode,
  onOpenWindow,
  onPrintResume,
  onSwitchOs,
  onShowErrorEgg,
  onClose,
}) {
  if (!open) return null;

  const openItem = (name) => {
    onOpenWindow(name);
    onClose();
  };

  return (
    <nav className="start-menu" aria-label="Start menu">
      <strong>TanveerOS</strong>
      <button type="button" onClick={() => openItem("welcome")}>
        <span className="start-menu__glyph start-menu__glyph--welcome" aria-hidden="true" />
        Welcome
      </button>
      <button type="button" onClick={() => openItem("explorer")}>
        <span className="start-menu__glyph start-menu__glyph--drive" aria-hidden="true" />
        Tanveer HD
      </button>
      <button type="button" onClick={() => openItem("projects")}>
        <span className="start-menu__glyph start-menu__glyph--folder" aria-hidden="true" />
        Projects
      </button>
      <button type="button" onClick={() => openItem("stack")}>
        <span className="start-menu__glyph start-menu__glyph--program" aria-hidden="true" />
        Stack
      </button>
      <button type="button" onClick={() => openItem("terminal")}>
        <span className="start-menu__glyph start-menu__glyph--terminal" aria-hidden="true" />
        Terminal
      </button>
      <button type="button" onClick={() => openItem("wallpaper")}>
        <span className="start-menu__glyph start-menu__glyph--wallpaper" aria-hidden="true" />
        Display
      </button>
      <button
        type="button"
        onClick={() => {
          onPrintResume();
          onClose();
        }}
      >
        <span className="start-menu__glyph start-menu__glyph--printer" aria-hidden="true" />
        Print Resume
      </button>
      <button
        type="button"
        onClick={() => {
          onShowErrorEgg();
          onClose();
        }}
      >
        <span className="start-menu__glyph start-menu__glyph--error" aria-hidden="true" />
        Hire Tanveer.exe
      </button>
      <button
        type="button"
        onClick={() => {
          onSwitchOs();
          onClose();
        }}
      >
        <span className="start-menu__glyph start-menu__glyph--switch" aria-hidden="true" />
        Switch to {osMode === "windows" ? "Mac OS" : "Win95"}
      </button>
    </nav>
  );
}

function WindowsTaskbar({
  activeWindow,
  startOpen,
  onToggleStart,
  onOpenWindow,
  onPrintResume,
  onSwitchOs,
  onShowErrorEgg,
  onCloseStart,
  osMode,
}) {
  const activeLabel = activeWindow
    ? `${activeWindow.charAt(0).toUpperCase()}${activeWindow.slice(1)}`
    : "Welcome";

  return (
    <footer className="windows-taskbar" aria-label="Windows taskbar">
      <button
        className={`start-button${startOpen ? " is-open" : ""}`}
        type="button"
        aria-label={startOpen ? "Close Start menu" : "Open Start menu"}
        aria-expanded={startOpen}
        onClick={onToggleStart}
      >
        <span aria-hidden="true">W</span>
        Start
      </button>
      <StartMenu
        open={startOpen}
        osMode={osMode}
        onOpenWindow={onOpenWindow}
        onPrintResume={onPrintResume}
        onSwitchOs={onSwitchOs}
        onShowErrorEgg={onShowErrorEgg}
        onClose={onCloseStart}
      />
      <button
        className="taskbar-program"
        type="button"
        aria-label={activeWindow ? `Show ${activeLabel}` : "Open Welcome"}
        onClick={() => onOpenWindow(activeWindow ?? "welcome")}
      >
        <span aria-hidden="true" />
        {activeLabel}
      </button>
      <div className="taskbar-spacer" />
      <div className="taskbar-language">En</div>
      <Clock />
    </footer>
  );
}

export default function App() {
  const query = new URLSearchParams(window.location.search);
  const queryWindow = query.get("window");
  const initialWindow = [
    "projects",
    "stack",
    "social",
    "about",
    "explorer",
    "welcome",
    "terminal",
    "wallpaper",
  ].includes(queryWindow)
    ? queryWindow
    : null;
  const initialMode = query.get("os") === "win" ? "windows" : "mac";
  const queryScreensaverDelay = Number(query.get("screensaverDelay"));
  const screensaverDelay =
    Number.isFinite(queryScreensaverDelay) && queryScreensaverDelay > 0
      ? queryScreensaverDelay
      : 28000;
  const autoOpenResume = query.get("noResumeOpen") !== "1";
  const [booted, setBooted] = useState(query.get("skipBoot") === "1");
  const [introActive, setIntroActive] = useState(false);
  const [activeWindow, setActiveWindow] = useState(initialWindow);
  const [osMode, setOsMode] = useState(initialMode);
  const [switchingTo, setSwitchingTo] = useState(null);
  const [printerJob, setPrinterJob] = useState(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState("default");
  const [questCompleted, setQuestCompleted] = useState(initialQuestFlags);
  const [spiritMood, setSpiritMood] = useState("curious");
  const [screensaverActive, setScreensaverActive] = useState(false);
  const [errorEggOpen, setErrorEggOpen] = useState(false);
  const [spiritRunActive, setSpiritRunActive] = useState(false);
  const [petReaction, setPetReaction] = useState(null);
  const [petActivityKey, setPetActivityKey] = useState(0);
  const [achievementToasts, setAchievementToasts] = useState([]);
  const [muted, setMuted] = useState(false);
  const timersRef = useRef([]);
  const unlockedAchievementsRef = useRef(new Set());
  const openedFoldersRef = useRef(new Set());
  const petReactionIdRef = useRef(0);
  const errorEggSeenRef = useRef(false);

  const scheduleTimer = useCallback((callback, delay) => {
    const timer = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((item) => item !== timer);
      callback();
    }, delay);
    timersRef.current.push(timer);
    return timer;
  }, []);

  useEffect(
    () => () => {
      for (const timer of timersRef.current) {
        window.clearTimeout(timer);
      }
    },
    [],
  );

  const finishBoot = useCallback(() => {
    setBooted(true);
    setIntroActive(true);
    scheduleTimer(() => setIntroActive(false), 1200);
  }, [scheduleTimer]);

  const unlockAchievement = useCallback(
    (id) => {
      const achievement = achievements[id];
      if (!achievement || unlockedAchievementsRef.current.has(id)) return;

      unlockedAchievementsRef.current.add(id);
      const toast = {
        ...achievement,
        toastId: `${id}-${Date.now()}`,
      };

      setAchievementToasts((current) => [toast, ...current].slice(0, 3));
      scheduleTimer(() => {
        setAchievementToasts((current) =>
          current.filter((item) => item.toastId !== toast.toastId),
        );
      }, 4200);
    },
    [scheduleTimer],
  );

  const completeQuest = useCallback(
    (id) => {
      setQuestCompleted((current) =>
        current[id] ? current : { ...current, [id]: true },
      );
      unlockAchievement(id);
    },
    [unlockAchievement],
  );

  const triggerPetReaction = useCallback(
    (reaction) => {
      if (!reaction) return;

      const nextReaction = {
        duration: 1900,
        id: petReactionIdRef.current + 1,
        ...reaction,
      };
      petReactionIdRef.current = nextReaction.id;
      setPetActivityKey((current) => current + 1);
      setPetReaction(nextReaction);
      scheduleTimer(() => {
        setPetReaction((current) => (current?.id === nextReaction.id ? null : current));
      }, nextReaction.duration);
    },
    [scheduleTimer],
  );

  const rememberFolderOpen = useCallback(
    (name) => {
      if (!folderWindowNames.includes(name)) return;

      openedFoldersRef.current.add(name);
      if (folderWindowNames.every((folder) => openedFoldersRef.current.has(folder))) {
        completeQuest("folders");
      }
    },
    [completeQuest],
  );

  const playClick = useCallback(() => {
    if (muted) return;
    const AudioContext = window.AudioContext ?? window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();
    context.resume().then(() => {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(660, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(260, context.currentTime + 0.06);
      gainNode.gain.setValueAtTime(0.12, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.09);
      oscillator.addEventListener("ended", () => context.close(), { once: true });
    });
  }, [muted]);

  const showErrorEgg = useCallback(() => {
    playClick();
    errorEggSeenRef.current = true;
    setErrorEggOpen(true);
    completeQuest("error");
    setSpiritMood("proud");
    triggerPetReaction({
      message: "hire.exe surfaced. extremely normal executable.",
      pose: "review",
    });
  }, [completeQuest, playClick, triggerPetReaction]);

  const closeErrorEgg = () => {
    playClick();
    setErrorEggOpen(false);
  };

  const changeWallpaper = useCallback(
    (nextWallpaper) => {
      setWallpaper(nextWallpaper);
      completeQuest("wallpaper");
      setSpiritMood(nextWallpaper === "matrix" ? "hacker" : "curious");
      triggerPetReaction({
        message:
          nextWallpaper === "matrix"
            ? "green wallpaper. terminal prestige increased."
            : "wallpaper swapped. tasteful pixels.",
        pose: nextWallpaper === "matrix" ? "review" : "waving",
      });
    },
    [completeQuest, triggerPetReaction],
  );

  const inspectProjectDisk = useCallback(
    (id) => {
      completeQuest("disk");
      setSpiritMood("curious");
      triggerPetReaction({
        message: `${id}.disk mounted. case study loading.`,
        pose: "review",
      });
    },
    [completeQuest, triggerPetReaction],
  );

  const openWindow = (name) => {
    playClick();
    setStartMenuOpen(false);
    setScreensaverActive(false);
    setSpiritRunActive(false);
    setPetActivityKey((current) => current + 1);
    rememberFolderOpen(name);
    if (name === "terminal") completeQuest("terminal");
    if (windowMoods[name]) setSpiritMood(windowMoods[name]);
    triggerPetReaction(petReactions[name]);
    setActiveWindow(name);
  };

  const closeWindow = () => {
    playClick();
    setStartMenuOpen(false);
    setPetActivityKey((current) => current + 1);
    setActiveWindow(null);
  };

  const toggleAudio = () => {
    setMuted((current) => !current);
    playClick();
  };

  const closePrinter = () => {
    setPrinterJob(null);
  };

  const openResumePdf = () => {
    window.open("/Tanveer.pdf", "_blank", "noopener,noreferrer");
    setPrinterJob((current) =>
      current ? { ...current, status: "sent", blocked: false } : current,
    );
    scheduleTimer(() => setPrinterJob(null), 1600);
  };

  const startResumePrint = () => {
    playClick();
    setStartMenuOpen(false);
    setSpiritMood("proud");
    completeQuest("resume");
    triggerPetReaction(petReactions.resume);

    const jobId = Date.now();
    let pdfWindow = null;

    if (autoOpenResume) {
      pdfWindow = window.open("about:blank", "_blank");
      if (pdfWindow) {
        pdfWindow.document.write(
          "<!doctype html><title>Printing Tanveer.pdf</title><body style=\"font-family:monospace;background:#000;color:#fff;display:grid;place-items:center;height:100vh;margin:0\">Printing Tanveer.pdf...</body>",
        );
      }
    }

    setPrinterJob({ id: jobId, status: "printing", blocked: false });
    scheduleTimer(() => {
      if (pdfWindow && !pdfWindow.closed) {
        pdfWindow.location.href = "/Tanveer.pdf";
        setPrinterJob({ id: jobId, status: "sent", blocked: false });
        scheduleTimer(() => setPrinterJob(null), 1700);
        return;
      }

      setPrinterJob({ id: jobId, status: "ready", blocked: true });
    }, 2400);
  };

  const handlePetBonk = useCallback(() => {
    completeQuest("bonk");
    setSpiritMood("annoyed");
    setPetActivityKey((current) => current + 1);
  }, [completeQuest]);

  const startSpiritRun = useCallback(() => {
    playClick();
    setActiveWindow(null);
    setStartMenuOpen(false);
    setScreensaverActive(false);
    setSpiritRunActive(true);
    setSpiritMood("proud");
    unlockAchievement("runner");
  }, [playClick, unlockAchievement]);

  const stopSpiritRun = useCallback(() => {
    playClick();
    setSpiritRunActive(false);
    setSpiritMood("curious");
    setPetActivityKey((current) => current + 1);
  }, [playClick]);

  const handleSpiritRunGameOver = useCallback(
    (score) => {
      setSpiritMood(score >= 800 ? "proud" : "annoyed");
      triggerPetReaction({
        message:
          score >= 800
            ? `score ${score}. tiny cardio champion.`
            : `score ${score}. popup collision reported.`,
        pose: score >= 800 ? "jumping" : "failed",
      });
    },
    [triggerPetReaction],
  );

  const switchOs = () => {
    if (switchingTo) return;
    const target = osMode === "mac" ? "windows" : "mac";
    playClick();
    setStartMenuOpen(false);
    setSpiritMood("dizzy");
    completeQuest("os");
    triggerPetReaction({
      message: target === "windows" ? "bzzt. converting to Win95." : "zap. back to Mac.",
      pose: "failed",
      effect: "zapped",
      duration: 1300,
    });
    scheduleTimer(() => setSwitchingTo(target), 260);
    scheduleTimer(() => setOsMode(target), 1080);
    if (target === "windows" && !errorEggSeenRef.current) {
      scheduleTimer(() => showErrorEgg(), 1600);
    }
    scheduleTimer(() => setSwitchingTo(null), 2180);
  };

  const dismissScreensaver = useCallback(() => {
    setScreensaverActive(false);
    setSpiritMood("curious");
    setPetActivityKey((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!booted || switchingTo || spiritRunActive) return undefined;

    let idleTimer;
    const armScreensaver = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        setScreensaverActive(true);
        setSpiritMood("sleepy");
        completeQuest("screensaver");
        triggerPetReaction({
          message: "screensaver mode. tiny nap authorized.",
          pose: "waiting",
        });
      }, screensaverDelay);
    };

    const handleActivity = () => {
      setScreensaverActive(false);
      armScreensaver();
    };

    const activityEvents = ["pointermove", "pointerdown", "keydown", "touchstart"];
    for (const eventName of activityEvents) {
      window.addEventListener(eventName, handleActivity, { passive: true });
    }
    armScreensaver();

    return () => {
      window.clearTimeout(idleTimer);
      for (const eventName of activityEvents) {
        window.removeEventListener(eventName, handleActivity);
      }
    };
  }, [booted, completeQuest, screensaverDelay, spiritRunActive, switchingTo, triggerPetReaction]);

  return (
    <main className="app-shell">
      {!booted ? <BootSequence onComplete={finishBoot} /> : null}

      <div
        className={`desktop desktop--${osMode} desktop--wallpaper-${wallpaper}${
          booted ? " desktop--ready" : ""
        }${
          introActive ? " desktop--intro" : ""
        }${
          switchingTo ? " desktop--switching" : ""
        }${
          spiritRunActive ? " desktop--spirit-run" : ""
        }`}
      >
        <OsTransition target={switchingTo} />
        <header className="desktop-menubar">
          <div className="wordmark">
            Tanveer<span>Singh</span>
          </div>
          <div className="menubar-stripes" aria-hidden="true">
            {Array.from({ length: 8 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <nav className="system-tray" aria-label="System shortcuts">
            <SystemIcon label={muted ? "Enable sound" : "Mute sound"} onClick={toggleAudio}>
              <SpeakerIcon muted={muted} />
            </SystemIcon>
            <SystemIcon label="Email Tanveer" href="mailto:satanveersingh@gmail.com">
              <MailIcon />
            </SystemIcon>
            <SystemIcon label="Battery status">
              <BatteryIcon />
            </SystemIcon>
            <OsSwitch mode={osMode} onSwitch={switchOs} disabled={Boolean(switchingTo)} />
            <Clock />
          </nav>
        </header>

        <section
          className={`desktop-area${spiritRunActive ? " desktop-area--spirit-run" : ""}`}
          aria-label="Portfolio desktop"
        >
          <div className="desktop-icons">
            <DesktopIcon
              image="/assets/folder-projects.png"
              label="PROJECTS"
              windowsIcon="folder"
              onOpen={() => openWindow("projects")}
            />
            <DesktopIcon
              image="/assets/figma.png"
              label="STACK"
              inverted
              windowsIcon="program"
              onOpen={() => openWindow("stack")}
            />
            <DesktopIcon
              image="/assets/folder-social.png"
              label="SOCIAL LIFE"
              windowsIcon="people"
              onOpen={() => openWindow("social")}
            />
            <DesktopIcon
              image="/assets/about-mac.png"
              label="ABOUT ME"
              windowsIcon="notepad"
              onOpen={() => openWindow("about")}
            />
            <DesktopActionIcon
              label="TANVEER HD"
              variant="drive"
              onOpen={() => openWindow("explorer")}
            />
            <DesktopActionIcon
              label="PRINT RESUME"
              variant="printer"
              ariaLabel="Print resume"
              onOpen={startResumePrint}
            />
            <DesktopActionIcon
              label="TERMINAL"
              variant="terminal"
              onOpen={() => openWindow("terminal")}
            />
            <DesktopActionIcon
              label="WALLPAPER"
              variant="wallpaper"
              onOpen={() => openWindow("wallpaper")}
            />
          </div>
          <QuestLog completed={questCompleted} />
          {spiritRunActive ? (
            <SpiritRunGame onExit={stopSpiritRun} onGameOver={handleSpiritRunGameOver} />
          ) : (
            <DesktopPet
              paused={activeWindow !== null}
              reaction={petReaction}
              activityKey={petActivityKey}
              mood={spiritMood}
              onBonk={handlePetBonk}
              onStartRun={startSpiritRun}
            />
          )}
        </section>

        {activeWindow === "projects" ? (
          <ProjectsWindow onClose={closeWindow} onInspectProject={inspectProjectDisk} />
        ) : null}
        {activeWindow === "stack" ? (
          <GridWindow title="Stack" items={techStack} onClose={closeWindow} />
        ) : null}
        {activeWindow === "social" ? (
          <GridWindow
            title="Social life"
            items={socialLinks}
            onClose={closeWindow}
            social
          />
        ) : null}
        {activeWindow === "about" ? <AboutWindow onClose={closeWindow} /> : null}
        {activeWindow === "welcome" ? (
          <WelcomeWindow
            onClose={closeWindow}
            onOpenWindow={openWindow}
            onPrintResume={startResumePrint}
            osMode={osMode}
          />
        ) : null}
        {activeWindow === "explorer" ? (
          <FileExplorerWindow
            onClose={closeWindow}
            onOpenWindow={openWindow}
            onPrintResume={startResumePrint}
          />
        ) : null}
        {activeWindow === "terminal" ? (
          <TerminalWindow
            onClose={closeWindow}
            onOpenWindow={openWindow}
            onPrintResume={startResumePrint}
            onSwitchOs={switchOs}
            onShowErrorEgg={showErrorEgg}
            onStartSpiritRun={startSpiritRun}
            onChangeWallpaper={changeWallpaper}
            onMoodChange={setSpiritMood}
            questCompleted={questCompleted}
            wallpaper={wallpaper}
            wallpaperOptions={wallpaperOptions}
          />
        ) : null}
        {activeWindow === "wallpaper" ? (
          <WallpaperSwitcher
            onClose={closeWindow}
            options={wallpaperOptions}
            selected={wallpaper}
            onChange={changeWallpaper}
          />
        ) : null}
        <ResumePrinter
          job={printerJob}
          onClose={closePrinter}
          onOpenPdf={openResumePdf}
        />
        <Win95ErrorEgg
          open={errorEggOpen}
          onClose={closeErrorEgg}
          onHire={() => setSpiritMood("proud")}
        />
        <Screensaver active={screensaverActive} onDismiss={dismissScreensaver} />
        <AchievementToasts toasts={achievementToasts} />
        {osMode === "windows" ? (
          <WindowsTaskbar
            activeWindow={activeWindow}
            startOpen={startMenuOpen}
            onToggleStart={() => setStartMenuOpen((current) => !current)}
            onOpenWindow={openWindow}
            onPrintResume={startResumePrint}
            onSwitchOs={switchOs}
            onShowErrorEgg={showErrorEgg}
            onCloseStart={() => setStartMenuOpen(false)}
            osMode={osMode}
          />
        ) : null}
      </div>
    </main>
  );
}
