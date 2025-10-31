import { ChangeDetectionStrategy, Component, effect, inject, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FOLDER_SETTINGS } from '@models/tokens';
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
  readonly #folderSettings = inject(FOLDER_SETTINGS);
  readonly #StructuresService = inject(StructuresService);

  $folderStructureUrl = model<string>(this.#folderSettings.getValue().settingsUrl);

  frontEndFramework = [
    { name: 'angular', settingsUrl: '/assets/angular/' },
    { name: 'react', settingsUrl: '/assets/react/', disabled: true },
    { name: 'vue', settingsUrl: '/assets/vue/', disabled: true },
  ];

  backEndFramework = [
    { name: 'go', settingsUrl: '/assets/go/' },
    { name: 'nest.js', settingsUrl: '/assets/nestjs/', disabled: true },
    { name: 'java', settingsUrl: '/assets/java/', disabled: true },
  ];

  constructor() {
    effect(() => {
      if (this.$folderStructureUrl()) {
        this.setSettingsUrl(this.$folderStructureUrl());
      }
    });
  }

  setSettingsUrl(url: string) {
    this.#folderSettings.next({
      ...this.#folderSettings.getValue(),
      settingsUrl: url,
    });

    this.#StructuresService.getFolderSettings();
  }
}
