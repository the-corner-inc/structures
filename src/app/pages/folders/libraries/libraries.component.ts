import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FOLDER_SETTINGS } from '@bases/base.token';
import { LibraryFramework } from './libraries';

@Component({
  selector: 'struct-libraries',
  imports: [RouterModule],
  templateUrl: './libraries.component.html',
  styleUrl: './libraries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibrariesComponent {
  readonly #folderSettings = inject(FOLDER_SETTINGS);

  frontEndFramework = [
    { name: 'Angular', settingsUrl: '/assets/angular/' },
    { name: 'React', settingsUrl: '/assets/react/', disabled: true },
    { name: 'Vue', settingsUrl: '/assets/vue/', disabled: true },
  ];

  backEndFramework = [
    { name: 'go', settingsUrl: '/assets/go/' },
    { name: 'Nest.js', settingsUrl: '/assets/nestjs/', disabled: true },
    { name: 'java', settingsUrl: '/assets/java/', disabled: true },
  ];

  setSettingsUrl(framework: LibraryFramework) {
    this.#folderSettings.next({
      ...this.#folderSettings.getValue(),
      settingsUrl: framework.settingsUrl,
    });
  }
}
