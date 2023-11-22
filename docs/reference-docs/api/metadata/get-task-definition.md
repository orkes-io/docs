---
sidebar_position: 5
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Task Definition

The API to get all the task definitions.

## Input Payload


| Attribute  | Description                                    |
| ---------- |------------------------------------------------|
| taskType   | The name of the task for which the task definition is to be retrieved. | 
## API Endpoint
```
GET /api/metadata/taskdefs/{taskType}
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
void OrkesMetadataClient.getTaskDef() throws ApiException
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (a *MetadataResourceApiService) GetTaskDef(ctx context.Context, tasktype string) (model.TaskDef, *http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
MetadataResourceApi.get_task_def(tasktype, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
TaskDef MetadataResourceApi.GetTaskDef(string tasktype, bool? metadata = null)
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
<TabItem value="Clojure" label="Clojure">

```clojure
(metadata/get-task-def options task-def)
```

</TabItem>
</Tabs>
