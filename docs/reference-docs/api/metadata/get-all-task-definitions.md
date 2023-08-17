---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get All Task Definitions

Get all the task definitions.

## API Endpoint
```
GET /api/metadata/taskdefs
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
void OrkesMetadataClient.getAllTaskDefs() throws ApiException
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (a *MetadataResourceApiService) GetAll(ctx context.Context) ([]model.WorkflowDef, *http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
metadata_client = MetadataResourceApi(api_client)
metadata_client.get_task_defs(body, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
List<TaskDef> MetadataResourceApi.GetTaskDefs(string access = null, bool? metadata = null, string tagKey = null, string tagValue = null)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
MetadataResourceService.getTaskDefs(
    access: string = 'READ',
    metadata: boolean = false,
    tagKey?: string,
    tagValue?: string,
  ): CancelablePromise<Array<TaskDef>>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
MetadataResourceService.getTaskDefs(
    access: string = 'READ',
    metadata: boolean = false,
    tagKey?: string,
    tagValue?: string,
  ): CancelablePromise<Array<TaskDef>>
```

</TabItem>
</Tabs>
