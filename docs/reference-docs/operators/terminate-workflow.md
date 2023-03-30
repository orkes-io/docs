import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terminate Workflow Task

```json
"type" : "TERMINATE_WORKFLOW"
```

The Terminate Workflow task is used to terminate other workflows using their workflow IDs.

## Configurations

```json
{
  "name": "terminate_workflow_task",
  "taskReferenceName": "terminate_workflow_task_ref",
  "inputParameters": {
    "workflowId": "someWorkflowID",
    "terminationReason": "a termination reason"
  },
  "type": "TERMINATE_WORKFLOW"
}
```

### Input Parameters

| Attribute         | Description                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| workflowId        | Provide the workflow IDs of the workflow to be executed.                                                                        |
| terminationReason | Provide the reason for the workflows being terminated. It helps in giving a clear picture as to why the workflow is terminated. |

### Output Parameters

| Attribute           | Description                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| terminatedWorkflows | Includes the set of workflow IDs corresponding to the workflows that were terminated. |

## Examples

<Tabs>
<TabItem value="JSON" label="JSON">

```json
{
  "name": "terminate_workflow_example",
  "taskReferenceName": "terminate_ref",
  "inputParameters": {
    "workflowId": ["0ea3b193-7268-4886-aa97-d6ed170de854", "${workflow.input.idProvidedFromWorkflowInput}"],
    "terminationReason": "Custom reason for termination"
  },
  "type": "TERMINATE_WORKFLOW"
}
```

</TabItem>
<TabItem value="Java" label="Java">

<!-- TODO Gustavo -->
```java

```

</TabItem>
<TabItem value="Golang" label="Golang">

<!-- TODO Gustavo -->
```go

```

</TabItem>
<TabItem value="Python" label="Python">

<!-- TODO Gustavo -->
```python

```

</TabItem>
<TabItem value="CSharp" label="CSharp">

<!-- TODO Gustavo -->
```csharp

```

</TabItem>
<TabItem value="Javascript" label="Javascript">

<!-- TODO Gustavo -->
```javascript

```

</TabItem>
<TabItem value="Clojure" label="Clojure">

<!-- TODO Gustavo -->
```clojure

```

</TabItem>
</Tabs>

<details><summary>Add Examples</summary>
<p>
</p>
</details>