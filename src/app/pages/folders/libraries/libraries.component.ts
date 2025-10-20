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
    { name: 'Angular', folderUrl: '/assets/angular/settings.json' },
    { name: 'React', folderUrl: '/assets/react/settings.json', disabled: true },
    { name: 'Vue', folderUrl: '/assets/vue/settings.json', disabled: true },
  ];

  backEndFramework = [
    { name: 'go', folderUrl: '/assets/go/settings.json' },
    { name: 'Nest.js', folderUrl: '/assets/nestjs/settings.json', disabled: true },
    { name: 'java', folderUrl: '/assets/java/settings.json', disabled: true },
  ];

  setFolderUrl(framework: LibraryFramework) {
    this.#folderSettings.next({
      ...this.#folderSettings.getValue(),
      folderUrl: framework.folderUrl,
    });
  }
}
