import { Pipe, PipeTransform } from '@angular/core';
import { FolderStructure } from './folders';

@Pipe({
  name: 'filterFolders',
})
export class FilterFoldersPipe implements PipeTransform {
  transform(folders: FolderStructure[], search: string): FolderStructure[] {
    if (!search) return folders;
    const lowerSearch = search.toLowerCase();
    return this._filterFolders(folders, lowerSearch);
  }

  private _filterFolders(folders: FolderStructure[], search: string): FolderStructure[] {
    const filtered: FolderStructure[] = [];

    for (const folder of folders) {
      if (this._findMatches(folder, search)) {
        const newFolder: FolderStructure = { ...folder };

        if (folder.children) {
          newFolder.children = this._filterFolders(folder.children, search);
        }

        filtered.push(newFolder);
      }
    }

    return filtered;
  }

  private _findMatches(folder: FolderStructure, search: string): boolean {
    if (folder.name.toLowerCase().includes(search.toLowerCase())) return true;
    else if (folder.children) {
      for (const child of folder.children) {
        if (this._findMatches(child, search)) return true;
      }
    }
    return false;
  }
}
