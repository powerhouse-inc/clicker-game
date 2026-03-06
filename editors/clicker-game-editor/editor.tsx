import { useState } from "react";
import { useSelectedClickerGameDocument } from "@powerhousedao/clicker-game/document-models/clicker-game";
import {
  addPlayer,
  click,
  removePlayer,
  resetGame,
  startGame,
  stopGame,
} from "../../document-models/clicker-game/v1/gen/creators.js";
import {
  ClickButton,
  Leaderboard,
  PlayerForm,
  RetroStyles,
} from "./components/index.js";
import { useRenown } from "@powerhousedao/reactor-browser/connect";

const COOLDOWN_OPTIONS = [
  { label: "NONE", value: 0 },
  { label: "0.5S", value: 500 },
  { label: "1S", value: 1000 },
  { label: "2S", value: 2000 },
  { label: "3S", value: 3000 },
  { label: "5S", value: 5000 },
];

export default function Editor() {
  const [document, dispatch] = useSelectedClickerGameDocument();

  const renown = useRenown();
  const user = renown?.user;
  const status = !user
    ? "unauthorized"
    : typeof user === "function"
      ? "loading"
      : "authorized";

  const userAddress =
    status === "authorized" && typeof user === "object"
      ? user.address
      : undefined;

  const gameMaster = document.state.global.gameMaster;
  const isGameStarted = !!gameMaster;
  const isGameMaster = userAddress && gameMaster === userAddress;

  const players = document.state.global.players;
  const currentPlayer = userAddress
    ? players.find((p) => p.id === userAddress)
    : undefined;
  const totalClicks = players.reduce((sum, p) => sum + p.clicks, 0);

  const clickCooldown = document.state.global.clickCooldown;
  const documentName = document.header.name || "CLICKER GAME";

  const [selectedCooldown, setSelectedCooldown] = useState(0);

  const handleStartGame = () => {
    dispatch(startGame({ cooldown: selectedCooldown || undefined }));
  };

  const handleStopGame = () => {
    dispatch(stopGame({}));
  };

  const handleJoinGame = (name: string) => {
    dispatch(addPlayer({ name }));
  };

  const handleClick = () => {
    dispatch(click({}));
  };

  const handleLeaveGame = () => {
    dispatch(removePlayer({}));
  };

  const handleResetGame = () => {
    dispatch(resetGame({}));
  };

  const renderGameStatus = () => {
    if (!isGameStarted) {
      return (
        <div
          className="arcade-frame"
          style={{
            padding: "24px",
            textAlign: "center",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <p
            className="neon-text-pink"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "10px",
              marginBottom: "12px",
              lineHeight: "1.6",
            }}
          >
            NO GAME IN PROGRESS
          </p>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "7px",
              color: "rgba(0, 255, 255, 0.6)",
              marginBottom: "16px",
            }}
          >
            START A GAME TO BECOME THE GAME MASTER!
          </p>
          {status === "authorized" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <label
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "6px",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  SELECT CLICK COOLDOWN
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {COOLDOWN_OPTIONS.map((opt) => {
                    const isSelected = selectedCooldown === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedCooldown(opt.value)}
                        className="action-btn action-btn-green"
                        style={{
                          padding: "6px 10px",
                          fontSize: "7px",
                          opacity: isSelected ? 1 : 0.35,
                          background: isSelected
                            ? "rgba(57, 255, 20, 0.2)"
                            : "transparent",
                          boxShadow: isSelected
                            ? "0 0 10px rgba(57, 255, 20, 0.5)"
                            : "none",
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={handleStartGame}
                className="action-btn action-btn-green"
                style={{
                  padding: "12px 24px",
                  fontSize: "10px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft: "8px solid currentColor",
                    }}
                  />
                  START GAME
                </span>
              </button>
            </div>
          )}
          {status === "unauthorized" && (
            <p
              className="insert-coin"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "8px",
                color: "#ffff00",
                marginTop: "12px",
              }}
            >
              LOGIN TO START A GAME
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderJoinSection = () => {
    if (!isGameStarted) return null;

    if (status === "unauthorized") {
      return (
        <div
          className="arcade-frame"
          style={{
            padding: "16px",
            textAlign: "center",
            maxWidth: "300px",
          }}
        >
          <span style={{ marginRight: "8px" }}>🔒</span>
          <span
            className="neon-text-yellow insert-coin"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
            }}
          >
            LOGIN TO PLAY
          </span>
        </div>
      );
    }

    if (status === "loading") {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "24px",
          }}
        >
          <div className="retro-spinner" />
          <span
            className="neon-text"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
            }}
          >
            LOADING...
          </span>
        </div>
      );
    }

    if (!currentPlayer) {
      return (
        <div
          className="arcade-frame"
          style={{ padding: "16px", maxWidth: "220px" }}
        >
          <PlayerForm onJoinGame={handleJoinGame} />
        </div>
      );
    }

    return (
      <ClickButton
        onClick={handleClick}
        playerClicks={currentPlayer.clicks}
        cooldownMs={clickCooldown}
      />
    );
  };

  return (
    <div
      className="retro-arcade"
      style={{
        padding: "16px",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <RetroStyles />

      {/* Decorative pixel stars */}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          className="pixel-star"
          style={{
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 7) % 100}%`,
            animationDelay: `${(i * 0.1) % 2}s`,
          }}
        />
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1
            className="arcade-marquee"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "28px",
              marginBottom: "12px",
              lineHeight: "1.3",
              textTransform: "uppercase",
              letterSpacing: "4px",
            }}
          >
            {documentName}
          </h1>
        </div>

        {!isGameStarted && (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {renderGameStatus()}
          </div>
        )}

        {isGameStarted && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              position: "relative",
            }}
          >
            {/* Button - Main Area (centered in screen) */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {renderJoinSection()}
            </div>

            {/* Leaderboard - Sidebar (fixed to right) */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "280px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Leaderboard
                players={players}
                totalClicks={totalClicks}
                currentPlayerId={userAddress}
                gameMaster={gameMaster}
                onLeaveGame={currentPlayer ? handleLeaveGame : undefined}
                onReset={handleResetGame}
                onEndGame={handleStopGame}
                isGameMaster={isGameMaster}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            paddingTop: "16px",
            marginTop: "20px",
            borderTop: "1px solid rgba(255, 0, 255, 0.2)",
          }}
        >
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "5px",
              color: "rgba(0, 255, 255, 0.4)",
            }}
          >
            © POWERHOUSE ARCADE {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
