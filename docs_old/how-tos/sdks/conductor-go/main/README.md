# Netflix Conductor Go SDK

The `conductor-go` repository provides the client SDKs to build task workers in Go.

Building the task workers in Go mainly consists of the following steps:

1. Setup conductor-go package
2. Create and run task workers
3. Create workflows using code
4. [API Documentation](https://github.com/conductor-sdk/conductor-go/tree/main/docs)
   
### Setup Conductor Go Package​

* Create a folder to build your package
```shell
mkdir quickstart/
cd quickstart/
go mod init quickstart
```

* Get Conductor Go SDK

```shell
go get github.com/conductor-sdk/conductor-go
```
## Configurations

### Authentication Settings (Optional)
Configure the authentication settings if your Conductor server requires authentication.
* keyId: Key for authentication.
* keySecret: Secret for the key.

```go
authenticationSettings := settings.NewAuthenticationSettings(
  "keyId",
  "keySecret",
)
```

### Access Control Setup
See [Access Control](https://orkes.io/content/docs/getting-started/concepts/access-control) for more details on role-based access control with Conductor and generating API keys for your environment.

### Configure API Client
```go

apiClient := client.NewAPIClient(
    settings.NewAuthenticationSettings(
        KEY,
        SECRET,
    ),
    settings.NewHttpSettings(
        "https://play.orkes.io",
    ),
)
	
```

### Setup Logging
SDK uses [logrus](https://github.com/sirupsen/logrus) for logging.

```go
func init() {
	log.SetFormatter(&log.TextFormatter{})
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)
}
```

### Next: [Create and run task workers](workers_sdk.md)
