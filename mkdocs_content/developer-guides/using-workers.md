---
title: "Writing Workers for Conductor Workflows"
description: "Learn how to create and run workers that poll for tasks and execute custom business logic in workflows in Orkes Conductor."
canonical_route: "developer-guides/using-workers"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Writing Workers for Conductor Workflows"
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

=== "C#"

    ```csharp
    var conf = new Configuration
    {
        BasePath = Environment.GetEnvironmentVariable("CONDUCTOR_SERVER_URL"),
        AuthenticationSettings = new OrkesAuthenticationSettings(
            Environment.GetEnvironmentVariable("CONDUCTOR_AUTH_KEY"),
            Environment.GetEnvironmentVariable("CONDUCTOR_AUTH_SECRET"))
    };

    var host = WorkflowTaskHost.CreateWorkerHost(conf, LogLevel.Debug);
    host.Start();
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

All worker tasks should be registered to the Conductor server, which is done by creating a task definition. The task definition contains configuration options for failure handling and expected input/output payloads. The `name` must match the workflow task `name` and the worker's task type.

=== "Using API"

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

    Refer to the [Create Task Definition API](/content/reference-docs/api/metadata/creating-task-definitions).

    Production task definitions should include retry behavior, response timeout, total timeout, rate limits when needed, and input/output schemas for externally owned contracts.

=== "Using Conductor UI"

    1. Go to **Definitions > Task** from the left navigation menu on your Conductor cluster.
    2. Select **+ Define task**.
    3. Enter the task details, such as the rate limits, retry settings, timeout settings, and expected inputs and outputs. The **Name** must match the task name defined previously in your code.

    ![Define task in Orkes Conductor](/content/img/using-workers/using_workers-define_custom_task.png)

    4. Select **Save > Confirm Save**.


### Set up authorized access

In Orkes Conductor, an [application account](/content/category/access-control-and-security#applications) with a `Worker` role type enables workers to authenticate and authorize against the Conductor server. To set up authorized access, you need to add the worker to an application and grant it `Execute` permission.

!!! tip "For Developer Edition"
    If you are using the Developer Edition to create your worker, you can simply grab the access key ID and secret from the application in **Access Control > Applications** for your worker project and skip the rest of the steps in this section.

!!! note
    For well-defined access controls, your worker application should be kept separate from your workflow client application. Learn more about [proper application separation](https://orkes.io/content/access-control-and-security/applications#example-application-setup).

**To set up authorized access:**

1. Configure an application account.
   - Go to **Access Control > Applications** from the left navigation menu on your Conductor cluster.
   - Create a new application or select an application to which you will be adding your worker. Ensure that the application role has **Worker** enabled.

![Add worker to application account in Orkes Conductor](/content/img/using-workers/using_workers-application_roles.png)

2. Get the application access key for your worker project.
   - In **Access Keys**, select **Create access key** and store your credentials securely.
   - Set the Key ID and Key Secret in your project.
3. Grant Execute permission to the application.
   - In **Permissions**, select **+ Add permission**.
   - Select the **Task** tab and then your worker task.
   - Enable the **Execute** toggle.
   - (If [task-to-domain](/content/developer-guides/task-to-domain) is used) In **Domain**, enter the domain name used in your worker code.
   - Select **Add Permissions**.

The application account can now execute the worker task.

![Add permissions to application account in Orkes Conductor](/content/img/using-workers/using_workers-app_permissions.png)

Keep worker applications separate from workflow-starting applications. A worker needs permission to poll and complete tasks; it usually does not need permission to start workflows.

### Launch the worker

Launch the worker with your normal process manager, container runtime, or deployment system.

=== "Python"

    ```bash
    python3 worker.py
    ```

=== "Java"

    ```bash
    ./gradlew run
    ```

=== "Go"

    ```bash
    go run main.go
    ```

=== "C#"

    ```bash
    dotnet run
    ```

=== "JavaScript / TypeScript"

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

To use a [Worker task](/content/reference-docs/worker-task), add it to a workflow definition.

### Add to workflow

=== "Using API"

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

    Refer to the [Create Workflow Definition](/content/reference-docs/api/metadata/creating-workflow-definition) or [Update Workflow Definition](/content/reference-docs/api/metadata/update-workflow-definitions) APIs.

    The worker registered for `process_order` will poll and execute this task when the workflow reaches it.

=== "Using Conductor UI"

    1. Go to **Definitions > Workflow** from the left navigation menu on your Conductor cluster.
    2. Select or create a workflow.
    3. In the visual workflow builder, select the **(+)** icon to add a new task. There are two ways to add a worker task:
       - Search for your task using its task name and select to add it to the workflow.
       - Add a **Worker Task (Simple)** and enter the task name in **Task Definition**.
    4. Configure the task, such as its inputs, caching, and optionality.
    5. On the top right, select **Save > Confirm**.

    ![Add task in Orkes Conductor](/content/img/using-workers/using_workers-add_task_to_workflow.png)


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

## Related pages

- [Tasks in Workflows](/content/developer-guides/tasks)
- [Wiring Parameters](/content/developer-guides/passing-inputs-to-task-in-conductor)
- [Masking Parameters](/content/developer-guides/masking-parameters)
- [Using Task Input Templates](/content/developer-guides/task-input-templates)
- [Caching Task Outputs](/content/faqs/task-cache-output)
- [Rate Limits](/content/rate-limits)
