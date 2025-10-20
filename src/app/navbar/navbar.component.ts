import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseClass } from '@bases/base.class';
import { IS_PRINT_MODE } from '@bases/base.token';
import { ColorSchemeService } from 'ngx-color-scheme';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'struct-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent extends BaseClass implements OnInit {
  readonly #colorSchemeService = inject(ColorSchemeService);
  isPrintMode = inject(IS_PRINT_MODE);

  readonly $darkMode = this.#colorSchemeService.$isDarkMode.asReadonly();

  isPrintMode$ = signal<boolean>(false);

  toggleScheme(): void {
    this.#colorSchemeService.toggleColorScheme();
  }

  ngOnInit(): void {
    this.isPrintMode.pipe(takeUntil(this._unsubscribe$)).subscribe((bool) => {
      this.isPrintMode$.set(bool);
    });
  }
}
