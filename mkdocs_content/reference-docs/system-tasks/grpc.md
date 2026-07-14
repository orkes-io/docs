---
title: "gRPC"
description: "Learn how the gRPC task invokes remote gRPC service endpoints from workflows in Orkes Conductor."
canonical_route: "reference-docs/system-tasks/grpc"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, gRPC, gRPC task"
---

# gRPC

The gRPC task invokes remote endpoints in gRPC services and allows communication with backend systems using the gRPC protocol. 

The gRPC task constructs a request using the specified method, host, and request body, and sends it to the gRPC server. The task captures the response and makes it available for use in workflows.

## Task parameters

Configure these parameters for the gRPC task.

| Parameter                         | Description                                                                                                                          | Required/ Optional |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| inputParameters.**method** | The gRPC method to invoke within the service. | Required. | 
| inputParameters.**host** | The hostname or IP address of the gRPC server. | Required. | 
| inputParameters.**port** | The port on which the gRPC server is running. | Required. | 
| inputParameters.**request** | A JSON object representing the request payload. | Required. | 
| inputParameters.**methodType** | The gRPC method type. Supported values:<ul><li>UNARY</li><li>CLIENT_STREAMING</li><li>SERVER_STREAMING</li><li>BIDI_STREAMING</li></ul> | Required. | 
| inputParameters.**useSSL** | Determines the connection security. Set to *true* to secure the connection using SSL. | Optional. | 
| inputParameters.**trustCert** | Specifies whether the client should trust the server’s certificate. Set to *true* to allow connections to servers with self-signed or unverified certificates. | Optional. |  
| inputParameters.**hedgingConfig**.**maxAttempts** | The maximum number of parallel requests to send. The system uses the response from the first successful attempt, helping reduce tail latencies in remote services.<br/><br/>**Note**: Hedging makes parallel requests, so use it only for idempotent services. | Optional. | 
| inputParameters.**headers** | A map of additional headers to be sent along with the request. Supported types:<ul><li>Accept-Language</li><li>Authorization</li><li>Cache Control</li><li>Content-MD5</li><li>From</li><li>If-Match</li><li>If-Modified-Since</li><li>If-None-Match</li><li>Max-Forwards</li><li>Pragma</li><li>If-Range</li><li>If-Unmodified-Since</li><li>Proxy-Authorization</li><li>Range</li><li>Warning</li><li>x-api-key</li><li>Accept-Charset</li><li>Accept-Encoding</li><li>Accept-Control-Request-Headers</li><li>Accept-Control-Request-Method</li><li>Content-Transfer-Encoding</li><li>Expect</li><li>Transfer-Encoding</li><li>Trailer</li></ul> | Optional. | 
| inputParameters.**inputType** | The input schema for the request. [Learn more about using schemas in Conductor](https://orkes.io/content/developer-guides/schema-validation#using-schemas).<ul><li>If you’re using a [registered service](https://orkes.io/content/remote-services), this value is the schema name automatically registered when fetching the service definition.</li><li>If you’re configuring the task manually, enter the name of the input schema you want to associate with the task.</li></ul> | Optional. | 
| inputParameters.**outputType** | The output schema for the response. [Learn more about using schemas in Conductor](https://orkes.io/content/developer-guides/schema-validation#using-schemas).<ul><li>If you’re using a [registered service](https://orkes.io/content/remote-services), this value is the schema name automatically registered when fetching the service definition.</li><li>If you’re configuring the task manually, enter the name of the output schema you want to associate with the task.</li></ul> | Optional. | 

The following are generic configuration parameters that can be applied to the task and are not specific to the gRPC task.

<details>
<summary>Caching parameters</summary>

You can cache the task outputs using the following parameters. Refer to [Caching Task Outputs](/content/faqs/task-cache-output) for a full guide.

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- | 
| cacheConfig.**ttlInSecond** | The time to live in seconds, which is the duration for the output to be cached. | Required if using *cacheConfig*. |
| cacheConfig.**key** | The cache key is a unique identifier for the cached output and must be constructed exclusively from the task’s input parameters.<br/>It can be a string concatenation that contains the task’s input keys, such as `${uri}-${method}` or `re_${uri}_${method}`. | Required if using *cacheConfig*. |

</details>

<details>
<summary>Other generic parameters</summary>

Here are other parameters for configuring the task behavior.

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- | 
| optional | Whether the task is optional. <br/><br/>If set to `true`, any task failure is ignored, and the workflow continues with the task status updated to `COMPLETED_WITH_ERRORS`. However, the task must reach a terminal state. If the task remains incomplete, the workflow waits until it reaches a terminal state before proceeding. | Optional. | 

</details>

## Task configuration

This is the task configuration for a gRPC task.

```json
  { 
     "name": "gRPC",
     "taskReferenceName": "gRPC_ref",
     "type": "GRPC",
     "inputParameters": {
       "method": "hello.proto",
       "host": "grpcb.in",
       "port": 9000,
       "methodType": "SERVER_STREAMING",
       "useSSL": true,
       "trustCert": true,
       "hedgingConfig": {
         "maxAttempts": 4
       },
       "inputType": "<INPUT-SCHEMA>",
       "outputType": "<OUTPUT-SCHEMA>",
       "request": {
         "key": "value"
       },
       "headers": {
         "x-api-key": "${workflow.secrets.api}"
       }
     }
   }
```

## Task output

The gRPC task returns the server’s response as task output, making it available for use in subsequent workflow steps. The structure of the output depends on the response of the gRPC method.

## Related pages

- [System Tasks](/content/category/reference-docs/system-tasks)
- [Event](/content/reference-docs/system-tasks/event)
- [HTTP](/content/reference-docs/system-tasks/http)
- [HTTP Poll](/content/reference-docs/system-tasks/http-poll)
- [Inline](/content/reference-docs/system-tasks/inline)
- [JSON JQ Transform](/content/reference-docs/system-tasks/jq-transform)
