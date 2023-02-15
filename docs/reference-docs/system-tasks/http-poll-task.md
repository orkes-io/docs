---
sidebar_position: 1
---

# HTTP POLL Task
```json
"type" : "HTTP_POLL"
```
## Introduction

The HTTP_POLL is a conductor task used to invoke HTTP API until the specified condition matches. 

## Use Cases
The HTTP_POLL task comes into use in situations like State Monitoring, where you need to monitor a particular state. For example, you can leverage this to monitor issues in GitHub so that you get notified of the issues at every specified time.

## Configuration
You can define the http_poll tasks in the workflow with the task type HTTP_POLL. 

To proceed with the workflow creation, you must specify the input parameters.

## Input Parameters
The input parameters supported by the HTTP_POLL task are as follows:

| Attribute      | Description |
| ----------- | ----------- |
| terminalCondition   | Specifies the condition to be evaluated after every HTTP API invocation. If the condition is evaluated as `true`, the task will be marked as completed. On the other hand, if the condition is evaluated as `false`, the conductor will schedule the next poll according to the configurations (pollingInterval & pollingStrategy).                                   **Note**: While writing the terminal condition, <ul><li>It can be [parameterized](https://orkes.io/content/docs/how-tos/Tasks/task-inputs).</li><li> In order to use the current http poll as input to the condition, a `$` needs to be prefixed. For example, `$.output.status`</li></ul> |
| pollingInterval | Specify the time duration in seconds between each HTTP invocation. |
| pollingStrategy | It can take any of the following values: <ul><li>**FIXED** - The duration between each HTTP API invocation will be fixed.</li><li> **LINEAR_BACKOFF** - The duration between each HTTP API invocation will be calculated by multiplying the poll count with pollingInterval. Note that the poll count is the incremental value based on each invocation.</li><li>**EXPONENTIAL_BACKOFF** - The duration between each HTTP API invocation will be calculated by multiplying poll count with 2 base exponential of pollingInterval.</li></ul>|

Apart from the above parameters, ensure that the following basic parameters for an HTTP task are also provided.

| Attribute      | Description |
| ----------- | ----------- |
| uri   | Provide the Uniform Resource Identifier (URI) for the service. It can be partial when using vipAddress or else it indicates the server address. |
| method  | Indicates the required action to be performed on the source. It can be GET, PUT, POST, DELETE, OPTIONS or HEAD. <ul><li>GET - Used to get information from the server using the provided URI.</li><li>PUT - Used to replace the existing representation of the target source with the brand-new uploaded data.</li><li>POST - Used to send data to the server.</li> <li>DELETE - Used to delete the existing representation of the target source.</li><li>OPTIONS - Used to describe the communication options for the target source.</li><li>HEAD - Used to get the information from the server. However, it is limited to transferring only the status line and header section.</li></ul> |
| accept  | Accept header as required by the server. Defaults to application/json. |
| contentType | The supported content types are text/plain, text/html, and application/json (Default). |
| headers | Indicate a map of additional http headers to be sent along with the request. |
| body | Indicates the request body. |
| vipAddress | When using discovery-based service URLs. |
| asyncComplete | <ul><li>`false` to mark status COMPLETED upon execution.</li><li>`true` to keep it IN_PROGRESS, wait for an external event (via Conductor or SQS or EventHandler) to complete it.</li></ul> |
| oauthConsumerKey  | [OAuth](https://oauth.net/core/1.0/) client consumer key. |
| oauthConsumerSecret | [OAuth](https://oauth.net/core/1.0/) client consumer secret. |
| connectionTimeOut | Indicates the connection time out in milliseconds. If set to 0, it is equivalent to infinity. By default, it is set to 100. |
| readTimeOut | Indicates the read time out in milliseconds. If set to 0, it is equivalent to infinity. By default, it is set to 150. |

## Example

Let’s see an example workflow:

```json
{
 "name": "your_workflow_name",
 "description": "Sample workflow to get started with HTTP POLL task.",
 "version": 1,
 "tasks": [
   {
     "name": "example",
     "taskReferenceName": "example",
     "inputParameters": {
       "http_request": {
         "uri": "https://jsonplaceholder.typicode.com/posts/1",
         "method": "GET",
         "terminationCondition": "$.output.body.length > 10 ? true : false;",
         "pollingInterval": "60",
         "pollingStrategy": "FIXED"
       }
     },
     "type": "HTTP_POLL"
   }
 ],
 "inputParameters": [],
 "outputParameters": {},
 "schemaVersion": 2,
 "ownerEmail": "youremail@example.com"
}
```

So, here the input parameters for the HTTP_POLL task are defined as follows:

```json
  "terminationCondition": "$.output.body.length > 10 ? true : false;",
  "pollingInterval": "60",
  "pollingStrategy": "FIXED"
```
The above configuration defines that the conductor will invoke the HTTP API every 60 seconds untill the jsonplaceholder gives the output that is longer then 10 characters.

Notes:- Current invocation output can be refered using `$.output`. Similarly previous tasks output can also be refered using `$.task_ref_name.output`
