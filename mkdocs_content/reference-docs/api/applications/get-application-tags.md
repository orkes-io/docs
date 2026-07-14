---
title: "Get Tags from Application"
description: "Use the Orkes Conductor applications API to get Tags from Application. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/applications/get-application-tags"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Tags from Application, Get Tags from Application API, API orchestration, API gateway"
---

# Get Tags from Application

## Quick reference

Use this applications endpoint to get Tags from Application. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/applications/{id}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/applications/{id}/tags`

Retrieves the tags associated with an application.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| id | The unique identifier of the application from which the tags are to be retrieved. | string | Required. |

## Response

Returns an array of tag objects, each containing a key-value pair. Returns an empty array if the application has no tags.

## Examples

<details>
<summary>Get tags from an application</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/applications/db66991f-206f-4695-8fe9-f5d53976c9a8/tags' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "key": "dev",
    "value": "automation"
  }
]
```

</details>
