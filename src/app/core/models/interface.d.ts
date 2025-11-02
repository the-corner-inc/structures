export interface CoreFolderSettings {
  settingsUrl: string;
  iconBaseUrl: string;
  frameworks: FrameworkContainer[];
  content: FolderStructure;
}

export interface FrameworkContainer {
  name: string;
  children: FrameworkEntry[];
}

export interface FrameworkEntry {
  name: string;
  settingsUrl: string;
  disabled?: boolean;
}
