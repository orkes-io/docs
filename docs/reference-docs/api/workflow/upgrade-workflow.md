---
sidebar_position: 15
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrade Workflow

This api is used to upgrade running workflow to a newer/older version.
All the tasks that present earlier in the new definition will be marked as skipped.
taskOutput is the map contains output of the tasks that are going to be skipped.
workflowInput is the map if user want to set the input to the workflow that is being upgraded.
The support for this api is in beta.

## Input Payload

| Attribute     | Description                                                                                                                  | 
|---------------|------------------------------------------------------------------------------------------------------------------------------| 
| workflowId    | The unique identifier of the workflow to be upgraded.                                                                        | 
| name          | Name of the workflow to pick the definition for upgrade.                                                                     |
| version       | Version of the workflow to pick the definition for upgrade.                                                                  |
| taskOutput    | Map of Key and Value for the tasks that are going to be skipped. key is the task reference name and value is the task output |
| workflowInput | Map of Key and Value given as the input to the new workflow execution                                                        |

## API Endpoint
```
POST /workflow/{workflowId}/upgrade
```

## Examples

Consider a workflow definition as per below,
<p align="center"><img src="/content/img/upgrade-workflow-old-definition.png" alt="Upgrade workflow old definition" width="33%" height="20%"></img></p>
and the new definition of the workflow is,
<p align="center"><img src="/content/img/upgrade-workflow-new-definition.png" alt="Upgrade workflow new definition" width="33%" height="20%"></img></p>

Now the workflow with version 1 is triggered and currently task_2 is completed but task_4 is in running state,
<p align="center"><img src="/content/img/upgrade-workflow-old-running.png" alt="Upgrade workflow old instance running" width="33%" height="20%"></img></p>

Now when we call upgrade api with following UpgradeWorkflowRequest,
```java
UpgradeWorkflowRequest upgradeWorkflowRequest = new UpgradeWorkflowRequest();
        Map<String, Object> output = Map.of("updatedBy" , "upgrade");
        upgradeWorkflowRequest.setTaskOutput(Map.of("simple_task3", output,"simple_task1",output));
        upgradeWorkflowRequest.setWorkflowInput(Map.of("name", "orkes"));

        upgradeWorkflowRequest.setVersion(2);
        upgradeWorkflowRequest.setName(workflowName);
```
The workflow state will be changed as below,
<p align="center"><img src="/content/img/upgrade-workflow-new-running.png" alt="Upgrade workflow new instance running" width="33%" height="20%"></img></p>
Also the task that are skipped i.e. simple_task_1 and simple_task_3 will have output as per the map output above.
The workflow input will also get changed as per the workflowInput map.

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
void upgradeRunningWorkflow(String workflowId, UpgradeWorkflowRequest upgradeWorkflowRequest)
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
<TabItem value="Typescript" label="Typescript">

```typescript
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
```

</TabItem>
</Tabs>