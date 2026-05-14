---
title: "C# SDK"
description: "Build Conductor workers in C#/.NET with dependency injection, workflow management, and task polling."
canonical_route: "sdks/csharp"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, Conductor SDKs, workflow workers, Python SDK, Java SDK, Go SDK, TypeScript SDK"
---

# C# SDK

!!! info "Source"
    GitHub: [conductor-oss/csharp-sdk](https://github.com/conductor-oss/csharp-sdk) | Report issues and contribute on GitHub.

!!! note "Maintenance"
    This SDK is part of the Conductor OSS ecosystem. Conductor OSS remains actively maintained under the Conductor OSS community, with Orkes contributing maintenance, engineering, documentation, and enterprise support.


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
See [Access Control](/content/category/access-control-and-security) for more details on role-based access control with Conductor and generating API keys for your environment.

### Configure API Client
```csharp
using Conductor.Api;
using Conductor.Client;
using Conductor.Client.Authentication;

var configuration = new Configuration() {
    BasePath = basePath,
    AuthenticationSettings = new OrkesAuthenticationSettings("keyId", "keySecret")
};

var workflowClient = configuration.GetClient<WorkflowResourceApi>();

workflowClient.StartWorkflow(
    name: "test-sdk-csharp-workflow",
    body: new Dictionary<string, object>(),
    version: 1
)
```

### Next: [Create and run task workers](https://github.com/conductor-sdk/conductor-csharp/blob/main/docs/readme/workers.md)


## Examples

Browse all examples on GitHub: [conductor-oss/csharp-sdk/csharp-examples](https://github.com/conductor-oss/csharp-sdk/tree/main/csharp-examples)

| Example | Type |
|---|---|
| [Examples](https://github.com/conductor-oss/csharp-sdk/tree/main/csharp-examples/Examples) | directory |
| [Humantaskexamples](https://github.com/conductor-oss/csharp-sdk/blob/main/csharp-examples/HumanTaskExamples.cs) | file |
| [Program](https://github.com/conductor-oss/csharp-sdk/blob/main/csharp-examples/Program.cs) | file |
| [Runner](https://github.com/conductor-oss/csharp-sdk/blob/main/csharp-examples/Runner.cs) | file |
| [Testworker](https://github.com/conductor-oss/csharp-sdk/blob/main/csharp-examples/TestWorker.cs) | file |
| [Utils](https://github.com/conductor-oss/csharp-sdk/tree/main/csharp-examples/Utils) | directory |
| [Workflowexamples](https://github.com/conductor-oss/csharp-sdk/blob/main/csharp-examples/WorkFlowExamples.cs) | file |
