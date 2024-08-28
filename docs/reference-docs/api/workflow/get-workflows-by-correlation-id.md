---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Workflows by Correlation ID

With the list of correlation IDs, this API helps in finding and returning workflows.

## Input Payload

| Attribute | Description |
| --------- | ----------- | 
| name | The name of the workflow for which the correlated workflow is to be fetched. | 

## API Endpoint

```
POST /workflow/{name}/correlated
```

Returns a map with **key** as *correlationId* and **value** as a *list of Workflows*. When **IncludeClosed** is set to true, the return value also includes workflows that are completed; otherwise, only running workflows are returned,

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
Map<String, List<Workflow>> getWorkflowsByNamesAndCorrelationIds(List<String> correlationIds, List<String> workflowNames, Boolean includeClosed, Boolean includeTasks)
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) GetByCorrelationIds(workflowName string, includeClosed bool, includeTasks bool, correlationIds ...string) (map[string][]model.Workflow, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.get_workflows(self, body, name, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
string WorkflowResourceApi.StartWorkflow(StartWorkflowRequest body)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
WorkflowResourceService.getWorkflow1(
    name: string,
    correlationId: string,
    includeClosed: boolean = false,
    includeTasks: boolean = false,
): CancelablePromise<Record<string, Array<Workflow>>>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowResourceService.getWorkflow1(
    name: string,
    correlationId: string,
    includeClosed: boolean = false,
    includeTasks: boolean = false,
): CancelablePromise<Record<string, Array<Workflow>>>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/get-workflows [options wf-name correlation-id o-options])
```

</TabItem>
</Tabs>
