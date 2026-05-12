---
title: "Workflows"
description: "Design Orkes Conductor workflows: choose a build path, connect tasks, version safely, and add production controls without memorizing every JSON field."
---

# Workflows

A workflow is the durable execution plan for a business process, AI agent, API flow, or data pipeline. It decides which tasks run, how data moves between them, and what happens when something waits, retries, fails, or needs human input.

Conductor stores the executable workflow as a workflow definition, but you do not have to author every workflow directly in JSON. Use the UI, SDKs, APIs, BPMN import, or generated definitions, then let Conductor persist state and coordinate execution at scale.

!!! tip "5-minute path"
    For a first run, use the [Quickstart](/content/quickstarts). For production design, choose task types, wire inputs and outputs, add retries and timeouts, then version and test the workflow before rollout.

## When to use a workflow

Use a workflow when the process needs durable state, retries, visibility, branching, fan-out, waiting, human review, or coordination across services. Common examples include order fulfillment, onboarding, document processing, RAG pipelines, agent tool execution, API orchestration, and remediation workflows.

Keep domain logic in workers or services when it is complex, private, or heavily tested in application code. The workflow should coordinate the process; workers should perform the business logic.

## Ways to create workflows

| Need | Use | Start here |
| ---- | --- | ---------- |
| Complex or dynamic workflow graphs owned by an engineering team | SDK workflow-as-code | [Write Workflows Using Code](/content/developer-guides/write-workflows-using-code) |
| Visual design, review, or debugging with non-code collaborators | Conductor UI or Assistant | [Build Workflows Using UI](/content/developer-guides/build-workflows-using-ui) |
| CI/CD registration, generated definitions, or platform automation | Metadata API | [Create Workflow Definition API](/content/reference-docs/api/metadata/creating-workflow-definition) |
| Existing BPMN processes that should move into Conductor | BPMN importer | [Convert BPMN to Workflows](/content/developer-guides/convert-bpmn-to-workflows) |
| Agentic workflows where the plan can vary by request | Workflow-as-code, dynamic tasks, or sub-workflows | [AI Orchestration](/content/ai-orchestration) |

## Workflow building blocks

| Building block | What it does | Related guide |
| -------------- | ------------ | ------------- |
| Inputs | Defines the request data the workflow expects | [Executing Workflows](/content/developer-guides/running-workflows) |
| Tasks | Performs work or controls execution | [Tasks in Workflows](/content/developer-guides/tasks) |
| Workers | Runs custom code outside Conductor for SIMPLE tasks | [Writing Workers](/content/developer-guides/using-workers) |
| Operators | Branches, loops, joins, waits, starts sub-workflows, and terminates flows | [Operators Reference](/content/category/reference-docs/operators) |
| Outputs | Shapes the final workflow result | [Workflow Definition Reference](/content/reference-docs/workflow-definition) |
| Versions | Controls which definition future executions use | [Versioning Workflows](/content/developer-guides/versioning-workflows) |
| Triggers | Starts or resumes workflows from APIs, schedules, events, webhooks, or signals | [Executing Workflows](/content/developer-guides/running-workflows) |
| Controls | Adds retries, timeouts, rate limits, schemas, masking, and permissions | [Handling Failures](/content/error-handling) |

## Workflow definition

A workflow definition is the portable execution format Conductor stores and runs. You only need to understand the shape here; use the [Workflow Definition Reference](/content/reference-docs/workflow-definition) for the full schema.

```json
{
  "name": "order_status_lookup",
  "description": "Look up an order status and return the normalized result.",
  "version": 1,
  "schemaVersion": 2,
  "ownerEmail": "team@example.com",
  "inputParameters": ["orderId"],
  "tasks": [
    {
      "name": "get_order_status",
      "taskReferenceName": "get_order_status",
      "type": "HTTP",
      "inputParameters": {
        "http_request": {
          "method": "GET",
          "uri": "https://api.example.com/orders/${workflow.input.orderId}"
        }
      }
    }
  ],
  "outputParameters": {
    "status": "${get_order_status.output.response.body.status}"
  }
}
```

The fields you will use most are `name`, `version`, `schemaVersion`, `inputParameters`, `tasks`, `outputParameters`, and `ownerEmail`. Production workflows usually also define failure handling, timeouts, schemas, masking, and rate limits.

## Static, dynamic, and agentic workflows

You can register a static workflow definition when the graph is known ahead of time. This is the right default for recurring business processes, APIs, scheduled jobs, and flows that need controlled rollout.

Use dynamic workflows when the graph depends on runtime data, tenant configuration, or a planner step. Dynamic workflows are still durable Conductor executions; the difference is that the definition is assembled or selected at runtime.

Agentic workflows use LLMs, tools, memory, retrieval, human review, and deterministic tasks inside a durable execution graph. Conductor makes these workflows observable, retryable, permissioned, and recoverable instead of leaving the agent loop inside one process.

## Production checklist

- [Version the workflow](/content/developer-guides/versioning-workflows) before changing behavior that existing executions depend on.
- Configure [retries, timeouts, and compensation workflows](/content/error-handling) for failure paths.
- Make [workers idempotent](/content/idempotency) because retries and redelivery can run the same task more than once.
- Add [schema validation](/content/developer-guides/schema-validation) at workflow and task boundaries when inputs come from users, APIs, agents, or external systems.
- Use [rate limits](/content/rate-limits) for shared services and high-volume flows.
- Protect sensitive values with [secrets](/content/developer-guides/secrets-in-conductor), [environment variables](/content/developer-guides/using-environment-variables), and [masked parameters](/content/developer-guides/masking-parameters).
- Use [RBAC](/content/category/access-control-and-security) to control who can read, run, update, or administer workflows.
- Add [tests](/content/developer-guides/unit-and-regression-tests), [execution search](/content/developer-guides/debugging-workflows), and [metrics](/content/developer-guides/metrics-and-observability) before relying on the workflow in production.

## Next pages

- [Write Workflows Using Code](/content/developer-guides/write-workflows-using-code)
- [Tasks in Workflows](/content/developer-guides/tasks)
- [Versioning Workflows](/content/developer-guides/versioning-workflows)
- [Executing Workflows](/content/developer-guides/running-workflows)
- [Workflow Definition Reference](/content/reference-docs/workflow-definition)
