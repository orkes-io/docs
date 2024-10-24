
# Orkes Conductor Go SDK

Orkes Conductor Go SDK is maintained here: https://github.com/conductor-sdk/conductor-go

## Get Conductor Go SDK

```shell
go get github.com/conductor-sdk/conductor-go
```

## Initialization

Everything related to server settings should be done within the `client.NewAPIClient` class by setting the required parameters (when initializing an object) like this:

```go

    apiClient := client.NewAPIClient(
        nil,
        settings.NewHttpSettings(
            "https://developer.orkescloud.com",
        ),
    )

```

### Authentication Settings (optional)

See [Security via Applications](/content/access-control-and-security/applications#generating-access-keys) or this [video](https://www.youtube.com/watch?v=f1b5vZRKn2Q) for details on how to get an access key and secret.

Once we have a key and secret, we can configure the app from properties or environment variables, as shown in this example:

```go

    apiClient := client.NewAPIClient(
        settings.NewAuthenticationSettings(
            KEY,
            SECRET,
        ),
        settings.NewHttpSettings(
            "https://developer.orkescloud.com",
        ),
    )

```

Remember to protect your app secrets like any other secrets or passwords.

### Setup Logging
SDK uses [logrus](https://github.com/sirupsen/logrus) for logging.

```go
func init() {
	log.SetFormatter(&log.TextFormatter{})
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)
}
```



## Related Topics

- Video Guide on [Getting Access Key and Secret](https://www.youtube.com/watch?v=f1b5vZRKn2Q)
- [Access Control & Security](/content/category/access-control-and-security)

