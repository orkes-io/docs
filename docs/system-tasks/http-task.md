---
sidebar_position: 3
---

# HTTP Task

### What is HTTP Task?

An HTTP task is useful when you have a requirements such as

1. Making calls to another service that exposes an API via HTTP
2. Fetch any resource or data present on an endpoint

### What is a common HTTP Task use case?

If there is a scenario where, we need to make a call to a microservice and fetch some data or resource and use it inside
our workflow. In such cases HTTP Task would very helpful. Using HTTP tasks you can avoid having to write the code that
talks to these services and instead let Conductor manage it directly. This can reduce the code you have to maintain and
allows for a lot of flexibility.

### How is it defined?

HTTP task is defined directly inside the workflow with type `HTTP`.

```json
    {
  "name": "get_population_data",
  "taskReferenceName": "get_population_data",
  "inputParameters": {
    "http_request": {
      "uri": "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
      "method": "GET"
    }
  },
  "type": "HTTP"
}
```

### What are the configuration options?

In the above example, we have defined HTTP task with the following parameters.

1. `"name"` : Name of the HTTP task

2. `"taskReferenceName"` : This is a reference to this HTTP task in this specific workflow implementation.

3. `"inputParameters"` : These are the inputs into your HTTP task. You can hard code inputs. You can also provide
   dynamic inputs such as from the workflow input or based on the output of another worker. You can find examples of
   this in our documentation.

4. `"type"` : This is what defines what the type of worker is. In our example - this is `HTTP`. There are more task
   types which you can find in the Conductor documentation.

5. `"http_request"` : Please see the table below for detailed reference

|Name|Type|Example|Description|
|---|---|---|---|
| uri | String || URI for the service. Can be a partial when using vipAddress or includes the server address.|
| method | String || HTTP method. One of the GET, PUT, POST, DELETE, OPTIONS, HEAD|
| accept | String || Accept header as required by server. Defaults to ```application/json``` |
| contentType | String || Content Type - supported types are ```text/plain```, ```text/html```, and ```application/json``` (Default)|
| headers| Map[String, Any] || A map of additional http headers to be sent along with the request.|
| body| Map[] || Request body |
| vipAddress | String || When using discovery based service URLs.|
| asyncComplete | Boolean |TODO: Link to details| ```false``` to mark status COMPLETED upon execution ; ```true``` to keep it IN_PROGRESS, wait for an external event (via Conductor or SQS or EventHandler) to complete it.
| oauthConsumerKey | String || [OAuth](https://oauth.net/core/1.0/) client consumer key  |
| oauthConsumerSecret | String || [OAuth](https://oauth.net/core/1.0/) client consumer secret |
| connectionTimeOut | Integer || Connection Time Out in milliseconds. If set to 0, equivalent to infinity. Default: 100. |
| readTimeOut | Integer || Read Time Out in milliseconds. If set to 0, equivalent to infinity. Default: 150. |

#### Output

1. `"response"` : JSON body containing the response if one is present
2. `"headers"` : Response Headers
3. `"statusCode"` : Http Status Code
4. `"reasonPhrase"` : Http Status Code's reason phrase

### Example Workflow Definition

Following is the example of HTTP task with `GET` method.

```json

{
  "name": "Get Example",
  "taskReferenceName": "get_example",
  "inputParameters": {
    "http_request": {
      "uri": "https://jsonplaceholder.typicode.com/posts/1",
      "method": "GET"
    }
  },
  "type": "HTTP"
}
```

Following is the example of HTTP task with `POST` method.

```json
{
  "name": "POST Example",
  "taskReferenceName": "post_example",
  "inputParameters": {
    "http_request": {
      "uri": "https://jsonplaceholder.typicode.com/posts/",
      "method": "POST"
    }
  },
  "type": "HTTP"
}
```

Following is the example of HTTP task with `PUT` method.

```json
{
  "name": "PUT Example",
  "taskReferenceName": "put_example",
  "inputParameters": {
    "http_request": {
      "uri": "https://jsonplaceholder.typicode.com/posts/1",
      "method": "PUT"
    }
  },
  "type": "HTTP"
}
```

Following is the example of HTTP task with `DELETE` method.

```json
{
  "name": "DELETE Example",
  "taskReferenceName": "delete_example",
  "inputParameters": {
    "http_request": {
      "uri": "https://jsonplaceholder.typicode.com/posts/1",
      "method": "DELETE"
    }
  },
  "type": "HTTP"
}
```

In order to implement HTTP task in our workflow, we need to define HTTP task as shown above under the tasks section in
the workflow. We can choose our method type and specify all the attributes.

### FAQs

TODOs

1. Convert the documentation to a table format, link to examples
2. Describe how to use asyncComplete
3. Example for OAuth, scenarios where it is useful
4. Examples and details of how timeouts work
5. Describe what vipAddress is (internal to Netflix)
6. Add additional FAQ questions





