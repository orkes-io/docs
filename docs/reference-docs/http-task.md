---
sidebar_position: 1
---

# Http Task

## What is a HTTP Task?

An HTTP task is useful when you have a requirements such as

1. Making calls to another service that exposes an API via HTTP
2. Fetch any resource or data present on an endpoint

## Common Use Cases

If there is a scenario where, we need to make a call to a microservice and fetch some data or resource and use it inside
our workflow. In such cases HTTP Task would very helpful. Using HTTP tasks you can avoid having to write the code that
talks to these services and instead let Conductor manage it directly. This can reduce the code you have to maintain and
allows for a lot of flexibility.

## Configuration / Properties

HTTP task is defined directly inside the workflow with type `HTTP`.

|name|type|description|
|---|---|---|
| http_request | HttpRequest | JSON object (see below) |

### Inputs

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

### Output

|name|type|description|
|---|---|---|
| response | Map |  JSON body containing the response if one is present |
| headers | Map[String, Any] | Response Headers |
| statusCode | Integer | [Http Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) |
| reasonPhrase | String | Http Status Code's reason phrase |

## Examples

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

## FAQs

TODO: Gotchas and other nuances

1. Question 1
    1. Answer

1. Question 2
    1. Answer

