---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Search for workflow executions
Searches for workflows

## Properties
- Start: Start index - used for pagination
- Size:  Number of results to return
- Query: Query expression.  In the format FIELD = 'VALUE' or FIELD IN (value1, value2) Only AND operations are supported.  e.g. workflowId IN ('a', 'b', 'c') ADN workflowType ='test_workflow' AND startTime BETWEEN 1000 and 2000 Supported fields for Query are:workflowId,workflowType,status,startTime
- FreeText: Full text search.  All the workflow input, output and task outputs upto certain limit (check with your admins to find the size limit) are full text indexed and can be used to search

## API
GET /workflow/search

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
UnsupportedOperationException
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) Search(start int32, size int32, query string, freeText string) ([]model.WorkflowSummary, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.search(self, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
ScrollableSearchResultWorkflowSummary WorkflowResourceApi.Search(string queryId = null, int? start = null, int? size = null, string sort = null, string freeText = null, string query = null, bool? skipCache = null)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
WorkflowResourceService.searchWorkflowsByTasks(
    start?: number,
    size: number = 100,
    sort?: string,
    freeText: string = '*',
    query?: string,
): CancelablePromise<SearchResultWorkflowSummary>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure

```

</TabItem>
</Tabs>