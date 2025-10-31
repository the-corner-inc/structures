import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidenavEntryClass } from '@bases/sidenav-entry.class';
import { IconNamePipe } from '@pages/folders/folders-sidenav/folder/icon-name.pipe';

@Component({
  selector: 'struct-folder',
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Pipes
    IconNamePipe,
  ],
})
export class FolderComponent extends SidenavEntryClass {
  override _path = '/folders';
}
