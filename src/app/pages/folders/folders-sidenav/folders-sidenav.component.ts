import { Component, computed, inject } from '@angular/core';
import { SidenavContainerClass } from '@bases/sidenav-container.class';
import { SidenavLayout } from '@layouts/sidenav/sidenav.layout';
import { StructuresService } from '@services/structures.service';
import { FilterFoldersPipe } from './filter-folders.pipe';
import { FolderComponent } from './folder/folder.component';

@Component({
  selector: 'struct-folders-sidenav',
  imports: [
    // Components
    FolderComponent,

    // Layouts
    SidenavLayout,

    // Pipes
    FilterFoldersPipe,
  ],
  templateUrl: './folders-sidenav.component.html',
  styleUrl: './folders-sidenav.component.scss',
})
export class FoldersSidenavComponent extends SidenavContainerClass {
  readonly #structures = inject(StructuresService);
  protected readonly iconThemeUrl = computed(() => this.#structures.routeSettings().iconBaseUrl);
}
