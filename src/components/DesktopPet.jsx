import { useEffect, useRef, useState } from "react";

const CORE_POSES = ["idle", "running-left", "running-right", "waiting"];
const REACTION_POSES = ["waving", "failed", "review", "jumping"];

const hoverMessages = [
  "Open a folder. I guard the good stuff.",
  "Projects are up there. I tested the buttons.",
  "Built with React and suspicious confidence.",
  "ABOUT ME has the lore. Resume included.",
  "Yes, this desktop works on mobile too.",
  "I roam. Tanveer ships.",
];

const moodLines = {
  curious: [
    "New folder smell. Excellent.",
    "There is probably a tiny feature hiding in there.",
    "Click things. The desktop likes commitment.",
  ],
  proud: [
    "Resume acquired. Very employable pixels.",
    "Printer did not jam. Historic.",
    "That PDF has load-bearing confidence.",
  ],
  dizzy: [
    "I have seen both operating systems and need a chair.",
    "Bzzt. Shell translation complete-ish.",
    "My pixels are still rebooting.",
  ],
  annoyed: [
    "Bonk counter rising. Respectfully: ow.",
    "This is why I keep backups.",
    "I am filing a tiny complaint.",
  ],
  hacker: [
    "Terminal open. We are extremely serious now.",
    "Type help. Pretend the room got darker.",
    "I am reading the logs with dramatic intensity.",
  ],
  sleepy: [
    "Screensaver dreams are mostly bouncing logos.",
    "Wake me when the desktop does something illegal.",
    "Zzz. Still compiling vibes.",
  ],
};

const moodPoses = {
  annoyed: "failed",
  dizzy: "failed",
  hacker: "review",
  proud: "jumping",
  sleepy: "waiting",
};

function poseSource(pose) {
  return `/assets/pet/${pose}.webp`;
}

function randomDelay() {
  return 2200 + Math.random() * 2600;
}

