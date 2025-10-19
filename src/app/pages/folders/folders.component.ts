import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WithSidenavLayout } from '@layouts/with-sidenav/with-sidenav.layout';
import { ExplorerComponent } from './explorer/explorer.component';

@Component({
  selector: 'struct-folders',
  imports: [
    RouterModule,

    // Components
    ExplorerComponent,

    // Layouts
    WithSidenavLayout,
  ],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersComponent {}
