---
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Secret

A system task that updates the value of any secret, given that the user has permission to update the secret.

## Definitions

```json
{
 "name": "update_secret_task",
 "taskReferenceName": "update_secret_task_ref",
 "type": "UPDATE_SECRET",
 "inputParameters": {
   "_secrets": {
     "secretKey" : "my_secret",
     "secretValue" : "1234"
   }
 }
}
```

### Input Parameters

| Attribute  | Description             |
|-------------|-------------------------|
| secretKey   | Name of the secret key.  |
| secretValue | Value of the secret key. |
| optional | If enabled, the task becomes optional, allowing the workflow to continue regardless of the task's outcome (whether it fails or remains incomplete). | 

:::note Notes
- The user must have update permission for the specified **_secretKey_**; otherwise, the workflow will terminate with a 403 error.
- If the secret does not exist, it will be created with the **_secretValue_** provided as the input parameter to the task.
- Only one secret can be updated at a time.
:::

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **Update Secret**.
2. Configure the secret key and value.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/update-secret-ui-guide.png" alt="Update Secret UI" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

```json
{
 "name": "update_secret_task",
 "taskReferenceName": "update_secret_task_ref",
 "type": "UPDATE_SECRET",
 "inputParameters": {
   "_secrets": {
     "secretKey" : "my_secret",
     "secretValue" : "1234"
   }
 }
}
```

</TabItem>
</Tabs>
