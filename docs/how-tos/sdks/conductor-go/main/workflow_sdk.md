# Authoring Workflows with the Go SDK

## A simple two-step workflow

```go

//API client instance with server address and authentication details
apiClient := client.NewAPIClient(
    settings.NewAuthenticationSettings(
        KEY,
        SECRET,
    ),
    settings.NewHttpSettings(
        "https://play.orkes.io/api",
    ))

//Create new workflow executor
executor := executor.NewWorkflowExecutor(apiClient)

//Create a new ConductorWorkflow instance
conductorWorkflow := workflow.NewConductorWorkflow(executor).
    Name("my_first_workflow").
    Version(1).
    OwnerEmail("developers@orkes.io")

//now, let's add a couple of simple tasks
conductorWorkflow.
	Add(workflow.NewSimpleTask("simple_task_2", "simple_task_1")).
    Add(workflow.NewSimpleTask("simple_task_1", "simple_task_2"))

//Register the workflow with server
conductorWorkflow.Register(true)        //Overwrite the existing definition with the new one
```
### Execute Workflow

#### Using Workflow Executor to start previously registered workflow
```go
//Input can be either a map or a struct that is serializable to a JSON map
workflowInput := map[string]interface{}{}

workflowId, err := executor.StartWorkflow(&model.StartWorkflowRequest{
    Name:  conductorWorkflow.GetName(),
    Input: workflowInput,
})
```


Using struct instance as workflow input
```go
type WorkflowInput struct {
    Name string
    Address []string
}
//...
workflowId, err := executor.StartWorkflow(&model.StartWorkflowRequest{
  Name:  conductorWorkflow.GetName(),
  Input: &WorkflowInput{
  Name: "John Doe",
  Address: []string{"street", "city", "zip"},
  },
})
```
### Workflow Management APIs
See [Docs](docs/executor.md) for APIs to start, pause, resume, terminate, search and get workflow execution status.

### More Examples
You can find more examples at the following GitHub repository:

https://github.com/conductor-sdk/conductor-examples/tree/main/go-samples
