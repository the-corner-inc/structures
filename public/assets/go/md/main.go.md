## What is main.go?

The `main.go` file is the entry point for a Go application. It contains the `main` package and a `main()` function, which is where program execution begins. Every standalone Go program must have a `main.go` (or another file in the `main` package with a `main()` function).

### Example

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

#### Explanation
- The `package main` declaration defines the executable program.
- The `main()` function is the entry point of the application.
- The `fmt` package is used here to print output to the console.
