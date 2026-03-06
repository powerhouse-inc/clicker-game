import type { Action } from "document-model";
import type {
  AddPlayerInput,
  ClickInput,
  RemovePlayerInput,
  ResetGameInput,
  StartGameInput,
  StopGameInput,
} from "../types.js";

export type AddPlayerAction = Action & {
  type: "ADD_PLAYER";
  input: AddPlayerInput;
};
export type ClickAction = Action & { type: "CLICK"; input: ClickInput };
export type RemovePlayerAction = Action & {
  type: "REMOVE_PLAYER";
  input: RemovePlayerInput;
};
export type ResetGameAction = Action & {
  type: "RESET_GAME";
  input: ResetGameInput;
};
export type StartGameAction = Action & {
  type: "START_GAME";
  input: StartGameInput;
};
export type StopGameAction = Action & {
  type: "STOP_GAME";
  input: StopGameInput;
};

export type ClickerGameGameAction =
  | AddPlayerAction
  | ClickAction
  | RemovePlayerAction
  | ResetGameAction
  | StartGameAction
  | StopGameAction;
