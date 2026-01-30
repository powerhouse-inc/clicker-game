import type { PHDocument, PHBaseState } from "document-model";
import type { Doc1Action } from "./actions.js";
import type { Doc1State as Doc1GlobalState } from "./schema/types.js";

type Doc1LocalState = Record<PropertyKey, never>;

type Doc1PHState = PHBaseState & {
  global: Doc1GlobalState;
  local: Doc1LocalState;
};
type Doc1Document = PHDocument<Doc1PHState>;

export * from "./schema/types.js";

export type {
  Doc1GlobalState,
  Doc1LocalState,
  Doc1PHState,
  Doc1Action,
  Doc1Document,
};
