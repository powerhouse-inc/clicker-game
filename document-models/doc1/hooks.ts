import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentById,
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type { Doc1Action, Doc1Document } from "qa-staging/document-models/doc1";
import { assertIsDoc1Document, isDoc1Document } from "./gen/document-schema.js";

/** Hook to get a Doc1 document by its id */
export function useDoc1DocumentById(
  documentId: string | null | undefined,
): [Doc1Document, DocumentDispatch<Doc1Action>] | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isDoc1Document(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected Doc1 document */
export function useSelectedDoc1Document(): [
  Doc1Document,
  DocumentDispatch<Doc1Action>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsDoc1Document(document);
  return [document, dispatch] as const;
}

/** Hook to get all Doc1 documents in the selected drive */
export function useDoc1DocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isDoc1Document);
}

/** Hook to get all Doc1 documents in the selected folder */
export function useDoc1DocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isDoc1Document);
}
