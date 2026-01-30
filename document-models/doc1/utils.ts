import type { DocumentModelUtils } from "document-model";
import type { Doc1PHState } from "./gen/types.js";
import { utils as genUtils } from "./gen/utils.js";
import * as customUtils from "./src/utils.js";

/** Utils for the Doc1 document model */
export const utils = {
  ...genUtils,
  ...customUtils,
} satisfies DocumentModelUtils<Doc1PHState>;
