---
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get All Workflow Definitions

The API to get all the workflow definitions.

## API Endpoint

```
GET /api/metadata/workflow
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
WorkflowDef OrkesMetadataClient.getAllWorkflowDefs()
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (a *MetadataResourceApiService) GetAll(ctx context.Context) ([]model.WorkflowDef, *http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
MetadataResourceApi.get_all_workflows(**kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
List<WorkflowDef> MetadataResourceApi.GetAllWorkflows(string access = null, bool? metadata = null, string tagKey = null, string tagValue = null, bool? _short = null)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
MatadataResourceService.getAllWorkflows(
    access: string = 'READ',
    metadata: boolean = false,
    tagKey?: string,
    tagValue?: string,
  ): CancelablePromise<Array<WorkflowDef>>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
MatadataResourceService.getAllWorkflows(
    access: string = 'READ',
    metadata: boolean = false,
    tagKey?: string,
    tagValue?: string,
  ): CancelablePromise<Array<WorkflowDef>>
```

</TabItem>
</Tabs>
