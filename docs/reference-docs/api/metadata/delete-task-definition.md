---
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Delete Task Definitions


## Request Paramater

| Attribute  | Description                                           |
|------------|-------------------------------------------------------|
| taskType   | Task name for which task definition has to be deleted |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

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
<TabItem value="Golang" label="Golang">

```go
func (*MetadataResourceApiService) RegisterTaskDef(ctx context.Context, body []model.TaskDef) (*http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
metadata_client = MetadataResourceApi(api_client)
metadata_client.unregister_task_def(tasktype, **kwargs)
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
