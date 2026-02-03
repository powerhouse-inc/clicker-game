import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the "["powerhouse/clicker-game"]" document type */
export const ClickerGameEditor: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/clicker-game"],
  config: {
    id: "clicker-game-editor",
    name: "ClickerGameEditor",
  },
};
