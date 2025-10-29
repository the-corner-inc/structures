import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WithSidenavLayout } from '@layouts/with-sidenav/with-sidenav.layout';
import { FoldersSidenavComponent } from './folders-sidenav/folders-sidenav.component';

@Component({
  selector: 'struct-folders-page',
  imports: [
    RouterModule,

    // Components
    FoldersSidenavComponent,

    // Layouts
    WithSidenavLayout,
  ],
  templateUrl: './folders.page.html',
  styleUrl: './folders.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersPage {}
