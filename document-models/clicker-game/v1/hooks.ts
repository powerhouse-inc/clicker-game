import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentById,
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type {
  ClickerGameAction,
  ClickerGameDocument,
} from "@powerhousedao/clicker-game/document-models/clicker-game/v1";
import {
  assertIsClickerGameDocument,
  isClickerGameDocument,
} from "./gen/document-schema.js";

/** Hook to get a ClickerGame document by its id */
export function useClickerGameDocumentById(
  documentId: string | null | undefined,
):
  | [ClickerGameDocument, DocumentDispatch<ClickerGameAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isClickerGameDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected ClickerGame document */
export function useSelectedClickerGameDocument(): [
  ClickerGameDocument,
  DocumentDispatch<ClickerGameAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsClickerGameDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all ClickerGame documents in the selected drive */
export function useClickerGameDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isClickerGameDocument);
}

/** Hook to get all ClickerGame documents in the selected folder */
export function useClickerGameDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isClickerGameDocument);
}
