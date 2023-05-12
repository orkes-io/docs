---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# List Human Tasks

Used to retrieve a list of human tasks by filters. An example use for this API will be to compose an inbox view for a user.

:::note
The invoking user should be a task owner or an ADMIN or an assignee to the tasks returned. 
When using application credentials, the application should be an owner of the task in the workflow definition.
:::

## Input Payload

| Attribute           | Description                                                                                                                           |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------| 
| state               | The *state* of the human task which you want to retrieve - available options are PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, TIMED_OUT |
| assignee            | The assignee on the task                                                                                                              |
| assigneeType        | The assignee type on the task - options are EXTERNAL_USER, EXTERNAL_GROUP, CONDUCTOR_USER, CONDUCTOR_GROUP                            |
| claimedBy           | The id of the user who claimed the task - format is `assigneeType:<value>` ex: `EXTERNAL_GROUP:group-name`                            |
| taskName            | The name of the task - this is also the UI template name of the task                                                                  |
| freeText            | Additional criteria of a free text - this can include input/output values and other indexed fields                                    |
| includeInputOutput  | Boolean to indicate if the inputs and outputs of the task should be included in the response                                          |

## API Endpoint 

```
GET human/tasks
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
