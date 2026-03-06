import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { clickerGameDocumentType } from "./document-type.js";
import { ClickerGameStateSchema } from "./schema/zod.js";
import type { ClickerGameDocument, ClickerGamePHState } from "./types.js";

/** Schema for validating the header object of a ClickerGame document */
export const ClickerGameDocumentHeaderSchema = BaseDocumentHeaderSchema.extend({
  documentType: z.literal(clickerGameDocumentType),
});

/** Schema for validating the state object of a ClickerGame document */
export const ClickerGamePHStateSchema = BaseDocumentStateSchema.extend({
  global: ClickerGameStateSchema(),
});

export const ClickerGameDocumentSchema = z.object({
  header: ClickerGameDocumentHeaderSchema,
  state: ClickerGamePHStateSchema,
  initialState: ClickerGamePHStateSchema,
});

/** Simple helper function to check if a state object is a ClickerGame document state object */
export function isClickerGameState(
  state: unknown,
): state is ClickerGamePHState {
  return ClickerGamePHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a ClickerGame document state object */
export function assertIsClickerGameState(
  state: unknown,
): asserts state is ClickerGamePHState {
  ClickerGamePHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a ClickerGame document */
export function isClickerGameDocument(
  document: unknown,
): document is ClickerGameDocument {
  return ClickerGameDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a ClickerGame document */
export function assertIsClickerGameDocument(
  document: unknown,
): asserts document is ClickerGameDocument {
  ClickerGameDocumentSchema.parse(document);
}
