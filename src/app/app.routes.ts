import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'folders',
    loadChildren: () => import('@pages/folders/folders.routes').then((m) => m.routes),
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
