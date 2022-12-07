---
sidebar_position: 1
---

# HTTP Task

```json
"type" : "HTTP"
```

## Introduction

An HTTP task is useful when you have a requirements such as

1. Making calls to another service that exposes an API via HTTP
2. Fetch any resource or data present on an endpoint

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/ib-L46fwujE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

## Use Cases

If we have a scenario where we need to make an HTTP call into another service, we can make use of HTTP tasks. You can
use the data returned from the HTTP call in your subsequent tasks as inputs. Using HTTP tasks you can avoid having to
write the code that talks to these services and instead let Conductor manage it directly. This can reduce the code you
have to maintain and allows for a lot of flexibility.

## Configuration

HTTP task is defined directly inside the workflow with the task type `HTTP`.

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

We can use variables in our URI as show in the example below. For details on how to use inputs, refer to
the [Task Inputs page](/content/docs/how-tos/Tasks/task-inputs).

```json
{
  "name": "Get Example",
  "taskReferenceName": "get_example",
  "inputParameters": {
    "http_request": {
      "uri": "https://jsonplaceholder.typicode.com/posts/${workflow.input.queryid}",
      "method": "GET"
    }
  },
  "type": "HTTP"
}
```

Following is the example of HTTP task with `POST` method.

> Here we are using variables for our POST body which happens to be data from a previous task. This is an example of how you can **chain** HTTP calls to make complex flows happen without writing any additional code.

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

Following is the example of HTTP task with `PUT` method.

```json
{
  "name": "http_put_example",
  "taskReferenceName": "put_example",
  "inputParameters": {
    "http_request": {
      "uri": "https://jsonplaceholder.typicode.com/posts/1",
      "method": "PUT",
      "body": {
        "title": "${get_example.output.response.body.title}",
        "userId": "${get_example.output.response.body.userId}",
        "action": "doSomethingDifferent"
      }
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
### Codelabs with HTTP tasks
* [Running first workflow](/content/docs/getting-started/run/running-first-workflow) uses HTTP Task to call an API.
* [Hello World Pt.2](/content/docs/codelab/helloworld2#the-http-task) uses the HTTP task to send an IP Address and receive a location.
* [Order Fulfillment Pt 4](/content/docs/codelab/orderfulfillment4) calls an API to reorder widgets.
* [Sequential HTTP Tasks](/content/docs/codelab/sequentialHTTPtasks) Makes 2 HTTP tasks. Data from the first response is used as input in the 2nd task.


## Best Practices

1. Why are my HTTP tasks not getting picked up?
    1. We might have too many HTTP tasks in the queue. There is a concept called Isolation Groups that you can rely on
       for prioritizing certain HTTP tasks over others. Read more here: [Isolation Groups](https://conductor.netflix.com/configuration/isolationgroups.html)
2. Why is my HTTP Task timing out with ```Failed to invoke HTTP task due to: java.lang.Exception: I/O error on GET request for "<url>": Read timed out; nested exception is java.net.SocketTimeoutException: Read timed out```?
    1. The default timeout for an HTTP request is 150ms. If your API takes longer than this, you will need to increase the timeout parameters. In your ```inputParameters``` under ```http_request``` add the two following parameters (the timeouts are in milliseconds):
```json
          "connectionTimeOut": 1000,
          "readTimeOut": 1000
```

3. Can I retry my HTTP Tasks?  
    1. Yes. You can add retries, and retry parameters to your HTTP Task.

4. I'm getting rate limited.  Can I slow down my HTTP Task?
    1. Yes!  By extending system tasks and adding the following parameters:
    ```json
      "rateLimitPerFrequency": 100,
      "rateLimitFrequencyInSeconds": 60,
    ```
    2. This will allow only 100 calls to the API endpoint in 60 seconds.  Modify the values as required.