import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidenavEntryClass } from '@bases/sidenav-entry.class';

@Component({
  selector: 'struct-label',
  imports: [],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent extends SidenavEntryClass {
  override _path = '/issues';
}
