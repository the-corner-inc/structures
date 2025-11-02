import { ManifestConfig } from 'material-icon-theme';

export type StructureType = 'container' | 'folder' | 'file';

export interface FolderStructure {
  name: string;
  type: StructureType;
  icon?: string;
  children?: FolderStructure[];
}

export interface FolderSettings {
  libraryName: string;
  manifestConfig: ManifestConfig;
  structures: FolderStructure[];
}
