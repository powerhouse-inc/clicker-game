import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { Doc1PHState } from "qa-staging/document-models/doc1";
import {
  actions,
  documentModel,
  reducer,
  utils,
} from "qa-staging/document-models/doc1";

/** Document model module for the Todo List document type */
export const Doc1: DocumentModelModule<Doc1PHState> = {
  version: 1,
  reducer,
  actions,
  utils,
  documentModel: createState(defaultBaseState(), documentModel),
};
