---
title: "No Op Task"
description: "No-Op Task — a pass-through task in Conductor workflows useful for routing, placeholder steps, and workflow testing."
canonical_route: "reference-docs/system-tasks/noop"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, workflow tasks, workflow workers, task queues"
---

# No Op Task
```json
"type" : "NOOP"
```

The No Op task (NOOP) is a no-op task. It can be used in Switch tasks in cases where there are switch cases that require no action.

## JSON configuration

Here is the task configuration for a No Op task.

```json
{
	"name": "noop",
    "taskReferenceName": "noop_ref",
	"inputParameters": {},
	"type": "NOOP"
}
```

## When to use NOOP

Use `NOOP` when a workflow branch needs an explicit successful step but does not need to call a worker, system task, or external service. It is useful as a default branch in a `SWITCH`, a placeholder while building workflow definitions, or a safe join point for generated workflows.
