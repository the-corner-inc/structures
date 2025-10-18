import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { generateManifest } from 'material-icon-theme';
import { FolderSettings, FolderStructure } from './folders';

@Injectable()
export class FoldersService {
  readonly #http = inject(HttpClient);

  $manifest = signal(generateManifest());

  $structureFolders: WritableSignal<FolderStructure[]> = signal([]);

  constructor() {
    this._init();
  }

  private _init() {
    this.#http.get<FolderSettings>('/folders/angular-folders.json').subscribe({
      next: (data) => {
        if (data.manifestConfig) {
          this.$manifest.set(generateManifest(data.manifestConfig));
        }

        if (data.folderStructures.length) {
          this.$structureFolders.set(data.folderStructures);
        }
      },
      error: (err) => {
        console.error('Failed to load structureFolders.json', err);
      },
    });
  }
}
