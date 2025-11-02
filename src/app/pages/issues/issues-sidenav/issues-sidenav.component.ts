import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidenavContainerClass } from '@bases/sidenav-container.class';
import { SidenavLayout } from '@layouts/sidenav/sidenav.layout';
import { FilterFoldersPipe } from '@pages/folders/folders-sidenav/filter-folders.pipe';
import { LabelsComponent } from './labels/labels.component';

@Component({
  selector: 'struct-issues-sidenav',
  imports: [
    // Pipes
    LabelsComponent,

    // Layouts
    SidenavLayout,

    // Pipes
    FilterFoldersPipe,
  ],
  templateUrl: './issues-sidenav.component.html',
  styleUrl: './issues-sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesSidenavComponent extends SidenavContainerClass {}
