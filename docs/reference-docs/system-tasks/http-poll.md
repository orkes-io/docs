---
sidebar_position: 3
slug: "/reference-docs/system-tasks/http-poll"
description: "The HTTP Poll task is used to poll HTTP API endpoints until the specified condition is matched."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'

# HTTP Poll 

The HTTP Poll task is used to invoke HTTP API endpoints until the specified condition matches.

An HTTP Poll task sends HTTP requests to a specified endpoint at regular intervals and continues until a given termination condition is met. This is useful when you need to repeatedly check an HTTP service's status or output.

## Task parameters

Configure these parameters for the HTTP Poll task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**uri** | The URI for the service. It can be a partial value when using `vipAddress` or it can be the server address. | Required. | 
| inputParameters.**method** | The HTTP method. Supported methods:<ul><li>GET</li><li>HEAD</li><li>POST</li><li>PUT</li><li>PATCH</li><li>DELETE</li><li>OPTIONS</li><li>TRACE</li></ul> | Required. |
| inputParameters.**accept** | The accept header required by the server. The default value is `application/json`. Supported types: <ul><li>application/java-archive</li><li>application/EDI-X12</li><li>application/EDIFACT</li><li>application/javascript</li><li>application/octet-stream</li><li>application/ogg</li><li>application/pdf</li><li>application/xhtml+xml</li><li>application/x-shockwave-flash</li><li>application/json</li><li>application/ld+json</li><li>application/xml</li><li>application/zip</li><li>application/x-www-form-urlencoded</li><li>audio/mpeg</li><li>audio/x-ms-wma</li><li>audio/vnd.rn-realaudio</li><li>audio/x-wav</li><li>image/gif</li><li>image/jpeg</li><li>image/png</li><li>image/tiff</li><li>image/vnd.microsoft.icon</li><li>image/x-icon</li><li>image/vnd.djvu</li><li>image/svg+xml</li></ul>[You can pass any other headers as variables.](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor) | Optional. | 
| inputParameters.**contentType** | The content type for the server. The default value is `application/json`. Supported types: <ul><li>application/java-archive</li><li>application/EDI-X12</li><li>application/EDIFACT</li><li>application/javascript</li><li>application/octet-stream</li><li>application/ogg</li><li>application/pdf</li><li>application/xhtml+xml</li><li>application/x-shockwave-flash</li><li>application/json</li><li>application/ld+json</li><li>application/xml</li><li>application/zip</li><li>application/x-www-form-urlencoded</li><li>audio/mpeg</li><li>audio/x-ms-wma</li><li>audio/vnd.rn-realaudio</li><li>audio/x-wav</li><li>image/gif</li><li>image/jpeg</li><li>image/png</li><li>image/tiff</li><li>image/vnd.microsoft.icon</li><li>image/x-icon</li><li>image/vnd.djvu</li><li>image/svg+xml</li></ul>[You can pass this as variables](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). | Optional. | 
| inputParameters.**terminationCondition** | The condition to be evaluated after every HTTP API invocation. If the condition is evaluated as `true`, the task is marked as completed. If the condition evaluates to `false`, Conductor schedules the next poll according to the configurations (`_pollingInterval_` and `_pollingStrategy_`).<br/><br/>When writing the termination condition, it can be [passed as variables](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). To use the current HTTP poll as input to the condition, prefix it with a `$`. For example, `$.output.status`. Similarly, refer to previous tasks' output using `$.task_ref_name.output`.<br/><br/>**Example Termination Condition**-`(function(){ return $.output.response.body.randomInt > 10;})();` | Required. | 
| inputParameters.**pollingInterval** | The duration in seconds between each HTTP invocation. The default value is 60. | Required. | 
| inputParameters.**pollingStrategy** |  The polling strategy. Supported values:<ul><li>`FIXED`—The duration between each HTTP API invocation remains constant.</li><li>`LINEAR_BACKOFF`— The duration between invocations increases linearly, calculated by multiplying the poll count with the pollingInterval. Note that the poll count increments with each invocation.</li><li>`EXPONENTIAL_BACKOFF`—The duration between invocations increases exponentially, calculated by multiplying the poll count by 2 base exponential powers of the `pollingInterval`.</li></ul>By default, the polling strategy is set to FIXED. | Required. | 
| inputParameters.**headers** | A map of additional HTTP headers to be sent along with the request. Supported types:<ul><li>Accept-Language</li><li>Authorization</li><li>Cache Control</li><li>Content-MD5</li><li>From</li><li>If-Match</li><li>If-Modified-Since</li><li>If-None-Match</li><li>Max-Forwards</li><li>Pragma</li><li>If-Range</li><li>If-Unmodified-Since</li><li>Proxy-Authorization</li><li>Range</li><li>Warning</li><li>x-api-key</li><li>Accept-Charset</li><li>Accept-Encoding</li><li>Accept-Control-Request-Headers</li><li>Accept-Control-Request-Method</li><li>Content-Transfer-Encoding</li><li>Expect</li><li>Transfer-Encoding</li><li>Trailer</li></ul> | Optional. |
| inputParameters.**body** | The request body for POST, PUT, or PATCH methods. Can be text or parameters such as string, number, boolean, null, or object/array. | Required for POST, PUT, or PATCH. |
| inputParameters.**encode** | Determines whether the URI needs encoding. When set to `true`, the Conductor will automatically encode the query parameters before sending the HTTP request. Set this to `false` if the URI is already encoded. The default value is true. | Optional. | 

