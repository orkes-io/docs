
# Orkes Conductor CSharp SDK

Orkes Conductor CSharp SDK is maintained here: https://github.com/conductor-sdk/conductor-csharp

## Setup Conductor C# Package

```shell
dotnet add package conductor-csharp
```

## Initialization

Everything related to server settings should be done within the `Configuration` class by setting the required parameter (when initializing an object) like this:

```java
using Conductor.Api;
using Conductor.Client;
using Conductor.Client.Authentication;

var configuration = new Configuration() {
    BasePath = basePath,
    AuthenticationSettings = null
};

var workflowClient = configuration.GetClient<WorkflowResourceApi>();
```

### Authentication Settings (optional)

See [Security via Applications](/content/access-control-and-security/applications#generating-access-keys) or this [video](/content/how-to-videos/access-key-and-secret) for details on how to get an access key and secret.

Once we have a key and secret, we can configure the app from properties or environment variables, as shown in this example:

```java
using Conductor.Api;
using Conductor.Client;
using Conductor.Client.Authentication;

var configuration = new Configuration() {
    BasePath = basePath,
    AuthenticationSettings = new OrkesAuthenticationSettings("keyId", "keySecret")
};

var workflowClient = configuration.GetClient<WorkflowResourceApi>();

```

Remember to protect your app secrets like any other secrets or passwords.

## Related Topics

- Video Guide on [Getting Access Key and Secret](/content/how-to-videos/access-key-and-secret)
- [Access Control & Security](/content/category/access-control-and-security)
- [CSharp SDK Readme](https://github.com/conductor-sdk/conductor-csharp#readme)

