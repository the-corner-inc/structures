import { ChangeDetectionStrategy, Component, effect, inject, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FOLDER_SETTINGS } from '@bases/base.token';
import { FoldersService } from '../folders.service';
import { LibraryFramework } from './libraries';

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
  readonly #foldersService = inject(FoldersService);

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
        this.#folderSettings.next({
          ...this.#folderSettings.getValue(),
          settingsUrl: this.$folderStructureUrl(),
        });

        this.#foldersService.getFolderSettings();
      }
    });
  }

  setSettingsUrl(framework: LibraryFramework) {
    this.#folderSettings.next({
      ...this.#folderSettings.getValue(),
      settingsUrl: framework.settingsUrl,
    });
  }
}
