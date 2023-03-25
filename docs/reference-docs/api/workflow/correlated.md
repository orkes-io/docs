---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get workflows by correlation Id

Given the list of correlation ids, find and return workflows

## Properties

Returns a map with key as correlationId and value as a list of Workflows. When IncludeClosed is set to true, the return value also includes workflows that are completed otherwise only running workflows are returned

## API

POST /workflow/{name}/correlated

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
Map<String, List<Workflow>> getWorkflowsByNamesAndCorrelationIds(List<String> correlationIds, List<String> workflowNames, Boolean includeClosed, Boolean includeTasks)
```

</TabItem>
<TabItem value="Golang" label="Golang">

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
WorkflowResourceService.getWorkflows(
    name: string,
    requestBody: Array<string>,
    includeClosed: boolean = false,
    includeTasks: boolean = false,
): CancelablePromise<Record<string, Array<Workflow>>>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure

```

</TabItem>
</Tabs>
