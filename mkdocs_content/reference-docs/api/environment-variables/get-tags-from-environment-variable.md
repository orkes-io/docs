---
title: "Get Tags from an Environment Variable"
description: "Use the Orkes Conductor environment variables API to get Tags from an Environment Variable. Includes endpoint details, authentication, parameters, request."
canonical_route: "reference-docs/api/environment-variables/get-tags-from-environment-variable"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Tags from an Environment Variable, Get Tags from an Environment Variable API, API orchestration, API gateway"
---

# Get Tags from an Environment Variable

## Quick reference

Use this environment variables endpoint to get Tags from an Environment Variable. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/environment/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/environment/{name}/tags`

Retrieves the tags associated with an environment variable.

## Path parameters

| Parameter | Description                                                       | Type   | Required/ Optional |
| --------- | ----------------------------------------------------------------- | ------ | ------------------ |
| key | The name of the environment variable from which the tags are to be retrieved. | string | Required. | 

## Response

Returns an array of tag objects, each containing a key-value pair.

## Examples 

<details>
<summary>Get tags from an environment variable</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/environment/sampleKey/tags' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "key": "backend",
    "value": "PR"
  },
  {
    "key": "dev",
    "value": "automation"
  }
]
```

</details>

## Related pages

- [Environment Variables](/content/reference-docs/api/environment-variables)
- [Create/Update Environment Variable](/content/reference-docs/api/environment-variables/create-environment-variable)
- [Get Environment Value by Key](/content/reference-docs/api/environment-variables/get-environment-value-by-key)
- [Get All Environment Variables](/content/reference-docs/api/environment-variables/get-all-environment-variables)
- [Delete Environment Variable](/content/reference-docs/api/environment-variables/delete-environment-variable)
- [Add Tags to an Environment Variable](/content/reference-docs/api/environment-variables/add-tags-to-environment-variable)
