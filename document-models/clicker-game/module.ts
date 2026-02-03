import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { ClickerGamePHState } from "clicker-game/document-models/clicker-game";
import {
  actions,
  documentModel,
  reducer,
  utils,
} from "clicker-game/document-models/clicker-game";

/** Document model module for the Todo List document type */
export const ClickerGame: DocumentModelModule<ClickerGamePHState> = {
  version: 1,
  reducer,
  actions,
  utils,
  documentModel: createState(defaultBaseState(), documentModel),
};
