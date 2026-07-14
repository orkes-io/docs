---
title: "Get Environment Value by Key"
description: "Use the Orkes Conductor environment variables API to get Environment Value by Key. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/environment-variables/get-environment-value-by-key"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Environment Value by Key, Get Environment Value by Key API, API orchestration, API gateway"
---

# Get Environment Value by Key

## Quick reference

Use this environment variables endpoint to get Environment Value by Key. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/environment/{key}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/environment/{key}`

Retrieves the value of an environment variable by its key.

## Path parameters

| Parameter | Description                                                       | Type   | Required/ Optional |
| --------- | ----------------------------------------------------------------- | ------ | ------------------ |
| key | The environment variable key to retrieve. | string | Required. | 

## Response

Returns the value associated with the retrieved key.

## Examples

<details>
<summary>Get an environment variable by key</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/environment/sampleKey' \
  -H 'accept: text/plain' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
sampleValue
```

</details>

## Related pages

- [Environment Variables](/content/reference-docs/api/environment-variables)
- [Create/Update Environment Variable](/content/reference-docs/api/environment-variables/create-environment-variable)
- [Get All Environment Variables](/content/reference-docs/api/environment-variables/get-all-environment-variables)
- [Delete Environment Variable](/content/reference-docs/api/environment-variables/delete-environment-variable)
- [Add Tags to an Environment Variable](/content/reference-docs/api/environment-variables/add-tags-to-environment-variable)
- [Get Tags from an Environment Variable](/content/reference-docs/api/environment-variables/get-tags-from-environment-variable)
