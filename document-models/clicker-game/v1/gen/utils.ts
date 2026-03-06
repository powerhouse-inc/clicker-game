import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseSaveToFileHandle,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model/core";
import type { ClickerGameGlobalState, ClickerGameLocalState } from "./types.js";
import type { ClickerGamePHState } from "./types.js";
import { reducer } from "./reducer.js";
import { clickerGameDocumentType } from "./document-type.js";
import {
  isClickerGameDocument,
  assertIsClickerGameDocument,
  isClickerGameState,
  assertIsClickerGameState,
} from "./document-schema.js";

export const initialGlobalState: ClickerGameGlobalState = {
  gameMaster: null,
  clickCooldown: null,
  players: [],
};
export const initialLocalState: ClickerGameLocalState = {};

export const utils: DocumentModelUtils<ClickerGamePHState> = {
  fileExtension: "clicker",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = clickerGameDocumentType;

    // for backwards compatibility, but this is NOT a valid signed document id
    document.header.id = generateId();

    return document;
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
  isStateOfType(state) {
    return isClickerGameState(state);
  },
  assertIsStateOfType(state) {
    return assertIsClickerGameState(state);
  },
  isDocumentOfType(document) {
    return isClickerGameDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsClickerGameDocument(document);
  },
};

export const createDocument = utils.createDocument;
export const createState = utils.createState;
export const saveToFileHandle = utils.saveToFileHandle;
export const loadFromInput = utils.loadFromInput;
export const isStateOfType = utils.isStateOfType;
export const assertIsStateOfType = utils.assertIsStateOfType;
export const isDocumentOfType = utils.isDocumentOfType;
export const assertIsDocumentOfType = utils.assertIsDocumentOfType;
