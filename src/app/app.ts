import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IS_PRINT_MODE } from '@bases/base.token';
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
  isPrintMode = inject(IS_PRINT_MODE);

  isPrintMode$ = signal<boolean>(false);

  constructor() {
    const singleRender = afterNextRender(() => {
      this.#colorSchemeService.init();
      singleRender.destroy();
    });

    this.isPrintMode.subscribe((bool) => {
      this.isPrintMode$.set(bool);
    });
  }
}
