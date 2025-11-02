import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WithSidenavLayout } from '@layouts/with-sidenav/with-sidenav.layout';
import { IssuesSidenavComponent } from './issues-sidenav/issues-sidenav.component';

@Component({
  selector: 'struct-issues-page',
  imports: [
    RouterModule,

    // Layouts
    WithSidenavLayout,

    // Components
    IssuesSidenavComponent,
  ],
  templateUrl: './issues.page.html',
  styleUrl: './issues.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesPage {}
