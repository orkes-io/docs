---
sidebar_position: 15
---

# JSON JQ Transform Task

### Introduction

JSON_JQ_TRANSFORM_TASK is a System task that allows processing of JSON data that is supplied to the task, by using the
popular JQ processing tool’s query expression language.

Check the [JQ Manual](https://stedolan.github.io/jq/manual/v1.5/), and the
[JQ Playground](https://jqplay.org/) for more information.

### Use Cases

JSON is a popular format of choice for data-interchange. It is widely used in web and server applications, document
storage, API I/O etc. It’s also used within Conductor to define workflow and task definitions and passing data and state
between tasks and workflows. This make a tool like JQ a natural fit for processing tasks data. Some common usages within
conductor include working with HTTP task, JOIN tasks or standalone tasks that try to transform data from the output of
one task to the input of another.

### How is it defined?

JSON JQ Transform task is defined directly inside the workflow with
`"type":"JSON_JQ_TRANSFORM"`.

### Configuration

Here is an example of a JSON_JQ_TRANSFORM task. The *inputParameters* attribute is expected to have a value object that
has the following

1. A list of key value pair objects denoted key1/value1, key2/value2 in the example below. Note the key1/value1 are
   arbitrary names used in this example.
2. A key with the name *queryExpression*, whose value is a JQ expression. The expression will operate on the value of
   the *inputParameters* attribute. In the example below, the inputParameters has 2 inner objects named by attributes *
   key1* and *key2*, each of which has an object that is named *value1* and *value2* that has an associated array of
   strings as values, "a", "b" and

```json
{
  "name": "jq_example_task",
  "taskReferenceName": "my_jq_example_task",
  "type": "JSON_JQ_TRANSFORM",
  "inputParameters": {
    "key1": {
      "value1": [
        "a",
        "b"
      ]
    },
    "key2": {
      "value2": [
        "c",
        "d"
      ]
    },
    "queryExpression": "{ key3: (.key1.value1 + .key2.value2) }"
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
      "arr": [
        "a",
        "b"
      ]
    },
    "in2": {
      "arr": [
        "c",
        "d"
      ]
    },
    "queryExpression": "{ out: (.in1.arr + .in2.arr) }"
  },
  "outputData": {
    "result": {
      "out": [
        "a",
        "b",
        "c",
        "d"
      ]
    },
    "resultList": [
      {
        "out": [
          "a",
          "b",
          "c",
          "d"
        ]
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

