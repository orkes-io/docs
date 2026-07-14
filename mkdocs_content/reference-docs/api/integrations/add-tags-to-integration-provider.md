---
title: "Add Tags to Integration Provider"
description: "Use the Orkes Conductor integrations API to add Tags to Integration Provider. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/integrations/add-tags-to-integration-provider"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Add Tags to Integration Provider, Add Tags to Integration Provider API, API orchestration, API gateway"
---

# Add Tags to Integration Provider

## Quick reference

Use this integrations endpoint to add Tags to Integration Provider. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/integrations/provider/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/integrations/provider/{name}/tags`

Adds tags to an integration provider. You can add a single tag or multiple tags in one request. If a tag with the same key already exists, this operation will update its value.

## Path parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The name of the integration to which the tags are to be added. | string | Required. | 

## Request Body

The request body should be an array of tag objects.

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| key | The tag key. | string | Required. | 
| value | The tag value. | string | Required. | 

**Example for adding multiple tags in a single request:**

```json
[
  {
    "key": "dev",
    "value": "automation"
  },
  {
    "key": "backend",
    "value": "PR"
  }
]
```

## Response

Returns 200 OK, indicating that tags have been added to the integration.
## Examples

<details>
<summary>Add a single tag to an integration</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "team",
    "value": "docs"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been added to the integration.

</details>

<details>
<summary>Add multiple tags to an integration</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "team",
    "value": "docs"
  },
  {
    "key": "team",
    "value": "marketing"
  }
]'
```

**Response**

Returns 200 OK, indicating that tags have been added to the integration.

</details>

## Related pages

- [Integrations API Reference](/content/reference-docs/api/integrations)
- [Create or Update Integration Provider](/content/reference-docs/api/integrations/create-integration-provider)
- [Get Integration Provider](/content/reference-docs/api/integrations/get-integration-provider)
- [Delete Integration Provider](/content/reference-docs/api/integrations/delete-integration-provider)
- [Get Tags from Integration Provider](/content/reference-docs/api/integrations/get-tags-from-integration-provider)
- [Delete Tags from Integration Provider](/content/reference-docs/api/integrations/delete-tags-from-integration-provider)
