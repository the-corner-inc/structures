import { Component, computed, inject, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StructuresService } from '@services/structures.service';

@Component({
  selector: 'struct-libraries',
  imports: [
    RouterModule,

    // Forms
    FormsModule,
  ],
  templateUrl: './libraries.component.html',
  styleUrl: './libraries.component.scss',
})
export class LibrariesComponent {
  readonly #structures = inject(StructuresService);

  protected readonly folderStructureUrl = linkedSignal(
    () => this.#structures.routeSettings().settingsUrl,
  );
  protected readonly frameworks = computed(() => this.#structures.routeSettings().frameworks);

  protected setSettingsUrl(url: string): void {
    const settingsUrl = url.trim();
    if (!settingsUrl) return;

    this.folderStructureUrl.set(settingsUrl);
    this.#structures.routeSettings.update((settings) => ({ ...settings, settingsUrl }));
    this.#structures.selectedElement.set(null);
  }
}
