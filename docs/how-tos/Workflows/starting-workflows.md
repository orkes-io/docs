---
sidebar_position: 1
---

# Starting Workflow Executions


Workflow executions can be started by using the Conductor Dashboard, or via API:


The API endpoint is:
```http request
POST /api/workflow/{name}
```

The Parameters for each workflow execution are as follows (with how to use them in the API and a description):


|Parameter|API usage|Description|
|--|--|--|
|`{name}`| URL path|The workflow that is to be started. |
| version| URL query string| The default version is the highest version number.|
|priority| URL query string|  [Details Below](#workflowPriority)|
|correlationId| URL query string| A correlationId can be added to a workflow as a way of filtering your executions.|
|| POST Body| The POST Body will have all the input parameters for the workflow execution. This can be empty.|


#### Workflow Priority
The workflowPriority is an integer from 1-99, with 1 being highest priority, and 99 the lowest.  If there are multiple workflow executions in the queue at the same time, the workflow execution with the lowest priority is selected. 

The default value for priority is 0, which corresponds to a priority of 100 (i.e. if no priority is assigned, the execution goes to the end of the line.)


### Using Client SDKs

Conductor offers client [SDKs](/content/docs/how-tos/SDKs) for popular languages which has library methods that can be used to make this API call.
Refer to the SDK documentation to configure a client in your selected language to invoke workflow executions.

### Example using curl


This example uses a locally installed version of Conductor:

```shell
curl 'https://localhost:8080/api/workflow/sample_workflow' \
  -H 'accept: text/plain' \
  -H 'content-type: application/json' \
  -d '{"service":"fedex"}'
```

In this example we are specifying one input param called `service` with a value of `fedex` and the name of the workflow
is `sample_workflow`.

### Example using node fetch

```javascript
fetch("https://localhost:8080/api/workflow/sample_workflow", {
    "headers": {
        "accept": "text/plain",
        "content-type": "application/json",
    },
    "body": "{\"service\":\"fedex\"}",
    "method": "POST",
});
```


