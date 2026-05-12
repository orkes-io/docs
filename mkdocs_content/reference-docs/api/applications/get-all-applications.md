---
title: "Get All Applications"
description: "Use the Orkes Conductor applications API to get All Applications. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
---

# Get All Applications

## Quick reference

Use this applications endpoint to get All Applications. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/applications`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/applications`

Retrieves all applications from your Conductor cluster. 

## Response

Returns an array of application objects. Each object contains the retrieved application details. 

| Parameter | Description|
| --------- | ---------- |
| id | Unique identifier for the application. | 
| name | Name of the application. | 
| createdBy | Email of the user who created the application. | 
| updatedBy | Email of the user who last updated the application. | 
| createTime | Creation timestamp in Unix time (milliseconds). | 
| updateTime | Last update timestamp in Unix time (milliseconds). |
| tags | Array of tag objects associated with the application. Each tag contains `key` and `value` fields.  | 

## Examples

<details>
<summary>Get all applications</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/applications' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "id": "db66991f-206f-4695-8fe9-f5d53976c9a8",
    "name": "AGENTIC-INTERVIEW",
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "createTime": 1768310094272,
    "updateTime": 1768310094272,
    "tags": []
  },
  {
    "id": "c536bc19-c42f-4e50-b723-63d22df8eb72",
    "name": "IDE-Integration",
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "createTime": 1749454075757,
    "updateTime": 1749454075757,
    "tags": []
  },
  {
    "id": "bcd1886f-3e98-4f28-ba49-1174f6482f15",
    "name": "MCP",
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "createTime": 1749017577618,
    "updateTime": 1749017577618,
    "tags": []
  },
  {
    "id": "orkes-api-gateway",
    "name": "Orkes API Gateway",
    "createdBy": "orkes-api-gateway@apps.orkes.io",
    "updatedBy": "orkes-api-gateway@apps.orkes.io",
    "createTime": 1770639711885,
    "updateTime": 1770639711885,
    "tags": []
  },
  {
    "id": "9ed69dec-c103-4eae-98bc-f1d4f4239eb7",
    "name": "Prompt Engineers",
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "createTime": 1763452251120,
    "updateTime": 1763452251120,
    "tags": [
      {
        "key": "test",
        "value": "prompt"
      }
    ]
  },
  {
    "id": "79e87c16-ce40-48cf-a51e-a02e591c931a",
    "name": "agenticResearch",
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "createTime": 1745628669221,
    "updateTime": 1745628669221,
    "tags": []
  },
  {
    "id": "43e9ecb9-268a-4048-8ae1-259cc45ef0e6",
    "name": "agenticTrader",
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "createTime": 1742288943134,
    "updateTime": 1742288943134,
    "tags": []
  },
  {
    "id": "cf303235-7a24-404d-973a-17311841878b",
    "name": "java-worker-app",
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "createTime": 1728528818710,
    "updateTime": 1728528818710,
    "tags": []
  }
]
```

</details>
