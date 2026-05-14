---
title: "Delete Schema Version"
description: "Use the Orkes Conductor schemas API to delete Schema Version. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/schema/delete-schema-version"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Delete Schema Version

## Quick reference

Use this schemas endpoint to delete Schema Version. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/schema/{name}/{version}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/schema/{name}/{version}`

Deletes a specific version of the schema from the Conductor server by its name. 

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the schema to delete.| string | Required. | 
|version | The version of the schema to delete. | integer | Required. | 

## Response

Returns 200 OK, indicating that the specific schema version has been deleted. Returns 500 if an invalid path parameter is provided.

## Examples

<details>
<summary>Delete a specific version of a schema</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/schema/itemSchema/2' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the specific version of the schema has been deleted.

</details>
