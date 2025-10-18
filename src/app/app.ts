import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,

    // Components
    NavbarComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
