import { useState } from "react";

interface PlayerFormProps {
  onJoinGame: (name: string) => void;
  disabled?: boolean;
}

export function PlayerForm({ onJoinGame, disabled }: PlayerFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName) {
      onJoinGame(trimmedName);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="text-center">
        <p
          className="insert-coin"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "8px",
            color: "#ffff00",
            textShadow: "0 0 10px #ffff00",
            marginBottom: "10px",
          }}
        >
          ENTER NAME
        </p>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value.toUpperCase())}
        placeholder="NAME..."
        disabled={disabled}
        maxLength={12}
        className="retro-input"
        style={{
          textTransform: "uppercase",
          width: "100%",
          fontSize: "8px",
          padding: "8px 10px",
        }}
      />

      <button
        type="submit"
        disabled={disabled || !name.trim()}
        className="action-btn action-btn-green"
        style={{
          padding: "8px 16px",
          fontSize: "8px",
          width: "100%",
          opacity: disabled || !name.trim() ? 0.5 : 1,
          cursor: disabled || !name.trim() ? "not-allowed" : "pointer",
        }}
      >
        JOIN GAME
      </button>
    </form>
  );
}
