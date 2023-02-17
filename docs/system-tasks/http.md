import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Call an HTTP Service
```json
"type": "HTTP"
```
HTTP task allows you to make calls to remote services exposed over HTTP/HTTPS.

## Configurations
```json
{
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
|Attribute|Description|
|---|---|
| uri  | Provide the URI for the service. It can be a partial value when using vipAddress or it can be the server address.|
| method  | Choose the HTTP method. Conductor supports the methods: GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS & TRACE.|
| accept | Provide the accept header as required by the server. By default, it is set to ```application/json```. |
| contentType | Provide the content type for the server. The supported types are ```text/plain```, ```text/html```, and ```application/json```. By default, it is set to ```application/json```.|
| headers| A map of additional http headers to be sent along with the request.|
| body| Request body when using `POST` or `PUT`.|
| asyncComplete | If set, the task remains in the **IN_PROGRESS** state even after the execution.  An external event (Task Update API or Event handler) is expected to mark the task as completed.
| connectionTimeOut | Set the connection timeout in milliseconds.  If set to 0, it is equivalent to infinity. By default, the value is set to 100.|
| readTimeOut | Set the read timeout in milliseconds.  If set to 0, it is equivalent to infinity. By default, the value is set to 150.|

### Output Parameters

|Attribute|Description|
|---|---|
| response |  JSON body containing the response if present. |
| headers | Response Headers. |
| statusCode | [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). |
| reasonPhrase | HTTP Status Code's reason phrase. |

## Examples

<Tabs>
 <TabItem value="JSON" lable="JSON">
</TabItem>
<TabItem value="Java" label="Java">
This is a banana 🍌
</TabItem>
<TabItem value="Golang" label="Golang">
    This is a banana 🍌
</TabItem>
<TabItem value="Python" label="Python">
  This is a banana 🍌
</TabItem>
<TabItem value="CSharp" label="CSharp">
  This is a banana 🍌
</TabItem>
<TabItem value="javascript" label="Javascript">
    This is a banana 🍌
</TabItem>
<TabItem value="clojure" label="Clojure">
    This is a banana 🍌
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

<details><summary>Rate Limiting HTTP Requests</summary>
<p>
add details
</p>
</details>

## More...
##### Configure retries for the task.
##### Configure template for the input.