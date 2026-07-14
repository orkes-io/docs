---
title: "API and MCP Gateway"
description: "Learn how to expose workflows as APIs and MCP tools using the Gateway so external applications and AI agents can invoke workflow logic in Orkes Conductor."
canonical_route: "developer-guides/mcp-api-gateway"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, API and MCP Gateway, AI orchestration, LLM orchestration, agent workflows, API orchestration, API gateway"
---

# API and MCP Gateway

Orkes Conductor's Gateway lets you expose any workflow as an API endpoint or MCP tool. Use it when the durable workflow is the product surface: an application calls an HTTP route, or an AI agent calls a tool, and Conductor handles the multi-step orchestration behind it.

Gateway is different from simple request routing. Each route can trigger a workflow that calls services, branches, waits for humans, retries failures, applies compensation, and records a full execution history.

Use **API Gateway** when external applications or internal services need a stable HTTP interface for invoking workflow logic. Use **MCP Gateway** when AI agents need discoverable tools that execute governed business workflows.

!!! tip "5-minute path"
    Create the workflow first, grant an application permission to execute it, create an authenticated Gateway service, add a route, test the route, then monitor the execution in Conductor.

Gateway routes inherit authentication, authorization, schema validation, caching, rate limits, and operational metrics from Orkes Conductor. This keeps endpoint behavior tied to durable execution instead of scattering orchestration, retries, and audit trails across clients.


## In this section

- [API Gateway](/content/developer-guides/api-gateway)
- [MCP Gateway](/content/developer-guides/mcp-gateway)
- [Gateway Metrics](/content/developer-guides/gateway-metrics)
- [Remote Services](/content/remote-services)

## Related pages

- [API Gateway: Expose Workflows as APIs](/content/developer-guides/api-gateway)
- [MCP Gateway:  Expose Workflows as MCP tools](/content/developer-guides/mcp-gateway)
- [Monitor Gateway Metrics](/content/developer-guides/gateway-metrics)
- [Remote Services Guide](/content/remote-services)
