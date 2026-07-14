---
title: "General FAQs"
description: "Explore answers to commonly asked questions about using Conductor and its core features."
canonical_route: "category/faqs"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# General FAQs

## Project, maintenance, and product relationship

<details class="faq-item">
<summary>Is Conductor still maintained?</summary>

Yes. Conductor OSS continues as an actively maintained open-source project under the Conductor OSS community, with Orkes contributing maintenance, engineering, documentation, and enterprise support. The original Netflix project history is part of Conductor’s origin story; the current project continues under the Conductor OSS organization.

</details>

<details class="faq-item">
<summary>Is this the same project that started at Netflix?</summary>

Yes. Conductor originated at Netflix and is now maintained under the Conductor OSS community. Orkes Conductor builds on that engine and adds managed enterprise capabilities for teams running Conductor in production.

</details>

<details class="faq-item">
<summary>What is the difference between Conductor OSS and Orkes Conductor?</summary>

Conductor OSS is the open-source durable workflow engine. Orkes Conductor is the managed, enterprise-ready version of Conductor with hosted operations, role based access control, secrets, schedules, webhooks, observability, visual debugging, integrations, and support.

</details>

<details class="faq-item">
<summary>Is Conductor an AI framework?</summary>

No. Conductor is a durable workflow engine for production AI agents and distributed systems. Use agent frameworks for reasoning, prompts, and model-specific loops; use Conductor for durable execution, persisted state, retries, timeouts, long waits, human approval, auditability, and governance.

</details>

## Setup, environments, and compliance

<details class="faq-item">
<summary>What setup options are available for Orkes Conductor?</summary>

You can use Developer Edition for quick prototyping in a browser-based sandbox, deploy Orkes Conductor on cloud clusters for production-grade environments, or run a full local stack via Docker for local development and testing. The Docker-based local setup is positioned for enterprise customers and requires an Orkes Cloud subscription plus an authorization token from Orkes.

</details>

<details class="faq-item">
<summary>Is Developer Edition free, and do I need to install anything?</summary>

Developer Edition is a free sandbox environment that lets you start building and running workflows immediately, with no installation required.

</details>

<details class="faq-item">
<summary>Can I run Orkes Conductor locally using Docker? What do I need?</summary>

Yes. Orkes provides Docker containers (including a standalone container intended for local development and testing) that include the full Orkes stack. Prerequisites include Docker, an Orkes Cloud subscription, and an authorization token provided by Orkes.

</details>

<details class="faq-item">
<summary>Is it possible to have multiple environments, such as production, staging, and review, in Conductor?</summary>

Yes, the clusters can be configured directly according to your requirements and can have production, UAT, and development environments.

</details>

<details class="faq-item">
<summary>Do you have any restrictions regarding the processing of medical data?</summary>

We offer deployment models that run the entire workload from a customer's isolated cloud account, which is HIPAA-compliant. Additionally, we can provision on-prem clusters that operate outside of a cloud stack.

</details>

## Authentication and access control

<details class="faq-item">
<summary>What is an “application” in Orkes Conductor?</summary>

An application represents a non-human identity (for example: a service, script, task worker, CI/CD pipeline) that interacts with Conductor via APIs or SDKs. Applications are the basis for application-level access control and hold access key/secret pairs for programmatic authentication.

</details>

<details class="faq-item">
<summary>How do I authenticate to the Orkes Conductor API?</summary>

Programmatic API access uses a JWT. You generate a JWT using your application key/secret (via the token API) and then pass the token on requests using the X-Authorization header. SDKs typically handle authentication automatically when configured with the application key/secret.

</details>

<details class="faq-item">
<summary>What is the user-based JWT token (Copy Token), and when should I use it?</summary>

Orkes Conductor provides a user-based JWT token for quick testing without creating an application. It’s valid only for your current session and has the same access as your user account, and it should never be used in production.

</details>

<details class="faq-item">
<summary>Why can I authenticate successfully but still not access a workflow/task?</summary>

Because authentication is not authorization, even with a valid JWT, access to resources is still controlled by the application’s roles and granular permissions. Ensure the application is configured with the correct roles and explicit permissions for the workflows, tasks, secrets, and other resources it needs.

