import { afterNextRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorSchemeService } from 'ngx-color-scheme';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
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
  constructor(private _colorSchemeService: ColorSchemeService) {
    const singleRender = afterNextRender(() => {
      this._colorSchemeService.init();
      singleRender.destroy();
    });
  }
}
