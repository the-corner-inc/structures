import { InjectionToken } from '@angular/core';
import { FolderStructure } from '@pages/folders/folders';
import { BehaviorSubject } from 'rxjs';

export interface FolderSettings {
  iconBaseUrl: string;
  content: FolderContent;
}

export interface FolderContent extends FolderStructure {
  // @TODO: add content
}

export const FOLDER_SETTINGS = new InjectionToken<BehaviorSubject<FolderSettings>>(
  'tc.folder.settings'
);
