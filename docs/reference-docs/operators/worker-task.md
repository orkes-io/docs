---
sidebar_position: 7
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Worker Task (Simple Task)

A Simple task is a Worker task that requires an external worker for polling. The Workers can be implemented in any language, and Conductor SDKs provides additional features such as metrics, server communication, and polling threads that make the worker creation process easier.

## Definitions

```json
{
 "name": "workflow_name",
 "description": "Edit or extend this sample workflow. Set the workflow name to get started",
 "version": 1,
 "tasks": [
   {
     "name": "task_name",
     "taskReferenceName": "task_name_ref",
     "inputParameters": {},
     "type": "SIMPLE"
   }
 ]
}

```

## Examples

In our getting started guide - there is a complete [example](/content/getting-started/adding-custom-code-worker) of how to add and run a custom worker task.

## Worker Task Definition

Refer to this [api](/content/reference-docs/api/metadata/creating-task-definitions) for the metadata of a task definition