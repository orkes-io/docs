---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Workflow Definition

## Anatomy of a Conductor workflow
A Conductor workflow models after a program and has three main components:

1. Workflow level configuration such as name, version, compensation logic etc.
2. Tasks encapsulates business logic and runs and scales independently **outside** of Conductor Server
3. Operators which are programming language constructs such as loops, decisions, parallelism, that allows you to define complex workflows and routing logic.

Tasks are implemented using **Workers** which can be implemented any any of the programming langauge.  A single workflow can have tasks written in multiple languages, making Conductor workflows polyglot.

## Example

Assume your business logic is to simply to get some shipping information and then do the shipping. You start by
logically partitioning them into two tasks:

* **Get Shipping Details**
* **Send Shipping Request**

The workflow has two tasks that are executed sequentially one after another.
:::note
Conductor adds the durability to the state of your workflows.  This means if the server or any of the workers die, the state is not lost and the execution resumes as the services come back online.
:::

##### Workflow implementation

```json
{
  "name": "shipping_workflow",
  "description": "shipping Workflow",
  "version": 1,
  "tasks": [
    {
      "name": "shipping_info",
      "taskReferenceName": "shipping_info_ref",
      "inputParameters": {
        "account": "${workflow.input.accountNumber}"
      },
      "type": "SIMPLE"
    },
    {
      "name": "shipping_task",
      "taskReferenceName": "shipping_task_ref",
      "inputParameters": {
        "name": "${shipping_info_ref.output.name}",
		"streetAddress": "${shipping_info_ref.output.streetAddress}",
		"city": "${shipping_info_ref.output.city}",
		"state": "${shipping_info_ref.output.state}",
		"zipcode": "${shipping_info_ref.output.zipcode}",
      },
      "type": "SIMPLE"
    }
  ],
  "outputParameters": {
    "trackingNumber": "${shipping_task_ref.output.trackinNumber}"
  },
  "failureWorkflow": "shipping_issues"
}
```

Upon completion of the 2 tasks, the workflow outputs the tracking number generated in the 2nd task.  If the workflow fails, a second workflow named  __shipping_issues__ is run to handle the failure scenarios.

## Fields in a Workflow

| Field                         | Description                                                                                                                              | Notes                                                                                             |
|:------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------|
| name                          | Name of the workflow                                                                                                                     ||
| description                   | Description of the workflow                                                                                                              | optional                                                                                          |
| version                       | Numeric field used to identify the version of the schema.  Use incrementing numbers                                                      | When starting a workflow execution, if not specified, the definition with highest version is used |
| tasks                         | An array of task definitions.                                                                                                            | [Task properties](#tasks-within-workflow)                                                         |
| inputParameters               | List of input parameters. Used for documenting the required inputs to workflow                                                           | optional                                                                                          |
| outputParameters              | JSON template used to generate the output of the workflow                                                                                | If not specified, the output is defined as the output of the _last_ executed task                 |
| failureWorkflow               | String; Workflow to be run on current Workflow failure. Useful for cleanup or post actions on failure.                                   | optional                                                                                          |

## Tasks within Workflow
__tasks__ property in a workflow execution defines an array of tasks to be executed in that order.

Task can be either a worker task or an operator.

| Field             | Description                                                                                                                                    | Notes                                                                   |
|:------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------|
| name              | Name of the task. MUST be registered as a task with Conductor before starting the workflow                                                     ||
| taskReferenceName | Alias used to refer the task within the workflow.  MUST be unique within workflow.                                                             ||
| type              | Type of task. SIMPLE for tasks executed by remote workers, or one of the system task types                                                     ||
| description       | Description of the task                                                                                                                        | optional                                                                |
| optional          | true or false.  When set to true - workflow continues even if the task fails.  The status of the task is reflected as **COMPLETED_WITH_ERRORS** | Defaults to **false**.                                                     |
| inputParameters   | JSON template that defines the input given to the task                                                                                         | See [Wiring Inputs and Outputs](#wiring-inputs-and-outputs) for details |

In addition to these parameters, System Tasks have their own parameters. Checkout [System Tasks](/configuration/systask.html) for more information.

## Wiring Inputs and Outputs

Workflows are supplied inputs by client when a new execution is triggered.
Workflow input is a JSON payload that is available via **${workflow.input...}** expressions.

:::info
Conductor support [JSONPath](https://www.ietf.org/archive/id/draft-goessner-dispatch-jsonpath-00.html) for field extraction.
:::

Each task in the workflow is given input based on the **inputParameters** template configured in workflow definition.  **inputParameters** is a JSON fragment with value containing parameters for mapping values from input or output of a workflow or another task during the execution.

Syntax for mapping the values follows the pattern as:

__${SOURCE.input/output.JSONPath}__

| field        | description                                                              |
|--------------|--------------------------------------------------------------------------|
| SOURCE       | can be either "workflow" or any of the task reference name               |
| input/output | refers to either the input or output of the source                       |
| JSONPath     | JSON path expression to extract JSON fragment from source's input/output |

### Example

Consider a task with input configured to use input/output parameters from workflow and a task named __loc_task__.

```json
{
  "inputParameters": {
    "movieId": "${workflow.input.movieId}",
    "url": "${workflow.input.fileLocation}",
    "lang": "${loc_task.output.languages[0]}",
    "http_request": {
      "method": "POST",
      "url": "http://example.com/${loc_task.output.fileId}/encode",
      "body": {
        "recipe": "${workflow.input.recipe}",
        "params": {
          "width": 100,
          "height": 100
        }
      },
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
  }
}
```

Consider the following as the _workflow input_

```json
{
  "movieId": "movie_123",
  "fileLocation":"s3://moviebucket/file123",
  "recipe":"png"
}
```
And the output of the _loc_task_ as the following;

```json
{
  "fileId": "file_xxx_yyy_zzz",
  "languages": ["en","ja","es"]
}
```

When scheduling the task, Conductor will merge the values from workflow input and loc_task's output and create the input to the task as follows:

```json
{
  "movieId": "movie_123",
  "url": "s3://moviebucket/file123",
  "lang": "en",
  "http_request": {
    "method": "POST",
    "url": "http://example.com/file_xxx_yyy_zzz/encode",
    "body": {
      "recipe": "png",
      "params": {
        "width": 100,
        "height": 100
      }
    },
    "headers": {
    	"Accept": "application/json",
    	"Content-Type": "application/json"
    }
  }
}
```

:::tip Escaping expressions
To escape an expression, prefix it with an extra _$_ character (ex.: **$${workflow.input...}**).
:::