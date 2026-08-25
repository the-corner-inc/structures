import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_VERSION } from '@models/app-version';
import { StructuresService } from '@services/structures.service';
import { SidenavLayout } from './sidenav.layout';

describe('SidenavLayout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StructuresService,
          useValue: {
            routeSettings: signal({
              settingsUrl: '/assets/user/',
              iconBaseUrl: '/material-icon-theme/icons/',
              frameworks: [],
            }),
            selectedElement: signal(null),
            structureFolders: signal([]),
          },
        },
      ],
    });
  });

  it('should render the package version in the footer', async () => {
    const fixture = TestBed.createComponent(SidenavLayout);

    await fixture.whenStable();

    const footer = fixture.nativeElement.querySelector('.nav-footer') as HTMLElement;
    expect(footer.textContent?.trim()).toBe(`v${APP_VERSION}`);
  });
});
