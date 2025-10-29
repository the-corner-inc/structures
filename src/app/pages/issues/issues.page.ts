import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WithSidenavLayout } from '@layouts/with-sidenav/with-sidenav.layout';
import { IssuesSidenavComponent } from './issues-sidenav/issues-sidenav.component';

@Component({
  selector: 'struct-issues-page',
  imports: [
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
