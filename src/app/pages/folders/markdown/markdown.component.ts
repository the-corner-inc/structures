import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseClass } from '@bases/base.class';
import { SELECTED_ELEMENT } from '@models/tokens';
import { MarkdownComponent } from 'ngx-markdown';
import { interval, map, takeUntil } from 'rxjs';
import { StructuresService } from '../../../core/services/structures.service';

@Component({
  selector: 'struct-markdown',
  imports: [
    // Pipes
    AsyncPipe,

    // Vendors
    MarkdownComponent,
  ],
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructMarkdownComponent extends BaseClass {
  readonly #selectedElement = inject(SELECTED_ELEMENT);
  readonly #StructuresService = inject(StructuresService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  dots$ = interval(450).pipe(
    takeUntil(this._unsubscribe$),
    map((i) => ['.', '..', '...'][i % 3]),
  );

  $markDownContent = this.#StructuresService.$markdownContent.asReadonly();
  $codeUrl = this.#StructuresService.$markdownContentUrl.asReadonly();
  $loading = this.#StructuresService.$loadingMarkdownContent.asReadonly();

  $showCode = signal(false);

  constructor() {
    super();

    effect(() => {
      if (this.#route.snapshot.params['element']) {
        // Note: could maybe done on in a routing level
        this.#selectedElement.next(
          this.#StructuresService.getElementByName(this.#route.snapshot.params['element']),
        );
      } else if (
        this.#StructuresService.$structureFolders().length > 0 &&
        this.#route.snapshot.params['element'] === undefined
      ) {
        this.#router.navigate(
          ['./', this.#StructuresService.$structureFolders()[0]?.name || 'unknown'],
          {
            replaceUrl: true,
            relativeTo: this.#route,
          },
        );
      }
    });
  }
}
