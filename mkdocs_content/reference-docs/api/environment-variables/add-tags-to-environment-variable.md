---
title: "Add Tags to an Environment Variable"
description: "Use the Orkes Conductor environment variables API to add Tags to an Environment Variable. Includes endpoint details, authentication, parameters, request."
---

# Add Tags to an Environment Variable

## Quick reference

Use this environment variables endpoint to add Tags to an Environment Variable. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/environment/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/environment/{name}/tags`

Adds tags to an environment variable. You can add a single tag or multiple tags in one request. If a tag with the same key already exists, this operation will update its value.

## Path parameters

| Parameter | Description                                                       | Type   | Required/ Optional |
| --------- | ----------------------------------------------------------------- | ------ | ------------------ |
| key | The name of the environment variable to which the tags are to be added. | string | Required. | 

## Request Body

The request body should be an array of tag objects.

| Parameter | Description                                                       | Type   | Required/ Optional |
| --------- | ----------------------------------------------------------------- | ------ | ------------------ |
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

Returns 200 OK, indicating that tags have been added to the environment variable.

## Examples 

<details>
<summary>Add a single tag to an environment variable</summary>

**Request**

```json
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/environment/sampleKey/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <HEADER>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "dev",
    "value": "automation"
  }
]
'
```

**Response**

Returns 200 OK, indicating that the tag has been added to the environment variable.

</details>

<details>
<summary>Add multiple tags to an environment variable</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/environment/sampleKey/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "dev",
    "value": "automation"
  },
  {
    "key": "backend",
    "value": "PR"
  }
]
'
```

**Response**

Returns 200 OK, indicating that tags have been added to the environment variable. 

</details>
