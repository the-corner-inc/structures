import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WithSidenavLayout } from '@layouts/with-sidenav/with-sidenav.layout';

@Component({
  selector: 'struct-issues',
  imports: [WithSidenavLayout],
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesComponent {}
