---
sidebar_position: 1
---

# Dynamic Fork
```json
"type" : "FORK_JOIN_DYNAMIC"
```

### Introduction

A Fork operation in conductor, lets you run a specified list of other tasks or sub workflows in parallel after the fork
task. A fork task is followed by a join operation that waits on the forked tasks or sub workflows to finish. The `JOIN`
task also collects outputs from each of the forked tasks or sub workflows.

In a regular fork operation (`FORK_JOIN` task), the list of tasks or sub workflows that need to be forked and run in
parallel are already known at the time of workflow definition creation time. However, there are cases when that list can
only be determined at run-time and that is when the dynamic fork operation (FORK_JOIN_DYNAMIC task) is needed.

There are three things that are needed to configure a `FORK_JOIN_DYNAMIC` task.

1. A list of tasks or sub-workflows that needs to be forked and run in parallel.
2. A list of inputs to each of these forked tasks or sub-workflows
3. A task prior to the `FORK_JOIN_DYNAMIC` tasks outputs 1 and 2 above that can be wired in as in input to
   the `FORK_JOIN_DYNAMIC` tasks

### Use Cases

A `FORK_JOIN_DYNAMIC` is useful, when a set of tasks or sub-workflows needs to be executed and the number of tasks or
sub-workflows are determined at run time. E.g. Let's say we have a task that resizes an image, and we need to create a
workflow that will resize an image into multiple sizes. In this case, a task can be created prior to
the `FORK_JOIN_DYNAMIC` task that will prepare the input that needs to be passed into the `FORK_JOIN_DYNAMIC` task. The
single image resize task does one job. The `FORK_JOIN_DYNAMIC` and the following `JOIN` will manage the multiple
invokes of the single image resize task. Here, the responsibilities are clearly broken out, where the single image resize
task does the core job and `FORK_JOIN_DYNAMIC` manages the orchestration and fault tolerance aspects.

### Configuration

Here is an example of a `FORK_JOIN_DYNAMIC` task followed by a `JOIN` task

```json
{
  "inputParameters": {
    "dynamicTasks": "${fooBarTask.output.dynamicTasksJSON}",
    "dynamicTasksInput": "${fooBarTask.output.dynamicTasksInputJSON}"
  },
  "type": "FORK_JOIN_DYNAMIC",
  "dynamicForkTasksParam": "dynamicTasks",
  "dynamicForkTasksInputParamName": "dynamicTasksInput"
},
{
"name": "image_multiple_convert_resize_join",
"taskReferenceName": "image_multiple_convert_resize_join_ref",
"type": "JOIN"
}
```

Dissecting into this example above, let's look at the three things that are needed to configured for
the `FORK_JOIN_DYNAMIC` task

`dynamicForkTasksParam` This is a JSON array of task or sub-workflow objects that specifies the list of tasks or
sub-workflows that needs to be forked and run in parallel `dynamicForkTasksInputParamName` This is a JSON map of task or
sub-workflow objects that specifies the list of tasks or sub-workflows that needs to be forked and run in parallel
fooBarTask This is a task that is defined prior to the FORK_JOIN_DYNAMIC in the workflow definition. This task will need
to output (outputParameters) 1 and 2 above so that it can be wired into inputParameters of the FORK_JOIN_DYNAMIC
tasks. (dynamicTasks and dynamicTasksInput)

#### Input Configuration

| Attribute      | Description |
| ----------- | ----------- |
| name      | Task Name. A unique name that is descriptive of the task function      |
| taskReferenceName   | Task Reference Name. A unique reference to this task. There can be multiple references of a task within the same workflow definition        |
| type   | Task Type. In this case, `FORK_JOIN_DYNAMIC`        |
| inputParameters   | The input parameters that will be supplied to this task.         |
| dynamicForkTasksParam | This is a JSON array of tasks or sub-workflow objects that needs to be forked and run in parallel |
| dynamicForkTasksInputParamName | A JSON map, where the keys are task or sub-workflow names, and the values are its corresponding inputParameters | 