</details>

<details class="faq-item">
<summary>What’s the difference between a user and an application?</summary>

A user is a human identity that logs in to Conductor and is assigned roles. An application is a non-human identity (service account) used for API/SDK access, with its own roles, permissions, and access keys.

</details>

<details class="faq-item">
<summary>How do groups help manage access control?</summary>

A group is a set of users. Users inherit group roles/permissions when added to a group, which makes it easier to manage access for teams. Groups can also be granted granular permissions (read, update, execute, delete) over specific resource types.

</details>

<details class="faq-item">
<summary>What are tags, and why should I use them?</summary>

Tags use a key:value format and can be applied to many resource types (workflows, tasks, schedules, secrets, webhooks, integrations, and more). They’re useful both for organizing resources and for bulk-sharing access, since permissions can be granted to a tag to cover all tagged resources.

</details>

## Workflow basics and building blocks

<details class="faq-item">
<summary>What’s the difference between a workflow definition and a workflow execution?</summary>

A workflow definition is the blueprint: task order, data flow, and runtime behavior settings. A workflow execution is a runtime instance created when a workflow is started with inputs, and it has its own unique ID and state (for example RUNNING or COMPLETED).

</details>

<details class="faq-item">
<summary>What are system tasks, operators, and worker tasks?</summary>

Conductor provides built-in system tasks and operators that are managed by Conductor and can be used without writing workers. Worker tasks are for custom logic and must be executed by your own worker code.

</details>

## Workers and task routing

<details class="faq-item">
<summary>Where can custom workers run, and what languages can I use?</summary>

Workers can be implemented in any language and deployed anywhere (containers, VMs, bare metal). A single workflow can also be polyglot, with workers implemented in different languages.

</details>

<details class="faq-item">
<summary>What happens if a worker isn’t running when a workflow reaches a worker task?</summary>

A worker task can’t execute until the worker is connected and polling. If the worker isn’t available, the task remains in the Scheduled state until a worker comes online to service it.

</details>

<details class="faq-item">
<summary>Should I separate worker applications from workflow client applications?</summary>

Yes, Orkes recommends keeping the worker application separate from the workflow client application to support well-defined access controls.

</details>

<details class="faq-item">
<summary>How can I route tasks to specific worker pools?</summary>

Use task-to-domain mapping to route tasks to specific sets of workers using domain labels. Domains are arbitrary strings that let you split traffic by application, client type, or other criteria.

</details>

## Running, triggering, and scheduling workflows

<details class="faq-item">
<summary>What are the main ways to run workflows in development vs production?</summary>

Common options include: using the UI for manual testing/debugging, using APIs/SDKs for production runs, using schedules for recurring workflows, and using webhooks or message brokers for event-driven workflows.

</details>

<details class="faq-item">
<summary>Can I schedule workflows, and can one workflow have multiple schedules?</summary>

Yes. The scheduler triggers workflows using cron expressions, and a single workflow can be associated with multiple schedules.

</details>

<details class="faq-item">
<summary>Can a workflow publish events to message brokers?</summary>

Yes. The Event task publishes to message brokers, including AMQP, Kafka (including Confluent/Amazon MSK), AWS SQS, Azure Service Bus, NATS, GCP Pub/Sub, and IBM MQ.

</details>

## Data, secrets, and configuration

<details class="faq-item">
<summary>How do I pass data between tasks (dynamic variables / parameter wiring)?</summary>

Many workflow/task parameters can be dynamically referenced from workflow inputs, previous task outputs, workflow variables, environment variables, and secrets. These references use dot-notation expressions modeled after JSONPath-style syntax.

</details>

<details class="faq-item">
<summary>How are secrets masked during workflow execution?</summary>

When you reference a secret using ${workflow.secrets.&lt;secretName&gt;}, Conductor masks resolved secret values as *** anywhere they appear (inputs, outputs, and execution JSON) so the underlying value is not exposed.

</details>

<details class="faq-item">
<summary>How do environment variables work, and how do I reference them?</summary>

