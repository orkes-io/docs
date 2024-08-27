---
sidebar_position: 15
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrade Workflow

Upgrade Workflow API upgrades a running workflow to a newer/older version. When the workflow is running, one of the tasks would be currently in the execution state. When this workflow is upgraded using this API, all the tasks in the newer definition before this running task will be marked as skipped. 

## Input Payload

| Attribute     | Description                                                                                                                  | 
|---------------|------------------------------------------------------------------------------------------------------------------------------| 
| workflowId    | The unique identifier of the workflow to be upgraded.                                                                    | 
| name          | Name of the workflow with the latest definition to be upgraded. |                                                                   |
| version       | Version to which the workflow is to be updated. |                                                                 |
| taskOutput    | A map of key and value containing the output of the tasks that will be skipped. Here, the key is the task reference name, and the value is the task output. |
| workflowInput | A map of key and value to be given as the input to the new workflow execution.                                                  |

## API Endpoint
```
POST /workflow/{workflowId}/upgrade
```
## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
void upgradeRunningWorkflow(String workflowId, UpgradeWorkflowRequest upgradeWorkflowRequest)
```

</TabItem>
<TabItem value="Go" label="Go">

```go
Coming Soon
```

</TabItem>
<TabItem value="Python" label="Python">

```python
Coming Soon
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
Coming Soon
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
Coming Soon
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
Coming Soon
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
Coming Soon
```

</TabItem>
</Tabs>

## Examples

<details><summary>Sample Workflow</summary>
<p>

Consider a workflow definition with version 1 as follows:
<p align="center"><img src="/content/img/upgrade-workflow-old-definition.png" alt="Upgrade workflow old definition" width="33%" height="20%"></img></p>

Now let's run the workflow. Currently **simple_task2** is completed, but **simple_task4** is in a running state:
<p align="center"><img src="/content/img/upgrade-workflow-old-running.png" alt="Upgrade workflow old instance running" width="33%" height="20%"></img></p>

Now, we want to update the workflow to the newer definition with 2 more tasks as follows:
<p align="center"><img src="/content/img/upgrade-workflow-new-definition.png" alt="Upgrade workflow new definition" width="33%" height="20%"></img></p>

Let's call the upgrade API with the following **UpgradeWorkflowRequest**:
```java
UpgradeWorkflowRequest upgradeWorkflowRequest = new UpgradeWorkflowRequest();
Map<String, Object> output = Map.of("updatedBy" , "upgrade");
upgradeWorkflowRequest.setTaskOutput(Map.of("simple_task3", output,"simple_task1",output));
upgradeWorkflowRequest.setWorkflowInput(Map.of("name", "orkes"));

upgradeWorkflowRequest.setVersion(2);
upgradeWorkflowRequest.setName(workflowName);
```

Now, the workflow gets upgraded to the latest version as shown below:

<p align="center"><img src="/content/img/upgrade-workflow-new-running.png" alt="Upgrade workflow new instance running" width="33%" height="20%"></img></p>

All the tasks added above the running **simple_task4** gets skipped here. The tasks **simple_task1** and **simple_task3** will have output as per the taskOutput map above. The workflow input will also get changed as per the workflowInput map.

</p>
</details>

