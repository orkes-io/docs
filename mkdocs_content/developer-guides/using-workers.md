---
title: "Writing Workers for Conductor Workflows"
description: "Learn how to create and run workers that poll for tasks and execute custom business logic in workflows in Orkes Conductor."
---

# Writing Workers for Conductor Workflows

A worker is a service that polls Conductor for a task, runs application code, and reports the result. This is where complex logic belongs: database writes, model calls, proprietary APIs, long-running jobs, file processing, transactional side effects, and domain-specific validation.

Conductor keeps durable orchestration separate from worker implementation. Workflows model retries, timeouts, rate limits, routing, access control, visibility, and compensation. Workers execute code in the language and runtime your team already uses.

!!! tip "5-minute path"
    Install an SDK, write a worker whose task name matches the workflow task name, register the task definition, grant a worker application `Execute` permission, start the worker, then run a workflow that reaches that task.

## Creating a worker

Create a worker when built-in tasks do not cover the operation or when the operation needs your runtime, dependencies, network access, credentials, or business logic.

### Best practices for writing workers

| Practice | Why it matters |
| -------- | -------------- |
| Keep workers idempotent | Conductor may redeliver work after retry, timeout, or worker failure. |
| Keep workflow decisions in the workflow | Workers should produce outputs; the workflow should decide the next step. |
| Return structured output | Downstream tasks, schemas, and observability depend on predictable output fields. |
| Use explicit failures | Return retryable failures for transient issues and terminal failures for invalid input. |
| Configure timeouts and retries | The task definition should express how long work may run and how recovery should happen. |
| Run multiple instances for scale | Worker instances poll independently, so horizontal scaling increases throughput. |

### Step 1: Get Conductor SDK

Install the SDK for the language used by the worker service.

=== "Python"

    ```bash
    python3 -m pip install conductor-python
    ```

=== "Java"

    ```gradle
    implementation "org.conductoross:conductor-client:4.0.1"
    implementation "org.conductoross:java-sdk:4.0.1"
    implementation "io.orkes.conductor:orkes-conductor-client:4.0.1"
    ```

=== "Go"

    ```bash
    go get github.com/conductor-sdk/conductor-go
    ```

=== "C#"

    ```bash
    dotnet add package conductor-csharp
    ```

=== "JavaScript / TypeScript"

    ```bash
    npm install @io-orkes/conductor-javascript
    ```


### Step 2: Write your worker logic

The worker task type must match the `name` of the SIMPLE task in the workflow definition. It does not have to match the function or class name.

=== "Python"

    ```python
    from conductor.client.worker.worker_task import worker_task

    @worker_task(task_definition_name="process_order")
    def process_order(order_id: str, amount: float) -> dict:
        return {
            "orderId": order_id,
            "total": amount,
            "status": "processed"
        }
    ```

=== "Java"

    ```java
    import com.netflix.conductor.sdk.workflow.task.InputParam;
    import com.netflix.conductor.sdk.workflow.task.WorkerTask;
    import java.util.Map;

    public class OrderWorkers {
        @WorkerTask("process_order")
        public Map<String, Object> processOrder(
                @InputParam("orderId") String orderId,
                @InputParam("amount") Double amount) {
            return Map.of(
                "orderId", orderId,
                "total", amount,
                "status", "processed"
            );
        }
    }
    ```

=== "Go"

    ```go
    func ProcessOrder(task *model.Task) (interface{}, error) {
        return map[string]interface{}{
            "orderId": task.InputData["orderId"],
            "total": task.InputData["amount"],
            "status": "processed",
        }, nil
    }
    ```

=== "C#"

    ```csharp
    [WorkerTask(taskType: "process_order", batchSize: 5, pollIntervalMs: 500)]
    public static TaskResult ProcessOrder(Conductor.Client.Models.Task task)
    {
        var result = task.ToTaskResult();
        result.OutputData = new Dictionary<string, object>
        {
            ["orderId"] = task.InputData["orderId"],
            ["total"] = task.InputData["amount"],
            ["status"] = "processed"
        };
        return result;
    }
    ```

=== "JavaScript / TypeScript"

    ```typescript
    const processOrderWorker = {
      taskDefName: "process_order",
      execute: async ({ inputData }) => ({
        status: "COMPLETED",
        outputData: {
          orderId: inputData.orderId,
          total: inputData.amount,
          status: "processed",
        },
      }),
    };
    ```


