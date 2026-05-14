---
title: "Remote Services Guide"
description: "Learn how to register and manage HTTP and gRPC service endpoints so they can be reused across workflows in Orkes Conductor."
canonical_route: "remote-services"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Remote Services

Remote Services provide a reusable registry for HTTP and gRPC endpoints that workflows call through HTTP, HTTP Poll, and gRPC tasks. Use them when multiple workflows call the same service and you want one place to manage service metadata, hosts, schemas, auth headers, test calls, and circuit breaker behavior.

!!! tip "5-minute path"
    Define the service, discover or add endpoints, attach schemas, test the endpoint, configure circuit breaker behavior when needed, then populate HTTP, HTTP Poll, or gRPC tasks from the registered service.

Use Remote Services for outbound calls from workflows. Use [API Gateway](/content/developer-guides/api-gateway) when external clients should call a workflow as an API. Use [MCP Gateway](/content/developer-guides/mcp-gateway) when AI agents should call workflows as tools.

## Define a service

Create one Remote Service per external service contract. Keep names stable because workflows and operators will use them to identify dependencies.

| Service type | Required configuration |
| ------------ | ---------------------- |
| HTTP | Service registry name, Swagger/OpenAPI URL or manually added methods, host, and optional authorization header. |
| gRPC | Service registry name, host, port, reflection or uploaded descriptor file, and optional authorization header. |

For HTTP services, provide a Swagger/OpenAPI JSON URL when available. Conductor can discover endpoints and register schemas from the specification. For gRPC services, enable reflection on the server when possible; otherwise upload a compiled descriptor set.

Generate a gRPC descriptor file with:

```bash
protoc --proto_path=. --descriptor_set_out=compiled.bin *.proto
```

## Discover or add endpoints

After the service exists, add methods in one of two ways.

### a. Discover endpoints

Discovery is the fastest path when the service exposes a machine-readable contract.

| Service type | Discovery source |
| ------------ | ---------------- |
| HTTP | Swagger/OpenAPI document. |
| gRPC | Server reflection or uploaded compiled proto descriptor. |

Discovery can register endpoint schemas in Conductor. Review the generated schemas before using them in production workflows, especially when the upstream API spec is broad or loosely typed.

### b. Add endpoints

Add endpoints manually when the service does not expose a spec or when you want to register only selected methods.

HTTP endpoint fields:

| Field | Purpose |
| ----- | ------- |
| Resource Name | Stable operation name used by humans and workflow authors. |
| Path | Endpoint path, such as `/customers/{customerId}`. |
| Method Type | `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`. |
| Accept | Expected response content type. |
| Content-Type | Request content type. |
| Input Schema | Optional schema for the request payload. |
| Output Schema | Optional schema for the response payload. |
| Deprecated | Marks the endpoint as deprecated for workflow authors. |

gRPC endpoint fields:

| Field | Purpose |
| ----- | ------- |
| Resource Name | Stable operation name. |
| Method Name | Fully qualified gRPC method. |
| Method Type | Unary, server streaming, client streaming, or bidirectional streaming. |
| Input Type | Request schema or message type. |
| Output Type | Response schema or message type. |
| Deprecated | Marks the endpoint as deprecated. |

## Configure circuit breaker pattern for individual services

Circuit breakers protect workflows from repeatedly calling unhealthy services. Configure them on services that are latency-sensitive, high-volume, or known to fail in bursts.

| Setting | Purpose |
| ------- | ------- |
| Failure rate threshold | Opens the circuit when the failure rate crosses this percentage. |
| Sliding window size | Number of calls used to calculate health. |
| Minimum number of calls | Minimum sample size before the circuit can open. |
| Wait duration in open state | Time before the circuit can transition from open to half-open. |
| Permitted calls in half-open state | Trial calls allowed while testing recovery. |
| Slow call rate threshold | Opens the circuit when too many calls are slow. |
| Slow call duration threshold | Duration after which a call is counted as slow. |
| Max wait duration in half-open state | Maximum time the circuit can stay half-open. |
| Automatic transition | Whether the circuit moves from open to half-open without a test call. |

Set thresholds based on the dependency's real latency and failure profile. A circuit breaker that opens too aggressively can cause avoidable workflow failures; one that opens too slowly can amplify dependency incidents.

## Test endpoints

Test endpoints before adding them to production workflows.

Verify:

- The host and path resolve correctly.
- Required headers and auth values are present.
- Request and response schemas match actual payloads.
- Error responses are expected and documented.
- The test execution generated by Conductor shows the task input and output you expect.

For non-idempotent endpoints, test against a sandbox or use a dry-run mode. Do not use hedging or retries against operations that cannot safely tolerate duplicate requests.

## Add services to workflows

Use a registered Remote Service to populate HTTP, HTTP Poll, or gRPC task configuration in a workflow. The populated task still becomes part of the workflow definition and can be reviewed, versioned, tested, and deployed like any other task.

HTTP task example after populating from a service:

```json
{
  "name": "get_customer",
  "taskReferenceName": "get_customer",
  "type": "HTTP",
  "inputParameters": {
    "http_request": {
      "uri": "https://customer-api.example.com/customers/${workflow.input.customerId}",
      "method": "GET",
      "accept": "application/json",
      "contentType": "application/json"
    }
  }
}
```

Production notes:

- Use schemas for important request and response contracts.
- Configure task-level retries and timeouts in addition to service-level circuit breaker behavior.
- Use hedging only for idempotent calls.
- Keep service credentials in secrets or auth configuration, not in workflow input.
- Monitor service failures through workflow executions and gateway/service metrics.
