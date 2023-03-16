---
sidebar_position: 1
---

# Overview

Workflow = {Tasks + Operators}

Conductor workflows are a composition of Tasks and Operators. An operator in a workflow is your programming language construct such as switch, loop, fork/join or a return statement. A task represents business logic execution such as making an HTTP call, sending email, or doing some custom work such as processing data files or executing some business logic.

Tasks are executed by Workers that run outside of the Conductor server deployment. Conductor is agnostic to how the workers are deployed and run and provides lightweight SDKs in all major languages that allows you to expose existing functionality as Conductor Workers.

Workers can run on bare metal, on containers, VMs, or as serverless functions.

Conductor also provides pre-built workers for most commonly used tasks called [system tasks](/content/docs/getting-started/concepts/system-tasks).

## A sample workflow

Here's a sample workflow with one operator and two tasks. The [SWITCH](/content/docs/reference-docs/switch-task) operator decides to send the deployment to either AWS or Azure based on the input parameter. Our two deployment tasks `deploy_to_azure` and `deploy_to_aws` are simple tasks (will run with external workers).

<p align="center"><img src="/content/img/sample_workflow.jpg" alt="Diagram of a sample workflow" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Here is the JSON definition for this workflow:

```json
{
  "name": "example_workflow",
  "version": 1,
  "tasks": [
    {
      "name": "switch_case",
      "taskReferenceName": "switch_case",
      "inputParameters": {
        "switchCaseValue": "${workflow.input.service}"
      },
      "type": "SWITCH",
      "decisionCases": {
        "AZURE": [
          {
            "name": "deploy_to_azure",
            "taskReferenceName": "deploy_to_azure",
            "inputParameters": {},
            "type": "SIMPLE"
          }
        ]
      },
      "defaultCase": [
        {
          "name": "deploy_to_aws_1",
          "taskReferenceName": "deploy_to_aws",
          "inputParameters": {},
          "type": "SIMPLE"
        }
      ],
      "evaluatorType": "value-param",
      "expression": "switchCaseValue"
    }
  ],

  "schemaVersion": 2
}
```
