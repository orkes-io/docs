---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Call an HTTP Service (APIs, Rest)

HTTP task allows you to make calls to remote services exposed over HTTP/HTTPS.

## Definitions

 ```json
    {
        "name": "http_task",
        "taskReferenceName": "http_task_ref",
        "type" : "HTTP",
        "inputParameters": {
            "uri": "https://catfact.ninja/fact",
            "method": "GET",
            "connectionTimeOut": 3000,
            "readTimeOut": 3000
        }
    }
```

### Input Parameters
| Attribute         | Description                                                                                                                                                                      |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uri               | Provide the URI for the service. It can be a partial value when using vipAddress or it can be the server address.                                                                |
| method            | Choose the HTTP method. Conductor supports the methods: GET, HEAD, POST, PUT, PATCH, DELETE, and OPTIONS                                                                             |
| accept            | Provide the accept header as required by the server. By default, it is set to **application/json**.                                                                              |
| contentType       | Provide the content type for the server. The supported types are **text/plain**, **text/html**, and **application/json**. By default, it is set to **application/json**.         |
| headers           | A map of additional http headers to be sent along with the request.                                                                                                              |
| body              | Request body when using **POST** or **PUT**.                                                                                                                                     |
| asyncComplete     | If set, the task remains in the **IN_PROGRESS** state even after the execution.  An external event (Task Update API or Event handler) is expected to mark the task as completed. 
| connectionTimeOut | Set the connection timeout in milliseconds.  If set to 0, it is equivalent to infinity. By default, the value is set to 100.                                                     |
| readTimeOut       | Set the read timeout in milliseconds.  If set to 0, it is equivalent to infinity. By default, the value is set to 150.                                                           |
| encode | Determines whether the URI needs encoding. When set to true (the default), the Conductor will automatically encode the query parameters before sending the HTTP request.<br/><br/>Set this to false if the URI is already encoded. In this case, the Conductor will assume the query parameters are properly encoded and pass them to the HTTP endpoint as specified in the URI. |
| cacheConfig | Enabling this option allows saving the cache output of the task. On enabling you can provide the following parameters:<ul><li>**TTL (in seconds)** - Provide the time to live in seconds.You can also pass this parameter as variables.</li><li>**Cache Key** - Provide the cache key, which is a string with parameter substitution based on the task input. You can also pass this parameter as variables.</li></ul>|

### Output Parameters

| Attribute    | Description                                                                  |
|--------------|------------------------------------------------------------------------------|
| response     | JSON body containing the response if present.                                |
| headers      | Response Headers.                                                            |
| statusCode   | [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). |
| reasonPhrase | HTTP Status Code's reason phrase.                                            |

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `HTTP`.
2. Configure the API by choosing method, endpoint, headers etc.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-http-task.png" alt="Adding HTTP task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
    {
      "name": "http_task",
      "taskReferenceName": "http_task_ref",
      "type": "HTTP",
      "inputParameters": {
        "http_request": {
          "uri": "https://orkes-api-tester.orkesconductor.com/api",
          "method": "POST",
          "connectionTimeOut": 3000,
          "readTimeOut": "3000",
          "accept": "application/json",
          "contentType": "application/json",
          "body": "${workflow.input.httpPayload}"
        }
      }
    }
```

</TabItem>
</Tabs>


<details><summary>Send a POST Request</summary>
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
<details><summary>Set Read and Connect Timeouts for HTTP requests</summary>
<p>

```json
    {
      "name": "http_post_example",
      "taskReferenceName": "post_example",
      "inputParameters": {
        "http_request": {
          "uri": "https://jsonplaceholder.typicode.com/posts/",
          "method": "POST",
          "readTimeout": 60000,
          "connectionTimeout": 60000,
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

<details><summary>Using Async Complete</summary>
<p>
While defining workflow definitions, we have a parameter, “asyncComplete”. Setting this parameter to “true” ensures that the task can be completed asynchronously only.

Let’s have a look at an example workflow with “asynComplete:true”,

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
         "connectionTimeOut": 3000,
         "readTimeOut": "3000",
         "accept": "application/json",
         "contentType": "application/json"
       }
     },
     "type": "HTTP",
     "asyncComplete": true
   }
 ],
 "schemaVersion": 2,
 "ownerEmail": "riza.farheen@orkes.io"
}
```

Now, let’s run this in the Playground. 

[Run in Orkes Playground](https://play.orkes.io/runWorkflow)

1. Under **Workflow Name**, choose **async_complete_example**.
2. Click **Run Workflow**.

On running this workflow, the HTTP task wouldn’t get completed; instead, it would be in a “Scheduled” state, i.e., the workflow is paused.

There are multiple ways to update the task status to complete. 

#### Using API 

Once the workflow is run, the workflowId will be generated. You can view the workflowId below the workflow name on the execution page.

<p align="center"><img src="/content/img/workflowid.png" alt="Workflow ID in Conductor" width="100%" height="auto"></img></p>

By using the **workflowId** and the **taskRefName**, you can use the following API to complete the task.

```
POST /api/tasks/{workflowId}/{taskRefName}/{status}
```
Another method to update the task status is directly from the UI.

#### From Conductor UI

From the workflow execution page, click on the task and then update the status manually to “COMPLETED”.

<p align="center"><img src="/content/img/workflow-status-update-from-ui.png" alt="Updating workflow status from Conductor UI" width="100%" height="auto"></img></p>

So, using the above methods, you can asynchronously complete your workflow. This can be useful when you need to pause the workflow for external interventions.
</p>
</details>