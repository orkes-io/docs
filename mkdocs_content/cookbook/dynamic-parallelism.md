---
title: "Dynamic Parallelism"
description: "Cookbook recipes for dynamic fork patterns, runtime fan-out, same-task parallelism, and parallel sub-workflows in Orkes Conductor."
canonical_route: "cookbook/dynamic-parallelism"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, workflow cookbook, workflow recipes, Conductor examples"
---

# Dynamic parallelism

### Run different tasks in parallel (Dynamic Fork)

Use `dynamicForkTasksParam` + `dynamicForkTasksInputParamName` when each parallel branch runs a **different** task. The task list is determined at runtime by a preceding step.

```json
{
  "name": "dynamic_fork_different_tasks",
  "version": 1,
  "schemaVersion": 2,
  "tasks": [
    {
      "name": "prepare_tasks",
      "taskReferenceName": "prepare",
      "type": "INLINE",
      "inputParameters": {
        "evaluatorType": "graaljs",
        "expression": "(function() { return { dynamicTasks: [{name: 'HTTP', taskReferenceName: 'fetch_weather', type: 'HTTP'}, {name: 'HTTP', taskReferenceName: 'fetch_news', type: 'HTTP'}], dynamicTasksInput: { fetch_weather: { uri: 'https://api.weather.gov/points/39.7456,-104.9994', method: 'GET'}, fetch_news: { uri: 'https://hacker-news.firebaseio.com/v0/topstories.json', method: 'GET'}}}; })()"
      }
    },
    {
      "name": "fork_join_dynamic",
      "taskReferenceName": "dynamic_fork",
      "type": "FORK_JOIN_DYNAMIC",
      "inputParameters": {
        "dynamicTasks": "${prepare.output.result.dynamicTasks}",
        "dynamicTasksInput": "${prepare.output.result.dynamicTasksInput}"
      },
      "dynamicForkTasksParam": "dynamicTasks",
      "dynamicForkTasksInputParamName": "dynamicTasksInput"
    },
    {
      "name": "join",
      "taskReferenceName": "join_ref",
      "type": "JOIN"
    }
  ]
}
```

`dynamicTasks` is an array of task definitions (each with `name`, `taskReferenceName`, and `type`). `dynamicTasksInput` is a map keyed by each task's `taskReferenceName` containing its input payload.

**Register and run:**

```shell
curl -X POST '<YOUR-CLUSTER-URL>/api/metadata/workflow' \
  -H 'Content-Type: application/json' \
  -H "X-Authorization: $TOKEN" \
  -d @dynamic_fork_different_tasks.json

curl -X POST '<YOUR-CLUSTER-URL>/api/workflow/dynamic_fork_different_tasks' \
  -H 'Content-Type: application/json' \
  -H "X-Authorization: $TOKEN" \
  -d '{}'
```

---

### Run same task in parallel (fan-out)

Use `forkTaskName` + `forkTaskInputs` when running the **same** task type across multiple inputs.

```json
{
  "name": "fan_out_http_calls",
  "version": 1,
  "schemaVersion": 2,
  "tasks": [
    {
      "name": "fork_join_dynamic",
      "taskReferenceName": "parallel_fetch",
      "type": "FORK_JOIN_DYNAMIC",
      "inputParameters": {
        "forkTaskName": "HTTP",
        "forkTaskInputs": [
          {"uri": "https://jsonplaceholder.typicode.com/posts/1", "method": "GET"},
          {"uri": "https://jsonplaceholder.typicode.com/posts/2", "method": "GET"},
          {"uri": "https://jsonplaceholder.typicode.com/posts/3", "method": "GET"}
        ]
      }
    },
    {
      "name": "join",
      "taskReferenceName": "join_ref",
      "type": "JOIN"
    }
  ]
}
```

!!! tip
    Conductor injects `__index` into each fork's input so you can track the position of each parallel branch in the results.

**Register and run:**

```shell
curl -X POST '<YOUR-CLUSTER-URL>/api/metadata/workflow' \
  -H 'Content-Type: application/json' \
  -H "X-Authorization: $TOKEN" \
  -d @fan_out_http_calls.json

curl -X POST '<YOUR-CLUSTER-URL>/api/workflow/fan_out_http_calls' \
  -H 'Content-Type: application/json' \
  -H "X-Authorization: $TOKEN" \
  -d '{}'
```

---

### Run sub-workflows in parallel

Use `forkTaskWorkflow` + `forkTaskInputs` to fan out across instances of another workflow.

```json
{
  "name": "parallel_sub_workflows",
  "version": 1,
  "schemaVersion": 2,
  "tasks": [
    {
      "name": "fork_join_dynamic",
      "taskReferenceName": "parallel_regions",
      "type": "FORK_JOIN_DYNAMIC",
      "inputParameters": {
        "forkTaskWorkflow": "process_region",
        "forkTaskWorkflowVersion": 1,
        "forkTaskInputs": [
          {"region": "us-east-1", "data": "batch_a"},
          {"region": "eu-west-1", "data": "batch_b"},
          {"region": "ap-southeast-1", "data": "batch_c"}
        ]
      }
    },
    {
      "name": "join",
      "taskReferenceName": "join_ref",
      "type": "JOIN"
    }
  ]
}
```

Each element in `forkTaskInputs` spawns one instance of the `process_region` workflow. All results are collected at the JOIN task.

**Register and run:**

```shell
curl -X POST '<YOUR-CLUSTER-URL>/api/metadata/workflow' \
  -H 'Content-Type: application/json' \
  -H "X-Authorization: $TOKEN" \
  -d @parallel_sub_workflows.json

curl -X POST '<YOUR-CLUSTER-URL>/api/workflow/parallel_sub_workflows' \
  -H 'Content-Type: application/json' \
  -H "X-Authorization: $TOKEN" \
  -d '{}'
```
