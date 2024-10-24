import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';
import CodeBlock from '@theme/CodeBlock';

# Running a Worker Until Condition is met

## Introduction - Custom Poll Worker

We can use a worker and keep it running until a condition is met. This is similar to the [HTTP Poll](/content/reference-docs/system-tasks/http-poll) task, where
you can poll an HTTP endpoint until a specific condition is met. Having a worker do the same is useful
when you don't have an endpoint to call directly from Conductor.

## Code Sample


```java dynamic https://github.com/conductor-sdk/orkes-java-springboot2-example/blob/main/src/main/java/io/orkes/example/banking/workers/PollUntilConditionMeetsWorker.java section=1 ../workers/PollUntilConditionMeetsWorker.java
```

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/nI8IcSpzBLQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe></center>

In this example worker, we use the `callbackAfterSeconds` attribute to keep the worker in progress
until a condition is met. This can be any arbitrary condition that our code defines.

Specifically, this example waits for the poll count to reach the input parameter `pollCounter`.

When you return a task as `IN_PROGRESS` with a `callbackAfterSeconds` value set, Conductor
will schedule the same task instance to be polled exactly after the `callbackAfterSeconds` value.

We are leveraging the output data to hold the context across polls, and once it reaches the desired state, we exit `IN_PROGRESS`
and mark the task as `COMPLETED`.

Go ahead and try [this worker](https://developer.orkescloud.com/workflowDef/poll-until-condition-workflow) in a workflow in our Developer Edition environment. We have already configured this in our sandbox, so it should run when you test.

:::tip Language agnostic
Such workers can be implemented in any of the languages.
:::