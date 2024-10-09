# Sending Signals to Workflows

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In certain scenarios, there might arise a need to transmit signals to workflows for purposes such as pausing, terminating, or restarting them. There are different ways through which you can achieve this.

In this document, let’s look at the different ways to send signals to your workflows in a production environment.


## Pause Workflow

You can pause the workflows to wait for external signals. There are different methods to pause your workflow.

### Using API

Once the workflow is run, the **workflowId** will be generated. Use the following API with the workflowId as the input payload to pause your workflow:

```
PUT /workflow/{workflowId}/pause
```
### SDKs

<Tabs>
<TabItem value="Java" label="Java">

```java
BulkResponse pauseWorkflow(List<String> workflowIds) throws ApiException
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) Pause(workflowId string) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.pause_workflow1(self, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
void WorkflowResourceApi.PauseWorkflow(string workflowId)
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

```javascript
WorkflowExecutor.pauseWorkflow(
    workflowId: string,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.pauseWorkflow(
    workflowId: string,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/pause-workflow [options workflow-id])
```

</TabItem>
</Tabs>

### From Conductor UI

From the workflow executions page, click **Actions**, and choose **Pause**.

<p align="center"><img src="/content/img/pause-workflow-from-ui.png" alt="Pausing workflows from UI" width="100%" height="auto"></img></p>

## Resume Workflow

You can resume the paused workflows once the purpose is served.

### Using API

Use the following API with the workflowId as the input parameter to resume your paused workflow:

```
PUT /workflow/{workflowId}/resume  
```
### SDKs

<Tabs>
<TabItem value="Java" label="Java">

```java
BulkResponse resumeWorkflow(List<String> workflowIds) throws ApiException
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) Resume(workflowId string) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.resume_workflow1(self, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
void WorkflowResourceApi.ResumeWorkflow(string workflowId)
```

</TabItem>

<TabItem value="JavaScript" label="JavaScript">

```javascript
WorkflowExecutor.resume(
    workflowId: string,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.resume(
    workflowId: string,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/resume-workflow [options workflow-id])
```

</TabItem>
</Tabs>

### From Conductor UI

From the workflow executions page, click **Actions**, and choose **Resume**.

<p align="center"><img src="/content/img/resume-workflow-from-ui.png" alt="Resuming workflows from UI" width="100%" height="auto"></img></p>

## Restart Workflow

In certain situations, your workflow may fail due to any reason, and it will reach the terminated state. In such cases, you can quickly restart the workflow execution from the beginning.

### Using API

With the **workflowId** as the input parameter, use the following API to restart the workflow from the beginning with the same input. This operation has no effect when called on a workflow that is not in a terminal status.

```
POST /workflow/{workflowId}/restart 
```

### SDKs

<Tabs>
<TabItem value="Java" label="Java">

```java
BulkResponse restartWorkflow(List<String> workflowIds, Boolean useLatestDefinitions) throws ApiException
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) Restart(workflowId string, useLatestDefinition bool) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.restart1(self, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
void WorkflowResourceApi.Restart(string workflowId, bool? useLatestDefinitions = null)
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

```javascript
WorkflowExecutor.restart(
    workflowId: string,
    useLatestDefinitions: boolean,
): CancelablePromise<void>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.restart(
    workflowId: string,
    useLatestDefinitions: boolean,
): CancelablePromise<void>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/restart-workflow [options workflow-id])
```

</TabItem>
</Tabs>

### From Conductor UI

From the workflow executions page, click **Actions**, and you can choose to restart workflows either using the same definition or with the latest definitions.

<p align="center"><img src="/content/img/restart-workflows-from-ui.png" alt="Restarting workflows from UI" width="100%" height="auto"></img></p>

- **Restart with Current Definitions** - Restart the workflow from the beginning using the same version of the workflow definition that originally ran this execution. This is useful if the workflow definition has changed and we want to retain this instance in the original version.
- **Restart with Latest Definitions** -  Restart this workflow from the beginning using the latest definition of the workflow. If you’ve made changes to the definition, you could use this option to rerun the flow with the latest version.

## Rerun Workflow

The restart option restarts the workflow with either the current or latest definitions. However, if you want to run a new instance of the workflow by making changes to the workflow inputs, correlation ID, or task to domain mapping, you can utilize the rerun option.

### Using API for rerunning a workflow from a specific task

Once you have the **workflowId**, you can rerun the workflow from a specific task using the following API. Get the task execution ID from the UI and include it in the API. 

<p align="center"><img src="/content/img/task-execution-id.png" alt="Task Execution ID from Conductor UI" width="100%" height="auto"></img></p>

```
POST /workflow/{workflowId}/rerun
{
    "reRunFromTaskId": "TASK_ID_TO_REREUN_FROM",
    "taskInput": {
        //Extra inputs to the task 
    },
    "workflowInput": {
        //Changes to workflow inputs as part of re-run 
    }
}
```

### SDKs

<Tabs>
<TabItem value="Java" label="Java">

```java
String rerunWorkflow(String workflowId, RerunWorkflowRequest rerunWorkflowRequest)
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) ReRun(workflowId string, reRunRequest model.RerunWorkflowRequest) (id string, error error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.rerun(self, body, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
string WorkflowResourceApi.Rerun(RerunWorkflowRequest body, string workflowId)
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

```javascript
WorkflowExecutor.rerun(
    workflowId: string,
    requestBody: RerunWorkflowRequest,
): CancelablePromise<string>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowResourceService.rerun(
    workflowId: string,
    requestBody: RerunWorkflowRequest,
): CancelablePromise<string>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/rerun-workflow [options workflow-id rerun-wf-request])
```

</TabItem>
</Tabs>

### From Conductor UI

From the workflow executions page, click **Actions** and choose **Re-run Workflow**. Clicking on this takes us to the *Run Workflow* page, where you can rerun the workflow. While running, you can change the workflow input parameters and task to domain mapping.

<p align="center"><img src="/content/img/rerun-workflow.png" alt="Rerun from Conductor UI" width="100%" height="auto"></img></p>

## Retry from Failed Task 

Suppose your workflow fails at a task; you can retry the workflow from the failed task.

### Using API 

Once you have the **workflowId**, you can retry a failed workflow from the failed task using the following API.

```
POST /workflow/{workflowId}/retry
```

### SDKs

<Tabs>
<TabItem value="Java" label="Java">

```java
BulkResponse retryWorkflow(List<String> workflowIds) throws ApiException
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) Retry(workflowId string, resumeSubworkflowTasks bool) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.retry1(self, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
void WorkflowResourceApi.Retry(string workflowId, bool? resumeSubworkflowTasks = null)
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

```javascript
WorkflowExecutor.retry(
    workflowId: string,
    resumeSubworkflowTasks: boolean,
): CancelablePromise<void>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.retry(
    workflowId: string,
    resumeSubworkflowTasks: boolean,
): CancelablePromise<void>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/retry-last-failed-task [options workflow-id resume-subworkflow-tasks])
```

</TabItem>
</Tabs>

### From Conductor UI

From the workflow executions page, click **Actions**, and choose **Retry - From failed task**.

<p align="center"><img src="/content/img/retrying-failed-workflows-in-conductor.png" alt="Retry from Conductor UI" width="100%" height="auto"></img></p>

## Manually Updating Task Status in a Workflow

Certain situations may require you to manually update the task status in a workflow.

### Using API

By providing the workflowId, task reference name, and the task status as the input, you can use the following API to update a task status manually:

```
POST /tasks/{workflowId}/{taskRefName}/{status}
```

### SDKs

<Tabs>
<TabItem value="Java" label="Java">

```java
String OrkesTaskClient.updateTaskByRefName(Map<String, Object> output, String workflowId, String taskRefName, String status) throws ApiException
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (*WorkflowExecutor) UpdateTaskByRefName(taskRefName string, workflowInstanceId string, status model.TaskResultStatus, output interface{}) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
TaskResourceApi.update_task1(taskOutput, workflow_id, task_ref_name, status, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
string TaskResourceApi.UpdateTask(Dictionary<string, Object> taskOutput, string workflowId, string taskRefName, string status, string workerid = null)
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

```javascript
TaskResourceService.updateTask(
    workflowId: string,
    taskRefName: string,
    status: 'IN_PROGRESS' | 'FAILED' | 'FAILED_WITH_TERMINAL_ERROR' | 'COMPLETED',
    taskOutput: Record<string, any>,
): CancelablePromise<string>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
TaskResourceService.updateTask(
    workflowId: string,
    taskRefName: string,
    status: 'IN_PROGRESS' | 'FAILED' | 'FAILED_WITH_TERMINAL_ERROR' | 'COMPLETED',
    taskOutput: Record<string, any>,
): CancelablePromise<string>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(task-resource/update-task-by-reference-name options workflow-id task-reference-name status update-req)
```

</TabItem>
</Tabs>

### Using Conductor UI

- Navigate to the workflow execution, and click on the task whose status is to be updated manually. 
- From the summary tab, select the status under the field *Update task*.

<p align="center"><img src="/content/img/manually-completing-task-in-conductor.png" alt="Manually completing the task from Conductor UI" width="90%" height="auto"></img></p>


## Terminate Workflow

In certain situations, you may want to send signals to terminate the workflows.


### Using API

Use the following API with the workflowId as the input parameter to terminate your running workflow:

```
DELETE /workflow/{workflowId}
```

### SDKs

<Tabs>
<TabItem value="Java" label="Java">

```java
void terminateWorkflow(String workflowId, String reason)
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) Terminate(workflowId string, reason string) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.terminate1(self, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
void WorkflowResourceApi.Terminate(string workflowId, string reason = null, bool? triggerFailureWorkflow = null)
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

```javascript
WorkflowExecutor.terminate(
    workflowId: string,
    reason: string,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.terminate(
    workflowId: string,
    reason: string,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/terminate-workflow [options workflow-id & args])
```

</TabItem>
</Tabs>

### Using Conductor UI

From the workflow executions page, click **Actions** > **Terminate**.

<p align="center"><img src="/content/img/terminating-task-in-conductor.png" alt="Terminating Workflow from Conductor UI" width="90%" height="auto"></img></p>
