// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model/core";
import type { Doc1PHState } from "qa-staging/document-models/doc1";

import { doc1TextOperations } from "../src/reducers/text.js";

import { SetTextInputSchema } from "./schema/zod.js";

const stateReducer: StateReducer<Doc1PHState> = (state, action, dispatch) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "SET_TEXT": {
      SetTextInputSchema().parse(action.input);

      doc1TextOperations.setTextOperation(
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

export const reducer = createReducer<Doc1PHState>(stateReducer);
