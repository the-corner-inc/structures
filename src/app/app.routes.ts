import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'folders',
    loadChildren: () => import('@pages/folders/folders.routes').then((m) => m.routes),
  },
  {
    path: 'issues',
    loadChildren: () => import('@pages/issues/issues.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: 'folders',
  },
];
