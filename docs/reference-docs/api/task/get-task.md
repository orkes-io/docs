---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get task

Returns a task given an id

## API

```
GET /tasks/{taskId}
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
Task OrkesTaskClient.getTaskDetails(String taskId) throws ApiException
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (*TaskResourceApiService) GetTask(ctx context.Context, taskId string) (model.Task, *http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
TaskResourceApi.get_task(task_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
Task TaskResourceApi.GetTask(string taskId)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
TaskResourceService.getTask(taskId: string): CancelablePromise<Task>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(task-resource/get-task-details [options task-ex-id])
```

</TabItem>
</Tabs>
