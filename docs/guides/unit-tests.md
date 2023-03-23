import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Unit and Regression Testing Workflows​

## Unit Tests​

Conductor workflows can be unit-tested using **POST /workflow/test endpoint**. The approach is similar to how you unit test using mock objects in Java or similar languages.

#### Why Unit Test Workflows?​
Unit tests allow you to test for the correctness of the workflow definition, ensuring:
1. Given a specific input, workflow reaches the terminal state in a COMPLETED or FAILED state.
2. Given a specific input, the workflow executes a specific set of tasks. This is useful for testing branching and dynamic forks.
3. Task inputs are wired correctly - e.g., if a task receives its input from the output of another task, this can be verified using the unit test.

## Unit Testing Workflows​

Java SDK provides the following method that allows testing a workflow definition against mock inputs:

```java
public abstract Workflow testWorkflow(WorkflowTestRequest testRequest);
```

The actual workflow is executed on a real Conductor server, ensuring you are testing the behavior that will match the ACTUAL execution of the server.

## Setting up Conductor server for testing​

Tests can be run against a remote server (useful for integration tests) or a local containerized instance. A recommended approach is to use **testcontainers**.

## Examples​

### Unit Test​
* [LoanWorkflowTest.java](https://github.com/orkes-io/workflow-cicd/blob/main/src/test/java/io/orkes/conductor/cicd/workflows/LoanWorkflowTest.java).
* Testing workflows that contain sub-workflows: [SubWorkflowTest.java](https://github.com/orkes-io/workflow-cicd/blob/main/src/test/java/io/orkes/conductor/cicd/workflows/SubWorkflowTest.java).

### Regression Test​
Workflows can be regression tested with golden inputs and outputs. This approach is useful when modifying workflows that are running in production to ensure the behavior remains correct.
<br/>

See [RegressionTest.java](https://github.com/orkes-io/workflow-cicd/blob/main/src/test/java/io/orkes/conductor/cicd/workflows/RegressionTest.java) for an example, which uses previously captured workflow execution as golden input/output to verify the workflow execution.