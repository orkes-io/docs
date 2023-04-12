import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'

# HTTP Poll 

The HTTP_POLL is a conductor task used to invoke HTTP API until the specified condition matches.

## Definitions
```json
{
     "name": "http_poll_task",
    "taskReferenceName": "http_poll_task_ref",
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

### Input Parameters
|Attribute|Description|
|---|---|
| terminalCondition   | Specifies the condition to be evaluated after every HTTP API invocation. If the condition is evaluated as **true**, the task will be marked as completed. On the other hand, if the condition is evaluated as **false**, the conductor will schedule the next poll according to the configurations (pollingInterval & pollingStrategy). By default, this value is set to `true`.<br/>                                   **Note**: While writing the terminal condition, <ul><li>It can be [parameterized](/content/developer-guides/passing-data-in-conductor).</li><li> In order to use the current http poll as input to the condition, a `$` needs to be prefixed. For example, **$.output.status**</li></ul> |
| pollingInterval | Specify the time duration in seconds between each HTTP invocation. |
| pollingStrategy | It can take any of the following values: <ul><li>**FIXED** - The duration between each HTTP API invocation will be fixed.</li><li> **LINEAR_BACKOFF** - The duration between each HTTP API invocation will be calculated by multiplying the poll count with pollingInterval. Note that the poll count is the incremental value based on each invocation.</li><li>**EXPONENTIAL_BACKOFF** - The duration between each HTTP API invocation will be calculated by multiplying poll count with 2 base exponential of pollingInterval.</li></ul>|

Apart from the above parameters, ensure that the following basic parameters for an HTTP task are also provided.
<br/>

| Attribute      | Description |
| ----------- | ----------- |
| uri   | Provide the Uniform Resource Identifier (URI) for the service. It can be partial when using vipAddress or else it indicates the server address. |
| method | Indicates the required action to be performed on the source. It can be GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS or TRACE. |
| accept | Provide the accept header as required by the server. By default, it is set to **application/json**. |
| contentType | Provide the content type for the server. The supported types are text/plain, text/html, and application/json. By default, it is set to **application/json**. |
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

<Tabs>
<TabItem value="UI" label="UI">
</TabItem>
 <TabItem value="JSON" lable="JSON">

 ```json
{
    "name": "http_poll_task",
    "taskReferenceName": "http_poll_task_ref",
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

</TabItem>
<TabItem value="Java" label="Java">
This is a banana 🍌
</TabItem>
<TabItem value="Python" label="Python">
  This is a banana 🍌
</TabItem>
<TabItem value="Golang" label="Golang">
    This is a banana 🍌
</TabItem>
<TabItem value="CSharp" label="CSharp">
  This is a banana 🍌
</TabItem>
<TabItem value="clojure" label="Clojure">
    This is a banana 🍌
</TabItem>
<TabItem value="Javascript" label="Javascript">
    This is a banana 🍌
</TabItem>
</Tabs>

<details><summary>Sample Workflow</summary>
<p>

Let’s see an example workflow:

```json
{
 "name": "your_workflow_name",
 "description": "Sample workflow to get started with HTTP POLL task.",
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
}
```

So, here the input parameters for the HTTP_POLL task are defined as follows:
```json
  "terminationCondition": "$.output.body.length > 10 ? true : false;",
  "pollingInterval": "60",
  "pollingStrategy": "FIXED"
```

The above configuration defines that the Conductor will invoke the HTTP API every 60 seconds until the jsonplaceholder gives the output that is longer than 10 characters.
<br/>

**Note**: Current invocation output can be referred to using <b>$.output</b>. Similarly, previous tasks' output can also be referred to using **$.task_ref_name.output**.

</p>
</details>