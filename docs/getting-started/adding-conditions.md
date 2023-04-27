---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';
import CodeBlock from '@theme/CodeBlock';

# Step 3: Adding Conditions

Continuing the use case from the previous step, we now have a requirement to add a fraud check for all deposit transactions >= $10,000.

<Tabs>
<TabItem value="UI" label="UI">

<div className="row">
<div className="col col--4">


1. In your current definition, add a [Switch](/content/reference-docs/operators/switch) task before the deposit task.
2. Add a switch case for checking amounts >= 10000, and add a [Worker](/content/reference-docs/operators/worker-task) task for the case with the name `fraud-check`.
3. [Run workflow](/content/how-to-videos/run-workflow).

</div>
<div className="col">
<div className="embed-loom-video">
<iframe
  width="100%"
  height="350px"
  allow="fullscreen;"
  src={"https://player.vimeo.com/video/815581464?h=ce49f5768a"}
></iframe></div>
</div>
</div>
</TabItem>
</Tabs>

We can see that when we run this workflow for amounts >= $10,000, it runs a fraud check. If we named the task `fraud-check`, we'd notice that it is actually executed (in playground env), but how? 
That's because there is a pre-defined task that is polling and running all the tasks named `fraud-check`. We also have the required permissions in the playground for this task.

## Related Topics

- Passing [inputs into workflow for tasks](/content/developer-guides/passing-inputs-to-task-in-conductor)
- Passing the [output of one task to the input of another](/content/developer-guides/passing-inputs-to-task-in-conductor)
