---
sidebar_position: 2
---
# Handling failures with Conductor
[Failures](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing) are part of life when operating distributed applications. Workflows and tasks can be configured to handle such errors.

## Task Failures
A task inside a workflow can be configured to retry upon error either at a fixed delay, with a linear backoff or exponential backoff. As a developer, you do not need to handle any logic to do retries; the Conductor runtime automatically takes care of re-scheduling the tasks when the retry policies are set.

## Workflow Failures
Conductor workflows span across many services, and when a workflow sometimes fails, it is necessary to reset the state of the underlying system (e.g., revert changes to the database, compensate transactions, etc.). The [Compensation](https://en.wikipedia.org/wiki/Compensating_transaction) mechanism in Conductor allows defining a **failureWorkflow** that is executed when a workflow execution fails.
The **failureWorkflow** can be used to run compensation logic to handle terminal failures in the system.
