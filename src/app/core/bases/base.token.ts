import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const FOLDER_SETTINGS = new InjectionToken<
  BehaviorSubject<{
    iconBaseUrl: string;
  }>
>('tc.folder.settings');
