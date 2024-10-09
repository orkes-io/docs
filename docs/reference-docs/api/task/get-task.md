---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Task

Used to retrieve the current state and details of the specific task.

## Input Payload

| Attribute | Description |
| --------- | -------------- | 
| taskId | The *taskId* of the task for which you want to log the message. | 

## API Endpoint

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
<TabItem value="Go" label="Go">

```go
func (*TaskResourceApiService) GetTask(ctx context.Context, taskId string) (model.Task, *http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
TaskResourceApi.get_task(task_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
Task TaskResourceApi.GetTask(string taskId)
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

```javascript
TaskResourceService.getTask(taskId: string): CancelablePromise<Task>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
TaskResourceService.getTask(taskId: string): CancelablePromise<Task>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(task-resource/get-task-details options task-ex-id)
```

</TabItem>
</Tabs>
