import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IS_PRINT_MODE } from '@models/tokens';
import { ColorSchemeService } from 'ngx-color-scheme';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'struct-root',
  imports: [
    RouterOutlet,

    // Components
    NavbarComponent,
  ],
  providers: [ColorSchemeService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly #colorSchemeService = inject(ColorSchemeService);
  protected readonly isPrintMode = inject(IS_PRINT_MODE).asReadonly();

  constructor() {
    afterNextRender(() => {
      this.#colorSchemeService.init();
    });
  }
}
