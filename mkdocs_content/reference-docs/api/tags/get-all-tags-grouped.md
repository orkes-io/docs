---
title: "List Tags Grouped by Resource Type"
description: "Use the Orkes Conductor tags API to list Tags Grouped by Resource Type. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/tags/get-all-tags-grouped"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# List Tags Grouped by Resource Type

## Quick reference

Use this tags endpoint to list Tags Grouped by Resource Type. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/metadata/tags/grouped`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/metadata/tags/grouped`

Retrieves all tags grouped by resource type, along with the number of resources associated with each tag.

## Response

Returns a list of tag entries. Each entry represents a unique combination of tag key, tag value, and resource type, along with the count of resources associated with that combination.

| Parameter | Description | 
| --------- | ----------- |
| tagKey | The key of the tag. | 
| tagValue | The value of the tag. | 
| resourceType | The resource type the tag is associated with. For example: `WORKFLOW_DEF`, `TASK_DEF`, etc. | 
| countPerResourceType | The number of resources of the given type that have this tag. | 

## Examples

<details>
<summary>Get all tags grouped by resource type</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/metadata/tags/grouped' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "tagKey": "team",
    "tagValue": "blog",
    "resourceType": "TASK_DEF",
    "countPerResourceType": 1
  },
  {
    "tagKey": "team",
    "tagValue": "docs",
    "resourceType": "SECRET_NAME",
    "countPerResourceType": 1
  },
  {
    "tagKey": "team",
    "tagValue": "docs",
    "resourceType": "TASK_DEF",
    "countPerResourceType": 1
  },
  {
    "tagKey": "team",
    "tagValue": "docs",
    "resourceType": "WEBHOOK",
    "countPerResourceType": 1
  },
  {
    "tagKey": "team",
    "tagValue": "docs",
    "resourceType": "WORKFLOW_DEF",
    "countPerResourceType": 1
  }
]
```

</details>
