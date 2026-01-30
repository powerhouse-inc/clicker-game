import { createAction } from "document-model/core";
import { SetTextInputSchema } from "../schema/zod.js";
import type { SetTextInput } from "../types.js";
import type { SetTextAction } from "./actions.js";

export const setText = (input: SetTextInput) =>
  createAction<SetTextAction>(
    "SET_TEXT",
    { ...input },
    undefined,
    SetTextInputSchema,
    "global",
  );
