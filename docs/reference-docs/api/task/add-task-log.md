---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Add Task Log

Used to log messages associated with a specific task.

## Input Payload

| Attribute | Description |
| --------- | -------------- | 
| taskId | The *taskId* of the task for which you want to log the message. | 

## API Endpoint

```
POST /tasks/{taskId}/log
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
void OrkesTaskClient.log(String body, String taskId) throws ApiException
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (*TaskResourceApiService) Log(ctx context.Context, body string, taskId string) (*http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
TaskResourceApi.log(body, task_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
void TaskResourceApi.Log(string body, string taskId)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
TaskResourceService.log(taskId: string, logMessage:string): CancelablePromise<Array<TaskExecLog>>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
TaskResourceService.log(taskId: string,logMessage:string): CancelablePromise<Array<TaskExecLog>>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(task-resource/log-task-execution-details options task-ex-id log-message);

```

</TabItem>
</Tabs>
