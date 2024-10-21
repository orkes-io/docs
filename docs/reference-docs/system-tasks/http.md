---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# HTTP

The HTTP task is used to make calls to remote services exposed over HTTP/HTTPS. It supports various HTTP methods, headers, body content, and other configurations needed for interacting with APIs or remote services.

The HTTP task evaluates the parameters provided, constructs the HTTP request accordingly, and sends it to the specified URI. It handles the response by extracting useful information like status code, headers, and body content, which can be used in subsequent tasks in the workflow.

## Task parameters

Configure these parameters for the HTTP task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**uri** | The URI for the service. It can be a partial value when using `vipAddress` or it can be the server address. | Required. | 
| inputParameters.**method** | The HTTP method. Supported methods:<ul><li>GET</li><li>HEAD</li><li>POST</li><li>PUT</li><li>PATCH</li><li>DELETE</li><li>OPTIONS</li><li>TRACE</li></ul> | Required. |
| inputParameters.**accept** | The accept header required by the server. The default value is `application/json`. Supported types: <ul><li>application/java-archive</li><li>application/EDI-X12</li><li>application/EDIFACT</li><li>application/javascript</li><li>application/octet-stream</li><li>application/ogg</li><li>application/pdf</li><li>application/xhtml+xml</li><li>application/x-shockwave-flash</li><li>application/json</li><li>application/ld+json</li><li>application/xml</li><li>application/zip</li><li>application/x-www-form-urlencoded</li><li>audio/mpeg</li><li>audio/x-ms-wma</li><li>audio/vnd.rn-realaudio</li><li>audio/x-wav</li><li>image/gif</li><li>image/jpeg</li><li>image/png</li><li>image/tiff</li><li>image/vnd.microsoft.icon</li><li>image/x-icon</li><li>image/vnd.djvu</li><li>image/svg+xml</li></ul>[You can pass any other headers as variables.](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor) | Optional. | 
| inputParameters.**contentType** | The content type for the server. The default value is `application/json`. Supported types: <ul><li>application/java-archive</li><li>application/EDI-X12</li><li>application/EDIFACT</li><li>application/javascript</li><li>application/octet-stream</li><li>application/ogg</li><li>application/pdf</li><li>application/xhtml+xml</li><li>application/x-shockwave-flash</li><li>application/json</li><li>application/ld+json</li><li>application/xml</li><li>application/zip</li><li>application/x-www-form-urlencoded</li><li>audio/mpeg</li><li>audio/x-ms-wma</li><li>audio/vnd.rn-realaudio</li><li>audio/x-wav</li><li>image/gif</li><li>image/jpeg</li><li>image/png</li><li>image/tiff</li><li>image/vnd.microsoft.icon</li><li>image/x-icon</li><li>image/vnd.djvu</li><li>image/svg+xml</li></ul>[You can pass this as variables](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). | Optional. | 
| inputParameters.**headers** | A map of additional HTTP headers to be sent along with the request. Supported types:<ul><li>Accept-Language</li><li>Authorization</li><li>Cache Control</li><li>Content-MD5</li><li>From</li><li>If-Match</li><li>If-Modified-Since</li><li>If-None-Match</li><li>Max-Forwards</li><li>Pragma</li><li>If-Range</li><li>If-Unmodified-Since</li><li>Proxy-Authorization</li><li>Range</li><li>Warning</li><li>x-api-key</li><li>Accept-Charset</li><li>Accept-Encoding</li><li>Accept-Control-Request-Headers</li><li>Accept-Control-Request-Method</li><li>Content-Transfer-Encoding</li><li>Expect</li><li>Transfer-Encoding</li><li>Trailer</li></ul> | Optional. |
| inputParameters.**body** | The request body for POST, PUT, or PATCH methods. Can be text or parameters such as string, number, boolean, null, or object/array. | Required for POST, PUT, or PATCH. |
| inputParameters.**encode** | Determines whether the URI needs encoding. When set to `true`, the Conductor will automatically encode the query parameters before sending the HTTP request. Set this to `false` if the URI is already encoded. The default value is true. | Optional. | 
| inputParameters.**asyncComplete** | When turned on, task completion occurs asynchronously, with the task remaining in progress while waiting for external APIs or events to complete the task. | Optional. | 

## Task configuration

This is the task configuration for an HTTP task.

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
        "header-1": "${workflow.input.header-1}"
      },
      "body": {
        "key": "value"
      }
    },
    "asyncComplete": true
  }
```

## Task output

The HTTP task will return the following parameters.

| Parameter | Description | 
| --------- | ----------- | 
| response | A JSON object representing the response, if present. | 
| headers | An object containing the metadata about the response. | 
| statusCode | The [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) indicating success or failure of the request. | 
| reasonPhrase | The reason phrase associated with the HTTP status code. | 
| body | The response body containing the data returned by the API. | 

## Adding an HTTP task in UI

**To add an HTTP task:**

1. In your workflow, select the (**+**) icon and add an **HTTP** task.
2. Choose the HTTP method for sending requests from the **Method** drop-down.
3. In **URL**, add the URI to be called by the HTTP task.
4. In **Accept**, select the accept header as required by the server.
5. In **Content-Type**, select the content type for the server.
6. (Optional) In **Other-headers**, add any additional HTTP headers to be sent along with the request.
7. In **Body**, add the request body when using PUT, POST, or PATCH method. 
8. (Optional) Enable or disable **Encode** to specify if the URI needs to be encoded.
9. (Optional) Set **Async complete** to true if the task is to be completed asynchronously.

<center><p><img src="/content/img/ui-guide-http-task.png" alt="Adding HTTP task" width="100%" height="auto"/></p></center>

## Examples

Here are some examples for using the HTTP task.

<details><summary>Sending a POST request</summary>
<p>

Sample workflow for sending an HTTP POST request:

```json
//task definition

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

<details><summary>Sample Workflow using ‘Async Complete’ option</summary>
<p>

The asyncComplete option in the HTTP task configuration allows tasks to be marked as completed asynchronously, providing flexibility in workflow execution. Here's an example enabling ‘asyncComplete’:

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
 "ownerEmail": "john.doe@acme.com"
}
```

Now, let’s run this in the Developer Edition.

[Run in Orkes Developer Edition](https://developers.orkes.cloud/runWorkflow)

1. Under **Workflow Name**, choose **async_complete_example**.
2. Click **Run Workflow**.

Upon execution, the HTTP task remains “Scheduled” instead of completing immediately, allowing for asynchronous completion. The task can be completed using various methods:            

<Tabs>
<TabItem value="Using API" label="Using API">

Once the workflow runs, note the generated **workflowId** displayed near the workflow name on the execution page.

<p align="center"><img src="/content/img/workflowid.png" alt="Workflow ID in Conductor" width="100%" height="auto"></img></p>

Use this **workflowId** along with the **taskRefName** to complete the task via the following API:

```
POST /api/tasks/{workflowId}/{taskRefName}/{status}
```

</TabItem>

<TabItem value="From Conductor UI" label="From Conductor UI">

From the workflow execution page, click on the task and manually update the status to “COMPLETED.”

<p align="center"><img src="/content/img/workflow-status-update-from-ui.png" alt="Updating workflow status from Conductor UI" width="100%" height="auto"></img></p>

</TabItem>
</Tabs>

Employing these methods allows you to asynchronously complete your workflow, which is beneficial when pausing the workflow for external interventions.

</p>
</details>