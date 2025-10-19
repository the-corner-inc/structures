import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FOLDER_SETTINGS } from '@bases/base.token';
import { FolderStructure } from '../folders';
import { IconNamePipe } from '../icon-name.pipe';

@Component({
  selector: 'struct-folder',
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Pipes
    IconNamePipe,
  ],
})
export class FolderComponent {
  public folderSettings = inject(FOLDER_SETTINGS);

  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  iconBaseUrl = this.folderSettings.getValue().iconBaseUrl;

  @Input({ required: true }) item!: FolderStructure;
  expanded = true;

  toggle() {
    this.expanded = !this.expanded;
  }

  setFolderContent() {
    this.folderSettings.next({
      iconBaseUrl: this.iconBaseUrl,
      content: this.item,
    });

    if (!this.#router.url.includes(this.item.name))
      this.#router.navigate(['../', this.item.name], {
        relativeTo: this.#route,
      });
  }
}
