---
title: Assess migration from your current orchestration stack
description: Evaluate one workflow migration with Orkes. Review execution semantics, worker and API integrations, approvals, deployment requirements, and an incremental pilot.
---

# Assess migration from your current orchestration stack

Before moving a production workflow, identify what must stay compatible. Bring one flow from your current orchestration platform or custom service for a 30-minute technical discussion with Orkes.

<p><button type="button" class="orkes-offer-button" data-orkes-demo data-docs-demo-placement="offer_hero" data-docs-guide="migration-assessment" data-orkes-offer="migration">Request a migration assessment</button></p>

Not ready for a conversation? [Try Developer Edition](https://developer.orkescloud.com/) and [build your first workflow](/content/quickstart).

## Start with one workflow

- **Map the current behavior:** state transitions, retries, timeouts, compensation, and human approvals.
- **Keep the integration boundary clear:** existing workers and APIs, authentication requirements, and events that start or resume execution.
- **Identify migration risks:** in-flight work, duplicate side effects, data retention, observability, and rollback.
- **Define a small pilot:** one representative flow, explicit success criteria, and the constraints that would stop a migration.

The outcome is a set of compatibility questions and a proposed evaluation path. We will establish what needs adaptation before discussing a wider rollout. We do not assume a drop-in replacement or a particular cost saving.

## Prepare for the discussion

Share the orchestration system you use, the workflow's purpose, and the reason you are considering a change. A sanitized diagram is useful; no source code, credentials, or customer payloads are needed in the request.

## Inspect the target execution model

Review [workflow execution](/content/developer-guides/running-workflows), [failure handling](/content/ai-cookbook/failure-semantics), and [human tasks](/content/developer-guides/orchestrating-human-tasks). Use these to identify which behavior your pilot needs to preserve.

## What happens next

The Orkes team will confirm your starting point and arrange a discussion. Submitting the request does not schedule a meeting or commit you to a migration.

<p><button type="button" class="orkes-offer-button" data-orkes-demo data-docs-demo-placement="offer_end" data-docs-guide="migration-assessment" data-orkes-offer="migration">Discuss your migration</button></p>

<style>.orkes-offer-button{padding:.7rem 1.1rem;border:0;border-radius:8px;background:#6c37bd;color:#fff;font:inherit;font-weight:600;cursor:pointer}.orkes-offer-button:focus-visible{outline:3px solid #4b9eff;outline-offset:3px}</style>
