# tsconfig.json

TypeScript configuration file. Specifies compiler options and path mappings for the project.

## Example

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": ".",
    "experimentalDecorators": true,
    "importHelpers": true,
    "isolatedModules": true,
    "module": "preserve",
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noPropertyAccessFromIndexSignature": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2022",
    "paths": {
      "@prints/*": ["src/app/pages/prints/*"],
      "@utilities/*": ["src/app/pages/utilities/*"],
      "@plugins/*": ["src/app/pages/plugins/*"],
      "@main/*": ["src/app/pages/main/*"],
      "@pages/*": ["src/app/pages/*"],
      "@bases/*": ["src/app/core/bases/*"],
      "@guards/*": ["src/app/core/guards/*"],
      "@resolvers/*": ["src/app/core/resolvers/*"],
      "@models/*": ["src/app/core/models/*"],
      "@services/*": ["src/app/core/services/*"],
      "@animations/*": ["src/app/shared/animations/*"],
      "@layouts/*": ["src/app/shared/layouts/*"],
      "@components/*": ["src/app/shared/components/*"],
      "@directives/*": ["src/app/shared/directives/*"],
      "@pipes/*": ["src/app/shared/pipes/*"],
      "@modals/*": ["src/app/shared/modals/*"],
      "@shared/*": ["src/app/shared/*"],
      "@environments/*": ["src/environments/*"],
      "@app/*": ["src/app/*"],
      "@root/*": ["*"]
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "typeCheckHostBindings": true,
    "strictTemplates": true
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
```
