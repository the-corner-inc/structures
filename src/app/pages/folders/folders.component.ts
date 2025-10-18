import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { BaseClass } from '@bases/base.class';
import { FOLDER_SETTINGS } from '@bases/base.token';
import { takeUntil } from 'rxjs';
import { FolderComponent } from './folder/folder.component';
import { FolderStructure } from './folders';

@Component({
  selector: 'struct-folders',
  imports: [CommonModule, FolderComponent],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersComponent extends BaseClass implements OnInit {
  #folderSettings = inject(FOLDER_SETTINGS);
  $content = signal(this.#folderSettings.getValue().content);

  iconBaseUrl = this.#folderSettings.getValue().iconBaseUrl;

  structureFolders: FolderStructure[] = [
    {
      name: 'src',
      type: 'folder',
      icon: 'folder-src.svg',
      children: [
        {
          name: 'app',
          type: 'folder',
          icon: 'folder-app.svg',
          children: [
            {
              name: 'core',
              type: 'folder',
              icon: 'folder-core.svg',
              children: [
                { name: 'guards', type: 'folder', icon: 'folder-guard.svg' },
                { name: 'interceptors', type: 'folder', icon: 'folder-interceptor.svg' },
                { name: 'models', type: 'folder', icon: 'folder-class.svg' },
                { name: 'services', type: 'folder', icon: 'folder-controller.svg' },
                { name: 'utils', type: 'folder', icon: 'folder-utils.svg' },
                { name: 'core.module.ts', type: 'file', icon: 'typescript.svg' },
              ],
            },
            {
              name: 'shared',
              type: 'folder',
              icon: 'folder-shared.svg',
              children: [
                { name: 'components', type: 'folder', icon: 'folder-components.svg' },
                { name: 'directives', type: 'folder', icon: 'folder-directive.svg' },
                { name: 'pipes', type: 'folder', icon: 'folder-pipe.svg' },
                { name: 'shared.module.ts', type: 'file', icon: 'typescript.svg' },
              ],
            },
            {
              name: 'features',
              type: 'folder',
              children: [
                {
                  name: 'auth',
                  type: 'folder',
                  icon: 'folder-secure.svg',
                  children: [
                    { name: 'auth.component.ts', type: 'file', icon: 'typescript.svg' },
                    { name: 'auth.service.ts', type: 'file', icon: 'typescript.svg' },
                  ],
                },
                {
                  name: 'dashboard',
                  type: 'folder',
                  icon: 'folder.svg',
                  children: [
                    { name: 'dashboard.component.ts', type: 'file', icon: 'typescript.svg' },
                  ],
                },
              ],
            },
            { name: 'app.module.ts', type: 'file', icon: 'typescript.svg' },
            { name: 'app.component.ts', type: 'file', icon: 'typescript.svg' },
            { name: 'app.component.html', type: 'file', icon: 'html.svg' },
            { name: 'app.component.scss', type: 'file', icon: 'sass.svg' },
          ],
        },
        { name: 'assets', type: 'folder', icon: 'folder-resource.svg' },
        { name: 'environments', type: 'folder', icon: 'folder-environment.svg' },
        { name: 'index.html', type: 'file', icon: 'html.svg' },
        { name: 'main.ts', type: 'file', icon: 'typescript.svg' },
        { name: 'styles.scss', type: 'file', icon: 'sass.svg' },
      ],
    },
    { name: 'angular.json', type: 'file', icon: 'angular.svg' },
    { name: 'package.json', type: 'file', icon: 'nodejs.svg' },
    { name: 'tsconfig.json', type: 'file', icon: 'json.svg' },
  ];

  ngOnInit(): void {
    this.#folderSettings.pipe(takeUntil(this._unsubscribe$)).subscribe((settings) => {
      this.$content.set(settings.content);
    });
  }
}
