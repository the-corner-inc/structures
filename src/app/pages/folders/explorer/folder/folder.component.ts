import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FOLDER_SETTINGS, SELECTED_ELEMENT, SELECTED_LIBRARY } from '@bases/base.token';
import { IconNamePipe } from '@pages/folders/explorer/folder/icon-name.pipe';
import { FolderStructure } from '@pages/folders/folders';

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
  readonly #folderSettings = inject(FOLDER_SETTINGS);
  readonly #selectedLibrary = inject(SELECTED_LIBRARY);
  readonly #selectedElement = inject(SELECTED_ELEMENT);

  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  iconBaseUrl = this.#folderSettings.getValue().iconBaseUrl;

  @Input({ required: true }) item!: FolderStructure;
  expanded = true;

  toggle() {
    this.expanded = !this.expanded;
  }

  setFolderContent() {
    this.#selectedElement.next(this.item);

    if (!this.#router.url.includes(this.item.name))
      this.#router.navigate(['../', this.#selectedLibrary.getValue(), this.item.name], {
        relativeTo: this.#route.children[0],
      });
  }
}
