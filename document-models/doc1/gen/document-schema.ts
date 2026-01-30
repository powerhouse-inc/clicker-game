import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { doc1DocumentType } from "./document-type.js";
import { Doc1StateSchema } from "./schema/zod.js";
import type { Doc1Document, Doc1PHState } from "./types.js";

/** Schema for validating the header object of a Doc1 document */
export const Doc1DocumentHeaderSchema = BaseDocumentHeaderSchema.extend({
  documentType: z.literal(doc1DocumentType),
});

/** Schema for validating the state object of a Doc1 document */
export const Doc1PHStateSchema = BaseDocumentStateSchema.extend({
  global: Doc1StateSchema(),
});

export const Doc1DocumentSchema = z.object({
  header: Doc1DocumentHeaderSchema,
  state: Doc1PHStateSchema,
  initialState: Doc1PHStateSchema,
});

/** Simple helper function to check if a state object is a Doc1 document state object */
export function isDoc1State(state: unknown): state is Doc1PHState {
  return Doc1PHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a Doc1 document state object */
export function assertIsDoc1State(
  state: unknown,
): asserts state is Doc1PHState {
  Doc1PHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a Doc1 document */
export function isDoc1Document(document: unknown): document is Doc1Document {
  return Doc1DocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a Doc1 document */
export function assertIsDoc1Document(
  document: unknown,
): asserts document is Doc1Document {
  Doc1DocumentSchema.parse(document);
}
