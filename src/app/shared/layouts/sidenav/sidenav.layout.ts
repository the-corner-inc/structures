import { ChangeDetectionStrategy, Component, effect, inject, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FOLDER_SETTINGS } from '@models/tokens';
import { FolderStructure } from '@pages/folders/folders';
import { StructuresService } from '@services/structures.service';

@Component({
  selector: 'struct-sidenav-layout',
  imports: [
    // Forms
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sidenav.layout.html',
  styleUrl: './sidenav.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavLayout {
  readonly #folderSettings = inject(FOLDER_SETTINGS);
  readonly #StructuresService = inject(StructuresService);

  $searchQuery = model('');

  $showSettings = signal<boolean>(false);
  $structureFolders = signal<FolderStructure[]>([]);

  $folderStructureUrl = model<string>(this.#folderSettings.getValue().settingsUrl);

  constructor() {
    effect(() => {
      if (this.$folderStructureUrl()) {
        this.#folderSettings.next({
          ...this.#folderSettings.getValue(),
          settingsUrl: this.$folderStructureUrl(),
        });

        this.#StructuresService.getFolderSettings();
      }
    });
  }

  downloadSettings() {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.$structureFolders(), null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'folder-settings.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
