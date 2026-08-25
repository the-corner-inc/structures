import { describe, expect, it } from "vite-plus/test";

import { createMaterialIconManifest, materialIconUrl } from "#/lib/material-icons.ts";

describe("materialIconUrl", () => {
  const manifest = createMaterialIconManifest({ activeIconPack: "angular" });

  it("uses named folder icons and their expanded variant", () => {
    expect(materialIconUrl(manifest, "images", "folder", false)).toBe(
      "/material-icon-theme/icons/folder-images.svg",
    );
    expect(materialIconUrl(manifest, "images", "folder", true)).toBe(
      "/material-icon-theme/icons/folder-images-open.svg",
    );
  });

  it("uses exact file and compound extension associations", () => {
    expect(materialIconUrl(manifest, "package.json", "file", false)).toBe(
      "/material-icon-theme/icons/nodejs.svg",
    );
    expect(materialIconUrl(manifest, "app.component.ts", "file", false)).toBe(
      "/material-icon-theme/icons/angular-component.clone.svg",
    );
  });

  it("falls back to the default file icon", () => {
    expect(materialIconUrl(manifest, "file-without-extension", "file", false)).toBe(
      "/material-icon-theme/icons/file.svg",
    );
  });
});
