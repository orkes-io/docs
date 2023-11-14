---
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Secret

A system task to update the value of any secret, given the user has permission to update the secret.

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

| Attributes  | Description             |
|-------------|-------------------------|
| secretKey   | Name of the secret key.  |
| secretValue | Value of the secret key. |

:::note Notes
1. The user must have update permission over the secretKey; otherwise, the workflow will be terminated with a 403 error.
2. If the secret does not exist by the secretKey, it will be created, and the value will be as per the secretValue.
3. Only one secret can be updated at a time.
:::


