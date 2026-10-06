---
title: "Remove Method from Service"
description: "Use the Orkes Conductor remote services API to remove Method from Service. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/remote-services/remove-method-from-service"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Remove Method from Service, Remove Method from Service API, API orchestration, API gateway"
---

# Remove Method from Service

## Quick reference

Use this remote services endpoint to remove Method from Service. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/registry/service/{registryName}/methods`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/registry/service/{registryName}/methods`

Removes a method from a registered service.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the service to remove the method from. | string | Required. | 

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| serviceName | The operation name of the method to remove. For example, `getPetById`. | string | Required. | 
| method | The path of the method to remove. For example, `/pet/{petId}`. | string | Required. | 
| methodType | The method type of the method to remove. For example, `GET`. | string | Required. | 

## Response

Returns 200 OK, indicating that the method has been removed successfully.

## Examples

<details>
<summary>Remove a method from a service</summary>

**Request**

```bash
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/registry/service/petstore/methods?serviceName=getPetById&method=%2Fpet%2F%7BpetId%7D&methodType=GET' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the method has been removed successfully.

</details>

## Related pages

- [Remote Services API Reference](/content/reference-docs/api/remote-services)
- [Create Service](/content/reference-docs/api/remote-services/create-service)
- [Clone Service](/content/reference-docs/api/remote-services/clone-service)
- [Get Service](/content/reference-docs/api/remote-services/get-service)
- [Delete Service](/content/reference-docs/api/remote-services/delete-service)
- [Get All Services](/content/reference-docs/api/remote-services/get-all-services)
