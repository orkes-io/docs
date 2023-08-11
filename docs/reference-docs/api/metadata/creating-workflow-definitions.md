---
sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating Workflow Definitions

Workflow can be defined as the collection of tasks and operators that specifies the order and execution of the defined tasks.

## Input Payload

You can configure workflow definitions directly via UI and using API. The workflow definitions include the following parameters:

| Attribute                     | Description                                                                                                                                                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name                          | Provide a unique name to identify the workflow. This field is mandatory.                                                                                                                                                                               |
| description                   | Include a description to indicate the purpose of the workflow. This field is optional.                                                                                                                                                                 |
| version                       | You can give versions to the workflow to keep track of the changes. By default, the value is 1.                                                                                                                                                        |
| tasks                         | You can provide the tasks to be executed in the workflow here. If the task type is an operator or a system task, it is handled by the Conductor server. For user-defined/worker tasks, a worker running outside the Conductor environment is required. |
| inputParameters               | Indicates the input values for the workflow.                                                                                                                                                                                                           |
| outputParameters              | Indicates the output values of the workflow.                                                                                                                                                                                                           |
| schemaVersion                 | Indicates the version number of the workflow definition schema.                                                                                                                                                                                        |
| restartable                   | Set this value to **true** to restart a completed workflow. If restarting a completed workflow can impact the functioning, set this value to **false**.                                                                                                |
| workflowStatusListenerEnabled | Setting this value to **true**, archive the workflow when completed. This would remove the workflow definition from the Redis persistence module. To unarchive, set the value to **false**.                                                            |
| ownerEmail                    | This field will be auto-populated with the user’s email address.                                                                                                                                                                                       |
| timeoutSeconds                | Time (in seconds), after which the workflow is marked as TIMED_OUT if not completed after transitioning to IN_PROGRESS status for the first time. No timeout occurs if the value is set to 0.                                                           |
| timeoutPolicy                 | Indicates the condition at which the workflow should time out. It can take any of the following values:<ul><li>**TIME_OUT_WF** - The workflow status is marked as TIMEOUT and is terminated.</li><li>**ALERT_ONLY** - Registers a counter.</li></ul>   |
| failureWorkflow               | Provide the workflow name to be triggered upon a failure of the execution of this workflow.                                                                                                                                                            |


## API Endpoint

```
POST /api/metadata/workflow
```

When a workflow definition is updated via API, it automatically increments the workflow version to the latest.

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
void OrkesMetadataClient.registerWorkflowDef(WorkflowDef workflowDef) throws ApiException
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (*MetadataResourceApiService) RegisterWorkflowDef(ctx context.Context, overwrite bool, body model.WorkflowDef) (*http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
MetadataResourceApi.create(body, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
Object MetadataResourceApi.Create(WorkflowDef body, bool? overwrite = null)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
WorkflowExecutor.registerWorkflow(override: boolean, workflow: WorkflowDef)
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.registerWorkflow(override: boolean, workflow: WorkflowDef)
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(metadata-resource/register-workflow-def options workflow true)
```

</TabItem>
</Tabs>
