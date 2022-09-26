---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dynamic Fork Task - Using Arrays

```json
"type" : "FORK_JOIN_DYNAMIC"
```

## Introduction

Dynamic fork is a powerful feature in Conductor that can be used to run parallel executions of the task with dynamism. 

### Creating a workflow with dynamic fork

`FORK_JOIN_DYNAMIC` task is used to create a dynamic fork. Dynamic fork is always added with a `JOIN` task in pairs. 
Here is an example from a workflow that contains a dynamic fork join.

<p align="center"><img src="/content/img/dynamic_fork.png" alt="a dynamic fork diagram" width="300" style={{paddingBottom: 30, paddingTop: 30}} /></p>

Dynamic fork is a powerful feature with a lot of customization.  In this article, we will focus on a simple use case that is equivalent to a parallel stream processing like the following in java:

```java
List<String> items  = new ArrayList<>();
items.stream().parallel().forEach(item -> process(item));
```

A dynamic fork needs inputs that specify two things:

1. Name of the task to execute in parallel
2. List of inputs to each of the tasks running in parallel

We can fork multiple tasks by giving two inputs to the dynamic fork task:
* `fork_task_name` : Name of the task that is executed in parallel
* `fork_task_input` : List of inputs - either text, number or a JSON object that are given as input to each of the forked tasks.

<p><img src="/content/img/dynamic_fork_1.png" alt="a dynamic fork diagram" width="800" style={{paddingBottom: 30, paddingTop: 30}} /></p>

The inputs can be complex JSON objects as well:

<p><img src="/content/img/dynamic_fork_2.png" alt="a dynamic fork diagram" width="800" style={{paddingBottom: 30, paddingTop: 30}} /></p>

When we execute this workflow, this is how the tasks are executed:

<p><img src="/content/img/dynamic_fork_3.png" alt="a dynamic fork diagram" width="700" style={{paddingBottom: 30, paddingTop: 30}} /></p>

If we look at the input to the task:

<p><img src="/content/img/dynamic_fork_4.png" alt="a dynamic fork diagram" width="600" style={{paddingBottom: 30, paddingTop: 30}} /></p>

As with the rest of the tasks, the name of the task (send_email) or the inputs can be fully dynamic coming from either the workflow input or another task’s output as well.  To do that, you just replace the static values (either one of both of them) for fork_task_name and fork_task_inputs with variables:

<p><img src="/content/img/dynamic_fork_5.png" alt="a dynamic fork diagram" width="800" style={{paddingBottom: 30, paddingTop: 30}} /></p>


### Executing HTTP tasks in parallel

Use fork_task_type as HTTP that executes a system HTTP task.

<p><img src="/content/img/dynamic_fork_6.png" alt="a dynamic fork diagram" width="800" style={{paddingBottom: 30, paddingTop: 30}} /></p>

#### HTTP Task Input specification

Input to an HTTP task has the following parameters specified as `http_request`:

<p><img src="/content/img/dynamic_fork_7.png" alt="a dynamic fork diagram" width="400" style={{paddingBottom: 30, paddingTop: 30}} /></p>

| Parameter Name      | Description                                                                                                                                       |
| ----------- |---------------------------------------------------------------------------------------------------------------------------------------------------|
| uri      | HTTP(S) URL                                                                                |
| method   | GET, PUT, POST or DELETE              |
| body   | If sending a POST or PUT request. Can be either JSON object or a String             |
| connectionTimeOut   | Socket timeout to the HTTP server in millis for connection. Useful when connecting to a server with high connect latencies. (eg. across regions)  |
| readTimeOut | Read timeout for reading the response from connection. Useful for slow connections                                                               |


### Examples

Give it a try - we have a few workflows created in [Playground](https://play.orkes.io/) that you can take a look at and see for yourself:

:::tip
Run the workflows to see the inputs and outputs.
:::

* [Execute HTTP tasks in parallel](https://play.orkes.io/workflowDef/simple_http_fork)
* [Execute worker tasks in parallel](https://play.orkes.io/workflowDef/simple_fork_task/1)
* [Execute sub workflows  in parallel](https://play.orkes.io/workflowDef/simple_subworkflow_fork)

As usual, if you find this useful don’t forget to give us a ⭐ at
https://github.com/Netflix/conductor
