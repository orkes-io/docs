---
sidebar_position: 3
---

# HTTP Task

### What is HTTP Task?

An HTTP task is used to
1. Make calls to another microservice
2. Fetch any resource or data present on an endpoint

### What is a common HTTP Task use case?

If there is a scenario where, we need to make a call to a microservice and
fetch some data or resource and use it inside our workflow. In such cases
HTTP Task would very helpful.


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
      "type": "HTTP",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": []
    }
```

#### Output

1. `"response"`	: JSON body containing the response if one is present
2. `"headers"` : Response Headers
3. `"statusCode"` : Http Status Code
4. `"reasonPhrase"` : Http Status Code's reason phrase

### What are the configuration options?

In the above example, we have defined HTTP task with the following parameters.

1. `"name"` : Name of the HTTP task

2. `"taskReferenceName"` : This is a reference to this HTTP task in this specific workflow implementation.

3. `"inputParameters"` : These are the inputs into your HTTP task. You can hard code inputs. You can
   also provide dynamic inputs such as from the workflow input or based on the output of another worker. You can find
   examples of this in our documentation.

4. `"type"` : This is what defines what the type of worker is. In our example - this is `HTTP`. There are more task
   types which you can find in the Conductor documentation.

5. `"http_request"` : This consists of JSON object with the following properties.

   a. `"uri"` : URI for the service.
   
   b. `"method"` : HTTP method. One of the GET, POST, PUT, DELETE, OPTIONS, HEAD.
   
   c. `"contentType"` : Content Type - supported types are `text/plain`, `text/html` and `application/json` (Default).
   
   d. `"accept"` : Accept headers as required by server. Defaults to `"application/json"`
   
   e. `"headers"` : A map of additional http headers to be sent along with the request.
   
   f. `"body"` : Request body
   
   g. `"vipAddress"` : When using discovery based service URLs.
   
   h. `"asyncComplete"` : `false` to mark status COMPLETED upon execution ; `true` to keep it IN_PROGRESS, wait for an external event (via Conductor or SQS or EventHandler) to complete it.
   
   i. `"oauthConsumerKey"` : OAuth client consumer key
   
   j. `"oauthConsumerSecret"` : OAuth client consumer secret
   
   h. `"connectionTimeOut"` : Connection Time Out in milliseconds. If set to 0, equivalent to infinity. Default: 100.
   
   i. `"readTimeOut"` : Read Time Out in milliseconds. If set to 0, equivalent to infinity. Default: 150.


### Example Workflow Definition

Following is the example of HTTP task with `GET` method.

```json

{
      "name" : "Get Example",
      "taskReferenceName": "get_example",
      "inputParameters": {
        "http_request": {
          "uri": "https://jsonplaceholder.typicode.com/posts/1",
          "method": "GET"
        }
      },
        "type": "HTTP",
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "joinOn": [],
        "optional": false,
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": []           
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
      "type": "HTTP",
     "decisionCases": {},
     "defaultCase": [],
     "forkTasks": [],
     "startDelay": 0,
     "joinOn": [],
     "optional": false,
     "defaultExclusiveJoinTask": [],
     "asyncComplete": false,
     "loopOver": []
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
        "type": "HTTP",
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "joinOn": [],
        "optional": false,
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": []
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
     "type": "HTTP",
     "decisionCases": {},
      "defaultCase": [],
     "forkTasks": [],
     "startDelay": 0,
     "joinOn": [],
     "optional": false,
     "defaultExclusiveJoinTask": [],
     "asyncComplete": false,
     "loopOver": []
}
```

In order to implement HTTP task in our workflow, we need to define HTTP task as 
shown above under the tasks section in the workflow.





### FAQs




