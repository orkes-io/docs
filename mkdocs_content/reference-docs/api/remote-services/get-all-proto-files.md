---
title: "Get All Proto Files from gRPC Service"
description: "Use the Orkes Conductor remote services API to get All Proto Files from gRPC Service. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/remote-services/get-all-proto-files"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get All Proto Files from gRPC Service, Get All Proto Files from gRPC Service API, API orchestration, API gateway"
---

# Get All Proto Files from gRPC Service

## Quick reference

Use this remote services endpoint to get All Proto Files from gRPC Service. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/registry/service/protos/{registryName}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/registry/service/protos/{registryName}`

Retrieves all compiled binary protobuf files from a gRPC service.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| registryName | The name of the gRPC service to retrieve the proto files from. | string | Required. | 

## Response

Returns a 200 OK, with an array of proto file objects, each including the service name, filename, and file data.

## Examples

<details>
<summary>Get all proto files from a gRPC service</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/registry/service/protos/grpc-service' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "serviceName": "grpc-service",
    "filename": "hello.bin",
    "data": "xxxxxx"
  },
  {
    "serviceName": "grpc-service",
    "filename": "hello1.bin",
    "data": "xxxxxxxxxx"
  }
]
```

</details>

## Related pages

- [Remote Services API Reference](/content/reference-docs/api/remote-services)
- [Create Service](/content/reference-docs/api/remote-services/create-service)
- [Clone Service](/content/reference-docs/api/remote-services/clone-service)
- [Get Service](/content/reference-docs/api/remote-services/get-service)
- [Delete Service](/content/reference-docs/api/remote-services/delete-service)
- [Get All Services](/content/reference-docs/api/remote-services/get-all-services)
