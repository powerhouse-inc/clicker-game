
import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the "["powerhouse/doc1"]" document type */
export const Doc1Editor: EditorModule = {
    Component: lazy(() => import("./editor.js")),
    documentTypes: ["powerhouse/doc1"],
    config: {
        id: "doc1-editor",
        name: "Doc1Editor",
    },
};
