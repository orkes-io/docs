---
title: "Get User Info"
description: "Use the Orkes Conductor Conductor API to get User Info. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/tokens/get-user-info"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get User Info, Get User Info API, API orchestration, API gateway"
---

# Get User Info

## Quick reference

Use this Conductor endpoint to get User Info. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/token/userInfo`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/token/userInfo`

Retrieves the user information associated with the current token, including roles, groups, and the fully resolved set of effective permissions.

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| claims | If set to `true`, includes the JWT claims in the response. Defaults to `false`. | boolean | Optional. | 

## Response

Returns the user object with the following fields:

| Field | Description | 
| ----- | ----------- |
| id | User's email or identifier. |
| name | Display name. | 
| namespace | The organization ID the user belongs to. | 
| roles | List of roles assigned to the user, each with their fully resolved permissions. Permissions in the response are fully resolved; implied permissions are automatically included. | 
| groups | List of groups the user belongs to. | 


## Examples

<details>
<summary>Get user info</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/token/userInfo?claims=false' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "id": "john.doe@acme.com",
  "name": "John Doe",
  "roles": [
    {
      "name": "CUSTOM_ROLE",
      "permissions": [
        {
          "name": "READ_WORKFLOW_DEF"
        },
        {
          "name": "EXECUTE_WORKFLOW_DEF"
        }
      ]
    }
  ],
  "groups": [],
  "uuid": "8deebe7e-4dc9-41c1-934d-9fcd3442b0b0",
  "contactInformation": {},
  "namespace": "0000",
  "orkesWorkersApp": false,
  "orkesApiGateway": false,
  "applicationUser": false,
  "orkesApp": false
}
```

</details>

<details>
<summary>Get user info with JWT claims</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/token/userInfo?claims=true' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "user": {
    "id": "john.doe@acme.com",
    "name": "John Doe",
    "roles": [
      {
        "name": "CUSTOM_ROLE",
        "permissions": [
          {
            "name": "READ_WORKFLOW_DEF"
          },
          {
            "name": "EXECUTE_WORKFLOW_DEF"
          }
        ]
      }
    ],
    "groups": [],
    "uuid": "8deebe7e-4dc9-41c1-934d-9fcd3442b0b0",
    "contactInformation": {},
    "namespace": "0000",
    "orkesApp": false,
    "orkesWorkersApp": false,
    "orkesApiGateway": false,
    "applicationUser": false
  },
  "claims": {
    "given_name": "John",
    "family_name": "Doe",
    "name": "John Doe",
    "email": "john.doe@acme.com",
    "email_verified": true,
    "iss": "https://auth.orkes.io/",
    "aud": "s4HLdVbnaJMGvPSgx2YLpynfJlW7GV2e",
    "sub": "google-oauth2|116505707345152761464",
    "iat": 1782734603,
    "exp": 1782770603
  }
}
```

</details>
