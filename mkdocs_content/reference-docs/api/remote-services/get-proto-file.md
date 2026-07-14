---
title: "Get Proto File from gRPC Service"
description: "Use the Orkes Conductor remote services API to get Proto File from gRPC Service. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/remote-services/get-proto-file"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Proto File from gRPC Service, Get Proto File from gRPC Service API, API orchestration, API gateway"
---

# Get Proto File from gRPC Service

## Quick reference

Use this remote services endpoint to get Proto File from gRPC Service. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/registry/service/protos/{registryName}/{filename}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/registry/service/protos/{registryName}/{filename}`

Retrieves a compiled binary protobuf file from a gRPC service.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| registryName | The name of the gRPC service to retrieve the proto file from. | string | Required. | 
| filename | The name of the proto file to retrieve. | string | Required. | 

## Response

Returns a 200 OK, with the compiled binary protobuf file as a downloadable file.

## Examples

<details>
<summary>Get a proto file from a gRPC service</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/registry/service/protos/grpc-service/hello.bin' \
  -H 'accept: application/octet-stream' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns a 200 OK, with the compiled binary protobuf file as a downloadable file.

</details>
