/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect } from "vitest";
import {
  utils,
  initialGlobalState,
  initialLocalState,
  doc1DocumentType,
  isDoc1Document,
  assertIsDoc1Document,
  isDoc1State,
  assertIsDoc1State,
} from "qa-staging/document-models/doc1";
import { ZodError } from "zod";

describe("Doc1 Document Model", () => {
  it("should create a new Doc1 document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(doc1DocumentType);
  });

  it("should create a new Doc1 document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isDoc1Document(document)).toBe(true);
    expect(isDoc1State(document.state)).toBe(true);
  });
  it("should reject a document that is not a Doc1 document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsDoc1Document(wrongDocumentType)).toThrow();
      expect(isDoc1Document(wrongDocumentType)).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  const wrongState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongState.state.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isDoc1State(wrongState.state)).toBe(false);
    expect(assertIsDoc1State(wrongState.state)).toThrow();
    expect(isDoc1Document(wrongState)).toBe(false);
    expect(assertIsDoc1Document(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isDoc1State(wrongInitialState.state)).toBe(false);
    expect(assertIsDoc1State(wrongInitialState.state)).toThrow();
    expect(isDoc1Document(wrongInitialState)).toBe(false);
    expect(assertIsDoc1Document(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isDoc1Document(missingIdInHeader)).toBe(false);
    expect(assertIsDoc1Document(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isDoc1Document(missingNameInHeader)).toBe(false);
    expect(assertIsDoc1Document(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isDoc1Document(missingCreatedAtUtcIsoInHeader)).toBe(false);
    expect(assertIsDoc1Document(missingCreatedAtUtcIsoInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isDoc1Document(missingLastModifiedAtUtcIsoInHeader)).toBe(false);
    expect(assertIsDoc1Document(missingLastModifiedAtUtcIsoInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
