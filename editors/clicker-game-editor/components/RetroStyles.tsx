export function RetroStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

      .retro-arcade {
        --neon-pink: #ff00ff;
        --neon-cyan: #00ffff;
        --neon-yellow: #ffff00;
        --neon-green: #39ff14;
        --neon-orange: #ff6600;
        --arcade-purple: #6b0f6b;
        --arcade-dark: #0a0a12;
        --arcade-darker: #050508;
        --crt-line: rgba(0, 0, 0, 0.15);

        font-family: 'Press Start 2P', monospace;
        background: var(--arcade-dark);
        min-height: 100%;
        position: relative;
        overflow: hidden;
      }

      /* CRT Scanline Effect */
      .retro-arcade::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          var(--crt-line) 2px,
          var(--crt-line) 4px
        );
        pointer-events: none;
        z-index: 100;
      }

      /* CRT Flicker */
      .retro-arcade::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
          ellipse at center,
          transparent 0%,
          rgba(0, 0, 0, 0.3) 100%
        );
        pointer-events: none;
        z-index: 99;
        animation: crt-flicker 0.1s infinite;
      }

      @keyframes crt-flicker {
        0%, 100% { opacity: 0.97; }
        50% { opacity: 1; }
      }

      /* Neon Text Glow */
      .neon-text {
        color: var(--neon-cyan);
        text-shadow:
          0 0 5px var(--neon-cyan),
          0 0 10px var(--neon-cyan),
          0 0 20px var(--neon-cyan),
          0 0 40px var(--neon-cyan);
        animation: neon-pulse 2s ease-in-out infinite;
      }

      .neon-text-pink {
        color: var(--neon-pink);
        text-shadow:
          0 0 5px var(--neon-pink),
          0 0 10px var(--neon-pink),
          0 0 20px var(--neon-pink),
          0 0 40px var(--neon-pink);
      }

      .neon-text-yellow {
        color: var(--neon-yellow);
        text-shadow:
          0 0 5px var(--neon-yellow),
          0 0 10px var(--neon-yellow),
          0 0 20px var(--neon-yellow);
      }

      .neon-text-green {
        color: var(--neon-green);
        text-shadow:
          0 0 5px var(--neon-green),
          0 0 10px var(--neon-green),
          0 0 20px var(--neon-green);
      }

      @keyframes neon-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }

      /* Arcade Cabinet Frame */
      .arcade-frame {
        border: 4px solid var(--neon-pink);
        box-shadow:
          0 0 10px var(--neon-pink),
          0 0 20px var(--neon-pink),
          inset 0 0 30px rgba(255, 0, 255, 0.1);
        background: linear-gradient(
          180deg,
          rgba(107, 15, 107, 0.3) 0%,
          var(--arcade-darker) 100%
        );
      }

      /* Pixel Button Base */
      .pixel-btn {
        font-family: 'Press Start 2P', monospace;
        border: none;
        cursor: pointer;
        position: relative;
        text-transform: uppercase;
        transition: all 0.1s ease;
        image-rendering: pixelated;
      }

      .pixel-btn::before {
        content: '';
        position: absolute;
        top: 4px;
        left: 4px;
        right: -4px;
        bottom: -4px;
        background: rgba(0, 0, 0, 0.5);
        z-index: -1;
      }

      .pixel-btn:active {
        transform: translate(2px, 2px);
      }

      .pixel-btn:active::before {
        transform: translate(-2px, -2px);
      }

      /* Big Click Button */
      .click-button {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background: linear-gradient(
          145deg,
          #ff0066 0%,
          #cc0052 50%,
          #990040 100%
        );
        border: 6px solid var(--neon-yellow);
        box-shadow:
          0 0 20px var(--neon-yellow),
          0 0 40px rgba(255, 255, 0, 0.5),
          inset 0 -10px 30px rgba(0, 0, 0, 0.4),
          inset 0 10px 20px rgba(255, 255, 255, 0.2);
        font-family: 'Press Start 2P', monospace;
        font-size: 16px;
        color: white;
        cursor: pointer;
        text-shadow:
          2px 2px 0 #000,
          -2px -2px 0 #000,
          2px -2px 0 #000,
          -2px 2px 0 #000;
        transition: all 0.1s ease;
        animation: button-glow 1.5s ease-in-out infinite;
      }

      @keyframes button-glow {
        0%, 100% {
          box-shadow:
            0 0 20px var(--neon-yellow),
            0 0 40px rgba(255, 255, 0, 0.5),
            inset 0 -10px 30px rgba(0, 0, 0, 0.4),
            inset 0 10px 20px rgba(255, 255, 255, 0.2);
        }
        50% {
          box-shadow:
            0 0 30px var(--neon-yellow),
            0 0 60px rgba(255, 255, 0, 0.7),
            inset 0 -10px 30px rgba(0, 0, 0, 0.4),
            inset 0 10px 20px rgba(255, 255, 255, 0.2);
        }
      }

      .click-button:hover {
        transform: scale(1.05);
        background: linear-gradient(
          145deg,
          #ff3385 0%,
          #ff0066 50%,
          #cc0052 100%
        );
      }

      .click-button:active {
        transform: scale(0.95);
        box-shadow:
          0 0 10px var(--neon-yellow),
          0 0 20px rgba(255, 255, 0, 0.3),
          inset 0 10px 30px rgba(0, 0, 0, 0.6);
      }

      /* Retro Input */
      .retro-input {
        font-family: 'Press Start 2P', monospace;
        font-size: 10px;
        padding: 12px 16px;
        background: var(--arcade-darker);
        border: 3px solid var(--neon-cyan);
        color: var(--neon-cyan);
        box-shadow:
          0 0 10px rgba(0, 255, 255, 0.3),
          inset 0 0 20px rgba(0, 255, 255, 0.05);
        outline: none;
      }

      .retro-input::placeholder {
        color: rgba(0, 255, 255, 0.4);
      }

      .retro-input:focus {
        border-color: var(--neon-pink);
        box-shadow:
          0 0 15px rgba(255, 0, 255, 0.5),
          inset 0 0 20px rgba(255, 0, 255, 0.1);
        color: var(--neon-pink);
      }

      /* Stat Box */
      .stat-box {
        background: linear-gradient(
          180deg,
          rgba(0, 255, 255, 0.1) 0%,
          transparent 100%
        );
        border: 3px solid var(--neon-cyan);
        box-shadow:
          0 0 15px rgba(0, 255, 255, 0.3),
          inset 0 0 30px rgba(0, 255, 255, 0.05);
        padding: 16px 24px;
      }

      .stat-value {
        font-family: 'Press Start 2P', monospace;
        font-size: 24px;
        color: var(--neon-yellow);
        text-shadow:
          0 0 10px var(--neon-yellow),
          0 0 20px var(--neon-yellow);
        animation: score-pulse 0.5s ease-out;
      }

      @keyframes score-pulse {
        0% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      /* Leaderboard */
      .leaderboard {
        background: var(--arcade-darker);
        border: 4px solid var(--neon-green);
        box-shadow:
          0 0 20px rgba(57, 255, 20, 0.3),
          inset 0 0 40px rgba(57, 255, 20, 0.05);
      }

      .leaderboard-header {
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(57, 255, 20, 0.2) 50%,
          transparent 100%
        );
        border-bottom: 2px solid var(--neon-green);
      }

      .leaderboard-row {
        border-bottom: 1px solid rgba(57, 255, 20, 0.2);
        transition: all 0.2s ease;
      }

      .leaderboard-row:hover {
        background: rgba(57, 255, 20, 0.1);
      }

      .leaderboard-row.current-player {
        background: rgba(255, 0, 255, 0.15);
        border-left: 4px solid var(--neon-pink);
      }

      .rank-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: 2px solid;
        font-size: 10px;
      }

      .rank-1 {
        border-color: gold;
        color: gold;
        text-shadow: 0 0 10px gold;
        animation: rank-shine 2s ease-in-out infinite;
      }

      .rank-2 {
        border-color: silver;
        color: silver;
        text-shadow: 0 0 8px silver;
      }

      .rank-3 {
        border-color: #cd7f32;
        color: #cd7f32;
        text-shadow: 0 0 8px #cd7f32;
      }

      @keyframes rank-shine {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.5); }
      }

      /* Action Buttons */
      .action-btn {
        font-family: 'Press Start 2P', monospace;
        font-size: 8px;
        padding: 8px 12px;
        border: 2px solid;
        background: transparent;
        cursor: pointer;
        text-transform: uppercase;
        transition: all 0.2s ease;
      }

      .action-btn-green {
        border-color: var(--neon-green);
        color: var(--neon-green);
      }

      .action-btn-green:hover {
        background: rgba(57, 255, 20, 0.2);
        box-shadow: 0 0 15px rgba(57, 255, 20, 0.5);
      }

      .action-btn-red {
        border-color: #ff3333;
        color: #ff3333;
      }

      .action-btn-red:hover {
        background: rgba(255, 51, 51, 0.2);
        box-shadow: 0 0 15px rgba(255, 51, 51, 0.5);
      }

      .action-btn-yellow {
        border-color: var(--neon-yellow);
        color: var(--neon-yellow);
      }

      .action-btn-yellow:hover {
        background: rgba(255, 255, 0, 0.2);
        box-shadow: 0 0 15px rgba(255, 255, 0, 0.5);
      }

      .action-btn-cyan {
        border-color: var(--neon-cyan);
        color: var(--neon-cyan);
      }

      .action-btn-cyan:hover {
        background: rgba(0, 255, 255, 0.2);
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
      }

      /* Decorative Elements */
      .pixel-star {
        position: absolute;
        width: 4px;
        height: 4px;
        background: white;
        animation: twinkle 2s ease-in-out infinite;
      }

      @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
      }

      /* Score Counter Animation */
      .score-increment {
        position: absolute;
        color: var(--neon-yellow);
        font-family: 'Press Start 2P', monospace;
        font-size: 14px;
        animation: float-up 0.8s ease-out forwards;
        pointer-events: none;
      }

      @keyframes float-up {
        0% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-50px) scale(1.5);
        }
      }

      /* Loading Spinner Retro */
      .retro-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid transparent;
        border-top-color: var(--neon-cyan);
        border-right-color: var(--neon-pink);
        animation: retro-spin 1s linear infinite;
      }

      @keyframes retro-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      /* Insert Coin Text */
      .insert-coin {
        animation: blink 1s step-start infinite;
      }

      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }

      /* Marquee Effect */
      .arcade-marquee {
        background: linear-gradient(
          90deg,
          var(--neon-pink) 0%,
          var(--neon-yellow) 25%,
          var(--neon-cyan) 50%,
          var(--neon-green) 75%,
          var(--neon-pink) 100%
        );
        background-size: 200% 100%;
        animation: marquee-flow 3s linear infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      @keyframes marquee-flow {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }

      /* High Score Effect */
      .high-score {
        position: relative;
      }

      .high-score::after {
        content: 'HIGH SCORE';
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 6px;
        color: var(--neon-yellow);
        animation: blink 0.5s step-start infinite;
      }
    `}</style>
  );
}
