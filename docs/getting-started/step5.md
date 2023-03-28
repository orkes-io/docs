---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Step 5: Adding Wait Conditions

The wait task in Conductor is used if the workflow is to be paused for external signals. The signals can be human manual interventions or an event from external sources such as Kafka, SQS, etc. 

Let’s learn how you can pause your workflows using wait tasks. 

### In your current workflow, what if you want to send the SMS only after 10 mins?

<Tabs>
<TabItem value="UI" label="UI">

1. In your current workflow, add a [wait](https://orkes.cloud/content/reference-docs/operators/wait) task before the SMS task.
2. You can configure the wait task parameters to wait for 10 mins.
3. Run workflow directly from the UI using the Run Workflow button.

</TabItem>
</Tabs>

Since you have configured the wait task to wait for 10 mins, once the workflow execution reaches this task, it waits for 10 mins and then proceeds to the next task; sending an SMS.

:::note
You can configure the wait task to wait for a certain duration, date & time or external signals like manual approval or events from Kafka/SQS.
:::

## Looking Ahead

* 
* 