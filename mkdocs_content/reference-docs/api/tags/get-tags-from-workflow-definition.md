---
title: "Get Tags from a Workflow Definition"
description: "Use the Orkes Conductor tags API to get Tags from a Workflow Definition. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/tags/get-tags-from-workflow-definition"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Tags from a Workflow Definition, Get Tags from a Workflow Definition API, API orchestration, API gateway"
---

# Get Tags from a Workflow Definition

## Quick reference

Use this tags endpoint to get Tags from a Workflow Definition. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/metadata/workflow/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/metadata/workflow/{name}/tags`

Retrieves the tags associated with a workflow definition.

## Path Parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The name of the workflow definition from which the tags are to be retrieved.| string | Required. | 

## Response

Returns a JSON array of tag objects associated with the workflow definition. Each object includes:

- key (string): The tag key.
- value (string): The tag value.

Returns an empty array `[]` if no tags are associated with the workflow definition.

## Examples

<details>
<summary>Get tags from a workflow definition</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/metadata/workflow/stripe_webhook/tags' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns a JSON array of tag objects associated with the workflow definition.

```json
[
  {
    "key": "environment",
    "value": "testing"
  }
]
```

</details>
