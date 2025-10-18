import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FOLDER_SETTINGS } from '@bases/base.token';
import { FolderStructure } from '../folders';
import { IconNamePipe } from '../icon-name.pipe';

@Component({
  selector: 'struct-folder',
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,

    // Pipes
    IconNamePipe,
  ],
})
export class FolderComponent {
  public folderSettings = inject(FOLDER_SETTINGS);

  iconBaseUrl = this.folderSettings.getValue().iconBaseUrl;

  @Input({ required: true }) item!: FolderStructure;
  expanded = true;

  toggle() {
    this.expanded = !this.expanded;
  }

  setFolderContent() {
    this.folderSettings.next({
      iconBaseUrl: this.iconBaseUrl,
      content: this.item,
    });
  }
}
