/**
 * Factory methods for creating Doc1Document instances
 */
import type { PHAuthState, PHDocumentState, PHBaseState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model/core";
import type {
  Doc1Document,
  Doc1LocalState,
  Doc1GlobalState,
  Doc1PHState,
} from "./types.js";
import { createDocument } from "./utils.js";

export function defaultGlobalState(): Doc1GlobalState {
  return {
    text: "",
  };
}

export function defaultLocalState(): Doc1LocalState {
  return {};
}

export function defaultPHState(): Doc1PHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<Doc1GlobalState>,
): Doc1GlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as Doc1GlobalState;
}

export function createLocalState(
  state?: Partial<Doc1LocalState>,
): Doc1LocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as Doc1LocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<Doc1GlobalState>,
  localState?: Partial<Doc1LocalState>,
): Doc1PHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a Doc1Document with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createDoc1Document(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<Doc1GlobalState>;
    local?: Partial<Doc1LocalState>;
  }>,
): Doc1Document {
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
