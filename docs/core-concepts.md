---
slug: "/core-concepts"
description: "In Orkes Conductor, the three core concepts for orchestrating application flows are workers, tasks, and workflows."
---

# Core Concepts

Orkes Conductor orchestrates the execution flow of distributed application components—be it code, functions, or APIs.

## Conductor architecture
<p align="center"><img src="/content/img/conductor-architecture.jpg" alt="Conductor architecture" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

In Conductor, workflows are orchestrated by a state machine evaluator, which ensures each task is executed based on predefined rules. 

Workflows can be triggered by code, an API call, a predefined schedule, webhook events, and external eventing systems like AWS SQS, Kafka, etc. These workflows follow a worker-task queue architecture, where each task type has its own dedicated task queue.

The task workers execute these tasks by communicating with the Conductor server over HTTP/gRPC. Each task is queued in distributed queues that are polled by task workers. The orchestrator monitors each task's state and ensures it is retried, completed, or failed as required.

Conductor ensures high scalability by leveraging persistence stores (PostgreSQL, Redis, or Elasticsearch) to maintain workflow/task metadata, task queues, and execution history. Integrations with tools like Prometheus and Datadog allow you to easily collect and monitor system performance data.

The process of orchestrating using Conductor revolves around three main concepts: Workflows, Tasks, and Workers.

## Workflows
A workflow is a sequence of tasks that defines their order and execution.

### Workflow Definition
The workflow definition describes the flow of the application, a blueprint specifying the order of tasks within a workflow. The workflow definition includes:
* The input/output parameters of the workflow.
* A collection of task configurations specifying how data is wired until the workflow is completed and the output is generated.
* The workflow's runtime behavior, including the timeout policy, compensation flow, and more. 

### Workflow Execution
Workflow executions are the execution instances of a workflow definition. Each time a workflow definition is invoked with specific input, a new workflow execution is created with a unique ID. The workflow has a state that can be running, paused, timed out, terminated, failed, or completed.

## Tasks
A task is the basic building block of a Conductor workflow. It represents a step in your application, such as making an HTTP call, sending an email, processing data files, or executing some logic. Tasks are categorized into three types:
* [System tasks](https://orkes.io/content/category/reference-docs/system-tasks)—In-built tasks designed for common uses like calling an HTTP endpoint or listening for events from external systems. System tasks are managed by Conductor, run within its JVM, and allow you to get started quickly without needing custom workers. System tasks include [AI tasks](https://orkes.io/content/category/reference-docs/ai-tasks) that can be used to build AI-powered applications.
* [Operators](https://orkes.io/content/category/reference-docs/operators)—Control flow primitives, similar to programming language constructs like loops, switch cases, or fork/join blocks. Operator tasks are also managed by Conductor.
* [Worker tasks](https://orkes.io/content/reference-docs/worker-task)—Worker tasks are denoted as **Simple** tasks in Conductor. They are implemented by custom task workers and run in a separate environment from Conductor. They communicate with the Conductor via REST/gRPC, poll for work, and update their status once executed. 

### Task Definition
Task definitions define the default task parameters, such as input keys, output keys, timeouts, and retries. All custom worker tasks must be registered as a task definition in Conductor before they can be used in a workflow.

### Task Configuration
The task configuration is the workflow-specific blueprint that describes how a workflow processes an input payload by passing it through successive tasks. The task configurations appear within the tasks array property of the workflow definition.
* For all tasks, the configuration specifies the input parameters.
* For custom worker tasks (simple), the configuration contains a reference to a registered worker.
* For system tasks and operators, the configuration includes parameters that control the task behavior. For example, the configuration for an HTTP task specifies the endpoint URL and the payload template, which will be used during task execution.

### Task Execution
When an input is passed into a configured task, a task execution object is created. This object has a unique ID and represents the result of the operation, including the task status, start time, and inputs/outputs.

## Workers
Workers execute tasks within a workflow. Workers can be implemented in any language, and Conductor offers frameworks with features such as polling threads, metrics, and server communication to simplify worker creation. They can run on any environment, including bare metal, containers, VMs, or serverless functions.

Workers implement the core functionality of each task and handle the logic as defined in their configuration, maintaining complex logic in a modular, reusable way.

Conductor workers follow certain basic principles:

* Workers are stateless and do not retain any workflow-specific state.
* Each worker executes a specific task and produces corresponding outputs.
* Workers are meant to be idempotent to handle retries and task rescheduling.
* Workers do not implement any task logic, such as retries, which are managed by the Conductor server.

Operators and system tasks are executed by Conductor workers, while custom worker tasks are executed by external workers. 

To use a worker in a workflow, it must be registered with Conductor by creating a task definition. The worker polls the Conductor server to receive and execute scheduled work. Conductor passes inputs to the task worker for execution and collects the outputs, continuing the process according to the workflow definition.