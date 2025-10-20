# package.json

Configures [npm package dependencies](reference/configs/npm-packages) that are available to all projects in the workspace. See [npm documentation](https://docs.npmjs.com/files/package.json) for the specific format and contents of this file.

## Example

```json
{
  "name": "structures",
  "version": "0.0.0",
  "private": true,
  "license": "MIT",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "dependencies": {},
  "devDependencies": {}
}
```
