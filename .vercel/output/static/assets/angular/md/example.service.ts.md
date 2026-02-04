# example.service.ts

As service communicate with the API, and this later follow a [structured logic](https://github.com/o-pinion/api/wiki), name should try to stay standardized to let us reuse the logic without adding any changes.

## Example

```typescript
@Injectable()
export class myService {
  $entries = signal<any[]>([])
  $entry = signal<any>()

  getEntry() {}
  getEntries() {}

  addEntry() {}
  addEntries() {}

  putEntry() {}

  deleteEntry() {}
  deleteEntries() {}
}
```
