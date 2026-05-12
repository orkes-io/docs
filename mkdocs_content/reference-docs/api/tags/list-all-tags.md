---
title: "List All Tags"
description: "Use the Orkes Conductor tags API to list All Tags. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
---

# List All Tags

## Quick reference

Use this tags endpoint to list All Tags. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/metadata/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/metadata/tags`

Retrieves all tags defined in the cluster. Tags are returned as key-value pairs.

## Response

Returns a JSON array of tag objects. Each object includes:

- key (string): The tag key.
- value (string): The tag value.

## Examples

<details>
<summary>Get all tags</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/metadata/tags' \
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
