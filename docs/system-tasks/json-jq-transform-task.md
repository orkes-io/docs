---
sidebar_position: 15
---

# JSON JQ Transform Task


### What is JSON JQ Transform Task?

JSON JQ Transform task allows transforming a JSON input to another
JSON structure using a query expression.

Check the [JQ Manual](https://stedolan.github.io/jq/manual/v1.5/), and the 
[JQ Playground](https://jqplay.org/) for more information.

### What is a common JSON JQ Transform Task use case?


### How is it defined?

JSON JQ Transform task is defined directly inside the workflow with
`"type":"JSON_JQ_TRANSFORM"`.

### Example of JSON JQ Transform Task

The following definition:

```json
{
    "name": "jq_1",
    "taskReferenceName": "jq_1",
    "type": "JSON_JQ_TRANSFORM",
    "inputParameters": {
    "in1": {
      "arr": [ "a", "b" ]
    },
    "in2": {
      "arr": [ "c", "d" ]
    },
    "queryExpression": "{ out: (.in1.arr + .in2.arr) }"
    }
}
```

will produce the following execution:

```json
{
    "name": "jq_1",
    "type": "task-execution",
    "taskReferenceName": "jq_1",
    "taskType": "JSON_JQ_TRANSFORM",
    "inputData": {
        "in1": {
          "arr": [ "a", "b" ]
        },
        "in2": {
          "arr": [ "c", "d" ]
        },
        "queryExpression": "{ out: (.in1.arr + .in2.arr) }"
    },
    "outputData": {
        "result": {
            "out": ["a","b","c","d"]
        },
        "resultList": [
            {
                "out": ["a","b","c","d"]
            }
        ]
    }
}
```

Following are the parameters in the above example :

1. `"queryExpression"` : JQ query expression. Input is the entire inputParameters object.

Following are the outputs :

1. `"result"` : First result returned by the jq expression
2. `"resultList"` : List of all results returned by the jq expression
3. `"error"` : Error, if the query throws an error.

