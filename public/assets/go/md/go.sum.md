## What is go.sum?

The `go.sum` file is automatically generated in Go projects that use modules. It contains cryptographic checksums for each dependency listed in `go.mod`, ensuring the integrity and authenticity of downloaded modules. This helps verify that dependencies have not been tampered with.

### Example

```
github.com/gin-gonic/gin v1.9.0 h1:8b6b6e...
github.com/gin-gonic/gin v1.9.0/go.mod h1:7c9c2...
github.com/sirupsen/logrus v1.9.0 h1:3b2c1a...
github.com/sirupsen/logrus v1.9.0/go.mod h1:2a1b3...
```

#### Explanation
- Each line contains a module path, version, and its checksum.
- The `/go.mod` lines are checksums for the module's `go.mod` file itself.
- The `go.sum` file is used by Go to verify module downloads and ensure reproducible builds.
