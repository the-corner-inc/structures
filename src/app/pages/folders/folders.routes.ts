import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/folders/folders.component').then((m) => m.FoldersComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@pages/folders/libraries/libraries.component').then((m) => m.LibrariesComponent),
      },
      {
        path: ':type',
        loadComponent: () =>
          import('@pages/folders/library/library.component').then((m) => m.LibraryComponent),
        children: [
          {
            path: ':element',
            loadComponent: () =>
              import('@pages/folders/markdown/markdown.component').then(
                (m) => m.StructMarkdownComponent,
              ),
          },
        ],
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
