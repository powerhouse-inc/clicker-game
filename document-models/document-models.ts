import type { DocumentModelModule } from "document-model";
import { ClickerGame as ClickerGameV1 } from "./clicker-game/v1/module.js";

export const documentModels: DocumentModelModule<any>[] = [ClickerGameV1];
