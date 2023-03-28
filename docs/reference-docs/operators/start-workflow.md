import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Start Workflow

```json
"type" : "START_WORKFLOW"
```

Start Workflow is an operator task used to start another workflow from an existing workflow. Unlike a sub-workflow task, a start workflow task doesn’t create a relationship between the current workflow and the newly started workflow. That means it doesn’t wait for the started workflow to get completed.

## Configurations​

```json
{
      "name": "start_workflow",
      "taskReferenceName": "start_workflow_task_ref",
      "inputParameters": {
        "startWorkflow": {
          "name": "name_of_the_workflow_to_be_started",
          "version": 1
        }
      },
      "type": "START_WORKFLOW"
    }
```
* A start workflow task is considered successful when the requested workflow begins or, more precisely, when the requested workflow is in the *RUNNING* state.

### Input Parameters​

| Attribute     | Description                                                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| startWorkflow | Provide the workflow name to be started.                                                                                           |
| version       | If the workflow has different versions, you can provide the version to be started here. If not specified, the latest version runs. |

### Output Parameters​

| Attribute  | Description                              |
| ---------- | ---------------------------------------- |
| workflowId | Displays the ID of the started workflow. |

## Examples

<Tabs>
<TabItem value="JSON" label="JSON">

```json
{
    "name": "start",
    "taskReferenceName": "start_ref",
    "inputParameters": {
      "startWorkflow": {
        "name": "your_workflow_name_to_be_started",
        "version": 3
      }
}
}
```

</TabItem>
<TabItem value="Java" label="Java">

```java

```

</TabItem>
<TabItem value="Golang" label="Golang">

```go

```
</TabItem>
<TabItem value="Python" label="Python">

```python

```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp

```
</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript

```
</TabItem>

<TabItem value="clojure" label="Clojure">

```clojure

```

</TabItem>
</Tabs>

<details><summary>Sample Example</summary>
<p>
Let’s see a sample JSON file for the start workflow task:

```json
{
"name": "sample_start_workflow",
"description": "Sample Workflow to start a new workflow.",
"tasks": [
  {
    "name": "start",
    "taskReferenceName": "start_ref",
    "inputParameters": {
      "startWorkflow": {
        "name": "your_workflow_name_to_be_started",
        "version": 3,
        "input": {}
      }
    },
    "type": "START_WORKFLOW",
  }
     ],
}
```

Here the input parameters are defined as:

```json
"inputParameters": {
      "startWorkflow": {
       "name": "your_workflow_name_to_be_started",
       "version": 3
      }
},
```

This would start your workflow named **“your_workflow_name_to_be_started”** with the version being 3.

The output shows the generated workflow ID of the started workflow.

```json
{
workflowId"8ca4184e-6a52-11ed-aaf5-f62716e2ae41"
}
```

From the workflow executions page, you can click on Start Workflow on the **Summary** tab to see the newly started workflow status.

<p align="center"><img src="/content/img/start-workflow-output-in-conductor.png" alt="Completed start workflow type" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Even if the started workflow is not completed, the main workflow would be completed, i.e., in this case, even if **your_workflow_name_to_started** is not completed, the main workflow **sample_start_workflow** would be completed.
</p>
</details>