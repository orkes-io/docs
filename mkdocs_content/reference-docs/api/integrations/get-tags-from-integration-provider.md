---
title: "Get Tags from Integration Provider"
description: "Use the Orkes Conductor integrations API to get Tags from Integration Provider. Includes endpoint details, authentication, parameters, request bodies, response."
---

# Get Tags from Integration Provider

## Quick reference

Use this integrations endpoint to get Tags from Integration Provider. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/integrations/provider/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/integrations/provider/{name}/tags`

Retrieves the tags associated with an integration provider.

## Path parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The name of the integration from which the tags are to be retrieved. | string | Required. | 

## Response

Returns an array of tag objects, each containing a key-value pair.

## Examples

<details>
<summary>Get tags from an integration provider</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI/tags' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "key": "team",
    "value": "docs"
  },
  {
    "key": "team",
    "value": "marketing"
  }
]
```

</details>
