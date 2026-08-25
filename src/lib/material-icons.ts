import { generateManifest, type Manifest, type ManifestConfig } from "material-icon-theme";

import type { StructureType } from "#/lib/structures.ts";

const ICON_BASE_URL = "/material-icon-theme/icons/";

export function createMaterialIconManifest(config?: ManifestConfig) {
  return generateManifest(config);
}

export function materialIconUrl(
  manifest: Manifest,
  name: string,
  type: StructureType,
  expanded: boolean,
) {
  const iconKey =
    type === "file" ? resolveFileIcon(manifest, name) : resolveFolderIcon(manifest, name, expanded);
  const fallback = type === "file" ? "file.svg" : expanded ? "folder-open.svg" : "folder.svg";
  const iconPath = iconKey ? manifest.iconDefinitions?.[iconKey]?.iconPath : undefined;
  return `${ICON_BASE_URL}${iconPath?.split("/").pop() ?? fallback}`;
}

function resolveFolderIcon(manifest: Manifest, name: string, expanded: boolean) {
  const normalized = name.toLowerCase();
  const candidates = [normalized, normalized.replace(/s$/, ""), normalized.replaceAll("_", "")];

  if (expanded) {
    const expandedIcon = findAssociation(manifest.folderNamesExpanded, candidates);
    if (expandedIcon) return expandedIcon;
  }

  return (
    findAssociation(manifest.folderNames, candidates) ??
    (expanded ? manifest.folderExpanded : manifest.folder)
  );
}

function resolveFileIcon(manifest: Manifest, name: string) {
  const normalized = name.toLowerCase();
  const exact = manifest.fileNames?.[normalized];
  if (exact) return exact;

  const parts = normalized.split(".");
  for (let index = 1; index < parts.length; index += 1) {
    const compoundExtension = parts.slice(index).join(".");
    const compoundIcon = manifest.fileExtensions?.[compoundExtension];
    if (compoundIcon) return compoundIcon;
  }

  const extension = parts.at(-1);
  if (extension) {
    const extensionIcon = manifest.fileExtensions?.[extension];
    if (extensionIcon) return extensionIcon;

    const languageIcon = manifest.languageIds?.[extension];
    if (languageIcon) return languageIcon;
  }

  return manifest.file;
}

function findAssociation(associations: Record<string, string> | undefined, candidates: string[]) {
  for (const candidate of candidates) {
    const icon = associations?.[candidate];
    if (icon) return icon;
  }
  return undefined;
}
