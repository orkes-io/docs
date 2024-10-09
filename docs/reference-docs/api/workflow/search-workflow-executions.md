---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Search Workflow Executions

Used to retrieve a list of workflow executions based on the provided search criteria.

## Input Payload

| Attribute  | Description                                                                                                                                                                                                                                                                                                                      |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| start      | The start of the search results list, which is used for pagination. Default value: 0                                       | 
| size       | The number of search results that should be returned from the specified start. Default value = 100                               | 
| sort      | The manner in which the list will be sorted, in the format "FIELD:ASC|DESC”. Example: `sort = “workflowId:DESC”`.      |
| freeText   | All full-text indexed data associated with the workflow execution (workflow input, output, and task outputs), up to a certain limit. Default value: * <br/> **Note**: Check with you admins to get the size limit.       |
| query       | The query expression in the format “FIELD = VALUE” or “FIELD IN (value1, value2)”. Supported fields for querying: <ul><li>workflowId</li> <li>correlationId</li> <li>workflowType</li> <li>status</li> <li>startTime</li> <li>modifiedTime</li></ul> Only AND operations are supported. <br/><br/> Example queries: <ul><li>workflowType = your_workflow_name</li> <li>status IN (SCHEDULED, IN_PROGRESS)</li> <li>startTime >1726655978410</li> <li>startTime < 1696143600000</li> <li>workflowType = your_workflow_name AND status = SCHEDULED</li> <li>workflowId IN (3434546, 45365767, 20984885) AND workflowType = test_workflow</li></ul>                       | 
| skipCache      | Whether to skip caching. Default value: false        |  


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
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) Search(start int32, size int32, query string, freeText string) ([]model.WorkflowSummary, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.search(self, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
ScrollableSearchResultWorkflowSummary WorkflowResourceApi.Search(string queryId = null, int? start = null, int? size = null, string sort = null, string freeText = null, string query = null, bool? skipCache = null)
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

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