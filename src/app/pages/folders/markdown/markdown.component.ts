import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { StructuresService } from '@services/structures.service';
import { MarkdownComponent } from 'ngx-markdown';
import { interval, map } from 'rxjs';

@Component({
  selector: 'struct-markdown',
  imports: [
    // Vendors
    MarkdownComponent,
  ],
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
})
export class StructMarkdownComponent {
  readonly #structures = inject(StructuresService);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  protected readonly dots = toSignal(interval(450).pipe(map((i) => ['.', '..', '...'][i % 3])), {
    initialValue: '.',
  });

  protected readonly markdownContent = this.#structures.markdownContent;
  protected readonly codeUrl = this.#structures.markdownContentUrl;
  protected readonly loading = this.#structures.loadingMarkdownContent;

  constructor() {
    effect(() => {
      const folders = this.#structures.structureFolders();
      if (folders.length > 0 && this.#route.snapshot.params['element'] === undefined) {
        this.#router.navigate(['./', folders[0]?.name || 'unknown'], {
          replaceUrl: true,
          relativeTo: this.#route,
        });
      }
    });
  }
}
