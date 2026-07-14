---
title: "Unit and Regression Tests"
description: "Learn how to write unit and regression tests to validate workflow logic, task inputs and outputs, and expected workflow execution paths in Orkes Conductor."
canonical_route: "developer-guides/unit-and-regression-tests"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Unit and Regression Tests"
---

# Unit and Regression Tests

Use [Conductor SDKs](/content/category/sdks) and [APIs](/content/category/ref-docs/api) to conduct unit and regression tests on your workflows. Workflow tests verify that a workflow definition routes correctly, wires task inputs and outputs correctly, and reaches the expected terminal state before the definition is promoted.

!!! tip "5-minute path"
    Write a test with the Test Workflow API or SDK, mock the Worker tasks it depends on, run it against a local containerized server, then assert the result before promoting the workflow.

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

Workflow tests execute against a real Conductor server. Use a local containerized server for fast CI feedback and a remote non-production cluster for integration tests that depend on Orkes-specific resources. It is recommended that you use [test containers](https://github.com/testcontainers) to manage your test environments cleanly.

Keep test data and workflow definitions in source control. Avoid testing production-only credentials, endpoints, or secrets in unit tests.

### Mock tasks

Only [Worker tasks](/content/reference-docs/worker-task) are mocked by the workflow test API. System tasks and operators execute normally.

Mock worker tasks when:

- The real worker calls external services.
- The worker is slow or non-deterministic.
- The test only needs a known output to validate workflow routing.
- You want to force a failure path.

### Methods for unit testing workflows

=== "Using API"

    Conductor workflows can be unit-tested using the [Test Workflow API](/content/reference-docs/api/workflow/test-workflow). This approach is similar to unit-testing using mock objects in Java or similar languages.

=== "Using SDK"

    The Java SDK provides `testWorkflow` for testing a workflow definition against mock inputs:

    ```java
    public abstract Workflow testWorkflow(WorkflowTestRequest testRequest);
    ```

    Use `setName()` to set the workflow to be tested. This retrieves the workflow definition from the Conductor server:

    ```java
    WorkflowTestRequest testRequest = new WorkflowTestRequest();
    testRequest.setName(workflowName);
    ```

    If you need to load the workflow definition locally instead, include it in your test code repository and use `setWorkflowDef()`. You can define the workflow as [code](/content/developer-guides/write-workflows-using-code) or use the JSON workflow definition:

    ```java
    WorkflowTestRequest testRequest = new WorkflowTestRequest();
    testRequest.setName(workflowName);
    testRequest.setWorkflowDef(workflowDef);
    ```

    `setWorkflowDef()` can also be used to modify the remote workflow definition locally before running the unit tests — for example, replacing Sub Workflow tasks with a dummy task, or using a dummy URL in an HTTP task. See [the full example on modifying workflows](#examples) below.

    **Mocking Worker tasks**

    To mock Worker tasks, use `setTaskRefToMockOutput()` to set a mock output:

    ```java
    WorkflowTestRequest testRequest = new WorkflowTestRequest();
    testRequest.setName(workflowName);
    testRequest.setWorkflowDef(workflowDef);
    testRequest.setTaskRefToMockOutput(Map.of(
        "task-a-ref", List.of(new TaskMock(COMPLETED, Map.of("key1", "value1", "key2", 5))),
        "task-b-ref", List.of(new TaskMock(COMPLETED, Map.of("key3", 3)))
    ));
    ```

    See [the full example on mocking Worker tasks](#examples) below.

    **Mocking Worker tasks in sub-workflows**

    When testing workflows containing sub-workflows with Worker tasks in them, use `setSubWorkflowTestRequest()` to mock those sub-workflow Worker tasks:

    ```java
    WorkflowTestRequest testRequest = new WorkflowTestRequest();
    testRequest.setName(workflowName);
    testRequest.setWorkflowDef(workflowDef);
    testRequest.setSubWorkflowTestRequest(Map.of(
        "sub-workflow-ref-1", testRequest2,
        "sub-workflow-ref-2", testRequest3
    ));
    ```

    See [the full example on mocking Worker tasks in sub-workflows](#examples) below.


### Examples

<details markdown="1">
<summary>Pull workflows locally</summary>

To test a local workflow definition:

```java
public class WorkflowTests extends BaseTest {
    @Test
    public void testWorkflow() {
        WorkflowTestRequest testRequest = new WorkflowTestRequest();
        testRequest.setName("parent-flow");
        testRequest.setWorkflowDef(Util.getWorkflowDef("parent-flow"));
        testRequest.setTaskRefToMockOutput(Map.of(
            "lookup-person-ref", List.of(new TaskMock(COMPLETED, Map.of("name", "June", "id", 543321))),
            "do-sensitive-work-ref", List.of(new TaskMock(COMPLETED, Map.of(
                "_masked", Map.of("q", "q"),
                "_secrets", Map.of("z", "z")
            ))),
            "do-intensive-task-ref", List.of(new TaskMock(COMPLETED, Map.of("result", 3.14159)))
        ));

        Workflow workflow = workflowClient.testWorkflow(testRequest);
        assertEquals(3.14159, workflow.getOutput().get("result"));
    }
}
```

The `parent-flow` workflow is defined as code here:

```java
public class Util {
    public static WorkflowDef getWorkflowDef(String workflowName) {
        WorkflowTask lookupPersonTask = new WorkflowTask();
        lookupPersonTask.setName("lookup-person");
        lookupPersonTask.setTaskReferenceName("lookup-person-ref");
        lookupPersonTask.setInputParameters(Map.of("query", "john"));

        WorkflowTask doSensitiveWorkTask = new WorkflowTask();
        doSensitiveWorkTask.setName("do-sensitive-work");
        doSensitiveWorkTask.setTaskReferenceName("do-sensitive-work-ref");
        doSensitiveWorkTask.setInputParameters(Map.of(
            "_masked", Map.of("a", "b"),
            "_secrets", Map.of("a", "b")
        ));

        WorkflowTask doIntensiveTask = new WorkflowTask();
        doIntensiveTask.setName("do-intensive-task");
        doIntensiveTask.setTaskReferenceName("do-intensive-task-ref");
        doIntensiveTask.setInputParameters(Map.of("_masked", "${do-sensitive-work-ref.output._masked}"));

        List<WorkflowTask> tasks = List.of(lookupPersonTask, doSensitiveWorkTask, doIntensiveTask);

        WorkflowDef workflowDef = new WorkflowDef();
        workflowDef.setName(workflowName);
        workflowDef.setVersion(1);
        workflowDef.setTasks(tasks);
        workflowDef.setDescription("Example workflow for orkes-worker-java demo");
        return workflowDef;
    }
}
```

Refer to [the complete code here](https://github.com/ystxn/orkes-worker-java/blob/main/src/test/java/space/yong/orkes/WorkflowTests.java).

</details>

<details markdown="1">
<summary>Pull workflows from server</summary>

To pull workflows from the server instead, simply omit `setWorkflowDef()`:

```java
public class WorkflowTests extends BaseTest {
    @Test
    public void testWorkflow() {
        WorkflowTestRequest testRequest = new WorkflowTestRequest();
        testRequest.setName("parent-flow");
        testRequest.setTaskRefToMockOutput(Map.of(
            "lookup-person-ref", List.of(new TaskMock(COMPLETED, Map.of("name", "June", "id", 543321))),
            "do-sensitive-work-ref", List.of(new TaskMock(COMPLETED, Map.of(
                "_masked", Map.of("q", "q"),
                "_secrets", Map.of("z", "z")
            ))),
            "do-intensive-task-ref", List.of(new TaskMock(COMPLETED, Map.of("result", 3.14159)))
        ));

        Workflow workflow = workflowClient.testWorkflow(testRequest);
        assertEquals(3.14159, workflow.getOutput().get("result"));
    }
}
```

</details>

<details markdown="1">
<summary>Modify workflows before testing</summary>

Here's an example of modifying a workflow definition retrieved from the server and using `setWorkflowDef()` to test the modified definition. Use `metadataClient.getWorkflowDef` to retrieve the definition. In this example, all Sub Workflow tasks are replaced with a mock `dummy` workflow already registered on the server.

```java
@Test
public void testWorkflow() {
    String workflowName = "parent-flow";
    int workflowVersion = 1;

    // Substitute all sub-flows to use `dummy` flow, e.g., containing an inline task
    WorkflowDef workflowDef = metadataClient.getWorkflowDef(workflowName, workflowVersion);
    workflowDef.getTasks().stream()
        .filter(t -> t.getType().equals("SUB_WORKFLOW"))
        .forEach(t -> t.getSubWorkflowParam().setName("dummy"));

    WorkflowTestRequest testRequest = new WorkflowTestRequest();
    testRequest.setName(workflowName);
    testRequest.setVersion(workflowVersion);
    testRequest.setWorkflowDef(workflowDef); // Use this instead of deployed definition

    Workflow workflow = workflowClient.testWorkflow(testRequest);
    assertEquals(3, workflow.getOutput().get("result"));
}
```

</details>

<details markdown="1">
<summary>Test workflows with Worker tasks</summary>

Here's an example of using `setTaskRefToMockOutput()` to mock Worker tasks.

```java
/**
 * Unit test a workflow with inputs read from a file.
 */
public class LoanWorkflowTest extends AbstractWorkflowTests {
    /**
     * Uses mock inputs to verify the workflow execution and input/outputs of the tasks
     */
    @Test
    public void verifyWorkflowExecutionWithMockInputs() throws IOException {
        WorkflowDef def = getWorkflowDef("/workflows/calculate_loan_workflow.json");
        assertNotNull(def);

        Map<String, List<WorkflowTestRequest.TaskMock>> testInputs = getTestInputs("/test_data/loan_workflow_input.json");
        assertNotNull(testInputs);

        WorkflowTestRequest testRequest = new WorkflowTestRequest();
        testRequest.setWorkflowDef(def);

        LoanWorkflowInput workflowInput = new LoanWorkflowInput();
        workflowInput.setUserEmail("user@example.com");
        workflowInput.setLoanAmount(new BigDecimal(11_000));
        testRequest.setInput(objectMapper.convertValue(workflowInput, Map.class));
        testRequest.setTaskRefToMockOutput(testInputs);
        testRequest.setName(def.getName());
        testRequest.setVersion(def.getVersion());

        Workflow execution = workflowClient.testWorkflow(testRequest);
        assertNotNull(execution);
    }
}
```

Refer to [the complete code here](https://github.com/orkes-io/workflow-cicd/blob/main/src/test/java/io/orkes/conductor/cicd/workflows/LoanWorkflowTest.java).

</details>

<details markdown="1">
<summary>Test workflows with Sub Workflow tasks</summary>

Here's an example of testing workflows that contain Sub Workflow tasks.

```java
/**
 * Demonstrates how to test workflows that contain sub-workflows
 */
public class SubWorkflowTest extends AbstractWorkflowTests {
    @Test
    public void verifySubWorkflowExecutions() throws IOException {
        WorkflowDef def = getWorkflowDef("/workflows/kitchensink.json");
        assertNotNull(def);

        WorkflowDef subWorkflowDef = getWorkflowDef("/workflows/PopulationMinMax.json");
        metadataClient.registerWorkflowDef(subWorkflowDef);

        WorkflowTestRequest testRequest = getWorkflowTestRequest(def);

        // The following are the dynamic tasks that are not present in the workflow
        // definition but are created by a dynamic fork
        testRequest.getTaskRefToMockOutput().put("_x_test_worker_0_0", List.of(new WorkflowTestRequest.TaskMock()));
        testRequest.getTaskRefToMockOutput().put("_x_test_worker_0_1", List.of(new WorkflowTestRequest.TaskMock()));
        testRequest.getTaskRefToMockOutput().put("_x_test_worker_0_2", List.of(new WorkflowTestRequest.TaskMock()));
        testRequest.getTaskRefToMockOutput().put("simple_task_1__1", List.of(new WorkflowTestRequest.TaskMock()));
        testRequest.getTaskRefToMockOutput().put("simple_task_5", List.of(new WorkflowTestRequest.TaskMock()));

        Workflow execution = workflowClient.testWorkflow(testRequest);
        assertNotNull(execution);
    }
}
```

Refer to [the complete code here](https://github.com/orkes-io/workflow-cicd/blob/main/src/test/java/io/orkes/conductor/cicd/workflows/SubWorkflowTest.java).

</details>

<details markdown="1">
<summary>Test workflows with sub-workflows that contain Worker tasks</summary>

Here's an example of testing workflows that contain sub-workflows with Worker tasks.

```java
@Test
public void testWorkflow() {
    WorkflowTestRequest testRequest2 = new WorkflowTestRequest();
    testRequest2.setName("subflow-flow");
    testRequest2.setWorkflowDef(Util.getWorkflowDef("parent-flow"));
    testRequest2.setTaskRefToMockOutput(Map.of(
        "lookup-person-ref", List.of(new TaskMock(COMPLETED, Map.of("name", "June", "id", 543321))),
        "do-sensitive-work-ref", List.of(new TaskMock(COMPLETED, Map.of(
            "_masked", Map.of("q", "q"),
            "_secrets", Map.of("z", "z")
        ))),
        "do-intensive-task-ref", List.of(new TaskMock(COMPLETED, Map.of("result", 3.14159)))
    ));

    WorkflowTestRequest testRequest = new WorkflowTestRequest();
    testRequest.setName("parent-flow");
    testRequest.setWorkflowDef(Util.getWorkflowDef("parent-flow"));
    testRequest.setSubWorkflowTestRequest(Map.of("sub-workflow-ref-1", testRequest2));
}
```

</details>

## Regression tests

Regression tests protect existing behavior when a workflow definition changes. Use them before promoting a new workflow version.

Common regression inputs:

- Golden workflow input/output fixtures stored in the repo.
- A previous successful execution exported from staging.
- Representative branch cases for each switch path.
- Failure cases for retry, timeout, and terminal error behavior.

### Examples

<details markdown="1">
<summary>Use a previous execution as golden input/output</summary>

This example uses execution data from a previously executed workflow as the golden input and output, to regression test the workflow definition:

```java
/**
 * This test demonstrates how to use execution data from previously executed workflows as golden input and output
 * and use them to regression test the workflow definition.
 *
 * Regression tests are useful, ensuring any changes to the workflow definition do not change the behavior.
 */
public class RegressionTest extends AbstractWorkflowTests {
    @Test
    // Uses a previously executed successful run to verify the workflow execution, and its output.
    public void verifyWorkflowOutput() throws IOException, ExecutionException, InterruptedException, TimeoutException {
        // Workflow Definition
        WorkflowDef def = getWorkflowDef("/workflows/workflow1.json");

        // Golden output to verify against
        Workflow workflow = getWorkflow("/test_data/workflow1_run.json");

        WorkflowTestRequest testRequest = new WorkflowTestRequest();
        testRequest.setInput(new HashMap<>());
        testRequest.setName(def.getName());
        testRequest.setVersion(def.getVersion());
        testRequest.setWorkflowDef(def);

        Map<String, List<WorkflowTestRequest.TaskMock>> taskRefToMockOutput = new HashMap<>();
        for (Task task : workflow.getTasks()) {
            List<WorkflowTestRequest.TaskMock> taskRuns = new ArrayList<>();
            WorkflowTestRequest.TaskMock mock = new WorkflowTestRequest.TaskMock();
            mock.setStatus(TaskResult.Status.valueOf(task.getStatus().name()));
            mock.setOutput(task.getOutputData());
            taskRuns.add(mock);
            taskRefToMockOutput.put(def.getTasks().get(0).getTaskReferenceName(), taskRuns);
        }
        testRequest.setTaskRefToMockOutput(taskRefToMockOutput);

        Workflow execution = workflowClient.testWorkflow(testRequest);
        assertNotNull(execution);
        assertEquals(workflow.getTasks().size(), execution.getTasks().size());
    }
}
```

Refer to the full [RegressionTest.java](https://github.com/orkes-io/workflow-cicd/blob/main/src/test/java/io/orkes/conductor/cicd/workflows/RegressionTest.java) file for the complete code.

</details>

## Production notes

- Test every meaningful branch, not only the happy path.
- Include regression tests for workflow version changes.
- Keep mock outputs realistic and schema-valid.
- Test idempotency and signal behavior separately when clients depend on them.
- Run workflow tests before registering definitions in production.
