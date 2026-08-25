export interface RouteSettings {
  settingsUrl: string;
  iconBaseUrl: string;
  frameworks: FrameworkGroup[];
}

export interface FrameworkGroup {
  name: string;
  children: Framework[];
}

export interface Framework {
  name: string;
  settingsUrl: string;
  disabled?: boolean;
}
