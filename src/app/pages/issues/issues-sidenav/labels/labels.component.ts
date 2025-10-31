import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidenavEntryClass } from '@bases/sidenav-entry.class';
import { LabelComponent } from './label/label.component';

@Component({
  selector: 'struct-labels',
  imports: [
    //  Child
    LabelComponent,
  ],
  templateUrl: './labels.component.html',
  styleUrl: './labels.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsComponent extends SidenavEntryClass {
  override _path = '/issues';
}
