import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ROUTE_SETTINGS, SELECTED_ELEMENT, SELECTED_LIBRARY } from '@models/tokens';
import { generateManifest } from 'material-icon-theme';
import { FolderSettings, FolderStructure } from '../../pages/folders/folders';

@Injectable({
  providedIn: 'root',
})
export class StructuresService {
  readonly #selectedLibrary = inject(SELECTED_LIBRARY);
  readonly #routeSettings = inject(ROUTE_SETTINGS);
  readonly #selectedElement = inject(SELECTED_ELEMENT);
  readonly #http = inject(HttpClient);

  $markdownContent = signal<string | null>(null);
  $loadingMarkdownContent = signal<boolean>(true);
  $manifest = signal(generateManifest());
  $markdownContentUrl = signal<string | null>(null);

  $structureFolders: WritableSignal<FolderStructure[]> = signal([]);

  constructor() {
    this.#selectedElement.subscribe((element) => {
      if (element) this._getMarkdownContent(element?.name);
    });
  }

  public getFolderSettings() {
    const settingsUrl = this.#routeSettings.getValue().settingsUrl;
    let url = settingsUrl;
    if (!settingsUrl.startsWith('https://')) {
      url = settingsUrl + 'settings.json';
    }

    this.#http.get<FolderSettings>(url).subscribe({
      next: (data) => {
        if (data.manifestConfig) {
          this.$manifest.set(generateManifest(data.manifestConfig));
        }

        if (data.structures?.length) {
          this.$structureFolders.set(data.structures);
          this.#selectedLibrary.next(data.libraryName);
        }
      },
      error: (err) => {
        console.error('Failed to load folder settings', err);

        this.clear();
      },
    });
  }

  public clear() {
    this.$markdownContent.set(null);
    this.#selectedLibrary.next('');
    this.#selectedElement.next(null);
  }

  public getElementByName(name: string): FolderStructure | null {
    let foundElement: FolderStructure | null = null;

    const searchElement = (folders: FolderStructure[]) => {
      for (const folder of folders) {
        if (folder.name === name) {
          foundElement = folder;
          return;
        }

        if (folder.children && folder.children.length > 0) {
          searchElement(folder.children);
        }
      }
    };

    searchElement(this.$structureFolders());

    return foundElement;
  }

  private _getMarkdownContent(fileName: string) {
    if (!fileName) {
      this.$markdownContent.set(null);
      return;
    }

    this.$loadingMarkdownContent.set(true);

    const settingsUrl = this.#routeSettings.getValue().settingsUrl;
    let url: string;
    if (settingsUrl.startsWith('https://')) {
      url = settingsUrl + 'md/' + fileName.toLocaleLowerCase() + '.md.md';
    } else {
      // url = `https://raw.githubusercontent.com/the-corner-inc/structures/main/public${settingsUrl}md/${fileName.toLocaleLowerCase()}.md`;
      url = `http://localhost:4200${settingsUrl}md/${fileName.toLocaleLowerCase()}.md`;
    }

    this.$markdownContentUrl.set(url);
    this.#http.get(url, { responseType: 'text' }).subscribe({
      next: (data) => {
        if (data) this.$markdownContent.set(data || null);

        this.$loadingMarkdownContent.set(false);
      },
      error: () => {
        this.$markdownContent.set(null);

        this.$loadingMarkdownContent.set(false);
      },
    });
  }
}
