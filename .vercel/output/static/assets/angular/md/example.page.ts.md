# example.component.ts

**Note:** **The [order](https://www.oracle.com/java/technologies/javase/codeconventions-fileorganization.html) have to be respected**  

## Example

```typescript
@component{(
  standalone: false,
  selector: 'example-page',
  templateUrl: 'example-page.html',
  styleUrl: 'example-page.scss', // Only if fils contains code,
  styleUrls: ['example-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
     // See: example.service.ts
  ],
  imports: [
    CommonModule, // <-- Prefer, NgIf, NgFor, if possible

   // Components <-- Alphabetical order
   ComponentModule,
   StandaloneComponent,

   // Fragments

   // Layouts

   // Modals

   // Pipes

   // Services

   // Shared
   SharedModule, // <-- Barrel import : Do not overuse

   // Vendors
  ],
)}
export class examplePage extends baseClass implements OnInit {
  readonly publicService = inject(PublicService)
  protected readonly _protectedService = inject(ProtectedService)
  readonly #privateService = inject(PrivateService)

  @ViewChild('myChild', {red: ViewContainerRef})

  readonly myInput = input()
  @Input() myInput: any

  private _myInput: any
  @Input() set myInput(value: any) {
    this._myInput = value
  }
  get myInput() {
    return this._myInput
  }
  
  readonly myOutPut = output()
  @Output() myOutput: any

  $mySignal = Signal<any>() // $ for signal
  myObservable$: Observable // $ for observable

  myPublicVar: any // single variable (object/number/string/boolean)
  myPublicVars: any[] // s -> arrays of something

  myBoolean = false // don't give a type if you directly assign a value
  myBoolean: boolean = false // Bad
  myObjects: User[] = [] // Good : because we don't know what kind of object we declare

  protected _myProtectedVar: any // _ for protected

  #myPublicVar: any // _ for private

  constructor(
    _config: inheritedClass
  ) {
    super(_config)
  }

  // 1: angular lifecycle hooks -> https://angular.io/guide/lifecycle-hooks
  ngOnInit() { // Angular methods Should be implemented at the class lvl

  }

  // 2: public methods
  publicMethod() {
   
    this.secondPublicMethod() {}
  }

  // 2.2 : If the method uses another one from the same class, it should be placed after it
  secondPublicMethod() {
  }

  // 3: protected methods (notice, methods should be grouped first by functionality and then per access level)
  protected _protectedMethod() {

  }

  // 4: private methods
  private #privateMethod() {

  }

}
```

## Methods
### Variables
If a class only has one element (ex: user),  
* `attributes`: For a single user
* `items`: for an array of users.  
*  Methods have **general purpose name**
   *  **Good:** getAttributes()
   *  **Bad:** getUser()

### Service
If you're using one single service for the component, use general `service` as name

### Example
```typescript
readonly service = inject(ComponentService)
```
