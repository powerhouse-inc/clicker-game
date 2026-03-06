import type { UpgradeManifest } from "document-model";
import { clickerGameUpgradeManifest } from "./clicker-game/upgrades/upgrade-manifest.js";

export const upgradeManifests: UpgradeManifest<readonly number[]>[] = [
  clickerGameUpgradeManifest,
];
