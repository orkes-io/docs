---
sidebar_position: 15
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrade Workflow

This api is used to upgrade running workflow to a newer/older version.
All the tasks that present earlier in the new definition will be marked as skipped.
taksOutput is the map contains output of the tasks that are going to be skipped.
workflowInput is the map if user want to set the input to the workflow that is being upgraded.
The support for this api is in beta.

## Input Payload

| Attribute     | Description                                                                                                                  | 
|---------------|------------------------------------------------------------------------------------------------------------------------------| 
| workflowId    | The unique identifier of the workflow to be upgraded.                                                                        | 
| name          | Name of the workflow to pick the definition from.                                                                            |
| version       | Version of the workflow to pick the definition from.                                                                         |
| taskOutput    | Map of Key and Value for the tasks that are going to be skipped. key is the task reference name and value is the task output |
| workflowInput | Map of Key and Value given as the input to the new workflow execution                                                        |

## API Endpoint
```
POST /workflow/{workflowId}/upgrade
```

## Examples


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