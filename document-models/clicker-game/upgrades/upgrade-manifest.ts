import type { UpgradeManifest } from "document-model";
import { latestVersion, supportedVersions } from "./versions.js";

export const clickerGameUpgradeManifest: UpgradeManifest<
  typeof supportedVersions
> = {
  documentType: "powerhouse/clicker-game",
  latestVersion,
  supportedVersions,
  upgrades: {},
};
