export type FolderStructure = {
  name: string;
  type: 'folder' | 'file';
  icon?: string;
  children?: FolderStructure[];
};
