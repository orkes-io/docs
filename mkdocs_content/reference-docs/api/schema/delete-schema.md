---
title: "Delete Schema"
description: "Use the Orkes Conductor schemas API to delete Schema. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/schema/delete-schema"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete Schema, Delete Schema API, API orchestration, API gateway"
---

# Delete Schema

## Quick reference

Use this schemas endpoint to delete Schema. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/schema/{name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/schema/{name}`

Deletes a schema. This operation deletes all versions of the specified schema.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the schema to delete.| string | Required. | 

## Response

Returns 200 OK, indicating that the schema has been deleted. Returns 404 if an invalid schema name is provided.

## Examples

<details>
<summary>Delete a schema</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/schema/productSchema' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the schema has been deleted.

</details>
