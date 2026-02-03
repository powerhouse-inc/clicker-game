import { baseActions } from "document-model";
import { gameActions } from "./gen/creators.js";

/** Actions for the ClickerGame document model */

export const actions = { ...baseActions, ...gameActions };
