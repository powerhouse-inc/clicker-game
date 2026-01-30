import { generateMock } from "@powerhousedao/codegen";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isDoc1Document,
  setText,
  SetTextInputSchema,
} from "qa-staging/document-models/doc1";

describe("TextOperations", () => {
  it("should handle setText operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetTextInputSchema());

    const updatedDocument = reducer(document, setText(input));

    expect(isDoc1Document(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_TEXT");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
