---
title: "Delete Environment Variable"
description: "Use the Orkes Conductor environment variables API to delete Environment Variable. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/environment-variables/delete-environment-variable"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete Environment Variable, Delete Environment Variable API, API orchestration, API gateway"
---

# Delete Environment Variable

## Quick reference

Use this environment variables endpoint to delete Environment Variable. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/environment/{key}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/environment/{key}`

Deletes an environment variable. The requesting user must have either an **Admin** or **Metadata** role. 

## Path parameters

| Parameter | Description                                                       | Type   | Required/ Optional |
| --------- | ----------------------------------------------------------------- | ------ | ------------------ |
| key | The name of the environment variable to delete. | string | Required. | 

## Response

Returns the value of the environment variable that was deleted.

## Examples

<details>
<summary>Delete an environment variable</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/environment/url' \
  -H 'accept: text/plain' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{ "baseUrl": "https://orkes-api-tester.orkesconductor.com/api", "timeout": 5000 }
```

</details>

## Related pages

- [Environment Variables](/content/reference-docs/api/environment-variables)
- [Create/Update Environment Variable](/content/reference-docs/api/environment-variables/create-environment-variable)
- [Get Environment Value by Key](/content/reference-docs/api/environment-variables/get-environment-value-by-key)
- [Get All Environment Variables](/content/reference-docs/api/environment-variables/get-all-environment-variables)
- [Add Tags to an Environment Variable](/content/reference-docs/api/environment-variables/add-tags-to-environment-variable)
- [Get Tags from an Environment Variable](/content/reference-docs/api/environment-variables/get-tags-from-environment-variable)
