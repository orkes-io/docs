---
title: "Unit and Regression Tests"
description: "Learn how to write unit and regression tests to validate workflow logic, task inputs and outputs, and expected workflow execution paths in Orkes Conductor."
canonical_route: "developer-guides/unit-and-regression-tests"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Unit and Regression Tests

Workflow tests verify that a workflow definition routes correctly, wires task inputs and outputs correctly, and reaches the expected terminal state before the definition is promoted.

!!! tip "5-minute path"
    Use the Test Workflow API or SDK test utilities with mocked Worker tasks. Assert terminal status, task path, task input/output wiring, and final workflow output.

Use workflow tests in CI/CD when workflow definitions are stored as JSON or generated from code. Test workers separately as application code; test workflows for orchestration behavior.

## Unit tests

In Conductor, the workflow is the smallest orchestration unit worth testing. A workflow unit test should answer:

| Test target | What to assert |
| ----------- | -------------- |
| Terminal state | Given input, the workflow completes, fails, or terminates as expected. |
| Control flow | Switches, forks, loops, and joins take the expected path. |
| Task I/O | Each task receives the resolved input it needs and produces expected output. |
| Failure behavior | Retryable and terminal failures move the workflow to the expected state. |
| Schema/masking behavior | Contracts and sensitive values behave as expected. |

### Test environment

Workflow tests execute against a real Conductor server. Use a local containerized server for fast CI feedback and a remote non-production cluster for integration tests that depend on Orkes-specific resources.

Keep test data and workflow definitions in source control. Avoid testing production-only credentials, endpoints, or secrets in unit tests.

### Mock tasks

Only Worker tasks are mocked by the workflow test API. System tasks and operators execute normally.

Mock worker tasks when:

- The real worker calls external services.
- The worker is slow or non-deterministic.
- The test only needs a known output to validate workflow routing.
- You want to force a failure path.

### Methods for unit testing workflows

Use the [Test Workflow API](/content/reference-docs/api/workflow/test-workflow) or SDK test helpers. The Java SDK exposes `testWorkflow` with `WorkflowTestRequest`.

Basic pattern:

```java
WorkflowTestRequest request = new WorkflowTestRequest();
request.setName("loan_approval");
request.setVersion(1);
request.setWorkflowDef(workflowDef);
request.setInput(Map.of(
    "customerId", "CUST-9",
    "amount", 25000
));
request.setTaskRefToMockOutput(Map.of(
    "score_customer", List.of(
        new WorkflowTestRequest.TaskMock(
            TaskResult.Status.COMPLETED,
            Map.of("riskScore", 720)
        )
    )
));

Workflow result = workflowClient.testWorkflow(request);
assertEquals(WorkflowStatus.COMPLETED, result.getStatus());
assertEquals("approved", result.getOutput().get("decision"));
```

Use `setWorkflowDef()` when you want the test to use a local definition from the repository. Omit it when the test should fetch the registered definition from the server.

Mock sub-workflow behavior with `setSubWorkflowTestRequest()` when the parent workflow contains Sub Workflow tasks whose Worker tasks should be mocked.

### Examples

#### Test a local workflow definition

```java
WorkflowDef workflowDef = loadWorkflowDef("workflows/loan_approval.json");

WorkflowTestRequest request = new WorkflowTestRequest();
request.setName(workflowDef.getName());
request.setVersion(workflowDef.getVersion());
request.setWorkflowDef(workflowDef);
request.setInput(Map.of("amount", 25000));
request.setTaskRefToMockOutput(Map.of(
    "score_customer", List.of(
        new WorkflowTestRequest.TaskMock(
            TaskResult.Status.COMPLETED,
            Map.of("riskScore", 720)
        )
    )
));

Workflow result = workflowClient.testWorkflow(request);
assertEquals(WorkflowStatus.COMPLETED, result.getStatus());
```

#### Test a failure path

```java
request.setTaskRefToMockOutput(Map.of(
    "score_customer", List.of(
        new WorkflowTestRequest.TaskMock(
            TaskResult.Status.FAILED_WITH_TERMINAL_ERROR,
            Map.of("reason", "invalid customer")
        )
    )
));

Workflow result = workflowClient.testWorkflow(request);
assertEquals(WorkflowStatus.FAILED, result.getStatus());
```

#### Replace unsafe dependencies before testing

If a workflow contains an HTTP task that would call a real external service, use a test workflow definition that points to a fake endpoint, or replace that part of the graph with a mockable worker task in the test definition.

```java
WorkflowDef workflowDef = metadataClient.getWorkflowDef("payment_flow", 1);
workflowDef.getTasks().stream()
    .filter(task -> "SUB_WORKFLOW".equals(task.getType()))
    .forEach(task -> task.getSubWorkflowParam().setName("dummy_subflow"));

WorkflowTestRequest request = new WorkflowTestRequest();
request.setWorkflowDef(workflowDef);
Workflow result = workflowClient.testWorkflow(request);
```

## Regression tests

Regression tests protect existing behavior when a workflow definition changes. Use them before promoting a new workflow version.

Common regression inputs:

- Golden workflow input/output fixtures stored in the repo.
- A previous successful execution exported from staging.
- Representative branch cases for each switch path.
- Failure cases for retry, timeout, and terminal error behavior.

Example regression shape:

```java
WorkflowDef newDefinition = loadWorkflowDef("workflows/order_flow_v2.json");
Map<String, Object> goldenInput = loadJson("fixtures/order_flow/input.json");
Map<String, Object> expectedOutput = loadJson("fixtures/order_flow/output.json");

WorkflowTestRequest request = new WorkflowTestRequest();
request.setName(newDefinition.getName());
request.setVersion(newDefinition.getVersion());
request.setWorkflowDef(newDefinition);
request.setInput(goldenInput);
request.setTaskRefToMockOutput(loadMockOutputs("fixtures/order_flow/tasks.json"));

Workflow result = workflowClient.testWorkflow(request);
assertEquals(WorkflowStatus.COMPLETED, result.getStatus());
assertEquals(expectedOutput, result.getOutput());
```

Production notes:

- Test every meaningful branch, not only the happy path.
- Include regression tests for workflow version changes.
- Keep mock outputs realistic and schema-valid.
- Test idempotency and signal behavior separately when clients depend on them.
- Run workflow tests before registering definitions in production.
