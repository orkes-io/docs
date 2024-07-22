---
sidebar_position: 6
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating Workflow Definition

A workflow is a collection of tasks and operators that define the sequence and execution of tasks. This API allows you to create workflow definitions in Orkes Conductor.

## Input Payload

You can configure workflow definition directly via UI and using API. The workflow definition includes the following parameters:

| Attribute                     | Description                                                                                                                                                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name                          | Provide a unique name for the workflow. This field is mandatory.                                                                                                                                                                              |
| description                   | Include a description that explains the purpose of the workflow. This field is optional.                                                                                                                                                                 |
| version                       | Specify the version number of the workflow to track changes. The default value is 0.                                                                                                                                                      |
| tasks                         | Define the tasks to be executed within the workflow. For operator or system tasks, the Conductor server manages the execution. User-defined or worker tasks require a worker running outside the Conductor environment. |
| inputParameters               | Specify the input values for the workflow.                                                                                                                                                                                                         |
| outputParameters              | Specify the output values of the workflow.                                                                                                                                                                                               |
| schemaVersion                 | Indicates the version number of the workflow definition schema.                                                                                                                                                                                       |
| restartable                   | Set to **true** to allow the workflow to be restarted after completion. Set to **false** if restarting could impact functionality.                                                                                                |
| workflowStatusListenerEnabled | Set to **true** to enable workflow status change events to sink if configured. For more information, refer to the documentation [on enabling CDC](https://orkes.io/content/developer-guides/enabling-cdc-on-conductor-workflows).                                    |
| ownerEmail                    | This field is auto-populated with the user’s email address.                                                                                                                                                  |
| timeoutSeconds                | Specifies the time (in seconds) after which the workflow is marked as TIMED_OUT if it remains in the IN_PROGRESS status. A value of 0 indicates no timeout.         |
| timeoutPolicy                 | Defines the condition under which the workflow should time out. Possible values are:<ul><li>**TIME_OUT_WF** - The workflow status is set to TIMEOUT, and the workflow is terminated.</li><li>**ALERT_ONLY** - Registers a counter.</li></ul>   |
| failureWorkflow               | Provide the name of a workflow to trigger upon failure of the current workflow execution.                                                                                                                                               |


## API Endpoint

```
POST /api/metadata/workflow
```


## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
void OrkesMetadataClient.registerWorkflowDef(WorkflowDef workflowDef) throws ApiException
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (a *MetadataResourceApiService) RegisterWorkflowDef(ctx context.Context, overwrite bool, body model.WorkflowDef) (*http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
MetadataResourceApi.metadata_client.create(body, **kwargs)
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
(metadata/register-workflow-def options workflow true)
```

</TabItem>
</Tabs>
