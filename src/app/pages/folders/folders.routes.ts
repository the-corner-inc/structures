import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { SELECTED_ELEMENT, SELECTED_LIBRARY } from '@bases/base.token';
import { FoldersService } from './folders.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/folders/folders.component').then((m) => m.FoldersComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@pages/folders/libraries/libraries.component').then((m) => m.LibrariesComponent),
        canActivate: [
          () => {
            const foldersService = inject(FoldersService);

            foldersService.clear();
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
            const foldersService = inject(FoldersService);
            const library = inject(SELECTED_LIBRARY);

            foldersService.init();

            library.next(route.params['type']);
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
                const element = inject(SELECTED_ELEMENT);

                element.next(route.params['element']);
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
