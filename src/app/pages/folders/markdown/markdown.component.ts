import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseClass } from '@bases/base.class';
import { SELECTED_ELEMENT } from '@bases/base.token';
import { MarkdownComponent } from 'ngx-markdown';
import { takeUntil } from 'rxjs';
import { FoldersService } from '../folders.service';

@Component({
  selector: 'struct-markdown',
  imports: [
    // Vendors
    MarkdownComponent,
  ],
  templateUrl: './markdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructMarkdownComponent extends BaseClass implements OnInit {
  readonly #selectedElement = inject(SELECTED_ELEMENT);
  readonly #foldersService = inject(FoldersService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  $content = signal(this.#selectedElement.getValue());
  $markDownContent = this.#foldersService.$markdownContent.asReadonly();
  $loading = this.#foldersService.$loadingMarkdownContent.asReadonly();

  constructor() {
    super();

    effect(() => {
      if (this.#route.snapshot.params['element']) {
        // Note: could maybe done on in a routing level
        this.#selectedElement.next(
          this.#foldersService.getElementByName(this.#route.snapshot.params['element']),
        );
      } else if (
        this.#foldersService.$structureFolders().length > 0 &&
        this.#route.snapshot.params['element'] === undefined
      ) {
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

  ngOnInit(): void {
    this.#selectedElement.pipe(takeUntil(this._unsubscribe$)).subscribe((element) => {
      this.$content.set(element);
    });
  }
}