Environment variables are stored at the cluster level and can be reused across workflows. You reference them using ${workflow.env.variable-name} (and .$ if you need a JSON value parsed as JSON). Workflow variables set by tasks (like Set Variable) are scoped to the workflow, not global.

</details>

## Performance, scale, and orchestration patterns

<details class="faq-item">
<summary>From a latency perspective, is it realistic to facilitate a use case where a user’s journey on a website is determined by pulling data from various endpoints, evaluating the results against predefined rules, and dynamically redirecting the user to different pages based on the assessed outcomes?</summary>

Yes, such use cases are possible with Conductor. The various steps in such cases include: aggregating data from multiple endpoints, running basic rule evaluations against this data, running custom workers on the data pulled to determine their existence, using the user identifier to retrieve previous user details, &amp; dynamically redirecting the page for users based on the results. From an orchestration perspective, depending on the cluster configuration, inter-API communication can be managed with a latency of under 10 milliseconds. Assume a max cost of 50 ms (typical P95, P75 could be &lt; 20 ms) between steps, and each step will need to account for its own latency.

</details>

<details class="faq-item">
<summary>Is it possible to pull data from multiple endpoints simultaneously rather than sequentially?</summary>

Yes, it’s possible to pull data from multiple endpoints simultaneously using a Fork/Join task, which is the construct supported in Conductor and can run 10s of thousands of parallel executions.

</details>

<details class="faq-item">
<summary>How do rate limits work for tasks and workflows?</summary>

Rate limits can be configured in task/workflow definitions, and Conductor handles enforcement automatically. Tasks beyond the configured limit are placed into PENDING until capacity frees up; workflow rate limits control concurrent executions and queue additional runs.

</details>

<details class="faq-item">
<summary>Can I cache task outputs for repeated executions?</summary>

Yes. When caching is enabled, the server checks for cached output before scheduling the task; if a cache match is found, the task is completed using the cached output instead of being scheduled again (until the TTL expires).

</details>

<details class="faq-item">
<summary>How do I orchestrate long-running APIs without HTTP timeouts?</summary>

Use Conductor’s built-in patterns for long-running calls: HTTP Poll (start the job, then poll the status until completion) or async complete (start the job, return an immediate acknowledgment, and complete the task later via a callback).

</details>

## Workflow execution control and lifecycle

<details class="faq-item">
<summary>Can we start a workflow not from the start, but from any step within the workflow?</summary>

The Conductor workflow always starts from step 1 and follows the sequence. However, once the workflow is executed, you can use the API `PUT /api/workflow/{workflowId}/skiptask/{taskReferenceName}` to skip a particular task from execution. Alternatively, you can create the workflow definitions programmatically with only the required steps.

</details>

<details class="faq-item">
<summary>What is the difference between restarting and rerunning a workflow?</summary>

Once you run a workflow and it starts the execution, and for any reason, if the workflow fails/or is manually terminated, you can restart or re-run it. Restart continues the same workflow execution, and you can choose to restart with current definitions (use the exact workflow definition that was used in the original run, which is helpful if the definition has changed but you want to keep the original behavior) or restart with latest definitions (use the most recent workflow definition and version, which is useful when you want the restart to pick up your latest changes). Re-run starts a brand-new workflow instance, and before you trigger it you can update the input parameters, correlation ID, or task-to-domain mapping.

</details>

<details class="faq-item">
<summary>Can I upgrade a running workflow to a newer version?</summary>

Yes. Use the API `POST /api/workflow/{workflowId}/upgrade` to upgrade a running workflow to a different version. The execution continues from the last running task, and tasks that appear earlier in the new definition are marked as skipped.

</details>

<details class="faq-item">
<summary>How do I prevent duplicate workflow executions (idempotency)?</summary>

Start workflow requests and schedules can include an idempotency key to prevent duplicates. Webhook-triggered workflows can also use an idempotency key (often derived from a workflow input value), so retries return the existing execution instead of creating a new one.

</details>

<details class="faq-item">
<summary>Can I execute a workflow only up to a particular task for testing?</summary>

Not currently. As a workaround, add a Wait task in the workflow to pause execution at the point you want, so you can test up to that step before continuing.

</details>
