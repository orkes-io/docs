---
sidebar_position: 3
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Delete Task Definitions

The API to delete the task definitions. 

## Input Parameters

| Attribute  | Description                                           |
|------------|-------------------------------------------------------|
| taskType   | The name of the task which is to be deleted. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

## API Endpoint
```
DELETE /api/metadata/taskdefs/{taskType}
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
void OrkesMetadataClient.unregisterTaskDef(String taskType) throws ApiException
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (a *MetadataResourceApiService) UnregisterTaskDef(ctx context.Context, tasktype string) (*http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
MetadataResourceApi.unregister_task_def(tasktype, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
void MetadataResourceApi.UnregisterTaskDef(string tasktype)
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

```javascript
MetadataResourceService.unregisterTaskDef(tasktype: string): CancelablePromise<any>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
MetadataResourceService.unregisterTaskDef(tasktype: string): CancelablePromise<any>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(metadata/unregister-task options task-ref)
```

</TabItem>
</Tabs>