### Step 3: Run your worker

Start the SDK task runner so the process begins polling Conductor.

=== "Python"

    ```python
    from conductor.client.automator.task_handler import TaskHandler
    from conductor.client.configuration.configuration import Configuration
    from worker import *

    configuration = Configuration()

    task_handler = TaskHandler(
        configuration=configuration,
        scan_for_annotated_workers=True
    )
    task_handler.start_processes()
    ```

=== "Java"

    ```java
    var client = ApiClient.builder()
        .basePath("https://developer.orkescloud.com/api")
        .credentials(System.getenv("CONDUCTOR_AUTH_KEY"), System.getenv("CONDUCTOR_AUTH_SECRET"))
        .build();

    var executor = new WorkflowExecutor(client, 50);
    executor.initWorkers("com.example.workers");
    ```

=== "Go"

    ```go
    apiClient := client.NewAPIClientFromEnv()
    taskRunner := worker.NewTaskRunnerWithApiClient(apiClient)
    taskRunner.StartWorker("process_order", ProcessOrder, 5, time.Millisecond*200)
    select {}
    ```

=== "JavaScript / TypeScript"

    ```typescript
    import { orkesConductorClient, TaskManager } from "@io-orkes/conductor-javascript";

    const client = await orkesConductorClient({
      serverUrl: process.env.CONDUCTOR_SERVER_URL,
      keyId: process.env.CONDUCTOR_AUTH_KEY,
      keySecret: process.env.CONDUCTOR_AUTH_SECRET,
    });

    const manager = new TaskManager(client, [processOrderWorker]);
    manager.startPolling();
    ```


## Setting up the worker

Before a workflow can execute a worker task, Conductor must know the task definition, the worker must be authorized, and the worker process must be running.

### Register worker task

Register a task definition for the worker task name. The `name` must match the workflow task `name` and the worker's task type.

```json
{
  "name": "process_order",
  "description": "Processes an order in the order service",
  "retryCount": 3,
  "retryLogic": "FIXED",
  "retryDelaySeconds": 30,
  "timeoutSeconds": 300,
  "responseTimeoutSeconds": 60,
  "timeoutPolicy": "TIME_OUT_WF",
  "ownerEmail": "orders@example.com"
}
```

Production task definitions should include retry behavior, response timeout, total timeout, rate limits when needed, and input/output schemas for externally owned contracts.

### Set up authorized access

Use an [application](/content/access-control-and-security/applications) as the worker service account.

1. Create or select an application for the worker runtime.
2. Enable the `Worker` application role.
3. Generate an access key and store the secret securely.
4. Grant `Execute` permission on the task definition or on the task domain.
5. Configure the worker with the server URL, key ID, and key secret.

Keep worker applications separate from workflow-starting applications. A worker needs permission to poll and complete tasks; it usually does not need permission to start workflows.

### Launch the worker

Launch the worker with your normal process manager, container runtime, or deployment system.

```bash
python3 worker.py
```

```bash
./gradlew run
```

```bash
node index.js
```

If the workflow task remains `SCHEDULED`, check:

- The task definition exists.
- The worker task name matches the workflow task `name`.
- Worker credentials point to the right cluster.
- The worker application has `Execute` permission on the task or domain.
- The worker polls the same task domain used by the workflow execution.

## Using the worker task

Add a SIMPLE task to the workflow definition.

### Add to workflow

```json
{
  "name": "process_order",
  "taskReferenceName": "process_order",
  "type": "SIMPLE",
  "inputParameters": {
    "orderId": "${workflow.input.orderId}",
    "amount": "${workflow.input.amount}"
  }
}
```

The worker registered for `process_order` will poll and execute this task when the workflow reaches it.

### Run workflow

[Run the workflow](/content/developer-guides/running-workflows) and verify the task moves from `SCHEDULED` to `IN_PROGRESS` to `COMPLETED`.

Use the execution view or API to inspect:

- Task input resolved from workflow input.
- Worker output returned to Conductor.
- Retry count and reason for incomplete tasks.
- Worker ID for traceability.

## Advanced topics

- [Scaling Workers](/content/developer-guides/scaling-workers)
- [Routing Tasks with task-to-domain](/content/developer-guides/task-to-domain)
- [Task timeouts, retries, and rate limits](/content/error-handling)
- [Task input templates](/content/developer-guides/task-input-templates)
