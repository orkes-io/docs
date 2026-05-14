---
title: "Import BPMN to Workflows"
description: "Use the Orkes Conductor metadata API to import BPMN to Workflows. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/metadata/import-bpmn"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Import BPMN to Workflows

## Quick reference

Use this metadata endpoint to import BPMN to Workflows. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/metadata/workflow-importer/import-bpm`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/metadata/workflow-importer/import-bpm`

Imports a BPMN file to a Conductor workflow.

## Query parameters

| Parameter | Description                                                                             | Type    | Required/ Optional |
| --------- | --------------------------------------------------------------------------------------- | ------- | ------------------ |
| overwrite  | Whether to overwrite the existing definition with the same name. Default is *true*. Set to *false* to avoid overwriting an existing definition. | boolean | Optional. |

## Request body

| Parameter | Description                                                                             | Type    | Required/ Optional |
| --------- | --------------------------------------------------------------------------------------- | ------- | ------------------ |
| fileContent | Raw XML content of the BPMN file. This should be the complete BPMN 2.0 XML definition as a string. | string | Required. | 
| fileName | Name of the BPMN file being imported. Must end with `.bpmn`. | string | Required. |

## Response

- Returns 200 OK, indicating that the BPMN file has been imported successfully.
- Returns 500 if a definition with the same name exists and *overwrite* is set to *false*.

**Example Error Response (500)**

When a workflow already exists with a different checksum and *overwrite* is *false*:

```json
{
  "status": 500,
  "message": "Workflow test-workflow version 1 already exists with a different checksum, set overwrite=true to overwrite",
  "instance": "orkes-conductor-deployment-b7589d675-g5lvb",
  "retryable": true
}
```

## Examples

<details>
<summary>Import a BPMN to workflow</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/metadata/workflow-importer/import-bpm?overwrite=true' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "fileContent": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bpmn:definitions xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" id=\"Definitions_1\" targetNamespace=\"http://bpmn.io/schema/bpmn\">\n  <bpmn:process id=\"Process_1\" isExecutable=\"true\">\n    <bpmn:startEvent id=\"StartEvent_1\" name=\"Start\">\n      <bpmn:outgoing>Flow_1</bpmn:outgoing>\n    </bpmn:startEvent>\n    <bpmn:task id=\"Task_1\" name=\"Process Order\">\n      <bpmn:incoming>Flow_1</bpmn:incoming>\n      <bpmn:outgoing>Flow_2</bpmn:outgoing>\n    </bpmn:task>\n    <bpmn:endEvent id=\"EndEvent_1\" name=\"End\">\n      <bpmn:incoming>Flow_2</bpmn:incoming>\n    </bpmn:endEvent>\n    <bpmn:sequenceFlow id=\"Flow_1\" sourceRef=\"StartEvent_1\" targetRef=\"Task_1\" />\n    <bpmn:sequenceFlow id=\"Flow_2\" sourceRef=\"Task_1\" targetRef=\"EndEvent_1\" />\n  </bpmn:process>\n</bpmn:definitions>",
  "fileName": "test-workflow.bpmn"
}'
```

**Response**

Returns 200 OK, indicating that the BPMN file has been imported successfully.

</details>
