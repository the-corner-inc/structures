import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FoldersService } from '../folders.service';

@Component({
  selector: 'struct-library',
  imports: [RouterModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent {
  #foldersService = inject(FoldersService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      if (this.#foldersService.$structureFolders().length > 0) {
        this.#router.navigate(
          ['./', this.#foldersService.$structureFolders()[0]?.name || 'unknown'],
          {
            replaceUrl: true,
            relativeTo: this.#route,
          },
        );
      }
    });
  }
}
