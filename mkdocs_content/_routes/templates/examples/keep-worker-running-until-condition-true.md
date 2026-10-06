---
title: "Running a Worker Until a Condition is met"
description: "Learn how to build and run a custom polling worker to repeatedly check a condition until it becomes true in Orkes Conductor."
canonical_route: "templates/examples/keep-worker-running-until-condition-true"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Running a Worker Until a Condition is met, workflow tasks, task queues"
---

# Running a Worker Until a Condition is met

This tutorial demonstrates how to create a **custom polling worker** that runs continuously until a specific condition is met.

You’ll implement this pattern using the Orkes Conductor SDK and learn how to keep a worker active by setting `callbackAfterSeconds`, allowing Conductor to requeue it automatically until your logic determines that completion has been reached. This tutorial uses the Java SDK, though the pattern is supported in all Orkes Conductor SDKs.

This approach is useful when:

- Your workflow depends on an external condition or background job.
- You need to monitor progress without repeatedly invoking APIs.
- You want the workers themselves to decide when a task is complete.

!!! info "Prerequisites"
    - Access to free [Orkes Developer Edition](https://developer.orkescloud.com/).
    - Familiarity with Java and [Conductor’s worker SDK](https://orkes.io/content/developer-guides/using-workers).
    - Basic understanding of [task lifecycle statuses](https://orkes.io/content/developer-guides/task-and-workflow-status-in-conductor#task-status).

## The polling workflow

Use the following workflow definition to create a workflow in Orkes Conductor. The workflow contains a single task. The repeated execution is controlled entirely by the worker logic.

### Step 1: Create a workflow in Orkes Conductor

**To create a workflow:**

1. Go to **Definitions** > **Workflow** from the left navigation menu on your Conductor cluster.
2. Select **+ Define workflow**.
3. In the **Code** tab, paste the following code:

```json
{
  "name": "poll-until-condition-workflow",
  "description": "This example shows how we can use a worker and keep it running until a condition is true.",
  "version": 1,
  "tasks": [
    {
      "name": "poll-until-condition-matches-full-worker",
      "taskReferenceName": "poll-until-condition-matches-full-worker",
      "type": "SIMPLE",
      "inputParameters": {
        "pollCounter": "${workflow.input.pollCounter}",
        "pollIntervalSeconds": "${workflow.input.pollIntervalSeconds}"
      }
    }
  ],
  "inputParameters": [
    "pollCounter",
    "pollIntervalSeconds"
  ],
  "schemaVersion": 2
}
```

4. Select **Save** > **Confirm**.

Next, create an application in Orkes Conductor. This application provides the access keys (key and secret) that your SDK uses to authenticate and run the workflow.

### Step 2: Create an application in Orkes Conductor

**To create an application:**

1. Go to **Access Control** > **Applications** from the left navigation menu on your Conductor cluster.
2. [Create an application](https://orkes.io/content/access-control-and-security/applications#configuring-applications) and get the access keys. 
3. [Assign EXECUTE permission](https://orkes.io/content/access-control-and-security/applications#configuring-applications) to the workflow created in the previous step.

Once done, [authenticate the SDK project](https://orkes.io/content/sdks/authentication#sdk-authentication) with the generated access keys.

### Step 3: Create a worker

Use the Java SDK to create a worker that keeps running until a condition is met. Create a file named `PollUntilConditionMeetsWorker.java` and add the following code:

*[Complete source file on GitHub](https://github.com/conductor-sdk/orkes-java-springboot2-example/blob/main/src/main/java/io/orkes/example/banking/workers/PollUntilConditionMeetsWorker.java)*

```java
  @Override
    public TaskResult execute(Task task) {
        TaskResult taskResult = new TaskResult(task);
        if (!task.getInputData().containsKey(POLL_COUNTER)) {
            taskResult.addOutputData("message", "pollCounter param not found in input, will use default of " + defaultPollCount + " polls");
        }

        int pollCounter = Math.min(10, castToInt(task.getInputData().getOrDefault(POLL_COUNTER, defaultPollCount)));
        int pollIntervalSeconds = Math.min(10, castToInt(task.getInputData().getOrDefault(POLL_INTERVAL_SECONDS, 5)));

        // Add these to the output for context
        taskResult.addOutputData(POLL_INTERVAL_SECONDS, pollIntervalSeconds + " (this test task has a max limit of 10 seconds)");
        taskResult.addOutputData(POLL_COUNTER, pollCounter + " (this test task has a max limit of 10 iterations)");

        // We can read current iteration from the task output as the data will be retained on the worker when polled
        int currentIteration = castToInt(taskResult.getOutputData().getOrDefault(CURRENT_ITERATION, 0));

        // Increment the current iteration and set to the task output
        taskResult.addOutputData(CURRENT_ITERATION, ++currentIteration);
        taskResult.addOutputData("updatedTime", new Date().toString());

        // While condition is not met, keep task in progress
        if (currentIteration < pollCounter) {
            taskResult.setStatus(TaskResult.Status.IN_PROGRESS);
            // Set to configured seconds to callback, and you can set this to any value as per the requirements
            taskResult.setCallbackAfterSeconds(pollIntervalSeconds);
            return taskResult;
        }

        // Set task as completed now that the poll count condition is met
        taskResult.setStatus(TaskResult.Status.COMPLETED);
        return taskResult;
    }

```

This worker uses the `callbackAfterSeconds` attribute to control re-execution.

Here’s how it works:

- The worker tracks the current iteration in its output data.
- On each execution, it increments the iteration count.
- If the `currentIteration` is less than `pollCounter`, it sets the task status to **IN_PROGRESS**.
- Conductor automatically requeues the task after the configured `pollIntervalSeconds`.
- When the condition is met (the iteration reaches `pollCounter`), the task is marked as **COMPLETED**.

This approach maintains the worker’s state across polls without requiring an external data store. 

!!! info "Note"
    Workers can be implemented in any language supported by Orkes Conductor SDKs.

<center>
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/nI8IcSpzBLQ"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen="allowfullscreen"
    mozallowfullscreen="mozallowfullscreen"
    msallowfullscreen="msallowfullscreen"
    oallowfullscreen="oallowfullscreen"
    webkitallowfullscreen="webkitallowfullscreen"
  ></iframe>
</center>
