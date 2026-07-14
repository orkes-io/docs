---
title: "Idempotency in Conductor Workflows"
description: "Learn how idempotency keys ensure a workflow runs only once by returning the same execution for duplicate requests caused by retries or repeated triggers."
canonical_route: "idempotency"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Idempotency in Conductor Workflows

Idempotency is the property of an operation where executing it multiple times produces the same result as executing it once. In distributed systems, network failures, retries, and duplicate events are inevitable. Without idempotency controls, these conditions can cause workflows to run multiple times for the same logical event, leading to duplicate side effects such as double-charging a customer, creating redundant records, or triggering conflicting downstream processes.

!!! tip "5-minute path"
    Choose a stable business key, pass it as the workflow idempotency key, choose a conflict strategy, then test two identical starts and verify the second request behaves as expected.

Orkes Conductor provides built-in idempotency support at multiple layers:

- **Workflow-level idempotency** via idempotency keys and strategies
- **Worker-level idempotency** as a design requirement for task workers
- **Webhook-level idempotency** for event-driven workflows

## How idempotency works in Conductor

When a workflow execution is triggered with an idempotency key, Conductor checks whether a workflow with the same key already exists before creating a new instance. 

- If no matching record exists, Conductor creates a new workflow execution.
- If a matching record exists, Conductor applies the configured idempotency strategy to determine the response.

### Idempotency key

An idempotency key is a unique string that identifies a specific workflow invocation. It can be:

- A static value (e.g., a transaction ID)
- For webhooks, it can be a dynamic value derived from workflow input variables (e.g., `${workflow.input.order_id}`)

The key is scoped to a workflow name, meaning the same key can be reused across different workflow definitions without conflict.

### Idempotency strategy

Conductor supports three idempotency strategies:

| Strategy | Behavior                           | Use when                               |
| ---------|------------------------------------|----------------------------------------|
| `FAIL` | Starts a new workflow instance only if there are no workflow executions with the same idempotency key, whether running or completed. | You need strict once-only semantics and want any duplicate requests treated as errors (for example, in payment processing, where a charge must occur exactly once). |
| `RETURN_EXISTING` | Returns the `workflowId` of the existing workflow instance with the same idempotency key. No new execution is started. | The caller only needs the workflow ID and can safely reuse an in-progress or already-completed execution. Ideal for idempotent APIs where clients may retry on timeout, or for event-driven triggers with at-least-once delivery. |
| `FAIL_ON_RUNNING` | Starts a new workflow instance only if there are no RUNNING or PAUSED workflows with the same idempotency key. Terminal workflows (COMPLETED, FAILED, TIMED_OUT, or TERMINATED) with the same key can run again. | You want to prevent concurrent duplicate executions while allowing re-triggering once the original run has finished (for example, a scheduled job that should not run concurrently but can be re-run after it finishes, regardless of whether it completed or failed). | 

## Configuring idempotency

### Via the Start Workflow API

