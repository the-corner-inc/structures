import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FOLDER_SETTINGS } from '@bases/base.token';
import { BehaviorSubject } from 'rxjs';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    {
      provide: FOLDER_SETTINGS,
      useValue: new BehaviorSubject({
        iconBaseUrl:
          'https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/icons/',
      }),
    },
  ],
};
