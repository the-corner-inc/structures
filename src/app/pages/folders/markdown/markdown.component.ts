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
import { ActivatedRoute, Router } from '@angular/router';
import { BaseClass } from '@bases/base.class';
import { FOLDER_SETTINGS } from '@bases/base.token';
import { WithSidenavLayout } from '@layouts/with-sidenav/with-sidenav.layout';
import { MarkdownComponent } from 'ngx-markdown';
import { takeUntil } from 'rxjs';
import { FilterFoldersPipe } from '../filter-folders.pipe';
import { FolderComponent } from '../folder/folder.component';
import { FoldersService } from '../folders.service';

@Component({
  selector: 'struct-markdown',
  imports: [
    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Components
    FolderComponent,

    // Layouts
    WithSidenavLayout,

    // Pipes
    FilterFoldersPipe,

    // Vendors
    MarkdownComponent,
  ],
  templateUrl: './markdown.component.html',
  styleUrl: './markdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructMarkdownComponent extends BaseClass implements OnInit {
  readonly #folderSettings = inject(FOLDER_SETTINGS);
  readonly #foldersService = inject(FoldersService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  $content = signal(this.#folderSettings.getValue().content);
  $markDownContent = this.#foldersService.$markdownContent.asReadonly();
  $structureFolders = this.#foldersService.$structureFolders.asReadonly();
  $searchQuery = model<string>('');

  constructor() {
    super();

    effect(() => {
      if (
        this.#foldersService.$structureFolders().length > 0 &&
        this.#route.snapshot.params['element'] === undefined
      ) {
        this.#router.navigate(
          ['./', this.#foldersService.$structureFolders()[0]?.name || 'unknown'],
          {
            replaceUrl: true,
            relativeTo: this.#route,
          },
        );
      }
    });
  }

  ngOnInit(): void {
    this.#folderSettings.pipe(takeUntil(this._unsubscribe$)).subscribe((settings) => {
      this.$content.set(settings.content);
    });
  }
}
