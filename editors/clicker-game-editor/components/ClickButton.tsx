import { useState, useRef, useCallback, useEffect } from "react";

interface ClickButtonProps {
  onClick: () => void;
  disabled?: boolean;
  playerClicks?: number;
  cooldownMs?: number | null;
}

interface FloatingScore {
  id: number;
  x: number;
  y: number;
}

export function ClickButton({
  onClick,
  disabled,
  playerClicks,
  cooldownMs,
}: ClickButtonProps) {
  const [floatingScores, setFloatingScores] = useState<FloatingScore[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [coverOpen, setCoverOpen] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [noDelay, setNoDelay] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [cooldownProgress, setCooldownProgress] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const idCounter = useRef(0);
  const cooldownAnimRef = useRef<number>(0);

  const startCooldown = useCallback(() => {
    if (!cooldownMs || cooldownMs <= 0) return;

    setIsCoolingDown(true);
    setCooldownProgress(0);

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / cooldownMs, 1);
      setCooldownProgress(progress);

      if (progress < 1) {
        cooldownAnimRef.current = requestAnimationFrame(animate);
      } else {
        setIsCoolingDown(false);
        setCooldownProgress(0);
      }
    };

    cooldownAnimRef.current = requestAnimationFrame(animate);
  }, [cooldownMs]);

  useEffect(() => {
    return () => {
      if (cooldownAnimRef.current) {
        cancelAnimationFrame(cooldownAnimRef.current);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!coverOpen || isCoolingDown) return;

    onClick();
    setIsPressed(true);
    setIsFlashing(true);
    setNoDelay(true);
    setTimeout(() => setIsPressed(false), 150);
    setTimeout(() => {
      setIsFlashing(false);
      setTimeout(() => setNoDelay(false), 50);
    }, 150);

    startCooldown();

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const newScore: FloatingScore = {
        id: idCounter.current++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setFloatingScores((prev) => [...prev, newScore]);

      setTimeout(() => {
        setFloatingScores((prev) => prev.filter((s) => s.id !== newScore.id));
      }, 800);
    }
  };

  const toggleCover = () => {
    if (!disabled) {
      setCoverOpen(!coverOpen);
    }
  };

  const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

  const getCooldownButtonStyle = (): React.CSSProperties | undefined => {
    if (!isCoolingDown) return undefined;
    const t = cooldownProgress;
    // Interpolate from grey to original red
    const h1 = lerp(0x55, 0xff, t);
    const h2 = lerp(0x44, 0xdd, t);
    const h3 = lerp(0x33, 0xaa, t);
    const h4 = lerp(0x22, 0x77, t);
    const glowAlpha = (0.2 + 0.3 * t).toFixed(2);
    const glowSize = lerp(15, 30, t);
    return {
      background: `radial-gradient(circle at 30% 30%, rgb(${h1},${lerp(0x55, 0x55, t)},${lerp(0x55, 0x55, t)}) 0%, rgb(${h2},${lerp(0x44, 0x00, t)},${lerp(0x44, 0x00, t)}) 40%, rgb(${h3},${lerp(0x33, 0x00, t)},${lerp(0x33, 0x00, t)}) 70%, rgb(${h4},${lerp(0x22, 0x00, t)},${lerp(0x22, 0x00, t)}) 100%)`,
      boxShadow: `inset 0 -8px 20px rgba(0,0,0,0.6), inset 0 8px 15px rgba(${lerp(100, 255, t)},${lerp(100, 100, t)},${lerp(100, 100, t)},${(0.2 + 0.2 * t).toFixed(2)}), 0 8px 20px rgba(0,0,0,0.5), 0 0 ${glowSize}px rgba(255,0,0,${glowAlpha})`,
      animation: "none",
    };
  };

  const getIndicatorClass = (index: number) => {
    if (isFlashing) return "flash";
    if (isCoolingDown) {
      const threshold = (index + 1) / 3;
      return cooldownProgress >= threshold ? "cooldown-ready" : "cooldown-red";
    }
    if (coverOpen) return "armed";
    return "standby";
  };

  return (
    <div className="flex flex-col items-center">
      <style>{`
        .nuclear-container {
          position: relative;
        }

        .base-plate {
          position: relative;
          width: 200px;
          padding: 25px 25px 18px;
          background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
          border: 2px solid #333;
          border-radius: 16px;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            inset 0 -2px 10px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(255, 0, 100, 0.5),
            0 0 60px rgba(255, 0, 100, 0.3),
            0 0 100px rgba(255, 0, 100, 0.15),
            0 8px 20px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .base-plate::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 18px;
          background: linear-gradient(90deg, #ff0066, #ff00ff, #00ffff, #ff0066);
          background-size: 300% 100%;
          animation: neon-border 3s linear infinite;
          z-index: -1;
          opacity: 0.8;
        }

        @keyframes neon-border {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        .indicator-panel {
          display: flex;
          gap: 20px;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #222;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
          background: #333;
        }

        /* Staggered transitions for left-to-right animation */
        .indicator.ind-0 {
          transition: all 0.2s ease 0s;
        }
        .indicator.ind-1 {
          transition: all 0.2s ease 0.15s;
        }
        .indicator.ind-2 {
          transition: all 0.2s ease 0.3s;
        }

        /* When closing, reverse the delay (right to left) */
        .indicator.ind-0.standby {
          transition: all 0.2s ease 0.3s;
        }
        .indicator.ind-1.standby {
          transition: all 0.2s ease 0.15s;
        }
        .indicator.ind-2.standby {
          transition: all 0.2s ease 0s;
        }

        .indicator.standby {
          background: #ff6600;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 6px #ff6600, 0 0 10px #ff6600;
          animation: pulse-orange 1.5s ease-in-out infinite;
        }

        .indicator.armed {
          background: #00ff00;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 8px #00ff00, 0 0 15px #00ff00;
          animation: pulse-green 1s ease-in-out infinite;
        }

        .indicator.cooldown-red {
          background: #ff0000;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 8px #ff0000, 0 0 15px #ff0000;
          animation: pulse-cooldown-red 0.6s ease-in-out infinite;
          transition: none !important;
        }

        .indicator.cooldown-ready {
          background: #00ff00;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 8px #00ff00, 0 0 15px #00ff00;
          animation: pulse-green 1s ease-in-out infinite;
          transition: none !important;
        }

        .indicator.flash {
          background: #ff0000 !important;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 15px #ff0000, 0 0 30px #ff0000 !important;
          animation: none !important;
          transition: none !important;
        }

        .indicator.no-delay {
          transition-delay: 0s !important;
        }

        @keyframes pulse-green {
          0%, 100% { box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 8px #00ff00, 0 0 15px #00ff00; }
          50% { box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 15px #00ff00, 0 0 30px #00ff00; }
        }

        @keyframes pulse-orange {
          0%, 100% { box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 6px #ff6600, 0 0 10px #ff6600; }
          50% { box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 10px #ff6600, 0 0 18px #ff6600; }
        }

        @keyframes pulse-cooldown-red {
          0%, 100% { box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 6px #ff0000, 0 0 10px #ff0000; }
          50% { box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 12px #ff0000, 0 0 20px #ff0000; }
        }

        .button-housing {
          position: relative;
          width: 150px;
          height: 150px;
          background: linear-gradient(180deg, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%);
          border-radius: 50%;
          border: 5px solid #555;
          box-shadow:
            inset 0 -10px 25px rgba(0, 0, 0, 0.5),
            inset 0 10px 20px rgba(255, 255, 255, 0.05),
            0 0 20px rgba(255, 0, 0, 0.3),
            0 10px 25px rgba(0, 0, 0, 0.8);
        }

        .button-housing::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border: 2px solid #333;
          border-radius: 50%;
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5);
        }

        .nuke-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 95px;
          height: 95px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: radial-gradient(
            circle at 30% 30%,
            #ff5555 0%,
            #dd0000 40%,
            #aa0000 70%,
            #770000 100%
          );
          box-shadow:
            inset 0 -8px 20px rgba(0, 0, 0, 0.6),
            inset 0 8px 15px rgba(255, 100, 100, 0.4),
            0 8px 20px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(255, 0, 0, 0.5),
            0 0 60px rgba(255, 0, 0, 0.2);
          transition: all 0.1s ease;
          font-family: 'Press Start 2P', monospace;
          font-size: 9px;
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.9), 1px 1px 0 #660000;
          animation: button-pulse 2s ease-in-out infinite;
        }

        .nuke-button.on-cooldown {
          cursor: not-allowed;
          animation: none;
        }

        .cooldown-text {
          display: block;
          line-height: 1.4;
          font-size: 6px;
          color: #ff4444;
          text-shadow: 0 0 8px rgba(255, 0, 0, 0.8);
          animation: blink-text 0.8s ease-in-out infinite;
        }

        @keyframes blink-text {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes button-pulse {
          0%, 100% { box-shadow: inset 0 -8px 20px rgba(0, 0, 0, 0.6), inset 0 8px 15px rgba(255, 100, 100, 0.4), 0 8px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.5), 0 0 60px rgba(255, 0, 0, 0.2); }
          50% { box-shadow: inset 0 -8px 20px rgba(0, 0, 0, 0.6), inset 0 8px 15px rgba(255, 100, 100, 0.4), 0 8px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.7), 0 0 80px rgba(255, 0, 0, 0.3); }
        }

        .nuke-button:hover:not(:disabled) {
          background: radial-gradient(
            circle at 30% 30%,
            #ff6666 0%,
            #ee0000 40%,
            #bb0000 70%,
            #880000 100%
          );
          box-shadow:
            inset 0 -6px 15px rgba(0, 0, 0, 0.6),
            inset 0 6px 10px rgba(255, 100, 100, 0.5),
            0 6px 15px rgba(0, 0, 0, 0.5),
            0 0 35px rgba(255, 0, 0, 0.5);
        }

        .nuke-button.pressed {
          transform: translate(-50%, -50%) scale(0.95);
          box-shadow:
            inset 0 6px 15px rgba(0, 0, 0, 0.8),
            inset 0 -3px 8px rgba(255, 100, 100, 0.2),
            0 2px 8px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(255, 0, 0, 0.8);
        }

        .nuke-button:disabled {
          cursor: not-allowed;
        }

        .launch-text {
          display: block;
          line-height: 1.4;
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s;
        }

        .launch-text.visible {
          opacity: 1;
          transform: scale(1);
        }

        .safety-cover {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          transform-origin: top center;
          transform: rotateX(0deg);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          z-index: 20;
        }

        .safety-cover.open {
          transform: rotateX(-110deg);
        }

        .safety-cover.open .cover-label {
          opacity: 0;
        }

        .cover-frame {
          width: 100%;
          height: 100%;
          background: transparent;
          border-radius: 50%;
          border: 3px solid rgba(120, 120, 120, 0.7);
          position: relative;
        }

        .cover-glass {
          position: absolute;
          top: 3px;
          left: 3px;
          right: 3px;
          bottom: 3px;
          background: rgba(200, 80, 80, 0.15);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: inset 0 0 20px rgba(255, 50, 50, 0.1);
        }

        .cover-glass::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 20%;
          width: 60%;
          height: 20px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
          border-radius: 50%;
        }

        .cover-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Press Start 2P', monospace;
          font-size: 6px;
          color: #ffff00;
          text-shadow: 0 0 8px #000, 0 0 3px #000, 1px 1px 0 #000, -1px -1px 0 #000;
          white-space: nowrap;
          transition: opacity 0.3s ease;
        }

      `}</style>

      <div className="nuclear-container">
        <div className="base-plate">
          <div className="button-housing">
            <button
              ref={buttonRef}
              onClick={handleClick}
              disabled={disabled || !coverOpen || isCoolingDown}
              className={`nuke-button ${isPressed ? "pressed" : ""}${isCoolingDown ? " on-cooldown" : ""}`}
              style={getCooldownButtonStyle()}
            >
              {isCoolingDown ? (
                <span className="cooldown-text">RELOADING</span>
              ) : (
                <span className={`launch-text ${coverOpen ? "visible" : ""}`}>
                  LAUNCH
                </span>
              )}
            </button>

            {floatingScores.map((score) => (
              <span
                key={score.id}
                className="score-increment"
                style={{ left: score.x, top: score.y }}
              >
                +1
              </span>
            ))}

            <div
              className={`safety-cover ${coverOpen ? "open" : ""}`}
              onClick={toggleCover}
            >
              <div className="cover-frame">
                <div className="cover-glass" />
                <span className="cover-label">LIFT TO ARM</span>
              </div>
            </div>
          </div>

          <div className="indicator-panel">
            <div
              className={`indicator ind-0 ${getIndicatorClass(0)}${noDelay ? " no-delay" : ""}`}
            />
            <div
              className={`indicator ind-1 ${getIndicatorClass(1)}${noDelay ? " no-delay" : ""}`}
            />
            <div
              className={`indicator ind-2 ${getIndicatorClass(2)}${noDelay ? " no-delay" : ""}`}
            />
          </div>
        </div>
      </div>

      {playerClicks !== undefined && (
        <div className="text-center" style={{ marginTop: "16px" }}>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "6px",
              color: "#ff3333",
              marginBottom: "4px",
              textShadow: "0 0 8px rgba(255, 0, 0, 0.5)",
              letterSpacing: "1px",
            }}
          >
            LAUNCH COUNT
          </p>
          <p
            className="stat-value"
            key={playerClicks}
            style={{
              color: "#ff0000",
              textShadow: "0 0 15px #ff0000, 0 0 30px #ff0000",
              fontSize: "18px",
            }}
          >
            {playerClicks.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
