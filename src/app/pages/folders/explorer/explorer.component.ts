import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseClass } from '@bases/base.class';
import { FOLDER_SETTINGS, SELECTED_LIBRARY } from '@bases/base.token';
import { FolderStructure } from '@pages/folders/folders';
import { FoldersService } from '@pages/folders/folders.service';
import { takeUntil } from 'rxjs';
import { FilterFoldersPipe } from './filter-folders.pipe';
import { FolderComponent } from './folder/folder.component';

@Component({
  selector: 'struct-explorer',
  imports: [
    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Components
    FolderComponent,

    // Pipes
    FilterFoldersPipe,
  ],
  templateUrl: './explorer.component.html',
  styleUrl: './explorer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplorerComponent extends BaseClass implements OnInit {
  readonly #selectedLibrary = inject(SELECTED_LIBRARY);
  readonly #folderSettings = inject(FOLDER_SETTINGS);
  readonly #foldersService = inject(FoldersService);

  $searchQuery = model<string>('');
  $folderStructureUrl = model<string>(this.#folderSettings.getValue().settingsUrl);
  $structureFolders = signal<FolderStructure[]>([]);
  $showSettings = signal<boolean>(false);

  constructor() {
    super();

    effect(() => {
      if (this.$folderStructureUrl()) {
        this.#folderSettings.next({
          ...this.#folderSettings.getValue(),
          settingsUrl: this.$folderStructureUrl(),
        });

        this.#foldersService.getFolderSettings();
      }
    });
  }

  ngOnInit(): void {
    this.#selectedLibrary.pipe(takeUntil(this._unsubscribe$)).subscribe((name) => {
      if (!name) {
        this.$structureFolders.set([]);
      } else {
        this.$structureFolders.set(this.#foldersService.$structureFolders());
      }
    });
  }

  downloadSettings() {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.$structureFolders(), null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'folder-settings.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