## Task configuration

This is the task configuration for an HTTP Poll task.

```json
    {
     "name": "http_poll",
     "taskReferenceName": "http_poll_ref",
     "type": "HTTP_POLL",
     "inputParameters": {
       "http_request": {
         "uri": "https://orkes-api-tester.orkesconductor.com/api",
         "method": "GET",
         "accept": "application/json",
         "contentType": "application/json",
         "terminationCondition": "(function(){ return $.output.response.body.randomInt > 10;})();",
         "pollingInterval": "60",
         "pollingStrategy": "FIXED",
         "encode": true,
         "headers": {
           "header-1": "${workflow.input.header-1}"
         },
         "body": {
           "key": "value"
         }
       }
     }
   }
```

## Task output

The HTTP Poll task will return the following parameters.

| Parameter | Description | 
| --------- | ----------- | 
| response | A JSON object representing the response, if present. | 
| headers | An object containing the metadata about the response. | 
| statusCode | The [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) indicating success or failure of the request. | 
| reasonPhrase | The reason phrase associated with the HTTP status code. | 
| body | The response body containing the data returned by the API. | 

## Adding an HTTP Poll task in UI

To add an HTTP Poll task:

1. In your workflow, select the (**+**) icon and add an **HTTP Poll** task.
2. Choose the HTTP method for sending requests from the **Method** drop-down.
3. In **URL**, add the URI to be called by the HTTP Poll task.
4. In **Accept**, select the accept header as required by the server.
5. In **Content-Type**, select the content type for the server.
6. In **Termination Condition**, set the condition to be evaluated after every API invocation.
7. Set the **Polling Interval** and **Polling Strategy**.
8. (Optional) In **Other-headers**, add any additional HTTP headers to be sent along with the request.
9. In **Body**, add the request body when using PUT, POST, or PATCH method. 
10. (Optional) Enable or disable **Encode** to specify if the URI needs to be encoded.

<center><p><img src="/content/img/ui-guide-http-poll-task.png " alt="Adding HTTP Poll Task" width="100%" height="auto"/></p></center>

## Examples

Here are some examples for using the HTTP Poll task.

<details><summary>Sample Workflow</summary>
<p>

To demonstrate the HTTP Poll task, consider the following sample workflow.

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
      ]
    }
```

In this configuration, the polling conditions are configured as follows:

* **_uri_** - Specifies the endpoint to be called (https://jsonplaceholder.typicode.com/posts/1 in this example). 
* **_method_** - Defines the HTTP method used for the request (GET in this case). 
* **_terminationCondition_** - Evaluate whether the length of the response body ($.output.body.length) exceeds ten characters to determine task completion. 
* **_pollingInterval_** - Sets the interval (60 seconds) between successive API invocations.
* **_pollingStrategy_** - Utilizes a FIXED strategy to maintain a constant interval between invocations. 

Conductor will execute the HTTP API call every 60 seconds until the condition (response body length > 10) evaluates to true.

</p>
</details>