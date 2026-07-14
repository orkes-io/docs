---
title: "Receive Events"
description: "Trigger workflows or resume waiting executions from webhooks, event handlers, and external event sources in Orkes Conductor."
canonical_route: "category/event-driven-orchestration/receive-events"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Receive Events, event-driven orchestration, webhooks"
---

# Receive Events

Trigger workflows or resume waiting executions from webhooks, event handlers, and external event sources.

Use these pages when external events should start a workflow, resume a waiting workflow, or update execution state.

Choose webhooks for HTTP callbacks, event handlers for broker/internal event sinks, and the Wait for Webhook task for long-running external callbacks.

## Wait for Webhook Task

The Wait for Webhook task pauses a workflow until a matching external callback arrives, then resumes execution with the callback payload. Use it when a workflow needs to wait on an asynchronous, long-running external process — such as a third-party approval, payment confirmation, or human review — before continuing, and see the [Wait for Webhook Task reference](/content/reference-docs/system-tasks/wait-for-webhook) for the matching criteria, timeout behavior, and payload schema.


## In this section

- [Webhooks](/content/developer-guides/webhook-integration)
- [Event Handlers](/content/developer-guides/event-handler)
