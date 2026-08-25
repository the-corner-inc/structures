import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IS_PRINT_MODE } from '@models/tokens';
import { ColorSchemeService } from 'ngx-color-scheme';

@Component({
  selector: 'struct-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly #colorSchemeService = inject(ColorSchemeService);
  protected readonly isPrintMode = inject(IS_PRINT_MODE);
  protected readonly $darkMode = this.#colorSchemeService.$isDarkMode.asReadonly();

  protected toggleScheme(): void {
    this.#colorSchemeService.toggleColorScheme();
  }

  protected togglePrintMode(): void {
    this.isPrintMode.update((isPrintMode) => !isPrintMode);
  }
}
