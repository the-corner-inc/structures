
# `/cmd`

Main applications for this project.

The directory name for each application should match the name of the executable you want to have (e.g., `/cmd/myapp`).

Don't put a lot of code in the application directory. If you think the code can be imported and used in other projects, then it should live in the [`/pkg`](pkg.md) directory. If the code is not reusable or if you don't want others to reuse it, put that code in the [`/internal`](internal.md) directory. You'll be surprised what others will do, so be explicit about your intentions!

It's common to have a small `main` function that imports and invokes the code from the `/internal` and `/pkg` directories and nothing else.

See the [`/cmd`](https://github.com/golang-standards/project-layout/tree/master/cmd) directory for examples.

**Examples:**
- [velero/cmd](https://github.com/vmware-tanzu/velero/tree/main/cmd) (just a really small main function with everything else in packages)
- [moby/cmd](https://github.com/moby/moby/tree/master/cmd)
- [prometheus/cmd](https://github.com/prometheus/prometheus/tree/main/cmd)
- [influxdb/cmd](https://github.com/influxdata/influxdb/tree/master/cmd)
- [kubernetes/cmd](https://github.com/kubernetes/kubernetes/tree/master/cmd)
- [dapr/cmd](https://github.com/dapr/dapr/tree/master/cmd)
- [go-ethereum/cmd](https://github.com/ethereum/go-ethereum/tree/master/cmd)
