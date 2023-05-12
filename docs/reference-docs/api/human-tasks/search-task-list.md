---
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Search Human Tasks

Used to retrieve a list of human tasks by search criteria. This API is similar to [List Human Tasks](/content/reference-docs/api/human/get-task-list)

:::note
The invoking user should be a task owner or an ADMIN or an assignee to the tasks returned. 
When using application credentials, the application should be an owner of the task in the workflow definition.
:::

## Input Payload

| Attribute          | Description                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------| 
| queryId            | Not used/supported at this time                                                                    |
| start              | Marks the start of the records list                                                                |
| size               | Marks the number of the records from the start that should be returned                             |
| freeText           | Additional criteria of a free text - this can include input/output values and other indexed fields |
| query              | Query for searching the tasks                                                                      |
| jsonQuery          | JSON query for searching the tasks                                                                 |
| includeInputOutput | Boolean to indicate if the inputs and outputs of the task should be included in the response       |


:::tip
Use the UI to make searches and you can see the payload sent in the network tab to get sample values for searching.
:::

## API Endpoint 

```
GET human/tasks/search
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="Python" label="Python">

```python
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
TODO: Coming soon to the SDKs
```

</TabItem>
</Tabs>
