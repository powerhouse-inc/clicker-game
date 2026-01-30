import { type SignalDispatch } from "document-model";
import type { SetTextAction } from "./actions.js";
import type { Doc1State } from "../types.js";

export interface Doc1TextOperations {
  setTextOperation: (
    state: Doc1State,
    action: SetTextAction,
    dispatch?: SignalDispatch,
  ) => void;
}
