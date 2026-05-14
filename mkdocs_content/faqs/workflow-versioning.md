---
title: "Managing Workflow Versions"
description: "Learn how workflow versioning allows you to safely update workflows and manage multiple workflow versions in production in Orkes Conductor."
canonical_route: "faqs/workflow-versioning"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Managing Workflow Versions

Workflow versions let you evolve a workflow without breaking existing executions or clients. This page is kept at its original URL for compatibility; the current full guide is [Versioning Workflows](/content/developer-guides/versioning-workflows).

!!! tip "5-minute path"
    Create a new version for behavior changes, pin callers when stable behavior matters, let running executions finish on their original snapshot, and use restart/rerun deliberately when recovering old executions.

## Creating new workflow versions

The workflow `version` field identifies the definition version.

```json
{
  "name": "order_fulfillment",
  "description": "Fulfill customer orders",
  "version": 2,
  "schemaVersion": 2,
  "tasks": []
}
```

Create a new version when task order, branching, input/output contract, retries, compensation behavior, or downstream side effects change. Small metadata-only edits can often stay on the same version, but production behavior changes should usually be versioned.

## Editing workflow versions

Each version can be edited independently. Treat edits to an existing version carefully because new executions that explicitly request that version may pick up the changed definition.

Safer production pattern:

1. Create a new version.
2. Test it with representative inputs.
3. Move callers or schedules to the new version.
4. Keep the old version available while older clients or executions still need it.

## Running workflow versions

If a start request omits the version, Conductor uses the latest version. If the caller specifies a version, Conductor starts that version.

```json
{
  "name": "order_fulfillment",
  "version": 2,
  "input": {
    "orderId": "ORD-1001"
  }
}
```

Pin versions for API clients, schedules, and mission-critical automations when surprise behavior changes would be risky. Use latest only when callers intentionally track the newest definition.

Learn more about runtime behavior in [Workflow Versioning and Upgrades at Runtime](/content/developer-guides/workflow-version-behavior-on-execution).

## Deleting workflow versions

Delete old versions only when no clients, schedules, tests, or operational runbooks need them. Running executions that already started from a deleted version continue from their execution snapshot, but no new execution can start from the deleted version.

Before deleting, check:

- API clients that specify a version.
- Schedules pinned to the version.
- Regression tests that use the version.
- Recovery procedures that restart old executions.
