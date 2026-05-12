---
title: "Create or Update Integration Resource"
description: "Use the Orkes Conductor integrations API to create or Update Integration Resource. Includes endpoint details, authentication, parameters, request bodies."
---

# Create or Update Integration Resource

## Quick reference

Use this integrations endpoint to create or Update Integration Resource. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/integrations/provider/{name}/integration/{integration_name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/integrations/provider/{name}/integration/{integration_name}`

Creates a new integration resource under the specified provider, or updates it if it already exists. Integration resources apply to AI/LLMs, vector databases, and RDBMS, where the resources are models, indexes, and tables respectively.

## Path Parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The name of the integration provider in Conductor to which the resource is to be added. This is the integration name, not the provider name. For example, if you have created an OpenAI integration named `openAI`, use `openAI`. | string | Required. | 
| integration_name | The name of the resource, which can be:<ul><li>the model name for AI/LLMs</li><li>the index name for databases</li><li>the table name for RDBMS</li></ul> | string | Required. | 

## Request Body

Format the request body as a JSON object with the following parameters:

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| description | A description for the integration resource. | string | Required. | 
| enabled | Whether the resource is active and available for use. | boolean | Required. | 

## Response

| Status | Description | 
| ------ | ----------- | 
| 200 OK | Indicates that the resource is created/updated successfully. | 
| 401 Unauthorized | Authentication required. | 
| 403 Forbidden | Indicates that the authenticated user does not have permission to update the resources. | 
| 404 Not Found | The specified integration provider `name` does not exist. | 

## Examples

<details>
<summary>Create a new integration resource</summary>

The following request creates a new model for an OpenAI integration provider.

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI/integration/gpt-4o' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "description": "GPT-4o model",
  "enabled": true
}'
```

**Response**

Returns 200 OK, indicating that the model is created successfully.

</details>

<details>
<summary>Update an existing integration</summary>

The following request updates an existing model description for the OpenAI integration provider..

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI/integration/gpt-4o' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "description": "Updated description for GPT-4o model",
  "enabled": true
}'
```

**Response**

Returns 200 OK, indicating that the model description is updated successfully.

</details>
