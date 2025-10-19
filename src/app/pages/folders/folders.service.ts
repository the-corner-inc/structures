import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { SELECTED_ELEMENT, SELECTED_LIBRARY } from '@bases/base.token';
import { generateManifest } from 'material-icon-theme';
import { FolderSettings, FolderStructure } from './folders';

@Injectable({
  providedIn: 'root',
})
export class FoldersService {
  readonly #library = inject(SELECTED_LIBRARY);
  readonly #selectedElement = inject(SELECTED_ELEMENT);
  readonly #http = inject(HttpClient);

  $markdownContent = signal<string | null>(null);
  $manifest = signal(generateManifest());

  $structureFolders: WritableSignal<FolderStructure[]> = signal([]);

  constructor() {
    this.#selectedElement.subscribe((element) => {
      if (element) this._getMarkdownContent(element?.name);
    });
  }

  public init() {
    this.#http.get<FolderSettings>('/folders/angular/settings.json').subscribe({
      next: (data) => {
        if (data.manifestConfig) {
          this.$manifest.set(generateManifest(data.manifestConfig));
        }

        if (data.folderStructures.length) {
          this.$structureFolders.set(data.folderStructures);
        }
      },
      error: (err) => {
        console.error('Failed to load folder settings', err);
      },
    });
  }

  public clear() {
    this.$markdownContent.set(null);
    this.#library.next('');
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

    this.#http
      .get(
        'https://raw.githubusercontent.com/the-corner-inc/structures/main/public/folders/angular/' +
          fileName.toLocaleLowerCase() +
          '.md',
        { responseType: 'text' },
      )
      .subscribe({
        next: (data) => {
          if (data) this.$markdownContent.set(data || null);
        },
        error: () => {
          this.$markdownContent.set(null);
        },
      });
  }
}