export default function DesktopPet({ paused, reaction, activityKey = 0, mood, onBonk }) {
  const petRef = useRef(null);
  const positionRef = useRef(42);
  const messageIndexRef = useRef(0);
  const hitTimerRef = useRef(null);
  const idleTimerRef = useRef(null);
  const idleHideTimerRef = useRef(null);
  const [motionPose, setMotionPose] = useState("idle");
  const [hoverMessage, setHoverMessage] = useState("");
  const [idleReaction, setIdleReaction] = useState(null);
  const [hitActive, setHitActive] = useState(false);
  const [hitCount, setHitCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    for (const pose of CORE_POSES) {
      const image = new Image();
      image.src = poseSource(pose);
    }

    const loadReactions = () => {
      for (const pose of REACTION_POSES) {
        const image = new Image();
        image.src = poseSource(pose);
      }
    };

    const idleId =
      window.requestIdleCallback?.(loadReactions, { timeout: 2500 }) ??
      window.setTimeout(loadReactions, 1500);

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  useEffect(() => {
    const pet = petRef.current;
    if (!pet) return undefined;

    let frameId;
    let roamTimer;
    let stopped = false;

    const setPosition = (value) => {
      const max = Math.max(24, pet.parentElement.clientWidth - pet.offsetWidth - 24);
      const next = Math.min(Math.max(24, value), max);
      positionRef.current = next;
      pet.style.setProperty("--pet-x", `${next}px`);
    };

    const roam = () => {
      if (stopped || paused || reducedMotion || hoverMessage || hitActive || reaction || idleReaction) {
        return;
      }

      const max = Math.max(24, pet.parentElement.clientWidth - pet.offsetWidth - 24);
      const current = Math.min(positionRef.current, max);
      let target = 24 + Math.random() * Math.max(1, max - 24);

      if (Math.abs(target - current) < 100) {
        target = current < max / 2 ? max : 24;
      }

      const direction = target > current ? "right" : "left";
      const distance = Math.abs(target - current);
      const duration = Math.max(900, (distance / 68) * 1000);
      const startedAt = performance.now();
      setMotionPose(`running-${direction}`);

      const step = (now) => {
        if (stopped) return;
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 2);
        setPosition(current + (target - current) * eased);

        if (progress < 1) {
          frameId = window.requestAnimationFrame(step);
          return;
        }

        setMotionPose("idle");
        roamTimer = window.setTimeout(roam, randomDelay());
      };

      frameId = window.requestAnimationFrame(step);
    };

    const handleResize = () => setPosition(positionRef.current);
    window.addEventListener("resize", handleResize);
    setPosition(positionRef.current);

    if (paused) {
      setMotionPose("waiting");
    } else if (!reducedMotion && !hoverMessage && !hitActive && !reaction && !idleReaction) {
      setMotionPose("idle");
      roamTimer = window.setTimeout(roam, 1300);
    } else {
      setMotionPose("idle");
    }

    return () => {
      stopped = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(roamTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [paused, hoverMessage, hitActive, reaction, idleReaction, reducedMotion]);

  useEffect(() => {
    window.clearTimeout(idleTimerRef.current);
    window.clearTimeout(idleHideTimerRef.current);
    setIdleReaction(null);

    if (paused || reducedMotion || hoverMessage || hitActive || reaction) return undefined;

    idleTimerRef.current = window.setTimeout(() => {
      setIdleReaction({
        message: "tiny nap. wake me when you need a folder.",
        pose: "waiting",
      });
      idleHideTimerRef.current = window.setTimeout(() => setIdleReaction(null), 2600);
    }, 10500);

    return () => {
      window.clearTimeout(idleTimerRef.current);
      window.clearTimeout(idleHideTimerRef.current);
    };
  }, [activityKey, paused, reducedMotion, hoverMessage, hitActive, reaction]);

  useEffect(
    () => () => {
      window.clearTimeout(hitTimerRef.current);
      window.clearTimeout(idleTimerRef.current);
      window.clearTimeout(idleHideTimerRef.current);
    },
    [],
  );

  const showMessage = () => {
    if (paused) return;
    const messages = moodLines[mood] ?? hoverMessages;
    const nextMessage = messages[messageIndexRef.current % messages.length];
    messageIndexRef.current += 1;
    setHoverMessage(nextMessage);
  };

  const handleMouseEnter = (event) => {
    const target = event.currentTarget;
    window.requestAnimationFrame(() => {
      if (target.matches(":hover")) {
        showMessage();
      }
    });
  };

  const hideMessage = () => {
    setHoverMessage("");
  };

  const handleFocus = (event) => {
    if (event.currentTarget.matches(":focus-visible")) {
      showMessage();
    }
  };

  const handleHit = () => {
    if (paused) return;
    window.clearTimeout(hitTimerRef.current);
    setHoverMessage("");
    setHitCount((current) => current + 1);
    setHitActive(true);
    onBonk?.();
    hitTimerRef.current = window.setTimeout(() => setHitActive(false), 720);
  };

  const speechMessage = reaction?.message ?? idleReaction?.message ?? hoverMessage;
  const pose = reducedMotion
    ? "idle-static"
    : hitActive
      ? "failed"
      : reaction?.pose
        ? reaction.pose
        : idleReaction?.pose
          ? idleReaction.pose
          : hoverMessage
        ? moodPoses[mood] ?? "waving"
        : paused
          ? "waiting"
          : motionPose;

  return (
    <button
      ref={petRef}
      className={`desktop-pet${hitActive ? " is-hit" : ""}${reaction ? " is-reacting" : ""}${
        reaction?.effect === "zapped" ? " is-zapped" : ""
      }`}
      data-pose={pose}
      type="button"
      aria-label="Desktop spirit. Hover for a message or click to bonk."
      onClick={handleHit}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={hideMessage}
      onFocus={handleFocus}
      onBlur={hideMessage}
      disabled={paused}
    >
      <span
        className={`pet-speech${speechMessage && !hitActive ? " is-visible" : ""}`}
        aria-live="polite"
      >
        {speechMessage}
      </span>
      {hitActive ? (
        <span key={hitCount} className="pet-impact" aria-hidden="true">
          BONK!
        </span>
      ) : null}
      <img key={`${pose}-${hitCount}`} src={poseSource(pose)} alt="" draggable="false" />
    </button>
  );
}
