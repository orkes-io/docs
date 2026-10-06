---
title: "Associate Prompt with Integration Model"
description: "Use the Orkes Conductor integrations API to associate Prompt with Integration Model. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/integrations/associate-prompt-with-integration-model"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Associate Prompt with Integration Model, Associate Prompt with Integration Model API, API orchestration, API gateway"
---

# Associate Prompt with Integration Model

## Quick reference

Use this integrations endpoint to associate Prompt with Integration Model. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/integrations/provider/{integration_provider}/integration/{integration_name}/prompt/{prompt_name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/integrations/provider/{integration_provider}/integration/{integration_name}/prompt/{prompt_name}`

Associates an existing prompt with a specific model under an integration provider. The prompt, model, and AI/LLM integration must all exist before calling this endpoint.

## Path parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| integration_provider | The name of the integration provider in Conductor to which the prompt is to be added.  | string | Required. | 
| integration_name | The name of the model.| string | Required. | 
| prompt_name | The name of the prompt to associate with the integration. | string | Required. | 

## Response

| Status | Description                                      | 
| --------- | ------------------------------------------------ | 
| 200 OK | Indicates that the resource is created/updated successfully. | 
| 403 Forbidden | Indicates that the authenticated user does not have READ or UPDATE access on the prompt. | 
| 404 Not Found | The integration provider, integration, or prompt does not exist. | 

## Examples

<details>
<summary>Associate a prompt with an integration provider</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI/integration/gpt-4o/prompt/population-prompt' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -d ''
```

**Response**

Returns 200 OK, indicating that the prompt is associated with the integration provider.

</details>

## Related pages

- [Integrations API Reference](/content/reference-docs/api/integrations)
- [Create or Update Integration Provider](/content/reference-docs/api/integrations/create-integration-provider)
- [Get Integration Provider](/content/reference-docs/api/integrations/get-integration-provider)
- [Delete Integration Provider](/content/reference-docs/api/integrations/delete-integration-provider)
- [Add Tags to Integration Provider](/content/reference-docs/api/integrations/add-tags-to-integration-provider)
- [Get Tags from Integration Provider](/content/reference-docs/api/integrations/get-tags-from-integration-provider)
