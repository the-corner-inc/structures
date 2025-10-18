import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FOLDER_SETTINGS } from '@bases/base.token';
import { COLOR_SCHEME_OPTIONS } from 'ngx-color-scheme';
import { provideMarkdown } from 'ngx-markdown';
import { BehaviorSubject } from 'rxjs';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    {
      provide: FOLDER_SETTINGS,
      useValue: new BehaviorSubject({
        iconBaseUrl: '/public/material-icon-theme/icons/',
        content: {
          name: 'root',
          type: 'folder',
          children: [],
        },
      }),
    },

    // Vendors
    provideMarkdown(),

    {
      provide: COLOR_SCHEME_OPTIONS,
      useValue: {
        darkModeClass: 'dark',
        lightModeClass: 'light',
      },
    },
  ],
};
