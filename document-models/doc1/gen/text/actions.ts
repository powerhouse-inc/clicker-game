import type { Action } from "document-model";
import type { SetTextInput } from "../types.js";

export type SetTextAction = Action & { type: "SET_TEXT"; input: SetTextInput };

export type Doc1TextAction = SetTextAction;
