import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseClass } from '@bases/base.class';
import { SELECTED_LIBRARY } from '@bases/base.token';
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
  readonly #library = inject(SELECTED_LIBRARY);
  readonly #foldersService = inject(FoldersService);

  $searchQuery = model<string>('');
  $structureFolders = signal<FolderStructure[]>([]);
  $showSettings = signal<boolean>(false);

  ngOnInit(): void {
    // Listen to queryParams and update $structureFolders accordingly

    this.#library.pipe(takeUntil(this._unsubscribe$)).subscribe((name) => {
      console.log('explorer', name);
      if (!name) {
        this.$structureFolders.set([]);
      } else {
        this.$structureFolders.set(this.#foldersService.$structureFolders());
      }
    });
  }
}
