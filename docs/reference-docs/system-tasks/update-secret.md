---
sidebar_position: 14
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Secret

Update Secret is used to update value of any secret given the user has permission to update the secret.

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
| secretKey   | name of the secret key  |
| secretValue | value of the secret key |

**Notes**
1. User must have update permission over the secretKey otherwise workflow will be terminated with 403 error.
2. If the secret does not exist by the secretKey, it will be created and the value will be as per the secretValue
3. Only one secret can be updated at a time.


