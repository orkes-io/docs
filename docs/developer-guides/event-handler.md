# Event Handler

An event handler is a way for us to receive messages into the Conductor. An event can be directed to do one of the following things:

- Start Workflow
- Update Workflow Variables
- Terminate Workflow
- Complete Task
- Fail Task

## Configuring an Event Handler

Compose the following configuration payload as per the connectivity you have already added to the Conductor instance. This payload can then be used in the UI or via API to configure. In the UI go to **Event Handlers** on the left menu. For API use ```POST /api/event ```.

```json
{
  "name": "<NAME of the EVENT HANDLER>",
  "event": "azure:<QUEUE_CONFIG_NAME>:<QUEUE_NAME>",
  "condition": "true",
  "actions": [
    {
      "action": "<ACTION>",
      <ACTION INPUT PARAMS>,
      "expandInlineJSON": false
    }
  ],
  "active": true,
  "evaluatorType": "graaljs",
  "createdBy": "boney@orkes.io"
}
```

| Parameter | Description |
| --------- | ----------- |
| name | The name of the event handler. |
| event | In the format:<p>**Type : Config Name : Queue Name**</p> <p>Example:**azure:orkes-dev-test:test_queue**</p>|
| condition |  ECMAScript (Javascript) to control the message processing. Add a JS function and return true under the condition you want this message to be processed. <p>See the example below ([How to use conditions to filter events?](#how-to-use-conditions-to-filter-events))</p> | 
| evaluatorType | Evaluator type for the condition fixed as - **graaljs**. | 
| actions | Array of actions.|
| actions.action | Selected *Action Name*, possible values are:<ul><li>fail_task</li><li>update_workflow_variables</li><li>terminate_workflow</li><li>complete_task</li><li>start_workflow</li></ul> |
| ACTION INPUT PARAMS | Each type of action requires and supports a certain set of input parameters. See the actions section below for the fields per action. |
| active | Set this to true or false. It determines if the event handler is running or not. |

## How to use conditions to filter events?

Given the following payload in the message:

```json
{
    "fileType": "AUDIO",
    "version": 3,
    "metadata": {
       "length": 300,
       "codec": "aac"
    }
}
```

The following expressions can be used in condition with the indicated results:

| Expression | Result |
| ---------- | ------ |
| $.version > 1 | true |
| $.version > 10 | false |
| $.metadata.length == 300 | true |

:::note
In order to pass complete payload, `${$}` has to be used as value
:::

## Actions - Start Workflow

This action will start a new instance of a workflow that is defined in the system. Example payload:

```json
{
  "name": "orkes-dev-test",
  "event": "azure:orkes-dev-test:test_queue",
  "condition": "true",
  "actions": [
    {
      "action": "start_workflow",
      "start_workflow": {
        "name": "sample_wf",
        "version": "",
        "correlationId": "",
        "input": {
          "metadata": "${metadata}",
          "additionalVariable": "something" ,
          "payload" : "${$}"
        }
      },
      "expandInlineJSON": false
    }
  ],
  "active": true,
  "evaluatorType": "javascript",
  "createdBy": "boney@orkes.io"
}
```

## Actions - Update Workflow Variables

This action will update the variables of a running workflow. Useful to control the inputs used in a long running workflow. Example payload:

```json
{
  "name": "orkes-dev-test",
  "event": "azure:orkes-dev-test:test_queue",
  "condition": "true",
  "actions": [
    {
      "action": "update_workflow_variables",
      "expandInlineJSON": false,
      "update_workflow_variables": {
        "workflowId": "${targetWorkflowId}",
        "appendArray": true,
        "variables": {
          "Some-Key-aqxep": "${workflowId}",
          "Some-Key-b08ll": "Some-Value-b08ll"
        }
      }
    }
  ],
  "active": true,
  "evaluatorType": "javascript",
  "createdBy": "boney@orkes.io"
}
```

| Input Field Name | Behavior |
| ---------------- | -------- |
| appendArray | If this field is set to true, then if the variable that is being updated is an array, the system will append the incoming value of the existing array.<p>If this field is false, the value is set directly as is.</p> |
| workflowId | Workflow ID of which the variables should be updated. |

## Actions - Terminate Workflow

This action will terminate a running workflow. Example payload:

```json
{
  "name": "orkes-dev-test",
  "event": "azure:orkes-dev-test:test_queue",
  "condition": "true",
  "actions": [
    {
      "action": "terminate_workflow",
      "expandInlineJSON": false,
      "terminate_workflow": {
        "workflowId": "${workflowId}",
        "terminationReason": "Testing termination from an event"
      }
    }
  ],
  "active": true,
  "evaluatorType": "javascript",
  "createdBy": "boney@orkes.io"
}
```

| Input Field Name | Behavior |
| ---------------- | -------- |
| terminationReason | The reason to set when terminating the workflow. | 
| workflowId | ID of the workflow to be terminated. | 

## Actions - Complete Task

This action will mark a running task as completed. Example payload:

```json
{
  "name": "orkes-dev-test",
  "event": "azure:orkes-dev-test:test_queue",
  "condition": "true",
  "actions": [
    {
      "action": "complete_task",
      "expandInlineJSON": false,
      "complete_task": {
        "workflowId": "${workflowId}",
        "taskRefName": "${taskReferenceName}",
        "output": {
          "Some-Key-a8gvu": "Some-Value-a8gvu",
          "Some-Key-moua4": "Some-Value-moua4"
        }
      }
    }
  ],
  "active": true,
  "evaluatorType": "javascript",
  "createdBy": "boney@orkes.io"
}
```

| Input Field Name | Behavior |
| ---------------- | -------- |
| taskRefName | The task reference name of the task to be updated. |
| workflowId | The workflow ID that contains the task. | 
| taskId | If this field is present, this takes precedence and will complete a task running with this ID.<p>Example: **"taskId": "${event.payload.taskId}",**</p> | 

## Actions - Fail Task 

This action will mark a running task as failed. Example payload:

```json
{
  "name": "orkes-dev-test",
  "event": "azure:orkes-dev-test:test_queue",
  "condition": "true",
  "actions": [
    {
      "action": "fail_task",
      "expandInlineJSON": false,
      "fail_task": {
        "workflowId": "${workflowId}",
        "taskRefName": "${taskReferenceName}",
        "output": {
          "Some-Key-5u0xj": "Some-Value-5u0xj",
          "Some-Key-r3pja": "Some-Value-r3pja"
        }
      }
    }
  ],
  "active": true,
  "evaluatorType": "javascript",
  "createdBy": "boney@orkes.io"
}
```

| Input Field Name | Behavior |
| ---------------- | -------- |
| taskRefName | The task reference name of the task to be failed. |
| workflowId | The workflow ID that contains the task. | 
| taskId | If this field is present, this takes precedence and will fail a task running with this id.<p>**Example: "taskId": "${event.payload.taskId}"**</p> | 
