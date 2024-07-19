---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Call an HTTP Service (APIs, Rest)

HTTP task allows for making calls to remote services exposed over HTTP/HTTPS.

## Definitions

 ```json
   {
     "name": "http",
     "taskReferenceName": "http_ref",
     "type": "HTTP",
     "inputParameters": {
       "uri": "https://orkes-api-tester.orkesconductor.com/api",
       "method": "GET",
       "accept": "application/json",
       "contentType": "application/json",
       "encode": true,
       "headers": {
         "If-Range": "${workflow.input.range}"
       },
       "body": {
         "key": "value"
       }
     },
     "cacheConfig": {
       "ttlInSecond": 2500,
       "key": "cache-key"
     },
     "optional": false,
     "asyncComplete": true
   }
```

### Input Parameters
| Attribute         | Description                                                                                                                                                                      |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uri               | Provide the URI for the service. It can be a partial value when using **_vipAddress_** or it can be the server address.                                                                |
| method            | Choose the HTTP method. Conductor supports the methods: GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS, and TRACE.                                                                             |
| accept            | Provide the accept header as required by the server. The supported types are:<ul><li>application/java-archive</li><li>application/EDI-X12</li><li>application/EDIFACT</li><li>application/javascript</li><li>application/octet-stream</li><li>application/ogg</li><li>application/pdf</li><li>application/xhtml+xml</li><li>application/x-shockwave-flash</li><li>application/json</li><li>application/ld+json</li><li>application/xml</li><li>application/zip</li><li>application/x-www-form-urlencoded</li><li>audio/mpeg</li><li>audio/x-ms-wma</li><li>audio/vnd.rn-realaudio</li><li>audio/x-wav</li><li>image/gif</li><li>image/jpeg</li><li>image/png</li><li>image/tiff</li><li>image/vnd.microsoft.icon</li><li>image/x-icon</li><li>image/vnd.djvu</li><li>image/svg+xml</li></ul>By default, it is set to **_application/json_**. You can also [pass any other headers as variables](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). |
| contentType       | Provide the content type for the server. The supported types are:<ul><li>application/java-archive</li><li>application/EDI-X12</li><li>application/EDIFACT</li><li>application/javascript</li><li>application/octet-stream</li><li>application/ogg</li><li>application/pdf</li><li>application/xhtml+xml</li><li>application/x-shockwave-flash</li><li>application/json</li><li>application/ld+json</li><li>application/xml</li><li>application/zip</li><li>application/x-www-form-urlencoded</li><li>audio/mpeg</li><li>audio/x-ms-wma</li><li>audio/vnd.rn-realaudio</li><li>audio/x-wav</li><li>image/gif</li><li>image/jpeg</li><li>image/png</li><li>image/tiff</li><li>image/vnd.microsoft.icon</li><li>image/x-icon</li><li>image/vnd.djvu</li><li>image/svg+xml</li></ul>By default, it is set to **_application/json_**. You can also [pass this parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). |
| headers           | A map of additional HTTP headers to be sent along with the request. The supported types are:<ul><li>Accept-Language</li><li>Authorization</li><li>Cache Control</li><li>Content-MD5</li><li>From</li><li>If-Match</li><li>If-Modified-Since</li><li>If-None-Match</li><li>Max-Forwards</li><li>Pragma</li><li>If-Range</li><li>If-Unmodified-Since</li><li>Proxy-Authorization</li><li>Range</li><li>Warning</li><li>x-api-key</li><li>Accept-Charset</li><li>Accept-Encoding</li><li>Accept-Control-Request-Headers</li><li>Accept-Control-Request-Method</li><li>Content-Transfer-Encoding</li><li>Expect</li><li>Transfer-Encoding</li><li>Trailer</li></ul> | 
| body              | Request body when using POST, PUT, or PATCH. It can be added as _text_ (**"body": "text"**) or _parameters_ such as string, number, boolean, null, or object/array. | 
| encode | Determines whether the URI needs encoding. When set to true (the default), the Conductor will automatically encode the query parameters before sending the HTTP request.<br/><br/>Set this to false if the URI is already encoded. In this case, the Conductor will assume the query parameters are properly encoded and pass them to the HTTP endpoint as specified in the URI. |
| cacheConfig | Enabling this option allows saving the cache output of the task. On enabling, you can provide the following parameters:<ul><li>**ttlInSecond** - Provide the time to live in seconds. You can also [pass this parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li><li>**key** - Provide the cache key, which is a string with parameter substitution based on the task input. You can also [pass this parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li></ul>|
| optional | Enabling this option renders the task optional. The workflow continues unaffected by the task's outcome, whether it fails or remains incomplete. |
| asyncComplete     | When turned on, task completion occurs asynchronously, with the task remaining in progress while waiting for external APIs or events to complete the task. |

### Output Parameters

| Attribute    | Description                                                                  |
|--------------|------------------------------------------------------------------------------|
| response     | A JSON object representing the response, if present.                               |
| headers      | An object containing the metadata about the response.                                                         |
| statusCode   | Returns the [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) indicating the success or failure of the request. |
| reasonPhrase | Returns the reason phrase associated with the HTTP status code.                                           |
| body | Returns the body of the response containing the actual data returned by the API. | 

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **HTTP**.
2. Configure the task by choosing method, endpoint, headers, etc.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-http-task.png" alt="Adding HTTP task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

```json
{
     "name": "http",
     "taskReferenceName": "http_ref",
     "type": "HTTP",
     "inputParameters": {
       "uri": "https://orkes-api-tester.orkesconductor.com/api",
       "method": "GET",
       "accept": "application/json",
       "contentType": "application/json",
       "encode": true,
       "headers": {
         "If-Range": "${workflow.input.range}"
       },
       "body": {
         "key": "value"
       }
     },
     "cacheConfig": {
       "ttlInSecond": 2500,
       "key": "cache-key"
     },
     "optional": false,
     "asyncComplete": true
   }
```

</TabItem>
</Tabs>


<details><summary>Sample Task Definition for sending a POST request</summary>
<p>

```json
    {
      "name": "http_post_example",
      "taskReferenceName": "post_example",
      "inputParameters": {
        "http_request": {
          "uri": "https://jsonplaceholder.typicode.com/posts/",
          "method": "POST",
          "body": {
            "title": "${get_example.output.response.body.title}",
            "userId": "${get_example.output.response.body.userId}",
            "action": "doSomething"
          }
        }
      },
      "type": "HTTP"
    }
```

</p>
</details>

<details><summary>Sample Workflow utilizing “Async Complete” option</summary>
<p>
The "asyncComplete" option in the HTTP task configuration allows tasks to be marked as completed asynchronously, providing flexibility in workflow execution. Let's examine a detailed example to better understand its implementation.

Here’s a sample workflow with “asynComplete” set to “true”:

```json
{
 "name": "async_complete_example",
 "description": "Edit or extend this sample workflow. Set the workflow name to get started",
 "version": 1,
 "tasks": [
   {
     "name": "http_task_85tf2",
     "taskReferenceName": "http_task_85tf2_ref",
     "inputParameters": {
       "http_request": {
         "uri": "https://orkes-api-tester.orkesconductor.com/api",
         "method": "GET",
         "accept": "application/json",
         "contentType": "application/json"
       }
     },
     "type": "HTTP",
     "asyncComplete": true
   }
 ],
 "schemaVersion": 2,
 "ownerEmail": "devrel@orkes.io"
}
```

Now, let’s run this in the Playground. 

[Run in Orkes Playground](https://play.orkes.io/runWorkflow)

1. Under **Workflow Name**, choose **async_complete_example**.
2. Click **Run Workflow**.

Upon execution, the HTTP task remains “Scheduled” instead of completing immediately, allowing for asynchronous completion. There are various methods to update the task status to complete:

**Using API**

Once the workflow runs, note the generated **workflowId** displayed beneath the workflow name on the execution page. 

<p align="center"><img src="/content/img/workflowid.png" alt="Workflow ID in Conductor" width="100%" height="auto"></img></p>

Utilize this **workflowId** along with the **taskRefName** to complete the task through the following API:

```
POST /api/tasks/{workflowId}/{taskRefName}/{status}
```
Another method is to directly update from the UI.

**From Conductor UI**

From the workflow execution page, click on the task and manually update the status to “COMPLETED.”

<p align="center"><img src="/content/img/workflow-status-update-from-ui.png" alt="Updating workflow status from Conductor UI" width="100%" height="auto"></img></p>

Employing these methods allows you to asynchronously complete your workflow, which is beneficial when pausing the workflow for external interventions.
</p>
</details>