import { Component, inject, linkedSignal, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StructuresService } from '@services/structures.service';

@Component({
  selector: 'struct-sidenav-layout',
  imports: [
    // Forms
    FormsModule,
  ],
  templateUrl: './sidenav.layout.html',
  styleUrl: './sidenav.layout.scss',
})
export class SidenavLayout {
  readonly #structures = inject(StructuresService);

  readonly searchQuery = model('');
  protected readonly showSettings = signal(false);
  protected readonly structureFolders = this.#structures.structureFolders;
  protected readonly folderStructureUrl = linkedSignal(
    () => this.#structures.routeSettings().settingsUrl,
  );

  protected setSettingsUrl(url: string): void {
    const settingsUrl = url.trim();
    if (!settingsUrl) return;

    this.#structures.routeSettings.update((settings) => ({ ...settings, settingsUrl }));
    this.#structures.selectedElement.set(null);
  }

  protected toggleSettings(): void {
    this.showSettings.update((visible) => !visible);
  }

  protected downloadSettings(): void {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.structureFolders(), null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'folder-settings.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
