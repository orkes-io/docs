---
title: "Upload Proto File to gRPC Service"
description: "Use the Orkes Conductor remote services API to upload Proto File to gRPC Service. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/remote-services/upload-proto-file"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Upload Proto File to gRPC Service, Upload Proto File to gRPC Service API, API orchestration, API gateway"
---

# Upload Proto File to gRPC Service

## Quick reference

Use this remote services endpoint to upload Proto File to gRPC Service. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/registry/service/protos/{registryName}/{filename}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/registry/service/protos/{registryName}/{filename}`

Uploads a compiled binary protobuf file to a gRPC service. Once uploaded, Conductor extracts and registers the service endpoints, making them available for use in workflows.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| registryName | The name of the gRPC service to upload the proto file to. | string | Required. | 
| filename | The name of the proto file to upload. | string | Required. | 

## Request body

**Content-Type**: `application/octet-stream`

Upload the compiled binary protobuf file (`.bin`) generated using the `protoc` utility.

## Response

Returns a 200 OK, indicating that the proto file has been uploaded successfully.

## Examples

<details>
<summary>Upload a proto file to a gRPC service</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/registry/service/protos/grpc-service/hello.bin' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/octet-stream' \
  --data-binary '@hello.bin'
```

**Response**

Returns a 200 OK, indicating that the proto file has been uploaded successfully.

</details>

## Related pages

- [Remote Services API Reference](/content/reference-docs/api/remote-services)
- [Create Service](/content/reference-docs/api/remote-services/create-service)
- [Clone Service](/content/reference-docs/api/remote-services/clone-service)
- [Get Service](/content/reference-docs/api/remote-services/get-service)
- [Delete Service](/content/reference-docs/api/remote-services/delete-service)
- [Get All Services](/content/reference-docs/api/remote-services/get-all-services)
