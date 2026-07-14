---
title: "Add Tags to Prompt"
description: "Use the Orkes Conductor Conductor API to add Tags to Prompt. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/prompts/add-tags-to-prompt"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Add Tags to Prompt

## Quick reference

Use this Conductor endpoint to add Tags to Prompt. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/prompts/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/prompts/{name}/tags`

Adds tags to a prompt. 

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the prompt to add tags to. | string | Required. | 

## Request Body

The request body should be an array of tag objects.

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| key | The tag key. | string | Required. | 
| value | The tag value. | string | Required. | 

## Response

Returns 200 OK, indicating that tags have been added to the prompt.

## Examples

<details>
<summary>Add a tag to a prompt</summary>

**Request**

```bash
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/prompts/population-prompt/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "team",
    "value": "engineering"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been added to the prompt.

</details>
