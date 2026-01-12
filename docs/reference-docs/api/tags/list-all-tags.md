---
sidebar_position: 1
slug: "/reference-docs/api/tags/list-all-tags"
description: "This API is used to list all tags from the cluster"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# List All Tags

**Endpoint**: `GET /api/metadata/tags`

Retrieves all tags defined in the cluster. Tags are returned as key-value pairs.

## Response

Returns a JSON array of tag objects. Each object includes:

- key (string): The tag name.
- value (string): The tag value.

## Examples

<details>
<summary>Get all tags</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-CLUSTER>/api/metadata/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns an array of all tags in the cluster.

```json
[
  {
    "key": "team",
    "value": "blog"
  },
  {
    "key": "team",
    "value": "docs"
  }
]
```

</details>