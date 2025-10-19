import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'struct-issues',
  imports: [],
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesComponent {}
