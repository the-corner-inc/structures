import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FOLDER_SETTINGS } from '@bases/base.token';
import { generateManifest } from 'material-icon-theme';
import { FolderSettings, FolderStructure } from './folders';

@Injectable()
export class FoldersService {
  readonly #folderSettings = inject(FOLDER_SETTINGS);
  readonly #http = inject(HttpClient);
  readonly #sanitizer = inject(DomSanitizer);

  $markdownContent = signal<string | null>(null);
  $manifest = signal(generateManifest());

  $structureFolders: WritableSignal<FolderStructure[]> = signal([]);

  constructor() {
    this._init();

    this.#folderSettings.subscribe((settings) => {
      this._getMarkdownContent(settings.content.name);
    });
  }

  private _init() {
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

  private _getMarkdownContent(fileName: string) {
    this.#http
      .get(
        'https://raw.githubusercontent.com/the-corner-inc/structures/main/public/folders/angular/' +
          fileName.toLocaleLowerCase() +
          '.md',
        { responseType: 'text' }
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
