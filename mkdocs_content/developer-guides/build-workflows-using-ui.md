---
title: "Build Workflows Using Conductor UI"
description: "Learn how to build workflows in Orkes Conductor using the visual workflow builder or Assistant to add tasks, configure parameters, and run workflows."
---

# Build Workflows Using Conductor UI

This page is kept at its original URL for compatibility. For production workflow design paths, start with [Workflows](/content/developer-guides/workflows) and [Write Workflows Using Code](/content/developer-guides/write-workflows-using-code).

Use the UI when visual modeling, review, or debugging is useful. Use workflow-as-code or metadata APIs when definitions should be generated, tested, reviewed, and deployed from CI/CD.

!!! tip "5-minute path"
    Create a workflow, add tasks, configure task inputs and workflow outputs, save a version, run a test execution, then export or deploy the definition through your normal release process.

## Using visual workflow builder

The visual workflow builder lets you create and inspect workflow graphs without hand-authoring every JSON field.

Use it for:

- Prototyping new workflow shapes.
- Reviewing task order and branching with non-code stakeholders.
- Inspecting task configuration while debugging.
- Creating a first version before moving the definition into source control.

### Create workflows using visual workflow builder

Recommended workflow-building sequence:

1. Define the workflow name, version, owner, and expected input parameters.
2. Add tasks in execution order.
3. Set each task's `taskReferenceName` to a stable unique value.
4. Wire task inputs from workflow input, prior task output, variables, secrets, or environment variables.
5. Configure retries, timeouts, rate limits, and optional behavior.
6. Configure workflow output parameters.
7. Save and run a test execution.
8. Export or register the definition through CI/CD for production use.

Production checklist:

- Use [schema validation](/content/developer-guides/schema-validation) for externally supplied inputs.
- Use [masked parameters](/content/developer-guides/masking-parameters) for sensitive values.
- Keep complex business logic in [workers](/content/developer-guides/using-workers), not long inline scripts.
- Create a new [workflow version](/content/developer-guides/versioning-workflows) for behavior changes.

## Using assistant

The Assistant can help create, explain, debug, and search workflows when enabled for your cluster. Treat generated workflow definitions like any other production change: review the JSON, test the behavior, and deploy through your normal process.

!!! info
    Assistant availability depends on your Orkes environment. Contact your Orkes representative if it is not enabled.

### Accessing the Assistant

Assistant capabilities depend on where it is opened:

| Context | Common use |
| ------- | ---------- |
| Workflow builder | Generate or modify workflow definitions, add tasks, explain configuration, and create worker scaffolds. |
| Execution details | Explain failures, compare runs, inspect inputs/outputs, and suggest recovery actions. |
| Execution search | Query past executions using natural language. |
| Workflow definitions | Search the workflow catalog and summarize workflow structure. |

### Capabilities by context

The Assistant is most useful for exploration and first drafts. It should not replace engineering review for production behavior, permissions, data contracts, or failure handling.

#### Workflow Builder

Use the Assistant to draft workflows, add tasks, update configuration, generate worker examples, and explain task wiring. After generation, verify the workflow definition, task names, schemas, and failure behavior.

#### Execution details

Use Assistant output as debugging guidance. Confirm root cause by inspecting the actual task input, output, status, retry count, and failure reason in the execution data.

### Execution search

Use natural-language queries to find relevant executions, then open specific workflow IDs for authoritative execution details.

#### Workflow search

Use workflow search to explore definitions, identify ownership, and find examples before creating a new workflow.

#### General help

For implementation details, prefer the specific developer guide or API reference linked from the Assistant response.
