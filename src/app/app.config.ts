import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FOLDER_SETTINGS, IS_PRINT_MODE, SELECTED_ELEMENT, SELECTED_LIBRARY } from '@models/tokens';
import { FolderStructure } from '@pages/folders/folders';
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
        settingsUrl: '/assets/user/',
        iconBaseUrl: '/material-icon-theme/icons/',
        content: {
          name: 'root',
          type: 'folder',
          children: [],
        },
      }),
    },
    {
      provide: IS_PRINT_MODE,
      useValue: new BehaviorSubject<boolean>(false),
    },
    {
      provide: SELECTED_LIBRARY,
      useValue: new BehaviorSubject<string>(''),
    },
    {
      provide: SELECTED_ELEMENT,
      useValue: new BehaviorSubject<FolderStructure | null>(null),
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
