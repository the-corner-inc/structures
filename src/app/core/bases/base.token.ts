import { InjectionToken } from '@angular/core';
import { FolderStructure } from '@pages/folders/folders';
import { BehaviorSubject } from 'rxjs';

export interface FolderSettings {
  settingsUrl: string;
  iconBaseUrl: string;
  content: FolderStructure;
}

export const IS_PRINT_MODE = new InjectionToken<BehaviorSubject<boolean>>('tc.is.print.mode');

export const FOLDER_SETTINGS = new InjectionToken<BehaviorSubject<FolderSettings>>(
  'tc.folder.settings',
);
export const SELECTED_LIBRARY = new InjectionToken<BehaviorSubject<string>>('tc.selected.library');
export const SELECTED_ELEMENT = new InjectionToken<BehaviorSubject<FolderStructure | null>>(
  'tc.selected.element',
);
