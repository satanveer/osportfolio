import { useCallback, useEffect, useRef, useState } from "react";

const PLAYER = {
  x: 68,
  width: 58,
  height: 82,
};

const OBSTACLE_TYPES = [
  { kind: "error", label: "ERR", width: 54, height: 44 },
  { kind: "mail", label: "MAIL", width: 52, height: 34 },
  { kind: "disk", label: "DISK", width: 44, height: 48 },
];

const TOKEN = {
  width: 34,
  height: 42,
  bottom: 78,
};

const BEST_SCORE_KEY = "tanveer-spirit-run-best";

function getStoredBest() {
  const value = Number(window.localStorage.getItem(BEST_SCORE_KEY));
  return Number.isFinite(value) ? value : 0;
}

function overlaps(first, second) {
  return (
    first.left < second.right &&
    first.right > second.left &&
    first.bottom < second.top &&
    first.top > second.bottom
  );
}

function getPlayerX(width) {
  return width < 520 ? 42 : PLAYER.x;
}

function createInitialSnapshot(best = 0) {
  return {
    best,
    collectibles: [],
    obstacles: [],
    playerY: 0,
    score: 0,
    speed: 0,
  };
}

export default function SpiritRunGame({ onExit, onGameOver }) {
  const stageRef = useRef(null);
  const autoStartedRef = useRef(false);
  const frameRef = useRef(null);
  const objectIdRef = useRef(0);
  const lastTimeRef = useRef(0);
  const nextCollectibleAtRef = useRef(0);
  const nextObstacleAtRef = useRef(0);
  const obstaclesRef = useRef([]);
  const collectiblesRef = useRef([]);
  const playerYRef = useRef(0);
  const scoreRef = useRef(0);
  const speedRef = useRef(0);
  const statusRef = useRef("ready");
  const velocityRef = useRef(0);
  const [status, setStatus] = useState("ready");
  const [snapshot, setSnapshot] = useState(() => createInitialSnapshot(getStoredBest()));

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const writeSnapshot = useCallback(() => {
    setSnapshot((current) => ({
      best: current.best,
      collectibles: collectiblesRef.current,
      obstacles: obstaclesRef.current,
      playerY: playerYRef.current,
      score: Math.floor(scoreRef.current),
      speed: speedRef.current,
    }));
  }, []);

  const resetWorld = useCallback(() => {
    const width = stageRef.current?.clientWidth ?? 900;
    objectIdRef.current = 0;
    obstaclesRef.current = [];
    collectiblesRef.current = [];
    playerYRef.current = 0;
    velocityRef.current = 0;
    scoreRef.current = 0;
    speedRef.current = 280;
    nextObstacleAtRef.current = performance.now() + 900;
    nextCollectibleAtRef.current = performance.now() + 1500;
    setSnapshot((current) => ({
      ...createInitialSnapshot(current.best),
      speed: speedRef.current,
    }));

    return width;
  }, []);

  const startGame = useCallback(() => {
    resetWorld();
    statusRef.current = "playing";
    setStatus("playing");
    window.requestAnimationFrame(() => stageRef.current?.focus());
  }, [resetWorld]);

  const finishGame = useCallback(() => {
    const finalScore = Math.floor(scoreRef.current);
    const nextBest = Math.max(getStoredBest(), finalScore);
    window.localStorage.setItem(BEST_SCORE_KEY, String(nextBest));
    setSnapshot((current) => ({
      ...current,
      best: nextBest,
      score: finalScore,
    }));
    statusRef.current = "gameover";
    setStatus("gameover");
    onGameOver?.(finalScore);
  }, [onGameOver]);

  const jump = useCallback(() => {
    if (statusRef.current !== "playing") {
      startGame();
      return;
    }

    if (playerYRef.current <= 2) {
      velocityRef.current = 690;
      playerYRef.current = 3;
      writeSnapshot();
    }
  }, [startGame, writeSnapshot]);

  useEffect(() => {
    if (autoStartedRef.current) return;
    autoStartedRef.current = true;
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (status !== "playing") return undefined;

    const spawnObstacle = (now) => {
      const width = stageRef.current?.clientWidth ?? 900;
      const template = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
      objectIdRef.current += 1;
      obstaclesRef.current = [
        ...obstaclesRef.current,
        {
          ...template,
          id: `obstacle-${objectIdRef.current}`,
          passed: false,
          x: width + 40,
        },
      ];
      nextObstacleAtRef.current = now + 920 + Math.random() * 720;
    };

    const spawnCollectible = (now) => {
      const width = stageRef.current?.clientWidth ?? 900;
      objectIdRef.current += 1;
      collectiblesRef.current = [
        ...collectiblesRef.current,
        {
          id: `resume-${objectIdRef.current}`,
          x: width + 80,
        },
      ];
      nextCollectibleAtRef.current = now + 2300 + Math.random() * 1900;
    };

    const step = (now) => {
      if (statusRef.current !== "playing") return;

      const dt = Math.min(0.034, Math.max(0, (now - lastTimeRef.current) / 1000));
      lastTimeRef.current = now;
      speedRef.current = Math.min(470, speedRef.current + dt * 9);
      scoreRef.current += dt * (speedRef.current / 4);

      velocityRef.current -= 1780 * dt;
      playerYRef.current = Math.max(0, playerYRef.current + velocityRef.current * dt);
      if (playerYRef.current === 0 && velocityRef.current < 0) {
        velocityRef.current = 0;
      }

      if (now >= nextObstacleAtRef.current) spawnObstacle(now);
      if (now >= nextCollectibleAtRef.current) spawnCollectible(now);

      obstaclesRef.current = obstaclesRef.current
        .map((obstacle) => ({
          ...obstacle,
          x: obstacle.x - speedRef.current * dt,
        }))
        .filter((obstacle) => obstacle.x > -90);

      collectiblesRef.current = collectiblesRef.current
        .map((collectible) => ({
          ...collectible,
          x: collectible.x - speedRef.current * dt,
        }))
        .filter((collectible) => collectible.x > -70);

      const playerX = getPlayerX(stageRef.current?.clientWidth ?? 900);
      const playerRect = {
        bottom: playerYRef.current + 4,
        left: playerX + 8,
        right: playerX + PLAYER.width - 8,
        top: playerYRef.current + PLAYER.height - 4,
      };

      for (const obstacle of obstaclesRef.current) {
        const obstacleRect = {
          bottom: 0,
          left: obstacle.x + 4,
          right: obstacle.x + obstacle.width - 4,
          top: obstacle.height,
        };

        if (overlaps(playerRect, obstacleRect)) {
          finishGame();
          return;
        }

        if (!obstacle.passed && obstacle.x + obstacle.width < playerX) {
          obstacle.passed = true;
          scoreRef.current += 25;
        }
      }

      const collectedIds = new Set();
      for (const collectible of collectiblesRef.current) {
        const collectibleRect = {
          bottom: TOKEN.bottom,
          left: collectible.x,
          right: collectible.x + TOKEN.width,
          top: TOKEN.bottom + TOKEN.height,
        };

        if (overlaps(playerRect, collectibleRect)) {
          collectedIds.add(collectible.id);
          scoreRef.current += 150;
        }
      }

      if (collectedIds.size) {
        collectiblesRef.current = collectiblesRef.current.filter(
          (collectible) => !collectedIds.has(collectible.id),
        );
      }

      writeSnapshot();
      frameRef.current = window.setTimeout(() => step(performance.now()), 1000 / 60);
    };

    lastTimeRef.current = performance.now();
    frameRef.current = window.setTimeout(() => step(performance.now()), 1000 / 60);

    return () => window.clearTimeout(frameRef.current);
  }, [finishGame, status, writeSnapshot]);

  useEffect(
    () => () => {
      window.clearTimeout(frameRef.current);
    },
    [],
  );

  const handleKeyDown = (event) => {
    if ([" ", "ArrowUp", "KeyW"].includes(event.code)) {
      event.preventDefault();
      jump();
    }

    if (event.code === "Escape") {
      event.preventDefault();
      onExit();
    }
  };

  const playerPose =
    status === "gameover"
      ? "failed"
      : snapshot.playerY > 4
        ? "jumping"
        : status === "playing"
          ? "running-right"
          : "idle";

  return (
    <section className={`spirit-run-game is-${status}`} aria-label="Spirit Run mini game">
      <div className="spirit-run-hud" aria-live="polite">
        <strong>Spirit Run</strong>
        <span>Score {snapshot.score}</span>
        <span>Best {snapshot.best}</span>
        <button type="button" onClick={jump}>
          {status === "playing" ? "Jump" : "Start"}
        </button>
        <button type="button" onClick={onExit}>
          Exit
        </button>
      </div>

      <div
        ref={stageRef}
        className="spirit-run-stage"
        role="application"
        tabIndex={0}
        aria-label="Spirit Run lane. Press Space, W, or Arrow Up to jump. Press Escape to exit."
        onKeyDown={handleKeyDown}
        onPointerDown={jump}
      >
        <div className="spirit-run-skyline" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="spirit-run-ground" aria-hidden="true" />
        <img
          className="spirit-run-player"
          src={`/assets/pet/${playerPose}.webp`}
          alt=""
          draggable="false"
          style={{ transform: `translateY(-${Math.round(snapshot.playerY)}px)` }}
        />

        {snapshot.obstacles.map((obstacle) => (
          <span
            key={obstacle.id}
            className={`spirit-obstacle spirit-obstacle--${obstacle.kind}`}
            style={{
              height: `${obstacle.height}px`,
              transform: `translateX(${Math.round(obstacle.x)}px)`,
              width: `${obstacle.width}px`,
            }}
            aria-hidden="true"
          >
            <span>{obstacle.label}</span>
          </span>
        ))}

        {snapshot.collectibles.map((collectible) => (
          <span
            key={collectible.id}
            className="spirit-token"
            style={{ transform: `translateX(${Math.round(collectible.x)}px)` }}
            aria-hidden="true"
          >
            <span>CV</span>
          </span>
        ))}

        {status !== "playing" ? (
          <div className="spirit-run-card">
            <strong>{status === "gameover" ? "System bonk." : "Lower desktop: armed."}</strong>
            <p>
              {status === "gameover"
                ? "Press start to run it back, or Esc to return to the desktop."
                : "Press Space or tap the lane to jump over popups and grab resume pages."}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
