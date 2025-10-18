import { inject, Pipe, PipeTransform } from '@angular/core';
import { FoldersService } from './folders.service';

@Pipe({
  name: 'iconName',
})
export class IconNamePipe implements PipeTransform {
  readonly #foldersService = inject(FoldersService);

  transform(name?: string, type: 'file' | 'folder' = 'file'): string {
    if (!name) return 'file.svg';
    const manifest = this.#foldersService.$manifest();
    let iconKey: string | undefined;

    if (type === 'folder') {
      const folderName = name.toLowerCase();
      iconKey =
        manifest.folderNames?.[folderName] || manifest.folderNames?.[folderName.replace(/s$/, '')];

      if (!iconKey) {
        iconKey = manifest.folder ?? 'folder';
      }
    } else {
      const fileName = name.toLowerCase();
      const ext = name.split('.').pop()?.toLowerCase();
      // Exact file name match
      iconKey = manifest.fileNames?.[fileName];
      // Extension match
      if (!iconKey && ext) {
        iconKey = manifest.fileExtensions?.[ext];
      }
      if (!iconKey) {
        iconKey = manifest.file ?? 'file';
      }
    }

    // Get icon file name from iconDefinitions
    const iconDef = manifest.iconDefinitions?.[iconKey];
    if (iconDef && iconDef.iconPath) {
      // Only return the file name, not the path
      const parts = iconDef.iconPath.split('/');
      return parts[parts.length - 1];
    }
    // Fallback
    return type === 'folder' ? 'folder.svg' : 'file.svg';
  }
}
