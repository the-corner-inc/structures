import { InjectionToken } from '@angular/core';
import { FolderStructure } from '@pages/folders/folders';
import { BehaviorSubject } from 'rxjs';
import { CoreFolderSettings } from './interface';

export const IS_PRINT_MODE = new InjectionToken<BehaviorSubject<boolean>>('tc.is.print.mode');

export const ROUTE_SETTINGS = new InjectionToken<BehaviorSubject<CoreFolderSettings>>(
  'tc.folder.settings',
);
export const SELECTED_LIBRARY = new InjectionToken<BehaviorSubject<string>>('tc.selected.library');
export const SELECTED_ELEMENT = new InjectionToken<BehaviorSubject<FolderStructure | null>>(
  'tc.selected.element',
);
