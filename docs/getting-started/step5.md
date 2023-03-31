---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Step 5: Adding Wait Conditions

The wait task in Conductor is used if the workflow is to be paused for external signals. The signals can be human manual interventions or an event from external sources such as Kafka, SQS, etc. Let’s learn how you can pause your workflows using wait tasks. 

#### In your current workflow, what if you want to send the SMS only after 10 mins?

:::tip
Orkes Conductor doesn't limit your wait conditions. We can wait for __mins__, __days__, __months__ or even __years__! It can also wait for external signals like manual approval or events from messaging systems such as __Kafka/SQS__.
:::

<Tabs>
<TabItem value="UI" label="UI">

<div className="row">
<div className="col col--4">

1. In your current workflow, add a [Wait](/content/reference-docs/operators/wait) task before the SMS task.
2. You can configure the wait task parameters to wait for 10 mins.
3. Run workflow directly from the UI using the Run Workflow button.

</div>
<div className="col">
<div className="embed-loom-video">
<iframe
  width="100%"
  height="300px"
  allow="fullscreen;"
  src={"https://www.youtube.com/embed/J0TDfs6nJhg"}
></iframe></div>
</div>
</div>
</TabItem>
</Tabs>

Since you have configured the wait task to wait for 10 mins, once the workflow execution reaches this task, it waits for 10 mins and then proceeds to the next task; sending an SMS.


## Related Topics

* [API Reference for Wait](/content/reference-docs/operators/wait)
* [Scheduling workflows](/content/guides/scheduling-workflows) 