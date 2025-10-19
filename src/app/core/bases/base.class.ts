import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseClass implements OnDestroy {
  protected _unsubscribe$ = new Subject<void>();

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this._extendedDestroy();
  }

  protected _extendedDestroy() {
    // @see children
  }
}
