import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { availableIconPacks } from 'material-icon-theme';

@Component({
  selector: 'struct-libraries',
  imports: [RouterModule],
  templateUrl: './libraries.component.html',
  styleUrl: './libraries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibrariesComponent {
  languages = availableIconPacks;
}
