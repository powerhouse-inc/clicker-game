import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseSaveToFileHandle,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model/core";
import type { Doc1GlobalState, Doc1LocalState } from "./types.js";
import type { Doc1PHState } from "./types.js";
import { reducer } from "./reducer.js";
import { doc1DocumentType } from "./document-type.js";
import {
  isDoc1Document,
  assertIsDoc1Document,
  isDoc1State,
  assertIsDoc1State,
} from "./document-schema.js";

export const initialGlobalState: Doc1GlobalState = {
  text: "",
};
export const initialLocalState: Doc1LocalState = {};

export const utils: DocumentModelUtils<Doc1PHState> = {
  fileExtension: ".doc1",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = doc1DocumentType;

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
    return isDoc1State(state);
  },
  assertIsStateOfType(state) {
    return assertIsDoc1State(state);
  },
  isDocumentOfType(document) {
    return isDoc1Document(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsDoc1Document(document);
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
