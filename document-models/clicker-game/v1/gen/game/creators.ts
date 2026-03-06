import { createAction } from "document-model/core";
import {
  AddPlayerInputSchema,
  ClickInputSchema,
  RemovePlayerInputSchema,
  ResetGameInputSchema,
  StartGameInputSchema,
  StopGameInputSchema,
} from "../schema/zod.js";
import type {
  AddPlayerInput,
  ClickInput,
  RemovePlayerInput,
  ResetGameInput,
  StartGameInput,
  StopGameInput,
} from "../types.js";
import type {
  AddPlayerAction,
  ClickAction,
  RemovePlayerAction,
  ResetGameAction,
  StartGameAction,
  StopGameAction,
} from "./actions.js";

export const addPlayer = (input: AddPlayerInput) =>
  createAction<AddPlayerAction>(
    "ADD_PLAYER",
    { ...input },
    undefined,
    AddPlayerInputSchema,
    "global",
  );

export const click = (input: ClickInput) =>
  createAction<ClickAction>(
    "CLICK",
    { ...input },
    undefined,
    ClickInputSchema,
    "global",
  );

export const removePlayer = (input: RemovePlayerInput) =>
  createAction<RemovePlayerAction>(
    "REMOVE_PLAYER",
    { ...input },
    undefined,
    RemovePlayerInputSchema,
    "global",
  );

export const resetGame = (input: ResetGameInput) =>
  createAction<ResetGameAction>(
    "RESET_GAME",
    { ...input },
    undefined,
    ResetGameInputSchema,
    "global",
  );

export const startGame = (input: StartGameInput) =>
  createAction<StartGameAction>(
    "START_GAME",
    { ...input },
    undefined,
    StartGameInputSchema,
    "global",
  );

export const stopGame = (input: StopGameInput) =>
  createAction<StopGameAction>(
    "STOP_GAME",
    { ...input },
    undefined,
    StopGameInputSchema,
    "global",
  );
