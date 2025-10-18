import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { BaseClass } from '@bases/base.class';
import { FOLDER_SETTINGS } from '@bases/base.token';
import { MarkdownComponent } from 'ngx-markdown';
import { takeUntil } from 'rxjs';
import { FolderComponent } from './folder/folder.component';
import { FoldersService } from './folders.service';

@Component({
  selector: 'struct-folders',
  imports: [
    CommonModule,

    // Components
    FolderComponent,

    // Vendors
    MarkdownComponent,
  ],
  providers: [FoldersService],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersComponent extends BaseClass implements OnInit {
  readonly #folderSettings = inject(FOLDER_SETTINGS);
  readonly #foldersService = inject(FoldersService);

  iconBaseUrl = this.#folderSettings.getValue().iconBaseUrl;

  $content = signal(this.#folderSettings.getValue().content);
  $markDownContent = this.#foldersService.$markdownContent.asReadonly();
  $structureFolders = this.#foldersService.$structureFolders.asReadonly();

  ngOnInit(): void {
    // const iconPacks: Array<IconPackValue> = availableIconPacks;
    // console.log('Available icon packs:', iconPacks);

    this.#folderSettings.pipe(takeUntil(this._unsubscribe$)).subscribe((settings) => {
      this.$content.set(settings.content);
    });
  }
}
