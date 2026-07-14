---
title: "Delete Proto File from gRPC Service"
description: "Use the Orkes Conductor remote services API to delete Proto File from gRPC Service. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/remote-services/delete-proto-file"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Delete Proto File from gRPC Service

## Quick reference

Use this remote services endpoint to delete Proto File from gRPC Service. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/registry/service/protos/{registryName}/{filename}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/registry/service/protos/{registryName}/{filename}`

Deletes a compiled binary protobuf file from a gRPC service.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| registryName | The name of the gRPC service to delete the proto file from. | string | Required. | 
| filename | The name of the proto file to delete. | string | Required. | 

## Response

Returns a 200 OK, indicating that the compiled binary protobuf file has been deleted successfully.

## Examples

<details>
<summary>Delete a proto file from a gRPC service</summary>

**Request**

```bash
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/registry/service/protos/grpc-service/hello.bin' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns a 200 OK, indicating that the compiled binary protobuf file has been deleted successfully.

</details>
