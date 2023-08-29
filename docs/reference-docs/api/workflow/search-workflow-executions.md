---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Search for Workflow Executions

Used to search for workflow executions.

## Input Payload

| Attribute  | Description                                                                                                                                                                                                                                                                                                                      |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Start      | Indicates the start index, which is used for pagination.                                                                                                                                                                                                                                                                         | 
| Size       | Indicates the number of results to return.                                                                                                                                                                                                                                                                                       | 
| Query      | The query expression in the format FIELD = 'VALUE' or FIELD IN (value1, value2). Only **AND** operations are supported. E.g., workflowId IN ('a', 'b', 'c') AND workflowType ='test_workflow' AND startTime BETWEEN 1000 and 2000. Supported fields for Query are: **workflowId**,**workflowType**,**status**,and **startTime**. |
| FreeText   | All the workflow input, output, and task outputs up to a certain limit (check with your admins to find the size limit) are full-text indexed and can be used to search.                                                                                                                                                          |

## API Endpoint
```
GET /workflow/search
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
SearchResult<WorkflowSummary> search(Integer start, Integer size, String sort, String freeText, String query)

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
WorkflowResourceService.search(
    start?: number,
    size: number = 100,
    sort?: string,
    freeText: string = '*',
    query?: string,
): CancelablePromise<SearchResultWorkflowSummary>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.search(
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
(workflow-resource/search [options query])
```

</TabItem>
</Tabs>