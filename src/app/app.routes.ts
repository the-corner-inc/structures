import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'folders',
    loadComponent: () => import('@pages/folders/folders.component').then((m) => m.FoldersComponent),
  },
  {
    path: 'folders/:id',
    loadComponent: () => import('@pages/folders/folders.component').then((m) => m.FoldersComponent),
  },
  {
    path: 'issues',
    loadComponent: () => import('@pages/issues/issues.component').then((m) => m.IssuesComponent),
  },
  {
    path: '**',
    redirectTo: 'folders',
  },
];
