
# `/vendor`

Application dependencies (managed manually or by your favorite dependency management tool like the new built-in [`Go Modules`](https://go.dev/wiki/Modules) feature). The `go mod vendor` command will create the `/vendor` directory for you. Note that you might need to add the `-mod=vendor` flag to your `go build` command if you are not using Go 1.14 where it's on by default.

Don't commit your application dependencies if you are building a library.

Note that since [`1.13`](https://golang.org/doc/go1.13#modules) Go also enabled the module proxy feature (using [`https://proxy.golang.org`](https://proxy.golang.org) as their module proxy server by default). Read more about it [`here`](https://blog.golang.org/module-mirror-launch) to see if it fits all of your requirements and constraints. If it does, then you won't need the `vendor` directory at all.
