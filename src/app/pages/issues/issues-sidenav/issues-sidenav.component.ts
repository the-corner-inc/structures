import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidenavContainerClass } from '@bases/sidenav-container.class';
import { SidenavLayout } from '@layouts/sidenav/sidenav.layout';

@Component({
  selector: 'struct-issues-sidenav',
  imports: [
    // Layouts
    SidenavLayout,
  ],
  templateUrl: './issues-sidenav.component.html',
  styleUrl: './issues-sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesSidenavComponent extends SidenavContainerClass {}
