import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { FOLDER_SETTINGS, SELECTED_ELEMENT, SELECTED_LIBRARY } from '@models/tokens';
import { StructuresService } from '@services/structures.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/folders/folders.page').then((m) => m.FoldersPage),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@pages/folders/libraries/libraries.component').then((m) => m.LibrariesComponent),
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
        loadComponent: () =>
          import('@pages/folders/library/library.component').then((m) => m.LibraryComponent),
        canActivate: [
          (route) => {
            const structuresService = inject(StructuresService);
            const selectedLibrary = inject(SELECTED_LIBRARY);
            const folderSettings = inject(FOLDER_SETTINGS);

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
