# pages

Page components represent **distinct views or screens within the application**.   
They are typically **associated with a specific route** and are responsible for displaying the content related to that route.

## Example

```typescript
@component{(
  selector: 'example-page',
  templateUrl: 'example.page.html',
  styleUrl: 'example.page.scss', // Only if fils contains code,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class examplePage {
  // Page logic here
}
```
