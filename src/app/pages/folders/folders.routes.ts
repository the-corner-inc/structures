import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/folders/folders.component').then((m) => m.FoldersComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@pages/folders/markdown/markdown.component').then(
            (m) => m.StructMarkdownComponent,
          ),
      },
      {
        path: ':type',
        loadComponent: () =>
          import('@pages/folders/library/library.component').then((m) => m.LibraryComponent),
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
