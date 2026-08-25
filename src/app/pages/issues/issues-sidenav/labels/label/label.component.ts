import { Component } from '@angular/core';
import { SidenavEntryClass } from '@bases/sidenav-entry.class';

@Component({
  selector: 'struct-label',
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
})
export class LabelComponent extends SidenavEntryClass {
  override _path = '/issues';
}
