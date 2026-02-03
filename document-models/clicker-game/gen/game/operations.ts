import { type SignalDispatch } from "document-model";
import type {
  AddPlayerAction,
  ClickAction,
  RemovePlayerAction,
  ResetGameAction,
  StartGameAction,
  StopGameAction,
} from "./actions.js";
import type { ClickerGameState } from "../types.js";

export interface ClickerGameGameOperations {
  addPlayerOperation: (
    state: ClickerGameState,
    action: AddPlayerAction,
    dispatch?: SignalDispatch,
  ) => void;
  clickOperation: (
    state: ClickerGameState,
    action: ClickAction,
    dispatch?: SignalDispatch,
  ) => void;
  removePlayerOperation: (
    state: ClickerGameState,
    action: RemovePlayerAction,
    dispatch?: SignalDispatch,
  ) => void;
  resetGameOperation: (
    state: ClickerGameState,
    action: ResetGameAction,
    dispatch?: SignalDispatch,
  ) => void;
  startGameOperation: (
    state: ClickerGameState,
    action: StartGameAction,
    dispatch?: SignalDispatch,
  ) => void;
  stopGameOperation: (
    state: ClickerGameState,
    action: StopGameAction,
    dispatch?: SignalDispatch,
  ) => void;
}
