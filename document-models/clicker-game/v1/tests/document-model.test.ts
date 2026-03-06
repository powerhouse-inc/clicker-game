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
  clickerGameDocumentType,
  isClickerGameDocument,
  assertIsClickerGameDocument,
  isClickerGameState,
  assertIsClickerGameState,
} from "@powerhousedao/clicker-game/document-models/clicker-game/v1";
import { ZodError } from "zod";

describe("ClickerGame Document Model", () => {
  it("should create a new ClickerGame document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(clickerGameDocumentType);
  });

  it("should create a new ClickerGame document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isClickerGameDocument(document)).toBe(true);
    expect(isClickerGameState(document.state)).toBe(true);
  });
  it("should reject a document that is not a ClickerGame document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsClickerGameDocument(wrongDocumentType)).toThrow();
      expect(isClickerGameDocument(wrongDocumentType)).toBe(false);
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
    expect(isClickerGameState(wrongState.state)).toBe(false);
    expect(assertIsClickerGameState(wrongState.state)).toThrow();
    expect(isClickerGameDocument(wrongState)).toBe(false);
    expect(assertIsClickerGameDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isClickerGameState(wrongInitialState.state)).toBe(false);
    expect(assertIsClickerGameState(wrongInitialState.state)).toThrow();
    expect(isClickerGameDocument(wrongInitialState)).toBe(false);
    expect(assertIsClickerGameDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isClickerGameDocument(missingIdInHeader)).toBe(false);
    expect(assertIsClickerGameDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isClickerGameDocument(missingNameInHeader)).toBe(false);
    expect(assertIsClickerGameDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isClickerGameDocument(missingCreatedAtUtcIsoInHeader)).toBe(false);
    expect(
      assertIsClickerGameDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isClickerGameDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsClickerGameDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
