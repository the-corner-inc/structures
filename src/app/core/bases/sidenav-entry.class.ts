import { computed, Directive, inject, input, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FolderStructure } from '@models/structure.model';
import { StructuresService } from '@services/structures.service';

@Directive()
export abstract class SidenavEntryClass implements OnDestroy {
  readonly #router = inject(Router);
  readonly #structures = inject(StructuresService);

  protected _path!: string;

  private _mouseMoveTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly item = input.required<FolderStructure>();
  protected readonly iconBaseUrl = computed(() => this.#structures.routeSettings().iconBaseUrl);
  protected readonly expanded = signal(true);

  ngOnDestroy(): void {
    this._clearMouseMoveTimeout();
  }

  protected onClick(): void {
    this.expanded.update((expanded) => !expanded);
  }

  protected onMouseMove(): void {
    this._clearMouseMoveTimeout();

    this._mouseMoveTimeout = setTimeout(() => {
      this._navigate();
    }, 80);
  }

  protected onMouseLeave(): void {
    this._clearMouseMoveTimeout();
  }

  private _clearMouseMoveTimeout() {
    if (this._mouseMoveTimeout) {
      clearTimeout(this._mouseMoveTimeout);
      this._mouseMoveTimeout = null;
    }
  }

  private _navigate() {
    const itemName = this.item().name;
    this.#structures.selectedElement.set(itemName);

    if (this.#router.url.includes(itemName)) return false;

    this.#router.navigate([this._path, this.#structures.libraryName(), itemName]);
    return true;
  }
}
