# app.component.ts

Root component TypeScript file. Contains the main logic for the application's root component.

## Example

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'the-corner-factory';
}
