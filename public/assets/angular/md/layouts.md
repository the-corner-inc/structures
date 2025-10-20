# layouts

**Reusable layout** components that **define the structure and positioning of UI areas**.   
Use layouts to provide consistent structure across different pages or sections of the app.

## Example

```typescript
@component{(
  selector: 'app-main-layout',
  template: `
    <header>
      <ng-content select="[layout-header]"></ng-content>
    </header>
    <aside>
      <ng-content select="[layout-aside]"></ng-content>
    </aside>
    <main>
      <ng-content></ng-content>
    </main>
    <footer>
      <ng-content select="[layout-footer]"></ng-content>
    </footer>
  `,
)}
export class MainLayout {}
```
