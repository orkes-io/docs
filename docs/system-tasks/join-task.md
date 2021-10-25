---
sidebar_position: 7
---

# Join Task


### What is Join Task?

Join task is used to wait for completion of one or more tasks spawned
by fork tasks.

### What is a common Join Task use case?

A Join task is followed by Fork Join task.

### How is it defined?

Join task is defined directly inside the workflow with the parameter
`"joinOn"` with the tasks which are to be joined.

### Example of Join Task

```json
{
    "joinOn": ["taskRef1", "taskRef3"]
}
```

Following are the parameters in the above example :

1. `"joinOn"` - List of task reference name, for which the JOIN will wait
   for completion.

Join Task Output Fork task's output will be a JSON object with key
being the task reference name and value as the output of the fork task

