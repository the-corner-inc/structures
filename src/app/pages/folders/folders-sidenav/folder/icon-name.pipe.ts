import { inject, Pipe, PipeTransform } from '@angular/core';
import { StructureType } from '@pages/folders/folders';
import { StructuresService } from '../../../../core/services/structures.service';

@Pipe({
  name: 'iconName',
})
export class IconNamePipe implements PipeTransform {
  readonly #StructuresService = inject(StructuresService);

  transform(name: string, type: StructureType = 'file', expanded = false): string {
    if (!name) return type === 'folder' ? 'folder.svg' : 'file.svg';
    const manifest = this.#StructuresService.$manifest();
    let iconKey: string | undefined;

    if (type === 'folder') {
      const folderName = name.toLowerCase();
      // Expanded folder support
      if (expanded && manifest.folderNamesExpanded) {
        iconKey =
          manifest.folderNamesExpanded[folderName] ||
          manifest.folderNamesExpanded[folderName.replace(/s$/, '')] ||
          manifest.folderNamesExpanded[folderName.replace(/_/g, '')];
      }
      if (!iconKey && manifest.folderNames) {
        iconKey =
          manifest.folderNames[folderName] ||
          manifest.folderNames[folderName.replace(/s$/, '')] ||
          manifest.folderNames[folderName.replace(/_/g, '')];
      }
      if (!iconKey) {
        iconKey = expanded
          ? (manifest.folderExpanded ?? 'folder-open')
          : (manifest.folder ?? 'folder');
      }
    } else {
      const fileName = name.toLowerCase();
      // Exact file name match
      iconKey = manifest.fileNames?.[fileName];

      // Compound extension match (e.g. .html.vm)
      if (!iconKey && fileName.includes('.')) {
        const parts = fileName.split('.');

        for (let i = 1; i < parts.length; i++) {
          const ext = parts.slice(i).join('.');
          if (manifest.fileExtensions?.[ext]) {
            iconKey = manifest.fileExtensions[ext];
            break;
          }
        }
      }

      // Single extension match
      if (!iconKey) {
        const ext = fileName.split('.').pop();
        if (ext && manifest.fileExtensions?.[ext]) {
          iconKey = manifest.fileExtensions[ext];
        }
      }

      // LanguageId match
      if (!iconKey && manifest.languageIds) {
        const ext = fileName.split('.').pop();
        if (ext && manifest.languageIds[ext]) {
          iconKey = manifest.languageIds[ext];
        }
      }

      // Fallback to default file icon
      if (!iconKey) {
        iconKey = manifest.file ?? 'file';
      }
    }

    // Get icon file name from iconDefinitions
    const iconDef = manifest.iconDefinitions?.[iconKey];
    if (iconDef && iconDef.iconPath) {
      const parts = iconDef.iconPath.split('/');
      return parts[parts.length - 1];
    }
    // Fallback
    return type === 'folder' ? (expanded ? 'folder-open.svg' : 'folder.svg') : 'file.svg';
  }
}
