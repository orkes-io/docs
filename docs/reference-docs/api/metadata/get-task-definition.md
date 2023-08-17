---
sidebar_position: 5
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Task Definition

Get the task definition for the task type
## Input Payload


| Attribute  | Description                                    |
| ---------- |------------------------------------------------|
| taskType   | TaskType for which task definition has to get. | 
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
metadata_client = MetadataResourceApi(api_client)
metadata_client.get_task_def(tasktype, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
Object MetadataResourceApi.RegisterTaskDef(List<TaskDef> body)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
MetadataResourceService.registerTaskDef(requestBody: Array<TaskDef>): CancelablePromise<any>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```javascript
MetadataResourceService.registerTaskDef(requestBody: Array<TaskDef>): CancelablePromise<any>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(metadata-resource/register-tasks options [tasks])
```

</TabItem>
</Tabs>
