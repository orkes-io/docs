---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';
import CodeBlock from '@theme/CodeBlock';

# Step 6: Executing Tasks in Parallel

Another exciting feature of Conductor is executing tasks in parallel. A common scenario is to run a specific task based on an array of values. Let's try this out on our workflow.

To do this, we will use the payment deposit workflow we created so far as a [sub-workflow](/content/reference-docs/operators/sub-workflow). In a new workflow, we will run a task that will return a given number of deposit transactions. For each transaction, we will trigger this sub-workflow - which will all run in parallel.

:::tip
Orkes Conductor runs 1000s of parallel executions, limited only by the worker capacity. The more workers you have, the more parallelism you can have.
:::

<Tabs>
<TabItem value="UI" label="UI">

<div className="row">
<div className="col col--4">

1. In your current workflow, add a new workflow called `batch-process-payments-<unique-id>` and add a [Worker](/content/reference-docs/worker-task) task for the case with the name `retrieve-deposit-batch`.
2. Add a [Dynamic Fork](/content/reference-docs/operators/dynamic-fork) task - and  configure it to run a sub-workflow based on the output of `retrieve-deposit-batch` task.
3. [Run workflow directly from the UI](/content/how-to-videos/run-workflow) using the Run Workflow button.

</div>
<div className="col col--4">
<div className="embed-youtube-video">
<iframe width="500" height="315" src="https://www.youtube.com/embed/xkRHjAgff0I?si=3N7kE0dmnvj6v_5J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
</div>
</div>
</TabItem>
</Tabs>

If we named the task `retrieve-deposit-batch`, we'd notice that it is actually executed (in playground env), but how?
That's because there is a pre-defined task that is polling and running all the tasks named `retrieve-deposit-batch`. We also have the required permissions in the playground for this task.

Here is the code reference for this worker:

```java dynamic https://github.com/conductor-sdk/orkes-java-springboot2-example/blob/main/src/main/java/io/orkes/example/banking/workers/ConductorWorkers.java section=2 .../workers/ConductorWorkers.java
```

By default, it would return a random value between __5-10 tasks__. If we supply an input called __`batchCount`__ - we can retrieve up to 100 transactions. This is a limitation of the playground. In a dedicated
cluster, you can run parallel tasks into the thousands or tens of thousands depending on the cluster's capacity.

:::note Try out a larger batch
Try configuring a larger batch using the input called __`batchCount`__ to the task `retrieve-deposit-batch` task - we can observe the tasks running in parallel by looking at the timeline view or task list view.
:::

## Related Topics

* [API Reference for Dynamic Fork](/content/reference-docs/operators/dynamic-fork)
* [API Reference for Sub Workflows](/content/reference-docs/operators/sub-workflow)