---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Step 3: Adding Custom Code Worker

Continuing the use case from the previous step, we now have a requirement to add a fraud check if the deposit amount is greater than $50,000. 

<Tabs>
<TabItem value="UI" label="UI">

1. Add a [Switch case](https://orkes.cloud/content/reference-docs/operators/switch-task) after the deposit task.
2. Add a case - “**FRAUD_CHECK_REQUIRED**” - and a Simple Worker.
3. Run Workflow.

</TabItem>
</Tabs>

We can see that when we run this workflow for amounts > $50,000, it runs a fraud check. Let’s see how this fraud check can be implemented:

<Tabs>
<TabItem value="Java" label="Java">
Add Code samples.
</TabItem>
<TabItem value="Python" label="Python">
Add Code samples.
</TabItem>
<TabItem value="Golang" label="Golang">
Add Code samples.
</TabItem>
<TabItem value="Clojure" label="Clojure">
Add Code samples.
</TabItem>
<TabItem value="CSharp" label="CSharp">
Add Code samples.
</TabItem>
<TabItem value="Javascript" label="Javascript">
Add Code samples.
</TabItem>
</Tabs>

## Looking Ahead

* 
* 