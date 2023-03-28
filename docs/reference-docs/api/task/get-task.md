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
func (a *TaskResourceApiService) GetTask(ctx context.Context, taskId string) (model.Task, *http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
TaskResourceApi.get_task(task_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp

```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript

```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure

```

</TabItem>
</Tabs>
