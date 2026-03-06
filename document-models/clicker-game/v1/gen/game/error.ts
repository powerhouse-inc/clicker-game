export type ErrorCode =
  | "DuplicatePlayerError"
  | "NotAuthorizedError"
  | "GameNotStartedError"
  | "PlayerNotFoundError"
  | "GameAlreadyStartedError"
  | "NotGameMasterError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class DuplicatePlayerError extends Error implements ReducerError {
  errorCode = "DuplicatePlayerError" as ErrorCode;
  constructor(message = "DuplicatePlayerError") {
    super(message);
  }
}

export class NotAuthorizedError extends Error implements ReducerError {
  errorCode = "NotAuthorizedError" as ErrorCode;
  constructor(message = "NotAuthorizedError") {
    super(message);
  }
}

export class GameNotStartedError extends Error implements ReducerError {
  errorCode = "GameNotStartedError" as ErrorCode;
  constructor(message = "GameNotStartedError") {
    super(message);
  }
}

export class PlayerNotFoundError extends Error implements ReducerError {
  errorCode = "PlayerNotFoundError" as ErrorCode;
  constructor(message = "PlayerNotFoundError") {
    super(message);
  }
}

export class GameAlreadyStartedError extends Error implements ReducerError {
  errorCode = "GameAlreadyStartedError" as ErrorCode;
  constructor(message = "GameAlreadyStartedError") {
    super(message);
  }
}

export class NotGameMasterError extends Error implements ReducerError {
  errorCode = "NotGameMasterError" as ErrorCode;
  constructor(message = "NotGameMasterError") {
    super(message);
  }
}

export const errors = {
  AddPlayer: { DuplicatePlayerError, NotAuthorizedError, GameNotStartedError },
  Click: { PlayerNotFoundError },
  StartGame: { GameAlreadyStartedError },
  StopGame: { NotGameMasterError },
};
