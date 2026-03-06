import {
  DuplicatePlayerError,
  NotAuthorizedError,
  GameNotStartedError,
  PlayerNotFoundError,
  GameAlreadyStartedError,
  NotGameMasterError,
} from "../../gen/game/error.js";
import type { ClickerGameGameOperations } from "@powerhousedao/clicker-game/document-models/clicker-game/v1";

export const clickerGameGameOperations: ClickerGameGameOperations = {
  addPlayerOperation(state, action) {
    const address = action.context?.signer?.user?.address;
    if (!address) {
      throw new NotAuthorizedError("User is not authenticated");
    }
    if (!state.gameMaster) {
      throw new GameNotStartedError("Game has not been started yet");
    }
    const existing = state.players.find((p) => p.id === address);
    if (existing) {
      throw new DuplicatePlayerError(
        `Player with address ${address} already exists`,
      );
    }
    state.players.push({
      id: address,
      name: action.input.name,
      clicks: 0,
    });
  },
  clickOperation(state, action) {
    const address = action.context?.signer?.user?.address;
    if (!address) {
      throw new NotAuthorizedError("User is not authenticated");
    }
    const player = state.players.find((p) => p.id === address);
    if (!player) {
      throw new PlayerNotFoundError(`Player ${address} not found`);
    }
    player.clicks += 1;
  },
  removePlayerOperation(state, action) {
    const address = action.context?.signer?.user?.address;
    if (!address) {
      throw new NotAuthorizedError("User is not authenticated");
    }
    const index = state.players.findIndex((p) => p.id === address);
    if (index === -1) {
      throw new PlayerNotFoundError(`Player ${address} not found`);
    }
    state.players.splice(index, 1);
  },
  resetGameOperation(state, action) {
    const address = action.context?.signer?.user?.address;
    if (!address) {
      throw new NotAuthorizedError("User is not authenticated");
    }
    if (state.gameMaster !== address) {
      throw new NotGameMasterError("Only the game master can reset the game");
    }
    state.players.forEach((p) => {
      p.clicks = 0;
    });
  },
  startGameOperation(state, action) {
    const address = action.context?.signer?.user?.address;
    if (!address) {
      throw new NotAuthorizedError("User is not authenticated");
    }
    if (state.gameMaster) {
      throw new GameAlreadyStartedError("Game has already been started");
    }
    state.gameMaster = address;
    state.clickCooldown = action.input.cooldown || null;
  },
  stopGameOperation(state, action) {
    const address = action.context?.signer?.user?.address;
    if (!address) {
      throw new NotAuthorizedError("User is not authenticated");
    }
    if (state.gameMaster !== address) {
      throw new NotGameMasterError("Only the game master can stop the game");
    }
    state.gameMaster = null;
    state.clickCooldown = null;
    state.players = [];
  },
};
