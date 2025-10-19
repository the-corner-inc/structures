import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { BaseClass } from '@bases/base.class';
import { FOLDER_SETTINGS } from '@bases/base.token';
import { WithSidenavLayout } from '@layouts/with-sidenav/with-sidenav.layout';
import { MarkdownComponent } from 'ngx-markdown';
import { takeUntil } from 'rxjs';
import { FolderComponent } from '../folder/folder.component';
import { FoldersService } from '../folders.service';

@Component({
  selector: 'struct-markdown',
  imports: [
    // Components
    FolderComponent,

    // Layouts
    WithSidenavLayout,

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

  $content = signal(this.#folderSettings.getValue().content);
  $markDownContent = this.#foldersService.$markdownContent.asReadonly();
  $structureFolders = this.#foldersService.$structureFolders.asReadonly();

  ngOnInit(): void {
    this.#folderSettings.pipe(takeUntil(this._unsubscribe$)).subscribe((settings) => {
      this.$content.set(settings.content);
    });
  }
}
