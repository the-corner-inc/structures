import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
export class FolderComponent implements OnDestroy {
  readonly #folderSettings = inject(FOLDER_SETTINGS);
  readonly #selectedLibrary = inject(SELECTED_LIBRARY);
  readonly #selectedElement = inject(SELECTED_ELEMENT);

  readonly #router = inject(Router);

  private _mouseMoveTimeout: ReturnType<typeof setTimeout> | null = null;

  iconBaseUrl = this.#folderSettings.getValue().iconBaseUrl;

  @Input({ required: true }) item!: FolderStructure;
  expanded = true;

  ngOnDestroy(): void {
    this._clearMouseMoveTimeout();
  }

  onClick() {
    this.expanded = !this.expanded;
  }

  onMouseMove() {
    this._clearMouseMoveTimeout();

    this._mouseMoveTimeout = setTimeout(() => {
      this._navigate();
    }, 150);
  }

  onMouseLeave() {
    this._clearMouseMoveTimeout();
  }

  private _clearMouseMoveTimeout() {
    if (this._mouseMoveTimeout) {
      clearTimeout(this._mouseMoveTimeout);
      this._mouseMoveTimeout = null;
    }
  }

  private _navigate() {
    this.#selectedElement.next(this.item);

    if (this.#router.url.includes(this.item.name)) return false;

    this.#router.navigate(['/folders', this.#selectedLibrary.getValue(), this.item.name]);
    return true;
  }
}
