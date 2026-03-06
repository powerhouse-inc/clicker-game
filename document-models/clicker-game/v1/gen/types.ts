import type { PHDocument, PHBaseState } from "document-model";
import type { ClickerGameAction } from "./actions.js";
import type { ClickerGameState as ClickerGameGlobalState } from "./schema/types.js";

type ClickerGameLocalState = Record<PropertyKey, never>;

type ClickerGamePHState = PHBaseState & {
  global: ClickerGameGlobalState;
  local: ClickerGameLocalState;
};
type ClickerGameDocument = PHDocument<ClickerGamePHState>;

export * from "./schema/types.js";

export type {
  ClickerGameGlobalState,
  ClickerGameLocalState,
  ClickerGamePHState,
  ClickerGameAction,
  ClickerGameDocument,
};
