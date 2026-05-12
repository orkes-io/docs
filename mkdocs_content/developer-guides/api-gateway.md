---
title: "API Gateway: Expose Workflows as APIs"
description: "Learn how to expose workflows as API endpoints using the API Gateway so applications can trigger workflow logic in Orkes Conductor."
---

# API Gateway: Expose Workflows as APIs

API Gateway exposes Conductor workflows as HTTP APIs. Each route maps to a workflow that can coordinate services, run workers, apply retries and timeouts, call AI or human-review steps, enforce schemas, and return a structured response.

Use API Gateway when an endpoint should orchestrate work rather than proxy one service. The request becomes an observable workflow execution with durable state, retry history, inputs, outputs, and operational controls.

!!! tip "5-minute path"
    Create the workflow, create an application with `Execute` permission, configure API authentication, define a service, add a route, test it, then publish the generated cURL command or OpenAPI documentation.

## Step 1: Create workflows to define the logic for each endpoint

Create one workflow for each API operation or reusable business action. Keep the workflow input shaped like the API request you want to expose.

Use workflow features that are hard to express in a thin API proxy:

- Fan out to multiple services and aggregate the result.
- Retry transient failures with task-level retry policy.
- Apply timeouts, rate limits, and circuit breakers.
- Wait for a human task or external callback.
- Route work to worker domains.
- Return early with `waitUntilTask` while the workflow continues asynchronously.

## Step 2: Create an application in Orkes Conductor

Create an [application](/content/access-control-and-security/applications) for the gateway service account. The gateway uses this application identity to execute the mapped workflows.

Grant the application:

- `Execute` permission on every workflow exposed through the service.
- Any additional task or domain permissions required by those workflow executions.
- No broad roles unless the gateway service explicitly needs them.

Keeping gateway permissions narrow is important: route authentication controls who can call the route, while the application controls what the route can do inside Conductor.

## Step 3: Configure authentication settings

Authentication settings define how callers access the API service.

| Setting | Purpose |
| ------- | ------- |
| ID | Stable identifier for this auth configuration. |
| Authentication Type | `API Key` for protected routes or `No Authentication` for intentionally public routes. |
| API Key | Caller-facing key when API key auth is enabled. Store it securely. |
| Application | Conductor application whose permissions are used when the route executes workflows. |

Use `No Authentication` only for routes that are intentionally public and safe to invoke. For production APIs, use API key auth or place the route behind your existing identity gateway.

## Step 4: Define an API service

A service groups routes under shared configuration.

| Field | Purpose |
| ----- | ------- |
| Service ID | Stable lowercase identifier used in route URLs. |
| Display Name | Human-readable service name. |
| Service Enabled | Enables or disables the service. |
| MCP Enabled | Disable for API-only services unless the same service should also expose MCP tools. |
| Base Path | Base URL path for all routes, such as `/api/orders`. |
| Auth Config | Authentication setting created in the previous step. |
| CORS | Allowed origins, methods, and headers for browser clients. |
| Description | Operational description of the service. |

Create separate services when authentication, ownership, lifecycle, or audience differs.

## Step 5: Define and test a route

Each route maps one HTTP method and path to one workflow.

| Field | Purpose |
| ----- | ------- |
| HTTP Method | `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`. |
| Path | Route path. Use `{name}` for path parameters. |
| Description | What the endpoint does and when clients should call it. |
| Workflow Name | Workflow executed by the route. |
| Version | Workflow version. Pin for stable APIs; use latest only deliberately. |
| Wait Until Tasks | Optional task reference whose output should be returned before the full workflow completes. |
| Timeout | Maximum time the route waits for a response. |
| Input Schema | Optional request contract. |
| Output Schema | Optional response contract. |
| Query Parameters | Accepted query parameters and required flags. |
| Cache Key / TTL | Optional response caching for idempotent routes. |
| Rate Limit Key / Concurrent Limit | Optional request concurrency controls. |

Pre-request scripts transform route input into workflow input:

```javascript
(function () {
  return {
    orderId: $.path.orderId,
    includeHistory: $.query.includeHistory === "true",
    requestId: $.headers["x-request-id"]
  };
})();
```

Post-response scripts transform workflow output into the API response:

```javascript
(function () {
  return {
    status: $.status,
    result: $.result,
    workflowId: $.workflowId
  };
})();
```

### Test a route

Test the route with a representative request before publishing it. Verify the response, response code, workflow input, workflow output, and execution status.

#### Run a test request

Use the route tester or generated cURL command. Include path parameters, query parameters, headers, auth key, and request body exactly as a client will send them.

#### Verify workflow execution

Open the workflow execution created by the route and verify:

- The pre-request script produced the expected workflow input.
- The workflow used the expected version.
- Tasks completed or paused as expected.
- The response came from the correct workflow output or `waitUntilTask`.

#### View endpoint details

Use the route details to copy the cURL command and publish OpenAPI documentation. Treat the generated OpenAPI document as the external contract for clients.

## Examples

See the [feedback service API Gateway tutorial](/content/tutorials/expose-feedback-workflow-as-api).

## Monitor API Gateway metrics

Gateway metrics show how workflow-backed APIs behave in production: request volume, success rate, latency, and error rate at the service and route level.

!!! tip "5-minute path"
    Monitor request rate, success rate, p95 latency, and error rate for every public route. When a metric degrades, inspect the triggered workflow executions for failed tasks, timeouts, and downstream dependency errors.

### Metrics to watch

| Metric | Use it for |
| ------ | ---------- |
| Total requests | Traffic volume and adoption. |
| Request rate | Spikes, drops, or unexpected callers. |
| Success rate | Route-level reliability. |
| Average latency | General response time trends. |
| P50/P95/P99 latency | Tail latency and slow dependency detection. |
| Error rate | Route failures and bad input patterns. |
| Error breakdown | Separating caller errors from platform, workflow, or dependency failures. |

### Service vs route metrics

Use service-level metrics to understand aggregate traffic across all routes. Use route-level metrics when you need to isolate a specific workflow-backed endpoint.

| Level | Best for |
| ----- | -------- |
| Service | Overall API service health. |
| Route | Debugging one endpoint, one workflow, or one client contract. |

### Debug from gateway metrics to workflows

Gateway metrics show the API symptom. Workflow execution details show the orchestration cause.

1. Identify the route with elevated latency or errors.
2. Check which workflow the route starts.
3. Search workflow executions for that workflow and time window.
4. Inspect failed or slow tasks.
5. Compare route input schemas with workflow input validation.

Useful follow-up pages:

- [Search / Query Executions](/content/developer-guides/debugging-workflows)
- [Handling Failures](/content/error-handling)
- [Metrics and Observability](/content/developer-guides/metrics-and-observability)

### Alerting recommendations

Create alerts for:

- Error rate above baseline for 5 minutes.
- P95 latency above the route SLA.
- Request rate dropping to zero for expected traffic.
- Sudden 4xx increase after a schema or client change.
- Sudden 5xx increase after a workflow, worker, or dependency change.

### Production notes

- Treat each gateway route as an API contract. Monitor it separately from the backing workflow.
- Correlate request IDs, workflow IDs, and correlation IDs in logs.
- Use explicit workflow timeouts for synchronous routes.
- Keep long-running workflows asynchronous; do not make gateway clients wait for humans, waits, or extended retries.

## Next steps

Use [MCP Gateway](/content/developer-guides/mcp-gateway) when AI agents should invoke workflows as governed tools.
