import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { ClickerGamePHState } from "@powerhousedao/clicker-game/document-models/clicker-game/v1";
import {
  actions,
  documentModel,
  reducer,
  utils,
} from "@powerhousedao/clicker-game/document-models/clicker-game/v1";

/** Document model module for the ClickerGame document type */
export const ClickerGame: DocumentModelModule<ClickerGamePHState> = {
  version: 1,
  reducer,
  actions,
  utils,
  documentModel: createState(defaultBaseState(), documentModel),
};
