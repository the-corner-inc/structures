import { Component, signal } from '@angular/core';

@Component({
  selector: 'struct-with-sidenav-layout',
  templateUrl: './with-sidenav.layout.html',
  styleUrl: './with-sidenav.layout.scss',
})
export class WithSidenavLayout {
  protected readonly minimized = signal(false);

  protected toggleMinimized(): void {
    this.minimized.update((minimized) => !minimized);
  }
}
