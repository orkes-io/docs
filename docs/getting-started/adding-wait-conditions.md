---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Step 5: Adding Wait Conditions

[Continuing from Step 4](/getting-started/running-an-inline-function)

The wait task in Conductor is used if the workflow is to be paused for external signals. The signals can be manual human interventions or an event from external sources such as Kafka, SQS, etc. Let’s learn how to pause your workflows using wait tasks. 

#### Use case: What if we want to send the SMS only after a fixed time?

:::tip
Orkes Conductor doesn't limit your wait conditions. We can wait for __mins__, __days__, __months__ or even __years__! It can also wait for external signals like manual approval or events from messaging systems such as __Kafka/SQS__.
:::

<Tabs>
<TabItem value="UI" label="UI">

<div className="row">
<div className="col col--4">

1. In the same workflow from before, add a [Wait](/content/reference-docs/operators/wait) task before the SMS task.
2. We can configure the wait task parameters to wait for 10 seconds.
3. [Run workflow directly from the UI](/developer-guides/running-workflows#run-in-ui) using the Run Workflow button.

</div>
<div className="col">
<div className="embed-loom-video">
<iframe width="500" height="315" src="https://www.youtube.com/embed/c1YOgXzd4tg?si=uAG37a-ohc_O8Gkn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe></div>
</div>
</div>
</TabItem>
</Tabs>

Since you have configured the wait task to wait for 10 seconds, once the workflow execution reaches this task, it waits for 10 seconds and then proceeds to the next task, sending an SMS.

:::note Try out a longer wait
Try to configure a wait for longer - perhaps 2 days, set a reminder to check back after two days to see if that task is executed. Magic!
:::

* **[Step 6: Executing Tasks in Parallel](/getting-started/executing-tasks-in-parallel)**