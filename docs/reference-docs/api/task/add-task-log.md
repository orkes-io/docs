---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Add Task Execution Log

Log Task Execution Details

## API

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
<TabItem value="Golang" label="Golang">

```go
func (a *TaskResourceApiService) Log(ctx context.Context, body string, taskId string) (*http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python

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
