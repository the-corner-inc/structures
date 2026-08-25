import { InjectionToken, signal, WritableSignal } from '@angular/core';

export const IS_PRINT_MODE = new InjectionToken<WritableSignal<boolean>>('tc.is.print.mode', {
  providedIn: 'root',
  factory: () => signal(false),
});
