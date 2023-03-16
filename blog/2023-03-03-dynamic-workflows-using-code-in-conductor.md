---
slug: dynamic-workflows-using-code-in-netflix-conductor
title: Dynamic Workflows using Code in Netflix Conductor
authors: viren
tags: [Netflix Conductor, orchestration, workflow engine, workflow as code]
---

[Netflix Conductor](https://github.com/Netflix/conductor) is a popular platform for building resilient stateful applications by creating workflows that span across services. You can try out the workflows from this article at [Playground](https://play.orkes.io/), a free hosted version of Conductor.

<p align="center"><img src="/content/img/dynamic-workflows-using-code.jpg" alt="Dynamic workflows as Code in Conductor" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## What is a Workflow?

Before diving into how to create workflows using Conductor, let’s first define what a workflow is. In simple terms, a workflow is a series of tasks or steps executed in a specific order to accomplish a goal. Workflows are used to automate complex processes and ensure that all the necessary steps are completed in a logical sequence. Conductor workflows are composed of Tasks and Operators.

<center>

**Workflow = {Tasks + Operators}**

</center>

**Tasks** are services encapsulating the business logic that runs outside the Conductor server and are implemented as a Microservice, Lambda, or Worker. Workers run outside the Conductor server and can be implemented in any supported language. A workflow can contain multiple workers written in different languages.

**Operators** are primitives from programming languages that are used to control the flow of execution inside a workflow. Conductor supports operators such as switch, loop, fork/join, and sub-workflows, allowing you to define complex workflows.

## Separation of Workflows from Re-usable Services

Conductor promotes clear separation between application workflow and services that are used as building blocks of the workflow as ‘Tasks’. This separation ensures that the tasks follow the single responsibility principle and are generally stateless in nature.

This model ensures two things:

1. Re-usability of services across many workflows promoting greater collaboration across teams.
2. Stateless Task Workers can quickly scale up/down based on the volume while maintaining the state only at the Conductor server.

## Workflow definition – JSON or Code?

<b>Why not both?</b>
<br/>
Conductor server stores the workflow definitions as JSON on the server side. However, this does not restrict users from expressing their workflows as JSON alone. Conductor supports creating workflows using Code and executing both pre-registered as well as dynamic workflows expressed using code.

### Simple Example

Let’s take an example of a simple two-task workflow:

<p align="center"><img src="/content/img/simple-two-task-workflow.png" alt="Two-Task workflow in Conductor" width="40%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

### JSON

```json
{
  "name": "simple_two_task_workflow",
  "version": 1,
  "schemaVersion": 2,
  "tasks": [
    {
      "name": "task1",
      "taskReferenceName": "task1",
      "inputParameters": {},
      "type": "SIMPLE"
    },
    {
      "name": "task2",
      "taskReferenceName": "task2",
      "inputParameters": {},
      "type": "SIMPLE"
    }
  ]
}
```

The same workflow in different languages:

### Java

```java
ConductorWorkflow workflow = new ConductorWorkflow(workflowExecutor);
workflow.setName("simple_two_task_workflow");
workflow.setVersion(1);

//Add tasks
workflow.add(new SimpleTask("task1", "task1"));
workflow.add(new SimpleTask("task2", "task2"));

//Execute
workflow.executeDynamic(//input);
```

### Go

```go
conductorWorkflow := workflow.NewConductorWorkflow(executor.NewWorkflowExecutor(client.NewAPIClient(nil, nil)))
conductorWorkflow.Name("simple_two_task_workflow").Version(1)

//Add Tasks
conductorWorkflow.
  Add(workflow.NewSimpleTask("task1", "task1")).
  Add(workflow.NewSimpleTask("task2", "task2"))

//Execute
conductorWorkflow.StartWorkflow(//input)
```

### Python

```python
workflow = ConductorWorkflow(
  executor=workflow_executor,
  name=simple_two_task_workflow,
  version=1,
)

#Two Tasks
task1 = SimpleTask('task1', 'task1')
task2 = SimpleTask('task2', 'task2')

#Add tasks to the workflow using >> operator
workflow = workflow >> task1 >> task2

# Execute the workflow
workflow.start_workflow(#input)
```

Creating workflows using code opens up use cases where it might be impossible to define workflows using static definitions — this could be when the number of tasks and their flow depends on the data that is dependent on the other factors.

### Complex Example

Let’s take an example of a hypothetical workflow that is created dynamically based on the user data:

```java
ConductorWorkflow workflow = new ConductorWorkflow(workflowExecutor);
workflow.setName("complex_dynamic_workflow");
workflow.setVersion(1);

//Get the list of users to send notification to
List<UserInfo> users = getUsers();
Task<?>[] tasks = new Task[users.size()];

int counter = 0;
for (UserInfo user : users) {
  if(user.sendEmail) {
    SimpleTask task = new SimpleTask("send_email", "send_email_" + counter);
    task.input("email", user.email);
    tasks[counter++] = task;
  } else {
    SimpleTask task = new SimpleTask("send_sms", "send_sms_" + counter);
    task.input("phone", user.phone);
  tasks[counter++] = task;
  }
}

//Run all the tasks in parallel
workflow.add(new ForkJoin("run_in_parallel", tasks));

//Execute workflow and get the future to wait for completion.
CompletableFuture executionFuture = workflow.execute(new HashMap<>());

//Alternatively, kick off the workflow if it's going to be a long-running workflow
String workflowId = workflowClient.startWorkflow(new StartWorkflowRequest().withWorkflowDef(workflow.toWorkflowDef()));
```

In the above example, we load up the user list from a backend store, and for each user, create a task to send sms or email. A workflow is created by adding appropriate notification tasks for each user here and is then executed.

Depending on how long the workflow takes to complete, Conductor provides a way to wait for the workflow completion using ‘Futures’ or kick off a workflow that returns the workflow execution id that can be used by workflowClient to monitor the execution. (or can be searched and viewed in the UI)

You can write workflows using code in Java, Golang, Python, CSharp, Javascript, and even Clojure with Conductor.

Visit [Conductor SDK on GitHub](https://github.com/conductor-sdk) for the latest SDKs with fully working example apps.

## Dynamic Workflows and Conductor

The ability to dynamically create workflows using code allows developers to address very complex use cases where it is impossible to pre-define workflows. With Conductor, you can still do this, with the full power of Conductor visualization that allows you to visualize the entire execution in the UI. It’s like having your cake and eating it too!

## Summary

Netflix Conductor is a powerful platform that lets you create the most complex workflows while making it very easy to handle runtime scenarios with powerful debugging and visualization tools, reducing the mean time to detect and resolve issues in the production environment.

Be sure to check out [Netflix Conductor](https://github.com/Netflix/conductor) on GitHub. Our Orkes team do provide [Conductor Playground —  a free version of Conductor](https://play.orkes.io/).

| [Join our Slack community](https://join.slack.com/t/orkes-conductor/shared_invite/zt-xyxqyseb-YZ3hwwAgHJH97bsrYRnSZg) |
| --------------------------------------------------------------------------------------------------------------------- |
