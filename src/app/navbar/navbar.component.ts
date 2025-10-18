import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorSchemeService } from 'ngx-color-scheme';

@Component({
  selector: 'struct-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly #colorSchemeService = inject(ColorSchemeService);

  readonly $darkMode = this.#colorSchemeService.$isDarkMode.asReadonly();

  toggleScheme(): void {
    this.#colorSchemeService.toggleColorScheme();
  }
}
