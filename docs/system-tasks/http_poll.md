# HTTP Poll Task
```json
"taskType" : "HTTP_POLL"
```

The HTTP_POLL is a conductor task used to invoke HTTP API until the specified condition matches.

## Configurations
```json
{
     "type": "HTTP_POLL",
     "inputParameters": {
       "http_request": {
         "uri": "https://orkes-api-tester.orkesconductor.com/get",
         "method": "GET",
         "connectionTimeOut": 3000,
         "readTimeOut": 3000,
         "accept": "application/json",
         "contentType": "application/json",
  "terminationCondition": "1",
         "pollingInterval": "60",
         "pollingStrategy": "FIXED"
        }
    }
}
```

### Input Configurations
|Attribuet|Description|
|---|---|
| terminalCondition   | Specifies the condition to be evaluated after every HTTP API invocation. If the condition is evaluated as `true`, the task will be marked as completed. On the other hand, if the condition is evaluated as `false`, the conductor will schedule the next poll according to the configurations (pollingInterval & pollingStrategy).<br/>                                   **Note**: While writing the terminal condition, <ul><li>It can be [parameterized](https://orkes.io/content/docs/how-tos/Tasks/task-inputs).</li><li> In order to use the current http poll as input to the condition, a `$` needs to be prefixed. For example, `$.output.status`</li></ul> |
| pollingInterval | Specify the time duration in seconds between each HTTP invocation. |
| pollingStrategy | It can take any of the following values: <ul><li>**FIXED** - The duration between each HTTP API invocation will be fixed.</li><li> **LINEAR_BACKOFF** - The duration between each HTTP API invocation will be calculated by multiplying the poll count with pollingInterval. Note that the poll count is the incremental value based on each invocation.</li><li>**EXPONENTIAL_BACKOFF** - The duration between each HTTP API invocation will be calculated by multiplying poll count with 2 base exponential of pollingInterval.</li></ul>|

Apart from the above parameters, ensure that the following basic parameters for an HTTP task are also provided.
<br/>

| Attribute      | Description |
| ----------- | ----------- |
| uri   | Provide the Uniform Resource Identifier (URI) for the service. It can be partial when using vipAddress or else it indicates the server address. |
| method | Indicates the required action to be performed on the source. It can be GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS or TRACE. |
| accept | Provide the accept header as required by the server. By default, it is set to ```application/json```. |
| contentType | Provide the content type for the server. The supported types are text/plain, text/html, and application/json. By default, it is set to ```application/json```. |
| headers | Indicate a map of additional http headers to be sent along with the request. |
| body | Indicates the request body. |
| asyncComplete | If set, the task remains in the IN_PROGRESS state even after the execution. An external event (Task Update API or Event handler) is expected to mark the task as completed. |
| connectionTimeOut | Set the connection timeout in milliseconds.  If set to 0, it is equivalent to infinity. By default, the value is set to 100. |
| readTimeOut | Set the read timeout in milliseconds.  If set to 0, it is equivalent to infinity. By default, the value is set to 150. |

### Output​ Parameters
|Attribute|Description|
|---|---|
| response |  JSON body containing the response if present. |
| headers | Response Headers. |
| statusCode | [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). |
| reasonPhrase | HTTP Status Code's reason phrase. |

## Examples

<details><summary>Add Examples</summary>
<p>

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
        "uri": "https://jsonplaceholder.typicode.com/posts",
        "method": "GET",
        "terminationCondition": "1",
        "pollingInterval": "60",
        "pollingStrategy": "FIXED"
      }
    },
    "type": "HTTP_POLL"
  }
],
```
</p>
</details>