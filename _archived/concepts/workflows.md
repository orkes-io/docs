---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Workflows, Tasks and Operators
Distributed stateful applications that use Conductor to manage their state and execution graph are built using __Workflows__.

## Workflows

```
Workflow = {Tasks + Operators}
```

__Workflow__ can be defined as the collection of tasks and operators that specifies the order and execution of the defined tasks.
This orchestration process takes place in a hybrid ecosystem that encircles serverless functions, microservices, and monolithic applications.
Furthermore, as the Conductor is language agnostic, the orchestration can be across any programming language.

### Creating A Conductor Workflow
Conductor definitions are like class definitions in the OOP paradigm or templates.
You define this once and use it for each workflow execution. Definitions to Executions have 1:N relationship.

Conductor does not enforce one specific way to define your workflows.  You can create your workflow definitions in multiple ways:
1. Using Code with SDK support in Java, Golang, Python, C#, Javascript, and Clojure.
2. Using JSON-based configuration
3. Visually using UI

### Example workflow

<Tabs>
  <TabItem value="Diagram" label="Diagram" default>
    <p align="left"><img src="/content/img/sample_workflow.jpg" alt="Diagram of a sample workflow" width="200" style={{paddingBottom: 10, paddingTop: 10}} /></p>
  </TabItem>
  <TabItem value="JSON" label="JSON">

```json title="JSON Code"
{
  "name": "example_workflow",
  "version": 1,
  "tasks": [
    {
      "name": "switch_case",
      "taskReferenceName": "switch_case",
      "inputParameters": {
        "switchCaseValue": "${workflow.input.service}"
      },
      "type": "SWITCH",
      "decisionCases": {
        "AZURE": [
          {
            "name": "deploy_to_azure",
            "taskReferenceName": "deploy_to_azure",
            "inputParameters": {},
            "type": "SIMPLE"
          }
        ]
      },
      "defaultCase": [
        {
          "name": "deploy_to_aws_1",
          "taskReferenceName": "deploy_to_aws",
          "inputParameters": {},
          "type": "SIMPLE"
        }
      ],
      "evaluatorType": "value-param",
      "expression": "switchCaseValue"
    }
  ]
}
```

  </TabItem>
  <TabItem value="Java" label="Java">

```java title="Java Code for the workflow"
ConductorWorkflow workflow = new ConductorWorkflow(workflowExecutor);
Switch decision = new Switch("switch_case", "${workflow.input.service}");
decision.switchCase("AZURE", new SimpleTask("deploy_to_azure", "deploy_to_azure"));
decision.defaultCase(new SimpleTask("deploy_to_aws_1", "deploy_to_aws_"));
workflow.add(decision);
```

  </TabItem>
  <TabItem value="Golang" label="Golang">
    This is a banana 🍌
  </TabItem>
  <TabItem value="Python" label="Python">
      This is a banana 🍌
  </TabItem>
  <TabItem value="CSharp" label="CSharp">
      This is a banana 🍌
  </TabItem>
    <TabItem value="Javascript" label="Javascript">
      This is a banana 🍌
  </TabItem>
    <TabItem value="Clojure" label="Clojure">
      This is a banana 🍌
  </TabItem>
</Tabs>

## Tasks
A task is the fundamental building block of a workflow. A **task** represents the business logic execution, such as making an HTTP call, sending an email, or doing work, such as processing data files or executing some business logic.

## Task Workers

Workers are used to implement a task. A worker runs outside of a Conductor server. A worker can be implemented in any language and framework of your choice. Here is a sample worker that takes the **name** as input and returns **Hello {name}**.

#### Hello World Worker
<Tabs>
  <TabItem value="Java" label="Java">

```java title="Java Worker"

//Worker implemented as a class with full control over the state
public class HelloWorker implements Worker {
  public String getTaskDefName() { return "hello_world"; }
  public TaskResult execute(Task input) {
    TaskResult result = new TaskResult(input);
    result.getOutputData().put("greetings", "Hello, " + input.getInputData().get("name"));
    result.setStatus(COMPLETED);
    return result;
  }
}

//Worker as java function
@WorkerTask("hello_world")
public String greetings(@InputParam("name") String name) {
    return "Hello, " + name;
}
```

  </TabItem>
  <TabItem value="Golang" label="Golang">
    This is a banana 🍌
  </TabItem>
  <TabItem value="Python" label="Python">
      This is a banana 🍌
  </TabItem>
  <TabItem value="CSharp" label="CSharp">
      This is a banana 🍌
  </TabItem>
   <TabItem value="Javascript" label="Javascript">
      This is a banana 🍌
  </TabItem>
    <TabItem value="Clojure" label="Clojure">
      This is a banana 🍌
  </TabItem>
</Tabs>

Conductor is agnostic to how the workers are deployed and provide lightweight SDKs in all major languages that allow you to expose existing functionality as Conductor Workers. Workers can run on bare metal, containers, VMs, or as serverless functions.

## Operators
An **Operator** in a workflow is your programming language construct, such as a switch, loop, fork/join, or return statement. Operators are used to control the execution flow in the workflow - such as implementing branching, parallel executions, loops, etc.