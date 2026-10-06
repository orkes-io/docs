---
title: "Replace Tags in a Workflow Definition"
description: "Use the Orkes Conductor tags API to replace Tags in a Workflow Definition. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/tags/replace-tags-in-a-workflow-definition"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Replace Tags in a Workflow Definition, Replace Tags in a Workflow Definition API, API orchestration, API gateway"
---

# Replace Tags in a Workflow Definition

## Quick reference

Use this tags endpoint to replace Tags in a Workflow Definition. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/metadata/workflow/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/metadata/workflow/{name}/tags`

Replaces all existing tags in a workflow definition with the new tag provided in the request. If the workflow definition has multiple tags, they will all be replaced with the tag specified in the request body.

## Path Parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The name of the workflow definition in which the tags are to be replaced.| string | Required. | 

## Request Body

The request body should be an array of tag objects.

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| key       | The tag key.                                     | string | Required.         |
| value     | The tag value.                                   | string | Required.         |

## Response

- Returns 200 OK, indicating that the tag has been replaced in the workflow definition.
- Returns 404 if the workflow definition does not exist.

## Examples

<details>
<summary>Replace a tag from a workflow definition</summary>

**Request**

```bash
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/metadata/workflow/SampleDemo/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "env",
    "value": "prod"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been replaced in the workflow definition.

</details>

## Related pages

- [Tags](/content/reference-docs/api/tags)
- [List All Tags](/content/reference-docs/api/tags/list-all-tags)
- [List Tags Grouped by Resource Type](/content/reference-docs/api/tags/get-all-tags-grouped)
- [Add Tags to a Task Definition](/content/reference-docs/api/tags/add-tags-to-a-task-definition)
- [Replace Tags in a Task Definition](/content/reference-docs/api/tags/replace-tags-in-a-task-definition)
- [Get Tags from a Task Definition](/content/reference-docs/api/tags/get-tags-from-task-definition)
