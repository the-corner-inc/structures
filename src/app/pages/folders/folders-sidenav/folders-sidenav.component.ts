import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseClass } from '@bases/base.class';
import { FOLDER_SETTINGS, SELECTED_LIBRARY } from '@bases/base.token';
import { SidenavLayout } from '@layouts/sidenav/sidenav.layout';
import { FolderStructure } from '@pages/folders/folders';
import { FoldersService } from '@pages/folders/folders.service';
import { takeUntil } from 'rxjs';
import { FilterFoldersPipe } from './filter-folders.pipe';
import { FolderComponent } from './folder/folder.component';

@Component({
  selector: 'struct-folders-sidenav',
  imports: [
    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Components
    FolderComponent,

    // Layouts
    SidenavLayout,

    // Pipes
    FilterFoldersPipe,
  ],
  templateUrl: './folders-sidenav.component.html',
  styleUrl: './folders-sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersSidenavComponent extends BaseClass implements OnInit {
  readonly #selectedLibrary = inject(SELECTED_LIBRARY);
  readonly #folderSettings = inject(FOLDER_SETTINGS);
  readonly #foldersService = inject(FoldersService);

  $searchQuery = model<string>('');
  $iconThemeUrl = model<string>(this.#folderSettings.getValue().iconBaseUrl);
  $structureFolders = signal<FolderStructure[]>([]);

  ngOnInit(): void {
    this.#selectedLibrary.pipe(takeUntil(this._unsubscribe$)).subscribe((name) => {
      if (!name) {
        this.$structureFolders.set([]);
      } else {
        this.$structureFolders.set(this.#foldersService.$structureFolders());
      }
    });
  }
}
