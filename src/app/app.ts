import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor() {
    const singleRender = afterNextRender(() => {
      this.#colorSchemeService.init();
      singleRender.destroy();
    });
  }
}
