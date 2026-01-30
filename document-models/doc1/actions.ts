import { baseActions } from "document-model";
import { textActions } from "./gen/creators.js";

/** Actions for the Doc1 document model */

export const actions = { ...baseActions, ...textActions };
