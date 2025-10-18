import { ManifestConfig } from 'material-icon-theme';

export type FolderStructure = {
  name: string;
  type: 'folder' | 'file';
  icon?: string;
  children?: FolderStructure[];
};

export type FolderSettings = {
  manifestConfig: ManifestConfig;
  folderStructures: FolderStructure[];
};
