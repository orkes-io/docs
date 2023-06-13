# How to Use Workflow Attributes in Conductor Workflows

In Conductor workflows, data can be passed in several ways, such as from tasks, workflow, secrets, or variables. 

This documentation describes the different workflow attributes that can be used while passing data.

## Workflow Attributes 

Passing parameters can generally be evaluated using the following expression:

```json
   "variableName" : "${workflow.x.x}"
```

Here **variableName** is the string that represents the variable you want to assign to this expression’s output. 

Depending on the context from where the data is being passed, the expression can take the following variants:

| Workflow Attribute | Description |
| ------------------ | ----------- |
| input | **${workflow.input.somevalue}** <br/>If the workflow has an input parameter “**_somevalue_**”, then the same parameter can be referred to using this expression.|
| output | **${workflow.output.somevalue}** <br/>If the workflow has an output parameter “**_somevalue_**”, then the same parameter can be referred to using this expression.|
| status | **${workflow.status}** <br/>This expression can be used when you want to check the workflow status and proceed. The possible values the expression can return are _RUNNING, PAUSED, TIMED_OUT, TERMINATED, FAILED,_ or _COMPLETED_.|
| workflowId | **${workflow.workflowId}** <br/>This expression can be used when you need to retrieve the workflowId of the current workflow.|
| parentWorkflowId | **${workflow.parentWorkflowId}** <br/>This expression can be used in the sub-workflows to retrieve the workflowId of the parent workflow.|
| parentWorkflowTaskId | **${workflow.parentWorkflowTaskId}** <br/>This expression can be used in the sub-workflows to retrieve the subworkflow’s task execution Id in the parent workflow.|
| workflowType | **${workflow.workflowType}** <br/>This expression can be used to retrieve the workflow name.|
| version | **${workflow.version}** <br/>This expression can be used when you need to retrieve the version of the current workflow.|
| correlationId | **${workflow.correlationId}** <br/>This expression can be used when you need to retrieve the correlationId provided to the current workflow instance.|
| schemaVersion | **${workflow.schemaVersion}** <br/>This expression can be used to retrieve the schema version of the current workflow.|
| variables | **${workflow.variables.variable_name}** <br/>This expression is used when a variable name is already stored in the workflow definition, and you need to retrieve the variable name in the preceding tasks. Refer to the complete example [here](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor#detailed-examples:~:text=If%20the%20variable%20name%20is%20stored%20via%20the%20Set%20Variable%20task%2C%20the%20JSON%20looks%20like%20this%3A).|
| createTime | **${workflow.createTime}** <br/>This expression can be used to retrieve the workflow execution time.|
| secrets | **${workflow.secrets.secret_name}** <br/>This expression can be used to retrieve the secret values without exposing them directly in the workflow definitions. Referring using this expression ensures that it takes the value dynamically while executing the workflow.|
| taskToDomain | **${workflow.taskToDomain.domain_name}** <br/>This expression can be used to retrieve the domain name used while invoking the workflow.|