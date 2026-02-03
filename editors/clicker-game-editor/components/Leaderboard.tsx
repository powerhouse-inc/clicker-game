import { useEffect, useRef, useState } from "react";
import type { Player } from "@powerhousedao/clicker-game/document-models/clicker-game";

interface LeaderboardProps {
  players: Player[];
  totalClicks: number;
  currentPlayerId?: string;
  gameMaster?: string;
  onLeaveGame?: () => void;
  onReset?: () => void;
  onEndGame?: () => void;
  isGameMaster?: boolean;
}

export function Leaderboard({
  players,
  totalClicks,
  currentPlayerId,
  gameMaster,
  onLeaveGame,
  onReset,
  onEndGame,
  isGameMaster,
}: LeaderboardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.clicks - a.clicks);
  const [newPlayerIds, setNewPlayerIds] = useState<Set<string>>(new Set());
  const [rankChanges, setRankChanges] = useState<Record<string, "up" | "down">>(
    {},
  );
  const prevRanksRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const currentRanks: Record<string, number> = {};
    const changes: Record<string, "up" | "down"> = {};
    const newIds = new Set<string>();

    sortedPlayers.forEach((player, index) => {
      currentRanks[player.id] = index;
      const prevRank = prevRanksRef.current[player.id];

      if (prevRank === undefined) {
        newIds.add(player.id);
      } else if (prevRank > index) {
        changes[player.id] = "up";
      } else if (prevRank < index) {
        changes[player.id] = "down";
      }
    });

    if (newIds.size > 0) {
      setNewPlayerIds(newIds);
      setTimeout(() => setNewPlayerIds(new Set()), 500);
    }

    if (Object.keys(changes).length > 0) {
      setRankChanges(changes);
      setTimeout(() => setRankChanges({}), 500);
    }

    prevRanksRef.current = currentRanks;
  }, [sortedPlayers]);

  return (
    <div
      className="leaderboard"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes rankUp {
          0% {
            background: rgba(57, 255, 20, 0.3);
          }
          50% {
            background: rgba(57, 255, 20, 0.5);
          }
          100% {
            background: transparent;
          }
        }

        @keyframes rankDown {
          0% {
            background: rgba(255, 50, 50, 0.3);
          }
          50% {
            background: rgba(255, 50, 50, 0.5);
          }
          100% {
            background: transparent;
          }
        }

        .player-row-new {
          animation: slideIn 0.4s ease-out;
        }

        .player-row-up {
          animation: rankUp 0.5s ease-out;
        }

        .player-row-down {
          animation: rankDown 0.5s ease-out;
        }

        .score-bump {
          animation: scoreBump 0.3s ease-out;
        }

        @keyframes scoreBump {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
      {/* Title + Stats Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "2px solid rgba(57, 255, 20, 0.4)",
          background:
            "linear-gradient(180deg, rgba(57, 255, 20, 0.15) 0%, rgba(57, 255, 20, 0.05) 100%)",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "8px",
            color: "#39ff14",
            margin: 0,
            textShadow: "0 0 10px rgba(57, 255, 20, 0.8)",
          }}
        >
          ★ LEADERBOARD ★
        </h2>

        {/* Stats + Controls */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Clicks - vertical */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "4px",
                color: "rgba(57, 255, 20, 0.7)",
                marginBottom: "1px",
              }}
            >
              CLICKS
            </p>
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "9px",
                color: "#ffff00",
                textShadow: "0 0 8px #ffff00",
                margin: 0,
              }}
            >
              {totalClicks.toLocaleString()}
            </p>
          </div>

          <div
            style={{
              width: "1px",
              height: "20px",
              background: "rgba(57, 255, 20, 0.3)",
            }}
          />

          {/* Players - vertical */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "4px",
                color: "rgba(57, 255, 20, 0.7)",
                marginBottom: "1px",
              }}
            >
              PLAYERS
            </p>
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "9px",
                color: "#ffff00",
                textShadow: "0 0 8px #ffff00",
                margin: 0,
              }}
            >
              {players.length}
            </p>
          </div>

          {/* Game Master Controls */}
          {isGameMaster && (
            <>
              <div
                style={{
                  width: "1px",
                  height: "20px",
                  background: "rgba(57, 255, 20, 0.3)",
                }}
              />
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  onClick={onReset}
                  className="action-btn action-btn-yellow"
                  style={{ fontSize: "4px", padding: "4px 6px" }}
                >
                  RESET
                </button>
                <button
                  onClick={onEndGame}
                  className="action-btn action-btn-red"
                  style={{ fontSize: "4px", padding: "4px 6px" }}
                >
                  END
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {sortedPlayers.length === 0 ? (
        <div
          style={{
            padding: "32px",
            textAlign: "center",
          }}
        >
          <p
            className="insert-coin"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "10px",
              color: "#39ff14",
            }}
          >
            NO PLAYERS YET
          </p>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
              color: "rgba(57, 255, 20, 0.5)",
              marginTop: "12px",
            }}
          >
            WAITING FOR CHALLENGERS...
          </p>
        </div>
      ) : (
        <>
          {/* Column Header */}
          <div className="leaderboard-header">
            <div
              className="flex"
              style={{
                padding: "6px 12px",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "5px",
                color: "rgba(57, 255, 20, 0.6)",
              }}
            >
              <div style={{ width: "35px" }}>RANK</div>
              <div style={{ flex: 1 }}>PLAYER</div>
              <div style={{ width: "60px", textAlign: "right" }}>SCORE</div>
              {onLeaveGame && <div style={{ width: "45px" }} />}
            </div>
          </div>

          {/* Rows */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {sortedPlayers.map((player, index) => {
              const isCurrentPlayer = player.id === currentPlayerId;
              const rank = index + 1;

              const isNew = newPlayerIds.has(player.id);
              const rankChange = rankChanges[player.id];

              return (
                <div
                  key={player.id}
                  className={`leaderboard-row flex items-center ${isCurrentPlayer ? "current-player" : ""} ${isNew ? "player-row-new" : ""} ${rankChange === "up" ? "player-row-up" : ""} ${rankChange === "down" ? "player-row-down" : ""}`}
                  style={{
                    padding: "5px 12px",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "7px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Rank Badge */}
                  <div style={{ width: "35px" }}>
                    <span
                      className={`rank-badge ${rank <= 3 ? `rank-${rank}` : ""}`}
                      style={{
                        width: "22px",
                        height: "22px",
                        fontSize: "8px",
                        borderColor:
                          rank > 3 ? "rgba(57, 255, 20, 0.5)" : undefined,
                        color: rank > 3 ? "rgba(57, 255, 20, 0.7)" : undefined,
                      }}
                    >
                      {rank === 1 ? "★" : rank}
                    </span>
                  </div>

                  {/* Player Name */}
                  <div
                    style={{
                      flex: 1,
                      color: isCurrentPlayer ? "#ff00ff" : "#39ff14",
                      textShadow: isCurrentPlayer
                        ? "0 0 10px rgba(255, 0, 255, 0.5)"
                        : "0 0 5px rgba(57, 255, 20, 0.3)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {player.name}
                    {isCurrentPlayer && (
                      <span
                        style={{
                          marginLeft: "6px",
                          fontSize: "5px",
                          color: "#ff00ff",
                          opacity: 0.8,
                        }}
                      >
                        (YOU)
                      </span>
                    )}
                  </div>

                  {/* Score */}
                  <div
                    key={player.clicks}
                    className="score-bump"
                    style={{
                      width: "60px",
                      textAlign: "right",
                      color: rank === 1 ? "gold" : "#ffff00",
                      textShadow:
                        rank === 1
                          ? "0 0 10px gold"
                          : "0 0 5px rgba(255, 255, 0, 0.5)",
                    }}
                  >
                    {player.clicks.toLocaleString()}
                  </div>

                  {/* Leave Button */}
                  {onLeaveGame && (
                    <div style={{ width: "45px", textAlign: "right" }}>
                      {isCurrentPlayer && (
                        <button
                          onClick={onLeaveGame}
                          className="action-btn action-btn-red"
                          style={{
                            fontSize: "4px",
                            padding: "3px 5px",
                          }}
                        >
                          QUIT
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Footer - Game Master */}
      {gameMaster && (
        <div
          style={{
            padding: "5px 12px",
            borderTop: "1px solid rgba(57, 255, 20, 0.2)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "4px",
              color: "rgba(255, 0, 255, 0.6)",
              margin: 0,
            }}
          >
            GAME MASTER:{" "}
            <span style={{ color: "#ff00ff" }}>
              {gameMaster.slice(0, 6)}...{gameMaster.slice(-4)}
            </span>
            {isGameMaster && (
              <span style={{ color: "#39ff14", marginLeft: "6px" }}>(YOU)</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