Use the [Start Workflow API](/content/reference-docs/api/workflow/start-workflow-execution) and pass the `idempotencyKey` and `idempotencyStrategy` as header parameters: 

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/workflow/<WORKFLOW-NAME>?priority=0' \
  -H 'accept: text/plain' \
  -H 'X-Idempotency-key: order-123' \
  -H 'X-on-conflict: FAIL' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "additionalProp1": {},
  "additionalProp2": {},
  "additionalProp3": {}
}'
```

### Via the SDK


=== "Java"

    [Java SDK](https://github.com/conductor-oss/java-sdk)

    ```java
    var request = new StartWorkflowRequest();
    request.setName("order-processing-workflow");
    request.setVersion(1);
    request.setIdempotencyKey("order-42-attempt-1");
    request.setIdempotencyStrategy(IdempotencyStrategy.RETURN_EXISTING);

    String workflowId = workflowClient.startWorkflow(request);
    ```

=== "Python"

    [Python SDK](https://github.com/conductor-oss/python-sdk)

    ```python
    from conductor.client.http.models import StartWorkflowRequest, IdempotencyStrategy

    request = StartWorkflowRequest(
        name="order-processing-workflow",
        version=1,
        idempotency_key="order-42-attempt-1",
        idempotency_strategy=IdempotencyStrategy.RETURN_EXISTING
    )

    workflow_id = workflow_client.start_workflow(request)
    ```

=== "JavaScript"

    [JavaScript SDK](https://github.com/conductor-oss/javascript-sdk)

    ```javascript
    const workflowId = await workflow.startWorkflow(
      input,
      correlationId,
      priority,
      "order-42-attempt-1",   // idempotencyKey
      "RETURN_EXISTING"       // idempotencyStrategy
    );
    ```

=== "C#"

    [C# SDK](https://github.com/conductor-oss/csharp-sdk)

    ```csharp
    var request = new StartWorkflowRequest(
        name: "order-processing-workflow",
        version: 1,
        idempotencyKey: "order-42-attempt-1",
        idempotencyStrategy: IdempotencyStrategy.RETURN_EXISTING
    );

    string workflowId = workflowExecutor.StartWorkflow(request);
    ```

=== "Go"

    [Go SDK](https://github.com/conductor-oss/go-sdk)

    ```go
    request := &model.StartWorkflowRequest{
        Name:                "order-processing-workflow",
        Version:             1,
        IdempotencyKey:      "order-42-attempt-1",
        IdempotencyStrategy: model.ReturnExisting,
    }

    workflowId, err := executor.StartWorkflow(request)
    ```


### Via the Conductor UI

[When running a workflow from the UI](/content/how-to-videos/run-workflow):

1. Go to **Executions** > **Workflow** or **Definitions** > **Workflow**.
2. Select **Run Workflow**.
3. Enter your input parameters.
4. In **Idempotency key**, enter a unique key value.
5. Select an **Idempotency strategy**.
6. Select **Run Workflow**.

### Via the Start Workflow task

Use the [Start Workflow task](/content/reference-docs/operators/start-workflow) inside a workflow to trigger a child workflow with idempotency controls:

```json
{
     "name": "start_workflow",
     "taskReferenceName": "start_workflow_ref",
     "inputParameters": {
       "startWorkflow": {
         "name": "<WORKFLOW-NAME>",
         "input": {
           "someKey": "someValue"
         },
         "correlationId": "xyz",
         "idempotencyKey": "123",
         "idempotencyStrategy": "RETURN_EXISTING"
       }
     },
     "type": "START_WORKFLOW"
}
```

### Via the Sub Workflow task

The [Sub Workflow task](/content/reference-docs/operators/sub-workflow) also supports idempotency configuration. If an idempotency strategy is set but no key is provided, the sub-workflow automatically inherits the idempotency key from its parent workflow.

```json
{
     "name": "sub_workflow",
     "taskReferenceName": "sub_workflow_ref",
     "inputParameters": {
       "someKey": "someValue"
     },
     "type": "SUB_WORKFLOW",
     "subWorkflowParam": {
       "name": "<SUB-WORKFLOW-NAME>",
       "version": 3,
       "priority": 5,
       "idempotencyKey": "someKey",
       "idempotencyStrategy": "RETURN_EXISTING",
       "taskToDomain": {
         "someTask": "someDomain"
       }
     }
}
```

### Via the Scheduler

When defining a [workflow schedule](/content/developer-guides/scheduling-workflows), set the `idempotencyKey` and `idempotencyStrategy` in the schedule definition:

```json
{
 "name": "sample_scheduler",
 "cronExpression": "0 0 0 * * ?",
 "startWorkflowRequest": {
   "name": "api-test",
   "version": "",
   "input": {
     "input1": "123",
     "name": "john",
     "place": "seattle"
   },
   "idempotencyKey": "order-123",
   "idempotencyStrategy": "RETURN_EXISTING"
 },
 "zoneId": "UTC"
}
```

### Via Webhooks

Configure a webhook to [use a workflow input variable as the idempotency key](/content/developer-guides/webhook-integration#step-2-create-a-webhook-in-orkes-conductor):

1. Go to **Definitions** > **Webhook** and select **+ New webhook**.
2. Configure the source platform and headers.
3. Enable **Start workflow when webhook event comes**.
4. In the **Idempotency key** field, enter a variable reference such as `${workflow.input.event_id}`.
5. Set the **Idempotency strategy**.
6. Select **Save**.

With this configuration, if the same event is delivered multiple times (for example, due to webhook retries), Conductor will not start duplicate workflow executions.

!!! info "Note"
    The idempotency key can be variable here, but it can be passed only from workflow inputs.

#### Choosing an idempotency key for webhook payloads

The `idempotencyKey` variable set in step 4 above typically resolves to a field in the incoming event payload. For example, referencing the event's own ID:

```json
{
  "idempotencyKey": "${workflow.input.event.id}",
  "idempotencyStrategy": "RETURN_EXISTING"
}
```

Use the source system's event ID when available. If the source does not provide a stable event ID, derive a key from immutable business fields such as order ID plus event type.

## Worker idempotency

In addition to workflow-level idempotency, task workers themselves must be designed to be idempotent. Conductor guarantees at-least-once delivery, meaning a task may be delivered to a worker more than once in the event of failures such as worker restarts, network issues, or timeout retries.

A worker is idempotent when executing the same task multiple times produces no additional effect beyond the first execution. For example:

- A worker that inserts a record should check for existence before inserting, or use upsert semantics.
- A worker that sends a notification should track sent state to avoid re-sending.
- A worker that charges a payment should use an external idempotency key with the payment provider.

[Workers in Conductor](/content/developer-guides/using-workers) should follow these design principles:

- **Defined I/O**: Each worker executes a specific task with well-defined inputs and outputs.
- **Statelessness**: Workers do not maintain workflow-specific state between executions.
- **Idempotency**: Workers handle cases where partially executed tasks are rescheduled and re-delivered.
- **Decoupled failure handling**: Retry logic, timeouts, and failure handling are configured in Conductor, not in the worker itself.

## Idempotency for agent tool calls

The same design principles apply to AI agent workers, with one added wrinkle: agents often call tools that create external side effects, such as sending an email, creating a support ticket, updating a CRM record, triggering a deployment, or charging a payment provider. These calls must be idempotent because task delivery is at least once and an in-flight tool call can be retried after a timeout, worker restart, or network partition.

Use a stable key that identifies the business operation, not the retry attempt:

| Tool action | Recommended key |
| ----------- | --------------- |
| Create a ticket | `ticket:${customerId}:${requestId}` |
| Send a notification | `notification:${recipient}:${template}:${eventId}` |
| Run an external operation | `operation:${workflowId}:${taskReferenceName}:${businessKey}` |
| Update a customer record | `customer-update:${customerId}:${changeRequestId}` |
| Charge or refund payment | Provider payment intent, refund ID, or authorization ID |

Good sources for agent tool idempotency include:

- Source event ID or webhook delivery ID.
- Business key such as order ID, case ID, customer ID, or payment intent ID.
- Conductor workflow ID plus a tool-specific operation name.
- Task reference name when the tool can only run once per workflow execution.
- External operation ID returned by the first successful call and stored in task output.

Avoid using the task attempt ID alone for irreversible side effects. A retry creates a new attempt, so the external system may see a different key and repeat the side effect. Prefer a business key that stays the same across retries.

## Searching executions by idempotency key

You can use the idempotency key to look up past workflow executions from the Conductor UI:

1. Go to **Executions** > **Workflow**.
2. In the search filters, enter your key in the **Idempotency key** field.
3. Conductor returns all matching executions.

This is useful for verifying whether a duplicate request was correctly deduplicated, or for tracing a workflow triggered by a specific event.

## Strategy decision guide

| Scenario | Recommended Strategy | 
| ---------|----------------------|
| Payment processing: Charge exactly once | FAIL |
| REST client retries on timeout: Return same result | RETURN_EXISTING | 
| Event-driven trigger with at-least-once delivery | RETURN_EXISTING or FAIL_ON_RUNNING | 
| Scheduled job, no concurrency, but re-run after it finishes is OK | FAIL_ON_RUNNING | 

## Best practices

- **Use meaningful, stable keys**. Choose a key derived from business data that naturally identifies a unique operation (for example, an order ID or transaction ID). Avoid generating random UUIDs unless they are provided by the source system.
- **Use dynamic keys in event-driven workflows**. Reference an input variable as the idempotency key (e.g., `${workflow.input.event_id}`) to deduplicate repeated event deliveries automatically.
- **Design workers to be idempotent**. Workflow-level idempotency prevents duplicate executions, but worker task-level idempotency ensures correct behavior if a task is retried within an execution.
- **Test deduplication explicitly**. Trigger the same workflow request twice with the same key and verify that the call behaves as expected for your chosen strategy.
