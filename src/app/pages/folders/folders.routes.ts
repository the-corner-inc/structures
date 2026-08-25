import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { StructuresService } from '@services/structures.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/folders/folders.page').then((m) => m.FoldersPage),
    canActivate: [
      () => {
        const structures = inject(StructuresService);

        structures.routeSettings.update((settings) => ({
          ...settings,
          settingsUrl: '/assets/user/',
          frameworks: [
            {
              name: 'Front-End',
              children: [
                { name: 'angular', settingsUrl: '/assets/angular/' },
                { name: 'react', settingsUrl: '/assets/react/', disabled: true },
                { name: 'vue', settingsUrl: '/assets/vue/', disabled: true },
              ],
            },
            {
              name: 'Back-End',
              children: [
                { name: 'go', settingsUrl: '/assets/go/' },
                { name: 'nest.js', settingsUrl: '/assets/nestjs/', disabled: true },
                { name: 'java', settingsUrl: '/assets/java/', disabled: true },
              ],
            },
          ],
        }));
        return true;
      },
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@shared/pages/libraries/libraries.component').then((m) => m.LibrariesComponent),
        canActivate: [
          () => {
            inject(StructuresService).clear();
            return true;
          },
        ],
      },
      {
        path: ':type',
        canActivate: [
          (route) => {
            const structures = inject(StructuresService);

            structures.routeSettings.update((settings) => ({
              ...settings,
              settingsUrl: `/assets/${route.params['type']}/`,
            }));
            structures.selectedElement.set(null);
            return true;
          },
        ],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@pages/folders/markdown/markdown.component').then(
                (m) => m.StructMarkdownComponent,
              ),
          },
          {
            path: ':element',
            loadComponent: () =>
              import('@pages/folders/markdown/markdown.component').then(
                (m) => m.StructMarkdownComponent,
              ),
            canActivate: [
              (route) => {
                inject(StructuresService).selectedElement.set(route.params['element']);
                return true;
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
