import { InjectionToken } from '@angular/core';
import { FolderStructure } from '@pages/folders/folders';
import { BehaviorSubject } from 'rxjs';

export interface FolderSettings {
  iconBaseUrl: string;
  content: FolderStructure;
}

export const FOLDER_SETTINGS = new InjectionToken<BehaviorSubject<FolderSettings>>(
  'tc.folder.settings',
);
