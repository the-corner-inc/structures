import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { StructuresService } from '@services/structures.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/issues/issues.page').then((m) => m.IssuesPage),
    canActivate: [
      () => {
        const structures = inject(StructuresService);

        structures.routeSettings.update((settings) => ({
          ...settings,
          settingsUrl: '/assets/unknown/',
          frameworks: [
            {
              name: 'Projects',
              children: [
                { name: 'Software', settingsUrl: '/assets/software/' },
                { name: 'Unknown', settingsUrl: '/assets/software/', disabled: true },
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
