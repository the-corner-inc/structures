import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'struct-with-sidenav-layout',
  imports: [],
  templateUrl: './with-sidenav.layout.html',
  styleUrl: './with-sidenav.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithSidenavLayout {}
