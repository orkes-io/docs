---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'

# HTTP Poll 

HTTP Poll task is used to invoke HTTP API endpoints until the specified condition matches.

## Definitions
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
           "Cache-Control": "${workflow.input.cache.control}"
         },
         "body": {
           "key": "value"
         }
       }
     },
     "cacheConfig": {
       "ttlInSecond": 2000,
       "key": "cache-key"
     },
     "optional": false
   }
```

### Input Parameters

| Attribute         | Description                                                                                                                                                                      |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uri               | Provide the URI for the service. It can be a partial value when using **_vipAddress_** or it can be the server address.                                                                |
| method            | Choose the HTTP method. Conductor supports the methods: GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS, and TRACE.                                                                             |
| accept            | Provide the accept header as required by the server. The supported types are:<ul><li>application/java-archive</li><li>application/EDI-X12</li><li>application/EDIFACT</li><li>application/javascript</li><li>application/octet-stream</li><li>application/ogg</li><li>application/pdf</li><li>application/xhtml+xml</li><li>application/x-shockwave-flash</li><li>application/json</li><li>application/ld+json</li><li>application/xml</li><li>application/zip</li><li>application/x-www-form-urlencoded</li><li>audio/mpeg</li><li>audio/x-ms-wma</li><li>audio/vnd.rn-realaudio</li><li>audio/x-wav</li><li>image/gif</li><li>image/jpeg</li><li>image/png</li><li>image/tiff</li><li>image/vnd.microsoft.icon</li><li>image/x-icon</li><li>image/vnd.djvu</li><li>image/svg+xml</li></ul>By default, it is set to **_application/json_**. You can also [pass any other headers as variables](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). |
| contentType       | Provide the content type for the server. The supported types are:<ul><li>application/java-archive</li><li>application/EDI-X12</li><li>application/EDIFACT</li><li>application/javascript</li><li>application/octet-stream</li><li>application/ogg</li><li>application/pdf</li><li>application/xhtml+xml</li><li>application/x-shockwave-flash</li><li>application/json</li><li>application/ld+json</li><li>application/xml</li><li>application/zip</li><li>application/x-www-form-urlencoded</li><li>audio/mpeg</li><li>audio/x-ms-wma</li><li>audio/vnd.rn-realaudio</li><li>audio/x-wav</li><li>image/gif</li><li>image/jpeg</li><li>image/png</li><li>image/tiff</li><li>image/vnd.microsoft.icon</li><li>image/x-icon</li><li>image/vnd.djvu</li><li>image/svg+xml</li></ul>By default, it is set to **_application/json_**. You can also [pass this parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). |
| terminationCondition | Specifies the condition to be evaluated after every HTTP API invocation. If the condition is evaluated as true, the task will be marked as completed. On the other hand, if the condition is evaluated as false, Conductor will schedule the next poll according to the configurations (pollingInterval & pollingStrategy). <br/>While writing the termination condition,<ul><li>It can be [passed as parameters](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li><li>To use the current http poll as input to the condition, a **$** needs to be prefixed. For example, **$.output.status**. Similarly, previous tasks' output can be referred to using **$.task_ref_name.output**.</li></ul>An example termination condition is as follows:`(function(){ return $.output.response.body.randomInt > 10;})();`| 
| pollingInterval | Specify the time duration in seconds between each HTTP invocation. By default, the value is set to 60. |
| pollingStrategy | Choose the required polling strategy. It can take any of the following values:<ul><li>**FIXED** - The duration between each HTTP API invocation will be fixed.</li><li>**LINEAR_BACKOFF** - The duration between each HTTP API invocation will be calculated by multiplying the poll count with pollingInterval. Note that the poll count is the incremental value based on each invocation.</li><li>**EXPONENTIAL_BACKOFF** - The duration between each HTTP API invocation will be calculated by multiplying the poll count by 2 base exponentials of the polling interval.</li></ul>By default, the value is set to FIXED. | 
| headers           | A map of additional HTTP headers to be sent along with the request. The supported types are:<ul><li>Accept-Language</li><li>Authorization</li><li>Cache Control</li><li>Content-MD5</li><li>From</li><li>If-Match</li><li>If-Modified-Since</li><li>If-None-Match</li><li>Max-Forwards</li><li>Pragma</li><li>If-Range</li><li>If-Unmodified-Since</li><li>Proxy-Authorization</li><li>Range</li><li>Warning</li><li>x-api-key</li><li>Accept-Charset</li><li>Accept-Encoding</li><li>Accept-Control-Request-Headers</li><li>Accept-Control-Request-Method</li><li>Content-Transfer-Encoding</li><li>Expect</li><li>Transfer-Encoding</li><li>Trailer</li></ul> | 
| body              | Request body when using POST, PUT, or PATCH. It can be added as _text_ (**"body": "text"**) or _parameters_ such as string, number, boolean, null, or object/array. | 
| encode | Determines whether the URI needs encoding. When set to true (the default), the Conductor will automatically encode the query parameters before sending the HTTP request.<br/><br/>Set this to false if the URI is already encoded. In this case, the Conductor will assume the query parameters are properly encoded and pass them to the HTTP endpoint as specified in the URI. |
| cacheConfig | Enabling this option allows saving the cache output of the task. On enabling, you can provide the following parameters:<ul><li>**ttlInSecond** - Provide the time to live in seconds. You can also [pass this parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li><li>**key** - Provide the cache key, which is a string with parameter substitution based on the task input. You can also [pass this parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li></ul>|
| optional | Enabling this option renders the task optional. The workflow continues unaffected by the task's outcome, whether it fails or remains incomplete. |

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

1. Add task type **HTTP Poll**.
2. Configure polling endpoint, interval, strategy, and termination condition.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-http-poll-task.png" alt="Adding HTTP Poll Task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

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
           "Cache-Control": "${workflow.input.cache.control}"
         },
         "body": {
           "key": "value"
         }
       }
     },
     "cacheConfig": {
       "ttlInSecond": 2000,
       "key": "cache-key"
     },
     "optional": false
   }
```

</TabItem>
</Tabs>


<details><summary>Sample Workflow</summary>
<p>

Let’s see a sample workflow:

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

So, here, the input parameters for the HTTP Poll task are defined as follows:

```json
      "terminationCondition": "$.output.body.length > 10 ? true : false;",
      "pollingInterval": "60",
      "pollingStrategy": "FIXED"
```

Conductor will invoke the HTTP API every 60 seconds until the invoked URI gives the output that is longer than 10 characters.
</p>
</details>