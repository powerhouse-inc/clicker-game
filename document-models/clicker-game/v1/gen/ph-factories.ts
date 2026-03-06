/**
 * Factory methods for creating ClickerGameDocument instances
 */
import type { PHAuthState, PHDocumentState, PHBaseState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model/core";
import type {
  ClickerGameDocument,
  ClickerGameLocalState,
  ClickerGameGlobalState,
  ClickerGamePHState,
} from "./types.js";
import { createDocument } from "./utils.js";

export function defaultGlobalState(): ClickerGameGlobalState {
  return { gameMaster: null, clickCooldown: null, players: [] };
}

export function defaultLocalState(): ClickerGameLocalState {
  return {};
}

export function defaultPHState(): ClickerGamePHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<ClickerGameGlobalState>,
): ClickerGameGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as ClickerGameGlobalState;
}

export function createLocalState(
  state?: Partial<ClickerGameLocalState>,
): ClickerGameLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as ClickerGameLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<ClickerGameGlobalState>,
  localState?: Partial<ClickerGameLocalState>,
): ClickerGamePHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a ClickerGameDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createClickerGameDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<ClickerGameGlobalState>;
    local?: Partial<ClickerGameLocalState>;
  }>,
): ClickerGameDocument {
  const document = createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
