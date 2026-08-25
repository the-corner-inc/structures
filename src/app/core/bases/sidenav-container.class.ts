import { computed, Directive, inject, linkedSignal, signal } from '@angular/core';
import { StructuresService } from '@services/structures.service';

@Directive()
export abstract class SidenavContainerClass {
  readonly #structures = inject(StructuresService);

  protected readonly searchQuery = signal('');
  protected readonly structureFolders = computed(() => this.#structures.structureFolders());
  protected readonly selectedItem = linkedSignal(() => this.structureFolders()[0]);
}
