---
title: "API Reference"
description: "REST API reference for Orkes Conductor — base URL, authentication, request/response formats, and links to every API section."
canonical_route: "category/ref-docs/api"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# API Reference

Conductor exposes a full REST API for managing workflow definitions, executions, tasks, and events.

## Base URL

All API endpoints are relative to your Conductor server's base URL:

```
<YOUR-CLUSTER-URL>/api/
```

For example, to list all workflow definitions:

```shell
curl <YOUR-CLUSTER-URL>/api/metadata/workflow
```

## Authentication

Every request to Orkes Conductor requires an `X-Authorization` header containing a valid JSON Web Token (JWT). Generate a JWT from an application's access key and secret, then include it on every API call.

See [Authentication and Access Keys](/content/sdks/authentication) for how to create an application, retrieve an access key, and generate a token.

## Content Type

All request and response bodies use JSON. Set the following headers on requests with a body:

```
Content-Type: application/json
```

A few endpoints return plain text (e.g., workflow ID on start). These are noted in their documentation.

## Common Response Codes

| Status Code | Description |
|---|---|
| `200 OK` | Request succeeded. Response body contains the result. |
| `204 No Content` | Request succeeded but there is no response body (e.g., poll with no tasks available). |
| `400 Bad Request` | Invalid request — check your request body or parameters. |
| `404 Not Found` | The requested resource (workflow, task, definition) does not exist. |
| `409 Conflict` | Conflict with current state (e.g., trying to resume a workflow that is not paused). |
| `500 Internal Server Error` | Server-side error. Check Conductor server logs. |

### Error Response Format

When an error occurs, the response body contains:

```json
{
  "status": 400,
  "message": "Workflow definition is not valid",
  "instance": "conductor-server",
  "retryable": false
}
```

## Quick Start

Generate a token, register a workflow definition, start it, and check its status:

```shell
# 1. Generate a JWT token
TOKEN=$(curl -s -X POST '<YOUR-CLUSTER-URL>/api/token' \
  -H 'Content-Type: application/json' \
  -d '{"keyId": "<YOUR-KEY-ID>", "keySecret": "<YOUR-KEY-SECRET>"}' | jq -r '.token')

# 2. Register a workflow definition
curl -X POST '<YOUR-CLUSTER-URL>/api/metadata/workflow' \
  -H 'Content-Type: application/json' \
  -H "X-Authorization: $TOKEN" \
  -d '{
    "name": "hello_workflow",
    "version": 1,
    "tasks": [
      {
        "name": "hello_task",
        "taskReferenceName": "hello_ref",
        "type": "HTTP",
        "inputParameters": {
          "uri": "https://jsonplaceholder.typicode.com/posts/1",
          "method": "GET"
        }
      }
    ],
    "schemaVersion": 2
  }'

# 3. Start a workflow execution
WORKFLOW_ID=$(curl -s -X POST '<YOUR-CLUSTER-URL>/api/workflow/hello_workflow' \
  -H 'Content-Type: application/json' \
  -H "X-Authorization: $TOKEN" \
  -d '{}')
echo "Started workflow: $WORKFLOW_ID"

# 4. Check workflow status
curl "<YOUR-CLUSTER-URL>/api/workflow/$WORKFLOW_ID" \
  -H "X-Authorization: $TOKEN"
```

## API Sections

| Section | Base Path | Description |
|---|---|---|
| **[Metadata](/content/reference-docs/api/metadata)** | `/api/metadata` | Register, update, validate, and delete workflow and task definitions |
| **[Workflow](/content/reference-docs/api/workflow)** | `/api/workflow` | Start workflows, manage executions, search, pause, resume, retry, terminate |
| **[Task](/content/reference-docs/api/task)** | `/api/tasks` | Poll for tasks, update results, manage queues, view logs, search |
| **[Users](/content/reference-docs/api/users)** | `/api/users` | Create and manage users, retrieve details, check permissions |
| **[Groups](/content/reference-docs/api/groups)** | `/api/groups` | Manage groups, group membership, and permissions |
| **[Applications](/content/reference-docs/api/applications)** | `/api/applications` | Manage applications, access keys, and roles |
| **[Tags](/content/reference-docs/api/tags)** | `/api/metadata`, `/api/secrets`, ... | Add, list, and delete tags on workflow, task, and other definitions |
| **[Secrets](/content/reference-docs/api/secrets)** | `/api/secrets` | Create and manage secrets, retrieve values, manage secret tags |
| **[Tokens](/content/reference-docs/api/tokens)** | `/api/token` | Generate and manage authentication tokens |
| **[Authorization](/content/reference-docs/api/authorization)** | `/api/auth` | Grant or revoke access to resources for users, groups, or roles |
| **[Schema](/content/reference-docs/api/schema)** | `/api/schema` | Create, retrieve, and delete input/output schema definitions |
| **[Environment Variables](/content/reference-docs/api/environment-variables)** | `/api/environment` | Create and manage environment variables and their tags |
| **[Schedule](/content/reference-docs/api/schedule)** | `/api/scheduler` | Create, manage, and search workflow schedules |
| **[Human Task](/content/reference-docs/api/human-tasks)** | `/api/human` | Manage human task executions, assignments, and user forms |
| **[Remote Services](/content/reference-docs/api/remote-services)** | `/api/registry` | Register and manage HTTP/gRPC service endpoints |
| **[Integrations](/content/reference-docs/api/integrations)** | `/api/integrations` | Create and update integration providers |
| **[Prompts](/content/reference-docs/api/prompts)** | `/api/prompts` | Create and manage AI prompts |
| **[Webhooks](/content/reference-docs/api/webhooks)** | `/api/metadata/webhook` | Create, update, retrieve, delete, and tag webhook definitions |

## Swagger UI

The Swagger UI at `<YOUR-CLUSTER-URL>/swagger-ui/index.html` provides an interactive API explorer where you can try endpoints directly from your browser.

## SDKs

For programmatic access, use one of the official [Conductor SDKs](/content/category/sdks) which wrap these REST APIs with language-native interfaces for Java, Python, Go, JavaScript, C#, Ruby, and Rust.
