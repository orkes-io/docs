# Sending Signals to Workflows

You may encounter situations where you need to send signals to workflows for cases like pausing workflows. There are different ways through which you can achieve this. 

In this document, let’s look at the different ways to send signals to your workflows in a production environment.

1. Using Async Complete
2. Using Wait Task

## Using Async Complete 

While defining workflow definitions for certain task types, we have a parameter, “asyncComplete”. Setting this parameter to “true” ensures that the task can be completed asynchronously only.

Let’s have a look at an example workflow with “**asynComplete:true**”,

```json
{
 "name": "async_complete_example",
 "description": "Edit or extend this sample workflow. Set the workflow name to get started",
 "version": 1,
 "tasks": [
   {
     "name": "http_task_85tf2",
     "taskReferenceName": "http_task_85tf2_ref",
     "inputParameters": {
       "http_request": {
         "uri": "https://orkes-api-tester.orkesconductor.com/api",
         "method": "GET",
         "connectionTimeOut": 3000,
         "readTimeOut": "3000",
         "accept": "application/json",
         "contentType": "application/json"
       }
     },
     "type": "HTTP",
     "asyncComplete": true
   }
 ],
 "schemaVersion": 2,
 "ownerEmail": "riza.farheen@orkes.io"
}
```

Now, let’s run this in the Playground. 

| [Run in Orkes Playground](https://play.orkes.io/runWorkflow) |
| ------------------------------------------------------------ |

1. Under **Workflow Name**, choose **async_complete_example**.
2. Click **Run Workflow**.

On running this workflow, the HTTP task wouldn’t get completed; instead, it would be in a “Scheduled” state, i.e., the workflow is paused.

There are multiple ways to update the task status to complete. 

### Method 1 - Using API 

Once the workflow is run, the **workflowId** will be generated. You can view the *workflowId* below the workflow name on the execution page.

<p align="center"><img src="/content/img/workflowid.png" alt="Workflow ID in Conductor" width="100%" height="auto"></img></p>

By using the **workflowId** and the **taskRefName**, you can use the following API to complete the task.

```
POST /api/tasks/{workflowId}/{taskRefName}/{status}
```

Another method to update the task status is directly from the UI.

### Method 2 - From Conductor UI

:::tip
**The UI method is intended only for testing/debugging purposes and not for the production environment.**
:::

From the workflow execution page, click on the task and then update the status manually to “COMPLETED”.

<p align="center"><img src="/content/img/workflow-status-update-from-ui.png" alt="Updating workflow status from Conductor UI" width="100%" height="auto"></img></p>

So, using the above methods, you can asynchronously complete your workflow. This can be useful when you need to pause the workflow for external interventions.

:::note
**AsyncComplete** is currently supported for the following task types only:
- [Event](https://orkes.io/content/reference-docs/system-tasks/event)
- [HTTP](https://orkes.io/content/reference-docs/system-tasks/http)
- Kafka Publish
:::

## Using Wait Task

Another method to pause your workflow for external signals is by using the wait task. 

Wait task ensures that your workflow is paused for a certain period based on the configured parameters. You can configure it in such a way that the task can wait for a certain duration or until a specific date & time, or you can configure the wait type as “Signal”, which waits for some manual intervention to get completed.

If you have configured the wait type as “Signal” and run the workflow, you can see that the task is in progress, waiting for an external signal to continue. You can manually update the task status to “Completed” directly from the UI, as shown below.

<p align="center"><img src="/content/img/wait-task-example-for-pausing-workflow.png" alt="Pausing workflow using wait task" width="100%" height="auto"></img></p>

Check out our documentation on the [Wait task](https://orkes.io/content/reference-docs/operators/wait) for more details.

The above methods can be used to pause your workflow to wait for an external signal. 

:::tip
We do have the option to pause your workflow directly from the UI or using the [pause workflow](https://orkes.io/content/reference-docs/api/workflow/pause-worflow) API. However, it is recommended only when debugging your running workflows.

We recommend using the methods mentioned in this document to pause your workflows in live environments for specific use cases.
:::