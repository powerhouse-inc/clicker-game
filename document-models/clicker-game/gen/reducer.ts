// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model/core";
import type { ClickerGamePHState } from "@powerhousedao/clicker-game/document-models/clicker-game";

import { clickerGameGameOperations } from "../src/reducers/game.js";

import {
  AddPlayerInputSchema,
  ClickInputSchema,
  RemovePlayerInputSchema,
  ResetGameInputSchema,
  StartGameInputSchema,
  StopGameInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<ClickerGamePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "ADD_PLAYER": {
      AddPlayerInputSchema().parse(action.input);

      clickerGameGameOperations.addPlayerOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CLICK": {
      ClickInputSchema().parse(action.input);

      clickerGameGameOperations.clickOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_PLAYER": {
      RemovePlayerInputSchema().parse(action.input);

      clickerGameGameOperations.removePlayerOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "RESET_GAME": {
      ResetGameInputSchema().parse(action.input);

      clickerGameGameOperations.resetGameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "START_GAME": {
      StartGameInputSchema().parse(action.input);

      clickerGameGameOperations.startGameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "STOP_GAME": {
      StopGameInputSchema().parse(action.input);

      clickerGameGameOperations.stopGameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    default:
      return state;
  }
};

export const reducer = createReducer<ClickerGamePHState>(stateReducer);
