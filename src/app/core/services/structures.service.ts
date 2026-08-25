import { httpResource } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { RouteSettings } from '@models/route-settings.model';
import { FolderSettings, FolderStructure } from '@models/structure.model';
import { generateManifest } from 'material-icon-theme';

@Injectable({ providedIn: 'root' })
export class StructuresService {
  readonly routeSettings = signal<RouteSettings>({
    settingsUrl: '/assets/user/',
    iconBaseUrl: '/material-icon-theme/icons/',
    frameworks: [],
  });
  readonly selectedElement = signal<string | null>(null);

  readonly #folderSettings = httpResource<FolderSettings>(() =>
    this.#settingsUrl(this.routeSettings().settingsUrl),
  );

  readonly libraryName = computed(() =>
    this.#folderSettings.hasValue() ? this.#folderSettings.value().libraryName : '',
  );

  readonly structureFolders = computed<FolderStructure[]>(() =>
    this.#folderSettings.hasValue() ? this.#folderSettings.value().structures : [],
  );

  readonly manifest = computed(() => {
    const manifestConfig = this.#folderSettings.hasValue()
      ? this.#folderSettings.value().manifestConfig
      : undefined;

    return manifestConfig ? generateManifest(manifestConfig) : generateManifest();
  });

  readonly markdownContentUrl = computed(() => {
    const elementName = this.selectedElement();
    if (!elementName) return null;

    const settingsUrl = this.routeSettings().settingsUrl;
    const baseUrl = settingsUrl.endsWith('.json')
      ? settingsUrl.slice(0, settingsUrl.lastIndexOf('/') + 1)
      : this.#ensureTrailingSlash(settingsUrl);

    return `${baseUrl}md/${encodeURIComponent(elementName.toLowerCase())}.md`;
  });

  readonly #markdownContent = httpResource.text(() => this.markdownContentUrl() ?? undefined);

  readonly markdownContent = computed(() =>
    this.#markdownContent.hasValue() ? this.#markdownContent.value() : null,
  );
  readonly loadingMarkdownContent = this.#markdownContent.isLoading;

  clear(): void {
    this.selectedElement.set(null);
  }

  #settingsUrl(settingsUrl: string): string {
    if (settingsUrl.startsWith('https://')) {
      return settingsUrl;
    }

    return `${this.#ensureTrailingSlash(settingsUrl)}settings.json`;
  }

  #ensureTrailingSlash(url: string): string {
    return url.endsWith('/') ? url : `${url}/`;
  }
}
