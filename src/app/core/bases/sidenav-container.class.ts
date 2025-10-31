import { Directive, inject, model, OnInit, signal } from '@angular/core';
import { SELECTED_LIBRARY } from '@models/tokens';
import { FolderStructure } from '@pages/folders/folders';
import { StructuresService } from '@services/structures.service';
import { takeUntil } from 'rxjs';
import { BaseClass } from './base.class';

@Directive()
export abstract class SidenavContainerClass extends BaseClass implements OnInit {
  readonly #selectedLibrary = inject(SELECTED_LIBRARY);
  readonly #StructuresService = inject(StructuresService);

  $searchQuery = model<string>('');
  $structureFolders = signal<FolderStructure[]>([]);

  ngOnInit(): void {
    this.#selectedLibrary.pipe(takeUntil(this._unsubscribe$)).subscribe((name) => {
      if (!name) {
        this.$structureFolders.set([]);
      } else {
        this.$structureFolders.set(this.#StructuresService.$structureFolders());
      }
    });
  }
}
