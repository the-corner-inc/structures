import { ManifestConfig } from 'material-icon-theme';

export interface FolderStructure {
  name: string;
  type: 'folder' | 'file';
  icon?: string;
  children?: FolderStructure[];
}

export interface FolderSettings {
  libraryName: string;
  manifestConfig: ManifestConfig;
  folderStructures: FolderStructure[];
}
