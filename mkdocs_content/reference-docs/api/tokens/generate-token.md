---
title: "Generate JWT Token"
description: "Use the Orkes Conductor Conductor API to generate JWT Token. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/tokens/generate-token"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Generate JWT Token

## Quick reference

Use this Conductor endpoint to generate JWT Token. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/token`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/token`

Generates a JWT token using either an access key/secret pair or email/password credentials (when local auth mode is enabled).

## Request body

Format the request body as a JSON object with the following parameters:

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| keyId | The access key ID [generated from the application in Conductor](/content/access-control-and-security/applications#configuring-applications). | string | Required if authenticating using access keys. | 
| keySecret | The access key secret [generated from the application in Conductor](/content/access-control-and-security/applications#configuring-applications). | string | Required if authenticating using access keys. |
| email | User email address. | string | Required if authenticating using email and password. |
| password | User password. | string | Required if authenticating using email and password. | 
| expiration | Token expiration time in milliseconds. If not set, the default expiration applies. Pass a negative value for no expiration. | integer | Optional. | 

## Response

Returns a JWT token string.

```json
{
  "token": "<JWT_TOKEN>"
}
```

## Examples

<details>
<summary>Generate JWT token using access keys</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/token' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "keyId": "<YOUR-KEY-ID>",
    "keySecret": "<YOUR-KEY-SECRET>"
  }'
```

**Response**

```json
{
  "token": "<JWT_TOKEN>"
}
```

</details>
