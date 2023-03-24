---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get workflows by correlation Id

Given the list of correlation ids, find and return workflows

## Properties

## API

POST /workflow/{name}/correlated

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java

```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) GetByCorrelationIds(workflowName string, includeClosed bool, includeTasks bool, correlationIds ...string) (map[string][]model.Workflow, error)
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
