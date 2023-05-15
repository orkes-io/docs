---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sub Workflow

Sub Workflow allows executing another workflow from within the current workflow. 

## Definitions

```json
    {
      "name": "sub_workflow",
      "taskReferenceName": "sub_workflow_task_ref",
      "type": "SUB_WORKFLOW",
      "subWorkflowParam": {
        "name": "sub-workflow-name",
        "version": 1
      }
    }
```

:::tip
* The Do-While task does not allow nested Do-While tasks. But it does permit a sub-workflow that can have a Do-While loop inside it.
* Dynamic Forks can only contain one task. But using the sub-workflow concept, this single task can be a sub-workflow that includes additional tasks.
:::

### Input Parameters

| Attribute        | Description                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subWorkflowParam | It includes the parameters name, version, & taskToDomain. <ul><li>**name** - You need to map this field with the name of the workflow you are planning to execute.</li><li>**version** - Include the version of the workflow to be executed.</li><li>**[taskToDomain](/content/developer-guides/task-to-domain)** - Allows scheduling the sub-workflow tasks per given mappings.</li></ul>                                |
| inputParameters  | The sub-workflow’s input can be coupled to the workflow’s input parameters, or it can be invoked from the output of the preceding task. For example, if you are taking the sub-workflow’s input parameter from the workflow, then you need to initially add this as an input parameter in the parent workflow (workflow to be called as the sub-workflow). Then you can call the same input parameter inside the sub-workflow definition. |

### Output Parameters

| Attribute     | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| subWorkflowId | Subworkflow execution ID generated when running the sub-workflow. |

The output of the sub-workflow is also supplied to the output of the workflow.

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Sub Workflow`.
2. Select the workflow and version.
3. Add input parameters.
4. Add task to domain if applicable.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-subworkflow-task.png" alt="Adding wait task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
    {
      "name": "sub_workflow_task_example",
      "taskReferenceName": "sub_workflow_task_example_ref_1",
      "inputParameters": {
        "workflowInput": "${workflow.input.sampleInput}"
      },
      "type": "SUB_WORKFLOW",
      "subWorkflowParam": {
        "name": "wait-task-example",
        "tasksToDomain": {
          "*": "mydomain"
        }
      }
    }
```

</TabItem>
</Tabs>

<details><summary>Complete Example</summary>
<p>
Imagine that we have this address verification workflow:

<p align="center"><img src="/content/img/postage-rate.png" alt="Postage Rate Example" width="50%" height="auto"></img></p>

If you wanted to add this functionality to another workflow, it would be possible to copy the list of tasks into our workflow. However, a better way would be to use a sub workflow so that any future updates made to this workflow automatically reflects in all workflows that uses it.

```json
    {
      "name": "postage_rate_subworkflow",
      "taskReferenceName": "postage_rate_subworkflow_ref",
      "type": "SUB_WORKFLOW",
      "subWorkflowParam": {
        "name": "shipping_rate",
        "version": 1
      }
    }
```

<p align="center"><img src="/content/img/sub-workflow-replaced.jpg" alt="Sub Workflow Replaced" width="30%" height="auto"></img></p>

This makes our workflow more maintainable and will reflect all future changes to the **postage_rate** workflow.
</p>
</details>

<FAQStructuredData faqs={faqs} />

import FAQStructuredData from '@site/src/theme/FAQStructuredData';

export const faqs = [
  {
    question: 'How do we retry a sub-workflow from a specific task?',
    answer: (
      <div>
        <p>
          You can use the following API to retry a sub-workflow from a specific task. From the Conductor UI, you check the task level start time to verify that the preceding tasks are not re-run. Additionally, you can insert a WAIT task before the desired re-run starting point and confirm that it does not transition to the state of that WAIT task.
        </p>
        <pre>
          <code>
            {`curl -X POST 'https://<conductor_server_dns>/api/workflow/<workflow_id>/rerun' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "reRunFromTaskId": "<task_execution_id>"
  }' \\
  -H 'x-authorization: <auth_token>'`}
          </code>
        </pre>
      </div>
    ),
  },
];