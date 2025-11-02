import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavContainerClass } from '@bases/sidenav-container.class';
import { SidenavLayout } from '@layouts/sidenav/sidenav.layout';
import { ROUTE_SETTINGS } from '@models/tokens';
import { FilterFoldersPipe } from './filter-folders.pipe';
import { FolderComponent } from './folder/folder.component';

@Component({
  selector: 'struct-folders-sidenav',
  imports: [
    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Components
    FolderComponent,

    // Layouts
    SidenavLayout,

    // Pipes
    FilterFoldersPipe,
  ],
  templateUrl: './folders-sidenav.component.html',
  styleUrl: './folders-sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersSidenavComponent extends SidenavContainerClass {
  readonly #routeSettings = inject(ROUTE_SETTINGS);
  $iconThemeUrl = model<string>(this.#routeSettings.getValue().iconBaseUrl);
}
