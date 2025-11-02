import { ChangeDetectionStrategy, Component, effect, inject, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROUTE_SETTINGS } from '@models/tokens';
import { StructuresService } from '../../../core/services/structures.service';

@Component({
  selector: 'struct-libraries',
  imports: [
    RouterModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './libraries.component.html',
  styleUrl: './libraries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibrariesComponent {
  readonly #routeSettings = inject(ROUTE_SETTINGS);
  readonly #StructuresService = inject(StructuresService);

  $folderStructureUrl = model<string>(this.#routeSettings.getValue().settingsUrl);
  frameworks = this.#routeSettings.getValue().frameworks;

  constructor() {
    effect(() => {
      if (this.$folderStructureUrl()) {
        this.setSettingsUrl(this.$folderStructureUrl());
      }
    });
  }

  setSettingsUrl(url: string) {
    this.#routeSettings.next({
      ...this.#routeSettings.getValue(),
      settingsUrl: url,
    });

    this.#StructuresService.getFolderSettings();
  }
}
