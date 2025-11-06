import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ROUTE_SETTINGS, SELECTED_ELEMENT, SELECTED_LIBRARY } from '@models/tokens';
import { StructuresService } from '@services/structures.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/issues/issues.page').then((m) => m.IssuesPage),
    canActivate: [
      () => {
        const routeSettings = inject(ROUTE_SETTINGS);

        routeSettings.next({
          ...routeSettings.getValue(),
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
        });
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
            const structuresService = inject(StructuresService);

            structuresService.clear();
            return true;
          },
        ],
      },
      {
        path: ':type',
        canActivate: [
          (route) => {
            const structuresService = inject(StructuresService);
            const selectedLibrary = inject(SELECTED_LIBRARY);
            const folderSettings = inject(ROUTE_SETTINGS);

            folderSettings.next({
              ...folderSettings.getValue(),
              settingsUrl: `/assets/${route.params['type']}/`,
              content: {
                name: 'root',
                type: 'folder',
                children: [],
              },
            });
            selectedLibrary.next(route.params['type']);

            structuresService.getFolderSettings();
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
                const selectedElement = inject(SELECTED_ELEMENT);

                selectedElement.next(route.params['element']);
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
