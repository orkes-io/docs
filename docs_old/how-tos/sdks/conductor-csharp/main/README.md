# Netflix Conductor C# SDK

The conductor-csharp repository provides the client SDKs to build task workers in C#.

Building the task workers in C# mainly consists of the following steps:

1. Setup `conductor-csharp` package
1. Create and run task workers
1. Create workflows using code
1. API Documentation

   
### Setup Conductor C# Package​

```shell
dotnet add package conductor-csharp
```

## Configurations

### Authentication Settings (Optional)
Configure the authentication settings if your Conductor server requires authentication.
* keyId: Key for authentication.
* keySecret: Secret for the key.

```csharp
authenticationSettings: new OrkesAuthenticationSettings(
    KeyId: "key",
    KeySecret: "secret"
)
```

### Access Control Setup
See [Access Control](https://orkes.io/content/docs/getting-started/concepts/access-control) for more details on role-based access control with Conductor and generating API keys for your environment.

### Configure API Client
```csharp
OrkesApiClient GetApiClient(string basePath, string keyId, string keySecret)
{
    return new OrkesApiClient(
        configuration: new Configuration()
        {
            BasePath = basePath
        },
        authenticationSettings: new OrkesAuthenticationSettings(
            keyId, keySecret
        )
    );
}

OrkesApiClient apiClient = GetApiClient(
    basePath: "https://play.orkes.io/api",
    keyId: "key",
    keySecret: "secret"
);
WorkflowResourceApi workflowClient = apiClient.GetClient<WorkflowResourceApi>();

workflowClient.StartWorkflow(
    name: "test-sdk-csharp-workflow",
    body: new Dictionary<string, object>(),
    version: 1
)
```

### Next: [Create and run task workers](https://github.com/conductor-sdk/conductor-csharp/blob/main/docs/readme/workers.md)
